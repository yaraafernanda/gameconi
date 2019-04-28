import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { GameComponent } from './components/game/game.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { GamesinprogressComponent } from './gamesinprogress/gamesinprogress.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: ProfileSettingsComponent },
  { path: 'game', component: GameComponent },
  { path: 'gameplay', component: GameplayComponent },
  { path: 'gameover', component: GameoverComponent },
  { path: 'currentgames', component: GamesinprogressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [HomeComponent]
