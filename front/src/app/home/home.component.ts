import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url: string = "";
newurl: string = "";
isShorten: boolean = false;
smolify(){
   this.http.post('http://localhost:3001/api/url/shorten', {longUrl: this.url}).subscribe((data: any) => {
      this.newurl = data.shortUrl;
      this.isShorten = true;
    
   }
   );
}
  constructor(public http: HttpClient, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
  }

}
