import { Categories } from "./categories";
import { GROUP_ALL } from "./consts/emoji-categories";
import { categories, emoji, catalog, favInstc } from "../main";
import { FAV_ICON, FAV_ICON_SELECTED } from "./consts/emoji-favs";

export class Groups extends Categories {
    constructor(listClass, itemsClass, linksClasses, linkAtribute, groupSectionClass, resultTitleClass, resultEmptyClass) {
        super(listClass, itemsClass, linksClasses, linkAtribute, resultTitleClass, resultEmptyClass);
        this.allAttributeValue = GROUP_ALL;
        this.groupSectionClass = groupSectionClass;
        this.groupSection = document.querySelector(`.${this.groupSectionClass}`);
    }

    nameFormatter(groupe) {
        return groupe;
    }

    creationLoop(items) {
        for(let i in items) {
            this.listElement.append(this.createItem([this.itemsClass], items[i], items[i]));
        }
    }

    hideGroups() {
        this.groupSection.style.display = 'none';
    }

    showGroups() {
        this.groupSection.style.display = 'block';
    }

    updateContent(items, searchRequest) {
        let result;
        let titleText;

        result = emoji;
        titleText = `${result.length} emojis found.`;
        let titleCorrection = [false, false, false];

        let test = !!items;
        let test2 = Array.isArray(items);
        if(!items || !Array.isArray(items)) {
            if(categories.selectedValue !== categories.allAttributeValue) {
                result = result
                        .filter(item => item.category === categories.selectedValue.split('-').join(' '));
                        
                titleCorrection[0] = true;
            }
    
            if(this.selectedValue !== this.allAttributeValue) {
                result = result
                        .filter(item => item.group === this.selectedValue.split('-').join(' '));

                        titleCorrection[1] = true;
            }

        } else {
            result = result
                     .filter(item => items.some(favourite => favourite === item.unicode[0]));

                     titleCorrection[3] = true;
        }

        result = result
                .sort((a, b) => {
                    if(a.name < b.name) {
                        return -1;
                    }

                    if(a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
                .map(item => {
                    let icon;
                    if(favInstc.favourites.some(favorite => favorite === item.unicode[0])) {
                        icon = FAV_ICON_SELECTED;
                    } else {
                        icon = FAV_ICON
                    }
                    return {
                        ...item,
                        imageUrl: icon,
                    }
        });

        if(searchRequest) {
            let regex = new RegExp(searchRequest);

            result = result
                    .filter(item => regex.test(item.name));
            
        }

        
        if(result.length > 0) {
            if(titleCorrection[2]) {
                titleText = `${result.length} emojis found in favourites.`;
            } else {
                if(titleCorrection[0])
                    titleText = `${result.length} emojis found in ${categories.selectedValue.split('-').join(' ')}.`

                if(titleCorrection[1])
                    titleText = `${result.length} emojis found in ${categories.selectedValue.split('-').join(' ')} (${this.selectedValue.split('-').join(' ')}).`;
            }
            this.resultTitleElement.textContent = titleText;
            this.resultEmptyClass.style.display = 'none';
            this.resultTitleElement.style.display = 'block';
        } else {
            this.resultTitleElement.style.display = 'none';
            this.resultEmptyClass.style.display = 'block';
        }

        catalog.buildTabs(result);
    }
}