import { meetChenHuEncounter } from './meetChenHu';

export function registerEvents() {
  window.modAPI.actions.addExplorationEventsToLocation('Spirit Well', [ meetChenHuEncounter ]);
}