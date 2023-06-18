import { validatePayment } from "./helpers";

enum PaymentStatusTypes {
  Failed = "failed",
  Success = "success"
}

class PayablSDK {
  apiKey: string | null = null;
  paymentLinkId: string | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  setPaymentLinkId(id: string) {
    this.paymentLinkId = id;
  }

  onAccountsChanged(callback: Function) {
    window.ethereum.on("accountsChanged", async () => {
      this.validatePayment(callback);
    });
  }

  async validatePayment(callback: Function) {
    if (!this.apiKey) {
      throw Error("No API Key was provided");
    }

    if (!this.paymentLinkId) {
      throw Error("No Payment Link ID was provided");
    }

    const { isPaymentValid } = await validatePayment({
      apiKey: this.apiKey,
      paymentLinkId: this.paymentLinkId
    });

    callback(isPaymentValid);
  }

  onPaymentStatusUpdated(callback: Function) {
    window.addEventListener("message", event => {
      const paymentStatus: PaymentStatusTypes = event.data.paymentStatus;

      callback(paymentStatus);
    });
  }
}

export default PayablSDK;
