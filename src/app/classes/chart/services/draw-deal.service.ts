import { Chart } from '@app/classes/chart/chart';
import { DrawFigureService } from '@app/classes/chart/services/draw-figure.service';
import { TradeActionEnum } from '@app/core/enums/trade-action.enum';
import { DealModel } from '@app/models/deal/deal.model';

export class DrawDealService {
	constructor(private chart: Chart) {
	}

	public draw(): void {
		for (const deal of this.chart.deals) {
			this.drawDeal(deal);
		}
	}

	private drawDeal(deal: DealModel): void {
		const roundedTimeIn = Math.floor(deal.timeIn / this.chart.currentIntervalMilliseconds) * this.chart.currentIntervalMilliseconds;
		const roundedTimeOut = Math.floor(deal.timeOut / this.chart.currentIntervalMilliseconds) * this.chart.currentIntervalMilliseconds;

		const openX = this.chart.rangeService.x.coordinateBetweenMinMax(roundedTimeIn);
		const openY = this.chart.rangeService.y.coordinateBetweenMinMax(deal.priceIn);
		const closeX = this.chart.rangeService.x.coordinateBetweenMinMax(roundedTimeOut);
		const closeY = this.chart.rangeService.y.coordinateBetweenMinMax(deal.priceOut);

		if (this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].active) {
			DrawFigureService.draw(
				this.chart.context,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].figure,
				openX,
				openY,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].width,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].height,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].thickness,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].color,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].direction
			);
		}

		if (this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.open].active) {
			DrawFigureService.drawBorder(
				this.chart.context,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].figure,
				openX,
				openY,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].width,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].height,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].thickness,
				this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.open].thickness,
				this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.open].color,
				this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].direction
			);
		}

		if (deal.timeOut) {
			if (deal.isStopPercent || deal.isStopTime) {
				if (this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].active) {
					DrawFigureService.draw(
						this.chart.context,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].figure,
						closeX,
						closeY,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].width,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].height,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].thickness,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].color,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].direction
					);
				}

				if (this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.stop].active) {
					DrawFigureService.drawBorder(
						this.chart.context,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].figure,
						closeX,
						closeY,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].width,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].height,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].thickness,
						this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.stop].thickness,
						this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.stop].color,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].direction
					);
				}
			} else {
				if (this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].active) {
					DrawFigureService.draw(
						this.chart.context,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].figure,
						closeX,
						closeY,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].width,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].height,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].thickness,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].color,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].direction
					);
				}

				if (this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.close].active) {
					DrawFigureService.drawBorder(
						this.chart.context,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].figure,
						closeX,
						closeY,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].width,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].height,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].thickness,
						this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.close].thickness,
						this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.close].color,
						this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].direction
					);
				}
			}
		}
	}
}
