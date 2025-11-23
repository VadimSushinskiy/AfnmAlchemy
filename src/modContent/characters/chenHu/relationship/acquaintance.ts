import { CharacterRelationshipDefinition } from 'afnm-types';

export const acquaintance: CharacterRelationshipDefinition = {
  requiredApproval: 10,
  relationshipCategory: 'Friendly',
  name: 'Acquaintance',
  tooltip: 'An unreliable young cultivator who claims to be your elder brother. He doesn\'t trust you yet, but perhaps his opinion will change in the future.',
  progressionEvent: {
    name: '',
    tooltip: '',
    event: []
  }
}