import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  
  constructor(
    public authService: AuthService,
    private router:Router   
  ) { }

  ngOnInit() {
  }

  onSubmitLoginUser() {
    this.authService.emailLogin(this.email, this.password)
    .then( (res) => {
      if (res) {
        alert(res)
      } else {
        this.router.navigate(['/dashboard'])
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  } 

}
