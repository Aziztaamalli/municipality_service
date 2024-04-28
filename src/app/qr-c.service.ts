import { Injectable } from '@angular/core';
import { qrCode } from './shared/qrCode.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrCService {
  url: string = "http://localhost/projet_mini_web/qr1.php";
  file: any;

  constructor(public http: HttpClient) { }
  formData: FormData = new FormData();

  uploadFile(file: any, token: string) {
    this.formData.set("file", file);

    // Set the request headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.url, this.formData, { headers });
  }
}
