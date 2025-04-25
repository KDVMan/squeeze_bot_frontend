import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { WebsocketService } from '@core/services/websocket.service';
import { WebsocketEventEnum } from '@core/enums/websocket-event.enum';
import { UserModel } from '@app/models/user/user.model';

@Component({
	selector: 'app-header-balance',
	templateUrl: './header-balance.component.html',
	standalone: true,
	imports: [CommonModule, TranslateModule]
})
export class HeaderBalanceComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private websocketService = inject(WebsocketService);
	public balance = 0;
	public availableBalance = 0;

	public ngOnInit(): void {
		this.subscription = this.websocketService.receive<UserModel>(WebsocketEventEnum.user).subscribe(result => {
			this.balance = result.balance;
			this.availableBalance = result.availableBalance;
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
