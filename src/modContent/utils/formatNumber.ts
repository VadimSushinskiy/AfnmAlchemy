export const formatNumber = (val: number | string | undefined): string => {
  if (val === undefined) {
    return '';
  }

  if (typeof val === 'string') {
    return val;
  }

  if ((val > 0 && (val < 999 || val > 9999)) || (val < 0 && (val > -999 || val < -9999))) {
    return (val === undefined ? '' : val).toLocaleString();
  }

  return '' + val;
};
