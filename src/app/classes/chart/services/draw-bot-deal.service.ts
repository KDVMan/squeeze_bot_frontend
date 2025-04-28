import { Chart } from '@app/classes/chart/chart';
import { BotDealStatusEnum } from '@app/enums/bot/bot-deal-status.enum';
import { HelperService } from '@app/classes/chart/services/helper.service';
import { LineTypeEnum } from '@core/enums/line-type.enum';
import { TradeActionEnum } from '@core/enums/trade-action.enum';
import { DrawFigureService } from '@app/classes/chart/services/draw-figure.service';

export class DrawBotDealService {
	constructor(private chart: Chart) {
	}

	public draw(): void {
		if (this.chart.bot.deal.status === BotDealStatusEnum.sendOpenLimit || this.chart.bot.deal.status === BotDealStatusEnum.openLimit) {
			const value = this.chart.rangeService.y.coordinateBetweenMinMax(this.chart.bot.deal.preparationPriceIn);

			this.chart.captionService.drawLineHorizontal(
				value,
				HelperService.getLineType(LineTypeEnum.solid),
				1,
				'#00ba00',
				true
			);

			this.chart.captionService.drawBodyRight(
				value,
				'#00ba00',
				true
			);

			this.chart.captionService.drawTextRight(
				this.chart.bot.deal.preparationPriceIn,
				'#ffffff'
			);
		} else if (this.chart.bot.deal.status === BotDealStatusEnum.open) {
			const roundedTimeIn = Math.floor(this.chart.bot.deal.timeIn / this.chart.currentIntervalMilliseconds) * this.chart.currentIntervalMilliseconds;
			const openX = this.chart.rangeService.x.coordinateBetweenMinMax(roundedTimeIn);
			const openY = this.chart.rangeService.y.coordinateBetweenMinMax(this.chart.bot.deal.priceIn);

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

			if (this.chart.bot.deal.preparationPriceOut > 0) {
				const value = this.chart.rangeService.y.coordinateBetweenMinMax(this.chart.bot.deal.preparationPriceOut);

				this.chart.captionService.drawLineHorizontal(
					value,
					HelperService.getLineType(LineTypeEnum.solid),
					1,
					'#ff0000',
					true
				);

				this.chart.captionService.drawBodyRight(
					value,
					'#ff0000',
					true
				);

				this.chart.captionService.drawTextRight(
					this.chart.bot.deal.preparationPriceOut,
					'#ffffff'
				);
			}

			if (this.chart.bot.deal.preparationPriceStop > 0) {
				const value = this.chart.rangeService.y.coordinateBetweenMinMax(this.chart.bot.deal.preparationPriceStop);

				this.chart.captionService.drawLineHorizontal(
					value,
					HelperService.getLineType(LineTypeEnum.dash),
					1,
					'#006dff',
					true
				);

				this.chart.captionService.drawBodyRight(
					value,
					'#006dff',
					true
				);

				this.chart.captionService.drawTextRight(
					this.chart.bot.deal.preparationPriceStop,
					'#ffffff'
				);
			}
		}

		// const intervalMs = this.chart.currentIntervalMilliseconds;
		// const lastQuoteTime = this.chart.quotes[this.chart.quotes.length - 1]?.timeOpen ?? 0;
		// const x = this.chart.rangeService.x.coordinateBetweenMinMax(lastQuoteTime);
		//
		// if (botDeal.status === BotDealStatusEnum.sendOpenLimit || botDeal.status === BotDealStatusEnum.openLimit) {
		// 	const y = this.chart.rangeService.y.coordinateBetweenMinMax(botDeal.calculatePriceIn);
		// 	DrawService.line(this.chart.context, 0, y, this.chart.getWidth(), y, 1, '#00ff00'); // Зеленая линия
		// }
		//
		// 2. Открытая сделка (стрелка + фантом стоп)
		// if (botDeal.status === BotDealStatusEnum.open) {
		// 	Стрелка (на priceIn)
		// const yIn = this.chart.rangeService.y.coordinateBetweenMinMax(botDeal.priceIn);
		// DrawFigureService.draw(
		// 	this.chart.context,
		// 	this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].figure,
		// 	x,
		// 	yIn,
		// 	this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].width,
		// 	this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].height,
		// 	this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].thickness,
		// 	this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].color,
		// 	this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].direction
		// );
		//
		// Фантомный стоп (пунктирная синяя линия)
		// const yStop = this.chart.rangeService.y.coordinateBetweenMinMax(botDeal.calculatePriceStop);
		// this.drawPhantomStopLine(0, yStop, this.chart.getWidth(), yStop, '#0000ff'); // Синяя пунктирная линия
		// }
	}

	// private drawBotDeal(deal: DealModel): void {
	// 	const roundedTimeIn = Math.floor(deal.timeIn / this.chart.currentIntervalMilliseconds) * this.chart.currentIntervalMilliseconds;
	// 	const roundedTimeOut = Math.floor(deal.timeOut / this.chart.currentIntervalMilliseconds) * this.chart.currentIntervalMilliseconds;
	//
	// 	const openX = this.chart.rangeService.x.coordinateBetweenMinMax(roundedTimeIn);
	// 	const openY = this.chart.rangeService.y.coordinateBetweenMinMax(deal.priceIn);
	// 	const closeX = this.chart.rangeService.x.coordinateBetweenMinMax(roundedTimeOut);
	// 	const closeY = this.chart.rangeService.y.coordinateBetweenMinMax(deal.priceOut);
	//
	// 	if (this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].active) {
	// 		DrawFigureService.draw(
	// 			this.chart.context,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].figure,
	// 			openX,
	// 			openY,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].width,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].height,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].thickness,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].color,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].direction
	// 		);
	// 	}
	//
	// 	if (this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.open].active) {
	// 		DrawFigureService.drawBorder(
	// 			this.chart.context,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].figure,
	// 			openX,
	// 			openY,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].width,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].height,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].thickness,
	// 			this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.open].thickness,
	// 			this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.open].color,
	// 			this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.open].direction
	// 		);
	// 	}
	//
	// 	if (deal.timeOut) {
	// 		if (deal.isStopPercent || deal.isStopTime) {
	// 			if (this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].active) {
	// 				DrawFigureService.draw(
	// 					this.chart.context,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].figure,
	// 					closeX,
	// 					closeY,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].width,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].height,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].thickness,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].color,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].direction
	// 				);
	// 			}
	//
	// 			if (this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.stop].active) {
	// 				DrawFigureService.drawBorder(
	// 					this.chart.context,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].figure,
	// 					closeX,
	// 					closeY,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].width,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].height,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].thickness,
	// 					this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.stop].thickness,
	// 					this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.stop].color,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.stop].direction
	// 				);
	// 			}
	// 		} else {
	// 			if (this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].active) {
	// 				DrawFigureService.draw(
	// 					this.chart.context,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].figure,
	// 					closeX,
	// 					closeY,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].width,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].height,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].thickness,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].color,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].direction
	// 				);
	// 			}
	//
	// 			if (this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.close].active) {
	// 				DrawFigureService.drawBorder(
	// 					this.chart.context,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].figure,
	// 					closeX,
	// 					closeY,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].width,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].height,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].thickness,
	// 					this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.close].thickness,
	// 					this.chart.chartSettingsModel.trade.border.long[TradeActionEnum.close].color,
	// 					this.chart.chartSettingsModel.trade.body.long[TradeActionEnum.close].direction
	// 				);
	// 			}
	// 		}
	// 	}
	// }
}
