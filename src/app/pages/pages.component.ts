import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  public show: boolean = false;
  constructor(private _router: Router) {}

  ngOnInit(): void {}

}
