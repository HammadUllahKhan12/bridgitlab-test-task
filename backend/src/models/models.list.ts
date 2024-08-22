import { Application } from './applications/application.entity';
import { Broker } from './brokers/broker.entity';
import { Task } from './tasks/task.entity';
import { Upload } from './uploads/upload.entity';

/**
 * List of all database entities
 */
export const models = [Application, Broker, Task, Upload];
