const locationInput = document.querySelector('.change-location');

// Update information about city given from form
const updateCity = async (city) => {

  let cityDetails = await getCity(city);
  let weatherDetails = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weatherDetails
  }
};

//Form handler
locationInput.addEventListener('submit', e => {
  e.preventDefault();

  let city = locationInput.city.value.trim();

  updateCity(city)
    .then(data => console.log(data))
    .catch(err => console.log(err))
  ;
});