import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../class/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logged:boolean=false;
  loginStatus: Subscription;
  user:User;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.logged = this.authService.isAuthehticated();
    this.loginStatus = this.authService.loginStatusChange.subscribe((usuario: User) => {
        this.logged = true;
        this.user = this.authService.user;
        console.log('USUARIO LOGEADO', usuario);
    });
  }

  play() {
    this.router.navigate(['/game']);
  }
}
