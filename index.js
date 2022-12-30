//select each element from the DOM
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('.search');
const searchList = document.getElementById('search-list')
const searchListGroup = document.getElementById('search-list-group');
const newsHeadline = document.getElementById('news-headline');
const newsContent = document.getElementById('news-content');
const searchError = document.getElementById('error');

searchInput.addEventListener('focus', (e) => {
     searchInput.classList.add('expand')
});

searchInput.addEventListener('blur', (e) => {
     if(e.target.value === "" ) searchInput.classList.remove('expand');
     else e.preventDefault()
});

//Use fetch to get top headlines 

const getLatestNews = (url) => {
     fetch(url)
     .then(result => result.json())
     .then(data => {
          console.log(data);
          let {articles} = data;

          for(let {publishedAt, source, title, url, urlToImage} of articles){

               const newsCardGroup = document.querySelector('.news-card-group');

               newsCardGroup.innerHTML += `
                    <div class="news-card">
                         <div class="news-image">
                              <img src="${urlToImage}" alt="" class="image">
                         </div>
                         <div class="news-card-title">
                              <h2 class="title-text"><a target=_blank href="${url}">${title}</a></h2>
                         </div>
                         <div class="news-card-timeline">
                              <small class="card-text">${publishedAt}</small>
                              <small class="card-text">${source.name}</small>
                          </div>
                    </div>
               `
          }
     });
};

getLatestNews('https://newsapi.org/v2/everything?q=medicine&pageSize=12&apiKey=983b7378865f479eb7304932bbce64e7');

searchButton.addEventListener('click', () => {

     const searchText = searchInput.value.trim();

     console.log(searchText);

     const totalSearchResults = document.getElementById('total-results');

     console.log(totalSearchResults);

     searchList.classList.add('show')

     const getSearchresults = (url) => {
          fetch(url)
          .then(result => result.json())
          .then(data => {
               console.log(data);

               totalSearchResults.innerText = `
               Search results for ${searchText}, total results(${data.totalResults})
               `

               let {articles} = data;

               for(let {publishedAt, source, title, url, urlToImage} of articles){

                    let {id, name} = source

                     searchListGroup.innerHTML += `
                         <div class="news-card">
                              <div class="news-image">
                                   <img src="${urlToImage}" alt="" class="image">
                              </div>
                              <div class="news-card-title">
                                   <h2 class="title-text"><a target=_blank href="${url}">${title}</a></h2>
                              </div>
                              <div class="news-card-timeline">
                                   <small class="card-text">${publishedAt}</small>
                                   <small class="card-text">${name}</small>
                              </div>
                         </div>
                    `
               }
          });
     };

     getSearchresults(`https://newsapi.org/v2/everything?q=${searchText}&apiKey=983b7378865f479eb7304932bbce64e7`)
});