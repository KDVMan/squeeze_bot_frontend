import { QuoteIntervalModel } from '@app/models/quote/quote-interval.model';

export interface InitUpdateModel {
	symbol?: string;
	interval?: QuoteIntervalModel;
}
