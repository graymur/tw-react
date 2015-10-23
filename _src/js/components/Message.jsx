import React from 'react';
import $ from 'jquery';

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    remove(event) {
        event.preventDefault();

        $.ajax({
            url: '/api/1.0/message/' + this.props.id,
            type: 'DELETE'
        }).then(response => {
            let thisDomElement = React.findDOMNode(this.refs.message);
            thisDomElement.parentNode.removeChild(thisDomElement);
            React.unmountComponentAtNode(thisDomElement.parentNode);
        });
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
