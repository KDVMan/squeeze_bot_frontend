import { inject, Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BotAddRequestModel } from '@app/models/bot/bot-add-request.model';
import { BotUpdateStatusRequestModel } from '@app/models/bot/bot-update-status-request.model';
import { BotActionRequestModel } from '@app/models/bot/bot-action-request.model';

@Injectable({
	providedIn: 'root'
})
export class BotService {
	private readonly httpService = inject(HttpService);

	public add(request: BotAddRequestModel): Observable<void> {
		return this.httpService.post<BotAddRequestModel, void>('bot/add', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public updateStatus(request: BotUpdateStatusRequestModel): Observable<void> {
		return this.httpService.post<BotUpdateStatusRequestModel, void>('bot/update_status', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public action(request: BotActionRequestModel): Observable<void> {
		return this.httpService.post<BotActionRequestModel, void>('bot/action', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}
}
