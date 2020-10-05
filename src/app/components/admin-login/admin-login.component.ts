import { Component, NgZone, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { AdminDoctorsService } from "src/app/admin/doctors/admin-doctors.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { PagesService } from "src/app/pages/pages.service";
import { forkJoin } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

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
    private _firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
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

    this._pagesService
      .login(username, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userInfo", JSON.stringify(res.user.toJSON()));
        this.getUserProfile(res.user.uid);
      })
      .catch((err) => {
        this.loading = false;
        this._toastr.error(err.message, "Error");
      });
  }

  getUserProfile(uid) {
    this._pagesService.getUserProfile(uid).subscribe(
      (res: any) => {
        console.log(res);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, name: res.name }));
        this._toastr.success("Welcome to Global Law Firm", `Hi, ${res.name}`);
        this._router.navigate(["pages/dashboard"]);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  isLogin(event) {
    if (event) {
      this.showSignUpForm = !this.showSignUpForm;
    }
  }
}
