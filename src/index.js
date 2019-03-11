import Popper from "popper.js";
window.jQuery = $;
window.$ = $;

require("bootstrap");

("use strict");

/*
*Exercise*

User the XKCD API to display a random comic and add a comic-navigation (previous, next)
 + a button to get a new random comic.

https://xkcd.com/json.html

*Mockup*

Your result should look like this:
https://share.dominik-hanke.de/Screenshot%20from%202018-11-12%2010-58-07.png
https://share.dominik-hanke.de/Screenshot%20from%202018-11-12%2010-58-07.png

*Hint*

To get a random comic you first need to know what's the highest number (from the latest comic)
 and then get a random comic based on the range (1 - max). So that's a good place to test promise
  chaining or async await. (edited)
*/

class GetComicsApi {
  constructor() {
    this.apiUrl =
      "https://cors-anywhere.dominik-hanke.de/http://xkcd.com/:number/info.0.json";

    this.registerEvents();
  }

  registerEvents() {
    const form = document.querySelector(".form-inline");
    const input = form.querySelector(".form-control");
    const buttons = document.querySelector(".btn-group");
    const randomBtn = buttons.querySelector(".random");
    const prevBtn = buttons.querySelector(".prev");
    const nextBtn = buttons.querySelector(".next");

    form.addEventListener("submit", e => {
      e.preventDefault();

      const number = input.value.trim();

      this.getComic(number).then(comic => {
        console.log(comic);

        const date = this.dateToHumanReadable(
          comic.year,
          comic.month,
          comic.day
        );

        document.querySelector("#comic").innerHTML = `<img src="${
          comic.img
        }" alt="Comic">`;

        document.querySelector("#date").innerHTML = `<span>${date}</span>`;
      });

      randomBtn.addEventListener("click", e => {
        console.log(e.target);

        this.getComic(this.getRandomNumber()).then(comic => {
          console.log(comic);

          const date = this.dateToHumanReadable(
            comic.year,
            comic.month,
            comic.day
          );

          document.querySelector("#comic").innerHTML = `<img src="${
            comic.img
          }" alt="Comic">`;

          document.querySelector("#date").innerHTML = `<span>${date}</span>`;
        });
      });

      prevBtn.addEventListener("click", e => {
        console.log(e.target);
        this.getComic(this.getRandomNumber() - 1).then(comic => {
          console.log(comic);

          const date = this.dateToHumanReadable(
            comic.year,
            comic.month,
            comic.day
          );

          document.querySelector("#comic").innerHTML = `<img src="${
            comic.img
          }" alt="Comic">`;

          document.querySelector("#date").innerHTML = `<span>${date}</span>`;
        });
      });

      nextBtn.addEventListener("click", e => {
        console.log(e.target);
        this.getComic(this.getRandomNumber() + 1).then(comic => {
          console.log(comic);

          const date = this.dateToHumanReadable(
            comic.year,
            comic.month,
            comic.day
          );

          document.querySelector("#comic").innerHTML = `<img src="${
            comic.img
          }" alt="Comic">`;

          document.querySelector("#date").innerHTML = `<span>${date}</span>`;
        });
      });
    });
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 2071 + 1);
  }

  dateToHumanReadable(year, month, day) {
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");

    return `${year} - ${month} - ${day}`;
  }

  getComic(number) {
    return new Promise((resolve, reject) => {
      let url = this.apiUrl.replace(":number", number);
      const getTheComic = fetch(url);

      getTheComic
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

const comicApi = new GetComicsApi();
