import { catalog, groups } from "../main";
import { favInstc } from "../main";
import { FAV_ICON, FAV_ICON_SELECTED, FAV_ICON_TRASH} from "./consts/emoji-favs";

export class Detailed {
    constructor({menuClass, closeClass, addFavClass, favIconClass, favLabelClass, emojiClass, emojiNameClass, fullNameClass, categoryClass, groupClass, htmlCodesClass, unicodeCodesClass, dataSheetClass}) {
        this.menuClass = menuClass;
        this.dataSheetClass = dataSheetClass;
        this.menuElement = document.querySelector(`.${this.menuClass}`);
        this.closeElement = document.querySelector(`.${closeClass}`);
        this.addFavElement = document.querySelector(`.${addFavClass}`);
        this.faviconElement = document.querySelector(`.${favIconClass}`);
        this.favLabelElement = document.querySelector(`.${favLabelClass}`);
        this.emojiElement = document.querySelector(`.${emojiClass}`);
        this.emojiNameElement = document.querySelector(`.${emojiNameClass}`);
        this.fullNameElement = document.querySelector(`.${fullNameClass}`);
        this.categoryElement = document.querySelector(`.${categoryClass}`);
        this.groupElement = document.querySelector(`.${groupClass}`);
        this.htmlCodesElement = document.querySelector(`.${htmlCodesClass}`);
        this.unicodesElement = document.querySelector(`.${unicodeCodesClass}`);

        this.selectedEmoji;

        this.closeElement.addEventListener('click', e => {
            e.preventDefault();
            
            this.closeMenu();
        });

        this.addFavElement.addEventListener('click', e => {
            e.preventDefault();

            this.changeFavorite(this.selectedEmoji);
        })
    }

    fillMenu(emoji) {
        this.selectedEmoji = emoji.unicode[0];

        this.emojiElement.innerHTML = emoji.htmlCode[0];
        this.emojiNameElement.textContent = catalog.nameFormatter(emoji.name);
        this.fullNameElement.textContent = emoji.name;
        this.categoryElement.textContent = emoji.category;
        this.groupElement.textContent = emoji.group;

        if(favInstc.favourites.some(item => item === emoji.unicode[0])) {
            this.faviconElement.setAttribute('src', FAV_ICON_TRASH);
            this.favLabelElement.textContent = 'Remove fav';
        }else {
            this.faviconElement.setAttribute('src', FAV_ICON);
            this.favLabelElement.textContent = 'Add to favs';
        }

        this.htmlCodesElement.innerHTML = '';
        this.unicodesElement.innerHTML = '';

        for(let i in emoji.htmlCode) {
            const codeElement = document.createElement('span');
            codeElement.classList.add(this.dataSheetClass);
            codeElement.textContent = emoji.htmlCode[i];
            this.htmlCodesElement.append(codeElement);
        }

        for(let i in emoji.unicode) {
            const codeElement = document.createElement('span');
            codeElement.classList.add(this.dataSheetClass);
            codeElement.textContent = emoji.unicode[i];
            this.unicodesElement.append(codeElement);
        }
        this.openMenu();
    }



    openMenu() {
        this.menuElement.classList.add(this.menuElement.classList[0] + '--show');

        document.addEventListener('click', e => {
            e.preventDefault();
            if(!e.target.matches(this.menuClass) && !e.target.closest(`.${this.menuClass}`) && !e.target.matches(`.${this.closeClass}`) && !e.matchkey) {
                this.closeMenu();
            }
        }); 
        
    }

    closeMenu() {
        this.menuElement.classList.remove(this.menuElement.classList[0] + '--show')
    }

    changeFavorite(emojiCode) {
        if(favInstc.favourites.some(item => item === emojiCode)) {
            this.faviconElement.setAttribute('src', FAV_ICON);
            this.favLabelElement.textContent = 'Add to favs';
        } else {
            this.faviconElement.setAttribute('src', FAV_ICON_TRASH);
            this.favLabelElement.textContent = 'Remove fav';
        }
        catalog.changeFavorite(emojiCode, document.querySelector(`img[${catalog.linkAtribute}="${emojiCode}"]`));
    }
}