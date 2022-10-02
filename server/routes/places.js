const router = require("express").Router();
const {
  models: { Place },
} = require("../db");

// Add your routes here:
//

router.get("/unassigned", async (req, res, next) => {
  const unassigned = await Place.findAll({
    where: {
      category: "CITY",
      parentId: null,
    },
  });
  res.send(unassigned);
});
module.exports = router;
