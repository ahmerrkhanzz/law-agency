import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { baseApi } from "../constants/base.url";

@Injectable({
  providedIn: "root",
})
export class PagesService {
  constructor(
    private _http: HttpClient,
    public afAuth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {}

  registerUser = (params) => {
    let url: string = "/users/register";
    return this._http.post(baseApi + url, params);
  };

  // login = (params) => {
  //   let url: string = "/users/login";
  //   return this._http.post(baseApi + url, params, {observe: 'response'});
  // };

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getUserProfile(uid) {
    return this._firestore.collection("users").doc(uid).valueChanges();
  }

  createOrganization = (params) => {
    let url: string = "/organizations";
    return this._http.post(baseApi + url, params);
  };

  createToken = (params) => {
    let url: string = "/tokens";
    return this._http.post(baseApi + url, params);
  };
}
