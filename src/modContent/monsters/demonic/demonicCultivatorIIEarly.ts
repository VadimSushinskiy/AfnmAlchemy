import { EnemyEntity } from 'afnm-types';

export const demonicCultivatorII: EnemyEntity = {
  name: 'Demonic Cultivator',
  image: window.modAPI.gameData.characters['demonicCultivatorIIEarly'].image,
  imageScale: 1,
  realm: 'meridianOpening',
  realmProgress: 'Early',
  difficulty: 'hard',
  battleLength: 'long',
  stances: [
    {
      name: 'attack',
      techniques: [
        window.modAPI.gameData.techniques['Scarlet Spear'],
        window.modAPI.gameData.techniques['Consume Corruption'],
        window.modAPI.gameData.techniques['Scarlet Spear'],
        window.modAPI.gameData.techniques['Cleanse Blood'],
      ],
    },
  ],
  stanceRotation: [
    {
      kind: 'single',
      stance: 'attack',
    },
  ],
  rotationOverrides: [],
  drops: [
    {
      item: window.modAPI.gameData.items['Enhancement Dust'],
      chance: 1,
      amount: 10
    }
  ]
}