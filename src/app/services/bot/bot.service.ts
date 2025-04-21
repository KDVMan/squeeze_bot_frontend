import { inject, Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BotStatusRequestModel } from '@app/models/bot/bot-status-request.model';
import { BotAddRequestModel } from '@app/models/bot/bot-add-request.model';

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

	public status(request: BotStatusRequestModel): Observable<void> {
		return this.httpService.post<BotStatusRequestModel, void>('bot/status', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}
}
