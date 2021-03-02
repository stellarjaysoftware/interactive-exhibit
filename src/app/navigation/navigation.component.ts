import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';
import {ExhibitApiService} from '../services/exhibit-api.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  routerSub?: Subscription;
  authSub?: Subscription;
  signedIn = false;
  screen = '';

  constructor(private router: Router,
              private api: ExhibitApiService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getScreen();
    this.setupAuthListener();
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  setupAuthListener(): void {
    this.authSub = this.api.authChanged.subscribe({
      next: signedIn => this.signedIn = signedIn
    });
  }

  goSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  getScreen(): void {
    this.routerSub = this.router.events.subscribe((navEvent) => {
      if (navEvent instanceof NavigationEnd) {
        this.screen = navEvent.url;
      }
    });
  }

  signOut(): void {
    this.usersService.logout().subscribe(() => this.goSignIn());
  }

}
