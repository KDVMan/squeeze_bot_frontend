import { BindEnum } from '@core/enums/bind.enum';

export class BotParamModel {
	calculatorId: number;
	bind: BindEnum;
	percentIn: number;
	percentOut: number;
	stopTime: number;
	stopPercent: number;
	triggerStart: number;
	mustUpdate: boolean;
}
