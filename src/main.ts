// import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// // import routeConfig from './app/routes';



// bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));


// EDIT
// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient()]
// })

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { PageComponent } from './app/pages/page.component'; // เปลี่ยนเป็น PageComponent


// bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));