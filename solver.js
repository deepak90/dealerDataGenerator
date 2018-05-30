// Find all Dealers in the state of Vermont else return null
const solver = (data, state) => {
  const dealersByState = data["dealers"]
    .filter(dealerByState => dealerByState.state === state)
    .map(dealer => dealer.email);
  return dealersByState.length ? { dealers: dealersByState } : null;
};

module.exports = solver;

// Examples: 

// Find all Subaru dealers from these States

// Find all used car dealerships whose inventory is primarily Kia 

// Find all dealers from New England States who are available for two consecutive days and group them by franchise
