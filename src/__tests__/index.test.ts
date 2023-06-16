import PayablSDK from "../index";

describe("PayablSDK", () => {
  test("should set payment link ID correctly", () => {
    const sdk = new PayablSDK("test-api-key");
    sdk.setPaymentLinkId("abc123");
    expect(sdk.paymentLinkId).toBe("abc123");
  });
});
