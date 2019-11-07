'use strict'

const apiKey = 'mSH2ZqtJB1fZCsVle7AaZeamJpG1OdzFImAH6yVS'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#search-state').val();
      const maxResults = $('#max-results').val();
      getList(searchTerm, maxResults);
    });
  };

  function formatQueryParams(params) {
      const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
      return queryItems.join('&');
  };

  function getList(query, maxResults) {
      const params = {
        api_key: apiKey,
        q: query
      };
      const queryString = formatQueryParams(params);
      const url = searchURL + "?" + queryString;
      console.log(url);

      fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
          $('.error').empty()
            $('.error').append(`Something went wrong: ${err.message}`);
        });
  };

  function displayResults(responseJson, maxResults=10) {
      console.log(responseJson);
      $('.results-list').empty();
      for (let i=0; i < maxResults & i <responseJson.data.length; i++) {
        console.log(`${responseJson.data}`);
        console.log(`${responseJson.data[i]}`)
        console.log(`${responseJson.data[i].fullName}`)
        $('.results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p> Click <a href="${responseJson.data[i].url}" target="_blank">here</a> to go to the website of the park</p>
            </li>`
        )
      };
      $('.results').removeClass('hidden');
  };
$(watchForm)