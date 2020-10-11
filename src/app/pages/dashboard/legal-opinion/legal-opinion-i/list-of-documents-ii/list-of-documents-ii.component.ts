import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {
  numericValidator,
  removeDuplicates,
  textValidator,
} from "src/app/shared/globalfunctions";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { DocumentCreator } from "./cv-generator";

@Component({
  selector: "app-list-of-documents-ii",
  templateUrl: "./list-of-documents-ii.component.html",
  styleUrls: ["./list-of-documents-ii.component.scss"],
})
export class ListOfDocumentsIiComponent implements OnInit {
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



  public experiences = [];

  public education = [];

  public beforeTransactions = [];
  public afterTransactions = []
  public intro = []

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
      image: ["", Validators.required],
    });

    // this.getSpecialities();
    if (localStorage.hasOwnProperty("personalInformation")) {
      const userData = JSON.parse(localStorage.getItem('personalInformation'))
      const { name, cnic, co_applicant_name, co_applicant_cnic, owner_name, ownership_type, authority, address, property } = userData
      this.experiences = [
        {
          summary: `From the perusal of the above documents, prima facie, the copies of the documents show that ${owner_name} W/o Syed Arshad Ali is the owner of property measuring ${property.area}-${property.unit}, acquired through sale deed & mutation in her favour. The owner is legally competent to sell/agree to sell the above described property to ${name} (Purchaser). The Purchaser after having transferred the same in his name through sale deed & mutation, shall get Fard for Mortgage and mortgage the same with the bank after completing all legal & codal formalities of the bank as per bank policy. Prima Facie, the bank can accept the said property for creation of token registered Mortgage coupled with equitable mortgage after completing of legal formalities. COMMENTS ON THE PROPERTY: POSITIVE  () NEGATIVE (x)  PENDING (x )`,
        },
      ];

      this.education = [
        {
          degree: "We have reviewed the copies of the following documents:",
          notes: `1. Copy of agreement to sell, between ${owner_name} (Seller) & ${name} (Purchaser), regarding House measuring ${property.area}-${property.unit}, Situated at ${address}.\n\n2. Copy of Sale Deed, in favour of ${owner_name} W/o Syed Arshad Ali, regarding property measuring ${property.area}-${property.unit}, vide registered document No. 16726, Book No.1, Volume No. 6291, Dated 10-06-2016, registered with Sub-Registrar Nishter Town, Lahore. \n3. Copy of Mutation No. 758, in favour of Zahida Perveen regarding said property.\n\n4. Copy of sale deed, in favour of Mrs. Musa Moti Razia W/o Muhammad Hussain Shah, regarding property measuring 15-Marla, vide registered document No. 21688 Book 1, Volume 5146, Dated 17-09-2014, registered with sub registrar Nister Town Lahore. \n\n5. Copy of Mutation No. 44792, dated 21-10-2015, in favor of Mrs. Musa Moti Razia regarding property measuring 15-Marla. \n\n6. Copy of sale deed, in favour of Mrs. Musa Moti Razia W/o Muhammad Hussain regarding property measuring 01-Marla, vide registered document No. 27201 book 1, volume 5257, dated 2-12-2014, registered with sub registrar Nister Town Lahore.\n\n7. Copy of Mutation No. 45318, dated 19-05-2015 in favor of Mrs. Musa Moti Razia regarding property measuring 01-Marla.\n\n8. Copy of Sanction/Approval letter for residential construction vide no. 441-D (P&C)-NST/17 dated 29-04-2017 issued by the Zonal Officer Nishter Town Lahore.\n\n9. Copy of Approved Map of the House.`,
        },
      ];

      this.beforeTransactions = [
        {
          notes: `1. Original agreement to sell, between ${owner_name} (Seller) & ${name} (Purchaser), regarding House measuring ${property.area}-${property.unit}, Situated at ${address}.\n\n2. Original & CTC of Sale Deed, in favour of ${owner_name} W/o Syed Arshad Ali, regarding property measuring ${property.area}-${property.unit}, vide registered document No. 16726, Book No.1, Volume No. 6291, Dated 10-06-2016, registered with Sub-Registrar Nishter Town, Lahore.\n\n3. CTC of Mutation No. 758, in favour of Zahida Perveen regarding said property.\n\n4. Original & CTC of sale deed, in favour of Mrs. Musa Moti Razia W/o Muhammad Hussain Shah, regarding property measuring 15-Marla, vide registered document No. 21688 Book 1, Volume 5146, Dated 17-09-2014, registered with sub registrar Nister Town Lahore.\n\n5. CTC of Mutation No. 44792, dated 21-10-2015, in favor of Mrs. Musa Moti Razia regarding property measuring 15-Marla\n\n6. Original & CTC of sale deed, in favour of Mrs. Musa Moti Razia W/o Muhammad Hussain regarding property measuring 01-Marla, vide registered document No. 27201 book 1, volume 5257, dated 2-12-2014, registered with sub registrar Nister Town Lahore.\n\n7. CTC of Mutation No. 45318, dated 19-05-2015 in favor of Mrs. Musa Moti Razia regarding property measuring 01-Marla.\n\n8. Original Sanction/Approval letter for residential construction vide no. 441-D (P&C)-NST/17 dated 29-04-2017 issued by the Zonal Officer Nishter Town Lahore.\n\n9. Original Approved Map of the House.\n\n10. CTC of Sale Deed in favour of Mr. Abdul Majeed S/o Abdul Rasheed, regarding said property, vide registered Document No. 9869, Book No. 01, volume No. 1108, dated 12-09-1990, registered with concerned Sub-Registrar, Lahore.\n\n11. CTC of Mutation, in favour of Mr. Abdul Majeed S/o Abdul Rasheed, regarding said property.\n\n12. Original Fard for sale, in the name of ${owner_name}, regarding property measuring ${property.area}-${property.unit}, issued by concerned Halqa Patwari, duly countersigned by concerned Revenue officers.\n\n13. Original Aks Shajra of the said property duly signed & stamped by Halqa Patwari.\n\n14. Original Moqa Naqsha of the said property, with proper dimensions & surroundings, duly signed & stamped by Halqa Patwari.\n\n15. CTC of Aks Masavi of the relevant Khasra Numbers (showing Current & Previous) of the said property\n\n16. Original N.E.C, in favour of ${owner_name}, regarding property measuring ${property.area}-${property.unit}, issued by concerned Sub-Registrar.\n\n17. Publication of widely circulated newspaper, in respect of the said sale agreement, wherein objection shall be invited if any.\n\n18. Complete Chain of documents Maximum (If Available)`,
        },
      ];
      this.afterTransactions = [
        {
          notes: `A. Sale Deed, in favour of ${name} S/o Syed Arshad Ali, regarding property measuring ${property.area} - ${property.unit}.\n\nB. Mutation in favour of ${name} S/o Syed Arshad Ali, regarding property measuring ${property.area} - ${property.unit}.\n\nC. Fard for mortgage, in favour of ${name} S/o Syed Arshad Ali, regarding property measuring ${property.area} - ${property.unit}, duly countersigned by concerned Tehsildar.\n\nD. Registered Mortgage deed, in favour of BIPL.\n\nE. Lien in revenue record, in favour of BIPL.`,
        },
      ];
      this.intro = [
        {
          name: 'Product',
          value: 'Legal Opinion I'
        },
        {
          name: 'Name of Applicant',
          value: `${name}`
        },
        {
          name: 'CNIC',
          value: `${cnic}`
        },{
          name: 'Address of Property',
          value: `${address}`
        },{
          name: 'Name of the Owner',
          value: `${owner_name}`
        },
        {
          name: 'Type of ownership',
          value: `${ownership_type}`
        },
        {
          name: 'Applicable Authority',
          value: `${authority}`
        },
      ]
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
   * Gender Selection
   *
   * @param {object} event gender object
   * @memberof PersonalInformationComponent
   */
  changeInstant(event) {
    console.log(this.personalInformationForm);
    if (this.personalInformationForm.value.is_instant) {
      this.selectedSpecialities = [
        {
          id: null,
          name: "General Phsycian",
          file: null,
        },
      ];
      this.personalInformationForm.get("speciality").clearValidators();
      this.personalInformationForm.get("speciality").updateValueAndValidity();
    } else {
      this.selectedSpecialities = [];
      this.personalInformationForm
        .get("speciality")
        .setValidators([Validators.required]);
      this.personalInformationForm.get("speciality").updateValueAndValidity();
    }
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

  // getSpecialities() {
  //   this._adminDoctorsService.getSpecialities().subscribe(
  //     (res: any) => {
  //       this.specialities = res.data;
  //     },
  //     (err: any) => {
  //       if (err && err.status === 401) {
  //         console.log(err);
  //         localStorage.removeItem("token");
  //         this._toast.error("Token Expired", "Error");
  //         this.unauthorized.emit(true);
  //       }
  //     }
  //   );
  // }

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
    // this.proceed.emit(
    //   this._adminDoctorsService.formValidation(
    //     direction,
    //     this.personalInformationForm,
    //     "personalInformation"
    //   )
    // );
  }

  // trimValidation(event) {
  //   console.log(event.target.value.replace(/  /g, ' ').trim());

  //   this.personalInformationForm.patchValue({
  //     name: event.target.value.replace(/  /g, ' ').trim()
  //   })
  // }

  setInputFilter(
    textbox: Element,
    inputFilter: (value: string) => boolean
  ): void {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function (event) {
      textbox.addEventListener(event, function (
        this: (HTMLInputElement | HTMLTextAreaElement) & {
          oldValue: string;
          oldSelectionStart: number | null;
          oldSelectionEnd: number | null;
        }
      ) {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (Object.prototype.hasOwnProperty.call(this, "oldValue")) {
          this.value = this.oldValue;
          if (
            this.oldSelectionStart !== null &&
            this.oldSelectionEnd !== null
          ) {
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          }
        } else {
          this.value = "";
        }
      });
    });
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
    this.personalInformationForm.get("password").clearValidators();
    this.personalInformationForm.get("password").updateValueAndValidity();
    this.personalInformationForm.get("image").clearValidators();
    this.personalInformationForm.get("image").updateValueAndValidity();
    console.log(this.personalInformationForm);
  }

  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      this.experiences,
      this.education,
      this.beforeTransactions,
      this.afterTransactions,
      this.intro
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}
