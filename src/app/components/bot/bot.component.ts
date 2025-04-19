import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { greaterThanZeroValidator } from '@core/validators/greated-than-zero.validator';
import { BotHeaderComponent } from '@app/components/bot/bot-header/bot-header.component';
import { BotParamComponent } from '@app/components/bot/bot-param/bot-param.component';

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
export class BotComponent implements OnInit {
	private readonly formBuilder = inject(FormBuilder);
	public formGroup: FormGroup;

	public ngOnInit(): void {
		this.createForm();
	}

	private createForm(): void {
		this.formGroup = this.formBuilder.group({
			deposit: [0, [Validators.required, greaterThanZeroValidator(true)]],
			isReal: [false, Validators.required],
			tradeDirection: ['', Validators.required],
			bind: ['', Validators.required],
			percentIn: ['', [Validators.required, greaterThanZeroValidator(false)]],
			percentOut: ['', [Validators.required, greaterThanZeroValidator(false)]],
			stopTime: ['', [Validators.required, greaterThanZeroValidator(true)]],
			stopPercent: ['', [Validators.required, greaterThanZeroValidator(true)]]
		});
	}
}
