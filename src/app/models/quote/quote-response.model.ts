import { QuoteModel } from '@app/models/quote/quote.model';
import { DealModel } from '@app/models/deal/deal.model';
import { BotModel } from '@app/models/bot/bot.model';

export interface QuoteResponseModel {
	quotes: QuoteModel[];
	timeFrom: number;
	timeTo: number;
	bot: BotModel;
	deals: DealModel[];
}
