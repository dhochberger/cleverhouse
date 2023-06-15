interface ReduxAction {
    type: string
    payload?: string
}

interface APIExceptionActions {
    '400': ReduxAction
    '403': ReduxAction
    '404': ReduxAction
    '500': ReduxAction
    default: ReduxAction
}

class APIException extends Error {
    actions
    showError: ReduxAction | null = null
    constructor(actions: APIExceptionActions, message = '') {
        super(message)
        this.actions = actions
        Object.setPrototypeOf(this, APIException.prototype)
    }

    setErrorData(status = 400, serverMessage = ''): void {
        this.message = serverMessage
        const statusAsString = status.toString()
        if (statusAsString in this.actions) this.showError = this.actions[statusAsString as keyof APIExceptionActions]
        else this.showError = this.actions.default
        if (this.showError.payload === '' && this.message !== '') this.showError.payload = this.message
    }
}
export default APIException
