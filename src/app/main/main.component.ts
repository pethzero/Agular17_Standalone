import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./main.component.scss']
})
export class MainComponent {}
