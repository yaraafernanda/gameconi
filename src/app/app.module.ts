import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {NgxPaginationModule} from 'ngx-pagination';
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
import { GameplayedComponent } from './components/gameplayed/gameplayed.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/profile/settings/settings/settings.component';
import { GamesPlayedComponent } from './components/profile/games-played/games-played/games-played.component';
import { GeneralComponent } from './components/profile/general/general.component';

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
<<<<<<< HEAD
    ProfileSettingsComponent,
    GamesinprogressComponent
=======
    GameplayedComponent,
    ChallengeListComponent,
    SettingsComponent,
    GamesPlayedComponent,
    GeneralComponent,
>>>>>>> 922c643d6e43cfeab69c5f4f37e47fff4d4d1de0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
=======
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot()
>>>>>>> 922c643d6e43cfeab69c5f4f37e47fff4d4d1de0
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
