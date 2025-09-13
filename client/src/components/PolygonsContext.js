import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

const PolygonsContext = createContext(null);

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || window.location.origin;

export const PolygonsProvider = ({ children }) => {
  const [polygons, setPolygons] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelay, setIsDelay] = useState(false);
  const [polygonColor, setPolygonColor] = useState("#FFFF00");
  const [hoveredPolygonId, setHoveredPolygonId] = useState(null);

  const delayRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/polygons`);
        if (!response.ok) throw new Error("Failed to fetch polygons");

        const json = await response.json();
        const payload = json?.data ?? json;
        if (isMountedRef.current) setPolygons(payload ?? []);
      } catch (err) {
        if (isMountedRef.current) setError(err.message ?? String(err));
      } finally {
        if (isMountedRef.current) setIsLoading(false);
      }
    };

    fetchPolygons();
  }, []);

  const startDelay = useCallback(() => {
    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => {
      if (isMountedRef.current) setIsDelay(false);
      delayRef.current = null;
    }, 5000);
  }, []);

  const handleAddPolygon = useCallback(
    async (points) => {
      if (points.length < 3) {
        alert('Please enter at least 2 points before clicking "Enter"');
        return;
      }

      try {
        setIsDelay(true);
        const response = await fetch(`${API_BASE_URL}/api/polygons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: new Date().toISOString(),
            points,
            color: polygonColor,
          }),
        });

        const data = await response.json().catch(() => null);
        const newPolygon = data?.data ?? data;

        if (response.ok) {
          if (newPolygon) {
            setPolygons((prev) => [...prev, newPolygon]);
          } else {
            const listRes = await fetch(`${API_BASE_URL}/api/polygons`);
            const listJson = await listRes.json();
            const listPayload = listJson?.data ?? listJson;
            setPolygons(listPayload ?? []);
          }
        } else {
          console.error("Error adding polygon:", data ?? response.statusText);
        }
      } catch (err) {
        console.error("Error adding polygon:", err);
      } finally {
        startDelay();
      }
    },
    [polygonColor, startDelay]
  );

  const handleDeletePolygon = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this polygon?")) {
        return;
      }
      try {
        setIsDelay(true);
        const response = await fetch(`${API_BASE_URL}/api/polygons/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPolygons((prev) => prev.filter((p) => p.id !== id));
        } else {
          const errJson = await response.json().catch(() => null);
          console.error(
            "Error deleting polygon:",
            errJson?.message ?? response.statusText
          );
        }
      } catch (err) {
        console.error("Error deleting polygon:", err);
      } finally {
        startDelay();
      }
    },
    [startDelay]
  );

  const handlePolygonHover = useCallback((id) => {
    setHoveredPolygonId(id);
  }, []);

  const handlePolygonMouseLeave = useCallback(() => {
    setHoveredPolygonId(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      polygons,
      isLoading,
      isDelay,
      error,
      polygonColor,
      setPolygonColor,
      handleAddPolygon,
      handleDeletePolygon,
      hoveredPolygonId,
      handlePolygonHover,
      handlePolygonMouseLeave,
    }),
    [
      polygons,
      isLoading,
      isDelay,
      error,
      polygonColor,
      handleAddPolygon,
      handleDeletePolygon,
      hoveredPolygonId,
      handlePolygonHover,
      handlePolygonMouseLeave,
    ]
  );

  return (
    <PolygonsContext.Provider value={contextValue}>
      {children}
    </PolygonsContext.Provider>
  );
};

export const usePolygons = () => {
  const context = useContext(PolygonsContext);
  if (!context) {
    throw new Error("usePolygons must be used within a PolygonsProvider");
  }
  return context;
};
