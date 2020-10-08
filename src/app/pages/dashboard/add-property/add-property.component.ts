import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.scss"],
})
export class AddPropertyComponent implements OnInit {
  @Input() item: any;
  @Input() title: string;
  public name: string = "";
  public city: string = "";
  public loading: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.item);
    if (this.item) {
      this.name = this.item.name;
      this.city = this.item.city;
    }
  }

  close(params) {
    this.activeModal.close(params);
  }

  addProperty() {
    this.loading = true;
    const params = {
      name: this.name,
      city: this.city,
    };
    this.close(params);
    console.log(params);
    // if (this.item) {
    //   this._adminDoctorsService
    //     .updateSpeciality(params, this.item.id)
    //     .subscribe(
    //       (res: any) => {
    //         this.loading = false;
    //         this.close(params);
    //         this._toast.success("Speciality successfully updated", "Success");
    //       },
    //       (err: any) => {
    //         this.loading = false;
    //         console.log(err);
    //         this._toast.error(err.error.message, "Error");
    //       }
    //     );
    // } else {
    //   this._adminDoctorsService.addSpeciality(params).subscribe(
    //     (res: any) => {
    //       this.loading = false;
    //       this.close(params);
    //       this._toast.success("Speciality successfully added", "Success");
    //     },
    //     (err: any) => {
    //       this.loading = false;
    //       console.log(err);
    //       this._toast.error(err.error.message, "Error");
    //     }
    //   );
    // }
  }
}
