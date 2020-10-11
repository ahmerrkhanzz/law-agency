import { ChangeDetectorRef, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { textValidator, numericValidator, removeDuplicates } from 'src/app/shared/globalfunctions';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  @Input() savedForm: any;
  @Output() unauthorized = new EventEmitter<boolean>(false);
  @Output() proceed = new EventEmitter<object>(null);
  @ViewChild("avatar") avatar: ElementRef;

  public languages = [];
  public specialities: any[] = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public profileImg: File;
  public dob: any;
  public preview: string =
    "../../../../../assets/images/doctor-placeholder.jpg";
  public personalInformationForm: FormGroup;
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public selectedDoctor: any = {};
  public selectedLanguages: any[] = [];
  public selectedSpecialities: any[] = [
    {
      id: null,
      name: "General Phsycian",
      file: null,
    },
  ];
  public minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  // formatter = (cities: City) => cities.name;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.languages = [
      { id: 1, name: "English" },
      { id: 2, name: "Urdu" },
      { id: 3, name: "Turkish" },
      { id: 4, name: "German" },
      { id: 5, name: "Arabic" },
      { id: 6, name: "Spanish" },
      { id: 7, name: "Portugeese" },
    ];

    this.selectedItems = [
      { id: 3, name: "Pune" },
      { id: 4, name: "Navsari" },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };

    this.personalInformationForm = this.formBuilder.group({
      property: this.formBuilder.group({
        area: ["", [
          Validators.required,
        ]],
        unit: ["Marla", [
          Validators.required,
        ],],
      }),
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      cnic: [
        "",
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.maxLength(13),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      co_applicant_name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      co_applicant_cnic: [
        "",
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.maxLength(13),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      address: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(40),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      owner_name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      ownership_type: [
        "Sole",
        [
          Validators.required,
        ],
      ],
      authority: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
    });

    // this.getSpecialities();
    if (localStorage.hasOwnProperty("personalInformation")) {
      localStorage.removeItem('personalInformation')
      // this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      // this.patchFormValues(this.selectedDoctor);
      console.log(this.personalInformationForm);
    }

    // else if (
    //   Object.keys(this.savedForm).length !== 0 &&
    //   this.savedForm.constructor === Object
    // ) {
    //   console.log(this.savedForm);
    //   // this.patchFormValues(this.savedForm.personalInformation);
    // }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof PersonalInformationComponent
   */
  get personalInformationFormControls(): any {
    return this.personalInformationForm["controls"];
  }

  /**
   *
   *  On Single Item Selection of Multi Select Dropdown
   * @param {object} item
   * @memberof PersonalInformationComponent
   */
  onItemSelect(item: any) {
    console.log(item);
  }

  /**
   *
   * On Selection of all options in multi select dropdown
   * @param {object} items array of selected items
   * @memberof PersonalInformationComponent
   */
  onSelectAll(items: any) {
    console.log(items);
  }


  /**
   *
   *  Submit Personal Information Form
   * @param {string} direction direction for the wizard form (back/next)
   * @memberof PersonalInformationComponent
   */
  submit(direction) {
    console.log(this.personalInformationForm)
    this.proceed.emit(
      this.formValidation(
        direction,
        this.personalInformationForm,
        "personalInformation"
      )
    );
  }

  public formValidation(direction, form, name?) {
    if (form.status.toLowerCase() === "invalid") {
      return {
        validated: false,
        direction: direction,
        form: form,
      };
      // return false;
    } else {
      return {
        validated: true,
        direction: direction,
        form: form.value,
        name: name,
      };
    }
  }

  patchFormValues(data) {
    const {
      image,
      pmdc,
      name,
      email,
      password,
      phone,
      date_of_birth,
      country,
      city,
      address,
      gender,
      speciality,
      language,
      summary,
      is_instant,
    } = data;
    if (date_of_birth) {
      let date = new Date(date_of_birth);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let day = date.getDate();
      this.dob = {
        year: year,
        month: month,
        day: day,
      };
    }
    this.preview = image.includes("no-image")
      ? "../../../../../assets/images/doctor-placeholder.jpg"
      : image;
    if (!is_instant) {
      this.selectedSpecialities = speciality;
    }
    this.personalInformationForm.patchValue({
      image: "",
      pmdc: pmdc,
      name: name,
      email: email,
      phone: phone,
      password: password,
      date_of_birth:
        date_of_birth && typeof date_of_birth === "string"
          ? this.dob
          : date_of_birth,
      country: country,
      city: city,
      address: address,
      is_instant: is_instant,
      gender: gender,
      speciality: this.selectedSpecialities,
      language: removeDuplicates(language, "name"),
      summary: summary,
    });
    this.languages.forEach((e) => {
      language.forEach((element) => {
        if (e.name === element.name) {
          this.selectedLanguages.push(e);
        }
      });
    });
    console.log(this.personalInformationForm);
  }


}
