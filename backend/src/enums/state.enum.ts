/**
 * The state enum provides a set of fixed values of all
 * of the states and a condensed list of territories of
 * Australia.  It is replicated in the database as `enum_state`
 * and when adding values the database must be updated to have
 * the new value too.
 */
export enum State {
  /**
   * Australian Capital Territory
   */
  ACT = 'act',
  /**
   * New South Wales
   */
  NSW = 'nsw',
  /**
   * The Northern Territory
   */
  NT = 'nt',
  /**
   * All other territories of Australia
   */
  OtherTerritories = 'other',
  /**
   * Queensland
   */
  QLD = 'qld',
  /**
   * South Australia
   */
  SA = 'sa',
  /**
   * Tasmania
   */
  TAS = 'tas',
  /**
   * Victoria
   */
  VIC = 'vic',
  /**
   * Western Australia
   */
  WA = 'wa',
}
