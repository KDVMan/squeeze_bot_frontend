import { BotStatusEnum } from '@app/enums/bot/bot-status.enum';

export class BotStatusRequestModel {
	id: number;
	status: BotStatusEnum;
}
