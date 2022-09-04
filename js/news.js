const loadNewsCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
};

//-----display-category--------
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = ``;
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <a href="#" class='show-news' onclick="getNews('${category.category_id}')" class='text-decoration-none'>${category.category_name}</a>
        `;
    categoriesContainer.appendChild(categoryDiv);
    categoriesContainer.classList.add("text-decoration-none");
  });
};

const displayNewsCategories = loadNewsCategories();

function getNews(cat_id) {
  const loadNewsByCategories = async () => {
    const caturl = `https://openapi.programming-hero.com/api/news/category/${cat_id}`;
    const catres = await fetch(caturl);
    const newdata = await catres.json();

    displayNewsByCat(newdata.data);
  };

  const displayNewsByCategories = loadNewsByCategories();
}

const loadDefaultNewsByCategories = async () => {
  const decaturl = `https://openapi.programming-hero.com/api/news/category/01`;
  const decatres = await fetch(decaturl);
  const dedata = await decatres.json();

  displayNewsByCat(dedata.data);
};

const displayDefaultNewsByCategories = loadDefaultNewsByCategories();

const displayNewsByCat = (catnews) => {
  const newslistContainer = document.getElementById("newsList");
  newslistContainer.innerHTML = ``;
  catnews.forEach((news) => {
    let newstitle = news.title;
    let newsid = news._id;
    let newsurl = `https://openapi.programming-hero.com/api/news/${news._id}`;
    let newsviews = news.total_view;
    let newsrating = news.rating.number;
    let thumbnail_url = news.thumbnail_url;
    let newsdetails = news.details;
    let newsauther = news.author.name;
    let newsautherImg = news.author.img;
    let newsautherDate = news.author.published_date;

    const newsListDiv = document.createElement("div");
    newsListDiv.classList.add("row");
    newsListDiv.classList.add("mb-5");
    newsListDiv.classList.add("align-items-center");
    newsListDiv.classList.add("shadow");
    newsListDiv.classList.add("p-3");
    newsListDiv.innerHTML = `
      <div class="col-4">
      <img src="${thumbnail_url}" class="img-thumbnail rounded"" alt="image">
  </div>
  <div class="col-8">
      <div>
          <h4 class="fw-bold">${newstitle}</h4>
      </div>
      <div>
          <p>
             ${newsdetails} 
          </p>
      </div>
     <div>
     <div class="d-flex justify-content-between align-items-center">
  			<div class="d-inline-flex align-items-center">
                <img src="${newsautherImg}" alt="Auther" class="rounded-circle me-2" width="50" height="50"/>
                <div>
                <p class="mb-0">${newsauther}</p>
                <p class="mb-0">${newsautherDate}</p>
                </div>
            </div>
  			<div><i class="fas fa-eye"></i> ${newsviews}</div>
  			<div>Rating : ${newsrating}</div>
			</div>
     </div>
  </div>
  `;
    newslistContainer.appendChild(newsListDiv);
  });
};
