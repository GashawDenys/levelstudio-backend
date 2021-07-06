import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent {
  submitEmitter = new EventEmitter();

  //region Controls
  emailControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  formControls = [
    this.emailControl,
    this.passwordControl
  ]

  //endregion

  constructor(
    public dialogRef: MatDialogRef<LogInFormComponent>) {
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.formControls.forEach(control => control.markAsTouched())
    if (!this.formControls.some(control => control.invalid)) {
      this.submitEmitter.emit({
        login: this.emailControl.value,
        password: this.passwordControl.value
      });
      this.dialogRef.close();
    }
  }
}
