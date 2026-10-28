import ReactDOM from 'react-dom/client';
import React from 'react';

import Carousel from './Carousel.jsx';

const images = ['images/first.jpeg', 'images/second.jpeg', 'images/third.jpeg'];

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Carousel images={images} />);
