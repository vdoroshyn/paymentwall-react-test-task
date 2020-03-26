import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateSelectedCountry, getCountries } from '../actions/countryActions';

class CountrySelector extends Component {
  componentDidMount() {
    this.props.getCountries();
  }

  handleChange = (e) => {
    this.props.updateSelectedCountry(e.target.value);
  }

  render() {
    const countriesByName = this.props.countries.map(country => {
      return (
        <option key={ country.alpha2Code } value={ country.alpha2Code }>
          {country.name}
        </option>
      );
    });

    return (
      <select onChange={ this.handleChange }>
        <option value=""></option>
        { countriesByName }
      </select>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedCountry: (countryCode) => {
      dispatch(updateSelectedCountry(countryCode))
    },
    getCountries: () => dispatch(getCountries())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);
