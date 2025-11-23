import { SparCharacterInteraction } from 'afnm-types';
import { chenHuName } from '../chenHuFlags';

export const sparInteraction: SparCharacterInteraction = {
  condition: '1',
  introSteps: [
    {
      kind: 'text',
      text: `You watch ${chenHuName} do strange exercises.`
    },
    {
      kind: 'speech',
      character: chenHuName,
      text: '"Hey, {forename}. How about a little workout?"'
    }
  ],
  victorySteps: [
    {
      kind: 'reputation',
      amount: '1',
      name: 'Nine Mountain Sect',
      max: "exalted",
    },
    {
      kind: 'approval',
      character: chenHuName,
      amount: '1',
    },
    {
      kind: 'speech',
      character: chenHuName,
      text: '"You\'re not bad, but don\'t get cocky, your elder brother was just playing with you."'
    }
  ],
  defeatSteps: [
    {
      kind: 'speech',
      character: chenHuName,
      text: '"Heh, you\'re still far from your elder brother, practice more."'
    }
  ],
  cooldown: 3
}