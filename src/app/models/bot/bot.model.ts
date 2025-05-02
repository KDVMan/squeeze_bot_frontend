import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { IntervalEnum } from '@core/enums/interval.enum';
import { BotParamModel } from '@app/models/bot/bot-param.model';
import { BotStatusEnum } from '@app/enums/bot/bot-status.enum';
import { BotDealModel } from '@app/models/bot/bot-deal.model';

export class BotModel {
	id: number;
	deposit: number;
	isReal: boolean;
	symbol: string;
	interval: IntervalEnum;
	tradeDirection: TradeDirectionEnum;
	window: number;
	limitQuotes: number;
	prevParam: BotParamModel;
	currentParam: BotParamModel;
	nextParam: BotParamModel;
	status: BotStatusEnum;
	deal: BotDealModel;
	timeUpdate: number;
	secondsSinceTimeUpdate: number = 0;
}

export function calculateSecondsSinceUpdate(timeUpdate: number): number {
	return timeUpdate ? Math.floor((Date.now() - timeUpdate) / 1000) : 0;
}
