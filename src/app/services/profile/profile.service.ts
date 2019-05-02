import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../class/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private owner = true;
  updateOwner = new Subject<boolean>();
  private profilevisited: User;
  updateUserVisited = new Subject<User>();

  constructor() { }

  isOwner() {
    return this.owner;
  }

  getProfileVisited(){
    return this.profilevisited;
  }

  setOwner(is_owner: boolean) {
    this.owner = is_owner;
    this.updateOwner.next(this.owner);
  }

  currentUserProfile(profile: User) {
    this.profilevisited = profile;
    this.updateUserVisited.next(this.profilevisited);
  }
}
