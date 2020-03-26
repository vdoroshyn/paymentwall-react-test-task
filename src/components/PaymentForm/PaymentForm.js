import React, { Component } from "react";
import { connect } from 'react-redux';
import { sanctionedCountriesList } from '../../sanctionedCountriesList';
import { changeIsFormSubmitted } from '../../actions/formActions';
import './PaymentForm.css';

const nameRGEX    = /^[a-zA-Z\s]+$/;
const cardRGEX    = /^[0-9\s]+$/;
const expDateRGEX = /^[0-9]+\/[0-9]+$/;
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
    cardholderNameError: null,
    cardNumberError: null,
    expDateError: null,
    cvvError: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  setError = (errorField, isValid) => {
    const error = isValid ? null : 'The field is not valid';

    this.setState({
      [errorField]: error
    });
  }

  isFieldValid = (regx, value, errorField) => {
    const isValid = regx.test(value);
    this.setError(errorField, isValid)

    return isValid;
  }

  isFormValid = () => {
    const areFieldsValid = [];

    areFieldsValid.push(this.isFieldValid(nameRGEX, this.state.cardholderName, 'cardholderNameError'));
    areFieldsValid.push(this.isFieldValid(cardRGEX, this.state.cardNumber, 'cardNumberError'));
    areFieldsValid.push(this.isFieldValid(expDateRGEX, this.state.expDate, 'expDateError'));
    areFieldsValid.push(this.isFieldValid(cvvRGEX, this.state.cvv, 'cvvError'));

    return areFieldsValid.every(el => el === true);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isFormValid()) {
      this.setState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
        cardholderNameError: null,
        cardNumberError: null,
        expDateError: null,
        cvvError: null
      })
      this.props.changeIsFormSubmitted(true);
    }
  }

  render() {
    if (this.props.isFormSubmitted) {
      return (
        <div className="payment-success">Payment is successful!</div>
      )
    }

    if (!this.props.selectedCountry ||
        this.props.selectedCountry === "empty") {
      return null;
    }

    const isCountrySanctioned = countryCodes.find(countryCode =>
        countryCode === this.props.selectedCountry
    );
    
    const showForm = (isCountrySanctioned)?
      <div className="sorry-msg">We are sorry, the service is not supported at the moment.</div> :
      <form className="payment-form" onSubmit={ this.handleSubmit }>
        <div className="field-control">
          <label htmlFor="cardholderName">Full Name</label>
          <input type="text" id="cardholderName" value={this.state.cardholderName} onChange={ this.handleChange }/>
          { this.state.cardholderNameError && <div className="field-error">{ this.state.cardholderNameError }</div>}
        </div>

        <div className="field-control">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" value={this.state.cardNumber} onChange={ this.handleChange }/>
          { this.state.cardNumberError && <div className="field-error">{ this.state.cardNumberError }</div>}
        </div>

        <div className="field-control">
          <label htmlFor="expDate">Expiration Date</label>
          <input type="text" id="expDate" value={this.state.expDate} onChange={ this.handleChange }/>
          { this.state.expDateError && <div className="field-error">{ this.state.expDateError }</div>}
        </div>
        
        <div className="field-control">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" value={this.state.cvv} onChange={ this.handleChange }/>
          { this.state.cvvError && <div className="field-error">{ this.state.cvvError }</div>}
        </div>
        <button className="submit-form-btn">Submit</button>
      </form>

    return (
      <div className="PaymentForm">{ showForm }</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCountry: state.countries.selectedCountry,
    isFormSubmitted: state.form.isFormSubmitted
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeIsFormSubmitted: (bool) => dispatch(changeIsFormSubmitted(bool))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
