//select each element from the DOM
const searchInput = document.querySelector('#search');
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const searchList = document.getElementById('search-list');
const searchListGroup = document.getElementById('search-list-group');
const newsHeadline = document.getElementById('news-headline');
const newsContent = document.getElementById('news-content');
const searchError = document.getElementById('error');
const menuBtn = document.querySelector('.bars');

let search = false,
showSearch = false;

menuBtn.addEventListener('click', (e)=>{
     searchBox.classList.toggle('open-search');
});

searchInput.addEventListener('focus', (e) => {
     if (!search){
          search = !search;
          searchInput.classList.add('expand');
          searchBox.classList.add('expand');
          searchButton.classList.add('expand');
     }

     if(window.screen.width <= 768){
          searchInput.classList.remove('expand');
          searchBox.classList.remove('expand');
     }
});

searchInput.addEventListener('blur', (e) => {
     search = false
     if(e.target.value === "" ){
          searchInput.classList.remove('expand');
          searchBox.classList.remove('expand');
          searchButton.classList.remove('expand');
     }
     else e.preventDefault()
});

const getLatestNews = (url) => {
     fetch(url)
     .then(result => result.json())
     .then(data => {
          let {articles} = data;

          for(let {publishedAt, source, title, url, urlToImage} of articles){

               const newsCardGroup = document.querySelector('.news-card-group');

               newsCardGroup.innerHTML += `
                    <div class="news-card">
                         <div class="news-image">
                              <img src="${urlToImage}" alt="photo" class="image">
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

searchButton.addEventListener('click', (e) => {

     const searchText = searchInput.value.trim();

     if(searchText === '' && !search){
          search = !search;
          searchInput.classList.add('expand');
          searchBox.classList.add('open-search')
          searchBox.classList.add('expand')
     }
     else if(searchText !== ''){
          search = true
     }
     else {
          search = false
          searchInput.classList.remove('expand')
          searchBox.classList.remove('open-search')
          searchBox.classList.add('expand')
     }

     const totalSearchResults = document.getElementById('total-results');

     searchList.classList.add('show')

     const getSearchresults = (url) => {
          fetch(url)
          .then(result => result.json())
          .then(data => {

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

     getSearchresults(`https://newsapi.org/v2/everything?q=${searchText}&apiKey=983b7378865f479eb7304932bbce64e7`);
});