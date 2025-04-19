import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BotHeaderDepositComponent } from '@app/components/bot/bot-header/bot-header-deposit/bot-header-deposit.component';
import { BotHeaderStartComponent } from '@app/components/bot/bot-header/bot-header-start/bot-header-start.component';

@Component({
	selector: 'app-bot-header',
	templateUrl: './bot-header.component.html',
	styleUrl: './bot-header.component.scss',
	imports: [ReactiveFormsModule, BotHeaderDepositComponent, BotHeaderStartComponent]
})
export class BotHeaderComponent {
	@Input() formGroup: FormGroup;
}
