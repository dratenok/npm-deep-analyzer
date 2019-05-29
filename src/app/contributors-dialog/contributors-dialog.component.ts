import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-contributors-dialog',
  templateUrl: './contributors-dialog.component.html',
  styleUrls: ['./contributors-dialog.component.css']
})
export class ContributorsDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<ContributorsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    setTimeout(() => console.log(this.data), 1000);
  }
}
