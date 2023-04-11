import { API, Upload, Updates } from 'vk-io';

export const setupBotListener = () => {
    const api = new API({
        token: process.env.BOT_TOKEN,
    });

    const upload = new Upload({
        api
    });

    const updates = new Updates({
        api,
        upload,
    });

    updates.startPolling();

    updates.on('message_new', (context) => {
        console.log(context.messagePayload);

        // context.type // message
        // context.subTypes // ['message_new']
    });
}