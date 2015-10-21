import React from 'react';
import $ from 'jquery';
import MessageForm from './MessageForm.jsx';
import Messages from './Messages.jsx';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        $.get('/api/1.0/message').then(result => {
            this.setState({messages: result});
        });
    }

    add(message) {
        //console.log(message);
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