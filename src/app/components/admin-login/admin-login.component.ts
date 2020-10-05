import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { AdminDoctorsService } from "src/app/admin/doctors/admin-doctors.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { PagesService } from "src/app/pages/pages.service";
import { forkJoin } from "rxjs";
import { HttpHeaderResponse } from "@angular/common/http";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  public showSignUpForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _pagesService: PagesService,
    private _toastr: ToastrService // private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
    if (localStorage.hasOwnProperty("token")) {
      this._router.navigate(["/pages/dashboard"]);
    }
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof AdminLoginComponent
   */
  get loginFormControls(): any {
    return this.loginForm["controls"];
  }

  loginHandler() {
    this.loading = true;
    const { username, password } = this.loginForm.value;
    let params = {
      username,
      password,
      captcha: "",
    };
    this._pagesService.login(params).subscribe(
      (res: any) => {
        this.loading = false;

        const token = res.headers.get("Refresh-JWT");
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userInfo", JSON.stringify(res.body));
        this.createOrganization();
        this._toastr.success(
          "Welcome to Rhino Cloud Controller",
          `Hi, ${res.name}`
        );
      },
      (err: any) => {
        this.loading = false;
        this._toastr.error(err.error.error, "Error");
      }
    );
  }

  createOrganization() {
    this.loading = true;
    let orgParams = {
      name: "DEFAULT",
      group: "DEFAULT",
    };

    let tokenParams = {
      id: "5f76ce5e8a3c431d10c51dfe",
      name: "DEFAULT",
      accont: "5f76ce5e8a3c431d10c51dfe",
      group: "DEFAULT",
    };

    forkJoin([
      this._pagesService.createOrganization(orgParams),
      this._pagesService.createToken(tokenParams),
    ]).subscribe(
      (res: any) => {
        this.loading = false;
        this._router.navigate(["pages/dashboard"]);
      },
      (err: any) => {
        this.loading = false;
        this._toastr.error(err.message, "Error");
      }
    );
  }

  isLogin(event) {
    if (event) {
      this.showSignUpForm = !this.showSignUpForm;
    }
  }
}
