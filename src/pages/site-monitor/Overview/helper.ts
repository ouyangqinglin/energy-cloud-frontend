import { keepTwoDecimalWithUnit } from '@/utils/math';
import { isNil } from 'lodash';

export const keepTwoDecimalWithoutNull = (value: any) =>
  isNil(value) ? '--' : keepTwoDecimalWithUnit(value);
