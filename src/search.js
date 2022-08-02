const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function searchCountries (name)  {
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        });
};

export function onCountryСard({ flags, name, capital, population, languages })  {
    return `
        <div class="country-info__container">
      <div class="country-info__wrapper">
        <img class="country-info__flags" src="${flags.svg}" alt="${name.official}" width="50" />
        <h2 class="country-info__name">${name.official}</h2>
      </div>
      <p class="country-info__capital"><span class="country-info__weight">Capital:</span> ${capital}</p>
      <p class="country-info__population"><span class="country-info__weight">Population:</span> ${population}</p>
      <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
        languages,
      )}</p>
    </div>
    `
}

export function onCountryList({ flags, name }) {
  return `
  <li class="country-list__item">
    <img class="country-list__flags" src="${flags.svg}" alt="${name.official}"width="25" />
    
    <span class="country-list__name">${name.official}</span>
  </li>
  `;
}