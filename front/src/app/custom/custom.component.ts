import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {
  url: string = "";
  customurl: string = "";

  loader: boolean = false;
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

  smolify(){
    this.loader = false;
    this.http.post('http://localhost:3001/api/custom', {url: this.url, customurl: this.customurl, iduser: this.decrypt(localStorage.getItem('id'))}).subscribe((data: any) => {
      if (data == "already"){
        alert("Custom URL already exists");
      }
      else if (data == "ok"){
        alert("URL shortened successfully");
        window.location.reload();
      }
      
    });
    



  }
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

}
