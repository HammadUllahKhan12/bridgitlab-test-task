/**
 * The broker status enum provides a set of fixed values of
 * all of the possible statuses a broker can have.  It is
 * replicated in the database as `enum_broker_status` and
 * when adding values the database must be updated to have the
 * new value too.
 */
export enum BrokerStatus {
  /**
   * The broker's information has been verified and they are able
   * to submit applications and earn their commissions
   */
  Active = 'active',
  /**
   * The broker's information has not been verified and they may
   * not submit applications or earn commissions
   */
  Inactive = 'inactive',
  /**
   * The broker's information has been submitted and requires
   * verifying
   */
  ReviewRequired = 'review_required',
  /**
   * The broker was rejected due to not being able to verify
   * their submitted information
   */
  Rejected = 'rejected',
}
