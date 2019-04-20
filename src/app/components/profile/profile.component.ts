import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/class/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router:Router,private route:ActivatedRoute,private authService:AuthService) { }
  user:User;
  ngOnInit() {
    this.user=this.authService.user;
  }
  goToGamesPlayed(){
    this.router.navigate(['gamesplayed'],{relativeTo:this.route});
  }
  goToSettings(){
    /*console.log('ROUTE',this.route);
    this.route.params.subscribe((params) => {
      console.log('NETRO',params['username']);
    })*/
    
    this.router.navigate(['settings'],{relativeTo:this.route});
  }

}
