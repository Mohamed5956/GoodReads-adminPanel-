import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isSmallScreen = false;
  sideBarOpen = true;
  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 768px)').pipe(
      map(result => result.matches)
    ).subscribe(matches => {
      this.isSmallScreen = matches;
    });
  }

  sideBarToggler() {
    if (this.isSmallScreen) {
      this.sideBarOpen = false;
    } else {
      this.sideBarOpen = !this.sideBarOpen;
    }
  }

}
