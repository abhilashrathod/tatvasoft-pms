import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import * as uuid from 'uuid';
import {IUser, UserService} from '../../../../services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-update',
  templateUrl: 'add-or-update.component.html'
})

export class AddOrUpdateComponent implements OnInit {

  productFormGroup: FormGroup;
  user: IUser;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddOrUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    this.buildForm();
  }

  buildForm(): void {
    this.productFormGroup = this.formBuilder.group({
      id: [uuid.v4()],
      createdBy: [this.user.id],
      title: [''],
      description: [''],
      quantity: [''],
      status: [true],
      image: [''],
      tags: [[]],
      datesToActive: ['']
    });
  }

  doCreate(values): void {
    this.dialogRef.close(values);
  }
}
