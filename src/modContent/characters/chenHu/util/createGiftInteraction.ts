import { GiftCharacterInteraction, ItemDesc } from 'afnm-types';
import { chenHuName } from '../chenHuFlags';

export const createGiftInteraction = (
  item: string,
  amount: number,
  alternates?: ItemDesc[]
): GiftCharacterInteraction => ({
  condition: '1',
  key: item + amount,
  item: item,
  alternates: alternates,
  amount: amount,
  introSteps: [
    {
      kind: 'speech',
      character: chenHuName,
      text: `"Heh, elder really brother needs ${amount > 1 ? 'some' : 'a'} ${item}.${amount > 1 ? amount + ' Would be enough.' : ''}"`,
    },
  ],
  acceptSteps: [
    {
      kind: 'approval',
      character: chenHuName,
      amount: '1',
    },
    {
      kind: 'speech',
      character: chenHuName,
      text: `"Thanks, junior brother! This will really speed up preparations for the next adventure."`,
    }
  ],
  declineSteps: [
    {
      kind: 'speech',
      character: chenHuName,
      text: `"It's a pity, elder brother was already prepared to receive the gift."`,
    }
  ]
})