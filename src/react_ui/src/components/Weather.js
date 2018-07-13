import React, {Component} from "react";


const API_KEY = "2abe029b7b8d40e80d1ed447f4522f0d";

{/* Orla's key in case Conor's one stops woking
const API_KEY = "70ef396e3ce3949e0934b4428e41f453";*/}


class WeatherWidget extends Component{
  state = {
    temperature: undefined,
    description: undefined,
    icon: undefined
  }

  // componentDidMount() {
  //   fetch(`http://api.openweathermap.org/data/2.5/weather?q=Dublin,ie&appid=${API_KEY}&units=metric`)
  //     .then(res => res.json())
  //     .then(
  //       (data) => {
  //         this.setState({
  //           temperature: data.main.temp,
  //           description: data.weather[0].description,
  //           icon: data.weather[0].icon
  //         });
  //       },
  //     )
  // }


  render() {
    return(
      <div>
      <p>Temperature: {this.state.temperature}</p>
      <p>Description: {this.state.description}</p> 
      <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`}/>    
      </div>
      );
  }
};

export default WeatherWidget;