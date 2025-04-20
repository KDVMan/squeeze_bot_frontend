import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { IntervalEnum } from '@core/enums/interval.enum';
import { BotParamModel } from '@app/models/bot/bot-param.model';
import { BotStatusEnum } from '@app/enums/bot/bot-status.enum';

export class BotModel {
	id: number;
	deposit: number;
	isReal: boolean;
	symbol: string;
	interval: IntervalEnum;
	tradeDirection: TradeDirectionEnum;
	window: number;
	prevParam: BotParamModel;
	currentParam: BotParamModel;
	nextParam: BotParamModel;
	status: BotStatusEnum;
}
