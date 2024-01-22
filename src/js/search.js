import { groups } from "./main";
import { emoji } from "./main";
import { KeyCodes } from "./modules/utils/key-codes";

export class Search {
    constructor(inputClass, buttonClass, textLabelClass) {
        this.inputElement = document.querySelector(`.${inputClass}`);
        this.buttonElement = document.querySelector(`.${buttonClass}`);
        this.texLabelElement = document.querySelector(`.${textLabelClass}`);

        this.inputValue;
        
        this.texLabelElement.style.display = 'none';

        this.warningMessages = {
            empty: "The searched word couldn't be empty",
            minimum: "Search term should be at least 3 chars length"
        }

        this.inputElement.addEventListener('input', e => {
            this.inputValue = this.inputElement.value;
            this.validateData();
        });

        const makeSearchEvent = (e) => {
            if(e.code === 'Enter') {
                this.makeSearch();
            }
        };

        this.inputElement.addEventListener('focus', e => {
            e.target.addEventListener('keydown', makeSearchEvent);
        });

        this.inputElement.removeEventListener('blur', e => {
            e.target.removeEventListener('keydown', makeSearchEvent);
        })

        this.buttonElement.addEventListener('click', e => {
            e.preventDefault();
            
            this.makeSearch();
        });

        
    }

    validateData() {
        if(this.inputValue.length === 0) {
            this.texLabelElement.style.display = 'block';
            this.texLabelElement.textContent = this.warningMessages.empty;
            return false;
        } 

        if(this.inputValue.length < 3) {
            this.texLabelElement.style.display = 'block';
            this.texLabelElement.textContent = this.warningMessages.minimum;
            return false;
        }
        this.texLabelElement.style.display = 'none';
        return true;
    }

    makeSearch() {
        if(this.validateData()) {
            groups.updateContent(undefined, this.inputValue);
        }
    }
}