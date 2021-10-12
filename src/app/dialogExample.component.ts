import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import {AppService} from './app.service';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./app.component.scss'],
})
export class DialogContentExampleDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private appService: AppService
  ) {}
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {}
  onNoClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  validate(): void {
    console.log(this.data);
    const payload = {
      idStudy: this.data.idStudy,
      emailAddress: this.email.value
    };
    if (this.email.valid) {
      this.appService.sendMail(payload).subscribe(x => {
      });
    } else {
    }
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo';
    }

    return this.email.hasError('email') ? 'Este no es un correo valido' : '';
  }
}
