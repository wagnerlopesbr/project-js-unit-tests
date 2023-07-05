/* eslint-disable max-len */
// Siga as orientações do README!
function foodsAmount(input, item) {
  let amount = 0;
  for (const [key, value] of input) {
    if (key === item) {
      amount += value;
    }
  }
  return amount;
}

function drinksAmount(input, item) {
  let amount = 0;
  for (const [key, value] of input) {
    if (key === item) {
      amount += value;
    }
  }
  return amount;
}

function createMenu(obj) {
  const returnObj = {
    fetchMenu() { return obj; },
    consumption: [],
    order(string) {
      const foodsToOrder = Object.keys(obj.food);
      const drinksToOrder = Object.keys(obj.drinks);
      if (foodsToOrder.includes(string) || drinksToOrder.includes(string)) {
        this.consumption.push(string);
      } else {
        return 'Item indisponível';
      }
    },
    pay() {
      const foodsToPay = Object.entries(obj.food);
      const drinksToPay = Object.entries(obj.drinks);
      let totalBill = 0;
      for (const item of this.consumption) {
        totalBill += foodsAmount(foodsToPay, item);
        totalBill += drinksAmount(drinksToPay, item);
      }
      totalBill *= 1.1;
      return totalBill;
    },
  };
  return returnObj;
}

module.exports = createMenu;
