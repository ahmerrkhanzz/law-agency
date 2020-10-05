import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RouteGuardService implements CanActivate {
  constructor(private _router: Router, private _toastr: ToastrService) {}
  canActivate() {
    if (localStorage.hasOwnProperty("token")) {
      return true;
    } else {
      this._toastr.error(
        "You need to login first to access this route",
        "Sorry"
      );
      this._router.navigate(["/"]);
      return false;
    }
  }
}
