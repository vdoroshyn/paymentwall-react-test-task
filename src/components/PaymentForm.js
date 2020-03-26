import React, { Component } from "react";
import { connect } from 'react-redux';
import { sanctionedCountriesList } from '../sanctionedCountriesList';

const nameRGEX    = /^[a-z\s]+$/;
const cardRGEX    = /^[0-9\s]+$/;
const expDateRGEX = /^[a-z0-9]+\/[a-z0-9]+$/;
const cvvRGEX     = /^[0-9]{3,4}$/;

const countryCodes = sanctionedCountriesList.reduce((acc, country) => {
  acc.push(country.alpha2Code);
  return acc;
}, []);

class PaymentForm extends Component {
  state = {
    cardholderName: '',
    cardNumber:     '',
    expDate:        '',
    cvv:            '',
    isFormSubmitted: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (nameRGEX.test(this.state.cardholderName) &&
        cardRGEX.test(this.state.cardNumber) &&
        expDateRGEX.test(this.state.expDate) &&
        cvvRGEX.test(this.state.cvv)) {          
          this.setState({
            cardholderName: '',
            cardNumber: '',
            expDate: '',
            cvv: '',
            isFormSubmitted: true
          })
        }

  }

  render() {
    const isCountrySanctioned = countryCodes.find(countryCode =>
      countryCode === this.props.selectedCountry
    );
    
    if (this.state.isFormSubmitted) {
      return (
        <div>Payment is successful</div>
      )
    }

    const showForm = isCountrySanctioned ?
      <div>We are sorry, the service is not supported at the moment.</div> :
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="cardholderName">Full Name</label>
        <input type="text" id="cardholderName" onChange={ this.handleChange }/>
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" onChange={ this.handleChange }/>
        <label htmlFor="expDate">Expiration Date</label>
        <input type="text" id="expDate" onChange={ this.handleChange }/>
        <label htmlFor="cvv">CVV</label>
        <input type="text" id="cvv" onChange={ this.handleChange }/>
        <button>Submit</button>
      </form>

    return (
      <div>{ showForm }</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCountry: state.selectedCountry
  }
}

export default connect(mapStateToProps)(PaymentForm);
