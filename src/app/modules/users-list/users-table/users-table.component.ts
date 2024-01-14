import { Component } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  tableHeaders: string[] = ['ID', 'Дата регистрации', 'ФИО', 'Должность', 'Почта (логин)', 'Пароль', 'Телефон, привязанный к мессенджеру'];

  selectedRows: any[] = [];
  itemsPerPage: number = 2;
  currentPage: number = 1;

  users: any[] = [
    {
      id: 1,
      registrationDate: '2024-01-13',
      fullName: 'John Doe',
      position: 'Software Developer',
      email: 'john.doe@example.com',
      password: 'secretpassword',
      phoneNumber: '+1234567890',
    },
    {
      id: 2,
      registrationDate: '2024-01-14',
      fullName: 'Jane Smith',
      position: 'QA Engineer',
      email: 'jane.smith@example.com',
      password: 'test123',
      phoneNumber: '+9876543210',
    },
    {
      id: 3,
      registrationDate: '2024-01-15',
      fullName: 'Bob Johnson',
      position: 'Project Manager',
      email: 'bob.johnson@example.com',
      password: 'pm@123',
      phoneNumber: '+1122334455',
    },
    {
      id: 4,
      registrationDate: '2024-01-14',
      fullName: 'Jane Smith',
      position: 'QA Engineer',
      email: 'jane.smith@example.com',
      password: 'test123',
      phoneNumber: '+9876543210',
    },
    {
      id: 5,
      registrationDate: '2024-01-15',
      fullName: 'Bob Johnson',
      position: 'Project Manager',
      email: 'bob.johnson@example.com',
      password: 'pm@123',
      phoneNumber: '+1122334455',
    },
  ];

  getUsersForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    console.log(this.currentPage)
    this.currentPage = page;
  }
}
