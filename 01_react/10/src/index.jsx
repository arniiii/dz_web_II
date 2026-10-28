import ReactDOM from 'react-dom/client';
import React from 'react';

import Collapse from './Collapse.jsx';

const text = 'collapse me';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Collapse text={text} />);
