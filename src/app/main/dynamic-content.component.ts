// D:\PROJECT\Angular\AgularDjango\src\app\dynamic-content\dynamic-content.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MENU_CONFIG, MenuConfigKey } from './dynamic-content.config'; // Import types and config

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <h1>{{ title }}</h1>
    <!-- <img [src]="logo" alt="logo" /> -->
    <section>
      <div *ngFor="let route of routes">
        <h3><a [routerLink]="route.path">{{ route.path }}</a></h3> 
      </div>
    </section>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./dynamic-content.component.scss']
})
export class DynamicContentComponent implements OnInit {
  routes: { path: string }[] = [];
  title: string = '';
  logo: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const basePath = urlSegments[0]?.path as MenuConfigKey; // Cast to MenuConfigKey
      const config = MENU_CONFIG[basePath];
      if (config) {
        this.routes = config.menu;
        this.title = config.title;
        this.logo = config.logo;
      } else {
        this.routes = [];
        this.title = '';
        this.logo = 'default-logo.png';
      }
    });
  }
}
