const db = require("../config/database");

const PolygonModel = {
  getAll: (callback) => {
    db.all("SELECT * FROM polygons", [], callback);
  },

  create: (polygon, callback) => {
    const { name, points, color } = polygon;
    db.run(
      "INSERT INTO polygons (name, points, color) VALUES (?, ?, ?)",
      [name, JSON.stringify(points), color],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  deleteById: (id, callback) => {
    db.run("DELETE FROM polygons WHERE id = ?", id, function (err) {
      callback(err, this?.changes);
    });
  },
};

module.exports = PolygonModel;
