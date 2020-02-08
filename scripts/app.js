const locationInput = document.querySelector('.change-location');
const details = document.querySelector('.details');
const card = document.querySelector('.card');

// Update information about city given from form
const updateCity = async (city) => {

  let cityDetails = await getCity(city);
  let weatherDetails = await getWeather(cityDetails.Key);

  // Returning object
  return { cityDetails, weatherDetails }

};

const updateUI = (data) => {

  let html = `
  <h5 class="my-3">${data.cityDetails.LocalizedName}</h5>
  <div class="my-3">${data.weatherDetails.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${data.weatherDetails.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `
  details.innerHTML = html;
  card.classList.remove('d-none');

}

//Form handler
locationInput.addEventListener('submit', e => {
  e.preventDefault();

  let city = locationInput.city.value.trim();

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
  ;

  locationInput.reset();

});

