import { validateRegions } from "../src";

describe("Validation", () => {
  it("Should not throw error for valid regions", () => {
    expect(() =>
      validateRegions([
        "us-east-2",
        "us-east-1",
        "us-west-1",
        "us-west-2",
        "ap-east-1",
        "ap-south-1",
        "ap-northeast-2",
        "ap-southeast-1",
        "ap-southeast-2",
        "ap-northeast-1",
        "ca-central-1",
        "cn-north-1",
        "cn-northwest-1",
        "eu-central-1",
        "eu-west-1",
        "eu-west-2",
        "eu-west-3",
        "eu-north-1",
        "sa-east-1",
        "us-gov-east-1",
        "us-gov-west-1",
      ])
    ).not.toThrow();
  });

  it("Should throw error for invalid regions", () => {
    expect(() => validateRegions(["np-west-1"])).toThrowError(
      'Malformed region "np-west-1"'
    );
  });
});
