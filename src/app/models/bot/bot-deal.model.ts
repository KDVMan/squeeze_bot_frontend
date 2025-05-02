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
	secondsUntilTimeout?: number;
}

export function calculateSecondsLeft(timestamp: number): number {
	if (!timestamp) return 0;

	const now = Date.now();
	return Math.max(0, Math.floor((timestamp - now) / 1000));
}
