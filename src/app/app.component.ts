import { Component, OnInit, HostListener } from '@angular/core';


import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  ipAddress: string;
  // , private translate: TranslateService
  constructor(public router: Router) {

  }
  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      6000000000000
    );
  }
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit() {}
}
