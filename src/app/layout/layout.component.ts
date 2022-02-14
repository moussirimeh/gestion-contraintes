import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    moduleTitle = 'Master';
    public name_module = localStorage.getItem('selectedMenu');
    public isdashboard = localStorage.getItem('isdashboard');
    public denoSociete = localStorage.getItem('societe');
    editEnable = false;
    constructor(private router: Router) {
        router.events.subscribe((val) => {
            // see also
            this.isdashboard = localStorage.getItem('isdashboard');
            this.name_module = localStorage.getItem('selectedMenu');
        });
    }

    ngOnInit() {
    }

    closeModule() {
        localStorage.setItem('isdashboard', 'true');
        this.router.navigate(['/dashboard']);
      }
}
