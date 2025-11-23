import { elementToName, Realm, RealmProgress, realmToName, realmToTier, TechniqueElement } from 'afnm-types';
import { formatNumber } from './formatNumber';

export const col = (text: any, col: string): string => {
  return `<span style="color: ${col}; textShadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;">${text}</span>`;
};

export const loc = (text: any): string => {
  return col(text, '#e5bbfa');
};

export const rlm = (realm: Realm, progress?: RealmProgress): string => {
  return col(
    `${realmToName[realm]} (${realmToTier[realm]})${progress ? ` ${progress}` : ''}`,
    '#ffe8a1',
  );
};

export const num = (number: any): string => {
  if (typeof number === 'number') {
    number = formatNumber(number);
  }

  return col(number, '#ff877d');
};

export const buf = (buff: string): string => {
  return col(buff, '#ffadfe');
};

export const itm = (item: string): string => {
  return col(item, '#ff8cb8');
};

export const char = (text: any): string => {
  return col(text, '#a8ffb1');
};

export const elem = (element: TechniqueElement): string => {
  return col(elementToName[element], '#a8ffeb');
};
