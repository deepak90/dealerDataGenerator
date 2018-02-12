const faker = require("faker");
const { vehicles, vehicleCondition } = require("./vehicleData");
const {
  date: fkDate,
  company: fkCompany,
  name: fkName,
  address: fkAddress,
  internet: fkInternet,
  commerce: fkCommerce,
  random: fkRandom
} = faker;

const NUM_OBJ = 5;
const NUM_FEATURED_INV = 4;

const generateBasicInfo = () => {
  const firstName = fkName.firstName();
  const lastName = fkName.lastName();
  const email = fkInternet.exampleEmail(firstName, lastName);
  return {
    firstName,
    lastName,
    email
  };
};

const generateDealershipInfo = () => {
  const dealershipName = fkCompany.companyName(0);
  const state = fkAddress.state();
  return {
    dealershipName,
    state
  };
};

const determineMileage = year => {
  const currentYear = new Date().getFullYear();
  const prevYear = Number(year);
  return (
    (currentYear - prevYear) * fkRandom.number({ min: 10000, max: 120000 })
  );
};

const generateRandomVehicleData = () => {
  const randomVehicleObj = fkRandom.arrayElement(vehicles);
  const make = randomVehicleObj.make;
  const model = fkRandom.arrayElement(randomVehicleObj.model);
  const trim = fkRandom.arrayElement(randomVehicleObj.trim);
  const color = fkCommerce.color();
  const condition = fkRandom.arrayElement(vehicleCondition);
  const year = String(
    condition === "new"
      ? new Date().getFullYear()
      : new Date(fkDate.past(10)).getFullYear()
  );
  const featuredVehicleObj = { make, model, trim, condition, color, year };
  const mileage = determineMileage(year);
  return condition === "new"
    ? featuredVehicleObj
    : { ...featuredVehicleObj, mileage };
};

const generateInventoryInfo = len => {
  const featuredInventory = [];
  for (let i = 0; i < len; i++) {
    featuredInventory.push({
      ...generateRandomVehicleData()
    });
  }
  return { featuredInventory };
};

generateDealerObj = (len = 10, inv_num = 1) => {
  const dealers = [];
  for (let i = 0; i < len; i++) {
    dealers.push({
      ...generateBasicInfo(),
      ...generateDealershipInfo(),
      ...generateInventoryInfo(inv_num)
    });
  }
  return JSON.stringify({ dealers });
};

generateDealerObj(NUM_OBJ, NUM_FEATURED_INV);
