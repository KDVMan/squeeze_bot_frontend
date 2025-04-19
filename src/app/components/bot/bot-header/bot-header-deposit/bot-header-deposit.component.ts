import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-bot-header-deposit',
	templateUrl: './bot-header-deposit.component.html',
	imports: [FormInputNumberComponent, SvgIconComponent, NgbTooltip]
})
export class BotHeaderDepositComponent {
	@Input() formGroup: FormGroup;

	public onToggle(): void {
		this.formGroup.get('isReal').setValue(!this.formGroup.get('isReal').value, {emitEvent: false});
	}
}
