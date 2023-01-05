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
     search = !search
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

const getLatestNews = async (url) => {
     try{
          const response = await fetch(url)

          if(response.ok){
               const {data} = await response.json();

               for(let {author, imageUrl, time, title, url} of data){

                    const newsCardGroup = document.querySelector('.news-card-group');
     
                    newsCardGroup.innerHTML += `
                         <div class="news-card">
                              <div class="news-image">
                                   <img src="${imageUrl}" alt="photo" class="image">
                              </div>
                              <div class="news-card-title">
                                   <h2 class="title-text"><a target=_blank href="${url}">${title}</a></h2>
                              </div>
                              <div class="news-card-timeline">
                                   <small class="card-text">${time}</small>
                                   <small class="card-text">${author}</small>
                               </div>
                         </div>
                    `
               }
          }
          else{
               throw new Error('There was an error while fetching news')
          }
     }
     catch(error){
          throw new Error(`Something went wrong: ${error}`)
     }
};

getLatestNews(`https://inshorts.deta.dev/news?category=all`);

searchButton.addEventListener('click', (e) =>{
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

     const getSearchresults = async (url)=>{
          try{
               const response = await fetch(url);
               if(response.ok){
                    const { data } = await response.json();

                    searchList.classList.add('show');

                    totalSearchResults.innerHTML = `Search results for ${searchText}, total results(${data.length})`

                    data.map(({author, imageUrl, time, title, url})=>{
                         searchListGroup.innerHTML += `

                         <div class="news-card">
                              <div class="news-image">
                                   <img src="${imageUrl}" alt="" class="image">
                              </div>
                              <div class="news-card-title">
                                   <h2 class="title-text"><a target=_blank href="${url}">${title}</a></h2>
                              </div>
                              <div class="news-card-timeline">
                                   <small class="card-text">${time}</small>
                                   <small class="card-text">${author}</small>
                              </div>
                         </div>
                         `
                    })
                    search = false
               }
          }catch(error){
               throw new Error(`Something went Wrong: ${error}`)
          }
     }

     getSearchresults(`https://inshorts.deta.dev/news?category=${searchText}`)
})