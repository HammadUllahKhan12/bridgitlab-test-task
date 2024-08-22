/**
 * The user type enum provides a set of fixed values representing each
 * type of user.  It is replicated in the database as `enum_user_type`
 * and when adding values the database must be updated to have the new
 * value too.
 */
export enum UserType {
  /**
   * An applicant account
   */
  Applicant = 'applicant',
  /**
   * A broker account
   */
  Broker = 'broker',
}
