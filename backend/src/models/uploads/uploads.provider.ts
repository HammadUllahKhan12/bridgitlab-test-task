import { UPLOAD_REPOSITORY } from 'src/common/constants/repositories';
import { Upload } from './upload.entity';

export const uploadProviders = [
  {
    provide: UPLOAD_REPOSITORY,
    useValue: Upload,
  },
];
