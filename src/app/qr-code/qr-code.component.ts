import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { qrCode } from '../shared/qrCode.model';
import { QrCService } from '../qr-c.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {
  constructor(public qrser: QrCService, private router: Router) { }
  file: any;
  qrcode: qrCode = new qrCode();

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  signOut() {
    this.router.navigate(['']);
  }
  submitFile(): void {
    if (!this.file) {
      console.error('No file selected');
      return;
    } else {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        console.error('No token found');
        return;
      }
      this.qrser.uploadFile(this.file, token).subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(['/okk']);
            alert('Uploaded Successfully');
          } else {
            alert('Error in Uploading File');
          }
        }
      );
    }
  }
}
