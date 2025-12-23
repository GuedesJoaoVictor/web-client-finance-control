import {
  ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, Provider,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {SweetAlert2LoaderService} from '@sweetalert2/ngx-sweetalert2';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/security/auth.interceptor';
import {env} from './enviroment/env';

export const ENV: Provider = {
  provide: 'ENV',
  useValue: env
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(SweetAlert2LoaderService),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
