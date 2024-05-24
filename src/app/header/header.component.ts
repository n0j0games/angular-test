import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub : Subscription;
  isAuthenticated = false;

  constructor(private dsService : DataStorageService, private authService : AuthService) {}

  collapsed = true;

  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
      })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
