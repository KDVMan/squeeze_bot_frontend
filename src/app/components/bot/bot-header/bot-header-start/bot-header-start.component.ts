import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InitService } from '@app/services/init/init.service';
import { first } from 'rxjs';
import { BotService } from '@app/services/bot/bot.service';
import { InitModel } from '@app/models/init/init.model';
import { BotAddRequestModel } from '@app/models/bot/bot-add-request.model';

@Component({
	selector: 'app-bot-header-start',
	templateUrl: './bot-header-start.component.html',
	styleUrl: './bot-header-start.component.scss',
	standalone: true
})
export class BotHeaderStartComponent {
	@Input() formGroup: FormGroup;
	private readonly initService = inject(InitService);
	private readonly botService = inject(BotService);

	public onClick(): void {
		const request: BotAddRequestModel = {
			deposit: Number(this.formGroup.get('deposit').value),
			isReal: this.formGroup.get('isReal').value,
			symbol: this.initService.model.symbol,
			interval: InitModel.getActiveInterval(this.initService.model.intervals).name,
			tradeDirection: this.formGroup.get('tradeDirection').value,
			bind: this.formGroup.get('bind').value,
			percentIn: Number(this.formGroup.get('percentIn').value),
			percentOut: Number(this.formGroup.get('percentOut').value),
			stopTime: Number(this.formGroup.get('stopTime').value),
			stopPercent: Number(this.formGroup.get('stopPercent').value),
			triggerStart: Number(this.formGroup.get('triggerStart').value),
			limitQuotes: 1
		};

		this.botService.add(request)
			.pipe(first())
			.subscribe();
	}
}
