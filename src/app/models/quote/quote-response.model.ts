import { QuoteModel } from '@app/models/quote/quote.model';
import { DealModel } from '@app/models/deal/deal.model';

export interface QuoteResponseModel {
	quotes: QuoteModel[];
	timeFrom: number;
	timeTo: number;
	deals: DealModel[];
}
