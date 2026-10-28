import { createRoot } from 'react-dom/client';
import React from 'react';

import Autocomplete from './Autocomplete.jsx';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<Autocomplete />);
