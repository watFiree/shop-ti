export const formatPrice = (price) => {
  if (String(price).includes(".")) {
    return `${price} zł`;
  }

  return `${price}.00 zł`;
};
