import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
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
    // Add provideClientHydration() if needed
  ],
};
