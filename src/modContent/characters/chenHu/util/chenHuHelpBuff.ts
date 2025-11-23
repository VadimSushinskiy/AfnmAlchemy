import { Buff } from 'afnm-types';
import image from '../../../../assets/image.png';

export const chenHuHelp: Buff = {
  name: 'Partner',
  icon: image,
  canStack: false,
  stats: {
    power: {
      value: 0.3,
      stat: 'power'
    },
    defense: {
      value: 3,
      stat: 'power'
    },
    barrierMitigation: {
      value: 15,
      stat: undefined
    }
  },
  onTechniqueEffects: [],
  onRoundEffects: [],
  stacks: 1
}