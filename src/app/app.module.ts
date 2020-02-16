import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbStepperModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbActionsModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToastrModule } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthService } from './shared/services/auth.service';
import { UserDetailsService } from './shared/services/user-details.service';

import { AuthGuard } from './shared/guards/auth.guard';
import { AuthReverseGuard } from './shared/guards/auth-reverse.guard';
import { RegistrationGuard } from './shared/guards/registration.guard';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RegiReverseGuard } from './shared/guards/regi-reverse.guard';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AgmCoreModule.forRoot(environment.googleMap),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbStepperModule,
    NbButtonModule,
    NbCardModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbActionsModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      closeButton: true
    }),
    SharedModule
  ],
  providers: [
    AuthGuard,
    AuthReverseGuard,
    RegistrationGuard,
    RegiReverseGuard,
    AuthService,
    UserDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
