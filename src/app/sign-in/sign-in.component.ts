import {Component, OnInit} from '@angular/core';
import {CommentsService} from '../services/comments.service';
import {Location} from '@angular/common';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

enum SignInMode { signIn = 'Sign In', create = 'Create Account'}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  SignInMode = SignInMode;
  mode = SignInMode.signIn;
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
  error?: string;

  constructor(private router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  goAdmin(): void {
    // go to admin screen
    this.router.navigate(['/admin']);
  }

  handleToggleMode(): void {
    this.error = undefined;
    this.mode = this.mode === SignInMode.signIn ? SignInMode.create : SignInMode.signIn;
  }

  // TODO: improve form validation: https://angular.io/guide/form-validation
  validate(): boolean {
    const message = 'Please review your entries and retry.';
    console.log('email', this.email, 'password', this.password, 'name', this.name);
    this.name = this.name && this.name.trim();
    this.email = this.email && this.email.trim();
    this.password = this.password && this.password.trim();
    this.password2 = this.password2 && this.password2.trim();
    if (this.mode === SignInMode.create) {
      if (!this.name || !this.email || !this.password || !this.password2) {
        throw message;
      } else if (this.password !== this.password2) {
        // tslint:disable-next-line
        throw 'Your passwords did not match.  Please try again.';
      }
    } else {
      if (!this.email || !this.password) {
        throw message;
      }
    }
    return true;
  }

  handleSubmit(): void {
    this.error = undefined;
    let isValid = false;
    try {
      isValid = this.validate();
    } catch (error) {
      this.error = error;
    }
    if (isValid) {
      if (this.mode === SignInMode.signIn) {
        this.usersService.login(this.email, this.password)
          .subscribe({
            next: () => this.goAdmin(),
            error: error => this.error = error?.message || error
          });
      } else {
        this.usersService.create(this.email, this.password, this.name).subscribe({
          next: () => this.goAdmin(),
          error: error => this.error = error?.message || error
        });
      }
    }
  }
}
