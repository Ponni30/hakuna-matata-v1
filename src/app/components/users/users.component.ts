import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { constants } from 'src/app/common/constants';
import {
  IEditUserData,
  IEditUserResponse,
  IUsers
} from 'src/app/services/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { PDFGenerator } from 'src/app/services/utils/PDFGenerator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['user', 'name', 'dob', 'action'];
  dataSource = new MatTableDataSource<IUsers>();
  private pdfUserList = new PDFGenerator();

  constructor(
    private userService: UserService,
    public toaster: NotificationService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    /* Unsubscribing the observables */
  }

  getUserDetails() {
    const getUserSubscriber = this.userService.getUsersList()

    if (getUserSubscriber && getUserSubscriber.length) {

      this.dataSource.data = getUserSubscriber;
      this.dataSource.sort = this.sort;

    } else {
      this.dataSource.data = []
    }

  }

  logoutHandler() {
    localStorage.clear();
    this.router.navigateByUrl(constants.ROUTE_URL.LOGIN);
  }

  deleteHandler(user: string) {
    const isDeleteConfirmed = this.dialog.open(DeleteDialogComponent, { disableClose: true });

    isDeleteConfirmed.afterClosed().subscribe((deleteData: boolean) => {
      if (deleteData) {
        const deleteSubscriber: Boolean = this.userService.deleteUser(user);

        deleteSubscriber ? this.toaster.notifySucess(constants.NOTIFY_MSG.DELETE_SUCCESS) :
          this.toaster.notifySucess(constants.NOTIFY_MSG.DELETE_FAIL);

        this.toaster.addNotification('', 'deleted');

        this.getUserDetails();
      }
    });
  }

  editHandler(user: string) {
    const editDialog = this.dialog.open(EditUserComponent, {
      disableClose: true,
      data: { isEdit: true, user }
    });
    editDialog.afterClosed().subscribe((editData: IEditUserResponse) => {
      if (editData.edited) {
        const updateUserSubscriber: Boolean = this.userService.updateUser(editData.data, user)
        this.getUserDetails();
        this.toaster.addNotification(editData.data.name, 'updated');
        updateUserSubscriber ? this.toaster.notifySucess(constants.NOTIFY_MSG.DETAIL_SUCCESS) :
          this.toaster.notifyError(constants.NOTIFY_MSG.DETAIL_FAIL);
      }
    });
  }

  // navigate to user popup
  addUserNavigation() {
    const editDialog = this.dialog.open(EditUserComponent, {
      disableClose: true,
      data: { isEdit: false },
    });
    editDialog.afterClosed().subscribe((editData: IEditUserResponse) => {
      if (editData.edited) {
        this.userService.addUser(editData.data);
        this.toaster.addNotification(editData.data.name, 'added');
        this.getUserDetails();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // pdf download
  downloadPdf() {
    let columns = [];
    columns = [
      {
        title: 'User',
        dataKey: 'user'
      },
      {
        title: 'Name',
        dataKey: 'name'
      },
      {
        title: 'BirthDate',
        dataKey: 'formattedDate'
      }]
    let rows = this.dataSource.data;
    this.pdfUserList.generatPDFInTable("User", columns, rows, "User");
  }

  changeLanguage(value: string) {
    this.translate.setDefaultLang(value || 'en');
    this.toaster.addLocalStorage('language', value || 'en')
  }
}