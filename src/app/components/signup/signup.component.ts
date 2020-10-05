import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { PagesService } from "src/app/pages/pages.service";
import {
  textValidator,
  numericValidator,
  numericFloatValidator,
} from "src/app/shared/globalfunctions";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  @Output() isLogin = new EventEmitter<boolean>(false);
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public numericFloatValidator = numericFloatValidator;
  public loading: boolean = false;

  public signUpForm: FormGroup;
  public companyForm: FormGroup;
  public showCompany: boolean = false;
  public is_agree: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _pagesService: PagesService,
    // private _loginService: LoginService,
    private toast: ToastrService // private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      accountName: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      userFirstName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      userLastName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      userJobTitle: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      userPhoneNumber: [
        "",
        [Validators.minLength(12), Validators.maxLength(12)],
      ],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });

    this.companyForm = this.formBuilder.group({
      country: ["", [Validators.required]],
      companySize: ["", [Validators.required]],
      serviceType: ["", [Validators.required]],
      numberSites: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
      is_agree: [false, [Validators.required]],
    });
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof LoginComponent
   */
  get signUpFormControls(): any {
    return this.signUpForm["controls"];
  }

  get companyFormFormControls(): any {
    return this.companyForm["controls"];
  }

  /**
   *
   * User Sign Up
   * @memberof LoginComponent
   */
  signUp() {
    this.loading = true;
    let combinedForm = { ...this.signUpForm.value, ...this.companyForm.value };
    const {
      accountName,
      email,
      userFirstName,
      userLastName,
      password,
      userJobTitle,
      userPhoneNumber,
    } = this.signUpForm.value;
    const {
      companySize,
      country,
      numberSites,
      serviceType,
    } = this.companyForm.value;
    let params = {
      accountName,
      email,
      userFirstName,
      userLastName,
      password,
      userJobTitle,
      userPhoneNumber,
      companySize,
      country,
      numberSites,
      serviceType,
      captcha: "",
      companyType: "",
      companyDesc: "",
    };
    this._pagesService.registerUser(params).subscribe(
      (res: any) => {
        this.loading = false;
        this.toast.success(res.status, "Success");
        this.signUpForm.reset();
        this.companyForm.reset();
        this.isLogin.emit(true);
      },
      (err: any) => {
        this.loading = false;
        this.toast.error(err.error.error, "Error");
      }
    );
  }
}
