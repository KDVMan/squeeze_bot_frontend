import { forkJoin, of, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { InitService } from '@app/services/init/init.service';
import { InitVariableService } from '@app/services/init/init-variable.service';
import { SymbolListService } from '@app/services/symbol-list/symbol-list.service';
import { ChartSettingsService } from '@app/services/chart-settings/chart-settings.service';

export const appGuard = () => {
	const initService = inject(InitService);
	const initVariableService = inject(InitVariableService);
	const chartSettingsService = inject(ChartSettingsService);
	const symbolListService = inject(SymbolListService);

	return forkJoin({
		init: initService.load(),
		initVariable: initVariableService.load(),
		chartSettings: chartSettingsService.load(),
		symbolList: symbolListService.load(),
	}).pipe(
		tap(({chartSettings}) => {
			chartSettingsService.init(chartSettings);
		}),
		switchMap(() => of(true)),
		catchError(() => of(false))
	);
};
