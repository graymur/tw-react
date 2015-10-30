import React from 'react';

import MessagesStore from '../stores/MessagesStore.js';
import MessagesActions from '../actions/MessagesActions.js';

import MessageForm from './MessageForm.jsx';
import Messages from './Messages.jsx';

import dv from '../../util/dv.js';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = MessagesStore.getState();
    }

    componentDidMount() {
        MessagesStore.listen(this.onChange.bind(this));
        MessagesActions.fetchMessages();
    }

    componentWillUnmount() {
        MessagesStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    add(message) {
        this.state.messages.unshift(message);
        this.setState({ messages: this.state.messages });
    }

    render() {
        return (
            <div>
                <MessageForm onAdd={this.add.bind(this)}/>
                <Messages messages={this.state.messages}/>
            </div>
        );
    }
}