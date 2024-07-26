async function get(endpoint, callback, attrs = null) {
	let response = await fetch(endpoint);
	if (!response.ok) {
		throw new Error('Network error !');
	}
	let data = await response.json();
	callback(data, attrs);
}

export { get };
