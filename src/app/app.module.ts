import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedModule } from "./components/shared.module";

import { ToastrModule } from "ngx-toastr";
import { HeaderInterceptor } from "./constants/interceptor.service";
import { PagesModule } from "./pages/pages.module";
import { RouteGuardService } from "./shared/route-guard.service";

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
  ],
  providers: [
    RouteGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [NotFoundComponent],
})
export class AppModule {}
