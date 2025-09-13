import { useState, useRef, useEffect, useCallback } from "react";
import CanvasDraw from "react-canvas-draw";
import { usePolygons } from "../PolygonsContext";
import CircularProgress from "@mui/material/CircularProgress";

import "./PolygonsCanvas.scss";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 750;
const LINE_WIDTH = 3;

const PolygonsCanvas = () => {
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const {
    polygons,
    handleAddPolygon,
    isDelay,
    polygonColor,
    hoveredPolygonId,
  } = usePolygons();

  const canvasRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setCurrentPolygon([]);
        return;
      }
      if (e.key === "Enter" && currentPolygon.length > 2) {
        handleAddPolygon([...currentPolygon, currentPolygon[0]]);
        setCurrentPolygon([]);
      }
    },
    [currentPolygon, handleAddPolygon]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCanvasClick = useCallback((e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentPolygon((prev) => [...prev, [offsetX, offsetY]]);
  }, []);

  const drawToCanvas = useCallback(() => {
    const drawingCanvas = canvasRef.current?.canvas?.drawing;
    if (!drawingCanvas) return; // wait until canvas is ready

    const ctx = drawingCanvas.getContext("2d");
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    ctx.lineWidth = LINE_WIDTH;

    polygons.forEach((polygon) => {
      if (!polygon.points || polygon.points.length < 2) return;

      const hoveredFill = polygon.id === hoveredPolygonId ? 0.4 : 0.2;
      ctx.save();
      ctx.strokeStyle = polygon.color;

      const fill =
        polygon.color === "#FFFF00"
          ? `rgba(255, 255, 0, ${hoveredFill})`
          : polygon.color === "#FF0000"
          ? `rgba(255, 0, 0, ${hoveredFill})`
          : `rgba(0, 255, 0, ${hoveredFill})`;

      ctx.beginPath();
      ctx.moveTo(polygon.points[0][0], polygon.points[0][1]);
      polygon.points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    if (currentPolygon.length > 1) {
      ctx.strokeStyle = polygonColor;
      ctx.beginPath();
      ctx.moveTo(currentPolygon[0][0], currentPolygon[0][1]);
      currentPolygon.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    }
  }, [polygons, currentPolygon, polygonColor, hoveredPolygonId]);

  useEffect(() => {
    drawToCanvas();
  }, [polygons, currentPolygon, polygonColor, hoveredPolygonId, drawToCanvas]);

  useEffect(() => {
    const timer = setTimeout(() => {
      drawToCanvas();
    }, 50);
    return () => clearTimeout(timer);
  }, [drawToCanvas]);

  return (
    <div className="PolygonsCanvas">
      <div className="canvas-wrapper">
        {isDelay && (
          <div className="on-delay-mask">
            <CircularProgress />
          </div>
        )}
        <div onClick={handleCanvasClick}>
          <CanvasDraw
            ref={canvasRef}
            canvasWidth={CANVAS_WIDTH}
            canvasHeight={CANVAS_HEIGHT}
            brushRadius={0}
            lazyRadius={0}
            imgSrc="/streets.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default PolygonsCanvas;
