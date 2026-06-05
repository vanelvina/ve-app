const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
const isValidPincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(pincode);
};
const generateOrderId = () => {
  const prefix = "VE";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1e3).toString().padStart(3, "0");
  return `${prefix}${timestamp}${random}`;
};

export { formatDate as a, formatPrice as f, generateOrderId as g, isValidPincode as i };
//# sourceMappingURL=formatters-CRqlhyd1.mjs.map
