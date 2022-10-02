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

router.delete("/:id", async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.id);
    if (!place) {
      res.sendStatus(404);
    } else {
      await place.destroy();
      console.log("DESTROYEDDDDDDDDDDDDD ------->");
    }
  } catch (error) {
    next(error);
  }
  done();
});
module.exports = router;
