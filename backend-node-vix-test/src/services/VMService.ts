import { user, vM } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";
import { encrypt, decrypt } from "../utils/crypto";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);
    
    // Lógica de filtro por BrandMaster:
    // 1. Se o usuário tem idBrandMaster (é de um MSP), só pode ver VMs do seu próprio MSP
    // 2. Se o usuário não tem idBrandMaster (usuário Vituax), pode ver todas as VMs
    //    ou filtrar por um MSP específico (idBrandMaster da query)
    let filterBrandMaster: number | undefined = undefined;
    
    if (user.idBrandMaster) {
      // Usuário de MSP: só pode ver VMs do seu próprio MSP
      filterBrandMaster = user.idBrandMaster;
    } else if (validQuery.idBrandMaster !== undefined && validQuery.idBrandMaster !== null) {
      // Usuário Vituax com filtro específico de MSP
      filterBrandMaster = validQuery.idBrandMaster;
    }
    // Se não cair em nenhum caso, filterBrandMaster = undefined = todas as VMs

    const listVm = await this.vMModel.listAll({
      query: validQuery,
      idBrandMaster: filterBrandMaster,
    });

    // Controle de visibilidade de senha por role
    // Members não podem ver senhas de VM - segurança aprimorada
    const canSeePassword = user.role !== "member";

    return {
      ...listVm,
      result: listVm.result.map((vm) => ({
        ...vm,
        pass: canSeePassword && vm.pass ? decrypt(vm.pass) : "••••••••",
      })),
    };
  }

  async createNewVM(data: unknown, user: user) {
    const validateData = vMCreatedSchema.parse(data);

    // Criptografar senha da VM antes de salvar
    const encryptedPass = validateData.pass ? encrypt(validateData.pass) : undefined;

    const preparedData = {
      ...validateData,
      idBrandMaster: validateData.idBrandMaster ?? user.idBrandMaster ?? undefined,
      status: "RUNNING" as const,
      pass: encryptedPass,
    };

    const createdVM = await this.vMModel.createNewVM(preparedData);

    return createdVM;
  }

  async updateVM(idVM: number, data: unknown, user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Criar objeto mutável para atualização
    const updateData: TVMUpdate & { idBrandMaster?: number | null } = {
      ...validateDataSchema,
      idBrandMaster: oldVM.idBrandMaster,
    };

    // Criptografar nova senha se fornecida
    if (updateData.pass) {
      updateData.pass = encrypt(updateData.pass);
    }

    const updatedVM = await this.vMModel.updateVM(idVM, updateData);
    return updatedVM;
  }

  async deleteVM(idVM: number, user: user) {
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }
}
