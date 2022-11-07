import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  email: string;
  loader: boolean = true;
  users: any = [];
  decrypt(word, key = 'share') {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }

  modify(){
    this.http.post('http://localhost:3001/api/user/modify', {
      id: this.decrypt(localStorage.getItem('id')),
      email: this.email

    }).subscribe((data: any) => {
      console.log(data);
    }
    );
    window.location.reload();
  }


  isLoggedin(){
    if (localStorage.getItem('id') != null) {
      return this.decrypt(localStorage.getItem('id'));;
    }
    else {
      return false;
    }
  }
  constructor(private http: HttpClient) {

    if (localStorage.getItem('id')){
      this.http.get('http://localhost:3001/api/user/' + this.decrypt(localStorage.getItem('id'))).subscribe((data: any) => {
        this.users = data;
        this.loader = false;
      }
      );
      }

      
   }

  ngOnInit(): void {
  }

}
