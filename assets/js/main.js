// theme mode event
const light_mode = document.querySelector(".light_mode");
const dark_mode = document.querySelector(".dark_mode");

if (localStorage.theme_mode) {
  if (localStorage.theme_mode === "dark") {
    document.querySelector("html").setAttribute("class", "is-dark");
    dark_mode.classList.add("is-hidden");
  } else {
    light_mode.classList.add("is-hidden");
  }
} else {
  localStorage.theme_mode = "dark";
  document.querySelector("html").setAttribute("class", "is-dark");
  dark_mode.classList.add("is-hidden");
}
dark_mode.addEventListener("click", () => {
  localStorage.theme_mode = "dark";
  document.querySelector("html").classList.add("is-dark");
  dark_mode.classList.add("is-hidden");
  light_mode.classList.remove("is-hidden");
});
light_mode.addEventListener("click", () => {
  localStorage.theme_mode = "light";
  document.querySelector("html").classList.remove("is-dark");
  light_mode.classList.add("is-hidden");
  dark_mode.classList.remove("is-hidden");
});

document.querySelector(".curr_year").innerHTML = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

async function fetchUserInfo() {
  let response = await fetch("./data-user.json", { mode: "no-cors" });

  // console.log(response.status); // 200
  // console.log(response.statusText); // OK

  if (response.status === 200) {
    let data = await response.json();
    console.log(data);
    const userInfo = document.querySelector(".user-info");
    userInfo.querySelector(".title").innerText = data.name;
    userInfo.querySelector(".bio").innerText = data.bio;
    userInfo.querySelector("img").setAttribute("src", data.profile_photo);
  }
}

async function fetchSuggestions() {
  let response = await fetch("./data-suggestions.json", { mode: "no-cors" });

  if (response.status === 200) {
    let data = await response.json();
    let lists = "";
    const dataList = document.querySelector(".suggested-user .data-list");
    await data.forEach((item, index) => {
      lists += `
      <div class="media is-flex is-flex-grow-1 is-align-items-center">
          <div class="media-left">
              <figure class="image is-32x32">
                  <img class="is-rounded" src="${item.profile_photo}">
              </figure>
          </div>
          <div class="media-content">
              <span class="title is-7">${item.name}</span>
              <p class="is-size-7">Follows you</p>
          </div>
          <div class="media-right">
              <a class="button is-small" href="#">Follow</a>
          </div>
      </div>
      `;
    });
    dataList.innerHTML = lists;
  }
}

async function fetchFeeds() {
  let response = await fetch("./data-feeds.json", { mode: "no-cors" });

  if (response.status === 200) {
    let data = await response.json();
    let lists = "";
    const dataList = document.querySelector("#feed");
    await data.forEach((item, index) => {
      let comment = "";
      if (item.allow_comment) {
        comment = `
        <div class="card-footer">
          <div class="field has-addons is-flex-grow-1 is-align-items-center">
              <div class="control">
                  <button id="emoji-button" class="button"><i class="material-icons">mood</i></button>
              </div>
              <div class="control is-flex-grow-1">
                  <input class="input comment" type="text" placeholder="Add a comment..." value="" />
              </div>
              <div class="control">
                  <button class="button is-size-7">Post</button>
              </div>
          </div>
      </div>`;
      }

      lists += `
      <div class="card mb-5">
          <header class="card-header p-3">
              <div class="media is-flex is-flex-grow-1 is-align-items-center">
                  <div class="media-left">
                      <figure class="image is-32x32">
                          <img class="is-rounded" src="${item.profile_photo}">
                      </figure>
                  </div>
                  <div class="media-content">
                      <span class="title is-6">${item.name}</span>
                  </div>
              </div>
          </header>
          <div class="card-image">
              <figure class="image is-4by3">
                  <img src="${item.photo}" alt="">
              </figure>
          </div>
          <div class="card-content p-3">
              <div class="level mb-3 is-mobile">
                  <div class="level-left">
                      <div class="level-item has-text-centered">
                          <a href="">
                              <i class="material-icons">favorite_border</i>
                          </a>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <a href="">
                                  <i class="material-icons">chat_bubble_outline</i>
                              </a>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <a href="">
                              <i class="material-icons">share</i>
                          </a>
                      </div>
                  </div>
                  <div class="level-right">
                      <div class="level-item has-text-centered">
                          <a href="">
                              <i class="material-icons">bookmark_outline</i>
                          </a>
                      </div>
                  </div>
              </div>

              <div class="content">
                  ${
                    item.like_count > 0
                      ? `
                  <p>
                    <strong>${item.like_count} Likes</strong>
                  </p>`
                      : ``
                  }
                  <p>${item.caption}</p>
                  ${
                    item.comment_count > 0
                      ? `
                  <p>
                    <a href="#">View all ${item.comment_count} comments</a>
                  </p>`
                      : ``
                  }
                  <time>${item.datetime}</time>
              </div>
          </div>
          ${comment}
      </div>
      `;
    });
    dataList.innerHTML = lists;

    document.querySelectorAll("#feed #emoji-button").forEach((item) => {
      EmojiButton(item, function (emoji) {
        const comment = item.closest(".card-footer").querySelector(".comment");
        comment.value += emoji;
      });
    });
  }
}

fetchUserInfo();
fetchSuggestions();
fetchFeeds();
