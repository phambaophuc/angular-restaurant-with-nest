import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    loginError?: string;

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.username, this.password)
            .subscribe({
                next: (response) => {
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    this.router.navigate(['/analytics']);
                },
                error: (error) => {
                    this.loginError = 'Invalid username or password.';
                }
            });
    }
}
