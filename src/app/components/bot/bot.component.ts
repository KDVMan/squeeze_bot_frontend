import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { greaterThanZeroValidator } from '@core/validators/greated-than-zero.validator';
import { BotHeaderComponent } from '@app/components/bot/bot-header/bot-header.component';
import { BotParamComponent } from '@app/components/bot/bot-param/bot-param.component';
import { InitService } from '@app/services/init/init.service';
import { Subscription } from 'rxjs';
import { BotModel } from '@app/models/bot/bot.model';
import { WebsocketEventEnum } from '@core/enums/websocket-event.enum';
import { WebsocketService } from '@core/services/websocket.service';
import { leastOneFieldValidator } from '@core/validators/least-one-field.validator';
import { lessThanOrZeroValidator } from '@core/validators/less-than-or-zero.validator';

@Component({
	selector: 'app-bot',
	templateUrl: './bot.component.html',
	styleUrl: './bot.component.scss',
	imports: [
		CommonModule,
		BotHeaderComponent,
		BotParamComponent
	]
})
export class BotComponent implements OnInit, OnDestroy {
	private readonly formBuilder = inject(FormBuilder);
	private readonly websocketService = inject(WebsocketService);
	private readonly initService = inject(InitService);
	private subscriptionBot: Subscription;
	public formGroup: FormGroup;

	public ngOnInit(): void {
		this.createForm();

		this.subscriptionBot = this.websocketService.receive<BotModel[]>(WebsocketEventEnum.botList).subscribe(results => {
			const bot = results.find(x => x.id === this.initService.model.botID);

			if (bot) {
				this.formGroup.patchValue({
					isReal: bot.isReal,
					tradeDirection: bot.tradeDirection,
					bind: bot.currentParam.bind,
					percentIn: bot.currentParam.percentIn,
					percentOut: bot.currentParam.percentOut,
					stopTime: bot.currentParam.stopTime,
					stopPercent: bot.currentParam.stopPercent,
					triggerStart: bot.currentParam.triggerStart
				});
			}
		});
	}

	public ngOnDestroy(): void {
		if (this.subscriptionBot) this.subscriptionBot.unsubscribe();
	}

	private createForm(): void {
		this.formGroup = this.formBuilder.group({
			deposit: [0, [Validators.required, greaterThanZeroValidator(true)]],
			isReal: [false, Validators.required],
			tradeDirection: ['', Validators.required],
			bind: ['', Validators.required],
			percentIn: ['', [Validators.required, greaterThanZeroValidator(false)]],
			percentOut: ['', [Validators.required, greaterThanZeroValidator(false)]],
			stopTime: [0, [Validators.required, greaterThanZeroValidator(true)]],
			stopPercent: [0, [Validators.required, greaterThanZeroValidator(true)]],
			triggerStart: [0, [Validators.required, greaterThanZeroValidator(true), lessThanOrZeroValidator('percentIn')]]
		}, {validators: leastOneFieldValidator(['stopTime', 'stopPercent'])});
	}
}
