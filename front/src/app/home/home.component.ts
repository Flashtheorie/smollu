import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js'; // npm install crypto-js --save


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

 
  howmanylinks = 0;
  url: string = "";
newurl: string = "";
isShorten: boolean = false;

smolify(){
  this.loader = true;
   // if loggedin
    if (this.isLoggedin()) {
      this.http.post('http://localhost:3001/api/url/shortenwithid', {longUrl: this.url, iduser: this.decrypt(localStorage.getItem('id'))}).subscribe((data: any) => {
      this.newurl = data.shortUrl;
      this.isShorten = true;
      this.loader = false;
   }
   );
  }
  else {
    this.http.post('http://localhost:3001/api/url/shorten', {longUrl: this.url}).subscribe((data: any) => {
      this.newurl = data.shortUrl;
      this.isShorten = true;
      this.loader = false;
   }
   );
  }
  

}
copyMessage(val: string){
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}


  constructor(public http: HttpClient, private route: ActivatedRoute) {
this.http.get('http://localhost:3001/api/url/shorten').subscribe((data: any) => {
  this.howmanylinks = data;
}
);
   }

  ngOnInit(): void {
  }

}
