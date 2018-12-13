import React, { Component } from 'react';
// import Welcome from './Welcome';
import './App.css';

class App extends Component {
  state = {
    temp: "",
    humidity: "",
    icon: "",
    location: "",
    country: "",
    error: ""
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value
    const api = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&APPID=b044bd52a24b5fd37aef3f1f89c4776d&units=metric`);
    const rtr = await api.json();
    console.log(rtr);
    if (city) {
      this.setState({
        temp: rtr.list[0].main.temp,
        humidity: rtr.list[0].main.humidity,
        description: rtr.list[0].weather[0].description,
        location: rtr.list[0].name,
        country: rtr.list[0].sys.country,
        error: ""
      })
    } else {
      this.setState({
        temp: "",
        humidity: "",
        icon: "",
        location: "",
        country: "",
        error: "Error! You must enter a city"
      })
    }

  }
  render() {
    return (
      <div className="container">
        <center>
          <div className="card" id="card1">
            <h1>What's the weather like today ? </h1>
            <form onSubmit={this.getWeather}>
              <input type="text" placeholder="Enter a city" name="city" className="form-control" />
              <button className="btn btn-primary">Get</button>
            </form>
            <div className="information">
              {this.state.location !== '' ? <h1><span>Location: </span>{this.state.location} ({this.state.country}) </h1> : ''}
              {this.state.temp !== '' ? <h1><span>Temp: </span>{this.state.temp} °C</h1> : ''}
              {this.state.humidity !== '' ? <h1><span>Humidity: </span>{this.state.humidity} %</h1> : ''}
              {this.state.description !== '' ? <h1>{this.state.description}</h1> : ''}
              {this.state.error !== '' ? <h1>{this.state.error}</h1> : ''}
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default App;
