import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public userInfo: any = null;
  public initials: string = "AS";
  constructor(private _toastr: ToastrService, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty("userInfo")) {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // let name = this.userInfo.name.split(" ");
      // if (name.length === 1) {
      //   this.initials = name[0].charAt(0);
      // } else if (name.length === 2) {
      //   this.initials = name[0].charAt(0) + "" + name[1].charAt(0);
      // }
      this.initials = this.userInfo.name.charAt(0);
    }
  }

  logOut() {
    this._toastr.success("Logged out successfully", "Success");
    this._router.navigate(["/"]);
    localStorage.clear();
  }
}
