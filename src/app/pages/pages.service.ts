import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseApi } from "../constants/base.url";

@Injectable({
  providedIn: "root",
})
export class PagesService {
  constructor(private _http: HttpClient) {}

  registerUser = (params) => {
    let url: string = "/users/register";
    return this._http.post(baseApi + url, params);
  };

  login = (params) => {
    let url: string = "/users/login";
    return this._http.post(baseApi + url, params, {observe: 'response'});
  };

  createOrganization = (params) => {
    let url: string = "/organizations";
    return this._http.post(baseApi + url, params);
  };

  createToken = (params) => {
    let url: string = "/tokens";
    return this._http.post(baseApi + url, params);
  };
}
