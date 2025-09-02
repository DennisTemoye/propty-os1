import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import {
  MapUnit,
  MapLayer,
  UnitsByArea,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

export class MapService {
  // ===== Unit Management =====

  /**
   * Fetch map units with optional filters
   */
  static async getUnits(filters?: {
    projectId?: string;
    blockId?: string;
    status?: string;
    type?: string;
    floor?: number;
    bounds?: string; // lat1,lng1,lat2,lng2
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<MapUnit>> {
    try {
      const response = await apiService.get(API_ENDPOINTS.MAPS.UNITS.BASE, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch map units: ${error}`);
    }
  }

  /**
   * Create a new map unit with coordinates
   */
  static async createUnit(unitData: Partial<MapUnit>): Promise<MapUnit> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.MAPS.UNITS.BASE,
        unitData
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to create map unit: ${error}`);
    }
  }

  /**
   * Update unit coordinates
   */
  static async updateUnitCoordinates(
    unitId: string,
    coordinates: { lat: number; lng: number }
  ): Promise<MapUnit> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.MAPS.UNITS.COORDINATES(unitId),
        { coordinates }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to update unit coordinates: ${error}`);
    }
  }

  /**
   * Bulk update unit coordinates
   */
  static async bulkUpdateCoordinates(
    updates: Array<{
      unitId: string;
      coordinates: { lat: number; lng: number };
    }>
  ): Promise<MapUnit[]> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.MAPS.UNITS.BULK_COORDINATES,
        { updates }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to bulk update coordinates: ${error}`);
    }
  }

  /**
   * Get units by geographic bounds
   */
  static async getUnitsByLocation(
    bounds: string,
    status?: string
  ): Promise<MapUnit[]> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.MAPS.UNITS.BY_LOCATION,
        {
          params: { bounds, status },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch units by location: ${error}`);
    }
  }

  /**
   * Get units within a radius of a point
   */
  static async getUnitsByRadius(
    center: { lat: number; lng: number },
    radiusKm: number,
    status?: string
  ): Promise<MapUnit[]> {
    try {
      // Calculate bounds based on radius
      const latDelta = radiusKm / 111.32; // 1 degree latitude ≈ 111.32 km
      const lngDelta =
        radiusKm / (111.32 * Math.cos((center.lat * Math.PI) / 180));

      const bounds = [
        center.lat - latDelta,
        center.lng - lngDelta,
        center.lat + latDelta,
        center.lng + lngDelta,
      ].join(",");

      return this.getUnitsByLocation(bounds, status);
    } catch (error) {
      throw new Error(`Failed to fetch units by radius: ${error}`);
    }
  }

  // ===== Map Layers =====

  /**
   * Fetch map layers
   */
  static async getMapLayers(): Promise<MapLayer[]> {
    try {
      const response = await apiService.get(API_ENDPOINTS.MAPS.LAYERS.BASE);
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch map layers: ${error}`);
    }
  }

  /**
   * Create a new map layer
   */
  static async createMapLayer(layerData: Partial<MapLayer>): Promise<MapLayer> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.MAPS.LAYERS.BASE,
        layerData
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to create map layer: ${error}`);
    }
  }

  /**
   * Update a map layer
   */
  static async updateMapLayer(
    layerId: string,
    updates: Partial<MapLayer>
  ): Promise<MapLayer> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.MAPS.LAYERS.BY_ID(layerId),
        updates
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to update map layer: ${error}`);
    }
  }

  /**
   * Delete a map layer
   */
  static async deleteMapLayer(layerId: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.MAPS.LAYERS.BY_ID(layerId));
    } catch (error) {
      throw new Error(`Failed to delete map layer: ${error}`);
    }
  }

  // ===== Geographic Analytics =====

  /**
   * Get units by area analysis
   */
  static async getUnitsByArea(projectId?: string): Promise<UnitsByArea> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.MAPS.ANALYTICS.UNITS_BY_AREA,
        {
          params: { projectId },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch units by area: ${error}`);
    }
  }

  /**
   * Get geographic distribution of units
   */
  static async getGeographicDistribution(projectId?: string): Promise<{
    totalUnits: number;
    distributionByStatus: Array<{
      status: string;
      count: number;
      percentage: number;
    }>;
    distributionByType: Array<{
      type: string;
      count: number;
      percentage: number;
    }>;
    densityMap: Array<{
      area: string;
      unitCount: number;
      density: number; // units per square km
    }>;
  }> {
    try {
      const units = await this.getUnits({ projectId, limit: 10000 });
      const unitsByArea = await this.getUnitsByArea(projectId);

      const totalUnits = units.data.length;

      // Group by status
      const statusCount = new Map<string, number>();
      units.data.forEach((unit) => {
        statusCount.set(unit.status, (statusCount.get(unit.status) || 0) + 1);
      });

      const distributionByStatus = Array.from(statusCount.entries()).map(
        ([status, count]) => ({
          status,
          count,
          percentage: totalUnits > 0 ? (count / totalUnits) * 100 : 0,
        })
      );

      // Group by type
      const typeCount = new Map<string, number>();
      units.data.forEach((unit) => {
        typeCount.set(unit.type, (typeCount.get(unit.type) || 0) + 1);
      });

      const distributionByType = Array.from(typeCount.entries()).map(
        ([type, count]) => ({
          type,
          count,
          percentage: totalUnits > 0 ? (count / totalUnits) * 100 : 0,
        })
      );

      // Calculate density map (assuming each area has a defined size)
      const densityMap = unitsByArea.areas.map((area) => ({
        area: area.area,
        unitCount: area.totalUnits,
        density: area.totalUnits / 1, // Assuming 1 sq km per area for now
      }));

      return {
        totalUnits,
        distributionByStatus,
        distributionByType,
        densityMap,
      };
    } catch (error) {
      throw new Error(`Failed to fetch geographic distribution: ${error}`);
    }
  }

  /**
   * Get proximity analysis for a unit
   */
  static async getProximityAnalysis(
    unitId: string,
    radiusKm: number = 1
  ): Promise<{
    centerUnit: MapUnit;
    nearbyUnits: Array<{
      unit: MapUnit;
      distance: number;
      bearing: number;
    }>;
    proximityStats: {
      totalNearby: number;
      averageDistance: number;
      closestUnit: MapUnit | null;
      farthestUnit: MapUnit | null;
    };
  }> {
    try {
      const centerUnit = await this.getUnitById(unitId);
      if (!centerUnit) {
        throw new Error("Center unit not found");
      }

      const nearbyUnits = await this.getUnitsByRadius(
        centerUnit.coordinates,
        radiusKm
      );

      // Calculate distances and bearings
      const unitsWithDistance = nearbyUnits
        .filter((unit) => unit.id !== unitId)
        .map((unit) => {
          const distance = this.calculateDistance(
            centerUnit.coordinates,
            unit.coordinates
          );
          const bearing = this.calculateBearing(
            centerUnit.coordinates,
            unit.coordinates
          );
          return { unit, distance, bearing };
        })
        .sort((a, b) => a.distance - b.distance);

      const totalNearby = unitsWithDistance.length;
      const averageDistance =
        totalNearby > 0
          ? unitsWithDistance.reduce((sum, item) => sum + item.distance, 0) /
            totalNearby
          : 0;

      return {
        centerUnit,
        nearbyUnits: unitsWithDistance,
        proximityStats: {
          totalNearby,
          averageDistance,
          closestUnit: totalNearby > 0 ? unitsWithDistance[0].unit : null,
          farthestUnit:
            totalNearby > 0 ? unitsWithDistance[totalNearby - 1].unit : null,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch proximity analysis: ${error}`);
    }
  }

  // ===== Helper Methods =====

  /**
   * Get unit by ID
   */
  private static async getUnitById(unitId: string): Promise<MapUnit | null> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.MAPS.UNITS.BY_ID(unitId)
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  private static calculateDistance(
    coord1: { lat: number; lng: number },
    coord2: { lat: number; lng: number }
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLng = this.toRadians(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.lat)) *
        Math.cos(this.toRadians(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Calculate bearing between two coordinates
   */
  private static calculateBearing(
    coord1: { lat: number; lng: number },
    coord2: { lat: number; lng: number }
  ): number {
    const dLng = this.toRadians(coord2.lng - coord1.lng);
    const lat1 = this.toRadians(coord1.lat);
    const lat2 = this.toRadians(coord2.lat);

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = this.toDegrees(bearing);
    bearing = (bearing + 360) % 360;

    return bearing;
  }

  /**
   * Convert degrees to radians
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Convert radians to degrees
   */
  private static toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  // ===== Spatial Queries =====

  /**
   * Find units within a polygon
   */
  static async getUnitsInPolygon(
    polygon: Array<{ lat: number; lng: number }>,
    status?: string
  ): Promise<MapUnit[]> {
    try {
      // Convert polygon to bounds for API call
      const lats = polygon.map((p) => p.lat);
      const lngs = polygon.map((p) => p.lng);

      const bounds = [
        Math.min(...lats),
        Math.min(...lngs),
        Math.max(...lats),
        Math.max(...lngs),
      ].join(",");

      const units = await this.getUnitsByLocation(bounds, status);

      // Filter units that are actually inside the polygon
      return units.filter((unit) =>
        this.isPointInPolygon(unit.coordinates, polygon)
      );
    } catch (error) {
      throw new Error(`Failed to fetch units in polygon: ${error}`);
    }
  }

  /**
   * Check if a point is inside a polygon using ray casting algorithm
   */
  private static isPointInPolygon(
    point: { lat: number; lng: number },
    polygon: Array<{ lat: number; lng: number }>
  ): boolean {
    let inside = false;
    const { lat, lng } = point;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const { lat: lati, lng: lngi } = polygon[i];
      const { lat: latj, lng: lngj } = polygon[j];

      if (
        lati > lat !== latj > lat &&
        lng < ((lngj - lngi) * (lat - lati)) / (latj - lati) + lngi
      ) {
        inside = !inside;
      }
    }

    return inside;
  }

  // ===== Export & Reporting =====

  /**
   * Export map data
   */
  static async exportMapData(
    format: "csv" | "geojson" | "kml",
    filters?: any
  ): Promise<{ downloadUrl: string; expiresAt: string }> {
    try {
      const response = await apiService.post("/maps/export", {
        format,
        filters,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to export map data: ${error}`);
    }
  }

  /**
   * Generate map report
   */
  static async generateMapReport(projectId?: string): Promise<{
    summary: {
      totalUnits: number;
      totalArea: number;
      averageDensity: number;
    };
    distribution: {
      byStatus: Array<{ status: string; count: number; percentage: number }>;
      byType: Array<{ type: string; count: number; percentage: number }>;
      byFloor: Array<{ floor: number; count: number; percentage: number }>;
    };
    geographic: {
      bounds: { north: number; south: number; east: number; west: number };
      center: { lat: number; lng: number };
      totalArea: number;
    };
  }> {
    try {
      const units = await this.getUnits({ projectId, limit: 10000 });
      const unitsByArea = await this.getUnitsByArea(projectId);

      const totalUnits = units.data.length;

      // Calculate bounds
      const lats = units.data.map((u) => u.coordinates.lat);
      const lngs = units.data.map((u) => u.coordinates.lng);

      const bounds = {
        north: Math.max(...lats),
        south: Math.min(...lats),
        east: Math.max(...lngs),
        west: Math.min(...lngs),
      };

      const center = {
        lat: (bounds.north + bounds.south) / 2,
        lng: (bounds.east + bounds.west) / 2,
      };

      // Calculate total area (approximate)
      const totalArea = this.calculateArea(bounds);

      // Group by status
      const statusCount = new Map<string, number>();
      units.data.forEach((unit) => {
        statusCount.set(unit.status, (statusCount.get(unit.status) || 0) + 1);
      });

      const byStatus = Array.from(statusCount.entries()).map(
        ([status, count]) => ({
          status,
          count,
          percentage: totalUnits > 0 ? (count / totalUnits) * 100 : 0,
        })
      );

      // Group by type
      const typeCount = new Map<string, number>();
      units.data.forEach((unit) => {
        typeCount.set(unit.type, (typeCount.get(unit.type) || 0) + 1);
      });

      const byType = Array.from(typeCount.entries()).map(([type, count]) => ({
        type,
        count,
        percentage: totalUnits > 0 ? (count / totalUnits) * 100 : 0,
      }));

      // Group by floor
      const floorCount = new Map<number, number>();
      units.data.forEach((unit) => {
        floorCount.set(unit.floor, (floorCount.get(unit.floor) || 0) + 1);
      });

      const byFloor = Array.from(floorCount.entries())
        .sort(([a], [b]) => a - b)
        .map(([floor, count]) => ({
          floor,
          count,
          percentage: totalUnits > 0 ? (count / totalUnits) * 100 : 0,
        }));

      return {
        summary: {
          totalUnits,
          totalArea,
          averageDensity: totalArea > 0 ? totalUnits / totalArea : 0,
        },
        distribution: {
          byStatus,
          byType,
          byFloor,
        },
        geographic: {
          bounds,
          center,
          totalArea,
        },
      };
    } catch (error) {
      throw new Error(`Failed to generate map report: ${error}`);
    }
  }

  /**
   * Calculate area of a bounding box
   */
  private static calculateArea(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): number {
    const latDiff = bounds.north - bounds.south;
    const lngDiff = bounds.east - bounds.west;

    // Approximate area calculation (simplified)
    const avgLat = (bounds.north + bounds.south) / 2;
    const latMeters = latDiff * 111320; // 1 degree latitude ≈ 111,320 meters
    const lngMeters = lngDiff * (111320 * Math.cos((avgLat * Math.PI) / 180));

    return (latMeters * lngMeters) / 1000000; // Convert to square kilometers
  }
}

export default MapService;
