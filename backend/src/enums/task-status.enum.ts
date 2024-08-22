/**
 * The task status enum provides a set of fixed values of all of
 * the statuses a task can have.  It is replicated in the database
 * as `enum_task_status` and when adding values the database must
 * be updated to have the new value too.
 */
export enum TaskStatus {
  /**
   * The task is pending completion
   */
  Pending = 'pending',
  /**
   * The task is no longer required
   */
  Cancelled = 'cancelled',
  /**
   * The task is ready for review
   */
  ReviewRequired = 'review_required',
  /**
   * The task is complete
   */
  Completed = 'completed',
}
