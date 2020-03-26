import React, { Component } from 'react';
import './App.css';
import CountrySelector from './components/CountrySelector';
import PaymentForm from './components/PaymentForm';

class App extends Component {
  render() {
    return (
      <div>
        <CountrySelector />
        <PaymentForm />
      </div>
    )
  }
}

export default App;
