import {makeAutoObservable, runInAction} from "mobx"
import MailService from "../services/MailService";

class SettingsStore {

    settings = {
        isGmail: true,
        protocol: 'smtp',
        port: '578',
        email: '',
        password: ''
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new SettingsStore()
