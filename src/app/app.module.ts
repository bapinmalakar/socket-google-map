import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule, AgmMarker, AgmInfoWindow } from '@agm/core';
import { AppComponent } from './app.component';
import { MapService } from './app.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBM8GfQbRRekkECNxSBHtzsHB7hdj2EWg'
    }),

  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
