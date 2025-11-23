import { ShopCharacterInteraction } from 'afnm-types';
import { chenHuName } from '../chenHuFlags';

export const chenHuShopI: ShopCharacterInteraction = {
  condition: '1',
  stock: {
    mundane: [],
    bodyForging: [
      {...window.modAPI.gameData.items['Remembrance of Blossom (I)'], stacks: 5},
      {...window.modAPI.gameData.items['Remembrance of Fist (I)'], stacks: 5},
    ],
    meridianOpening: [],
    qiCondensation: [],
    coreFormation: [],
    pillarCreation: [],
    lifeFlourishing: [],
    worldShaping: [],
    innerGenesis: [],
    soulAscension: []
  },
  costMultiplier: 0.8,
  introSteps: [
    {
      kind: 'speech',
      character: chenHuName,
      text: '"Came to see my honestly sto-, ahem, earned goods?"'
    }
  ],
  exitSteps: [
    {
      kind: 'speech',
      character: chenHuName,
      text: '"Heh, thanks. That’ll be put to good use."'
    }
  ]
}