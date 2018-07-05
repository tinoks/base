import './searchInput.css';
const navLeft = document.getElementsByClassName('nav left')[0];

let searchInput = document.createElement('input');
	searchInput.id = "searchInput";
	searchInput.setAttribute("type", "search");
	searchInput.setAttribute("placeholder", "type to search..");
	navLeft.appendChild(searchInput);
