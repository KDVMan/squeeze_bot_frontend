import { inject, Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BotStartRequestModel } from '@app/models/bot/bot-start-request.model';
import { BotStatusRequestModel } from '@app/models/bot/bot-status-request.model';

@Injectable({
	providedIn: 'root'
})
export class BotService {
	private readonly httpService = inject(HttpService);

	public start(request: BotStartRequestModel): Observable<void> {
		return this.httpService.post<BotStartRequestModel, void>('bot/start', request).pipe(
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
