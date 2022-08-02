import './css/styles.css';
import { searchCountries } from './search';
import { onCountryСard, onCountryList } from './search';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
    
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info'); 

inputEl.addEventListener('focus', () => {
    inputEl.style.width = '400px';
    inputEl.style.transition = 'width linear 300ms';
})

inputEl.addEventListener('blur', () => {
        inputEl.style.width = '350px';
});
inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
    const searchQuery = inputEl.value.trim();
    if (searchQuery === '') {
        countryInfoEl.innerHTML = '';
        listEl.innerHTML = '';
        return;
    }
    searchCountries(searchQuery)
        .then(data => {
            if (data.length > 10) {
                Notify.success('Too many matches found. Please enter a more specific name.');
                listEl.innerHTML = '';
                countryInfoEl.innerHTML = '';
                return;
            }
            if (data.length <= 10) {
                const searchList = data.map(country => onCountryList(country));
                listEl.innerHTML = searchList.join('')
                countryInfoEl.innerHTML = '';
            }
            if (data.length === 1) {
                const listEl = data.map(country => onCountryCard(country));
                countryInfoEl.innerHTML = listEl.join('')
                listEl.innerHTML = '';
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
            countryInfoEl.innerHTML = '';
            listEl.innerHTML = '';
            return error;
        })
};
//   searchCountries(searchQuery)
//     .then(data => {
//       if (data.length > 10) {
//         Notify.success('Too many matches found. Please enter a more specific name.');
//         countryInfoEl.innerHTML = '';
//         listEl.innerHTML = '';
//         return;
//       }

//       if (data.length <= 10) {
//         const listMarkup = data.map(country => onCountryList(country));
//         listEl.innerHTML = listMarkup.join('');
//         countryInfoEl.innerHTML = '';
//       }

//       if (data.length === 1) {
//         const markup = data.map(country => onCountryСard(country));
//         countryInfoEl.innerHTML = markup.join('');
//         listEl.innerHTML = '';
//       }
//     })
//     .catch(error => {
//       Notify.failure('Oops, there is no country with that name');
//       countryInfoEl.innerHTML = '';
//       listEl.innerHTML = '';
//       return error;
//     });
// }