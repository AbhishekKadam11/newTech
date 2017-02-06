import {Component, ViewEncapsulation, Input} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {BaProfilePicturePipe} from '../../pipes';
import {BaMsgCenter} from '../../components/baMsgCenter';
import {BaScrollPosition} from '../../directives';
import {UserService} from '../../../pages/login/user.service';

@Component({
  selector: 'ba-page-top',

  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  directives: [BaMsgCenter, BaScrollPosition],
  pipes: [BaProfilePicturePipe],

  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {


  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public logged:boolean = false;
  private profileName:string;
  public userId:string;
  private hidebttn:boolean = false;

  constructor(private _state:GlobalState, private userService:UserService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    if(userService.profileName){
      this.logged = userService.loggedIn;
      this.profileName = userService.profileName;
      this.userId = userService.userId;
      this.hidebttn = true;

    }
  }


  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
