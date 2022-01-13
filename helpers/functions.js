const deliveryPrice = (price) => {
  price = Number(price);

  if (price > 30) {
    return 0;
  }
  if (price > 20) {
    return 1;
  }
  if (price > 10) {
    return 2;
  }

  return 3;
};

module.exports = { deliveryPrice };
