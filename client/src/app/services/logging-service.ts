import {Injectable} from '@angular/core';
import {LogInFormData} from "../interfaces/LogInFormData";
import {UserService} from "./user-service";
import {environment} from "../../environments/environment";
import {
  RefreshTokenRequest,
  GetTokenRequest
} from "../interfaces/ServiceModels/TokenModels";
import {RegistrationModel} from "../interfaces/ServiceModels/AccountModels";
import {MessageKey} from "../consts/MessageKey";
import {IMessageSender, MessageSender} from "../interfaces/Message";
import {SignUpFormData} from "../interfaces/SignUpFormData";

@Injectable()
export class LoggingService implements IMessageSender{

  public errors: any = [];

  private _refreshingToken: string = '';
  private _timer: any;

  constructor(
    private _userService: UserService,
    public messageSender: MessageSender
  ) {
  }

  public async logIn(formData: LogInFormData) {
    const model: GetTokenRequest = {
      email: formData.login,
      password: formData.password
    };
    return new Promise((resolve, reject) => {
      this._userService.loginRequest(model)
        .then(data => {
          // @ts-ignore
          this.updateData(data.access, data.refresh);
          resolve(true);
        })
        .catch(err => {
          this.errors = err.error;
          this.logOut();
          resolve(false);
        });
    });
  }

  public async signUp(formData: SignUpFormData) {
    const model: RegistrationModel = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName
    };
    return new Promise((resolve, reject) => {
      this._userService.signUpRequest(model)
        .then(data => {
          // @ts-ignore
          this.logIn({login: formData.email, password: formData.password});
          resolve(true);
        })
        .catch(err => {
          this.errors = err.error;
          resolve(false);
        });
    });
  }

  public async logOut() {
    delete localStorage.token;
    clearTimeout(this._timer);
    this.sendTokenMessage('');
    this.messageSender.clearMessages();
  }

  private async refreshToken() {
    const model: RefreshTokenRequest = {
      refresh: this._refreshingToken
    };
    this._userService.refreshTokenRequest(model);
    return new Promise((resolve, reject) => {
      this._userService.refreshTokenRequest(model)
        // @ts-ignore
        .then((data: GetTokenResponse) => {
          this.updateData(data.access);
          resolve(true);
        })
        .catch(resp => {
          this.errors = resp.error;
          this.logOut();
          resolve(false);
        });
    });
  }

  private updateData(accessToken: string, refreshingToken?: string) {
    localStorage.token = accessToken;
    if (refreshingToken) {
      this._refreshingToken = refreshingToken;
    }
    this.errors = [];
    this.sendTokenMessage(accessToken);
    this._timer = setTimeout(this.refreshToken, environment.tokenRefreshingRate * 60 * 1000);
  }

  sendTokenMessage(token: any) {
    this.messageSender.send(MessageKey.Token, token);
  }
}
