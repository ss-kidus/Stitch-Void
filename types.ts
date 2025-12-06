export enum ScreenState {
  BOOT = 'BOOT',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  LOOM = 'LOOM',
  MAP = 'MAP',
  PROFILE = 'PROFILE',
  LIBRARY = 'LIBRARY'
}

export enum CellType {
  EMPTY = 'EMPTY',
  WIRE = 'WIRE',
  CROSS_STITCH = 'CROSS_STITCH', // AND Gate behavior
  KNOT = 'KNOT', // NOT Gate behavior
  EMITTER = 'EMITTER',
  RECEIVER = 'RECEIVER',
  BLOCKER = 'BLOCKER'
}

export interface GridCell {
  x: number;
  y: number;
  type: CellType;
  rotation: number; // 0, 90, 180, 270
  locked: boolean;
}

export interface Packet {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  val: 0 | 1;
}

export interface LevelData {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  gridSize: number;
  parStitches: number;
  inputs: number[]; // Binary sequence
  expectedOutputs: number[];
}
