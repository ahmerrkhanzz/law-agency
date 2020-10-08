import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-legal-opinion',
  templateUrl: './legal-opinion.component.html',
  styleUrls: ['./legal-opinion.component.scss']
})
export class LegalOpinionComponent implements OnInit {

  constructor(private _modalService: NgbModal) {}

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

}
