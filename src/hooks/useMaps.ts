import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { MapUnit, MapLayer, UnitsByArea, PaginatedResponse } from "@/types";
import MapService from "@/services/mapService";

export interface UseMapsReturn {
  loading: boolean;
  error: string | null;
  units: MapUnit[];
  layers: MapLayer[];
  unitsByArea: UnitsByArea | null;
  filters: {
    projectId?: string;
    status?: string;
    type?: string;
    bounds?: string;
    radius?: number;
    center?: { lat: number; lng: number };
  };
  setFilters: (filters: Partial<UseMapsReturn["filters"]>) => void;
  fetchUnits: (filters?: any) => Promise<void>;
  createUnit: (unitData: Partial<MapUnit>) => Promise<MapUnit>;
  updateUnitCoordinates: (
    unitId: string,
    coordinates: { lat: number; lng: number }
  ) => Promise<MapUnit>;
  bulkUpdateCoordinates: (
    updates: Array<{
      unitId: string;
      coordinates: { lat: number; lng: number };
    }>
  ) => Promise<MapUnit[]>;
  getUnitsByLocation: (bounds: string, status?: string) => Promise<MapUnit[]>;
  getUnitsByRadius: (
    center: { lat: number; lng: number },
    radiusKm: number,
    status?: string
  ) => Promise<MapUnit[]>;
  fetchMapLayers: () => Promise<void>;
  createMapLayer: (layerData: Partial<MapLayer>) => Promise<MapLayer>;
  updateMapLayer: (
    layerId: string,
    updates: Partial<MapLayer>
  ) => Promise<MapLayer>;
  deleteMapLayer: (layerId: string) => Promise<void>;
  fetchUnitsByArea: (projectId?: string) => Promise<void>;
  getGeographicDistribution: (projectId?: string) => Promise<any>;
  getProximityAnalysis: (unitId: string, radiusKm: number) => Promise<any>;
  getUnitsInPolygon: (
    polygon: Array<{ lat: number; lng: number }>,
    status?: string
  ) => Promise<MapUnit[]>;
  exportMapData: (
    format: "csv" | "geojson" | "kml",
    filters?: any
  ) => Promise<{ downloadUrl: string; expiresAt: string }>;
  generateMapReport: (projectId?: string) => Promise<any>;
  clearError: () => void;
  resetFilters: () => void;
}

export function useMaps(): UseMapsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<MapUnit[]>([]);
  const [layers, setLayers] = useState<MapLayer[]>([]);
  const [unitsByArea, setUnitsByArea] = useState<UnitsByArea | null>(null);
  const [filters, setFilters] = useState<UseMapsReturn["filters"]>({});

  const fetchUnits = useCallback(
    async (customFilters?: any) => {
      try {
        setLoading(true);
        setError(null);

        const response = await MapService.getUnits({
          ...filters,
          ...customFilters,
        });
        setUnits(response.data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message || "Failed to fetch units";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const createUnit = useCallback(async (unitData: Partial<MapUnit>) => {
    try {
      setError(null);

      const newUnit = await MapService.createUnit(unitData);
      setUnits((prev) => [...prev, newUnit]);
      toast.success("Unit created successfully");
      return newUnit;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to create unit";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const updateUnitCoordinates = useCallback(
    async (unitId: string, coordinates: { lat: number; lng: number }) => {
      try {
        setError(null);

        const updatedUnit = await MapService.updateUnitCoordinates(
          unitId,
          coordinates
        );
        setUnits((prev) =>
          prev.map((unit) => (unit.id === unitId ? updatedUnit : unit))
        );
        toast.success("Unit coordinates updated successfully");
        return updatedUnit;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to update unit coordinates";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const bulkUpdateCoordinates = useCallback(
    async (
      updates: Array<{
        unitId: string;
        coordinates: { lat: number; lng: number };
      }>
    ) => {
      try {
        setError(null);

        const updatedUnits = await MapService.bulkUpdateCoordinates(updates);
        setUnits((prev) =>
          prev.map((unit) => {
            const update = updates.find((u) => u.unitId === unit.id);
            return update
              ? updatedUnits.find((u) => u.id === unit.id) || unit
              : unit;
          })
        );
        toast.success("Bulk coordinates update completed");
        return updatedUnits;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to bulk update coordinates";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getUnitsByLocation = useCallback(
    async (bounds: string, status?: string) => {
      try {
        setError(null);

        const units = await MapService.getUnitsByLocation(bounds, status);
        return units;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch units by location";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getUnitsByRadius = useCallback(
    async (
      center: { lat: number; lng: number },
      radiusKm: number,
      status?: string
    ) => {
      try {
        setError(null);

        const units = await MapService.getUnitsByRadius(
          center,
          radiusKm,
          status
        );
        return units;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch units by radius";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const fetchMapLayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await MapService.getMapLayers();
      setLayers(response);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to fetch map layers";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMapLayer = useCallback(async (layerData: Partial<MapLayer>) => {
    try {
      setError(null);

      const newLayer = await MapService.createMapLayer(layerData);
      setLayers((prev) => [...prev, newLayer]);
      toast.success("Map layer created successfully");
      return newLayer;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to create map layer";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const updateMapLayer = useCallback(
    async (layerId: string, updates: Partial<MapLayer>) => {
      try {
        setError(null);

        const updatedLayer = await MapService.updateMapLayer(layerId, updates);
        setLayers((prev) =>
          prev.map((layer) => (layer.id === layerId ? updatedLayer : layer))
        );
        toast.success("Map layer updated successfully");
        return updatedLayer;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message || "Failed to update map layer";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const deleteMapLayer = useCallback(async (layerId: string) => {
    try {
      setError(null);

      await MapService.deleteMapLayer(layerId);
      setLayers((prev) => prev.filter((layer) => layer.id !== layerId));
      toast.success("Map layer deleted successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to delete map layer";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const fetchUnitsByArea = useCallback(async (projectId?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await MapService.getUnitsByArea(projectId);
      setUnitsByArea(response);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to fetch units by area";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getGeographicDistribution = useCallback(async (projectId?: string) => {
    try {
      setError(null);

      const distribution = await MapService.getGeographicDistribution(
        projectId
      );
      return distribution;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        "Failed to fetch geographic distribution";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const getProximityAnalysis = useCallback(
    async (unitId: string, radiusKm: number) => {
      try {
        setError(null);

        const analysis = await MapService.getProximityAnalysis(
          unitId,
          radiusKm
        );
        return analysis;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch proximity analysis";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getUnitsInPolygon = useCallback(
    async (polygon: Array<{ lat: number; lng: number }>, status?: string) => {
      try {
        setError(null);

        const units = await MapService.getUnitsInPolygon(polygon, status);
        return units;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch units in polygon";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const exportMapData = useCallback(
    async (format: "csv" | "geojson" | "kml", customFilters?: any) => {
      try {
        setError(null);

        const result = await MapService.exportMapData(format, {
          ...filters,
          ...customFilters,
        });
        toast.success("Map data exported successfully");
        return result;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message || "Failed to export map data";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    [filters]
  );

  const generateMapReport = useCallback(async (projectId?: string) => {
    try {
      setError(null);

      const report = await MapService.generateMapReport(projectId);
      toast.success("Map report generated successfully");
      return report;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to generate map report";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchUnits();
    fetchMapLayers();
  }, [fetchUnits, fetchMapLayers]);

  return {
    loading,
    error,
    units,
    layers,
    unitsByArea,
    filters,
    setFilters,
    fetchUnits,
    createUnit,
    updateUnitCoordinates,
    bulkUpdateCoordinates,
    getUnitsByLocation,
    getUnitsByRadius,
    fetchMapLayers,
    createMapLayer,
    updateMapLayer,
    deleteMapLayer,
    fetchUnitsByArea,
    getGeographicDistribution,
    getProximityAnalysis,
    getUnitsInPolygon,
    exportMapData,
    generateMapReport,
    clearError,
    resetFilters,
  };
}
