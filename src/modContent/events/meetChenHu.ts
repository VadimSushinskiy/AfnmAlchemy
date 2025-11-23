import { Buff, LocationEvent } from 'afnm-types';
import {demonicCultivatorI} from '../monsters/demonic/demonicCultivatorILate';
import { chenHuMet, chenHuName, playerAddress } from '../characters/chenHu/chenHuFlags';
import { rlm } from '../utils/eventUtils';
import { chenHuHelp } from '../characters/chenHu/util/chenHuHelpBuff';

export const meetChenHuEncounter: LocationEvent = {
  event: [
    {
      kind: 'text',
      text: 'As you make your way through the forest, you hear sounds unusual for this place — cultivators fighting in the distance.',
    },
    {
      kind: 'speech',
      character: 'Demonic Cultivator',
      text: '"You can\'t escape! Give it back if you want to live."',
    },
    {
      kind: 'text',
      text: 'Demonic cultivators?! But what are they doing so close to the sect? You decide...',
    },
    {
      kind: 'choice',
      choices: [
        {
          text: 'Get closer',
          children: [
            {
              kind: 'text',
              text: 'You rush towards the demonic cultivators to help a stranger.',
            },
            {
              kind: 'speech',
              character: 'Demonic Cultivator',
              text: '"Get out, it\'s none of your business. We\'ll leave and no one will get hurt as soon as he returns what he stole."',
            },
            {
              kind: 'text',
              text: "They are surprisingly restrained for demonic cultivators, but you won't retreat, you have made your choice.",
            },
            {
              kind: 'speech',
              character: 'Demonic Cultivator',
              text: '"Fine, then we\'ll have to kill you both."',
            },
            {
              kind: 'speech',
              character: chenHuName,
              text: '"Get ready, I\'m taking the two on the right."',
            },
            {
              kind: 'combat',
              enemies: [demonicCultivatorI, demonicCultivatorI],
              playerBuffs: [chenHuHelp],
              victory: [
                {
                  kind: 'text',
                  text: 'You completely outmatch your opponents, and soon their corpses lie before you. Turning around, you see your partner winning, but you rush to help anyway. Together, you finish off the remaining enemies.',
                },
                {
                  kind: 'speech',
                  character: chenHuName,
                  text: `"That was too easy. Thank you ${playerAddress}, your strength is amazing, although it is a little short of mine. I'm Chen Hu, a disciple of the Nine Mountain Sect."`,
                },
                {
                  kind: 'approval',
                  character: chenHuName,
                  amount: '3',
                },
              ],
              defeat: [
                {
                  kind: 'text',
                  text: "You've lost the initiative and the demonic cultivators have almost cornered you, making it increasingly difficult to defend against their attacks. But the time you've gained is enough for your mysterious partner to defeat his enemies and rush to your aid. Together, you finish off the remaining enemies.",
                },
                {
                  kind: 'speech',
                  character: chenHuName,
                  text: `"Phew, that was tough, we barely survived. Thanks for the help, ${playerAddress}! I'm Chen Hu, a disciple of the Nine Mountain Sect."`,
                },
                {
                  kind: 'approval',
                  character: chenHuName,
                  amount: '1',
                },
              ],
            },
            {
              kind: 'text',
              text: 'Such familiarity is unusual, but you ignore it. Instead, you ask why the Demonic Cultivators were chasing him near the sect and what they demanded he return.',
            },
            {
              kind: 'speech',
              character: chenHuName,
              text: `"Heh, let's talk in the sect, {brother|sister}. The others will be here soon, and I think I saw someone at the ${rlm('qiCondensation')} realm among them."`,
            },
            {
              kind: 'flag',
              global: true,
              flag: chenHuMet,
              value: '1',
            },
          ],
        },
        {
          text: 'Leave before they notice you',
          children: [
            {
              kind: 'text',
              text: 'You leave while they fight, your safety is more important than any secrets.',
            },
          ],
        },
      ],
    },
  ],
  condition: `${chenHuMet} != 1 && {rng} > 0.8`,
  rarity: 'incandescent',
};