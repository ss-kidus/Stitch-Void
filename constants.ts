import { CellType, LevelData } from './types';

export const GRID_SIZE = 12;

export const INITIAL_LEVEL: LevelData = {
  id: '882_CAT',
  name: 'Fragment 882',
  description: 'Corrupted feline asset. Requires precise synchronization.',
  difficulty: 'CRITICAL',
  gridSize: GRID_SIZE,
  parStitches: 15,
  inputs: [1, 0, 1, 1],
  expectedOutputs: [1, 1, 0, 1]
};

export const MOCK_QUEUE = [
  { id: '882_CAT', name: 'ARTIFACT_882', status: 'PENDING', damage: '84%' },
  { id: '04B_FRAG', name: 'FRAGMENT_04B', status: 'PENDING', damage: '42%' },
  { id: 'ENC_SIG', name: 'ENCRYPTED_SIGNAL', status: 'LOCKED', damage: '??%' },
];

export const PATTERN_LIBRARY = [
  { name: 'XOR_STITCH_A', cost: 12, delay: 2, desc: 'Basic comparator circuit.' },
  { name: 'AND_WEAVE_01', cost: 8, delay: 1, desc: 'Standard intersection gate.' },
  { name: 'NOT_INVERTER', cost: 4, delay: 0.5, desc: 'Signal negation knot.' },
];
