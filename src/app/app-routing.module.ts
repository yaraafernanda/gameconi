import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameComponent } from './components/game/game.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SettingsComponent } from './components/profile/settings/settings/settings.component';
import { GamesPlayedComponent } from './components/profile/games-played/games-played/games-played.component';
import { GamesinprogressComponent } from './components/profile/gamesinprogress/gamesinprogress/gamesinprogress.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:username', component: ProfileComponent, children: [
    // { path: '',redirectTo:'/', pathMatch:'full'},
    // { path: ':id',redirectTo:':id/gamesplayed', pathMatch:'full'},
    { path: '', redirectTo: 'gamesplayed', pathMatch: 'full'},
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
    { path: 'currentgames', component: GamesinprogressComponent, canActivate: [AuthGuardService]},
    { path: 'gamesplayed', component: GamesPlayedComponent}
  ] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuardService]},
  { path: 'gameplay', children: [
    {path: '', redirectTo: '/game', pathMatch: 'full'},
    {path: ':id/:cat', component: GameplayComponent, canActivate: [AuthGuardService]},
    { path: ':id/:cat/gameover', component: GameoverComponent, canActivate: [AuthGuardService] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [HomeComponent]