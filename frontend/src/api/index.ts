import applications from './applications';
import auth from './sign-in';
import currentUser from './current-user';
import tasks from './tasks';

export const api = {
  applications,
  auth,
  tasks,
  ...currentUser,
};
