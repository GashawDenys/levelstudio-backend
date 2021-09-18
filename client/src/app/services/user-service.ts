import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {RefreshTokenRequest, GetTokenRequest, GetTokenResponse} from "../interfaces/ServiceModels/TokenModels";
import {HttpClient} from "./Clients/HttpClient";

@Injectable()
export class UserService {

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  public async loginRequest(user: GetTokenRequest) {
    return this.http.postRequest(`${environment.baseServerUrl}/token/`, JSON.stringify(user), this.httpOptions);
  }

  public async refreshTokenRequest(refreshToken: RefreshTokenRequest) {
    return this.http.postRequest(`${environment.baseServerUrl}/token/refresh/`, JSON.stringify({token: refreshToken}), this.httpOptions);
  }
}
