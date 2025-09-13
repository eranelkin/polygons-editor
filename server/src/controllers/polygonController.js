const PolygonModel = require("../models/polygonModel");

const polygonController = {
  getAll: (req, res, next) => {
    PolygonModel.getAll((err, rows) => {
      if (err) return next(err);

      const polygons = rows.map((row) => ({
        ...row,
        points: JSON.parse(row.points),
      }));

      res.json({ data: polygons });
    });
  },

  create: (req, res, next) => {
    const { name, points, color } = req.body;

    if (!points) {
      return res.status(400).json({ error: "Polygon points are required" });
    }

    PolygonModel.create({ name, points, color }, (err, id) => {
      if (err) return next(err);

      res.status(201).json({
        id,
        name,
        points,
        color,
        createdAt: new Date().toISOString(),
      });
    });
  },

  delete: (req, res, next) => {
    const { id } = req.params;

    PolygonModel.deleteById(id, (err, changes) => {
      if (err) return next(err);

      if (changes === 0) {
        return res.status(404).json({ message: "Polygon not found" });
      }

      res.json({ message: "Polygon deleted successfully", id });
    });
  },
};

module.exports = polygonController;
