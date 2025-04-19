import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyValueModel } from '@core/models/key-value.model';
import { HelperService } from '@core/services/helper.service';
import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { FormSelectComponent } from '@core/components/form-select/form-select.component';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { BindEnum } from '@core/enums/bind.enum';

@Component({
	selector: 'app-bot-param',
	templateUrl: './bot-param.component.html',
	styleUrl: './bot-param.component.scss',
	imports: [
		CommonModule, ReactiveFormsModule, FormSelectComponent, FormInputNumberComponent
	]
})
export class BotParamComponent implements OnInit {
	@Input() formGroup: FormGroup;
	public directions: KeyValueModel[];
	public binds: KeyValueModel[];

	public ngOnInit(): void {
		this.directions = HelperService.convertEnumToKeyValue(TradeDirectionEnum, 'trade-direction');
		this.binds = HelperService.convertEnumToKeyValue(BindEnum);
	}
}
