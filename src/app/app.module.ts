import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedModule } from "./components/shared.module";

import { ToastrModule } from "ngx-toastr";
import { HeaderInterceptor } from "./constants/interceptor.service";
import { PagesModule } from "./pages/pages.module";
import { RouteGuardService } from "./shared/route-guard.service";

const firebaseConfig = {
  apiKey: "AIzaSyAGkt_gIb9iihDek8OTifWlwNWh1AMb8n0",
  authDomain: "global-law-firm-175b2.firebaseapp.com",
  databaseURL: "https://global-law-firm-175b2.firebaseio.com",
  projectId: "global-law-firm-175b2",
  storageBucket: "global-law-firm-175b2.appspot.com",
  messagingSenderId: "710039274939",
  appId: "1:710039274939:web:9361eeb662196e8cd3709e",
  measurementId: "G-4JWDVHCM2J"
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    PagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [
    RouteGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [NotFoundComponent],
})
export class AppModule {}
