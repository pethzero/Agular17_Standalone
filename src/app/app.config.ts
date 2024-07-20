import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideClientHydration } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import routeConfig from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig), // ใช้การตั้งค่าเส้นทางที่นำเข้าจาก app.routes
    provideHttpClient(),
    provideAnimations(),
     // คุณสามารถเปิดใช้งาน provideClientHydration() ได้ถ้าจำเป็น
  ],
};
