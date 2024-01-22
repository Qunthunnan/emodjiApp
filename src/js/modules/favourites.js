import { groups } from "../main";
export class Favourites {
    constructor(favouriteClass) {
        this.favouriteElement = document.querySelector(`.${favouriteClass}`);
        this.favourites = [];
        this.cookieField = 'favorites';
        this.isShowedFavorites = false;
        this.loadCookie();

        this.favouriteElement.addEventListener('click', (e) => {
            e.preventDefault();
            
            groups.hideGroups();
            groups.updateContent(this.favourites);
            this.isShowedFavorites = true;
        })
    }

    loadCookie() {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === this.cookieField) {
                this.favourites = JSON.parse(cookieValue);
            }
        }
    }
    
    saveFavourite() {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 90);
        const cookieString = `${this.cookieField}=${JSON.stringify(this.favourites)}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = cookieString;
    }

    addFavourite(favourite) {
        this.favourites.push(favourite);
        this.saveFavourite();
    }

    removeFavourite(favourite) {
        if(this.favourites.indexOf(favourite) || this.favourites.indexOf(favourite) === 0) {
            let test = this.favourites.indexOf(favourite);
            this.favourites.splice(this.favourites.indexOf(favourite), 1);
            this.saveFavourite();
        }
    }
}