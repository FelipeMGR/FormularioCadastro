import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(), provideHttpClient(), provideAnimationsAsync()],
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

