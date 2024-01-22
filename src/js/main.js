import { Catalog } from "./modules/catalog";
import { Categories } from "./modules/categories";
import { CATEGORIES } from "./modules/consts/emoji-categories";
import { Detailed } from "./modules/detailed";
import { Favourites } from "./modules/favourites";
import { Groups } from "./modules/groups";
import { Search } from "./search";
async function getEmoji() {
    //Recieving emojies
    const result = await fetch('https://emojihub.yurace.pro/api/all')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    rawData = data;
                    //Filtration emojies
                    let unicodes = [];
                    let result = data
                                .filter(item => {
                                    if(unicodes.some(uncode => uncode === item.unicode[0])) {
                                        return false;
                                    } else {
                                        unicodes.push(item.unicode[0]);
                                        return true;
                                    }
                                });
                    emoji = result;
                    startApp(result);
                });
    
}

function startApp(emoji) {
    search = new Search('js-search-input', 'js-search-btn', 'js-search-feedback');

    detailed = new Detailed({
        menuClass: 'detail',
        closeClass: 'js-detail-close',
        addFavClass: 'js-detail-fav',
        favIconClass: 'js-detail-fav-icon',
        favLabelClass: 'js-detail-fav-label',
        emojiClass: 'js-detail-emoji',
        emojiNameClass: 'js-detail-name',
        fullNameClass: 'js-detail-fullname',
        categoryClass: 'js-detail-category',
        groupClass: 'js-detail-group',
        htmlCodesClass: 'js-detail-htmlcodes',
        unicodeCodesClass: 'js-detail-unicodes',
        dataSheetClass: 'detail__datasheet-code',
    });

    favInstc = new Favourites('js-favourites');

    catalog = new Catalog({
        listClass: 'results__list',
        cardsClasses: ['emoji-card', 'js-item-emoji'],
        favClasses: ['emoji-card__fav', 'js-item-fav'],
        emojiAttribute: 'data-emoji',
        emojiClass: 'emoji-card__image',
        nameClass: 'emoji-card__name'
    });

    groups = new Groups('js-group-list', 'pill', ['pill__link'], 'data-group', 'js-groups', 'js-results-title', 'js-results-empty');

    categories = new Categories('category-list', 'category-list__item', ['category-list__link', 'link'], 'data-categories', 'js-results-title', 'js-results-empty');
    categories.buildTabs(CATEGORIES, true, true);
}


let groups,
    detailed,
    rawData,
    emoji,
    catalog,
    categories,
    favInstc,
    search;


getEmoji();

export {
    categories,
    groups,
    emoji,
    catalog,
    favInstc,
    detailed,
    rawData
}