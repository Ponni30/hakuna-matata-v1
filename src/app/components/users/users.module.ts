
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/material-module';
import { UsersRoutingModule } from './users-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    TranslateModule,
  ],
  providers: [DatePipe],
})
export class UsersModule { }
