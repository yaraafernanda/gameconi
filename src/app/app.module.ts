import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { GameComponent } from './components/game/game.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesPlayedComponent } from './components/profile/games-played/games-played/games-played.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsComponent } from './components/profile/settings/settings/settings.component';
import { GamesinprogressComponent } from './components/profile/gamesinprogress/gamesinprogress/gamesinprogress.component';
import { GamecardComponent } from './components/profile/gamesinprogress/gamecard/gamecard.component';

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
    ChallengeListComponent,
    GamesPlayedComponent,
    SettingsComponent,
    GamesinprogressComponent,
    GamecardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
