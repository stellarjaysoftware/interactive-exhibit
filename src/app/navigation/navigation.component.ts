import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  routerSub?: Subscription;
  screen = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getScreen();
  }

  ngOnDestroy(): void {
    if (this.routerSub) { this.routerSub.unsubscribe(); }
  }

  getScreen(): void {
    this.routerSub = this.router.events.subscribe((navEvent) => {
      if (navEvent instanceof NavigationEnd) {
        this.screen = navEvent.url;
      }
    });
  }

}
