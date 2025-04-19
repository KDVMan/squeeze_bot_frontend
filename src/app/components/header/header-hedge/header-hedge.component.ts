import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { WebsocketService } from '@core/services/websocket.service';
import { WebsocketEventEnum } from '@core/enums/websocket-event.enum';
import { UserModel } from '@app/models/user/user.model';

@Component({
	selector: 'app-header-hedge',
	templateUrl: './header-hedge.component.html',
	styleUrl: './header-hedge.component.scss',
	standalone: true,
	imports: [CommonModule, TranslateModule]
})
export class HeaderHedgeComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private websocketService = inject(WebsocketService);
	public hedge = false;

	public ngOnInit(): void {
		this.subscription = this.websocketService.receive<UserModel>(WebsocketEventEnum.user).subscribe(result => {
			this.hedge = result.hedge;
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}

	public onClick(): void {
	}
}
