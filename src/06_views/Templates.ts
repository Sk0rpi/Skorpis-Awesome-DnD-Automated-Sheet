import {ICharacterCurrency} from "../02_models/021_Interfaces/Character/ICharacterCurrency";
import {IWeapon} from "../02_models/021_Interfaces/Weapons/IWeapon";
import {IProficiency} from "../02_models/021_Interfaces/Proficiencies/IProficiency";
import {ICharacterNotes} from "../02_models/021_Interfaces/Character/ICharacterNotes";
import {ICharacterInfo} from "../02_models/021_Interfaces/Character/ICharacterInfo";
import {ICharacterStatus} from "../02_models/021_Interfaces/Character/ICharacterStatus";
import {IAttribute} from "../02_models/021_Interfaces/Attributes/IAttribute";
import {ISpellCasting} from "../02_models/021_Interfaces/Spells/ISpellCasting";
import {ISpell} from "../02_models/021_Interfaces/Spells/ISpell";
import {IEntity} from "../02_models/021_Interfaces/Entities/IEntity";
import {
    ALL_PROFICIENCIES,
    ALL_PROFICIENCIES_ICONS,

} from "../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {ALL_PROFICIENCY_TYPES, } from "../02_models/023_Types/Proficiencies/AnyProficiencyTypes";
import {ALL_CURRENCY_TYPES, CurrencyType} from "../02_models/023_Types/Character/CurrencyTypes";
import {ALL_ATTRIBUTE_TYPES, AttributeType} from "../02_models/023_Types/Attributes/AttributeTypes";
import {ALL_STATUS_TYPES, StatusType} from "../02_models/023_Types/Attributes/StatusTypes";
import {ALL_CLASS_TYPES} from "../02_models/023_Types/Character/ClassTypes";
import {ALL_WEAPONS, WeaponType} from "../02_models/023_Types/Proficiencies/WeaponTypes";
import {ALL_WEAPON_PROPERTIES, WeaponPropertyType} from "../02_models/023_Types/Weapons/WeaponPropertyTypes";

export function createMenuSection(): string{
    let innerHTML = `
        <div class="box columns pt-4 pr-4 pb-2 pl-4 m-0 is-justify-content-space-between">
            <input id="import-character-input" type="file" class="is-hidden" accept=".json">
            <a id="import-character-button" class="column is-2-desktop mb-2 button is-success">
                <span class="icon mr-0">
                    <i class="fas fa-file-import"></i>
                </span>
                <span class="pl-1 is-size-5 has-text-weight-semibold">Import Character</span>
            </a>
            
            <a id="export-character-button" class="column is-2-desktop mb-2 button is-info">
                <span class="icon mr-0">
                    <i class="fas fa-file-export"></i>
                </span>
                <span class="pl-1 is-size-5 has-text-weight-semibold">Export Character</span>
            </a>
            
            <a id="create-character-button" class="column is-3-desktop mb-2 button is-danger">
                <span class="icon mr-0">
                    <i class="fas fa-user-plus"></i>
                </span>
                <span class="pl-1 is-size-5 has-text-weight-semibold">Create New Character</span>
            </a>
            
            <a class="column is-2-desktop mb-2 button is-love" href="https://ko-fi.com/sk0rp1" target="_blank" rel="noopener noreferrer">
                <span class="icon mr-0">
                    <i class="fas fa-hand-holding-heart"></i>
                </span>
                <span class="pl-1 is-size-5 has-text-weight-semibold">Support Me</span>
            </a>
            
            <a class="column is-1-desktop mb-2 button is-github" href="https://github.com/Sk0rpi/Skorpis-Awesome-DnD-Automated-Sheet" target="_blank" rel="noopener noreferrer">
                <span class="icon mr-0">
                    <i class="fa-brands fa-github"></i>
                </span>
                <span class="pl-1 is-size-5 has-text-weight-semibold">Github</span>
            </a>
            <a class="column is-1-desktop mb-2 button is-warning" href="../DnD-Character-Sheet/" target="_blank" rel="noopener noreferrer">
                <span class="icon mr-0">
                    <i class="fa-solid fa-file-zipper"></i>
                </span>
                <span class="pl-1 is-size-5 has-text-weight-semibold">Old</span>
            </a>
           
        </div>
    `;
    return innerHTML;
}

export function createNoteSection({
    characterNotes,
    activeNoteTab
                                  } : {
    characterNotes: ICharacterNotes,
        activeNoteTab: string
}): string {
    let ideals = characterNotes.ideals;
    let bonds = characterNotes.bonds;
    let flaws = characterNotes.flaws;
    let allies = characterNotes.allies;

    let equipment = characterNotes.equipment;
    let features = characterNotes.features;
    let inventory = characterNotes.inventory;
    let notes = characterNotes.notes;

    let innerHTML = `
        <div class="card is-multiline">
            <div class="tabs column is-medium is-full m-0" id="notes-tabs">
                <ul>
                    <li class="${`notes-equipment-table-nav`=== activeNoteTab ? "is-active" : ""}" data-tab="notes-equipment-table-nav">
                        <a>
                            <span class="icon is-small"
                                ><i class="fas fa-shield-alt" aria-hidden="true"></i
                            ></span>
                            <span class="label is-size-4 has-text-weight-semibold">Equipment</span>
                        </a>
                    </li>
                    <li class="${`notes-features-and-abilities-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-features-and-abilities-table-nav">
                        <a>
                            <span class="icon is-small"
                                ><i class="fas fa-star" aria-hidden="true"></i
                            ></span>
                            <span class="label is-size-4 has-text-weight-semibold">Features & Abilities</span>
                        </a>
                    </li>
                    <li class="${`notes-inventory-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-inventory-table-nav">
                        <a>
                            <span class="icon is-small"
                                ><i class="fas fa-box-open" aria-hidden="true"></i
                            ></span>
                            <span class="label is-size-4 has-text-weight-semibold">Inventory</span>
                        </a>
                    </li>
                    <li class="${`notes-notes-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-notes-table-nav">
                        <a>
                            <span class="icon is-small"><i class="fas fa-sticky-note" aria-hidden="true"></i></span>
                            <span class="label is-size-4 has-text-weight-semibold">Notes</span>
                        </a>
                    </li>
                    <li class="${`notes-ideals-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-ideals-table-nav">
                        <a>
                            <span class="icon is-small"><i class="fas fa-balance-scale" aria-hidden="true"></i></span>
                            <span class="label is-size-4 has-text-weight-semibold">Ideals</span>
                        </a>
                    </li>
                    <li class="${`notes-bonds-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-bonds-table-nav">
                        <a>
                            <span class="icon is-small"><i class="fas fa-link" aria-hidden="true"></i></span>
                            <span class="label is-size-4 has-text-weight-semibold">Bonds</span>
                        </a>
                    </li>
                    <li class="${`notes-flaws-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-flaws-table-nav">
                        <a>
                            <span class="icon is-small"><i class="fas fa-heart-broken" aria-hidden="true"></i></span>
                            <span class="label is-size-4 has-text-weight-semibold">Flaws</span>
                        </a>
                    </li>
                    <li class="${`notes-allies-table-nav` === activeNoteTab ? "is-active" : ""}" data-tab="notes-allies-table-nav">
                        <a>
                            <span class="icon is-small"><i class="fas fa-user-friends" aria-hidden="true"></i></span>
                            <span class="label is-size-4 has-text-weight-semibold">Allies</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div class="card-content column columns m-0">
                <div id="section-notes-equipment" class="card-content p-4 column is-full ${`notes-equipment-table-nav`=== activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-equipment-textarea" class="textarea is-medium" rows="${equipment.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Weapons, armor, magical items, attunement slots, and carried gear...">${equipment}</textarea>
                </div>
                <div id="section-notes-features-and-abilities" class="card-content p-4 column is-full ${`notes-features-and-abilities-table-nav` === activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-features-and-abilities-textarea" class="textarea is-medium" rows="${features.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Species traits, class features, feats, custom abilities, and active buffs...">${features}</textarea>
                </div>
                <div id="section-notes-inventory" class="card-content p-3 m-0 column columns ${`notes-inventory-table-nav` === activeNoteTab ? "" : "is-hidden"}">
    `;
    for(let i = 1; i <= 3; i++) {
        let value = "";
        if(inventory[i]) value = inventory[i];
        innerHTML += `
                    <div class="column is-third">
                        <textarea spellcheck="false" id="notes-inventory-textarea-${i}" class="textarea is-medium" rows="${value.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Loot, potions, quest items, and backpack contents...">${value}</textarea>
                    </div>
        `;
    }
    innerHTML += `
                </div>
                <div id="section-notes-notes" class="card-content p-4 column is-full ${`notes-notes-table-nav` === activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-notes-textarea" class="textarea is-medium" rows="${notes.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Campaign lore, NPCs met, quest goals, factions, and backstory details...">${notes}</textarea>
                </div>
                <div id="section-notes-ideals" class="card-content p-4 column is-full ${`notes-ideals-table-nav` === activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-ideals-textarea" class="textarea is-medium" rows="${ideals.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Core beliefs, moral codes, driving philosophies, and what you stand for...">${ideals}</textarea>
                </div>
                <div id="section-notes-bonds" class="card-content p-4 column is-full ${`notes-bonds-table-nav` === activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-bonds-textarea" class="textarea is-medium" rows="${bonds.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="People you protect, places you love, treasured items, and deeply held loyalties...">${bonds}</textarea>
                </div>
                <div id="section-notes-flaws" class="card-content p-4 column is-full ${`notes-flaws-table-nav` === activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-flaws-textarea" class="textarea is-medium" rows="${flaws.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Vices, phobias, secrets, weaknesses, or dangerous habits that control you...">${flaws}</textarea>
                </div>
                <div id="section-notes-allies" class="card-content p-4 column is-full ${`notes-allies-table-nav` === activeNoteTab ? "" : "is-hidden"}">
                    <textarea spellcheck="false" id="notes-allies-textarea" class="textarea is-medium" rows="${allies.split(/\r\n|\r|\n/).length + 3}" style="height: 100%" placeholder="Trusted companions, contacts, factions, organizations, and friendly NPCs...">${allies}</textarea>
                </div>
            </div>
        </div>
    `;

    return innerHTML;
}

export function createCharacterInfoSection({
    characterInfo,
    characterNotes,
    inspiration
                                           }:{
    characterInfo: ICharacterInfo,
    characterNotes: ICharacterNotes,
    inspiration: boolean
}): string {
    let level = characterInfo.level;
    let background = characterInfo.background;
    let species = characterInfo.species;
    let appearance = characterInfo.character_appearance;
    let name = characterInfo.name;
    let characterClass = characterInfo.class;
    let alignment = characterInfo.alignment;
    let characterInspiration = inspiration;
    let quick_notes = characterInfo.quick_notes;
    let active_effects = characterInfo.active_effects;

    let height = characterNotes.height;
    let age = characterNotes.age;
    let weight = characterNotes.weight;
    let size = characterNotes.size;

    let innerHTML = `
        <div class="columns is-desktop has-text-centered is-justify-content-space-between">
            <div class="column is-3-desktop">
                <div class="card p-4">
                    <div class="card-body">
                        <input class="file-input is-hidden" type="file" id="image-import-input" accept=".png,.jpg,.jpeg,.gif">
                        
                        <figure class="image is-3by4 ${appearance ? `` : `is-clickable`} is-flex is-align-items-center is-justify-content-center border-placeholder has-background-primary" id="image-import-trigger-figure" style="position: relative;">
                            ${appearance ? `
                                <img class="card is-shadowless" src="data:image/jpeg;base64,${appearance}" style="object-fit: cover; width: 100%; height: 100%;" alt="Character Portrait" />
                                <a id="info-appearance-button" class="tag is-delete" style="position: absolute; top: 0.5rem; right: 0.5rem; height: 1.5rem; width: 1.5rem; background: var(--bulma-card-background-color); z-index: 10;">X</a>
                            ` : `
                                <div class="has-text-centered p-4">
                                    <span class="icon is-size-4"><i class="fas fa-image fa-2x"></i></span>
                                    <p class="has-text-weight-bold subtitle mt-6">Click Here To Insert Picture</p>
                                </div>
                            `}
                        </figure>
                        
                        <input id="info-name-input" class="input is-medium has-text-weight-bold has-text-centered mt-4 has-text-weight-normal" type="text" placeholder="Onestone Bluntheus" value="${name}">
                    </div>
                </div>
            </div>
            <div class="column is-9-desktop columns is-multiline">
                <div class="column is-2-desktop">
                    <div class="card p-4"">
                        <label class="label is-size-4 has-text-weight-semibold">Level</label>
                        <div class="card-body">
                            <input id="info-level-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="1" value="${level}">
                        </div>
                        <hr class="has-background-white my-4" style="width: 100%;">
                        <div class="card-body is-flex is-align-items-center is-justify-content-center">
                            <input class="checkbox is-hidden" type="checkbox" id="info-inspiration-checkbox">
                            <span class="icon is-medium mr-0 is-clickable" id="info-inspiration-trigger">
                                ${characterInspiration?
                                `<i class="fas fa-2xl fa-star has-text-warning"></i>`
                                :
                                `<i class="fa-regular fa-2xl fa-star"></i>`
                            }
                            </span>
                        </div>
                        <label class="label is-size-4 has-text-weight-semibold pb-4 mb-0"><abbr title="Inspiration">Insp.</abbr></label>
                    </div>
                </div>
                <div class="column is-5-desktop">
                    <div class="card p-4">
                        <label class="label is-size-4 has-text-weight-semibold">Background</label>
                        <div class="card-body">
                            <input id="info-background-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Professional Home Brewer" value="${background}">
                        </div>
                        <hr class="has-background-white my-4" style="width: 100%;">
                        <div class="card-body">
                            <input id="info-species-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Fairy-Giant" value="${species}">
                        </div>
                        <label class="label is-size-4 has-text-weight-semibold">Species</label>
                    </div>
                </div>
                
                <div class="column is-5-desktop">
                    <div class="card p-4">
                        <label class="label is-size-4 has-text-weight-semibold">Class</label>
                        <div class="card-body">
                            <div class="select is-medium is-fullwidth">
                                <select id="info-class-input" class="has-text-weight-bold has-text-centered px-4">
                                    ${ALL_CLASS_TYPES.map(classType => `
                                        <option value="${classType}" ${classType === characterClass ? 'selected' : ''}>
                                            ${classType}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <hr class="has-background-white my-4" style="width: 100%;">
                        
                        <div class="card-body">
                            <input id="info-alignment-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Chaotic Evil" value="${alignment}">
                        </div>
                        <label class="label is-size-4 has-text-weight-semibold">Alignment</label>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="card p-4 has-text-centered">
                        <label class="label is-size-4 has-text-weight-semibold">Height</label>
                        <div class="card-body">
                            <input id="notes-height-input" class="input is-medium has-text-weight-bold has-text-centered" style="height: 3.15rem" type="text" placeholder="180 cm" value="${height > 0 ? `${height} cm` : ``}">
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="card p-4 has-text-centered">
                        <label class="label is-size-4 has-text-weight-semibold">Age</label>
                        <div class="card-body">
                            <input id="notes-age-input" class="input is-medium has-text-weight-bold has-text-centered" style="height: 3.15rem" type="text" placeholder="24" value="${age > 0 ? `${age}` : ``}">
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="card p-4 has-text-centered">
                        <label class="label is-size-4 has-text-weight-semibold">Weight</label>
                        <div class="card-body">
                            <input id="notes-weight-input" class="input is-medium has-text-weight-bold has-text-centered" style="height: 3.15rem" type="text" placeholder="75 kg" value="${weight > 0 ? `${weight} kg` : ``}">
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="card p-4 has-text-centered">
                        <label class="label is-size-4 has-text-weight-semibold">Size</label>
                        <div class="card-body">
                            <span class="tag  is-size-4 has-text-weight-bold is-flex is-justify-content-center is-align-items-center" style="height: 3.15rem">${size}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="has-background-grey my-5" />
        <div class="columns has-text-centered">
            <div class="column is-6-desktop is-12-mobile">
                <div class="card is-flex is-flex-direction-column" style="height: 100%">
                    <label class="label is-size-4 has-text-weight-semibold mb-0 pt-4">Quick-Notes</label>
                    <div class="card-body p-4" style="height: 100%">
                        <textarea spellcheck="false" id="info-quick-notes-textarea" class="textarea is-medium" style="height: 100%" placeholder="Physical appearance, personality traits, campaign notes, factions, and current quest goals...">${quick_notes}</textarea>
                    </div>
                </div>
            </div>
            <div class="column is-6-desktop is-12-mobile">
                <div class="card is-flex is-flex-direction-column" style="height: 100%">
                    <label class="label is-size-4 has-text-weight-semibold mb-0 pt-4">Active-Effects</label>
                    <div class="card-body p-4" style="height: 100%">
                        <textarea spellcheck="false" id="info-active-effects-textarea" class="textarea is-medium" style="height: 100%" placeholder="Active effects (e.g., Bless, Shield), temporary conditions (e.g., Poisoned), or magical item bonuses...">${active_effects}</textarea>
                    </div>
                </div>
            </div>
        </div>

    `
    return innerHTML;
}

export function createCharacterStatusSection( {
    status,
    maximum_hit_die,
    current_hit_die,
    death_save_failure,
    death_save_success
                                              } : {
    status: Record<StatusType, ICharacterStatus>,
    maximum_hit_die: string,
    current_hit_die: string,
    death_save_failure: number,
    death_save_success: number
}) :string {
    let innerHTML = `
        <div class="columns">
    `;

    Object.entries(ALL_STATUS_TYPES).forEach(([key, value]) => {
        let type = value;

        let base = 0;
        let effect = 0;
        let total = 0;
        let color = "";
        let pre_total_extra = "";
        let post_total_extra = "";
        let read_only_base = false;

        if(status[value]) {
            base = status[value].base ? status[value].base : 0;
            effect = status[value].effect ? status[value].effect : 0;
            total = status[value].total ? status[value].total : 0;
            color = status[value].color ? status[value].color : "";
            color = color == "is-dark" ? "is-primary" : color;
            pre_total_extra = status[value].pre_total_extra ? status[value].pre_total_extra : "";
            post_total_extra = status[value].post_total_extra ? status[value].post_total_extra : "";
            read_only_base = status[value].read_only_base ? status[value].read_only_base : false;
        }

        innerHTML += `
            <div class="column is-one-fifth" id="status">
                <div class="card p-4">
                    <div class="card-header is-justify-content-center">
                        <span class="title mt-4 pb-4 is-size-4">${type}</span>
                    </div>
                    <hr class="m-1" style="background: var(--bulma-card-background-color)">
                    <div class="card-content columns is-12 is-multiline m-0 p-0">
                        <div class="column is-6 is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Base</span>
                            ${read_only_base ?
                                `<input class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" disabled type="text" placeholder="0" value="${base}">`
                                :
                                `<input id="${type}-base-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${base}">`
                            }
                        </div>
                        <div class="column is-6 is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">${type === "Current-HP" ? "Shield" : "Effect"}</span>
                            <input id="${type}-effect-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${effect}">
                        </div>
                        <div class="column is-12">
                            <hr class="my-0 py-1" style="background: var(--bulma-card-background-color)">
                        </div>
                        <div class="column is-12 is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Total</span>
                            <span class="column is-12 tag ${color ? color : "is-primary"} is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0">${pre_total_extra}${total}${post_total_extra}</span>
                        </div>
                    </div>
                </div>
            </div>  
        `;
    });
    innerHTML += `    
        </div>
    `;

    innerHTML += `
    <div class="card columns p-0 m-0 is-justify-content-space-between">
        <div class="column is-3 box columns p-3 m-4 is-desktop">
            <span class="column is-7 tag is-size-5 has-text-weight-bold is-primary has-text-centered is-flex is-justify-content-center" style="height: 3rem">Maximum Hit Die</span>
            <div class="column is-1"></div>
            <input id="maximum-hit-die-input" class="column is-4 input is-size-4 has-text-weight-bold has-text-centered" style="height: 3rem" type="text" placeholder="1d6" value="${maximum_hit_die}">
        </div>
        <div class="column is-4 box columns p-3 m-4 is-justify-content-center">
            <div class="tags has-addons is-desktop">
                <div class="tag is-danger py-5 px-4" style="height: 3rem">
                    <span class="icon is-medium mr-1">
                        <i class="fas fa-xl fa-skull has-text-white"></i>
                    </span>
    `

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                    <input id="death-save-failure-${i}-checkbox" class="checkbox redCheck ml-1" type="checkbox" ${death_save_failure > 0 ? "checked" : ""}>
        `
        death_save_failure--;
    }

    innerHTML += `
                </div>
                <div class="tag has-text-weight-bold is-primary py-5" style="height: 3rem">
                    <span class="subtitle is-block has-text-weight-bold ">Death Saves</span>
                </div>
                <div class="tag is-success py-5 px-4" style="height: 3rem">
    `

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                    <input id="death-save-success-${i}-checkbox" class="checkbox greenCheck mr-1" type="checkbox" ${death_save_success > 0 ? "checked" : ""}>
        `
        death_save_success--;
    }

    innerHTML += `
                    <span class="icon ml-1">
                        <i class="fas fa-xl fa-heart-pulse has-text-white"></i>
                    </span>
                </div>
            </div>
        </div>
        <div class="column is-3 box columns p-3 m-4 is-desktop">
            <input id="current-hit-die-input" class="column is-4 input is-size-4 has-text-weight-bold has-text-centered" style="height: 3rem" type="text" placeholder="1d6" value="${current_hit_die}">
            <div class="column is-1"></div>
            <span class="column is-7 tag is-size-5 has-text-weight-bold is-primary has-text-centered is-flex is-justify-content-center" style="height: 3rem">Current Hit Die</span>
        </div>
    </div>
    `

    return innerHTML;
}

export function createAttributeSection(attributes: Record<AttributeType, IAttribute>): string  {
    let innerHTML = `
        <div class="columns">
    `;

    Object.entries(ALL_ATTRIBUTE_TYPES).forEach(([name, attribute]) => {
        if(attribute === "NONE") return;

        let attrType = attribute as AttributeType;
        let charAttr = attributes[attrType];

        let type = charAttr.type ? charAttr.type : "NONE";
        let base = charAttr.base ? charAttr.base : 0;
        let effect = charAttr.effect ? charAttr.effect : 0;
        let total = charAttr.total ? charAttr.total : 0;
        let mod = charAttr.mod ? charAttr.mod : 0;
        let isSave = charAttr.isSave ? charAttr.isSave : false;
        let save_mod = charAttr.save_mod ? charAttr.save_mod : 0;

        innerHTML += `
            <div class="column is-2" id="status">
                <div class="card p-4">
                    <div class="card-header is-justify-content-center">
                        <span class="title mt-4 pb-4 is-size-4">${type}</span>
                    </div>
                    <hr class="m-1" style="background: var(--bulma-card-background-color)">
                    <div class="card-content columns is-12 is-multiline m-0 p-0">
                        <div class="column is-6 is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Base</span>
                            <input id="${type}-base-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${base}">
                        </div>
                        <div class="column is-6 is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Effect</span>
                            <input id="${type}-effect-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${effect}">
                        </div>
                        <div class="column is-12">
                            <hr class="my-0 py-1" style="background: var(--bulma-card-background-color)">
                        </div>
                        <div class="column is-6 is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Total</span>
                            <span class="column is-12 tag is-primary is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0">${total}</span>
                        </div>
                        <div class="column is-6 is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0"><abbr title="Modifier">Mod.</abbr></span>
                            <span class="column is-12 tag ${mod != 0 ? mod > 0 ? "is-success" : "is-danger" : "is-primary"} is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0">${mod > 0 ? "+" : ""}${mod}</span>
                        </div>
                    </div>
                </div>
            </div>  
        `;
    })

    innerHTML += `    
        </div>
    `;

    return innerHTML;
}

export function createCurrencyAndStatBanner({
                                                currencies,
                                                proficiencyBonus,
                                                passivePerception,
                                                spell_casting
                                            }: {
    currencies: Record<CurrencyType, ICharacterCurrency>;
    proficiencyBonus: number;
    passivePerception: number;
    spell_casting: ISpellCasting;
}): string {
    let innerHTML = `
        <div class="box p-5">
            <div class="columns is-desktop m-0">
                
                <div class="column is-4 pr-5">
 
                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <p class="is-size-4 has-text-weight-bold">Proficiency Bonus</p>
                        </div>
                        <div class="column is-narrow py-1">
                            <span class="tag is-primary is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="min-width: 6rem; height: 2.5rem;">+${proficiencyBonus}</span>
                        </div>
                    </div>

                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">Passive Perception</span>
                        </div>
                        <div class="column is-narrow py-1">
                            <span class="tag is-primary is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="min-width: 6rem; height: 2.5rem;">
                                ${passivePerception}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="column is-4 px-5">
    `;

    Object.entries(ALL_CURRENCY_TYPES).forEach(([currencyType, color]) => {
        let type = currencyType as CurrencyType;
        let amount = 0;

        if (currencies[type])
            amount = currencies[type].amount;

        innerHTML += `
                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">${currencyType} Coins</span>
                        </div>
                        <div class="column is-narrow py-1">
                            <input id="currency-input-${currencyType}" class="input is-size-4 has-text-weight-bold has-text-centered has-text-white" style="min-width: 6rem; max-width: 6rem; height: 2.5rem; background: ${color}; border: none;" type="text" placeholder="0" value="${amount}">
                        </div>
                    </div>               
        `;
    });

    let { concentrating, spell_slots, spell_mod_type, spell_mod, con_save, spell_save, spell_attack } = spell_casting;
    let choice = ALL_ATTRIBUTE_TYPES.filter(attr => attr !== 'NONE');


    innerHTML += `
                </div>
                
                <div class="column is-4 pl-5">
 
                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">Spell Save</span>
                        </div>
                        <div class="column is-narrow py-1">
                            <span class="tag is-primary is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="min-width: 6rem; height: 2.5rem;">
                                ${spell_save}
                            </span>
                        </div>
                    </div>
                    
                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">Spell Modifier</span>
                        </div>
                        <div class="column is-narrow py-1">
                            <div class="field has-addons m-0">
                                <div class="control">
                                    <div class="select ${spell_mod != 0 ? spell_mod > 0 ? `is-success` : `is-danger` : `is-primary`}">
                                        <select id="spell-casting-mod-type-input" class="has-text-weight-bold has-text-centered ${spell_mod != 0 ? spell_mod > 0 ? `is-success` : `is-danger` : `is-primary`}" style="height: 2.5rem; min-width: 4.5rem; border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                            ${choice.map(attributeType => `
                                                <option value="${attributeType}" ${attributeType === spell_mod_type ? 'selected' : ''}>
                                                    ${attributeType}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="control">
                                    <span class="tag ${spell_mod != 0 ? spell_mod > 0 ? `is-success` : `is-danger` : `is-primary`} is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="height: 2.5rem; min-width: 6rem; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                        ${spell_mod > 0 ? "+" : ""}${spell_mod}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">Spell Attack</span>
                        </div>
                        <div class="column is-narrow py-1">
                            <span class="tag ${spell_attack != 0 ? spell_attack > 0 ? `is-success` : `is-danger` : `is-primary`} is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="min-width: 6rem; height: 2.5rem;">
                                ${spell_attack > 0 ? "+" : ""}${spell_attack}
                            </span>
                        </div>
                    </div>

                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">Con Save</span>
                        </div>
                        <div class="column is-narrow py-1">
                            <span class="tag ${con_save != 0 ? con_save > 0 ? `is-success` : `is-danger` : `is-primary`} is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="min-width: 6rem; height: 2.5rem;">
                                ${con_save > 0 ? "+" : ""}${con_save}
                            </span>
                        </div>
                    </div>

                    <div class="columns is-mobile is-vcentered mb-3">
                        <div class="column py-1">
                            <span class="is-size-4 has-text-weight-bold">Concentrating</span>
                        </div>
                        <input class="checkbox is-hidden" type="checkbox" id="spell-casting-concentrating-checkbox">
                        <div class="column is-narrow py-1 is-flex is-justify-content-center" style="min-width: 6rem;">
                            <span class="icon is-clickable is-flex is-justify-content-center" id="spell-casting-concentrating-trigger">
                                ${concentrating ?
                                `<i class="fas fa-2xl fa-eye" style="color:var(--bulma-danger)"></i>`
                                :
                                `<i class="fa-regular fa-xl fa-eye"></i>`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns m-0">
                <div class="column is-12 p-0">
                    <hr class="has-background-grey-light my-3"/>
                </div>
            </div>

            <div class="columns is-multiline m-0 px-2">
                <span class="column title is-size-4 is-12 mb-0">Spell Slots</span>
    `;

    Object.entries(spell_slots).forEach(([spell_slot_type, spell_slot]) => {
        spell_slot_type = spell_slot_type === "NaN" ? "All" : spell_slot_type;
        innerHTML += `
                <div class="column is-flex is-align-items-center">
                    <span class="is-size-5 has-text-weight-bold mr-3">${spell_slot_type}</span>
        `;
        let activeSlots = spell_slot.used;
        for(let i = 0; i < spell_slot.max; i++) {
            innerHTML += `
                    <input class="checkbox mr-2" type="checkbox" id="info-spell-slot-${spell_slot_type}-checkbox-${i}" ${activeSlots > 0 ? "checked" : ""} style="transform: scale(1.3);">
            `;
            activeSlots--;
        }

        innerHTML += `
                </div>
        `;
    });

    innerHTML += `
            </div>
        </div>
    `;
    return innerHTML;
}


export function createWeaponSection({
    weapons,
    tempProperties
                                    } : {
    weapons: Record<string, IWeapon>,
    tempProperties: WeaponPropertyType[]
    }): string {
    let weaponTypes: WeaponType[] = (Object.keys(ALL_WEAPONS) as WeaponType[]);

    let innerHTML = `
        <div class="card is-shadowless">
            <div class="card-content p-0">
                <table class="table mb-0 is-fullwidth">
                    <thead>
                        <tr style="background: var(--bulma-primary)">
                            <th class="is-size-5 has-text-weight-bold">Weapon</th>
                            <th class="is-size-5 has-text-weight-bold">Weapon Type</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 9rem"><abbr title="Modifier Type">Mod. Type</abbr></th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 5rem"><abbr title="Effect">Efc.</abbr></th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 5rem"><abbr title="Enhancement">Enh.</abbr></th>
                            <th class="is-size-5 has-text-weight-bold"><abbr title="Proficiency">Prof.</abbr></th>
                            <th class="is-size-5 has-text-weight-bold"><abbr title="Hit Modifier">Hit Mod.</abbr></th>
                            <th class="is-size-5 has-text-weight-bold">Dmg. Bonus</th>
                            <th></th>
                        </tr>
                        <tr style="background: var(--bulma-primary)">
                            <th class="is-size-5 has-text-weight-bold" colspan="3">Properties</th>
                            <th class="is-size-5 has-text-weight-bold" colspan="5">Damage Dice</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
    `
    Object.entries(weapons).forEach(([weaponName, weapon]) => {
        let name = weapon.name;
        let type = weapon.type;
        let properties = weapon.properties;
        let mod_type = weapon.mod_type;
        let mod = weapon.mod;
        let effect = weapon.effect;
        let enhancement = weapon.enhancement;
        let proficient = weapon.proficient;
        let proficiency_bonus = weapon.proficiency_bonus;
        let hit = weapon.hit;
        let damage_dice = weapon.damage_dice;
        let damage_bonus = weapon.damage_bonus;
        let weapon_property_choice = ALL_WEAPON_PROPERTIES.filter(prop => !(prop in properties));

        innerHTML += `
                        <tr>
                            <td>
                                <input id="weapons-name-input-${weaponName}" class="input has-text-weight-bold" placeholder="Dagger..." value="${name}">
                            </td>
                            <td>
                                <div class="select">
                                    <select id="weapons-type-input-${weaponName}" class="input is-capitalized">
                                        ${weaponTypes.map(weaponType => `
                                            <option value="${weaponType}" ${weaponType === type as WeaponType ? 'selected' : ''}>
                                                ${weaponType}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="select">
                                    <select id="weapons-mod-type-input-${weaponName}" class="input">
                                        ${ALL_ATTRIBUTE_TYPES.map(attributeType => `
                                            <option value="${attributeType}" ${attributeType === mod_type as AttributeType ? 'selected' : ''}>
                                                ${attributeType}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <input id="weapons-effect-input-${weaponName}" class="input has-text-weight-bold" placeholder="0" value="${effect}">
                            </td>
                            <td>
                                <input id="weapons-enhancement-input-${weaponName}" class="input has-text-weight-bold" placeholder="0" value="${enhancement}">
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="weapons-proficient-input-${weaponName}" class="checkbox" type="checkbox" disabled ${proficient ? "checked" : ""} style="transform: scale(1.5);">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center has-text-weight-bold" style="gap: 0.25rem">
                                    <span class="is-size-5 has-text-weight-bold ${hit > 0 ? "has-text-success" : hit < 0 ? "has-text-danger" : ""}">${hit > 0 ? "+" : ""}${hit}</span>
                                    <span class="icon has-text-info"><abbr title="${proficient ? `+${proficiency_bonus} Proficiency Bonus + ` : ``}${mod} Modifier + ${effect} Effect + ${enhancement} Enhancement"><i class="fas fa-info-circle"></i></abbr></span> 
                                </div>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center has-text-weight-bold" style="gap: 0.25rem">
                                    <span class="is-size-5 has-text-weight-bold ${damage_bonus > 0 ? "has-text-success" : damage_bonus < 0 ? "has-text-danger" : ""}">${damage_bonus > 0 ? "+" : ""}${damage_bonus}</span>
                                    <span class="icon has-text-info"><abbr title="${mod} Modifier + ${effect} Effect + ${enhancement} Enhancement"><i class="fas fa-info-circle"></i></abbr></span> 
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-justify-content-end is-align-items-center has-text-weight-bold" style="gap: 0.25rem">
                                    <button id="weapons-remove-${weaponName}" class="button is-danger " title="Delete Weapon" type="button">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="is-flex">
                                    <div class="select">
                                        <select id="weapons-add-property-${weaponName}" class="input is-capitalized">
                                            ${weapon_property_choice.map(weaponProperty => `
                                                <option value="${weaponProperty}">
                                                    ${weaponProperty}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
    `
        Object.entries(properties).forEach(([key, property]) => {
            innerHTML += `
                                    <div class="tags has-addons m-0 ml-3">
                                        <div class="tag  is-capitalized has-text-weight-bold is-size-6">
                                            <span>${property}</span>
                                            <a id="weapons-remove-property-${weaponName}-${property}" class="ml-2">
                                                <i class="fa-solid fa-xmark"></i>
                                            </a>
                                        </div>
                                    </div>
        `
        })

        innerHTML += `
                                </div>
                            </td>
                            <td colspan="6">
                                <input id="weapons-damage-dice-input-${weaponName}" class="input" placeholder="1d4 slash" value="${damage_dice}">
                            </td>
                        </tr>
                        <tr style="background: var(--bulma-primary)">
                            <td colspan="9"></td>
                        </tr>
    `
    })

    let weapon_property_choice = ALL_WEAPON_PROPERTIES.filter(prop => !tempProperties.includes(prop));

    innerHTML += `
                        <tr class="">
                            <td>
                                <input id="weapons-name-input-new" class="input" placeholder="Dagger...">
                            </td>
                            <td>
                                <div class="select">
                                    <select id="weapons-type-input-new" class="input is-capitalized">
                                        ${weaponTypes.map(weaponType => `
                                            <option value="${weaponType}">
                                                ${weaponType}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="select">
                                    <select id="weapons-mod-type-input-new" class="input">
                                        ${ALL_ATTRIBUTE_TYPES.map(attributeType => `
                                            <option value="${attributeType}">
                                                ${attributeType}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <input id="weapons-effect-input-new" class="input has-text-weight-bold" placeholder="0">
                            </td>
                            <td>
                                <input id="weapons-enhancement-input-new" class="input has-text-weight-bold" placeholder="0">
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <span class="is-size-4 has-text-weight-bold">-</span>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center" style="gap: 0.25rem">
                                    <span class="is-size-4 has-text-weight-bold">-</span>
                                    <span class="icon has-text-info"><abbr title="Proficiency Bonus + Modifier + Effect + Enhancement"><i class="fas fa-info-circle"></i></abbr></span>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center" style="gap: 0.25rem">
                                    <span class="is-size-4 has-text-weight-bold">-</span>
                                    <span class="icon has-text-info"><abbr title="Modifier + Effect + Enhancement"><i class="fas fa-info-circle"></i></abbr></span>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-justify-content-end is-align-items-center" style="gap: 0.25rem">
                                    <button id="weapons-add-new" class="button is-success " title="Add Weapon" type="button">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr class="">
                            <td colspan="3">
                                <div class="is-flex">
                                    <div class="select">
                                        <select id="weapons-add-property-new" class="input is-capitalized">
                                            ${weapon_property_choice.map(weaponProperty => `
                                                <option value="${weaponProperty}">
                                                    ${weaponProperty}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
    `

    Object.entries(tempProperties).forEach(([key, property]) => {
        innerHTML += `
                                    <div class="tags has-addons m-0 ml-3">
                                        <div class="tag  is-capitalized has-text-weight-bold is-size-6">
                                            <span>${property}</span>
                                            <a id="weapons-remove-temp-property-${property}" class="ml-2">
                                                <i class="fa-solid fa-xmark"></i>
                                            </a>
                                        </div>
                                    </div>
            `
    })

    innerHTML += `
                                </div>
                            </td>
                            <td colspan="6">
                                <input id="weapons-damage-dice-input-new" class="input" placeholder="1d4 slash">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `

    return innerHTML;
}

export function createSpellSection(spells: Record<string, ISpell>): string {
    let innerHTML = `
        <div class="card is-shadowless">
            <div class="card-content p-0">
                <table class="table mb-0 is-fullwidth">
                    <thead>
                        <tr style="background: var(--bulma-primary)">
                            <th class="is-size-5 has-text-weight-bold" style="width: 6rem">Level</th>
                            <th class="is-size-5 has-text-weight-bold">Name</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 10rem">Casting Time</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 6rem">Range</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 3rem"><abbr title="Concentration - Do you need to focus?">Conc.</abbr></th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 3rem"><abbr title="Verbal - Do you need to speak?">V</abbr></th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 3rem"><abbr title="Somatic - Do you need to see?">S</abbr></th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 3rem"><abbr title="Material - Do you need something?">M</abbr></th>
                            <th style="width: 3rem"></th>
                        </tr>
                        <tr style="background: var(--bulma-primary)">
                            <th class="is-size-5 has-text-weight-bold" colspan="8">Notes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
    `

    Object.entries(spells).forEach(([spellName, spell]) => {
        innerHTML += `
                        <tr>
                            <td>
                                <input id="spells-level-input-${spellName}" class="input" placeholder="CT" value="${spell.level === 0 ? "CT" : spell.level}">
                            </td>
                            <td>
                                <input id="spells-name-input-${spellName}" class="input has-text-weight-bold" placeholder="Create Bonfire" value="${spell.name}">
                            </td>
                            <td>
                                <input id="spells-casting-time-input-${spellName}" class="input" placeholder="1 action" value="${spell.casting_time}">
                            </td>
                            <td>
                                <input id="spells-range-input-${spellName}" class="input" placeholder="60f" value="${spell.range}">
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-conc-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Concentration" ${spell.concentration ? "checked" : ""}>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-v-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Verbal (V)" ${spell.verbal ? "checked" : ""}>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-s-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Somatic (S)" ${spell.somatic ? "checked" : ""}>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-m-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Material (M)" ${spell.material ? "checked" : ""}>
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-justify-content-end is-align-items-center" style="gap: 0.25rem">
                                    <button id="spells-remove-${spellName}" class="button is-danger " title="Remove Spell" type="button">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="9">
                                <textarea spellcheck="false" id="spells-notes-input-${spellName}" class="textarea" rows="${spell.notes.split(/\r\n|\r|\n/).length + 3}" placeholder="1 minute - Create a bonfire on ground that you can see withing range. Caution! Hot!">${spell.notes}</textarea>
                            </td>
                        </tr>          
                        <tr style="background: var(--bulma-primary)">
                            <td colspan="9"></td>
                        </tr>
    `
    });

    innerHTML += `
                        <tr class="">
                            <td>
                                <input id="spells-level-input-new" class="input" placeholder="CT">
                            </td>
                            <td>
                                <input id="spells-name-input-new" class="input" placeholder="Create Bonfire">
                            </td>
                            <td>
                                <input id="spells-casting-time-input-new" class="input" placeholder="1 action">
                            </td>
                            <td>
                                <input id="spells-range-input-new" class="input" placeholder="60f">
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-conc-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Concentration">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-v-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Verbal (V)">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-s-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Somatic (S)">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-align-items-center">
                                    <input id="spells-m-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);" title="Material (M)">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-justify-content-end is-align-items-center" style="gap: 0.25rem">
                                    <button id="spells-add-new" class="button is-success " title="Add Spell" type="button">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr class="">
                            <td colspan="9">
                                <textarea spellcheck="false" id="spells-notes-input-new" class="textarea" rows="2" placeholder="1 minute - Create a bonfire on ground that you can see withing range. Caution! Hot!"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>          
    `
    return innerHTML;
}

export function createEntitySection(entities: Record<string, IEntity>): string {
    let innerHTML = `
        <div class="card is-shadowless">
            <div class="card-content p-0">
                <table class="table mb-0 is-fullwidth">
                    <thead>
                        <tr style="background: var(--bulma-primary)">
                            <th class="is-size-5 has-text-weight-bold">Name</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 6rem">Speed</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 6rem"><abbr title="Armor-Class">AC</abbr></th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 12rem"><abbr title="Hit Points">HP</abbr> / Max</th>
                            <th class="is-size-5 has-text-weight-bold" style="width: 12rem">Capacity / Max</th>
                            <th style="width: 3rem"></th>
                        </tr>
                        <tr style="background: var(--bulma-primary)">
                            <th class="is-size-5 has-text-weight-bold" colspan="3">Notes</th>
                            <th class="is-size-5 has-text-weight-bold" colspan="3">Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
    `

    Object.entries(entities).forEach(([entityName, entity]) => {
        innerHTML += `
                        <tr>
                            <td>
                                <input id='entities-name-input-${entityName}' class="input has-text-weight-bold" placeholder="Wheelbarrow" value='${entity.name}'>
                            </td>
                            <td>
                                <input id="entities-speed-input-${entityName}" class="input" placeholder="60f" value="${entity.speed}">
                            </td>
                            <td>
                                <input id="entities-ac-input-${entityName}" class="input" placeholder="10" value="${entity.ac}">
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 5px;">
                                    <input id="entities-hp_current-input-${entityName}" class="input" placeholder="50" value="${entity.hp_current}">
                                    <span>/</span>
                                    <input id="entities-hp_max-input-${entityName}" class="input" placeholder="100" value="${entity.hp_max}">
                                </div>
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 5px;">
                                    <input id="entities-capacity_current-input-${entityName}" class="input" placeholder="100 St." value="${entity.current_capacity}">
                                    <span>/</span>
                                    <input id="entities-capacity_max-input-${entityName}" class="input" placeholder="1000 St." value="${entity.max_capacity}">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-justify-content-end is-align-items-center" style="gap: 0.25rem">
                                    <button id="entities-remove-${entityName}" class="button is-danger " title="Remove Entity" type="button">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <textarea spellcheck="false" id="entities-notes-input-${entityName}" class="textarea" rows="${entity.notes.split(/\r\n|\r|\n/).length + 3}" placeholder="Behavior, active effects, or companion traits..." style="height: 100%">${entity.notes}</textarea>
                            </td>
                            <td colspan="3">
                                <textarea spellcheck="false" id="entities-inventory-input-${entityName}" class="textarea" rows="${entity.inventory.split(/\r\n|\r|\n/).length + 3}" placeholder="Barding, saddlebags, cargo, or equipped gear..." style="height: 100%">${entity.inventory}</textarea>
                            </td>
                        </tr>
                        <tr style="background: var(--bulma-primary)">
                            <td colspan="6"></td>
                        </tr>
    `
    })

    innerHTML += `
                        <tr class="">
                            <td>
                                <input id='entities-name-input-new' class="input" placeholder="Wheelbarrow">
                            </td>
                            <td>
                                <input id="entities-speed-input-new" class="input" placeholder="60f">
                            </td>
                            <td>
                                <input id="entities-ac-input-new" class="input" placeholder="10">
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 5px;">
                                    <input id="entities-hp_current-input-new" class="input" placeholder="50">
                                    <span>/</span>
                                    <input id="entities-hp_max-input-new" class="input" placeholder="100">
                                </div>
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 5px;">
                                    <input id="entities-capacity_current-input-new" class="input" placeholder="100 St.">
                                    <span>/</span>
                                    <input id="entities-capacity_max-input-new" class="input" placeholder="1000 St.">
                                </div>
                            </td>
                            <td class="is-vcentered">
                                <div class="is-flex is-justify-content-end is-align-items-center" style="gap: 0.25rem">
                                    <button id="entities-add-new" class="button is-success " title="Add Entity" type="button">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr class="">
                            <td colspan="3">
                                <textarea spellcheck="false" id="entities-notes-input-new" class="textarea" rows="2" placeholder="Behavior, active effects, or companion traits..."></textarea>
                            </td>
                            <td colspan="3">
                                <textarea spellcheck="false" id="entities-inventory-input-new" class="textarea" rows="2" placeholder="Barding, saddlebags, cargo, or equipped gear..."></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `

    return innerHTML
}

export function createActiveProficienciesSection(proficiencies: Record<string, IProficiency>): string {
    let innerHTML = `
    `;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        innerHTML +=`
                <div class="column is-4 columns is-multiline mb-1">
                    <div class="column is-12 box">
                        <div class="column is-12">
                            <div class="tag is-link is-flex is-align-items-center p-4">
                                <span class="icon">
                                    <i class="fas fa-lg ${ALL_PROFICIENCIES_ICONS[i]}"></i>
                                </span>
                                <span class="has-text-weight-bold is-size-6">${ALL_PROFICIENCIES[i]}</span>
                            </div>
                        </div>
                    `

        let sortedProficiencies = Object.entries(proficiencies).sort();

        sortedProficiencies.forEach(([proficiencyName, proficiency]) => {
            if(proficiency.proficient <= 0) return;
            if(proficiency.type !== ALL_PROFICIENCIES[i]) return;

            let color =
                proficiency.mod != 0 ?
                    proficiency.proficient == 1 ?
                        proficiency.mod > 0 ? "is-success" : "is-warning"
                        : proficiency.mod > 0 ? "is-info"
                    : "is-danger"
                : "is-primary"
            ;

            innerHTML += `
                        <div class="columns column is-12 p-0 m-0">
                            <div class="column is-12 tags has-addons is-flex is-align-items-stretch py-1">
                                <span class="tag is-capitalized ${color} column is-size-6 ${proficiency.skill_effects ? `is-4` : `is-8`} has-text-weight-semibold is-flex is-justify-content-start py-1" style="white-space: normal; height: auto !important;">${proficiencyName}</span>
                                ${proficiency.skill_effects ? `<span class="tag is-capitalized ${color} column is-size-6 is-4 has-text-weight-semibold is-flex is-justify-content-start py-1" style="white-space: normal; height: auto !important;">${proficiency.skill_effects}</span>` : ``}
                                <span class="tag ${color} column is-size-6 is-2 has-text-weight-semibold is-flex is-justify-content-start py-1" style="height: auto !important;">${proficiency.mod_type != "NONE" ? proficiency.mod_type : ""}</span>
                                <span class="tag ${color} column is-size-6 is-2 has-text-weight-semibold is-flex is-justify-content-end py-1" style="height: auto !important;">${proficiency.mod_type != "NONE" ? proficiency.mod > 0 ? "+" + proficiency.mod : proficiency.mod  : ""}</span>
                            </div>
                        </div>
            `
        })

        innerHTML +=`
                    </div>
                </div>
            </div>
    `;
    }

    innerHTML +=`
        </div>
    `;

    return innerHTML;
}

export function createProficiencySection({
    proficiency,
    activeProficiencyTab
                                         }: {
        proficiency: Record<string,
        IProficiency>, activeProficiencyTab: string
}): string {
    let innerHTML =`
        <div class="tabs is-left is-boxed" id="proficiency-tabs">
            <ul>
    `;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        innerHTML +=`
                <li data-tab="${ALL_PROFICIENCIES[i]}-tab" class="${ALL_PROFICIENCIES[i] == activeProficiencyTab ? "is-active" : ""} is-size-5">
                    <a>
                        <span class="icon is-small">
                            <i class="fas ${ALL_PROFICIENCIES_ICONS[i]}"></i>
                        </span>
                        <span class="label is-size-5 has-text-weight-semibold">${ALL_PROFICIENCIES[i]}</span>
                    </a>
                </li>
    `;
    }

    innerHTML += `
            </ul>
        </div>
    `;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        const groups = Object.values(ALL_PROFICIENCY_TYPES);
        const activeGroup = groups[i];

        const isOnlyNone = Object.values(groups[i]).every(value => value === 'NONE');

        innerHTML += `
        <div id="${ALL_PROFICIENCIES[i]}-list" class="${ALL_PROFICIENCIES[i] == activeProficiencyTab ? "" : "is-hidden"} card-content pt-0">
            <table class="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th class="is-narrow is-size-5 has-text-weight-bold" style="min-width: 5rem"><abbr title="Proficiency">Prof.</abbr></th>
                        <th class="is-size-5 has-text-weight-bold">Name</th>
                        ${isOnlyNone ? "" : `<th class="is-narrow is-size-5 has-text-weight-bold" style="min-width: 5rem"><abbr title="Attribute-Type">Attr.</abbr></th>`}
                        ${isOnlyNone ? "" : `<th class="is-narrow is-size-5 has-text-weight-bold" style="min-width: 5rem"><abbr title="Modifier">Mod.</abbr></th>`}
                    </tr>
                </thead>
                <tbody>
        `;

        if (activeGroup) {
            Object.entries(activeGroup).sort().forEach(([std_proficiency, attribute]) => {
                let noneAttribute = attribute === "NONE";
                let proficiency_level = 0;
                let mod = 0;

                if (proficiency[std_proficiency]) {
                    proficiency_level = proficiency[std_proficiency].proficient;
                    mod = proficiency[std_proficiency].mod;
                }

                innerHTML += `
                    <tr>
                        <td class="is-vcentered">
            `;

                for (let checkboxNum = 1; checkboxNum <= 2; checkboxNum++) {
                    const isChecked = proficiency_level >= checkboxNum ? "checked" : "";

                    innerHTML += `
                        <input type="checkbox" id="${std_proficiency}-checkbox-${checkboxNum}" ${isChecked} class="checkbox mr-2" style="transform: scale(1.3)"/>
                    `;
                }


                innerHTML += `
                        </td>
                        <td class="is-vcentered"><p class="label is-size-5 has-text-weight-semibold is-capitalized">${std_proficiency}</p></td>
                        ${noneAttribute ? `` : `
                        <td>
                            <span class="tag is-size-6 has-text-weight-semibold ${noneAttribute? "is-hidden" : "is-info"}" style="width: 4rem; justify-content: center;">${attribute}</span>
                        </td>
                        <td>
                            <span class="tag is-size-6 has-text-weight-semibold ${mod > 0 ? "is-success" : mod < 0 ? "is-danger" : "is-primary"}" style="width: 4rem; justify-content: center;">${mod}</span>
                        </td>
                        `}
            `;
            })

            innerHTML += `
                </tbody>
            </table>
        </div>
        `;
        }
    }

    return innerHTML;
}

