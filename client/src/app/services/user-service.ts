import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {RefreshTokenRequest, GetTokenRequest} from "../interfaces/ServiceModels/TokenModels";

@Injectable()
export class UserService {

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
  }

  public async loginRequest(user: GetTokenRequest) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseServerUrl}/api/token`, JSON.stringify(user), this.httpOptions).subscribe(resolve, reject);
    });
    /*return new Promise((resolve, reject) => {
      this.http.post(`/api/token`, JSON.stringify(user), this.httpOptions).subscribe(resolve, reject);
    });*/
  }

  public async refreshTokenRequest(refreshToken: RefreshTokenRequest) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseServerUrl}/api/token/refresh/`, JSON.stringify({token: refreshToken}), this.httpOptions)
        .subscribe(resolve, reject);
    });
  }
}
