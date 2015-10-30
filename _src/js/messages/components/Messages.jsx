import React from 'react';
import Message from './Message.jsx';

import dv from '../../util/dv.js';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="clearfix">
                {
                    this.props.messages.map(message => {
                        return <Message key={message.id} {...message} />;
                    })
                }
            </div>
        );
    }
}