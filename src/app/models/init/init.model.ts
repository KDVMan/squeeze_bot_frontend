import { QuoteIntervalModel } from '@app/models/quote/quote-interval.model';
import { SymbolLeverageTypeEnum } from '@app/enums/symbol/symbol-leverage-type.enum';

export class InitModel {
	symbol: string;
	intervals: QuoteIntervalModel[];
	quotesLimit: number;
	precision: number;
	leverageLevel: number;
	leverageType: SymbolLeverageTypeEnum;

	public static getActiveInterval(intervals: QuoteIntervalModel[]): QuoteIntervalModel {
		for (let interval of intervals) {
			if (interval.active) return interval;
		}

		return null;
	}
}
