import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorProviders } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // IMPORTANT: Register class-based interceptors with withInterceptorsFromDi()
    provideHttpClient(withInterceptorsFromDi()),
    authInterceptorProviders,
    provideClientHydration(withEventReplay())]
};
