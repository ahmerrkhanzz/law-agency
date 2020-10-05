import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PagesService } from "src/app/pages/pages.service";

@Component({
  selector: "app-admin-aside",
  templateUrl: "./admin-aside.component.html",
  styleUrls: ["./admin-aside.component.scss"],
})
export class AdminAsideComponent implements OnInit {
  public loading: boolean = false;
  public isCollapsed = true;
  public navList = [
    {
      name: "Dashboard",
      icon: "fab fa-buffer",
      img: "dashboard_blue",
      child: null,
    },
    {
      name: "Devices",
      icon: "fas fa-stethoscope",
      img: "devices",
      child: null,
    },
    {
      name: "Configs",
      icon: "fab fa-buffer",
      img: "config",
      child: null,
    },
    {
      name: "Tunnels",
      icon: "fab fa-buffer",
      img: "tunnel",
      child: null,
    },
    {
      name: "Logs",
      icon: "fab fa-buffer",
      img: "dashboard_blue",
      child: null,
    },
  ];
  public selectedItem: any = {};
  public selectedChild: any = {};
  constructor(private _router: Router, private _toastr: ToastrService) {}

  ngOnInit(): void {}

  tabClick(comp) {
    this.selectedItem = comp;
    if (comp.child) {
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.isCollapsed = true;
      this._router.navigate([`pages/${comp.name.toLowerCase()}`]);
    }
  }

  tabChildClick(childComp) {
    this.selectedChild = childComp;
    localStorage.removeItem("selectedDoctor");
    localStorage.removeItem("selectedPatient");
    this._router.navigate([`pages/${childComp.route.toLowerCase()}`]);
  }

  logOut() {
    this._toastr.success("Logged out successfully", "Success");
    this._router.navigate(["/"]);
    localStorage.clear();
  }
}
