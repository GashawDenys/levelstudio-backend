import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent{
  emailControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1)
  ]);
  formControls = [
    this.emailControl,
    this.passwordControl
  ]

  constructor(public dialogRef: MatDialogRef<LogInFormComponent>) {
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.formControls.forEach(control => control.markAsTouched())
    // @ts-ignore
    if(!this.formControls.some(control => control.invalid)){
      this.dialogRef.close();
    }
  }
}
