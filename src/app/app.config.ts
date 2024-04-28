import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FirstOneComponent } from './first-one/first-one.component';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  importProvidersFrom(), provideHttpClient()]

};
