import { User } from './user.interface';

export interface InputFilter {
  label: keyof Pick<User, 'id' | 'fullName' | 'position' | 'email'>;
  alias: string;
  placeholder: string;
  type: 'number' | 'string';
}
