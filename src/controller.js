import * as model from "./model.js";

import icons from "url:../img/icons.svg"; //for parcel 2
import "core-js/stable";
import "regenerator-runtime/runtime";

const header = document.querySelector(".header");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// "https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20",
// options;
// export const AJAX = async function (uploadData = undefined) {
//   try {
//     const fetchPro = uploadData
//       ? fetch(
//           "https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20",
//           options,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(uploadData),
//           }
//         )
//       : fetch(
//           "https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20",
//           options
//         );

//     const res = await Promise.race([fetchPro, timeout(10)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// AJAX();

// export const uploadMovie = async function (newMovies) {
//   try {
//     const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
//     state.recipe = createRecipeOject(data);
//     addBookmark(state.recipe);
//   } catch (err) {
//     throw err;
//   }
// };

const controlMovie = async function () {
  try {
    const fetchPro = await fetch(`https://rickandmortyapi.com/api/character/`);
    const res = await fetchPro.json();
    const data = res.results;
    console.log(data[0]);
    data.map((item) => {
      const name = item.name;
      const species = item.species;
      const gender = item.gender;
      const image = item.image;
      const status = item.status;
      //<h4>rank: ${rank ? rank : "not rated"}</h4>
      const markUp = `<li><img src='${image}'> <h2> ${name}</h2>
      <div class='movie-description'>
      <h3>gender: ${gender}</h3>
      <h4>species: ${species}</h4>
      </div>
      <h4>status: ${status}</h4>
      </li>`;
      document
        .querySelector(".movies")
        .insertAdjacentHTML("afterbegin", markUp);
    });
    if (!fetchPro.ok) throw new Error(`Movie can't be found! `);
  } catch (err) {
    console.error(err);
  }
};
controlMovie();
/////////////////////////////////////
// hover events
// document.querySelector(".poster").addEventListener("onmouseover", function () {
//   const markup = ``;
// });
// document.querySelector(".poster").addEventListener("onmouseout", function () {
//   const markup = ``;
// });
/////////////////////////////////////
// images below the navigation
/*
const imgContainter = document.querySelector(".slider");
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    let img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", () => {
      imgContainter.appendChild(img);
      resolve(img);
    });
    img.addEventListener("error", () => {
      reject(new Error(`Failed to load image's URL: ${imgPath}`));
    });
  });
};

const loadAll = async function (imgArr) {
  try {
    // an async function will always return a promise and not really the value that we are interested in
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);

    // get images out of the promise
    const imgEl = await Promise.all(imgs);
    console.log(imgEl);
    imgEl.forEach((img) => img.classList.add("parallel"));
  } catch {
    (err) => console.error(err);
  }
};
loadAll(["../img/1.jpg"]);
*/
/////////////////////////////////
// drag and right and left

const slider = document.querySelector(".slider");
/*
let isDown = false;
let startX;
let scrollLeft;


slider.addEventListener("mousedown", function (e) {
  e.preventDefault();
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", function (e) {
  e.preventDefault();
  isDown = false;
});
slider.addEventListener("mouseup", function (e) {
  e.preventDefault();
  isDown = false;
});
slider.addEventListener("mousemove", function (e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});
*/
/////////////////////////////////////
const renderSpinnrer = function (parentEl) {
  const markup = `
     <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
     </div>  
    `;

  slider.insertAdjacentHTML("afterbegin", markup);
};
renderSpinnrer(slider);

const sliding = function () {
  const slides = document.querySelectorAll(".slides");
  const btnleft = document.querySelector(".slider__btn--left");
  const btnright = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`) //slide=curslide
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;

    goToSlide(curSlide);
    activateDots(curSlide);
  };
  btnright.addEventListener("click", nextSlide);

  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  btnleft.addEventListener("click", previousSlide);
  ///////////////////////////////////////
  //  implementing the dots
  const createDots = function () {
    //loop over the slides and do it four times(4 slides)
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") previousSlide();
    e.key === "ArrowLeft" && previousSlide(); //short circuiting
  });

  dotContainer.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset; //destructuring
      goToSlide(slide);
      activateDots(slide);
    }
  });

  //current dots
  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    //add grey to current dot
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };

  init();
};
sliding();

// function pageScroll() {
//   slider.scrollBy(1000, 0);
//   scrolldelay = setTimeout(pageScroll, 1000);

// }
// pageScroll();
const trymusic = async function () {
  const fetch1 = await fetch(
    `https://api.spotify.com/v1/search?q=justin%20bieber&type=artist&market=ES&limit=10&offset=5`
  );
  const res = await fetch1.json();
  console.log(res);
};
trymusic();
