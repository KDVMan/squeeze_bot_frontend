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
	calculatePriceIn: number;
	calculateTimeOut: number;
	calculatePriceOut: number;
	calculatePriceStop: number;
	status: BotDealStatusEnum;
}
