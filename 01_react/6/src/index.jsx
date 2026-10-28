import ReactDOM from 'react-dom/client';
import React from 'react';

import Alert from './Alert.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Alert type="warning" text="what is love?" />);
