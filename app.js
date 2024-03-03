const loadPost = async () => {
  const searchText = document.getElementById("search-text").value;
  let res;
  if (searchText) {
    res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
  } else {
    res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
  }
  document.getElementById("search-text").value = "";
  const data = await res.json();
  const posts = data.posts;
  //    console.log(posts);
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  posts.forEach((post) => {
    // console.log(post.isActive);
    const postEl = document.createElement("div");
    postEl.classList = `mt-3`;
    postEl.innerHTML = `
        <div class="card lg:w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex gap-2">
                    <div>
                        <div class="avatar ${
                          post.isActive ? "online" : "offline"
                        }">
                            <div class="w-24 rounded-full">
                                <img src="${post.image}"/>
                            </div>
                            </div>
                    </div>
                        <div>
                        <div class="flex gap-2">
                            <p  class="font-semibold">${post.category}</p>
                            <p  class="font-semibold">Author:${
                              post.author.name
                            }</p>
                        </div>
                        <p  class="font-bold">${post.title}</p>
                        <p >${post.description}</p>
                        <hr>
                        <div class="flex gap-3">
                            <div class="flex gap-2">
                                <img src="./images/message.png" alt="">
                                <p>${post.comment_count}</p>
                            </div>
                            <div class="flex gap-2">
                                <img src="./images/eye.png" alt="">
                                <p>${post.view_count}</p>
                            </div>
                            <div class="flex gap-2">
                                <img src="./images/clock.png" alt="">
                                <p>${post.posted_time}</p>
                            </div>
                            <div class="card-actions justify-end">
                                <button><img  src="./images/email.png" alt="" srcset="" onclick="showTitle(event)" data-title='${
                                  post.title
                                }' data-view='${post.view_count}'></button>
                            </div>
                        </div>
                        </div>
                </div> 
            </div>
        </div> 
    `;

    postContainer.appendChild(postEl);
  });
};
loadPost();

const showTitle = (e) => {
  console.log(e.target.dataset.title);
  let dataCountEl = document.getElementById("data-count");
  dataCountEl.innerText = parseInt(dataCountEl.innerText) + 1;

  const titleShowingCard = document.getElementById("title-with-view-card");
  const titleEL = document.createElement("div");
  titleEL.classList = `flex gap-2 justify-between`;
  titleEL.innerHTML = `
    
                                <div>
                                    <p>${e.target.dataset.title}</p>
                                </div>
                                <div class="flex gap-1">
                                    <img src="./images/eye.png" alt="">
                                    <p>${e.target.dataset.view}</p>
                                </div>
                            
    `;
  titleShowingCard.appendChild(titleEL);
};

//   latest post section

const latestPostDisplay = (async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const latestPosts = data;

  const latestPostContainer = document.getElementById("latest-post-container");
  latestPosts.forEach((latestPost) => {
    const latestPostEl = document.createElement("div");
    latestPostEl.classList = `card w-96 shadow-xl`;
    latestPostEl.innerHTML = `
                 <figure class="px-10 pt-10 ">
                          <img src="${latestPost.cover_image}" alt=""
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <div class="flex gap-3">
                            <img src="./images/frame.png" alt="">
                            <p>  ${
                              latestPost.author.posted_date
                                ? latestPost.author.posted_date
                                : "No publish date"
                            }</p>
                         </div>
                        <h2 class="card-title">${latestPost.title}</h2>
                        <p>${latestPost.description}</p>
                        
                        <div class="card-actions">
                    <div class="flex gap-3 align-middle">
                            <div class="avatar">
                                <div class="w-24 rounded-full">
                                <img src="${latestPost.profile_image}" />
                            </div>
                        </div>
                        <div>
                             <p class="font-bold">${latestPost.author.name}</p>
                            <h2>${
                              latestPost.author.designation
                                ? latestPost.author.designation
                                : "Unknown"
                            }</h2>
                        </div>
                    </div>
                           
                        </div>
                    </div>`;
    latestPostContainer.appendChild(latestPostEl);
  });
})();
