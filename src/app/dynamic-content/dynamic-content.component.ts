// D:\PROJECT\Angular\AgularDjango\src\app\dynamic-content\dynamic-content.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <h1>Angular Router App</h1>
    <section>
      <div *ngFor="let route of routes">
        <a [routerLink]="route.path">{{ route.path }}</a>
      </div>
    </section>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./dynamic-content.component.scss']
})
export class DynamicContentComponent implements OnInit {
  routes: { path: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Determine the base path from the current route
    this.route.url.subscribe(urlSegments => {
      const basePath = urlSegments[0]?.path;
      switch (basePath) {
        case 'data':
          this.routes = [
            { path: 'aaa' },
            { path: 'bbb' }
          ];
          break;
        case 'dataA':
          this.routes = [
            { path: 'aaa' },
          ];
          break;
        case 'dataB':
          this.routes = [
            { path: 'bbb' },
          ];
          break;
        default:
          this.routes = [];
      }
    });
  }
}
