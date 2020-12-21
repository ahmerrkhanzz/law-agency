import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { numericValidator, removeDuplicates, textValidator } from 'src/app/shared/globalfunctions';

@Component({
  selector: 'app-list-of-documents',
  templateUrl: './list-of-documents.component.html',
  styleUrls: ['./list-of-documents.component.scss']
})
export class ListOfDocumentsComponent implements OnInit {

  @Input() selectedTab: any;
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
      image: [null, Validators.required],
    });

    // this.getSpecialities();
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
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
   * Image Upload Handler
   * @param {object} event added image object info
   * @memberof PersonalInformationComponent
   */
  handleFileInput(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.personalInformationForm.patchValue({
          image: reader.result,
        });
        this.personalInformationForm.get("image").updateValueAndValidity();
        this.preview = reader.result as string;
      };
    }
    event.target.value = null;
  }

  cancelAvatar() {
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.preview = this.selectedDoctor.image;
      this.personalInformationForm.patchValue({
        image: "",
      });
      this.personalInformationForm.get("image").clearValidators();
      this.personalInformationForm.get("image").updateValueAndValidity();
    } else {
      this.preview = "../../../../../assets/images/doctor-placeholder.jpg";
    }
  }

  /**
   *
   *  Submit Personal Information Form
   * @param {string} direction direction for the wizard form (back/next)
   * @memberof PersonalInformationComponent
   */
  submit(direction) {
    this.proceed.emit(
      this.formValidation(
        direction,
        this.personalInformationForm,
        "list_of_documents_i"
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

  // trimValidation(event) {
  //   console.log(event.target.value.replace(/  /g, ' ').trim());

  //   this.personalInformationForm.patchValue({
  //     name: event.target.value.replace(/  /g, ' ').trim()
  //   })
  // }


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
    this.personalInformationForm.get("password").clearValidators();
    this.personalInformationForm.get("password").updateValueAndValidity();
    this.personalInformationForm.get("image").clearValidators();
    this.personalInformationForm.get("image").updateValueAndValidity();
    console.log(this.personalInformationForm);
  }

  /**
   *
   *  Typehead Search Functions for City and Country
   * @memberof PersonalInformationComponent
   */
  // citySearch = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     filter((term) => term.length >= 2),
  //     map((term) =>
  //       cities
  //         .filter((city) => new RegExp(term, "mi").test(city.name))
  //         .slice(0, 10)
  //     )
  //   );

  // countrySearch = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     filter((term) => term.length >= 2),
  //     map((term) =>
  //       cities
  //         .filter((country) => new RegExp(term, "mi").test(country.name))
  //         .slice(0, 10)
  //     )
  //   );

}
