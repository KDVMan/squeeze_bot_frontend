import { SymbolLeverageTypeEnum } from '@app/enums/symbol/symbol-leverage-type.enum';

export interface SymbolLeverageModel {
	level: number;
	type: SymbolLeverageTypeEnum;
}
