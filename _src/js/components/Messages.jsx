import React from 'react';
import $ from 'jquery';
import Message from './Message.jsx';

var dv = console.log.bind(console);

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="clearfix">
                {
                    this.props.messages.map(message => {
                        return <Message key={message.id} data={message} />;
                    })
                }
            </div>
        );
    }
}