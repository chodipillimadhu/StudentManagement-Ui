import { Component } from '@angular/core';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  constructor(
    private api: Api,
    private router: Router
  ) { }

  login() {

    const data = {
      username: this.username,
      password: this.password
    };

    this.api.login(data).subscribe((res: any) => {

      localStorage.setItem('token', res.token);

      this.router.navigate(['/students']);
    });
  }
}
