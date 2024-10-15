import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";


export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActive(link);
        const category = link.dataset.category;
        this.getGames(category);
      });
    });

    this.details = document.querySelector('.details');
    this.home = document.querySelector('.home');

    this.ui = new Ui();
    this.getGames("mmorpg");
  }

  changeActive(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
  }

  async getGames(categories) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "dd5390a15fmsh86de37d2c8d0aabp123f18jsne528d7f3c9c3",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categories}`,
        options
      );
      const response = await api.json();

      this.ui.displayHome(response);

      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          this.details.classList.remove('d-none');
          this.home.classList.add('d-none');
          this.detailsPart = new Details(card.dataset.id);
        });
      });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }
}
