import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const SingleCountryInformation = (props) => {
  return (
    props.realList.map(country =>
      <div key={country.area}>
        <h1 key={country.name}>{country.name}</h1>
        <div key={country.capital}>capital {country.capital}</div>
        <div key={country.population}>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img alt={country.name} src={country.flag} width='100' height='60'></img>
        <h2>Weather in {country.capital}</h2>
        <Weather country={country}></Weather>
      </div>
    )
  )
}

const LessOr10CountriesInfo = (props) => {
  return (
    <div>
      {props.realList.map(country =>
        <p key={country.name}>
          {country.name}
          <button onClick={() => props.click(country.name)}>show</button>
        </p>)}
    </div>
  )
}

const Weather = (props) => {
  const [weather, setWeather] = useState({})

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.name}&units=m`)
      .then(response => {
        setWeather(response.data.current)
      })
  }
  useEffect(hook, [props.country])

  return (
    <div>
      temperature: {weather.temperature} celcius<br />
      <img src={weather.weather_icons} alt="weather icon" /><br />
      wind: {weather.wind_speed} mph direction {weather.wind_dir}
    </div>
  )
}

const Filter = (props) => {
  const realList = props.countries.filter(country => country.name.toLowerCase().includes(props.countryName.toLowerCase()))
  if (realList.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (realList.length === 1) {
    return (
      <SingleCountryInformation realList={realList} />
    )
  } else {
    return (
      <LessOr10CountriesInfo realList={realList} click={props.click} />
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setCountryName(event.target.value)
  }

  const showHandleClick = (name) => {
    setCountryName(name)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <div>find countries</div>
      <form>
        <div>
          <input value={countryName} onChange={handleFilterChange} />
        </div>
      </form>
      <Filter countries={countries} countryName={countryName} click={showHandleClick} />
    </div>
  )

}

export default App;
