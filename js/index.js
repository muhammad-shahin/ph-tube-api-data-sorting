const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  showCategoryButtons(data.data);
};
const showCategoryButtons = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList = `bg-gray-200 text-xl px-5 py-2 rounded font-medium`;
    categoryBtn.id = category.category_id;
    categoryBtn.innerText = category.category;
    categoryContainer.appendChild(categoryBtn);
  });
  loadVideos(categories[0].category_id);
};

const loadVideos = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const videos = data.data;
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

  showVideos(videos);
};

const showVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
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
    console.log(title, verified, postedDate);
    const videoCard = document.createElement("div");
    videoCard.classList = `space-y-3`;
        videoCard.innerHTML = `
        <div class="relative">
            <img class="rounded-lg w-full h-[12.5rem]" src="${thumbnail}" />
            <p class="absolute bottom-3 p-1 right-10 bg-black text-white text-[14px] rounded">${postedDate}</p>
          </div>
          <div class="flex justify-start items-center gap-3">
            <img
              class="w-10 rounded-full"
              src="${authorProfilePic}"
            />
            <h4 class="font-bold">
            ${title}
            </h4>
          </div>
          <div class="flex justify-start items-center gap-3">
            <p class="text-gray-500 text-[14px]">${authorName}</p>
            <img class="w-5" src="${verified}" />
          </div>
          <p class="text-gray-500 text-[14px]">${views}</p>
        `;
        videoContainer.appendChild(videoCard);
  });
};

loadCategory();
