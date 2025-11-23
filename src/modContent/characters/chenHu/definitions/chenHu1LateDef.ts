import { CompanionCharacterDefinition, MountItem } from 'afnm-types';
import { interaction1Early } from '../interactions/interaction1Early';
import { sparInteraction } from '../interactions/sparInteraction';

export const chenHu1LateDef: CompanionCharacterDefinition = {
  kind: 'companion',
  condition: '1',
  realm: 'bodyForging',
  realmProgress: 'Late',
  stats: [
    {
      condition: '1',
      stats: {
        difficulty: 'hard',
        battleLength: 'long',
        stances: [
          {
            name: 'attack1',
            techniques: [
              window.modAPI.gameData.techniques['Gale Blast'],
              window.modAPI.gameData.techniques['Gather Clouds'],
              window.modAPI.gameData.techniques['Wind Wall'],
            ]
          },
          {
            name: 'attack2',
            techniques: [
              window.modAPI.gameData.techniques['Gale Blast'],
              window.modAPI.gameData.techniques['Gather Clouds'],
              window.modAPI.gameData.techniques['Lightning Strike'],
            ]
          },
          {
            name: 'attack3',
            techniques: [
              window.modAPI.gameData.techniques['Wind Wall'],
              window.modAPI.gameData.techniques['Lightning Strike'],
              window.modAPI.gameData.techniques['Lightning Strike'],
            ]
          }
        ],
        stanceRotation: [
          {
            kind: 'single',
            stance: 'attack1'
          },
          {
            kind: 'single',
            stance: 'attack2'
          },
          {
            kind: 'single',
            stance: 'attack3',
            condition: 'Cloud > 11'
          }
        ],
        rotationOverrides: [],
        drops: [],
        affinities: {
          cloud: 30,
          fist: 30,
          blood: 30,
          blossom: 30,
          celestial: 30,
          weapon: 30,
          none: 15
        },
        artefacts: [{name: window.modAPI.gameData.items['Blade of First Mountain'].name}],
        talismans: [{name: window.modAPI.gameData.items['Shield Talisman (I)'].name}]
      }
    }
  ],
  talkInteraction: [interaction1Early],
  sparInteraction: [sparInteraction],
  encounters: [],
  locations: [
    {
      kind: 'wander',
      condition: '1',
      route: [
        {
          location: 'Spirit Well',
          duration: {min: 1, max: 2}
        },
        {
          location: 'Heian Forest',
          duration: {min: 1, max: 2}
        },
        {
          location: 'Nine Mountain Sect',
          duration: {min: 1, max: 2}
        },
        {
          location: 'Heian Forest',
          duration: {min: 1, max: 2}
        }
      ]
    }
  ],
  mount: window.modAPI.gameData.items['Grade I Flying Sword'] as MountItem
}