import React, { Component } from 'react';
import transformWeather from '../../services/transformWeather';
import CircularProgress from '@material-ui/core/CircularProgress';
import getUrlWeatherByCity from './../../services/getUrlWeatherByCity';
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import './style.css';

class WeatherLocation extends Component {

	constructor(props) {
		super(props);
		const { city } = props;
		this.state = {
			city,
			data: null
		};
	};


	componentDidMount() {
		this.update();
	}

	update = () => {
		const api_weather = getUrlWeatherByCity(this.state.city);
		fetch(api_weather).then(resolve => {
			return resolve.json();
		}).then(data => {
			const newWeather = transformWeather(data);
			this.setState({
				data: newWeather,
			});
		});
	}

	render() {
		const { onWeatherLocationClick } = this.props;
		const { city, data } = this.state;
		return(
			<div className = "weatherLocationCont" onClick={onWeatherLocationClick}>
				<Location city={city}></Location>
				{data ? <WeatherData data={data}></WeatherData> : <CircularProgress size={50}/>}	
			</div>
		);
	}
}

WeatherLocation.propTypes = {
	city: PropTypes.string.isRequired,
	onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;