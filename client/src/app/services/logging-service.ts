import {Injectable} from '@angular/core';
import {LogInFormData} from "../interfaces/LogInFormData";
import {UserService} from "./user-service";
import {environment} from "../../environments/environment";
import {RefreshTokenRequest, GetTokenRequest} from "../interfaces/ServiceModels/TokenModels";
import {MessageService} from "./message-service";
import {MessageConst} from "../consts/MessageConst";

@Injectable()
export class LoggingService {

  public token: string | null = null;

  public errors: any = [];

  private _refreshingToken: string = '';

  private _timer: any;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService
  ) {
  }

  public async login(formData: LogInFormData) {
    const model: GetTokenRequest = {
      email: formData.login,
      password: formData.password
    };
    return new Promise((resolve, reject) => {
      this._userService.loginRequest(model)
        .then(data => {
          // @ts-ignore
          this.updateData(data['access'], data['refresh']);
          resolve(true);
        })
        .catch(err => {
          this.errors = err['error'];
          this.logout();
          resolve(false);
        });
    });
  }

  public async logout() {
    this.token = null;
    clearTimeout(this._timer);
    this._messageService.clearMessages();
  }

  private async refreshToken() {
    const model: RefreshTokenRequest = {
      refresh: this._refreshingToken
    };
    this._userService.refreshTokenRequest(model);
    return new Promise((resolve, reject) => {
      this._userService.refreshTokenRequest(model)
        .then(data => {
          // @ts-ignore
          this.updateData(data['access']);
          resolve(true);
        })
        .catch(err => {
          this.errors = err['error'];
          this.logout();
          resolve(false);
        });
    });
  }

  private updateData(accessToken: string, refreshingToken: string) {
    this.token = accessToken;
    if (refreshingToken) {
      this._refreshingToken = refreshingToken;
    }
    this.errors = [];
    this.sendTokenMessage(accessToken);
    this._timer = setTimeout(this.refreshToken, environment.tokenRefreshingRate * 60 * 1000);
  }

  sendTokenMessage(token: any) {
    this._messageService.send({key: MessageConst.Token, value: token});
  }
}
