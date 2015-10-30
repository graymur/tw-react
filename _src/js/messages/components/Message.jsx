import React from 'react';
import MessagesActions from '../actions/MessagesActions.js';

import dv from '../../util/dv.js';

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    remove(event) {
        MessagesActions.removeMessage(this.props.id);
    }

    render() {
        let timestamp = this.props.date.sec || this.props.date;
        let date = new Date(timestamp * 1000);

        return (
            <div ref="message" className="well clearfix">
                <button type="button" className="close pull-right" aria-label="Close" onClick={this.remove.bind(this)}><span aria-hidden="true">&times;</span></button>
                <p><small>{date.toUTCString()}</small></p>
                <p>{this.props.text}</p>
            </div>
        );
    }
}
