import PolygonsList from "./PolygonsList/PolygonsList";
import PolygonsCanvas from "./PolygonsCanvas/PolygonsCanvas";
import { PolygonsProvider } from "./PolygonsContext";
import PaletteColors from "./PaletteColors/PaletteColors";
import Typography from "@mui/material/Typography";

import "./Polygons.scss";

const Polygons = () => {
  return (
    <div className="Polygons">
      <div className="polygons-wrapper">
        <PolygonsProvider>
          <PolygonsList />
          <PolygonsCanvas />
          <PaletteColors />
        </PolygonsProvider>
      </div>

      <div className="about-polygons">
        <Typography variant="h5" sx={{ color: "#595959" }}>
          About Polygons Editor:
        </Typography>
        <ul>
          <li>
            <div>
              Add Polygons - just click on the canvas the polygon shape.
            </div>
            <div>
              'Enter' key - close the polygon and save it. (min 3 points or 2
              lines)
            </div>
            <div>
              'Esc' key - ignore he last drawed polygon and delete it from
              canvas.
            </div>
          </li>
          <li>
            Polygon Name - for the best user experience and good flow, polygon
            name is set by the date. I can allways add inputbox or menu for
            setting its name or renaming it.
          </li>
          <li>Highlight a polygon - hovering polygon name.</li>
          <li>Polygon Palette - you can draw polygon by different colors</li>
          <li>Image - I added this relevant image. more noTraffic scope.</li>
          <li>Tests - must add more tests.</li>
        </ul>
      </div>
    </div>
  );
};

export default Polygons;
