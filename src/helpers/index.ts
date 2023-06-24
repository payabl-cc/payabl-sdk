import axios from "axios";

type ValidatePaymentParams = {
  paymentLinkId: string;
  apiKey: string;
};
export const validatePayment = async ({
  paymentLinkId,
  apiKey
}: ValidatePaymentParams) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });
  const address = accounts[0];

  const config: any = {
    headers: {
      "X-API-Key": apiKey
    }
  };

  try {
    const response = await axios.get(
      `https://5kfme18pse.execute-api.us-east-1.amazonaws.com/payment_links/${paymentLinkId}/validate_payment?address=${address}`,
      config
    );

    var isPaymentValid = false;

    if (response.data.payment_valid) {
      isPaymentValid = true;
    }

    return {
      isPaymentValid
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
