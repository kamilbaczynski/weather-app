
const locationInput = document.querySelector('.change-location');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('div.icon');

// Update information about city given from form
const updateCity = async (city) => {

  let cityDetails = await getCity(city);
  let weatherDetails = await getWeather(cityDetails.Key);

  // Returning object
  return { cityDetails, weatherDetails }

};

// Update User Interface with fetched weather details
const updateUI = (data) => {

  console.log(data);

  // Destructuring
  const { cityDetails, weatherDetails } = data;


  // Weather details updating
  let html = `
  <h5 class="my-3">${cityDetails.LocalizedName}</h5>
  <div class="my-3">${weatherDetails.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weatherDetails.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `
  details.innerHTML = html;


  // Time of day updating

  weatherDetails.IsDayTime
  ? time.setAttribute('src', 'img/day.svg')
  : time.setAttribute('src', 'img/night.svg');

  // if (weatherDetails.IsDayTime) {
  //   time.setAttribute('src', 'img/day.svg');
  // } else {
  //   time.setAttribute('src', 'img/night.svg');
  // }


  // Change card visibility after fetching data
  if( card.classList.contains('d-none') ) {
    card.classList.remove('d-none');
  }


  // Change weather type icon
  icon.innerHTML = `<img src="img/icons/${weatherDetails.WeatherIcon}.svg">`

}

//Form handler
locationInput.addEventListener('submit', e => {
  e.preventDefault();

  let city = locationInput.city.value.trim();

  // Saving last search to local storage
  localStorage.setItem('city', city);

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
  ;

  // Reset input value
  locationInput.reset();

});

// Local storage check to update app with last search value

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
};

