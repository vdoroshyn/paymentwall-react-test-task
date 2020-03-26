import React, { Component } from 'react';
import './App.css';
import CountrySelector from './components/CountrySelector/CountrySelector';
import PaymentForm from './components/PaymentForm/PaymentForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountrySelector />
        <PaymentForm />
      </div>
    )
  }
}

export default App;
