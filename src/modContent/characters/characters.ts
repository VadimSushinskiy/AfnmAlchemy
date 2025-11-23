import { demonicCultivatorI } from './demonicCultivatorI';
import { chenHu } from './chenHu/chenHu';

export function registerCharacters() {
  window.modAPI.actions.addCharacter(demonicCultivatorI);
  window.modAPI.actions.addCharacter(chenHu);
}