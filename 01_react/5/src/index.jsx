import ReactDOM from 'react-dom/client';
import React from 'react';

import Progress from './Progress.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Progress percentage={40} />);
