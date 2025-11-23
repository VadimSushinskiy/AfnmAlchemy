import { Character } from 'afnm-types';
import { chenHuMet, chenHuName } from './chenHuFlags';
import { acquaintance } from './relationship/acquaintance';
import { chenHu1LateDef } from './definitions/chenHu1LateDef';

export const chenHu: Character = {
  name: chenHuName,
  allegiance: 'Nine Mountains',
  bio: 'A cultivator from the Nine Mountains Sect who loves getting into trouble. He proclaimed himself your elder brother. Despite his cheerful personality, his past is mysterious, and no one knows his motives.',
  definitions: [
    chenHu1LateDef
  ],
  condition: chenHuMet,
  image: window.modAPI.gameData.characters['Tidao Feng'].image,
  portrait: window.modAPI.gameData.characters['Tidao Feng'].portrait,
  relationship: [acquaintance]
}