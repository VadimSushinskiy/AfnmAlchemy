import { CustomCharacterInteractionBlock, EnemyEntity, EventStep } from 'afnm-types';
import { Explore } from "@mui/icons-material"
import { chenHuAdventureMonth, chenHuName, playerAddress } from '../chenHuFlags';
import { rlm } from '../../../utils/eventUtils';
import { demonicCultivatorI } from '../../../monsters/demonic/demonicCultivatorILate';
import { chenHuHelp } from '../util/chenHuHelpBuff';
import { demonicCultivatorII } from '../../../monsters/demonic/demonicCultivatorIIEarly';

const getRobberyFailure = (
  spiritStones:number,
  enemies:EnemyEntity[]
):{condition: string, children: EventStep[]} => ({
  condition: '1',
  children: [
    {
      kind: 'text',
      text: 'Unfortunately, your greed let you down, carried away by the robbery, you didn\'t notice that you had exposed yourself.'
    },
    {
      kind: 'speech',
      character: chenHuName,
      text: 'Let\'s break through and escape, soon all the nearby Demonic Cultivators will come running here!'
    },
    {
      kind: 'combat',
      enemies: enemies,
      playerBuffs: [chenHuHelp],
      victory: [
        {
          kind: 'text',
          text: `While ${chenHuName} distracts them, you push away the nearest Demonic Cultivators and create a gap in their ranks. Seizing the moment, you both run away with all the stolen goods and, after several hours of pursuit, completely break away from them.`
        },
        {
          kind: 'speech',
          character: chenHuName,
          text: `"Heh, I told you we'd make it, ${playerAddress}. Stick with me and you'll never have to worry about spirit stones again. Here, I grabbed this during the battle."`
        },
        {
          kind: 'money',
          amount: `floor(${window.modAPI.utils.getNumericReward(spiritStones, 'bodyForging', 'Late')} * ({rng} + 0.5))`
        },
        {
          kind: 'approval',
          character: chenHuName,
          amount: '1'
        },
        {
          kind: 'text',
          text: `After this, you leave, agreeing not to tell anyone about this act of robbery.`
        },
        {
          kind: 'flag',
          flag: chenHuAdventureMonth,
          value: 'month + 3',
          global: true
        },
        {
          kind: 'exit'
        }
      ],
      defeat: [
        {
          kind: 'text',
          text: `Unfortunately, there are too many enemies, your strength is running out, and you still can't find the right moment to escape. This time, you've taken on too much.`
        },
        {
          kind: 'speech',
          character: chenHuName,
          text: `"Hold them for a few seconds, ${playerAddress}."`
        },
        {
          kind: 'text',
          text: `You rush forward, using your last bit of strength - anything to stall them for a few seconds. And you succeed, forcing the Demonic Cultivators to retreat a step before your reckless attack. That's enough for ${chenHuName}, who throws several devices at once - some explode, some emit poisonous smoke, some create shadow curtains, some have no clear purpose, but together they disorient your enemies, and you flee. ${chenHuName}'s devices were powerful enough, and the Demonic Cultivators couldn't even find your trail.`
        },
        {
          kind: 'speech',
          character: chenHuName,
          text: `"See, everything was safe, just like I promised, ${playerAddress}. But it's a shame we couldn't steal more."`
        },
        {
          kind: 'text',
          text: `After this, you leave, agreeing not to tell anyone about this act of robbery.`
        },
        {
          kind: 'flag',
          flag: chenHuAdventureMonth,
          value: 'month + 3',
          global: true
        },
        {
          kind: 'exit'
        }
      ]
    }
  ]
});

export const chenHuAdventureI: CustomCharacterInteractionBlock = {
  condition: '1',
  name: 'Adventure',
  tooltip: 'Go on an adventure with your elder brother.',
  icon: Explore,
  cooldown: 3,
  interaction: {
    condition: `month >= ${chenHuAdventureMonth}`,
    event: [
      {
        kind: 'speech',
        character: chenHuName,
        text: `"Hey, ${playerAddress}! Your elder brother found some Demonic Cultivators' camps nearby, we'll make a fortune by robbing them. I've already thought of everything, you just need to help me a little. And don't worry, with me the chances of failure are practically zero, heh. Are you with me?"`,
      },
      {
        kind: 'choice',
        choices: [
          {
            text: '"Lead the way, elder brother."',
            children: [
              {
                kind: 'speech',
                character: chenHuName,
                text: `"I knew you wouldn't refuse. I have a few locations in mind. The first has just a few cultivators, but loot isn't great. The second has a few dozen idiots and mountains of treasure. The third is a true Demonic Cultivators' camp, run by someone at the ${rlm('meridianOpening')} realm - it'll be a little dangerous, but the rewards are definitely worth it. What do you say?"`,
              },
              {
                kind: 'choice',
                choices: [
                  {
                    text: '"Small camp"',
                    children: [
                      {
                        kind: 'speech',
                        character: chenHuName,
                        text: `"Boring."`,
                      },
                      {
                        kind: 'location',
                        location: 'Heian Forest'
                      },
                      {
                        kind: 'text',
                        text: `You are moving towards a small camp of demonic cultivators. After several long hours, you find a group of buildings hidden in the forest. Exchanging glances with ${chenHuName}, you make your way inside.`
                      },
                      {
                        kind: 'label',
                        label: 'smallChoices'
                      },
                      {
                        kind: 'choice',
                        choices: [
                          {
                            text: 'Try to get into the largest house',
                            showCondition: 'bigSteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You sneak inside while no one's watching. The building is spacious and somewhat empty inside, but you and ${chenHuName} ignore this and rush to search every corner. You don't have much time, someone could spot you at any moment.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(1500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some herbs'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Small Claw'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Small Scale'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Thin Fur'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Thin Hide'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some qi elixirs'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: { name: 'Condensed Qi Elixir (I)'},
                                        amount: 'floor({rng} * 2 + 1)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'bigSteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'smallChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(750, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into the ordinary house',
                            showCondition: 'mediumSteal < 2',
                            children: [
                              {
                                kind: 'text',
                                text: `You sneak inside while no one's watching. The building is small, furniture is cramped everywhere, after examining the building you begin to explore the entire house in search of valuables, trying not to leave traces of your presence.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(750, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.6',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some herbs'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 2 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.75',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Small Claw'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Small Scale'}, amount: 'floor({rng} * 2 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.75',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Thin Fur'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Thin Hide'}, amount: 'floor({rng} * 2 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.2',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'mediumSteal',
                                        value: 'mediumSteal + 1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'smallChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(750, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into several small houses',
                            showCondition: 'smallSteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You separate and begin searching the many small, miniature buildings. They are extremely cramped and sparse inside, but perhaps, with luck, you'll find something.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(375, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.8',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some herbs'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: '1' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: '1' },
                                          { item: { name: 'Small Claw'}, amount: '1' },
                                          { item: { name: 'Small Scale'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Thin Fur'}, amount: '1' },
                                          { item: { name: 'Thin Hide'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.1',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'smallSteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'smallChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(750, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Leave',
                            showCondition: 'bigSteal == 1 || mediumSteal > 0 || smallSteal == 1',
                            children: [
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: 'bigSteal == 1 && mediumSteal == 2 && smallSteal == 1',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve taken everything you could find in that short amount of time and are leaving the camp. Surprisingly, you\'ve managed to do all this unnoticed.'
                                      }
                                    ]
                                  },
                                  {
                                    condition: '1',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve decided that you\'ve had enough loot and there\'s no need to take any more risks. You leave the camp before anyone notices you.'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                kind: 'speech',
                                character: chenHuName,
                                text: `"Heh, I told you we'd make it, ${playerAddress}, they didn't even notice us. Stick with me and you'll never have to worry about spirit stones again. Here, I stole these from a few demonic cultivators while we were leaving."`
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(750, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: 'bigSteal == 1 && mediumSteal == 2 && smallSteal == 1',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '2'
                                      }
                                    ]
                                  },
                                  {
                                    condition: '1',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '1'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                kind: 'text',
                                text: `After this, you leave, agreeing not to tell anyone about this act of robbery.`
                              },
                              {
                                kind: 'flag',
                                flag: chenHuAdventureMonth,
                                value: 'month + 3',
                                global: true
                              },
                              {
                                kind: 'exit'
                              }
                            ],
                          }
                        ]
                      }
                    ]
                  },
                  {
                    text: '"Large camp"',
                    children: [
                      {
                        kind: 'speech',
                        character: chenHuName,
                        text: `"Heh heh, go ahead {forename}, we're going to have some fun today."`,
                      },
                      {
                        kind: 'location',
                        location: 'Deep Heian Forest'
                      },
                      {
                        kind: 'text',
                        text: `You plunge into the depths of the forest, following little-known paths. After an unknown amount of time, you find a Demonic Cultivators' camp, consisting of several dozen buildings. Among them, the most notable are the alchemy pavilion, the forge, and a building resembling a treasury. You can also try searching ordinary houses.`
                      },
                      {
                        kind: 'label',
                        label: 'mediumChoices'
                      },
                      {
                        kind: 'choice',
                        choices: [
                          {
                            text: 'Try to get into the alchemy pavilion',
                            showCondition: 'alchemySteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You make your way into the alchemy pavilion. Inside, you're greeted by the strong smell of herbs and pills. It seems someone has been practicing alchemy here recently, perhaps they haven't had time to collect the results of their labors yet.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some herbs.'
                              },
                              {
                                kind: 'addMultipleItem',
                                items: [
                                  { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 5 + 1)' },
                                  { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 3 + 1)' },
                                  { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 3 + 1)' },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more herbs.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 7 + 1)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Flaring Yang Bud'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more herbs.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 7 + 1)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Flaring Yang Bud'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Healing Pill (I)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Regeneration Pill (I)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Healing Pill+ (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Regeneration Pill+ (I)'}, amount: 'floor({rng} * 3 + 1)' }
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Inner Fury Pill (I)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Ironskin Pill (I)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Inner Fury Pill+ (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Ironskin Pill+ (I)'}, amount: 'floor({rng} * 3 + 1)' }
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Refined Control Pill (I)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Refined Intensity Pill (I)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Refined Control Pill+ (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Refined Intensity Pill+ (I)'}, amount: 'floor({rng} * 3 + 1)' }
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found a cauldron that someone had forgotten.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Empowered Fusing Cauldron+ (I)'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.35',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'alchemySteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'mediumChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(1500, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into the forge',
                            showCondition: 'forgeSteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You make your way into the forge. It's hot and stuffy inside - the sound of work was just a short time ago. With any luck, you'll find what you came for.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some ore.'
                              },
                              {
                                kind: 'addMultipleItem',
                                items: [
                                  { item: { name: 'Tough Iron Ore'}, amount: 'floor({rng} * 3 + 3)' },
                                  { item: { name: 'Nether Jade'}, amount: 'floor({rng} * 3 + 1)' },
                                  { item: { name: 'Cold Iron'}, amount: 'floor({rng} * 3 + 1)' },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more ore.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Tough Iron Ore'}, amount: 'floor({rng} * 4 + 3)' },
                                          { item: { name: 'Nether Jade'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Cold Iron'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Ocean Nephrite'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more ore.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Tough Iron Ore'}, amount: 'floor({rng} * 4 + 3)' },
                                          { item: { name: 'Nether Jade'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Cold Iron'}, amount: 'floor({rng} * 4 + 1)' },
                                          { item: { name: 'Ocean Nephrite'}, amount: '1' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Small Claw'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Small Scale'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Thin Fur'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Thin Hide'}, amount: 'floor({rng} * 5 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found someone\'s unfinished work.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Armour Blank (I)'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Artefact Blank (I)'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Clothing Blank (I)'}, amount: 'floor({rng} * 2 + 1)' },
                                          { item: { name: 'Talisman Blank (I)'}, amount: 'floor({rng} * 2 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.85',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found someone\'s finished work.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Jia Plate+'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.35',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'forgeSteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'mediumChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(1500, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into the treasury',
                            showCondition: 'treasurySteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You target one of the largest buildings and enter while the cultivators are distracted. Inside, you see mountains of various items and spirit stones. It seems the Demonic Cultivators bring all their loot here before sending it to their superiors, and you arrive just before they do. However, this display of treasures seems suspicious: perhaps they're just a distraction from the real treasures?`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones.'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(3000, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(3000, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.75',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(3000, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some qi elixirs.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Condensed Qi Elixir (I)'},
                                        amount: 'floor({rng} * 3 + 1)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some qi elixirs.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Condensed Qi Elixir (I)'},
                                        amount: 'floor({rng} * 3 + 1)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.35',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'treasurySteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'mediumChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(1500, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into ordinary houses',
                            showCondition: 'ordinarySteal < 3',
                            children: [
                              {
                                kind: 'text',
                                text: `You decide to try your luck in ordinary houses. Having chosen a few, you rush to explore them: they are all similar to each other and don't have too many values, but you can still get something out of them.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones.'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(1500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(1500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some herbs.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Small Claw'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Small Scale'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Thin Fur'}, amount: 'floor({rng} * 5 + 1)' },
                                          { item: { name: 'Thin Hide'}, amount: 'floor({rng} * 5 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.2',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'ordinarySteal',
                                        value: 'ordinarySteal + 1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'mediumChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(1500, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI, demonicCultivatorI])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Leave',
                            showCondition: 'alchemySteal == 1 || forgeSteal == 1 || treasurySteal == 1 || ordinarySteal > 0',
                            children: [
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: 'alchemySteal == 1 && forgeSteal == 1 && treasurySteal == 1 && ordinarySteal == 3',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve taken everything you could find in that short amount of time and are leaving the camp. Surprisingly, you\'ve managed to do all this unnoticed.'
                                      }
                                    ]
                                  },
                                  {
                                    condition: 'alchemySteal + forgeSteal + treasurySteal + ordinarySteal >= 3',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve taken almost everything you could find in that short amount of time and are leaving the camp. Surprisingly, you\'ve managed to do all this unnoticed.'
                                      }
                                    ]
                                  },
                                  {
                                    condition: '1',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve decided that you\'ve had enough loot and there\'s no need to take any more risks. You leave the camp before anyone notices you.'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                kind: 'speech',
                                character: chenHuName,
                                text: `"Heh, I told you we'd make it, ${playerAddress}, they didn't even notice us. Stick with me and you'll never have to worry about spirit stones again. Here, I stole these from a few demonic cultivators while we were leaving."`
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(1500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: 'alchemySteal == 1 && forgeSteal == 1 && treasurySteal == 1 && ordinarySteal == 3',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '3'
                                      }
                                    ]
                                  },
                                  {
                                    condition: 'alchemySteal + forgeSteal + treasurySteal + ordinarySteal >= 3',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '2'
                                      }
                                    ]
                                  },
                                  {
                                    condition: '1',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '1'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                kind: 'text',
                                text: `After this, you leave, agreeing not to tell anyone about this act of robbery.`
                              },
                              {
                                kind: 'flag',
                                flag: chenHuAdventureMonth,
                                value: 'month + 3',
                                global: true
                              },
                              {
                                kind: 'exit'
                              }
                            ],
                          }
                        ]
                      }
                    ]
                  },
                  {
                    text: '"True camp"',
                    children: [
                      {
                        kind: 'speech',
                        character: chenHuName,
                        text: `"I didn't expect such courage from you, ${playerAddress}, keep it up! Follow me and try not to give yourself away."`,
                      },
                      {
                        kind: 'location',
                        location: 'Spirit Well'
                      },
                      {
                        kind: 'text',
                        text: `You enter the spiritual well and follow a convoluted path, changing direction every few minutes. After what seems like half a day, you find a cleverly hidden demonic cultivator camp. It's one of the largest demonic cultivator camps you've ever seen, and it's so close to the sect! What are they doing here, and how does ${chenHuName} know about them? The two of you survey the camp, noting interesting points and planning your entering.`
                      },
                      {
                        kind: 'label',
                        label: 'bigChoices'
                      },
                      {
                        kind: 'choice',
                        choices: [
                          {
                            text: 'Try to get into the leader\'s house',
                            showCondition: 'leaderSteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You decide to head to the home of this camp's leader, ${rlm('meridianOpening')} cultivator. You know perfectly well that you have virtually no chance of escaping unnoticed, but the temptation is too great. You sneak inside while the leader is gone. Inside, you find a spacious, beautiful room filled with valuables, but you only manage to grab a few.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones.'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(3000, 'meridianOpening', 'Early')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(3000, 'meridianOpening', 'Early')} * ({rng} + 0.5))`
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Healing Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Regeneration Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Inner Fury Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Ironskin Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Refined Control Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Refined Intensity Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Insight Pill (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some strange bottles.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Bloodlet Concoction (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Dissolving Concoction (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                          { item: { name: 'Enfeebling Concoction (II)'}, amount: 'floor({rng} * 3 + 3)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some formation parts.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Formation Bell'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Formation Blade'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.8',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found the Leader\'s armor.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Vital Plate (II)'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found the Leader\'s talisman.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Shield Talisman (II)'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'Somehow you left the building unnoticed. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'leaderSteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'bigChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(3000, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorII])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into the alchemy pavilion',
                            showCondition: 'alchemySteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You make your way into the alchemy pavilion. Inside, you're greeted by the strong smell of herbs and pills. It seems someone has been practicing alchemy here recently, perhaps they haven't had time to collect the results of their labors yet.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some herbs.'
                              },
                              {
                                kind: 'addMultipleItem',
                                items: [
                                  { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 10 + 1)' },
                                  { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 5 + 1)' },
                                  { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 5 + 1)' },
                                  { item: { name: 'Flaring Yang Bud'}, amount: '1' },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more herbs.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 10 + 3)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Flaring Yang Bud'}, amount: 'floor({rng} * 3 + 3)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more herbs.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 10 + 3)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Flaring Yang Bud'}, amount: 'floor({rng} * 3 + 3)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Healing Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Regeneration Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Inner Fury Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Ironskin Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' }
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Refined Control Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Refined Intensity Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Insight Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Toxin Cleansing Pill+ (I)'}, amount: 'floor({rng} * 5 + 3)' }
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some pills.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Bottleneck Pill+ (I)'}, amount: '2' },
                                          { item: { name: 'Recuperation Pill (I)'}, amount: '20' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found a cauldron that someone had forgotten.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Empowered Fusing Cauldron+ (I)'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found a rare pill.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Flesh Annihilation Pill'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'alchemySteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'bigChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(3000, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorII])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into the forge',
                            showCondition: 'forgeSteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You make your way into the forge. It's hot and stuffy inside - the sound of work was just a short time ago. With any luck, you'll find what you came for.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some ore.'
                              },
                              {
                                kind: 'addMultipleItem',
                                items: [
                                  { item: { name: 'Tough Iron Ore'}, amount: 'floor({rng} * 5 + 3)' },
                                  { item: { name: 'Nether Jade'}, amount: 'floor({rng} * 5 + 1)' },
                                  { item: { name: 'Cold Iron'}, amount: 'floor({rng} * 5 + 1)' },
                                  { item: { name: 'Ocean Nephrite'}, amount: '1' },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more ore.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Tough Iron Ore'}, amount: 'floor({rng} * 10 + 5)' },
                                          { item: { name: 'Nether Jade'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Cold Iron'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Ocean Nephrite'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more ore.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Tough Iron Ore'}, amount: 'floor({rng} * 10 + 5)' },
                                          { item: { name: 'Nether Jade'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Cold Iron'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Ocean Nephrite'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Small Claw'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Small Scale'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Thin Fur'}, amount: 'floor({rng} * 5 + 3)' },
                                          { item: { name: 'Thin Hide'}, amount: 'floor({rng} * 5 + 3)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found someone\'s unfinished work.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Armour Blank (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Artefact Blank (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Clothing Blank (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                          { item: { name: 'Talisman Blank (I)'}, amount: 'floor({rng} * 3 + 1)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.7',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found someone\'s finished work.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Jia Plate+'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.9',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found rare item.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Remembrance of Power'},
                                        amount: '1'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'forgeSteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'bigChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(3000, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorII])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into the treasury',
                            showCondition: 'treasurySteal == 0',
                            children: [
                              {
                                kind: 'text',
                                text: `You target one of the largest buildings and enter while the cultivators are distracted. Inside, you see mountains of various items and spirit stones. It seems the Demonic Cultivators bring all their loot here before sending it to their superiors, and you arrive just before they do. However, this display of treasures seems suspicious: perhaps they're just a distraction from the real treasures?`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones.'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(4500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(4500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.75',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(4500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some qi elixirs.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Condensed Qi Elixir (I)'},
                                        amount: 'floor({rng} * 5 + 1)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some qi elixirs.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Condensed Qi Elixir (I)'},
                                        amount: 'floor({rng} * 5 + 1)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some spirit cores.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Spirit Core (I)'},
                                        amount: 'floor({rng} * 5 + 1)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some enhancement dust.'
                                      },
                                      {
                                        kind: 'addItem',
                                        item: {name: 'Enhancement Dust'},
                                        amount: 'floor({rng} * 15 + 15)'
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.85',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found a lot of spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(10000, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.4',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'treasurySteal',
                                        value: '1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'bigChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(3000, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorII])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Try to get into ordinary houses',
                            showCondition: 'ordinarySteal < 3',
                            children: [
                              {
                                kind: 'text',
                                text: `You decide to try your luck in ordinary houses. Having chosen a few, you rush to explore them: they are all similar to each other and don't have too many values, but you can still get something out of them.`
                              },
                              {
                                kind: 'text',
                                text: 'You found some spirit stones.'
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(2500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found more spirit stones.'
                                      },
                                      {
                                        kind: 'money',
                                        amount: `floor(${window.modAPI.utils.getNumericReward(2500, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some herbs.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Lesser Spirit Grass'}, amount: 'floor({rng} * 5 + 2)' },
                                          { item: { name: 'Lesser Shui Blossom'}, amount: 'floor({rng} * 3 + 2)' },
                                          { item: { name: 'Lesser Yuhe Herb'}, amount: 'floor({rng} * 3 + 2)' },
                                          { item: { name: 'Flaring Yang Bud'}, amount: '1' },
                                        ]
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.5',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You found some materials.'
                                      },
                                      {
                                        kind: 'addMultipleItem',
                                        items: [
                                          { item: { name: 'Small Bone'}, amount: 'floor({rng} * 5 + 2)' },
                                          { item: { name: 'Small Claw'}, amount: 'floor({rng} * 5 + 2)' },
                                          { item: { name: 'Small Scale'}, amount: 'floor({rng} * 5 + 2)' },
                                          { item: { name: 'Thin Fur'}, amount: 'floor({rng} * 5 + 2)' },
                                          { item: { name: 'Thin Hide'}, amount: 'floor({rng} * 5 + 2)' },
                                        ]
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '{rng} > 0.3',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You leave the building undetected. Should you continue the robbery or play it safe and leave?'
                                      },
                                      {
                                        kind: 'flag',
                                        flag: 'ordinarySteal',
                                        value: 'ordinarySteal + 1',
                                        global: false
                                      },
                                      {
                                        kind: 'gotoLabel',
                                        label: 'bigChoices'
                                      }
                                    ]
                                  },
                                  getRobberyFailure(3000, [demonicCultivatorI, demonicCultivatorI, demonicCultivatorII])
                                ]
                              }
                            ]
                          },
                          {
                            text: 'Leave',
                            showCondition: 'leaderSteal == 1 || alchemySteal == 1 || forgeSteal == 1 || treasurySteal == 1 || ordinarySteal > 0',
                            children: [
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: 'leaderSteal == 1',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: `You robbed a ${rlm('meridianOpening')} cultivator and managed to escape unnoticed, you have accomplished a difficult feat.`
                                      }
                                    ]
                                  },
                                  {
                                    condition: 'alchemySteal == 1 && forgeSteal == 1 && treasurySteal == 1 && ordinarySteal == 3',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve taken everything you could find in that short amount of time and are leaving the camp. Surprisingly, you\'ve managed to do all this unnoticed.'
                                      }
                                    ]
                                  },
                                  {
                                    condition: 'alchemySteal + forgeSteal + treasurySteal + ordinarySteal >= 3',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve taken almost everything you could find in that short amount of time and are leaving the camp. Surprisingly, you\'ve managed to do all this unnoticed.'
                                      }
                                    ]
                                  },
                                  {
                                    condition: '1',
                                    children: [
                                      {
                                        kind: 'text',
                                        text: 'You\'ve decided that you\'ve had enough loot and there\'s no need to take any more risks. You leave the camp before anyone notices you.'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                kind: 'speech',
                                character: chenHuName,
                                text: `"Heh, I told you we'd make it, ${playerAddress}, they didn't even notice us. Stick with me and you'll never have to worry about spirit stones again. Here, I stole these from a few demonic cultivators while we were leaving."`
                              },
                              {
                                kind: 'money',
                                amount: `floor(${window.modAPI.utils.getNumericReward(3000, 'bodyForging', 'Late')} * ({rng} + 0.5))`
                              },
                              {
                                kind: 'conditional',
                                branches: [
                                  {
                                    condition: '(alchemySteal == 1 && forgeSteal == 1 && treasurySteal == 1 && ordinarySteal == 3) || leaderSteal == 1',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '3'
                                      }
                                    ]
                                  },
                                  {
                                    condition: 'alchemySteal + forgeSteal + treasurySteal + ordinarySteal >= 3',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '2'
                                      }
                                    ]
                                  },
                                  {
                                    condition: '1',
                                    children: [
                                      {
                                        kind: 'approval',
                                        character: chenHuName,
                                        amount: '1'
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                kind: 'text',
                                text: `After this, you leave, agreeing not to tell anyone about this act of robbery.`
                              },
                              {
                                kind: 'flag',
                                flag: chenHuAdventureMonth,
                                value: 'month + 3',
                                global: true
                              },
                              {
                                kind: 'exit'
                              }
                            ],
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            text: '"I need time to prepare."',
            children: [
              {
                kind: 'speech',
                character: chenHuName,
                text: `"Just don't delay until someone takes our loot."`,
              },
              {
                kind: 'exit'
              }
            ]
          }
        ]
      }
    ]
  }
}