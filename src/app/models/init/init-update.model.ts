import { QuoteIntervalModel } from '@app/models/quote/quote-interval.model';
import { BotSortEnum } from '@app/enums/bot/bot-sort.enum';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';

export interface InitUpdateModel {
	botID?: number;
	symbol?: string;
	interval?: QuoteIntervalModel;
	botSortColumn?: BotSortEnum;
	botSortDirection?: SortDirectionEnum;
}
