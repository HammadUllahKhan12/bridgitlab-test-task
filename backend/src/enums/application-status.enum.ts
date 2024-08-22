/**
 * The application status enum provides a set of fixed values of
 * all of the possible statuses an application can have.  It is
 * replicated in the database as `enum_application_status` and
 * when adding values the database must be updated to have the
 * new value too.
 */
export enum ApplicationStatus {
  /**
   * Step one:  the application is submitted by the applicant or broker
   */
  Submitted = 'submitted',
  /**
   * Step two:  the loan is being assessed by the credit team
   */
  UnderReview = 'under_review',
  /**
   * Outcome:  the loan has been cancelled or withdrawn
   */
  Cancelled = 'cancelled',
  /**
   * Outcome:  the loan has been funded
   */
  Funded = 'funded',
  /**
   * Step three: the loan has been repaid
   */
  Repaid = 'repaid',
}
