import { Component, DestroyRef, HostListener } from '@angular/core';
import {
  MatDrawerMode
} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  mode: MatDrawerMode = 'side';
  hasBackdrop = true;
  openNavBar: boolean = true;
  windowSize: string = '';

  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {
    /* this.appConfig = AppConfig; */
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizer();
  }

  ngOnInit() {
    this.hasBackdrop = true;
    this.resizer();
  }

  resizer(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XSmall, Breakpoints.XLarge])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.breakpointObserver.isMatched(Breakpoints.Small) || this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
          this.windowSize = 'small';
          this.hasBackdrop = true;
          this.openNavBar = false;
          this.mode ='over';
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
          this.windowSize = 'medium';
          this.hasBackdrop = true;
          this.openNavBar = false;
          this.mode ='over';
        }
        if (this.breakpointObserver.isMatched(Breakpoints.Large) || this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
          this.windowSize = 'large';
          this.hasBackdrop = false;
          this.mode ='side';
        }
      });
  }

  sidenavWidth(): string {
    return '250px';
  }

  collapseNavbar() {
    this.openNavBar = !this.openNavBar;
  }
}
