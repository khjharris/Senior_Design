import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Typography} from '@material-ui/core';

import '../../stylesheets/HomeCarousel.css'

/**
 * Image Carousel rendered in the home page.
 */
class HomeCarousel extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            // src={process.env.PUBLIC_URL + '/images/slider1.jpg'}
            src={process.env.PUBLIC_URL + '/images/home.jpg'}
            alt="First slide"
            // style={{objectPosition: '50% 65%', objectFit: 'cover', height: 400}}
            style={{objectPosition: '50% 50%', objectFit: 'cover', height: 400}}
          />
          <Carousel.Caption>
            <Typography variant="h3" style={{fontWeight: "bold"}} component="h1">We're Redifining Swimming</Typography>
            {/* <h1><strong>We're Redifing Swimming</strong></h1> */}
            <Typography vatiant="h3" component="h2" style={{fontSize: '1.8rem'}}>Smart Swim</Typography>
            {/* <p id="boldParagraph">Smart Swim</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100"
            // src={process.env.PUBLIC_URL + '/images/slider2.jpg'}
            src={process.env.PUBLIC_URL + '/images/home2.png'}
            alt="Third slide"
            // style={{objectPosition: '10% 30%', objectFit: 'cover', height: 400}}
            style={{objectPosition: '35% 75%', objectFit: 'cover', height: 400}}

          />

          <Carousel.Caption>
            <h2>Second slide label</h2>
            <p id="boldParagraph">Your Global Ride</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            // src={process.env.PUBLIC_URL + '/images/slider3.jpg'}
            src={process.env.PUBLIC_URL + '/images/slider1.jpg'}
            alt="Third slide"
            style={{objectPosition: '50% 65%', objectFit: 'cover', height: 400}}
          />

          <Carousel.Caption>
            <h2>Third slide label</h2>
            <p id="boldParagraph">Your Global Ride</p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    )
  }
}

export default HomeCarousel