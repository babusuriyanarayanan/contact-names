import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { ContentComponent } from './modules/content/content.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { CardlistComponent } from './modules/cardlist/cardlist.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './modules/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageserviceService } from './services/messageservice.service';
import { FooterComponent } from './modules/footer/footer.component';
import {DropdownModule} from 'primeng/dropdown';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    CardlistComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiSwitchModule,
    NgbModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  providers: [MessageserviceService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
