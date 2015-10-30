import alt from '../../alt.js';
import MessagesSource from '../sources/MessagesSource.js';
import dv from '../../util/dv.js';

class MessagesActions {
    createMessage(message) {
        this.dispatch(message);
    }

    removeMessage(id) {
        MessagesSource.remove(id).then(() => {
            this.dispatch(id);
        });
    }

    updateMessages(messages) {
        this.dispatch(messages);
    }

    fetchMessages() {
        var p = MessagesSource.fetch();

        p
            .then((messages) => {
                this.actions.updateMessages(messages);
            })
            /*.catch((errorMessage) => {
                this.actions.messagesFailed(errorMessage);
            })*/;
    }

    messagesFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

export default alt.createActions(MessagesActions);


