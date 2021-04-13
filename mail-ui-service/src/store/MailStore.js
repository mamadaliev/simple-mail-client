import {makeAutoObservable, runInAction} from "mobx"
import MailService from "../services/MailService";
import ComposeStore from "./ComposeStore";
import SettingsStore from "./SettingsStore";

class MailStore {

    currentMessage = {}
    inboxMessages = []
    sentMessages = []

    constructor() {
        makeAutoObservable(this)
        this.mailService = new MailService()
    }

    getSentMessages = async () => {
        try {
            const data = await this.mailService.getMessages()
            runInAction(() => {
                this.sentMessages = data
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    sendMessage = async () => {
        try {
            let message = {
                option: {
                    from: SettingsStore.settings.email,
                    password: SettingsStore.settings.password,
                    host: SettingsStore.settings.protocol + '.gmail.com',
                    port: SettingsStore.settings.port
                },
                detail: {
                    to: ComposeStore.compose.to,
                    subject: ComposeStore.compose.subject,
                    message: ComposeStore.compose.message
                }
            }

            const data = await this.mailService.sendMessage(message)
            runInAction(() => {
                this.currentMessage = data
                // console.log(message)
                // console.log(data)
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }
}

export default new MailStore()
