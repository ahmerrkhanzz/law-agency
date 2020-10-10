import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-legal-opinion',
  templateUrl: './legal-opinion.component.html',
  styleUrls: ['./legal-opinion.component.scss']
})
export class LegalOpinionComponent implements OnInit {
  public isPurchase: boolean = false;
  public property: string = ""
  constructor(private _modalService: NgbModal, private _router: Router) { }

ngOnInit(): void {}

addProperty() {
  const modalRef = this._modalService.open(AddPropertyComponent, {
    size: "md",
  });
  modalRef.result.then((result) => {
    if (result) {
      console.log(result);
    }
  });
  modalRef.componentInstance.title = "Property";
}

changePropertyType(event) {
  this.isPurchase = !this.isPurchase
}

submitProperty() {
  this._router.navigate(['/pages/dashboard/legal-opinion'])
}

}
