import { Ui } from "./ui.module.js";

export class Details {
    constructor(id){
        document.getElementById('btnClose').addEventListener('click', () => {
            document.querySelector('.details').classList.add('d-none');
            document.querySelector('.home').classList.remove('d-none');
        });
        this.getDetails(id);
    };

    async getDetails(id){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'dd5390a15fmsh86de37d2c8d0aabp123f18jsne528d7f3c9c3',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
            const response = await api.json();
            new Ui().displayDetail(response);
        } catch (error) {
            console.error("Error fetching game details:", error);
        }
    }
}
