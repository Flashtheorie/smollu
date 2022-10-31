import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loader: boolean = false;
  decrypt(word, key = 'share') {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }


  isLoggedin(){
    if (localStorage.getItem('id') != null) {
      return this.decrypt(localStorage.getItem('id'));;
    }
    else {
      return false;
    }
  }

  users: Array<any> = [];
  constructor(private http: HttpClient) {
    this.loader = true;
    this.http.get('http://localhost:3001/api/user/' + this.decrypt(localStorage.getItem('id'))).subscribe((data: any) => {
      // convert to array
      this.users = data as Array<any>;
      this.loader = false;
    }
    )
  
   }

  ngOnInit(): void {
  }

}
