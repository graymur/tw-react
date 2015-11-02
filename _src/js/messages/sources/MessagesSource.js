import $ from 'jquery';

import dv from '../../util/dv.js';

class MessagesSource {
    fetch() {
        return $.get('/api/1.0/message');
    }

    remove(id) {
        return $.ajax({
            url: '/api/1.0/message/' + id,
            type: 'DELETE'
        });
    }

    create(message) {
        return $.post('/api/1.0/message', message);
    }
}

export default new MessagesSource();