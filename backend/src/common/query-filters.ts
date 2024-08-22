import { FindOptions, Op } from 'sequelize';
import { MINIMUM_DATE_EXCEEDS_MAXIMUM_DATE_ERROR } from './constants/response-messages';

/**
 * Creates a Sequelize "FindOptions" containing a date filter which may
 * have a starting date, ending date or both dates constraining the
 * database query results.  If no dates are specified an empty object
 * or filter without any rules will be returned.
 * @param minimumDate {Date} Optional starting date
 * @param maximumDate {Date} Optional ending date
 * @returns {FindOptions}
 */
export function createDateFilter(field: string, minimumDate?: Date, maximumDate?: Date): FindOptions {
  let dateFilter = {};
  if (minimumDate?.getTime) {
    if (maximumDate?.getTime) {
      if (minimumDate.getTime() > maximumDate.getTime()) {
        throw new Error(MINIMUM_DATE_EXCEEDS_MAXIMUM_DATE_ERROR);
      }
      dateFilter = {
        [field]: {
          [Op.between]: [minimumDate, maximumDate],
        },
      };
    } else {
      dateFilter = {
        [field]: {
          [Op.gte]: minimumDate,
        },
      };
    }
  } else if (maximumDate?.getTime) {
    dateFilter = {
      [field]: {
        [Op.lte]: maximumDate,
      },
    };
  }
  return dateFilter;
}
