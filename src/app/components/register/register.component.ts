import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onSubmitRegisterUser() {
    this.authService.emailSignUp(this.email, this.password)
    .then( (res) => {
      if (res) {
        alert(res)
      } else {
        alert('Registration was successful!')
        this.router.navigate(['/login'])
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }
}
