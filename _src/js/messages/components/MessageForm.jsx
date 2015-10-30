import React from 'react';
import MessagesActions from '../actions/MessagesActions.js';

import dv from '../../util/dv.js';

export default class MessageForm extends React.Component {
    constructor(props) {
        super(props);

        this.maxLength = 140;
        this.imageLength = 17;

        this.state = {
            text: ''
        };
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    buttonDisabled() {
        return this.state.text.length === 0 || this.state.text.length > this.maxLength;
    }

    handleSubmit(event) {
        event.preventDefault();

        MessagesActions.create({ text: this.state.text });

        this.refs.form.getDOMNode().reset();
        this.setState({ text: '' });
    }

    render() {
        return (
            <div className="well clearfix form-container">
                <form ref="form" method="post" action="/api/1.0/message" onSubmit={this.handleSubmit.bind(this)}>
                    <textarea name="text" className="form-control" onChange={this.handleChange.bind(this)}></textarea>
                    <br/>
                    <span>{this.maxLength - this.state.text.length}</span>
                    <button className="btn btn-primary pull-right" disabled={this.buttonDisabled.bind(this)()}>Send</button>
                </form>
            </div>
        );
    }
}