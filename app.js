const loadPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  //    console.log(posts);
  const postContainer = document.getElementById("post-container");
  posts.forEach((post) => {
    console.log(post.isActive);
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
                                        <p  class="font-semibold">${
                                          post.category
                                        }</p>
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
                                            <button><img src="./images/email.png" alt="" srcset=""></button>
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
