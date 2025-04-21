import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { BindEnum } from '@core/enums/bind.enum';

export class BotAddRequestModel {
	deposit: number;
	isReal: boolean;
	symbol: string;
	interval: string;
	tradeDirection: TradeDirectionEnum;
	bind: BindEnum[];
	percentIn: number;
	percentOut: number;
	stopTime: number;
	stopPercent: number;
	limitQuotes: number;
}
