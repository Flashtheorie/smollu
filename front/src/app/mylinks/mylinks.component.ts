import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-mylinks',
  templateUrl: './mylinks.component.html',
  styleUrls: ['./mylinks.component.css']
})
export class MylinksComponent implements OnInit {
  mylinks: Array<any> = [];
  loader: boolean = true;
  isLoggedin(){
    if (localStorage.getItem('id') != null) {
      return this.decrypt(localStorage.getItem('id'));;
    }
    else {
      return false;
    }
  }

  encrypt(word, key = 'share') {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString()
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData
  } 
  
  decrypt(word, key = 'share') {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }
  delete(id: string){
    this.loader = true;
    this.http.get('http://localhost:3001/api/delete/' + id).subscribe((data: any) => {
      
      window.location.href = window.location.href
    this.loader = false;  
      
    });
  }
  constructor(private http: HttpClient) { 
    this.loader = true;
    this.http.get('http://localhost:3001/api/links/' + this.decrypt(localStorage.getItem('id'))).subscribe((data: any) => {
      this.mylinks = data;

      this.loader = false;
    });
  }

  ngOnInit(): void {
  }

}
