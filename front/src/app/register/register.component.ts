import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";
  register(){
        this.http.post('http://localhost:3001/api/register', {
          email: this.email,
          password: this.password
        }).subscribe((data: any) => {
          console.log(data);
        }
        );
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
