import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAddUserData, IEditUserData } from 'src/app/services/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  today = new Date();

  constructor(
    public dialog: MatDialogRef<EditUserComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
      
    // call details based on index
    if (this.data.isEdit) 
      this.getUserDetails(this.data.user);

  }

  // initialize form to get user values
  initializeForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      dob: ['', [Validators.required]],
    })
  }

  // get user value
  getUserDetails(id: string) {
    const userData = this.userService.userDetails(id);

    // patch User data
    this.patchUserData(userData);
  }

  patchUserData(data: IEditUserData) {
    this.editForm.patchValue({
      name: data.name,
      dob: data.dob,
    })
  }

  onSubmit() {

    if (this.editForm.invalid) {
      return this.editForm.controls;
    }
    this.dialog.close({ edited: true, data: this.editForm.value })
  }

  cancelEditForm() {
    this.dialog.close({ edited: false, data: {} });
  }

}
