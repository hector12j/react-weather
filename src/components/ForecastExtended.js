import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';
import './styles.css';


// const days =[
//     'Lunes',
//     'Martes',
//     'Miercoles',
//     'Jueves',
//     'Viernes',
// ];

// const data = {
//     temperature: 10,
//     weatherState: 'normal',
//     humidity: 10,
//     wind: 'normal',
// };
const api_key = 'c6e05c1ba919e423e76982f39409e29b';
const url_base_weather = "http://api.openweathermap.org/data/2.5/forecast";

class ForecastExtended extends Component {

    constructor() {
        super();
        this.state = {
            forecastData: null,
        }
    }

    componentDidMount() {
        // fetch
        this.updatecity(this.props.city);
    }
    
    componentDidUpdate(nextProps) {
        if(nextProps.city !== this.props.city){
            this.setState({ forecastData: null })
            this.updatecity(nextProps.city);
        }
    }
    
    updatecity = city => {
        const url_forecast = `${url_base_weather}?q=${city}&appid=${api_key}`;
        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData);
                this.setState({ forecastData });
            }
        )
    }

    renderForecastItemsDays() {
        return this.state.forecastData.map(
            forecast => (
                <ForecastItem
                    key={`${forecast.weekDay}${forecast.hour}`} 
                    weekDay={forecast.weekDay} 
                    hour={forecast.hour} 
                    data={forecast.data}
                />
            )
        );
    }

    renderProgress = () => {
        return "Cargando Pronostico extendido";
    }

    render () {
        const { city } = this.props;
        const { forecastData } = this.state; 
        return (
            <div>
                <h2 className="forecast-title">Pronóstico Extendido para {city}</h2>
                {
                    forecastData 
                    ? 
                        this.renderForecastItemsDays() 
                    :
                        this.renderProgress()
                }
            </div>  
        );
    };
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;