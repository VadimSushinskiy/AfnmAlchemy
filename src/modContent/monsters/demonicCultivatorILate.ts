import { CombatPillItem, EnemyEntity } from 'afnm-types';

export const demonicCultivatorI: EnemyEntity = {
  name: 'Demonic Cultivator',
  image: window.modAPI.gameData.characters['demonicCultivatorIIEarly'].image,
  imageScale: 1,
  realm: 'bodyForging',
  realmProgress: 'Late',
  difficulty: 'hard',
  battleLength: 'long',
  stances: [
    {
      name: 'attack1',
      techniques: [
        window.modAPI.gameData.techniques['Arterial Ejection'],
        window.modAPI.gameData.techniques['Violent Purge'],
        window.modAPI.gameData.techniques['Blood Bolt'],
      ]
    },
    {
      name: 'attack2',
      techniques: [
        window.modAPI.gameData.techniques['Purify Blood'],
        window.modAPI.gameData.techniques['Blood Bolt'],
        window.modAPI.gameData.techniques['Consume Corruption'],
      ]
    },
    {
      name: 'attack3',
      techniques: [
        window.modAPI.gameData.techniques['Arterial Ejection'],
        window.modAPI.gameData.techniques['Blood Bolt'],
        window.modAPI.gameData.techniques['Consume Corruption'],
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
      stance: 'attack3'
    }
  ],
  rotationOverrides: [],
  drops: [
    {
      item: window.modAPI.gameData.items['Enhancement Dust'],
      chance: 1,
      amount: 10
    }
  ],
  pills: [
    {
      condition: 'hp < 0.5 * maxhp',
      pill: window.modAPI.gameData.items['Healing Pill (I)'] as CombatPillItem
    },
    {
      condition: 'hp < 0.5 * maxhp',
      pill: window.modAPI.gameData.items['Healing Pill (I)'] as CombatPillItem
    }
  ]
}