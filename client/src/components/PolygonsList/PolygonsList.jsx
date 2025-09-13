import React from "react";
import Typography from "@mui/material/Typography";
import { usePolygons } from "../PolygonsContext";
import CircularProgress from "@mui/joy/CircularProgress";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import "./PolygonsList.scss";

const PolygonsList = () => {
  const {
    polygons,
    handleDeletePolygon,
    isLoading,
    isDelay,
    handlePolygonHover,
    handlePolygonMouseLeave,
  } = usePolygons();

  return (
    <div className="PolygonsList">
      <Typography variant="h5" gutterBottom>
        Polygons
      </Typography>

      {isLoading && (
        <div className="list-loading">
          <CircularProgress size="sm" />
        </div>
      )}

      {!isLoading && (!polygons || polygons.length === 0) && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No Data
        </Typography>
      )}

      {!isLoading &&
        polygons?.length > 0 &&
        polygons.map((polygon) => (
          <div
            key={polygon.id}
            className="polygon-item"
            onMouseEnter={() => handlePolygonHover(polygon.id)}
            onMouseLeave={handlePolygonMouseLeave}
          >
            <div className="polygon-name">{polygon.name}</div>
            <IconButton
              size="sm"
              loading={isDelay}
              onClick={() => handleDeletePolygon(polygon.id)}
              aria-label={`Delete polygon ${polygon.name}`}
            >
              <DeleteIcon sx={{ color: "error.main" }} />
            </IconButton>
          </div>
        ))}
    </div>
  );
};

export default PolygonsList;
