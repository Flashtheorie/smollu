import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbaronline',
  templateUrl: './navbaronline.component.html',
  styleUrls: ['./navbaronline.component.css']
})
export class NavbaronlineComponent implements OnInit {
  
logout(){
  localStorage.removeItem('id');
  window.location.href = '/';
}

  constructor() { }

  ngOnInit(): void {
  }

}
