import PayablSDK from "../index";

const sdk = new PayablSDK("test-api-key");
Object.defineProperty(global, "window", {
  value: {
    addEventListener: jest.fn((type, callback) => {
      callback({ data: { paymentStatus: "" } });
    })
  }
});

describe("PayablSDK", () => {
  test("should set payment link ID correctly", () => {
    sdk.setPaymentLinkId("abc123");
    expect(sdk.paymentLinkId).toBe("abc123");
  });

  describe("onPaymentStatusUpdated", () => {
    test("should call required methods", () => {
      const mockCallback = jest.fn();

      sdk.onPaymentStatusUpdated(mockCallback);

      expect(window.addEventListener).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith("");
    });
  });
});
