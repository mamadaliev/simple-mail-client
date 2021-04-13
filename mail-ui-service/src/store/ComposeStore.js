import {makeAutoObservable} from "mobx"

class ComposeStore {

    compose = {
        from: "",
        to: "",
        subject: "",
        message: ""
    }

    constructor() {
        makeAutoObservable(this)
    }


    setCompose(compose) {
        this.compose.from = compose.from
        this.compose.to = compose.to
        this.compose.subject = compose.subject
        this.compose.message = compose.message
    }

    setComposeTo(value) {
        this.compose.to = value
    }

    setComposeFrom(value) {
        this.compose.from = value
    }

    setComposeSubject(value) {
        this.compose.subject = value
    }

    setComposeMessage(value) {
        this.compose.message = value
    }
}

export default new ComposeStore()
