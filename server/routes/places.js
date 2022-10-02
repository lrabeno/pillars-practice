const router = require("express").Router();
const {
  models: { Place },
} = require("../db");

// Add your routes here:
//

router.get("/unassigned", async (req, res, next) => {
  const unassigned = await Place.findCitiesWithNoParent();
  res.send(unassigned);
});

router.get("/states", async (req, res, next) => {
  const statesWithCities = await Place.findStatesWithCities();
  res.send(statesWithCities);
});
module.exports = router;
