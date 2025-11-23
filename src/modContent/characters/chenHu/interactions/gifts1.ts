import { GiftCharacterInteraction } from 'afnm-types';
import { createGiftInteraction } from '../util/createGiftInteraction';

export const gifts1: GiftCharacterInteraction[] = [
  createGiftInteraction('Recuperation Pill (I)', 5),
  createGiftInteraction('Spirit Core (I)', 3),
  createGiftInteraction('Condensed Qi Elixir (I)', 2),
  createGiftInteraction('Regeneration Pill (I)', 5, [window.modAPI.gameData.items['Regeneration Pill+ (I)']]),
  createGiftInteraction('Wisp of Power', 1, [window.modAPI.gameData.items['Remembrance of Power']])
];