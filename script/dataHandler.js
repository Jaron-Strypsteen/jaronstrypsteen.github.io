const handleData = function(url, callback, method = 'GET', body = null) {
	fetch(url, {
		method: method,
		body: body,
		headers: { 'content-type': 'application/json' }
	})
		.then(function(response) {
			if (!response.ok) {
				throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			callback(jsonObject);
		})
		.catch(function(error) {
			console.error(error);
		});
};
