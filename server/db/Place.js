const Sequelize = require("sequelize");
const db = require("./db");

const Place = db.define("place", {
  place_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.ENUM,
    values: ["CITY", "STATE", "COUNTRY"],
    defaultValue: "STATE",
    allowNull: false,
  },
  isState: {
    type: Sequelize.VIRTUAL,
    // defaultValue: true,
    get() {
      return this.getDataValue("category") === "STATE";
    },
  },
  nickname: {
    type: Sequelize.VIRTUAL,
    get() {
      let names = this.getDataValue("place_name").split(" ");
      return names.map((name) => name[0].toUpperCase()).join("");
    },
  },
});

Place.findCitiesWithNoParent = async () => {
  return await Place.findAll({
    where: {
      category: "CITY",
      parentId: null,
    },
  });
};

Place.findStatesWithCities = async () => {
  return await Place.findAll({
    where: {
      category: "STATE",
    },
    include: [{ model: Place, as: "children" }],
  });
};

/**
 * We've created the association for you!
 *
 * A place can be related to another place:
 *       NY State (parent)
 *         |
 *       /   \
 *     NYC   Albany
 * (child)  (child)
 *
 * You can find the parent of a place and the children of a place
 */

Place.belongsTo(Place, { as: "parent" });
Place.hasMany(Place, { as: "children", foreignKey: "parentId" });

module.exports = Place;
