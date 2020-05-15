import React, { Component } from 'react';
import { Grid, Col, Row} from 'react-flexbox-grid';
import { createStore } from 'redux';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';

const cities = [
  'Barcelona, es',
  'Caracas, ve',
  'Washington, us',
  'Ciudad de Mexico,mx',
  'Madrid,es',
  'Bogota,col',
];

const store = createStore(() => {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const setCity = (value) => ({ type: 'setCity',  value });

class App extends Component {

  constructor() {
    super();

    this.state = {
      city: null
    };
  }
  
  handleSelectionLocation = city => {
    this.setState({ city });
    console.log(city);
    store.dispatch(setCity(city));
  }
  
  render() {
    const { city } = this.state;
    return (
      <Grid>
        <Row>
          <AppBar position='sticky'>
            <Toolbar>
              <Typography variant='h4' color='inherit'>
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>  
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationList
              cities={cities}
              onSelectedLocation={this.handleSelectionLocation}
            />
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                {
                  // city 
                  // ? 
                  //   <ForecastExtended city={city} />
                  // : 
                  //   <h1>No se ha seleccionado ciudad</h1>
                  city && <ForecastExtended city={city} />
                }
                
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
