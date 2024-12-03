// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HomeComponent } from './home/home.component';
// import { DataComponent } from './data/data.component';
// import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     HomeComponent,
//     DataComponent,
//     CommonModule,
//     RouterOutlet,
//     RouterLink,
//     RouterLinkActive
//   ],
//   template: `
//     <main>
//       <a [routerLink]="['/']">
//         <header class="brand-name">
//           <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
//         </header>
//       </a>
//       <section class="content">
//         <h1>Angular Router App</h1>
//         <nav>
//           <ul class="home">
//             <li><a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a></li>
//             <li><a routerLink="/students" routerLinkActive="active" ariaCurrentWhenActive="page">นักเรียน</a></li>
//             <li><a routerLink="/first-component" routerLinkActive="active" ariaCurrentWhenActive="page">ทดสอบไปหน้า 1</a></li>
//             <li><a routerLink="/second-component" routerLinkActive="active" ariaCurrentWhenActive="page">ทดสอบไปหน้า 2</a></li>
//           </ul>
//         </nav>
//         <br>
//         <router-outlet></router-outlet>
//       </section>
//     </main>
//   `,
//   styleUrls: ['./app.component.scss'] // แก้ไขจาก styleUrl เป็น styleUrls
// })
// export class AppComponent {
//   title = 'AngularDjango';

//   constructor(private router: Router) {}
// }

// D:\PROJECT\Angular\AgularDjango\src\app\app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DataComponent } from './data/data.component';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // DataComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>
      <section class="content">
        <h1>Angular Router App</h1>
        <!-- <nav>
          <ul class="home">
            <li><a routerLink="" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a></li>
            <li><a routerLink="/students" routerLinkActive="active" ariaCurrentWhenActive="page">นักเรียน</a></li>
            <li>
                <a>DATATABLE</a>
                <ul>
                  <li><a routerLinkActive="active" ariaCurrentWhenActive="page" [routerLink]="['/api-test/none']">Data A</a></li>
                  <li><a routerLinkActive="active" ariaCurrentWhenActive="page" [routerLink]="['/api-test/api']">Data B</a></li>
                </ul>
              </li>
            <li><a routerLink="/asynchronous" routerLinkActive="active" ariaCurrentWhenActive="page">asynchronous</a></li>
            <li><a routerLink="/second-component" routerLinkActive="active" ariaCurrentWhenActive="page">ทดสอบไปหน้า 2</a></li>
          </ul>
        </nav> -->
        <nav>
        <ul class="home flex space-x-4">
          <li><a routerLink="" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a></li>
          <li><a routerLink="/students" routerLinkActive="active" ariaCurrentWhenActive="page">Example</a></li>
          <li class="relative group">
            <a class="cursor-pointer">API-TEST</a>
            <ul class="absolute hidden group-hover:block bg-white shadow-lg">
              <li><a routerLinkActive="active" ariaCurrentWhenActive="page" [routerLink]="['/api-test/none']" class="block px-4 py-2">None</a></li>
              <li><a routerLinkActive="active" ariaCurrentWhenActive="page" [routerLink]="['/api-test/api']" class="block px-4 py-2">API</a></li>
              <li><a routerLinkActive="active" ariaCurrentWhenActive="page" [routerLink]="['/api-test/pivot']" class="block px-4 py-2">Pivot</a></li>
            </ul>
              </li>
              </ul>
          </nav>
        <br>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularDjango';

  constructor(private router: Router) { }
}
