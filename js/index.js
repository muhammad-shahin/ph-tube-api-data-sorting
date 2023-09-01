let currentCategoryId = '';
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  showCategoryButtons(data.data);
};
const showCategoryButtons = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.textContent = "";

  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList = `bg-gray-200 text-xl px-5 py-2 rounded font-medium`;
    categoryBtn.id = category.category_id;
    categoryBtn.setAttribute(
      "onclick",
      "loadVideos('" + category.category_id + "')"
    );
    categoryBtn.innerText = category.category;
    categoryContainer.appendChild(categoryBtn);
  });
  loadVideos(categories[0].category_id);
};
// sort by views
const sortByViewBtn = document.getElementById('sort-by-view-btn');
sortByViewBtn.addEventListener('click', function(){
  loadVideos(currentCategoryId, true);
})
const loadVideos = async (categoryId, isSorted = false) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const unsortedVideos = data.data;
  currentCategoryId = categoryId;
  if (categoryId === "1000") {
    document.getElementById(categoryId).style.backgroundColor = "#FF1F3D";
    document.getElementById(categoryId).style.color = "#FFFFFF";
    document.getElementById("1001").style.color = "#000000";
    document.getElementById("1001").style.backgroundColor = "#E5E7EB";
    document.getElementById("1003").style.color = "#000000";
    document.getElementById("1003").style.backgroundColor = "#E5E7EB";
    document.getElementById("1005").style.color = "#000000";
    document.getElementById("1005").style.backgroundColor = "#E5E7EB";
  } else if (categoryId === "1001") {
    document.getElementById(categoryId).style.backgroundColor = "#FF1F3D";
    document.getElementById(categoryId).style.color = "#FFFFFF";
    document.getElementById("1000").style.color = "#000000";
    document.getElementById("1000").style.backgroundColor = "#E5E7EB";
    document.getElementById("1003").style.color = "#000000";
    document.getElementById("1003").style.backgroundColor = "#E5E7EB";
    document.getElementById("1005").style.color = "#000000";
    document.getElementById("1005").style.backgroundColor = "#E5E7EB";
  } else if (categoryId === "1003") {
    document.getElementById(categoryId).style.backgroundColor = "#FF1F3D";
    document.getElementById(categoryId).style.color = "#FFFFFF";
    document.getElementById("1001").style.color = "#000000";
    document.getElementById("1001").style.backgroundColor = "#E5E7EB";
    document.getElementById("1000").style.color = "#000000";
    document.getElementById("1000").style.backgroundColor = "#E5E7EB";
    document.getElementById("1005").style.color = "#000000";
    document.getElementById("1005").style.backgroundColor = "#E5E7EB";
  } else if (categoryId === "1005") {
    document.getElementById(categoryId).style.backgroundColor = "#FF1F3D";
    document.getElementById(categoryId).style.color = "#FFFFFF";
    document.getElementById("1001").style.color = "#000000";
    document.getElementById("1001").style.backgroundColor = "#E5E7EB";
    document.getElementById("1003").style.color = "#000000";
    document.getElementById("1003").style.backgroundColor = "#E5E7EB";
    document.getElementById("1000").style.color = "#000000";
    document.getElementById("1000").style.backgroundColor = "#E5E7EB";
  }
  
  if (data.status === true) {
    if(isSorted === true){
      const sortedVideos = unsortedVideos.sort(sortData);
      showVideos(sortedVideos);
    }else{
      showVideos(unsortedVideos);
    }
    
  } else if (data.status === false) {
    dataNotFound();
  }
};
// show videos in ui
const showVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.classList = [];
  videoContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`;
  videoContainer.textContent = "";
  videos.forEach((video) => {
    const thumbnail = video.thumbnail;
    const title = video.title;
    const authorName = video.authors[0].profile_name;
    const authorProfilePic = video.authors[0].profile_picture;
    let verified = video.authors[0].verified;
    let postedDate = video.others.posted_date;
    const views = video.others.views;
    if (verified === false || verified === "") {
      verified = "";
    } else {
      verified = "images/verified.svg";
    }
    if (postedDate === "") {
      postedDate = "";
    } else {
      const hours = Math.floor(postedDate / 3600);
      const minutes = Math.floor((postedDate % 3600) / 60);
      postedDate = `${hours} hrs ${minutes} min ago`;
    }
    const videoCard = document.createElement("div");
    videoCard.classList = `space-y-3`;
    videoCard.innerHTML = `
        <div class="relative">
            <img class="rounded-lg w-full h-[12.5rem]" src="${thumbnail}" />
            <p class="posted-time absolute bottom-3 p-1 right-4 bg-black text-white text-[14px] rounded">${postedDate}</p>
          </div>
          <div class="flex justify-start items-center gap-3">
          <div class=""><img class="w-10 h-10 rounded-full" src="${authorProfilePic}"/></div>
            
            <h4 class="font-bold">
            ${title}
            </h4>
          </div>
          <div class="flex justify-start items-center gap-3">
            <p class="text-gray-500 text-[14px]">${authorName}</p>
            <img class="w-5" src="${verified}" />
          </div>
          <p class="text-gray-500 text-[14px]">${views} Views</p>
        `;
    videoContainer.appendChild(videoCard);
  });
  // remove padding if post duration value is null
  const durationCheck = document.querySelectorAll(".posted-time");
  durationCheck.forEach((element) => {
    if (element.innerText === "") {
      element.classList.remove("p-1");
    }
  });
};
// show no data found if the category doesn't contain ant data
const dataNotFound = () => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent = "";
  videoContainer.classList = [];
  videoContainer.classList = `w-full h-[60vh] flex justify-center items-center flex-col gap-8`;
  videoContainer.innerHTML = `<img src="images/Icon.png" alt=""> <h1 class="text-4xl font-bold max-w-md text-center">Oops!! Sorry, There is no content here</h1>`;
};


const sortData = (data1, data2) => {
  const views1 = data1.others.views;
  const views2 = data2.others.views;
  const views1InNumber = views1.replace("K", "");
  const viewNumber1 = parseFloat(views1InNumber);
  const views2InNumber = views2.replace("K", "");
  const viewNumber2 = parseFloat(views2InNumber);
  if(viewNumber1 < viewNumber2) return 1
  else if(viewNumber1 > viewNumber2) return -1
  return 0;
}
loadCategory();
