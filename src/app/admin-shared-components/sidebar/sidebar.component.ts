import { Component } from '@angular/core';

export interface Section {
  name: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: Section[] = [
    /* {
      name: 'Dashboard',
      link: '/admin/dashboard',
      icon: 'dashboard'
    }, */
    {
      name: 'File Manager',
      link: '/admin/file-manager',
      icon: 'table_chart'
    },
    {
      name: 'Profile',
      link: '/admin/user-profile',
      icon: 'person'
    },
  ];
}
