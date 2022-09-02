"use strict";

//select each element from the DOM
var searchInput = document.querySelector('#search');
var searchButton = document.querySelector('.search');
var searchList = document.getElementById('search-list');
var searchListGroup = document.getElementById('search-list-group');
var newsHeadline = document.getElementById('news-headline');
var newsContent = document.getElementById('news-content');
var searchError = document.getElementById('error');
searchInput.addEventListener('focus', function () {
  searchInput.classList.add('expand');
});
searchInput.addEventListener('blur', function () {
  searchInput.classList.remove('expand');
}); //Use fetch to get top headlines 

var getLatestNews = function getLatestNews(url) {
  fetch(url).then(function (result) {
    return result.json();
  }).then(function (data) {
    console.log(data);
    var articles = data.articles;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _step.value,
            publishedAt = _step$value.publishedAt,
            source = _step$value.source,
            title = _step$value.title,
            _url = _step$value.url,
            urlToImage = _step$value.urlToImage;
        var newsCardGroup = document.querySelector('.news-card-group');
        newsCardGroup.innerHTML += "\n                    <div class=\"news-card\">\n                         <div class=\"news-image\">\n                              <img src=\"".concat(urlToImage, "\" alt=\"\" class=\"image\">\n                         </div>\n                         <div class=\"news-card-title\">\n                              <h2 class=\"title-text\"><a target=_blank href=\"").concat(_url, "\">").concat(title, "</a></h2>\n                         </div>\n                         <div class=\"news-card-timeline\">\n                              <small class=\"card-text\">").concat(publishedAt, "</small>\n                              <small class=\"card-text\">").concat(source.name, "</small>\n                          </div>\n                    </div>\n               ");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
};

getLatestNews('https://newsapi.org/v2/everything?q=medicine&pageSize=12&apiKey=983b7378865f479eb7304932bbce64e7');
searchButton.addEventListener('click', function () {
  var searchText = searchInput.value.trim();
  console.log(searchText);
  var totalSearchResults = document.getElementById('total-results');
  console.log(totalSearchResults);
  searchList.classList.add('show'); // newsHeadline.classList.add('hide');
  // newsContent.classList.add('hide');
  // searchList.classList.add('show');

  var getSearchresults = function getSearchresults(url) {
    fetch(url).then(function (result) {
      return result.json();
    }).then(function (data) {
      console.log(data);
      totalSearchResults.innerText = "\n               Search results for ".concat(searchText, ", total results(").concat(data.totalResults, ")\n               ");
      var articles = data.articles;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = articles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _step2.value,
              publishedAt = _step2$value.publishedAt,
              source = _step2$value.source,
              title = _step2$value.title,
              _url2 = _step2$value.url,
              urlToImage = _step2$value.urlToImage;
          var id = source.id,
              name = source.name;
          searchListGroup.innerHTML += "\n                         <div class=\"news-card\">\n                              <div class=\"news-image\">\n                                   <img src=\"".concat(urlToImage, "\" alt=\"\" class=\"image\">\n                              </div>\n                              <div class=\"news-card-title\">\n                                   <h2 class=\"title-text\"><a target=_blank href=\"").concat(_url2, "\">").concat(title, "</a></h2>\n                              </div>\n                              <div class=\"news-card-timeline\">\n                                   <small class=\"card-text\">").concat(publishedAt, "</small>\n                                   <small class=\"card-text\">").concat(name, "</small>\n                              </div>\n                         </div>\n                    ");
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  };

  getSearchresults("https://newsapi.org/v2/everything?q=".concat(searchText, "&apiKey=983b7378865f479eb7304932bbce64e7"));
});