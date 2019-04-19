import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { GameComponent } from './components/game/game.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { GameplayedComponent } from './components/gameplayed/gameplayed.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GameplayComponent,
    GameComponent,
    GameoverComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    GameplayedComponent,
    ChallengeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
