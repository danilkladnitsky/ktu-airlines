import { BotEventType, BotMessageState } from '@common/bot.events';
import { Inject, OnModuleInit } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { API, Upload, Updates } from 'vk-io';

export class BotGateway implements OnModuleInit {
    vkApi: API;
    vkUpload: Upload;
    vkUpdates: Updates;

    @Inject(BotService)
    private readonly botService: BotService;

    onModuleInit() {
        this.vkApi = new API({
            token: process.env.BOT_TOKEN,
        });

        this.vkUpload = new Upload({
            api: this.vkApi
        });

        this.vkUpdates = new Updates({
            api: this.vkApi,
            upload: this.vkUpload,
        });

        this.vkUpdates.startPolling();

        this.vkUpdates.on('message_new', (context) => {
            const { messagePayload } = context;

            if (!messagePayload) {
                return;
            }

            const buttonPayload = messagePayload as BotMessageState;

            switch (buttonPayload.type) {
                case BotEventType.INVITATION:
                default:
                    this.botService.onInvitation(buttonPayload, context)

            }

        });
    }
}