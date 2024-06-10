import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Output() toggleSideBar = new EventEmitter();

  collapseSideBar() {
    this.toggleSideBar.emit();
  }
}
