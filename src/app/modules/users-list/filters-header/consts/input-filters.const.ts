import { InputFilter } from 'src/app/shared';

export const INPUT_FILTERS: InputFilter[] = [
  { label: 'id', alias: 'ID', placeholder: 'Введите ID', type: 'number' },
  {
    label: 'fullName',
    alias: 'ФИО',
    placeholder: 'Введите ФИО участника',
    type: 'string',
  },
  {
    label: 'position',
    alias: 'Должность',
    placeholder: 'Введите должность участника',
    type: 'string',
  },
  {
    label: 'email',
    alias: 'Почта (логин)',
    placeholder: 'Введите почту участника',
    type: 'string',
  },
];
