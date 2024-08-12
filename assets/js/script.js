function fetchYouTubeVideos(query) {
    const apiKey = 'AIzaSyAZQxBxJRTVW5bNFyFSHAj-xF8GBWF3NQ4';
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
    const url = baseUrl + '&q=' + encodeURIComponent(query) + '&key=' + apiKey + '&type=video';
    
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                return [];
            }
            return response.json();
        })
        .then(function(data) {
            return data.items || [];
        })
        .catch(function(error) {
            return [];
        });
}

function fetchWikipediaArticles(query) {
    const apiKey = 'WIKI API KEY PSEUDOCODE';
    const baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro&explaintext&redirects=1';
    const url = baseUrl + '&titles=' + encodeURIComponent(query) + '&utf8=1&formatversion=2&apikey=' + apiKey;
    
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                return [];
            }
            return response.json();
        })
        .then(function(data) {
            return data.query.pages || [];
        })
        .catch(function(error) {
            return [];
        });
}
