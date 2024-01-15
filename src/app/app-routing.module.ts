import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './modules/users-list/users-list.component';
import { AboutComponent } from './modules/about/about.component';
import { UploadUsersComponent } from './modules/upload-users/upload-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'upload-users',
    component: UploadUsersComponent,
  },
  {
    path: 'users-list',
    component: UsersListComponent,
  },
  {
    path: '**',
    redirectTo: 'users-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
