import { Categories } from "./categories";
import { FAV_ICON, FAV_ICON_SELECTED } from "./consts/emoji-favs";
import { favInstc, groups, rawData, detailed } from "../main";

export class Catalog extends Categories {
    constructor({listClass, cardsClasses, favClasses, emojiAttribute , emojiClass, nameClass}) {
        super(listClass, cardsClasses[1], undefined, emojiAttribute, undefined, undefined);
        this.cardsClasses = cardsClasses;
        this.favClasses = favClasses;
        this.emojiClass = emojiClass;
        this.nameClass = nameClass;
    }

    creationLoop(items) {
        this.listElement.innerHTML = '';
        for(let i in items) {
            this.createItem({
                itemsClasses: this.cardsClasses,
                favClasses: this.favClasses, 
                emojiAttribute: this.linkAtribute,
                emojiClass: this.emojiClass,
                nameClass: this.nameClass,
                imageUrl: items[i].imageUrl,
                emojiHtmlCode: items[i].htmlCode[0],
                emojiUnicode: items[i].unicode[0], 
                emojiName: items[i].name
            });
        }
    }

    createItem({itemsClasses,  favClasses, emojiAttribute, emojiClass, nameClass, imageUrl, emojiHtmlCode, emojiUnicode, emojiName}) {
        const cardElement = document.createElement('li');
        cardElement.classList.add(...itemsClasses);
        cardElement.setAttribute(emojiAttribute, emojiUnicode);
        cardElement.setAttribute('title', emojiName);

        const favIcon = document.createElement('img');
        favIcon.classList.add(...favClasses);
        favIcon.setAttribute(emojiAttribute, emojiUnicode);
        favIcon.setAttribute('src', imageUrl);
        cardElement.append(favIcon);
        
        const emoji = document.createElement('span');
        emoji.classList.add(emojiClass);
        emoji.innerHTML = emojiHtmlCode;
        cardElement.append(emoji);
        
        const name = document.createElement('span');
        name.classList.add(nameClass);
        name.textContent = this.nameFormatter(emojiName);
        cardElement.append(name);

        cardElement.addEventListener('click', e => {
            if(e.target.matches(`.${favClasses[0]}`)) {
                this.changeFavorite(e.target.getAttribute(emojiAttribute), e.target);
            } else {
                e.matchkey = true;
                if(e.target.matches(`.${this.itemsClass}`)) {
                    this.openMenu(e.target.getAttribute(emojiAttribute))
                } else {
                    this.openMenu(e.target.closest(`.${this.itemsClass}`).getAttribute(emojiAttribute));
                }
            }
        });

        this.listElement.append(cardElement);
    }

    nameFormatter(name) {
        let result = name.split(' ≊ ')[0].split(', ')[0];
        if(result.length > 20) {
            result = result.slice(0, 20);
            result += '...';
        }
        return result;
    }

    updateContent() {
        
    }

    changeFavorite(emojiUnicode, icon) {
        if(favInstc.favourites.some(item => item === emojiUnicode)) {
            icon.setAttribute('src', FAV_ICON);
            favInstc.removeFavourite(emojiUnicode);
            if(favInstc.isShowedFavorites) {
                if(favInstc.favourites.length !== 0) {
                    groups.updateContent(favInstc.favourites);
                } else {
                    favInstc.isShowedFavorites = false;
                    groups.updateContent();
                }
                
            }
        } else {
            icon.setAttribute('src', FAV_ICON_SELECTED);
            favInstc.addFavourite(emojiUnicode);
        }
    }

    openMenu(emoji) {
        let targetEmoji;
        for(let i in rawData) {
            if(rawData[i].unicode[0] === emoji) {
                targetEmoji = rawData[i];
                break;
            }
        }
        detailed.fillMenu(targetEmoji);
    }
}