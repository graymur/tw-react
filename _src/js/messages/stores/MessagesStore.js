import alt from '../../alt.js';
import MessagesActions from '../actions/MessagesActions.js';

import dv from '../../util/dv.js';

class MessagesStore {
    constructor() {
        this.messages = [];

        this.bindListeners({
            update: MessagesActions.UPDATE_MESSAGES,
            fetch: MessagesActions.FETCH_MESSAGES,
            fetchFailed: MessagesActions.MESSAGES_FAILED,
            remove: MessagesActions.REMOVE_MESSAGE
            //handleCreate: MessagesActions.CREATE,
            //handleUpdate: MessagesActions.UPDATE_MESSAGES
        });
    }

    update(messages) {
        this.messages = messages;
        this.errorMessage = null;
    }

    fetch() {
        //this.messages = [];
    }

    fetchFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    remove(id) {
        this.messages = this.messages.filter(message => {
            return message.id !== id;
        });

        return this.messages;
    }
}

export default alt.createStore(MessagesStore, 'MessagesStore');