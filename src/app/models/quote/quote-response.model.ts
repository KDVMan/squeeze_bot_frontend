import { QuoteModel } from '@app/models/quote/quote.model';

export interface QuoteResponseModel {
	quotes: QuoteModel[];
	timeFrom: number;
	timeTo: number;
	// deals: CalculateDealModel[];
}
