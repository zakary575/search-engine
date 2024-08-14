const searchBox = document.querySelector("#search-bar");

function fetchYouTubeVideos(query) {
  const apiKey = "AIzaSyAZQxBxJRTVW5bNFyFSHAj-xF8GBWF3NQ4";
  const baseUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet";
  const url = baseUrl + "&q=" + encodeURIComponent(query) + "&key=" +  apiKey + "&type=video";
        
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .then(function (data) {
      return data.items || [];
    })
    .catch(function (error) {
      return [];
    });
}

function fetchWikipediaArticles(query) {
  const baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages&exintro&explaintext&piprop=original&redirects=1&utf8=1&formatversion=2';
  const url = baseUrl + '&titles=' + encodeURIComponent(query);

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .then(function (data) {
      if (data.query && data.query.pages) {
        return data.query.pages.map(function (page) {
          return {
            title: page.title,
            index: page.index || null,
            extract: page.extract || '',
            image: page.original ? page.original.source : null
          };
        });
      } else {
        return [];
      }
    })
    .catch(function (error) {
      return [];
    });
}

$(function () {
  $("#dialog").dialog({ autoOpen: false });
});

function valueCheck() {
  if (searchBox.value.trim() === "") {
    $("#dialog").dialog("open");
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (!valueCheck()) {
    return;
  }
  const query = searchBox.value.trim();
  fetchYouTubeVideos(query).then(function (videos) {
    console.log(videos);
  });
  fetchWikipediaArticles(query).then(function (articles) {
    console.log(articles);
  });
});
