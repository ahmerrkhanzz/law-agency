import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  textValidator,
  numericValidator,
  removeDuplicates,
} from 'src/app/shared/globalfunctions';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { GCCertificateCreator } from '../list-of-documents-ii/gc_certificate';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss'],
})
export class GeneralInformationComponent implements OnInit {
  // @Input() selectedTab: any;

  public selectedTabAlter: any;
  @Input() set selectedTab(value: any) {
    this.selectedTabAlter = value;
    console.log(value);

    // this.updatePeriodTypes();
  }
  // get selectedTab(): boolean {
  //   return this._allowDay;
  // }

  @Input() savedForm: any;
  @Output() unauthorized = new EventEmitter<boolean>(false);
  @Output() proceed = new EventEmitter<object>(null);
  @ViewChild('avatar') avatar: ElementRef;

  public languages = [];
  public specialities: any[] = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public profileImg: File;
  public dob: any;
  public preview: string =
    '../../../../../assets/images/doctor-placeholder.jpg';
  public personalInformationForm: FormGroup;
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public selectedDoctor: any = {};
  public selectedLanguages: any[] = [];
  public selectedSpecialities: any[] = [
    {
      id: null,
      name: 'General Phsycian',
      file: null,
    },
  ];
  public minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  public beforeTransactions = [];
  public afterTransactions = [];
  public intro = [];

  // formatter = (cities: City) => cities.name;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) {}

  ngOnInit() {
    this.languages = [
      { id: 1, name: 'English' },
      { id: 2, name: 'Urdu' },
      { id: 3, name: 'Turkish' },
      { id: 4, name: 'German' },
      { id: 5, name: 'Arabic' },
      { id: 6, name: 'Spanish' },
      { id: 7, name: 'Portugeese' },
    ];

    this.selectedItems = [
      { id: 3, name: 'Pune' },
      { id: 4, name: 'Navsari' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };

    this.personalInformationForm = this.formBuilder.group({
      property: this.formBuilder.group({
        area: ['', [Validators.required]],
        unit: ['Marla', [Validators.required]],
      }),
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      cnic: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.maxLength(13),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      co_applicant_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      co_applicant_cnic: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.maxLength(13),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(40),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      owner_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      ownership_type: ['Sole', [Validators.required]],
      authority: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
    });

    if (localStorage.hasOwnProperty('savedForm')) {
      console.log(JSON.parse(localStorage.getItem('savedForm')));
      this.patchFormValues(JSON.parse(localStorage.getItem('savedForm')));
    }
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
    return this.personalInformationForm['controls'];
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
    console.log(this.personalInformationForm);
    if (this.selectedTabAlter.id === 3) {
      this.download();
    } else {
      this.proceed.emit(
        this.formValidation(
          direction,
          this.personalInformationForm,
          'personalInformation'
        )
      );
    }
  }

  public download(): void {
    const {
      name,
      cnic,
      co_applicant_name,
      co_applicant_cnic,
      owner_name,
      ownership_type,
      authority,
      address,
      property,
    } = this.personalInformationForm.value;
    this.beforeTransactions = [
      {
        notes: `We write with the reference to the above mention, we have verified Transfer Letter vide Ref. No. 02/02754, dated 15-05-2019, of house/plot no. ${address}, measuring ${property.area} - ${property.unit}, in favour of ${name}, situated at phase=II & issued by The Defence Housing Authority (DHA), Lahore \n\n The said Transfer Letter is issued by the Defence Housing Authority (DHA), Lahore & is placed in its record. \n\n `,
      },
    ];

    this.intro = [
      {
        name: 'Sub :-',
        value: `CONFIRMATION CERTIFICATE REGARDING TRANSFER LETTER VIDE REF. NO. 02/02754, DATED 15-05-2019, OF ${address}, MEASURING ${property.area}-${property.unit}, in favour of ${name} SITUATED AT PHASE II & ISSUED BY THE DEFENCE HOUSING AUTHORITY (DHA), LAHORE`,
      },
    ];

    const documentCreator = new GCCertificateCreator();
    const doc = documentCreator.create([this.beforeTransactions, this.intro]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, 'gc-certificate.docx');
      console.log('Document created successfully');
    });
  }

  public formValidation(direction, form, name?) {
    if (form.status.toLowerCase() === 'invalid') {
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
      address,
      authority,
      cnic,
      co_applicant_cnic,
      co_applicant_name,
      name,
      owner_name,
      ownership_type,
      property,
    } = data;
    this.personalInformationForm.patchValue({
      address,
      authority,
      cnic,
      co_applicant_cnic,
      co_applicant_name,
      name,
      owner_name,
      ownership_type,
      property,
    });
    console.log(this.personalInformationForm);
  }
}
