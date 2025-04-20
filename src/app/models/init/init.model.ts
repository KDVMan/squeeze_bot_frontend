import { QuoteIntervalModel } from '@app/models/quote/quote-interval.model';
import { SymbolLeverageTypeEnum } from '@app/enums/symbol/symbol-leverage-type.enum';
import { BotSortEnum } from '@app/enums/bot/bot-sort.enum';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';

export class InitModel {
	symbol: string;
	intervals: QuoteIntervalModel[];
	quotesLimit: number;
	precision: number;
	leverageLevel: number;
	leverageType: SymbolLeverageTypeEnum;
	botID: number;
	botSortColumn: BotSortEnum;
	botSortDirection: SortDirectionEnum;

	public static getActiveInterval(intervals: QuoteIntervalModel[]): QuoteIntervalModel {
		for (let interval of intervals) {
			if (interval.active) return interval;
		}

		return null;
	}
}
