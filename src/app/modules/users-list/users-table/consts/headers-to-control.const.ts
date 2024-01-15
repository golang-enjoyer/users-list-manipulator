import { User } from 'src/app/shared';
import { TABLE_HEADERS } from './table-headers.const';

export const headersToControl: Record<
  (typeof TABLE_HEADERS)[number],
  keyof User
> = {
  ID: 'id',
  'Дата регистрации': 'registrationDate',
  ФИО: 'fullName',
  Должность: 'position',
  'Почта (логин)': 'email',
  'Телефон, привязанный к мессенджеру': 'phoneNumber',
  Пароль: 'password',
};
