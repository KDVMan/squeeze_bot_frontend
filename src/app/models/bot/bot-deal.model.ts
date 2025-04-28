import { BotDealStatusEnum } from '@app/enums/bot/bot-deal-status.enum';

export class BotDealModel {
	timeIn: number;
	timeOut: number;
	priceIn: number;
	amountIn: number;
	priceOut: number;
	amountOut: number;
	isStopTime: boolean;
	isStopPercent: boolean;
	status: BotDealStatusEnum;
	preparationPriceIn: number;
	preparationPriceOut: number;
	preparationPriceStop: number;
	preparationTimeOut: number;
}
