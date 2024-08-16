const searchBox = document.querySelector("#search-bar");
const wiki = document.querySelector("#wiki-results");
const youtube = document.querySelector("#youtube-results");

function fetchYouTubeVideos(query) {
  const apiKey = "AIzaSyAZQxBxJRTVW5bNFyFSHAj-xF8GBWF3NQ4";
  const baseUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet";
  const url =
    baseUrl +
    "&q=" +
    encodeURIComponent(query) +
    "&key=" +
    apiKey +
    "&type=video";

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
  const baseUrl =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages&exintro&explaintext&piprop=original&redirects=1&utf8=1&formatversion=2";
  const url = baseUrl + "&titles=" + encodeURIComponent(query);

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
            extract: page.extract || "",
            image: page.original ? page.original.source : null,
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

function wikiResults(articles) {
  wiki.innerHTML = "";

  const resultsBody = document.createElement("div");
  wiki.append(resultsBody);

  const titleEl = document.createElement("h3");
  titleEl.textContent = articles[0].title;

  const bodyContentEl = document.createElement("p");
  bodyContentEl.textContent = articles[0].extract;

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", articles[0].image);
  imgEl.style.width = "400px";
  imgEl.style.height = "400px";
  imgEl.style.objectFit = "cover";

  resultsBody.append(titleEl, bodyContentEl, imgEl);
}

function youtubeResults(videos) {
  youtube.innerHTML = "";

  for (let i = 0; i < videos.length; i++) {
    const resultBody = document.createElement("div");
    youtube.append(resultBody);

    const titleEl = document.createElement("h3");
    titleEl.textContent = videos[i].snippet.title;

    const descriptionEl = document.createElement("p");
    descriptionEl.textContent = videos[i].snippet.description;

    const videoEl = document.createElement("iframe");
    videoEl.setAttribute("src", `https://www.youtube.com/embed/${videos[i].id.videoId}?autoplay=1&mute=1`);
    videoEl.setAttribute('width',420)
    videoEl.setAttribute('height',315)

    resultBody.append(titleEl, descriptionEl, videoEl);
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (!valueCheck()) {
    return;
  }
  const query = searchBox.value.trim();
  fetchYouTubeVideos(query).then(function (videos) {
    console.log(videos);
    youtubeResults(videos);
    localStorage.setItem('youtube', JSON.stringify(videos));
  });
  fetchWikipediaArticles(query).then(function (articles) {
    console.log(articles);
    wikiResults(articles);
    localStorage.setItem('wiki', JSON.stringify(articles));
  });
});


function init(){
  const videos = JSON.parse(localStorage.getItem('youtube'))
  const articles = JSON.parse(localStorage.getItem('wiki'))
  youtubeResults(videos)
  wikiResults(articles)
}

init()