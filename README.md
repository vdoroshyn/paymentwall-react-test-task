Goal:
Create countrySelector and paymentForm components.

countrySelector component requirements:
* Countries should be fetched from https://restcountries.eu/ API;
* countries should be stored in Redux;
* countrySelector should be a select element where option value would be country alpha2Code and option text would be country name;
* on select change, the value should be passed to the paymentForm component.

paymentForm component requirements:
* if a country is in the sanctioned countries list – show the message "We are sorry, the service is not supported at the moment.";
* if a country is not in the sanctioned countries list – show the form with the following input fields and a submit button:
  * cardholder name (characters and spaces);
  * card number (numbers and spaces);
  * exp. date (numbers, spaces and "/");
  * CVV (numbers, length between 3 and 4 digits).
* form should be validated on submit;
* if the form is valid show the message "Payment is successful".