import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./app.component.scss'],
})
export class DialogContentExampleDialogComponent implements OnInit {
  email: string;
  serchfind: any;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.email = '';
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  validate(): void {
    const regexp = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    this.serchfind = regexp.test(this.email);

    console.log(this.serchfind);
  }
}
