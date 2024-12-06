/* eslint-disable indent */
/* eslint-disable no-undef */
import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register.js';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';


const app = new App({
  button: document.querySelector('.hamburger'),
  drawer: document.querySelector('.nav-items'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

import('lodash.filter')
  .then((module) => module.default)
  .then(filterContacts)
  .catch((error) => alert(error));

  const filterContacts = (filter) => {
    filter(contacts, contactType.value === 'all' ? {} : { type: contactType.value })
      .forEach(renderContact);
  };