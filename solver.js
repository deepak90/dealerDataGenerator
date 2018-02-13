// Find all Dealers in the state of Vermont else return null
const solver = data => {
  const vtDealers = data["dealers"]
    .filter(s => s.state === "Vermont")
    .map(vtd => vtd.email);
  return vtDealers.length === 0 ? null : { dealers: vtDealers };
};

module.exports = solver;
