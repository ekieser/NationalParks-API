'use strict';

const api_key = 'YyQ7clRRUWhfH2oeY88CtZ5WFalJRN2nSDKMrskJ';

const searchURL = 'https://developer.nps.gov/api/v1/parks?api_key=YyQ7clRRUWhfH2oeY88CtZ5WFalJRN2nSDKMrskJ&stateCode=a&limit=10';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function retrieveParks(query, limit=10) {
    const params = {
        key: api_key,
        stateCode: query,
        limit,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    fetch (url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayParks(responseJson))
        .catch(err => {
            $('#js-error-message').text(`There was an error: ${err.message}`);
        });
}

function displayParks(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#display-results').append(
            `<a href='${responseJson.data[i].url}' target="blank"><h3>${responseJson.data[i].name}</h3></a>
            <h4>Location: ${responseJson.data[i].states}</h4>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].directionsUrl}" target="blank">Directions</a>`
        )
    };
}

function startSearch() {
    $('form').submit(event => {
        event.preventDefault();
       $('#display-results').html('');
       $('#js-error-message').html('');
        const searchTerm = $('#state-entry').val();
        const maxResults = $('#results-entry').val();
        retrieveParks(searchTerm, maxResults);
    });
}

$(startSearch);