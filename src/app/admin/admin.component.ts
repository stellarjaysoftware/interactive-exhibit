import {Component, OnInit} from '@angular/core';
import {ExhibitApiService} from '../services/exhibit-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private api: ExhibitApiService) {
  }

  ngOnInit(): void {
    if (!this.api.authToken) {
      // redirect to sign-in
      this.router.navigate(['/sign-in']);
    }
  }

}
