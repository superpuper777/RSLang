import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpOptions } from '../models/http-options.model';
import { CallbackObject } from '../models/callback-object.model';
import { HttpAction } from '../types/http-action.type';

export abstract class BaseActionService {
  constructor(private httpClient: HttpClient) {}

  sendAction(method: HttpAction, path: string, callbackObject?: CallbackObject, options?: HttpOptions): void {
    this.httpClient.request(method, path, options).subscribe(
      (value: unknown) => {
        if (callbackObject && callbackObject.onSuccess) {
          callbackObject.onSuccess(value);
        }
      },
      (err: HttpErrorResponse) => {
        if (callbackObject && callbackObject.onError) {
          callbackObject.onError(err);
        } else {
          throw new Error(err.name);
        }
      },
      () => {
        if (callbackObject && callbackObject.onComplete) {
          callbackObject.onComplete();
        }
      },
    );
  }
}
