// frontend/src/utils/razorpay.js

/** Dynamically load Razorpay script */
export const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

/**
 * Open Razorpay checkout.
 * optionsFromBackend should contain:
 *  - key
 *  - amount
 *  - currency
 *  - order_id
 *  - name, description, prefill, theme (optional)
 */
export const openRazorpay = async (optionsFromBackend, onSuccess, onFailure) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Failed to load Razorpay. Check your internet connection.");
    return;
  }

  const options = {
    ...optionsFromBackend,
    handler: async function (response) {
      // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
      if (onSuccess) onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        if (onFailure) onFailure(new Error("Payment cancelled"));
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
