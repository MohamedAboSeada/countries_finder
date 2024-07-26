import { get } from './api.js';

function getCountryName() {
	let search = location.search;
	return search.split('=')[1].split('%20').join(' ');
}
const details_endpoint = `https://restcountries.com/v3.1/name/${getCountryName()}?fullText=true`;

function updateDetails() {
	const big_name = document.querySelector('.name');
	const flag_image = document.querySelector('.flag__image');
	const native_name = document.querySelector('.native_name');
	const population_number = document.querySelector('.population');
	const region_name = document.querySelector('.region');
	const sub_region = document.querySelector('.sub_region');
	const capital_name = document.querySelector('.capital');
	const top_level_name = document.querySelector('.top_level');
	const currencies_cont = document.querySelector('.currencies');
	const borders_cont = document.querySelector('.borders');
	const langs = document.querySelector('.langs');
	const loader = document.querySelector('.countries_grid__card-loading');

	get(details_endpoint, function (x) {
		const {
			name: { common, nativeName },
			flags: { svg },
			population,
			capital,
			region,
			subregion,
			tld: [top_level],
			currencies,
			languages,
		} = x[0];
		hide_loading(svg, flag_image, loader);
		big_name.textContent = common;
		native_name.textContent =
			nativeName[`${Object.keys(nativeName)[0]}`].common;
		capital_name.textContent = capital;
		population_number.textContent = population.toLocaleString();
		region_name.textContent = region;
		sub_region.textContent = subregion;
		top_level_name.textContent = top_level;

		let languages_array = [];
		let crr_array = [];

		Object.keys(currencies).forEach((curreny) => {
			crr_array.push(currencies[curreny].name);
		});
		Object.keys(languages).forEach((lang) => {
			languages_array.push(languages[lang]);
		});

		currencies_cont.textContent = crr_array.join(', ');
		langs.textContent = languages_array.join(', ');
		if (x[0].borders) {
			x[0].borders.forEach((border) => {
				get(
					`https://restcountries.com/v3.1/alpha/${border}?fields=name`,
					function (x) {
						let {
							name: { common: co },
						} = x;
						let list_item = document.createElement('li');
						list_item.classList.add('border__country');
						if (co === 'Israel') {
							list_item.textContent = 'Palestine';
						} else {
							list_item.textContent = co;
						}
						borders_cont.appendChild(list_item);
					}
				);
			});
		} else {
			borders_cont.innerHTML += `<h2>No Borders<h2>`;
		}
	});
}
updateDetails();

function hide_loading(image_src, image_ele, loader) {
	image_ele.src = image_src;
	image_ele.addEventListener('load', (_) => {
		loader.classList.add('hide');
	});
}
