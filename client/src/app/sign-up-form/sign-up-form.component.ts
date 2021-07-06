import {Component, EventEmitter, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
  @ViewChild('password') password: any;
  submitEmitter = new EventEmitter();
  firstName: string | undefined;
  lastName: string | undefined;

  //region Controls
  emailControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  passwordConfirmControl = new FormControl("", [
    Validators.required,
    (control: AbstractControl) => {
      return control.value === this.password?.nativeElement?.value ? null : {equalityDisrupted: {value: control.value}};
    }
  ]);
  formControls = [
    this.emailControl,
    this.passwordControl,
    this.passwordConfirmControl
  ]

  //endregion

  constructor(
    public dialogRef: MatDialogRef<SignUpFormComponent>) {
  }

  onClose() {
    this.dialogRef.close();
  }

  onFirstNameChanged(action: any) {
    this.firstName = action.target.value;
  }

  onSecondNameChanged(action: any) {
    this.lastName = action.target.value;
  }

  onConfirm() {
    this.formControls.forEach(control => control.markAsTouched())
    if (!this.formControls.some(control => control.invalid)) {
      this.submitEmitter.emit({
        email: this.emailControl.value,
        password: this.passwordControl.value,
        firstName: this.firstName,
        lastName: this.lastName
      });
      this.dialogRef.close();
    }
  }
}
