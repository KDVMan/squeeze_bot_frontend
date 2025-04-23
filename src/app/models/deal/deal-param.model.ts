import { BindEnum } from '@core/enums/bind.enum';

export class DealParamModel {
	calculatorId: number;
	bind: BindEnum;
	percentIn: number;
	percentOut: number;
	stopTime: number;
	stopPercent: number;
}
