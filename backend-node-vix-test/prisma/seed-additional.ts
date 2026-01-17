import { PrismaClient, EVMStatus, ERole, ETaskLocation } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Script para adicionar dados de teste adicionais SEM apagar os existentes.
 * Adiciona mais VMs com diferentes BrandMasters e status para testar filtros.
 */
async function main() {
  console.log("Iniciando seed adicional...");

  // Hash padrão para senha "password" (compatível com bcrypt)
  const hashedPassword = await bcrypt.hash("password", 10);

  // Verificar se BrandMasters existem, se não, criar
  console.log("Garantindo BrandMasters adicionais...");
  
  const additionalBrandMasters = [
    {
      idBrandMaster: 4,
      brandName: "CloudTech Solutions",
      isActive: true,
      city: "Rio de Janeiro",
      state: "RJ",
      emailContact: "contato@cloudtech.com",
      cnpj: "12.345.678/0001-99",
      setorName: "Tecnologia",
      isPoc: false,
    },
    {
      idBrandMaster: 5,
      brandName: "DataCenter Brasil",
      isActive: true,
      city: "Curitiba",
      state: "PR",
      emailContact: "contato@datacenter.com.br",
      cnpj: "98.765.432/0001-11",
      setorName: "Infraestrutura",
      isPoc: true,
    },
  ];

  for (const bm of additionalBrandMasters) {
    const existingBM = await prisma.brandMaster.findUnique({
      where: { idBrandMaster: bm.idBrandMaster },
    });

    if (existingBM) {
      await prisma.brandMaster.update({
        where: { idBrandMaster: bm.idBrandMaster },
        data: bm,
      });
      console.log(`  BrandMaster atualizado: ${bm.brandName}`);
    } else {
      await prisma.brandMaster.create({
        data: bm,
      });
      console.log(`  BrandMaster criado: ${bm.brandName}`);
    }
  }

  // Criar usuários adicionais para diferentes MSPs
  console.log("Criando usuários adicionais...");
  
  const adminHash = "$2a$10$b5CjcGmsWNttHhk1w.kd.e67B3yUktQ9eGdOrWUz5TLgfFcq6t2ga"; // Admin@123
  const managerHash = "$2a$10$QtMyQMQqOMEpTOMuNd304.gudlC.tOBKTmylNvUqe09s3MBMjOB7m"; // Manager@123
  const memberHash = "$2a$10$BdgemvlKcsfSM4RD/.5z1.i6qpfuHtZwqCRlyYS4sfBrR.dI6YUqq"; // Member@123

  const usersToCreate = [
    {
      idUser: "vituax-admin-main",
      username: "Admin Vituax",
      email: "admin@vituax.com",
      password: adminHash,
      role: ERole.admin,
      idBrandMaster: 1,
      isActive: true,
    },
    {
      idUser: "vituax-manager-main",
      username: "Manager Vituax",
      email: "manager@vituax.com",
      password: managerHash,
      role: ERole.manager,
      idBrandMaster: 1,
      isActive: true,
    },
    {
      idUser: "vituax-member-main",
      username: "Member Vituax",
      email: "member@vituax.com",
      password: memberHash,
      role: ERole.member,
      idBrandMaster: 1,
      isActive: true,
    },
    {
      idUser: "user-cloudtech-admin-001",
      username: "Admin CloudTech",
      email: "admin@cloudtech.com",
      password: hashedPassword,
      role: ERole.admin,
      idBrandMaster: 4,
      isActive: true,
    },
    {
      idUser: "user-cloudtech-manager-001",
      username: "Manager CloudTech",
      email: "manager@cloudtech.com",
      password: hashedPassword,
      role: ERole.manager,
      idBrandMaster: 4,
      isActive: true,
    },
    {
      idUser: "user-datacenter-admin-001",
      username: "Admin DataCenter",
      email: "admin@datacenter.com.br",
      password: hashedPassword,
      role: ERole.admin,
      idBrandMaster: 5,
      isActive: true,
    },
    // Usuário Vituax sem BrandMaster (usuário interno)
    {
      idUser: "user-vituax-internal-001",
      username: "Vituax Internal Admin",
      email: "internal@vituax.com",
      password: hashedPassword,
      role: ERole.admin,
      idBrandMaster: null,
      isActive: true,
    },
  ];

  for (const userData of usersToCreate) {
    const existingUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { idUser: existingUser.idUser },
        data: userData,
      });
      console.log(`  Usuário atualizado: ${userData.email}`);
    } else {
      await prisma.user.create({
        data: userData,
      });
      console.log(`  Usuário criado: ${userData.email}`);
    }
  }

  // Criar VMs adicionais para diferentes BrandMasters
  console.log("Criando VMs adicionais...");
  
  const vmsToCreate = [
    // VMs para CloudTech (BrandMaster 4)
    {
      vmName: "CloudTech Prod Server 1",
      vCPU: 4,
      ram: 16,
      disk: 256,
      hasBackup: true,
      idBrandMaster: 4,
      status: EVMStatus.RUNNING,
      os: "ubuntu2404",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
    {
      vmName: "CloudTech Dev Server",
      vCPU: 2,
      ram: 8,
      disk: 128,
      hasBackup: false,
      idBrandMaster: 4,
      status: EVMStatus.STOPPED,
      os: "debian12",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
    {
      vmName: "CloudTech Staging",
      vCPU: 2,
      ram: 4,
      disk: 64,
      hasBackup: true,
      idBrandMaster: 4,
      status: EVMStatus.PAUSED,
      os: "centos10",
      location: ETaskLocation.US_EAST_N_VIRGINIA,
      pass: null,
    },
    // VMs para DataCenter Brasil (BrandMaster 5)
    {
      vmName: "DataCenter Main DB",
      vCPU: 8,
      ram: 32,
      disk: 512,
      hasBackup: true,
      idBrandMaster: 5,
      status: EVMStatus.RUNNING,
      os: "debian12",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
    {
      vmName: "DataCenter App Server",
      vCPU: 4,
      ram: 16,
      disk: 256,
      hasBackup: true,
      idBrandMaster: 5,
      status: EVMStatus.RUNNING,
      os: "ubuntu2404",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
    {
      vmName: "DataCenter Backup Server",
      vCPU: 2,
      ram: 8,
      disk: 1024,
      hasBackup: false,
      idBrandMaster: 5,
      status: EVMStatus.STOPPED,
      os: "archlinux",
      location: ETaskLocation.US_WEST_N_CALIFORNIA,
      pass: null,
    },
    // VMs sem BrandMaster (VMs da Vituax)
    {
      vmName: "Vituax Monitor Server",
      vCPU: 2,
      ram: 4,
      disk: 50,
      hasBackup: true,
      idBrandMaster: null,
      status: EVMStatus.RUNNING,
      os: "debian12",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
    {
      vmName: "Vituax Log Aggregator",
      vCPU: 4,
      ram: 8,
      disk: 200,
      hasBackup: true,
      idBrandMaster: null,
      status: EVMStatus.RUNNING,
      os: "ubuntu2404",
      location: ETaskLocation.EU_WEST_IRELAND,
      pass: null,
    },
    // Mais VMs para UPIX (BrandMaster 1) para ter variedade
    {
      vmName: "UPIX Web Server 2",
      vCPU: 4,
      ram: 8,
      disk: 128,
      hasBackup: true,
      idBrandMaster: 1,
      status: EVMStatus.RUNNING,
      os: "ubuntu2404",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
    {
      vmName: "UPIX Database Replica",
      vCPU: 8,
      ram: 64,
      disk: 500,
      hasBackup: true,
      idBrandMaster: 1,
      status: EVMStatus.STOPPED,
      os: "debian12",
      location: ETaskLocation.US_EAST_N_VIRGINIA,
      pass: null,
    },
    // Mais VMs para Vituax MSP test (BrandMaster 2)
    {
      vmName: "Vituax MSP Test Server",
      vCPU: 2,
      ram: 4,
      disk: 80,
      hasBackup: false,
      idBrandMaster: 2,
      status: EVMStatus.PAUSED,
      os: "centos10",
      location: ETaskLocation.BR_SAO_PAULO,
      pass: null,
    },
  ];

  for (const vm of vmsToCreate) {
    try {
      await prisma.vM.create({
        data: vm,
      });
      console.log(`  VM criada: ${vm.vmName}`);
    } catch (error) {
      // Se já existir uma VM com mesmo nome ou ID, apenas log e continua
      console.log(`  VM já existe ou erro: ${vm.vmName}`);
    }
  }

  console.log("\nSeed adicional concluído!");
  console.log("\nResumo:");
  
  const vmsByBrandMaster = await prisma.vM.groupBy({
    by: ['idBrandMaster', 'status'],
    where: { deletedAt: null },
    _count: true,
  });
  
  console.log("\nVMs por BrandMaster e Status:");
  vmsByBrandMaster.forEach((group) => {
    console.log(`  BrandMaster ${group.idBrandMaster ?? 'Vituax'}: ${group.status} = ${group._count} VMs`);
  });

  const totalVMs = await prisma.vM.count({ where: { deletedAt: null } });
  const totalBrandMasters = await prisma.brandMaster.count({ where: { deletedAt: null } });
  const totalUsers = await prisma.user.count({ where: { deletedAt: null } });

  console.log(`\nTotal: ${totalVMs} VMs, ${totalBrandMasters} BrandMasters, ${totalUsers} Usuários`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
