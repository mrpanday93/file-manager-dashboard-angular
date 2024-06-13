import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Output() toggleSideBar = new EventEmitter();

  constructor(private authService: AuthenticationService) {}
  collapseSideBar() {
    this.toggleSideBar.emit();
  }

  logout() {
    this.authService.logout();
  }
}
