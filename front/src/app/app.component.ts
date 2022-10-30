import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  decrypt(word, key = 'share') {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }


  isLoggedin(){
    if (localStorage.getItem('id') != null) {
      return this.decrypt(localStorage.getItem('id'));
      
    }
    else {
      return false;
    }
    
    
  }
}
