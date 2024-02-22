import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//PrimeNg
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { User } from './Model/User';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    DividerModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ToastModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
