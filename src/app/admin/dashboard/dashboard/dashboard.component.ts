import { Component } from '@angular/core';

export interface Card {
  title : string
  value : number
  subTitle : string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cards: Card[] = [{
    title: 'Total Files',
    subTitle: 'Total Files',
    value: 50
  },{
    title: 'Archived',
    subTitle: 'Total Files',
    value: 5
  },{
    title: 'Favorites',
    subTitle: 'Total Files',
    value: 5
  },{
    title: 'Shared',
    subTitle: 'Total Files',
    value: 5
  }];
}
