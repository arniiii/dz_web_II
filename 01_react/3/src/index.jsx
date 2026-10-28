import ReactDOM from 'react-dom/client';
import React from 'react';

import Card from './Card.jsx';

const title = 'Title';
const text = 'Description';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Card title={title} text={text} />);
