import React from 'react';
import List from './components/List.jsx';

function start() {
    let body = document.querySelector('BODY');
    let container = document.querySelector('.container');
    let list = React.render(<List />, container);
}

window.onload = start;