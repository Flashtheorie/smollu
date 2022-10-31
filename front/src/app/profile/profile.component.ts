import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';


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

  checkout(priceId: any) {
    this.http.post('http://localhost:3001/create-checkout-session/' + this.decrypt(localStorage.getItem('id')), { priceId })
      .pipe(
        switchMap(session => {
          return this.stripeService.redirectToCheckout({ sessionId: session['id'] })
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          console.log(result.error.message);
        }

        
      });
  }

  paymentHandler: any = null;

  success: boolean = false
  
  failure:boolean = false
  
  constructor(private http: HttpClient, private stripeService: StripeService,) {
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
