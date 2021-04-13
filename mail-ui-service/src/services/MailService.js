import SettingsStore from "../store/SettingsStore";

const MAIL_SERVICE = "http://127.0.0.1:8080";
const ALL = "/mail/inbox/all";
const SEND = "/mail/send";

class MailService {

    getMessages = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "start": 1,
                "end": 100,
                "folder": "[Gmail]/Sent Mail",
                "option": {
                    "from": SettingsStore.settings.email,
                    "password": SettingsStore.settings.password,
                    "host": "imap.gmail.com",
                    "port": "578"
                }
            })
        };
        const request = new Request(MAIL_SERVICE + ALL, options);
        const response = await fetch(request);
        return response.json();
    }

    getById = async (id) => {
        const options = {
            method: "GET",
        }
        const request = new Request(MAIL_SERVICE + ALL + '/' + id, options);
        const response = await fetch(request);
        return response.json();
    }

    sendMessage = async (message) => {
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        }
        console.log(options)


        const response = fetch(MAIL_SERVICE + SEND, options)
            .then(response => response.json())
            .then(data => console.log(data));

        //const request = new Request(MAIL_SERVICE + SEND, options);
        //const response = await fetch(request);
        return response.json();
    }
}

export default MailService
