let theme = 'dark';
let themeBtn = document.querySelector('.nav__theme_btn');
let theme_name = document.querySelector('.theme_name');
let theme_icon = themeBtn.querySelector('.bx');

const dark_theme = {
	'--primary-color': 'hsl(207, 26%, 17%)',
	'--secondary-color': 'hsl(209, 23%, 22%)',
	'--text-color': 'hsl(0, 0%, 100%)',
	'--input-color': 'hsl(0, 0%, 70%)',
};

const light_theme = {
	'--primary-color': 'hsl(0, 0%, 93%)',
	'--secondary-color': 'hsl(0, 0%, 97%)',
	'--text-color': 'hsl(200, 15%, 8%)',
	'--input-color': 'hsl(0, 0%, 52%)',
};

if (localStorage.getItem('theme')) {
	theme = localStorage.getItem('theme');
	changeTheme();
} else {
	localStorage.setItem('theme', theme);
	changeTheme();
}

function changeTheme() {
	if (theme === 'light') {
		for (let i in light_theme) {
			setPropertyValue(i, light_theme[i]);
		}
		theme_icon.classList.replace('bx-sun', 'bx-moon');
		theme_name.textContent = 'dark mode';
	} else if (theme === 'dark') {
		for (let i in dark_theme) {
			setPropertyValue(i, dark_theme[i]);
		}
		theme_icon.classList.replace('bx-moon', 'bx-sun');
		theme_name.textContent = 'light mode';
	}
}

function setPropertyValue(var_name, value) {
	document.documentElement.style.setProperty(var_name, value);
}

themeBtn.addEventListener('click', (_) => {
	theme = theme === 'dark' ? 'light' : 'dark';

	changeTheme();
	localStorage.setItem('theme', theme);
});
