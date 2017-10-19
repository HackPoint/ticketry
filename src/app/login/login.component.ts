import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    loggedIn: boolean;
    
    constructor(public router: Router) {
        this.loggedIn = <boolean>JSON.parse(localStorage.getItem('isLoggedin'));
        if (this.loggedIn) {
            this.router.navigateByUrl('dashboard');
        }
    }

    ngOnInit() {
    }
    onLoggedin(form: NgForm) {
        localStorage.removeItem('isLoggedin');
        const formValue = form.value;
        if(formValue.email && formValue.password) {
            // save to db users
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigateByUrl('dashboard');
        }
    }

}
