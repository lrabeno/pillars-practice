const router = require("express").Router();
const {
  models: { Place },
} = require("../db");

// Add your routes here:
//

router.get("/unassigned", async (req, res, next) => {
  try {
    const unassigned = await Place.findCitiesWithNoParent();
    res.send(unassigned);
  } catch (error) {
    next(error);
  }
});

router.get("/states", async (req, res, next) => {
  try {
    const statesWithCities = await Place.findStatesWithCities();
    res.send(statesWithCities);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.id);
    if (!place) {
      res.sendStatus(404);
    } else {
      await place.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
