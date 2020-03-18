import React, {Component} from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import HomeCarousel from './HomeCarousel.jsx';
import NewSession from '../NewSession/NewSession';
import '../../stylesheets/Home.css';

class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      countries: '',
      mobile: ''
    }

  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    fetch('/api/getCountries', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      this.setState({countries: data.result})
    })
  }

  facilityClicked = (item) => {
    switch(item) {
      case "mit":
        this.props.history.push("/facility/mit");
        return;

      case "bu":
        this.props.history.push("/facility/bu");
        return;

      case "bsc":
        this.props.history.push("/facility/bsc");
        return;

      default:
        return;
    }
  }

  render() {
    return (
      <div className="App">
        <div style={{height: 400}}>
          <HomeCarousel />
        </div>

        <h3 id="h2Home">CHOOSE YOUR POOL FACILITY</h3>

        {/* Render Countries Grid */}
        {this._renderCountryGrid()}

        <h3 id="h2Home">START SESSION</h3>
        <NewSession />
      </div>
    )
  }

  _renderCountryGrid = () => {
    return (
      <Container>
        <Row style={{marginBottom: 40}}>
          <Col key="mit" xs={6} md={4}>
            <div onClick={()=> this.facilityClicked("mit")} className="gridImageContainer">
              <img className="country-img img-fluid w-100" id="gridImage" src={process.env.PUBLIC_URL + '/images/mit.png'} alt="MIT" style={{objectPosition: 'center', objectFit: 'fill'}} />
            </div>
          </Col>

          <Col key="bu" xs={6} md={4}>
            <div onClick={()=> this.facilityClicked("bu")} className="gridImageContainer">
              {/*             style={{objectPosition: '50% 50%', objectFit: 'cover', height: 400}} */}
              <img className="country-img img-fluid w-100" id="gridImage" src={process.env.PUBLIC_URL + '/images/bu.png'} alt="BU" style={{objectPosition: 'center', objectFit: 'fill'}} />
            </div>
          </Col>

          <Col key="bsc" xs={6} md={4}>
            <div onClick={()=> this.facilityClicked("bsc")} className="gridImageContainer">
              <img className="country-img img-fluid w-100" id="gridImage" src={process.env.PUBLIC_URL + '/images/bsc.png'} alt="Boston Sports Club" style={{objectPosition: 'center', objectFit: 'fill'}} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home;