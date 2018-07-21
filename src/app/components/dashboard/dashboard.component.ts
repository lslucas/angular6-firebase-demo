import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router:Router   
  ) { }

  ngOnInit() {
    // silly and naive protector for this page
    if (!this.authService.authenticated) {
      console.error('restricted area')
      this.router.navigate(['/login'])
    }
  }

}
