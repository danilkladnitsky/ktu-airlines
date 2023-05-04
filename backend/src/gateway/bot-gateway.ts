import { BotEventType, BotMessageState } from '@common/bot.events';
import { User } from '@entities/user.entity';
import { Inject, OnModuleInit } from '@nestjs/common';
import { BotService } from '@services/bot.service';
import { UserService } from '@services/user.service';
import { API, Upload, Updates, MessageContext, ContextDefaultState} from 'vk-io';


export class BotGateway implements OnModuleInit {
    vkApi: API;
    vkUpload: Upload;
    vkUpdates: Updates;

    @Inject(BotService)
    private readonly botService: BotService;

    @Inject(UserService)
    private readonly userService: UserService;

    isSendMessage(message?: string) {
        return message?.includes("/send") || message?.includes("/test");
    }

    async sendNotifications(context: MessageContext<ContextDefaultState>) {
        const ADMIN_IDS_RAW = process.env.ADMINS || "";
        const { text, senderId, attachments } = context;

        const adminIds: number[] = ADMIN_IDS_RAW.split(",").map(v => +v);

        const isAdmin = adminIds.includes(senderId);

        if (!isAdmin) {
            return;
        }

        const shouldSendNotifications = text.includes("/send");
        const shouldSendTestNotifications = text.includes("/test");

        const notify = shouldSendNotifications || shouldSendTestNotifications;

        if (isAdmin && notify) { 
            const messageToSend = shouldSendNotifications ? text.split("/send")[1] : text.split("/test")[1];
            const adminUsers = adminIds.map(id => ({ vkId: id.toString(), firstName: "Админ", lastName: "Админ" }));

            const users = shouldSendNotifications ? await this.userService.getAcceptedUsers() : adminUsers;
            
            users.length && this.botService.sendNotifications(users, (messageToSend || 'Пустое сообщение').trim(), attachments);
            return;
            }
    }

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

        this.vkUpdates.on('message_new', async (context) => {            
            const { messagePayload, text } = context;

            if (BotEventType.INVITATION === messagePayload?.type) {
                this.botService.onInvitation(messagePayload, context)
            }

            if (text && this.isSendMessage(text)) {
                this.sendNotifications(context)
            }
        });
    }
}