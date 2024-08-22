import { TASK_REPOSITORY } from 'src/common/constants/repositories';
import { Task } from './task.entity';

export const taskProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
