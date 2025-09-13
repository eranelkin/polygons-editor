import React from "react";
import { usePolygons } from "../PolygonsContext";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import "./PaletteColors.scss";

const COLORS = ["#FFFF00", "#FF0000", "#00FF00"];

const PaletteColors = () => {
  const { isDelay, polygonColor, setPolygonColor } = usePolygons();

  return (
    <div className="PaletteColors">
      <Typography variant="h5" gutterBottom>
        Polygon Palette
      </Typography>

      <div className="palette-wrapper">
        {isDelay && (
          <div className="on-delay-mask">
            <CircularProgress />
          </div>
        )}

        {COLORS.map((color) => {
          const isActive = color === polygonColor;
          return (
            <button
              key={color}
              type="button"
              className={`color-item ${isActive ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setPolygonColor(color)}
              aria-label={`Set polygon color ${color}`}
            >
              {color}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaletteColors;
