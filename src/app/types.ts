import { Shape } from 'three'

export interface Hex {
  x: number;
  y: number;
  z: number;
  h: number;
  shape: Shape;
}

export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export interface Coordinates2D {
  x: number;
  y: number;
}
