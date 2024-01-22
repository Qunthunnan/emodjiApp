import { groups } from "../main";
import { favInstc } from "../main";
import {CATEGORY_ALL, CATEGORIES } from "./consts/emoji-categories";

export class Categories {
    constructor(listClass, itemsClass, linksClasses, linkAtribute, resultTitleClass, resultEmptyClass) {
        try {
            this.listElement = document.querySelector(`.${listClass}`);
            this.itemsClass = itemsClass;
            this.linksClasses = linksClasses;
            this.linkAtribute = linkAtribute;
            this.allAttributeValue = CATEGORY_ALL;
            this.selectedElement;
            this.selectedValue;
            this.resultTitleElement = document.querySelector(`.${resultTitleClass}`);
            this.resultEmptyClass = document.querySelector(`.${resultEmptyClass}`);

        } catch (error) {
            console.error(error);
        }
    }

    buildTabs(items, firstElementAll, updateSelected) {
        this.listElement.innerHTML = '';

        if(firstElementAll) {
            this.selectedElement = this.createItem([
                this.itemsClass,
                this.itemsClass + '--selected'
            ], this.allAttributeValue, 'All');
            this.selectedValue = this.allAttributeValue;

            this.listElement.append(this.selectedElement);
        }

        this.creationLoop(items);


        if(updateSelected) {
            this.updateContent(this.selectedElement.children[0].getAttribute(this.linkAtribute));
        } else {
            this.updateContent();
        }
    }

    creationLoop(items) {
        for(let i in items) {
            this.listElement.append(this.createItem([this.itemsClass], i, this.nameFormatter(i)));
        }
    }

    createItem(itemClases, linkAtributeValue, linkText) {
        const tabElement = document.createElement('li');
        tabElement.classList.add(...itemClases);

        const linkElement = document.createElement('a');
        linkElement.classList.add(...this.linksClasses);
        linkElement.setAttribute(this.linkAtribute, linkAtributeValue);
        linkElement.setAttribute('href', '');
        linkElement.textContent = linkText;

        linkElement.addEventListener('click', e => {
            e.preventDefault();

            favInstc.isShowedFavorites = false;

            const item = e.target.closest(`.${this.itemsClass}`);
            this.selectedElement.classList.remove(this.itemsClass + '--selected');
            item.classList.add(this.itemsClass + '--selected');
            this.selectedElement = item;
            this.selectedValue = e.target.getAttribute(this.linkAtribute);
            this.updateContent(this.selectedValue);
        });

        tabElement.append(linkElement);
        return tabElement;
    }

    nameFormatter(category) {
        return category
        .split('-')
        .map(item=> {
            let symbols = item
            .split('');
            symbols[0] = symbols[0].toUpperCase();
            item = symbols.join('');
            return item;
        } )
        .join(' ');
    }

    updateContent(category) {
        if(category === this.allAttributeValue || CATEGORIES[category].length === 1) {
            groups.hideGroups();
            groups.buildTabs(CATEGORIES[category], true);
        } else {
            groups.buildTabs(CATEGORIES[category], true);
            groups.showGroups();
        }
    }
}