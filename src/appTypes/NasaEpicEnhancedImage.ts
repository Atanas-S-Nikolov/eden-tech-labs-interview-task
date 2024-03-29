export interface NasaEpicEnhancedImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: CentroidCoordinates;
  dscovr_j2000_position: DscovrJ2000Position;
  lunar_j2000_position: DscovrJ2000Position;
  sun_j2000_position: DscovrJ2000Position;
  attitude_quaternions: AttitudeQuaternions;
  date: string;
  coords: Coords;
}

interface Coords {
  centroid_coordinates: CentroidCoordinates;
  dscovr_j2000_position: DscovrJ2000Position;
  lunar_j2000_position: DscovrJ2000Position;
  sun_j2000_position: DscovrJ2000Position;
  attitude_quaternions: AttitudeQuaternions;
}

interface AttitudeQuaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

interface DscovrJ2000Position {
  x: number;
  y: number;
  z: number;
}

interface CentroidCoordinates {
  lat: number;
  lon: number;
}
