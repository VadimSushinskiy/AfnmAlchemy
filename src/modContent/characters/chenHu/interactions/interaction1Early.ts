import { TalkCharacterInteraction } from 'afnm-types';
import { chenHuName } from '../chenHuFlags';

export const interaction1Early: TalkCharacterInteraction = {
  condition: '1',
  event: [
    {
      kind: 'text',
      text: `${chenHuName} stands with a sly expression, it looks like he is thinking about next adventure. Noticing your approach, he nods.`
    },
    {
      kind: 'speech',
      character: chenHuName,
      text: '"Well, well, {forename}. Came to elder brother for advice, did you?"'
    },
    {
      kind: 'choice',
      choices: [
        {
          text: '"Why were you being chased by those Demonic Cultivators?"',
          children: [
            {
              kind: 'speech',
              character: chenHuName,
              text: '"Not now junior brother, I\'m not done with preparations yet."'
            },
            {
              kind: 'text',
              text: 'Maybe he\'ll tell you when he trusts you more.'
            },
          ]
        },
        {
          text: '"Nothing for now"',
          children: [
            {
              kind: 'speech',
              character: chenHuName,
              text: '"Don\'t let your guard down, heh heh."'
            },
          ]
        }
      ]
    }
  ]
}