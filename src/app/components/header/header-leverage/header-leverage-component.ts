import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { WebsocketService } from '@core/services/websocket.service';
import { WebsocketEventEnum } from '@core/enums/websocket-event.enum';
import { SymbolLeverageModel } from '@app/models/symbol/symbol-leverage.model';
import { InitService } from '@app/services/init/init.service';

@Component({
	selector: 'app-header-leverage',
	templateUrl: './header-leverage.component.html',
	styleUrl: './header-leverage.component.scss',
	standalone: true,
	imports: [CommonModule, TranslateModule]
})
export class HeaderLeverageComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private websocketService = inject(WebsocketService);
	private initService = inject(InitService);
	public leverageLevel = this.initService.model.leverageLevel;
	public leverageType = this.initService.model.leverageType;

	public ngOnInit(): void {
		this.subscription = this.websocketService.receive<SymbolLeverageModel>(WebsocketEventEnum.leverage).subscribe(result => {
			this.leverageLevel = result.level;
			this.leverageType = result.type;
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
