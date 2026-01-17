import { BrandMasterService } from "../../services/BrandMasterService";
import { BrandMasterModel } from "../../models/BrandMasterModel";
// Mocks
jest.mock("../../models/BrandMasterModel");
jest.mock("../../models/LogBrandMasterModel");

describe("BrandMasterService", () => {
  let brandMasterService: BrandMasterService;
  let brandMasterModel: jest.Mocked<BrandMasterModel>;

  beforeEach(() => {
    brandMasterModel = new BrandMasterModel() as jest.Mocked<BrandMasterModel>;
    brandMasterService = new BrandMasterService();
  });

  describe("updateBrandMaster", () => {
    it("updateBrandMaster should be called", async () => {
      const idbrandMaster = 1;
      brandMasterModel.updateBrandMaster.mockResolvedValue({} as any);
      brandMasterModel.getById.mockResolvedValue({ idbrandMaster: 1 } as any);
      await brandMasterService.updateBrandMaster(idbrandMaster, {}, {
        idBrandMaster: 1,
      } as any);

      expect(brandMasterModel.updateBrandMaster).toHaveBeenCalled();
    });

    it("updateBrandMaster should not be called", async () => {
      const idbrandMaster = 1;
      brandMasterModel.updateBrandMaster.mockResolvedValue({} as any);
      brandMasterModel.getById.mockResolvedValue({ idbrandMaster: 1 } as any);
      await expect(
        brandMasterService.updateBrandMaster(idbrandMaster, {}, {
          idBrandMaster: 2,
        } as any),
      ).rejects.toBeTruthy();
    });
  });
});
