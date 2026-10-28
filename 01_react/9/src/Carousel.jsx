import React from 'react';
import cn from 'classnames';

// BEGIN (write your solution here)
export default class Carousel extends React.Component {
  state = { active: 0 };

  move = (step) => {
    const { images } = this.props;
    if (images.length === 0) return;
    this.setState(({ active }) => ({ active: (active + step + images.length) % images.length }));
  };

  render() {
    return (
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {this.props.images.map((image, index) => (
            <div key={index} className={cn('carousel-item', { active: index === this.state.active })}>
              <img alt="" className="d-block w-100" src={image} />
            </div>
          ))}
        </div>
        {['prev', 'next'].map((direction) => (
          <button key={direction} className={`carousel-control-${direction}`} data-bs-target="#carousel"
            type="button" data-bs-slide={direction} onClick={() => this.move(direction === 'prev' ? -1 : 1)}>
            <span className={`carousel-control-${direction}-icon`} aria-hidden="true" />
            <span className="visually-hidden">{direction === 'prev' ? 'Previous' : 'Next'}</span>
          </button>
        ))}
      </div>
    );
  }
}
// END
