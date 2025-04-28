import { Component, HostListener, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitService } from '@app/services/init/init.service';
import { LoadingSpinnerComponent } from '@core/components/loading-spinner/loading-spinner.component';
import { first, Subscription } from 'rxjs';
import { WebsocketService } from '@core/services/websocket.service';
import { Chart } from '@app/classes/chart/chart';
import { ChartSettingsService } from '@app/services/chart-settings/chart-settings.service';
import { QuoteTypeEnum } from '@app/enums/quote/quote-type.enum';
import { QuoteRequestModel } from '@app/models/quote/quote-request.model';
import { InitModel } from '@app/models/init/init.model';
import { QuoteService } from '@app/services/quote/quote.service';
import { QuoteResponseModel } from '@app/models/quote/quote-response.model';
import { InitSenderEnum } from '@app/enums/init/init-sender.enum';
import { InitSubjectModel } from '@app/models/init/init-subject.model';
import { ChartSettingsModel } from '@app/models/chart-settings/chart-settings.model';
import { QuoteModel } from '@app/models/quote/quote.model';
import { WebsocketEventEnum } from '@core/enums/websocket-event.enum';
import { ChartPanelComponent } from '@app/components/chart/chart-panel/chart-panel.component';
import { BotModel } from '@app/models/bot/bot.model';
import { DealModel } from '@app/models/deal/deal.model';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrl: './chart.component.scss',
	imports: [CommonModule, LoadingSpinnerComponent, ChartPanelComponent]
})
export class ChartComponent implements OnInit, OnDestroy {
	private subscriptionInit: Subscription;
	private subscriptionChartSettings: Subscription;
	private subscriptionChart: Subscription;
	private subscriptionCurrentPrice: Subscription;
	private subscriptionBot: Subscription;
	private subscriptionDeal: Subscription;
	private renderer = inject(Renderer2);
	private initService = inject(InitService);
	private chartSettingsService = inject(ChartSettingsService);
	private quoteService = inject(QuoteService);
	private websocketService = inject(WebsocketService);
	private chart: Chart;
	public loaded: boolean = false;

	public ngOnInit(): void {
		this.chart = new Chart(this.renderer.selectRootElement('canvas', true));
		this.chart.updateSettings(this.chartSettingsService.model);

		this.loadQuotes(0, QuoteTypeEnum.init);

		this.subscriptionInit = this.initService.updateSubject.subscribe((response: InitSubjectModel) => {
			if (response.senders.some(x => x === InitSenderEnum.symbol || x === InitSenderEnum.interval)) {
				this.loaded = false;
				this.loadQuotes(0, QuoteTypeEnum.init, response.params?.['yRescale'] ?? true);
			}
		});

		this.subscriptionChartSettings = this.chartSettingsService.updateSubject.subscribe((response: ChartSettingsModel) => {
			this.chart.updateSettings(response, true);
		});

		this.subscriptionChart = this.chart.loadSubject.subscribe((time: number) => {
			this.loadMoreQuotes(time);
		});

		this.subscriptionCurrentPrice = this.websocketService.receive<QuoteModel>(WebsocketEventEnum.currentPrice).subscribe((response: QuoteModel) => {
			if (this.chart && this.chart.loadQuoteService) this.chart.loadQuoteService.updateCurrent(response);
		});

		this.subscriptionBot = this.websocketService.receive<BotModel>(WebsocketEventEnum.bot).subscribe(response => {
			if (this.chart && response.id === this.initService.model.botID) {
				this.chart.updateBot(response);
			}
		});

		this.subscriptionDeal = this.websocketService.receive<DealModel>(WebsocketEventEnum.deal).subscribe(response => {
			this.chart.updateDeal(response);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscriptionInit) this.subscriptionInit.unsubscribe();
		if (this.subscriptionChartSettings) this.subscriptionChartSettings.unsubscribe();
		if (this.subscriptionChart) this.subscriptionChart.unsubscribe();
		if (this.subscriptionCurrentPrice) this.subscriptionCurrentPrice.unsubscribe();
		if (this.subscriptionBot) this.subscriptionBot.unsubscribe();
		if (this.subscriptionDeal) this.subscriptionDeal.unsubscribe();
	}

	private loadQuotes(timeEnd: number, type: QuoteTypeEnum, yRescale: boolean = true): void {
		const request: QuoteRequestModel = {
			botID: type === QuoteTypeEnum.init ? this.initService.model.botID : 0,
			symbol: this.initService.model.symbol,
			interval: InitModel.getActiveInterval(this.initService.model.intervals).name,
			quotesLimit: this.initService.model.quotesLimit,
			timeEnd: timeEnd,
			type: type
		};

		this.quoteService.load(request)
			.pipe(first())
			.subscribe((response: QuoteResponseModel) => {
				if (type === QuoteTypeEnum.load) {
					this.chart.loadQuoteService.update(
						response.quotes,
						timeEnd
					);
				} else {
					this.chart.init({
						initModel: this.initService.model,
						quotes: response.quotes,
						timeFrom: response.timeFrom,
						timeTo: response.timeTo,
						xRescale: true,
						yRescale: yRescale,
					});
				}

				if (type == QuoteTypeEnum.init) {
					this.chart.updateDeals(response.bot, response.deals);
				}

				this.loaded = true;
			});
	}

	private loadMoreQuotes(time: number): void {
		this.loadQuotes(time, QuoteTypeEnum.load);
	}

	public mouseEvent(eventName: string, event: MouseEvent): void {
		if (this.loaded) this.chart.mouseEvent(eventName, event);
	}

	@HostListener('document:keydown.escape', ['$event'])
	private keyboardEvent(event: KeyboardEvent): void {
		if (this.loaded) this.chart.keyboardEvent(event);
	}
}
