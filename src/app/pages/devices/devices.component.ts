import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PatientService } from "src/app/admin/patients/patient.service";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"],
})
export class DevicesComponent implements OnInit {
  public tableConstructor = {
    headers: ["Name", "Hostname", "Location", "Organization", "Status"],
    rows: [
      {
        name: "opnsense_a",
        connection_status: "Pending",
        hostName: "OPNsense.localdomain",
        location: "192.168.100.10",
        organization: "	SDWAN Service",
        status: "danger",
      },
      {
        name: "opnsense_b",
        connection_status: "Pending",
        hostName: "OPNsense.localdomain",
        location: "192.168.100.10",
        organization: "	SDWAN Service",
        status: "warning",
      },
    ],
    table: "Devices",
    showActions: true,
    showCheckboxes: true,
  };
  public loading: boolean = false;
  constructor(
    private _patientsService: PatientService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  deleteEmitter(event) {
    console.log(event);
    // if (event) {
    //   this.loading = true;
    //   this._patientsService.deletePatient(event.id).subscribe(
    //     (res: any) => {
    //       this.loading = false;
    //       console.log(res);
    //       this.tableConstructor.rows = this.tableConstructor.rows.filter(
    //         (e) => e.id !== event.id
    //       );
    //       this._toast.success("Patient deleted successfully", "Success");
    //     },
    //     (err: any) => {
    //       this.loading = false;
    //       console.log(err);
    //       if (err && err.status === 401) {
    //         this._router.navigate(["/"]);
    //         localStorage.clear();
    //         this._toast.error("Token Expired", "Error");
    //       } else {
    //         this._toast.error(err.error.message, "Error");
    //       }
    //     }
    //   );
    // }
  }

  editEmitter(event) {
    localStorage.setItem("selectedPatient", JSON.stringify(event));
    this._router.navigate(["admin/patients/edit-patient"]);
  }

  getPatients() {
    this.loading = true;
    this._patientsService.getPatients().subscribe(
      (res: any) => {
        this.loading = false;
        this.tableConstructor.rows = res.data;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }
}
