import { get } from './api.js';

const all_endpoint = 'https://restcountries.com/v3.1/all';

function populateGrid(countries, type = 'all') {
	const countries_cards = document.querySelectorAll('.countries_grid__card');
	countries_cards.forEach((country) => {
		let number = type === 'all' ? 249 : 54;
		let random = Math.floor(Math.random() * number);
		let {
			name: { common },
			flags: { svg },
			population,
			region,
			capital,
		} = countries[random];

		const country_image = country.querySelector(
			'.countries_grid__card-image'
		);
		const loader = country.querySelector('.countries_grid__card-loading');

		const country_name = country.querySelector(
			'.countries_grid__card-name'
		);
		const country_pop = country.querySelector(
			'.countries_grid__card-pop .countries_grid__card-stat'
		);
		const country_reg = country.querySelector(
			'.countries_grid__card-reg .countries_grid__card-stat'
		);
		const country_cap = country.querySelector(
			'.countries_grid__card-cap .countries_grid__card-stat'
		);

		hide_loading(svg, country_image, loader);
		country_image.alt = common;

		country_name.textContent = common;
		country_name.href = `details.html?country=${common}`;

		country_pop.textContent = population.toLocaleString();
		country_reg.textContent = region;
		country_cap.textContent = capital;
	});
}

get(all_endpoint, populateGrid);

function hide_loading(image_src, image_ele, loader) {
	image_ele.src = image_src;
	image_ele.addEventListener('load', (_) => {
		loader.classList.add('hide');
	});
}
// filter btn logic
const filter_btn = document.querySelector('.countries_grid-filter-btn');
const options = document.querySelector('.options');

filter_btn.addEventListener('click', (e) => {
	options.classList.toggle('hide');
});

options.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		filter_btn.innerHTML = `${e.target.textContent} <i class='bx bx-chevron-down'></i>`;
		const region_endpoint = `https://restcountries.com/v3.1/region/${e.target.textContent}`;
		get(region_endpoint, populateGrid, 'region');
	}
});

document.addEventListener('click', (e) => {
	if (e.target !== filter_btn) {
		if (!options.classList.contains('hide')) {
			options.classList.add('hide');
		}
	}
});

// search logic
const searchInput = document.querySelector('.countries_grid-search-input');
const resultsBox = document.querySelector('.countries_grid-search-results-box');
const search_endpoint = `https://restcountries.com/v3.1/name/`;

function debounce(func, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

function fetchData(query) {
	get(search_endpoint, populatBox, query);
}

function populatBox(data) {
	clearResultBox();
	if (data.length > 10) {
		createCards(data, true);
	} else {
		createCards(data);
	}
}
function createCards(data, large = false) {
	let limit = large ? 10 : data.length;
	for (let i = 0; i < limit; i++) {
		const result_anchor = document.createElement('a');
		result_anchor.classList.add('result');
		const image = document.createElement('img');
		let {
			name: { common },
			flags: { svg },
		} = data[i];
		result_anchor.href = `details.html?country=${common}`;
		result_anchor.textContent = common;
		image.src = svg;
		result_anchor.prepend(image);
		resultsBox.append(result_anchor);
	}
}
const debounceFetchData = debounce(fetchData, 100);

searchInput.addEventListener('input', (event) => {
	const query = event.target.value.trim();
	if (query.length === 0) {
		resultsBox.classList.add('hide');
	} else {
		debounceFetchData(query);
		resultsBox.classList.remove('hide');
	}
});

function clearResultBox() {
	resultsBox.innerHTML = ``;
}

searchInput.addEventListener('blur', () => {
	resultsBox.classList.add('hide');
});

searchInput.addEventListener('focus', () => {
	if (searchInput.value.trim().length > 0) {
		resultsBox.classList.remove('hide');
	}
});
