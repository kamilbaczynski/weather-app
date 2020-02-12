class Forecast {

  constructor() {
    this.key = 'sOKbRqrPpDEW2hBlEzWGe2BEug70i6GT';
    this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
  }

  async updateCity(city) {
    let cityDetails = await this.getCity(city);
    let weatherDetails = await this.getWeather(cityDetails.Key);
    return { cityDetails, weatherDetails };
  }

  async getCity(city) {
    let query = `?apikey=${this.key}&q=${city}`
    let response = await fetch(this.cityURI + query);
    let data = await response.json();
    return data[0];
  }

  async getWeather(id) {
    let query = `${id}?apikey=${this.key}`
    let response = await fetch(this.weatherURI + query);
    let data = await response.json();
    return data[0];
  }
}


// const key = 'sOKbRqrPpDEW2hBlEzWGe2BEug70i6GT';

// // Fetch city informations
// const getCity = async (city) => {
  
//   let base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//   let query = `?apikey=${key}&q=${city}`

//   let response = await fetch(base + query);
//   let data = await response.json();

//   return data[0];
// }

// // Fetch weather informations
// const getWeather = async (id) => {

//   let base = 'http://dataservice.accuweather.com/currentconditions/v1/'
//   let query = `${id}?apikey=${key}`

//   let response = await fetch(base + query);
//   let data = await response.json();

//   return data[0];
// }

// // getCity('London')
// //  .then( data => getWeather(data.Key))
// //  .then( data => console.log(data))
// //  .catch( err => console.log(err))
// // ;


// // getCity('manchester').then(data => {
// //   return getWeather(data.Key);
// // }).then(data => {
// //   console.log(data);
// // }).catch(err => console.log(err));