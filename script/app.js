'use strict';
let URL = 'https://api-gateway-ext-prod-ue1-1080259533.us-east-1.elb.amazonaws.com/3/';
let APIKEY = 'e507d3248450fb3a50a8a5a71e28a272';
let domPopularMovies, domTopRatedMovies, domTrendingMovies, domMain;
let domModal;
const addPopularMovies = function(el) {
	const div = document.createElement('div');
	div.innerHTML = `<div class="o-list c-movies__item" data-movie_id="${el.id}" onmouseover="showHover(${el.id});" onmouseout="hideHover(${el.id});" onclick="modalOpen(this);">
    <div class="c-grid-element1"><div>${el.title}</div><p id="${el.id}" class="c-movies__item_details"><i class="fas fa-calendar"></i>${el.release_date.slice(
		0,
		4
	)} &#8226; <i class="fas fa-star"></i>${el.vote_average}</p></div>
    <img class="c-grid-element2" src="https://image.tmdb.org/t/p/w154/${el.poster_path}" alt="${el.title}">
	</div>`;
	domPopularMovies.appendChild(div);
};
const addTopRatedMovies = function(el) {
	const div = document.createElement('div');
	div.innerHTML = `<div class="o-list c-movies__item" data-movie_id="${el.id}" onmouseover="showHover(${el.id});" onmouseout="hideHover(${el.id});" onclick="modalOpen(this);">
    <div class="c-grid-element1"><div>${el.title}</div><p id="${el.id}" class="c-movies__item_details"><i class="fas fa-calendar"></i>${el.release_date.slice(
		0,
		4
	)} &#8226; <i class="fas fa-star"></i>${el.vote_average}</p></div>
    <img class="c-grid-element2" src="https://image.tmdb.org/t/p/w154/${el.poster_path}" alt="${el.title}">
	</div>`;
	domTopRatedMovies.appendChild(div);
};
const addTrendingMovies = function(el) {
	const div = document.createElement('div');
	div.innerHTML = `<div class="o-list c-movies__item" data-movie_id="${el.id}" onmouseover="showHover(${el.id});" onmouseout="hideHover(${el.id});" onclick="modalOpen(this);">
    <div class="c-grid-element1"><div>${el.title}</div><p id="${el.id}" class="c-movies__item_details"><i class="fas fa-calendar"></i>${el.release_date.slice(
		0,
		4
	)} &#8226; <i class="fas fa-star"></i>${el.vote_average}</p></div>
    <img class="c-grid-element2" src="https://image.tmdb.org/t/p/w154/${el.poster_path}" alt="${el.title}">
	</div>`;
	domTrendingMovies.appendChild(div);
};
const addSearch = function(el) {
	const searchComponent = document.querySelector('.c-search-movies');
	const div = document.createElement('div');
	if (el.poster_path != null) {
		div.innerHTML = `<div class="o-list c-movies__item" data-movie_id="${el.id}" onmouseover="showHover(${el.id});" onmouseout="hideHover(${el.id});" onclick="modalOpen(this);">
    <div class="c-grid-element1"><div>${el.title}</div><p id="${el.id}" class="c-movies__item_details"><i class="fas fa-calendar"></i>${el.release_date.slice(
			0,
			4
		)} &#8226; <i class="fas fa-star"></i>${el.vote_average}</p></div>
    <img class="c-grid-element2" src="https://image.tmdb.org/t/p/w154/${el.poster_path}" alt="${el.title}">
	</div>`;
	} else {
		div.innerHTML = `<div class="o-list c-movies__item" data-movie_id="${el.id}" onmouseover="showHover(${el.id});" onmouseout="hideHover(${el.id});" onclick="modalOpen(this);">
    <div class="c-grid-element1"><div>${el.title}</div><p id="${el.id}" class="c-movies__item_details"><i class="fas fa-calendar"></i>${el.release_date.slice(
			0,
			4
		)} &#8226; <i class="fas fa-star"></i>${el.vote_average}</p></div>
	</div>`;
	}

	searchComponent.appendChild(div);
};
const showHover = function(el) {
	const detail = document.getElementById(el);
	detail.style.display = 'block';
};
const hideHover = function(el) {
	const detail = document.getElementById(el);
	detail.style.display = 'none';
};
const fillPopularMovies = function(jsonObject) {
	domPopularMovies.innerHTML = ' ';
	for (const el of jsonObject.results) {
		addPopularMovies(el);
	}
};
const fillTrendingMovies = function(jsonObject) {
	domTrendingMovies.innerHTML = ' ';
	for (const el of jsonObject.results) {
		addTrendingMovies(el);
	}
};
const fillTopRatedMovies = function(jsonObject) {
	domTopRatedMovies.innerHTML = ' ';
	for (const el of jsonObject.results) {
		addTopRatedMovies(el);
	}
};
const fillSearch = function(jsonObject) {
	domMain.innerHTML = '<h2>Search</h2><div class="c-search-movies c-movies"></div>';
	for (const el of jsonObject.results) {
		addSearch(el);
	}
};
const fillDetails = function(jsonObject) {
	const backdrop = document.querySelector('.c-backdrop');
	backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${jsonObject.backdrop_path})`;
	const content = document.querySelector('.c-modal_content');
	const movieDetails = document.createElement('div');
	movieDetails.innerHTML = ``;
	movieDetails.innerHTML += `<div class="c-modal_content__top"><div class="c-modal_content__title">${jsonObject.title}</div></div>
	<div class="c-modal-content__small-details"><i class="fas fa-calendar"></i>${jsonObject.release_date} &#8226; <i class="fas fa-star"></i>${jsonObject.vote_average} &#8226; <i class="fas fa-clock"></i>${jsonObject.runtime}min</div>`;
	movieDetails.innerHTML += `<div class="c-modal_content__overview"><h3>Overview</h3>${jsonObject.overview}</div>`;
	let genresHtml = '';
	let genre = '';
	for (const genreItem of jsonObject.genres) {
		genre += `<div class="c-modal_content__genre">${genreItem.name}</div>`;
	}
	genresHtml = `<div class="c-modal_content__genres"><h3>Genres</h3><div class="c-model-content__genres-line">${genre}</div></div>`;
	movieDetails.innerHTML += genresHtml;
	let prodHtml = '';
	let prod = '';
	for (const prodItem of jsonObject.production_companies) {
		if (prodItem.logo_path == null) {
			prod += `<div class="c-modal_content__prod">${prodItem.name}</div>`;
		} else {
			prod += `<div class="c-modal_content__prod"><img src="https://image.tmdb.org/t/p/w154/${prodItem.logo_path}" alt="${prodItem.name}"><div class="c-prod-name">${prodItem.name}</div></div>`;
		}
	}
	prodHtml = `</div><div class="c-modal_content__prods"><h3>Production Companies</h3><div class="c-model-content__prods-line">${prod}</div></div>`;
	movieDetails.innerHTML += prodHtml;
	showMovieCast(jsonObject.id);
	let castHtml = '';
	castHtml = `</div><div class="c-modal_content__casts"><h3>Cast</h3><div class="c-model-content__casts-line"></div></div>`;
	movieDetails.innerHTML += castHtml;
	movieDetails.innerHTML += `</div></div>`;
	content.appendChild(movieDetails);
};
const fillCast = function(jsonObject) {
	let cast = '';
	const castHtml = document.querySelector('.c-model-content__casts-line');
	for (const castItem of jsonObject.cast.slice(0, 15)) {
		if (castItem.profile_path == null) {
			cast += `<div class="c-modal_content__cast"><div class="c-model-content__casts-name">${castItem.name}</div><div class="c-modal_content__cast_character">${castItem.character}</div></div>`;
		} else {
			cast += `<div class="c-modal_content__cast"><img src="https://image.tmdb.org/t/p/w154/${castItem.profile_path}"><div>${castItem.name}</div><div class="c-modal_content__cast_character">${castItem.character}</div></div>`;
		}
	}
	castHtml.innerHTML += cast;
};
const showPopularMovies = function() {
	handleData(`${URL}movie/popular?api_key=${APIKEY}&language=en-US&page=1`, fillPopularMovies, 'GET');
};
const showTopRatedMovies = function() {
	handleData(`${URL}movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`, fillTopRatedMovies, 'GET');
};
const showTrendingMovies = function() {
	handleData(`${URL}trending/movie/day?api_key=${APIKEY}&language=en-US&page=1`, fillTrendingMovies, 'GET');
};
const showMovieDetail = function(id) {
	handleData(`${URL}movie/${id}?api_key=${APIKEY}&language=en-US`, fillDetails, 'GET');
};
const showMovieCast = function(id) {
	handleData(`${URL}movie/${id}/credits?api_key=${APIKEY}&language=en-US`, fillCast, 'GET');
};
const showSearch = function(query) {
	handleData(`${URL}search/movie/?api_key=${APIKEY}&language=en-US&query=${query}&page=1`, fillSearch, 'GET');
};
const modalOpen = function(el) {
	showMovieDetail(el.dataset.movie_id);
	domModal.style.display = 'block';
};
const handleSearch = function() {
	const navMovies = document.querySelector(`.c-nav-movies`);
	navMovies.classList.add('is-selected');
	const navGraph = document.querySelector(`.c-nav-graph`);
	navGraph.classList.remove(`is-selected`);
	const searchQuery = document.querySelector('input[name="search"]');
	showSearch(searchQuery.value);
};
const modalClose = function() {
	document.querySelector(`.close`).addEventListener(`click`, function() {
		domModal.innerHTML = `<div class="c-modal_content">
		<span class="close" onclick="modalClose();">&times;</span>
		<div class="c-backdrop"></div>
	</div>`;
		domModal.style.display = 'none';
	});
	domModal.innerHTML = `<div class="c-modal_content">
		<span class="close" onclick="modalClose();">&times;</span>
		<div class="c-backdrop"></div>
	</div>`;
	domModal.style.display = 'none';
};
const showGraph = function(data) {
	const navMovies = document.querySelector(`.c-nav-movies`);
	navMovies.classList.remove('is-selected');
	const navGraph = document.querySelector(`.c-nav-graph`);
	navGraph.classList.add(`is-selected`);
	domMain.innerHTML =
		'<h2>Popularity of movies</h2><canvas id="popularityChart" class="c-graph"></canvas></div><h2>Movie votes</h2><canvas id="votesChart" class="c-graph"></canvas></div>';
	let converted_popularity = [];
	let converted_labels = [];
	for (const movie of data.results) {
		converted_labels.push(movie.title);
		converted_popularity.push(movie.popularity);
	}
	let converted_votes = [];
	let converted_label_votes = [];
	let converted_vote_count = [];
	for (const movie of data.results) {
		converted_label_votes.push(movie.title);
		converted_votes.push(movie.vote_average * 1000);
		converted_vote_count.push(movie.vote_count);
	}
	var ctxPopular = document.getElementById('popularityChart').getContext('2d');
	Chart.defaults.global.defaultFontColor = 'white';
	Chart.defaults.scale.gridLines.color = '#999';
	var popularityChart = new Chart(ctxPopular, {
		type: 'line',
		data: {
			labels: converted_labels,
			datasets: [
				{
					label: 'Popularity',
					borderColor: '#e4177d',
					backgroundColor: '#131C24',
					data: converted_popularity
				}
			]
		},
		options: {
			scaleShowValues: true,
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				],
				xAxes: [
					{
						ticks: {
							autoSkip: false
						}
					}
				]
			}
		}
	});
	var ctxVotes = document.getElementById('votesChart').getContext('2d');
	Chart.defaults.global.defaultFontColor = 'white';
	Chart.defaults.scale.gridLines.color = '#999';
	var votesChart = new Chart(ctxVotes, {
		type: 'line',
		data: {
			labels: converted_label_votes,
			datasets: [
				{
					label: 'Vote count',
					borderColor: '#e4177d',
					data: converted_vote_count
				},
				{
					label: 'Average Votes',
					borderColor: '#351bc9',
					data: converted_votes
				}
			]
		},
		options: {
			scaleShowValues: true,
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				],
				xAxes: [
					{
						ticks: {
							autoSkip: false
						}
					}
				]
			}
		}
	});
};
const refresh = function() {
	const navMovies = document.querySelector(`.c-nav-movies`);
	navMovies.classList.add('is-selected');
	const navGraph = document.querySelector(`.c-nav-graph`);
	navGraph.classList.remove(`is-selected`);
	domMain.innerHTML = `<h2>Popular</h2>
	<div class="c-popular c-movies"></div>
	<h2>Top Rated</h2>
	<div class="c-TopRated c-movies"></div>
	<h2>Trending</h2>
	<div class="c-trending c-movies"></div>`;
	init();
};
const init = function() {
	domPopularMovies = document.querySelector('.c-popular');
	domTopRatedMovies = document.querySelector('.c-TopRated');
	domTrendingMovies = document.querySelector('.c-trending');
	domMain = document.querySelector('.c-app__main');
	domModal = document.querySelector('.c-modal');
	showPopularMovies();
	showTopRatedMovies();
	showTrendingMovies();
	modalClose();
	document.querySelector(`.c-search__input`).addEventListener(`keyup`, handleSearch);
	document.querySelector(`.c-graph`).addEventListener(`click`, function() {
		handleData(`${URL}movie/popular?api_key=${APIKEY}&language=en-US&page=1`, showGraph, 'GET');
	});
};
window.onclick = function(event) {
	if (event.target == domModal) {
		domModal.innerHTML = `<div class="c-modal_content">
		<span class="close" onclick="modalClose();">&times;</span>
		<div class="c-backdrop"></div>
	</div>`;
		domModal.style.display = 'none';
	}
};
document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM loaded');
	init();
});
