import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarkerService } from './services/marker.service';
import { MapComponent } from './components/maps/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderFooterComponent } from './components/header-footer/header-footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ProductComponent } from './components/product/product.component';
import { NewsComponent } from './components/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderFooterComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    ProductComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
