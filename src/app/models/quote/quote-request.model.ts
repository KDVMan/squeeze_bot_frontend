import { QuoteTypeEnum } from '@app/enums/quote/quote-type.enum';

export interface QuoteRequestModel {
	botID: number;
	symbol: string;
	interval: string;
	quotesLimit: number;
	timeEnd: number;
	type: QuoteTypeEnum;
}
