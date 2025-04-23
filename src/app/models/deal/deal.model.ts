import { DealParamModel } from '@app/models/deal/deal-param.model';

export class DealModel {
	id: number;
	botID: number;
	isReal: boolean;
	timeIn: number;
	timeOut: number;
	priceIn: number;
	amountIn: number;
	priceOut: number;
	amountOut: number;
	isStopTime: boolean;
	isStopPercent: boolean;
	profitPercent: number;
	param: DealParamModel;
}
