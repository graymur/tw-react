import React from 'react';
import $ from 'jquery';

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.maxLength = 140;
        this.imageLength = 17;

        this.state = {
            text: ''
        };
    }

    remove(event) {
        event.preventDefault();

        $.ajax({
            url: '/api/1.0/message/' + this.props.data.id,
            type: 'DELETE'
        }).then(response => {
            $(React.findDOMNode(this.refs.message)).remove();
            //let thisDomElement = React.findDOMNode(this.refs.message);
            //thisDomElement.parentNode.removeChild(thisDomElement);
        });
    }

    render() {
        let timestamp = this.props.data.date.sec || this.props.data.date;
        let date = new Date(timestamp * 1000);

        return (
            <div ref="message" className="well clearfix">
                <button type="button" className="close pull-right" aria-label="Close" onClick={this.remove.bind(this)}><span aria-hidden="true">&times;</span></button>
                <p><small>{date.toUTCString()}</small></p>
                <p>{this.props.data.text}</p>
            </div>
        );
    }
}