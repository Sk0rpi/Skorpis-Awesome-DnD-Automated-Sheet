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
        <div class="box columns p-0 m-0 is-mobile is-multiline">
            <input id="import-character-input" type="file" class="is-hidden" accept=".json">
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">
                <a id="import-character-button" class="button is-success is-flex is-justify-content-center p-4" style="height: 100%">
                    <span class="icon mr-0">
                        <i class="fas fa-file-import"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Import</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">
                <a id="export-character-button" class="button is-info is-flex is-justify-content-center p-4" style="height: 100%">
                    <span class="icon mr-0">
                        <i class="fas fa-file-export"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Export</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">            
                <a class="button is-love is-flex is-justify-content-center p-4" style="height: 100%" href="https://ko-fi.com/sk0rp1" target="_blank" rel="noopener noreferrer">
                    <span class="icon mr-0">
                        <i class="fas fa-hand-holding-heart"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Support Me</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">            
                <a class="button is-github is-flex is-justify-content-center p-4" style="height: 100%" href="https://github.com/Sk0rpi/Skorpis-Awesome-DnD-Automated-Sheet" target="_blank" rel="noopener noreferrer">
                    <span class="icon mr-0">
                        <i class="fa-brands fa-github"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Github</span>
                </a>
            </div>
            
            <div class="column is-2-fullhd is-4-tablet is-12-mobile">            
                <a id="create-character-button" class="button is-danger is-flex is-justify-content-center p-4" style="height: 100%">
                    <span class="icon mr-0">
                        <i class="fas fa-user-plus"></i>
                    </span>
                    <span class="title has-text-white pl-1 is-size-5 has-text-weight-semibold" style="white-space: normal;">Create New</span>
                </a>
            </div>
        </div>
    `;
    return innerHTML;
}

export function createSiteMenuSection(activeSiteMenuTab: string): string {
    let innerHTML= `
        <div class="tabs column is-medium is-full p-0 mb-4" id="site-menu-tabs">
            <ul>
                <li class="${`menu-nav-character` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-character">
                    <a>
                        <span class="icon is-small"><i class="fas fa-user-shield" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Character</span>
                    </a>
                </li>
                <li class="${`menu-nav-proficient-skills-notes` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-proficient-skills-notes">
                    <a>
                        <span class="icon is-small"><i class="fas fa-bolt" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Proficient Skills & Notes</span>
                    </a>
                </li>
                <li class="${`menu-nav-attributes` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-attributes">
                    <a>
                        <span class="icon is-small"><i class="fas fa-shield-alt" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Attributes</span>
                    </a>
                </li>
                <li class="${`menu-nav-weapons-spells-entities` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-weapons-spells-entities">
                    <a>
                        <span class="icon is-small"><i class="fas fa-magic" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Weapons, Spells & Entities</span>
                    </a>
                </li>
                <li class="${`menu-nav-all-skills` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-all-skills">
                    <a>
                        <span class="icon is-small"><i class="fas fa-book" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">All Skills</span>
                    </a>
                </li>
            </ul>
        </div>
    `
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
        <div class="columns is-multiline has-text-centered is-justify-content-space-between">
            <div class="column is-3-fullhd is-12-mobile"">
                <div class="card p-4" style="height:100%">
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
                    </div>
                </div>
            </div>
            
            <div class="column is-9-fullhd is-12-mobile">
                <div class="columns is-multiline is-mobile">
                
                    <div class="column is-2-fullhd is-6-tablet is-6-mobile">
                        <div class="card p-4 has-text-centered" style="height:100%">
                            <label class="label is-size-4 has-text-weight-semibold pb-4 mb-0"><abbr title="Inspiration">Insp.</abbr></label>
                            <div class="card-body is-flex is-align-items-center is-justify-content-center">
                                <input class="checkbox is-hidden" type="checkbox" id="info-inspiration-checkbox">
                                <span class="icon is-medium mr-0 is-clickable" id="info-inspiration-trigger">
                                    ${characterInspiration ? `<i class="fas fa-2xl fa-star has-text-warning"></i>` : `<i class="fa-regular fa-2xl fa-star"></i>`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-2-fullhd is-6-tablet is-6-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Level</label>
                            <div class="card-body">
                                <input id="info-level-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="1" value="${level}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-4-fullhd is-12-tablet is-12-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Name</label>
                            <div class="card-body">
                                <input id="info-name-input" class="input is-medium has-text-weight-bold has-text-centered has-text-weight-normal" type="text" placeholder="Onestone Bluntheus" value="${name}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-4-fullhd is-12-tablet is-12-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Background</label>
                            <div class="card-body">
                                <input id="info-background-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Professional Home Brewer" value="${background}">
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="column is-3-fullhd is-6-tablet is-12-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Species</label>
                            <div class="card-body">
                                <input id="info-species-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Fairy-Giant" value="${species}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-3-fullhd is-6-tablet is-12-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Alignment</label>
                            <div class="card-body">
                                <input id="info-alignment-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Chaotic Evil" value="${alignment}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-6-fullhd is-12-tablet is-12-mobile">
                        <div class="card p-4 has-text-centered">
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
                        </div>
                    </div>
                    
                    <div class="column is-3-fullhd is-6-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Age</label>
                            <div class="card-body">
                                <input id="notes-age-input" class="input is-medium has-text-weight-bold has-text-centered" style="height: 3.15rem" type="text" placeholder="24" value="${age > 0 ? `${age}` : ``}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-3-fullhd is-6-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Height</label>
                            <div class="card-body">
                                <input id="notes-height-input" class="input is-medium has-text-weight-bold has-text-centered" style="height: 3.15rem" type="text" placeholder="180 cm" value="${height > 0 ? `${height} cm` : ``}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-3-fullhd is-6-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Weight</label>
                            <div class="card-body">
                                <input id="notes-weight-input" class="input is-medium has-text-weight-bold has-text-centered" style="height: 3.15rem" type="text" placeholder="75 kg" value="${weight > 0 ? `${weight} kg` : ``}">
                            </div>
                        </div>
                    </div>
                    <div class="column is-3-fullhd is-6-mobile">
                        <div class="card p-4 has-text-centered">
                            <label class="label is-size-4 has-text-weight-semibold">Size</label>
                            <div class="card-body">
                                <span class="tag is-size-4 has-text-weight-bold is-flex is-justify-content-center is-align-items-center" style="height: 3.15rem">${size}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="columns has-text-centered is-multiline">
            <div class="column is-6-fullhd is-12-tablet is-12-mobile">
                <div class="card is-flex is-flex-direction-column" style="height: 100%">
                    <label class="label is-size-4 has-text-weight-semibold mb-0 pt-4">Quick-Notes</label>
                    <div class="card-body p-4" style="height: 100%">
                        <textarea spellcheck="false" id="info-quick-notes-textarea" class="textarea is-medium" style="height: 100%" placeholder="Physical appearance, personality traits, campaign notes, factions, and current quest goals...">${quick_notes}</textarea>
                    </div>
                </div>
            </div>
            <div class="column is-6-fullhd is-12-tablet is-12-mobile">
                <div class="card is-flex is-flex-direction-column" style="height: 100%">
                    <label class="label is-size-4 has-text-weight-semibold mb-0 pt-4">Active-Effects</label>
                    <div class="card-body p-4" style="height: 100%">
                        <textarea spellcheck="false" id="info-active-effects-textarea" class="textarea is-medium" style="height: 100%" placeholder="Active effects (e.g., Bless, Shield), temporary conditions (e.g., Poisoned), or magical item bonuses...">${active_effects}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `;
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
        <div class="columns is-mobile is-multiline is-justify-content-center">
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
            <div class="column is-one-fifth-fullhd is-4-tablet ${type === "Current-HP" ? " is-12-mobile" : "is-6-mobile"}" id="status">
                <div class="card p-4 is-flex is-flex-direction-column" style="height: 100%">
                    <div class="card-header is-justify-content-center">
                        <span class="title mt-4 pb-4 is-size-4 has-text-centered">${type}</span>
                    </div>
                    <hr class="m-1" style="background: var(--bulma-card-background-color)">
                    
                    <div class="card-content columns is-12 is-multiline m-0 p-0 mt-auto">
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
                        
                        <div class="column is-12 is-align-content-center pt-0">
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
        <div class="card mt-0 mr-0 mb-4 ml-0 p-2">
            
            <div class="columns is-mobile is-vcentered is-variable is-2 m-0 is-mobile is-multiline">
                
                <div class="column is-2-fullhd is-6-tablet is-6-mobile">
                    <span class="tag is-size-5 has-text-weight-bold is-primary has-text-centered is-flex is-justify-content-center w-100" style="height: 3rem; width: 100%; white-space: normal">Maximum Hit Die</span>
                </div>
                
                <div class="column is-1-fullhd is-6-tablet is-6-mobile">
                    <input id="maximum-hit-die-input" class="input is-size-5 has-text-weight-bold has-text-centered" style="height: 3rem;" type="text" placeholder="1d6" value="${maximum_hit_die}">
                </div>
                
                <div class="column is-2-fullhd is-4-tablet is-4-mobile">
                    <div class="tag is-danger is-flex is-justify-content-center" style="height: 3rem; width: 100%;">
                        <span class="icon is-medium mr-1">
                            <i class="fas fa-xl fa-skull has-text-white"></i>
                        </span>
    `;

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                        <input id="death-save-failure-${i}-checkbox" class="checkbox redCheck ml-1" type="checkbox" ${death_save_failure > 0 ? "checked" : ""}>
        `;
        death_save_failure--;
    }

    innerHTML += `
                    </div>              
                </div>
                
                <div class="column is-2-fullhd is-4-tablet is-4-mobile">
                    <div class="tag has-text-weight-bold is-primary is-flex is-justify-content-center" style="height: 3rem; width: 100%;">
                        <span class="subtitle is-block has-text-weight-bold has-text-centered" style="white-space: normal">Death Saves</span>
                    </div>
                </div>
                
                <div class="column is-2-fullhd is-4-tablet is-4-mobile">
                    <div class="tag is-success is-flex is-justify-content-center" style="height: 3rem; width: 100%;">
    `;

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                        <input id="death-save-success-${i}-checkbox" class="checkbox greenCheck mr-1" type="checkbox" ${death_save_success > 0 ? "checked" : ""}>
        `;
        death_save_success--;
    }

    innerHTML += `
                        <span class="icon ml-1">
                            <i class="fas fa-xl fa-heart-pulse has-text-white"></i>
                        </span>
                    </div>
                </div>
                
                <div class="column is-1-fullhd is-6-tablet is-6-mobile">
                    <input id="current-hit-die-input" class="input is-size-5 has-text-weight-bold has-text-centered" style="height: 3rem;" type="text" placeholder="1d6" value="${current_hit_die}">
                </div>
                
                <div class="column is-2-fullhd is-6-tablet is-6-mobile">
                    <span class="tag is-size-5 has-text-weight-bold is-primary has-text-centered is-flex is-justify-content-center" style="height: 3rem; width: 100%; white-space: normal">Current Hit Die</span>
                </div>
                
            </div>
        </div>
    `;


    return innerHTML;
}

export function createAttributeSection(attributes: Record<AttributeType, IAttribute>): string  {
    let innerHTML = `
        <div class="columns is-12 is-mobile is-multiline">
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
            <div class="column is-2-fullhd is-4-tablet is-4-mobile" id="status">
                <div class="card p-4">
                    <div class="card-header is-justify-content-center">
                        <span class="title mt-4 pb-4 is-size-4">${type}</span>
                    </div>
                    <hr class="m-1" style="background: var(--bulma-card-background-color)">
                    <div class="card-content columns is-12-mobile is-multiline m-0 p-0">
                        <div class="column is-6-fullhd is-12-mobile is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Base</span>
                            <input id="${type}-base-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${base}">
                        </div>
                        <div class="column is-6-fullhd is-12-mobile  is-align-content-center">
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Effect</span>
                            <input id="${type}-effect-input" class="column is-12 input is-size-5 has-text-weight-bold has-text-centered m-0 p-0" type="text" placeholder="0" value="${effect}">
                        </div>
                        <div class="column is-12">
                            <hr class="my-0 py-1" style="background: var(--bulma-card-background-color)">
                        </div>
                        <div class="column is-6-fullhd is-12-mobile  is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0">Total</span>
                            <span class="column is-12 tag is-primary is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0">${total}</span>
                        </div>
                        <div class="column is-6-fullhd is-12-mobile  is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0"><abbr title="Modifier">Mod.</abbr></span>
                            <span class="column is-12 tag ${mod != 0 ? mod > 0 ? "is-success" : "is-danger" : "is-primary"} is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0">${mod > 0 ? "+" : ""}${mod}</span>
                        </div>
                        <div class="column is-12">
                            <hr class="my-0 py-1" style="background: var(--bulma-card-background-color)">
                        </div>
                        <div class="column is-6-fullhd is-12-mobile  is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0"><abbr title="Adds your proficiency bonus to saves (resisting spells/traps) with this attribute. Formula: d20 + ${save_mod} (the value on the right)">Save?</abbr></span>
                            <div id="${type}-checkbox-button" class="column is-12 tag button is-flex is-justify-content-center is-size-4 has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0" style="${isSave ? "border-color: var(--bulma-link)" : ""}">
                                <input type="checkbox" id="${type}-checkbox" ${isSave ? "checked" : ""} style="transform: scale(1.5)"/>
                            </div>
                        </div>
                        <div class="column is-6-fullhd is-12-mobile  is-align-content-center pt-0"   >
                            <span class="column is-12 is-size-5 has-text-weight-semibold is-block has-text-black has-text-centered m-0 p-0"><abbr title="Modifier">Mod.</abbr></span>
                            <div class="column is-12 tag is-size-4 ${save_mod != 0 ? save_mod > 0 ? "is-success" : "is-danger" : "is-primary"} has-text-weight-extrabold has-text-centered is-align-content-center m-0 p-0" style="width: 100%">${save_mod > 0 ? "+" : ""}${save_mod}</div>
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

    let { concentrating, spell_slots, spell_mod_type, spell_mod, con_save, spell_save, spell_attack } = spell_casting;
    let choice = ALL_ATTRIBUTE_TYPES.filter(attr => attr !== 'NONE');

    let innerHTML = `
                <div class="columns is-multiline p-0 mb-3">
    `;


    Object.entries(ALL_CURRENCY_TYPES).forEach(([currencyType, color]) => {
        let type = currencyType as CurrencyType;
        let amount = 0;

        if (currencies[type])
            amount = currencies[type].amount;

        innerHTML += `
                <div class="column is-12-mobile is-6-tablet is-3-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid ${color}">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9-mobile is-9-tablet is-8-fullhd">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">${currencyType} Coins</p>
                            </div>
                            <div class="column is-3-mobile is-3-tablet is-4-fullhd">
                                <input id="currency-input-${currencyType}" class="input is-size-4 has-text-weight-bold has-text-centered has-text-white" style="width: 100%; height: 2.5rem; background: ${color}; border: none;" type="text" placeholder="0" value="${amount}">
                            </div>
                        </div>
                    </div>
                </div>          
        `;
    });

    innerHTML += `
                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(--bulma-primary)">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Proficiency Bonus</p>
                            </div>
                            <div class="column is-3">
                                <span class="tag is-primary is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="width: 100%; height: 2.5rem;">+${proficiencyBonus}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(--bulma-primary)">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Passive Perception</p>
                            </div>
                            <div class="column is-3">
                                <span class="tag is-primary is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="width: 100%; height: 2.5rem;">${passivePerception}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(--bulma-primary)">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Spell Save</p>
                            </div>
                            <div class="column is-3">
                                <span class="tag is-primary is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="width: 100%; height: 2.5rem;">${spell_save}</span>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    innerHTML += `
                
                
                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(${spell_mod != 0 ? spell_mod > 0 ? `--bulma-success` : `--bulma-danger` : `--bulma-primary`})">
                        <div class="columns is-mobile is-multiline is-vcentered">
                            <div class="column is-6-fullhd is-6-tablet is-6-mobile">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Spell Modifier</p>
                            </div>
                            <div class="column is-3-fullhd is-3-tablet is-3-mobile">
                                <div class="select ${spell_mod != 0 ? spell_mod > 0 ? `is-success` : `is-danger` : `is-primary`}" style="width: 100%">
                                    <select id="spell-casting-mod-type-input" class="has-text-weight-bold has-text-centered ${spell_mod != 0 ? spell_mod > 0 ? `is-success` : `is-danger` : `is-primary`} p-0" style="width: 100%; height: 2.5rem">
                                        ${choice.map(attributeType => `
                                            <option value="${attributeType}" ${attributeType === spell_mod_type ? 'selected' : ''}>
                                                ${attributeType}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="column is-3-fullhd is-3-tablet is-3-mobile">
                                <span class="tag ${spell_mod != 0 ? spell_mod > 0 ? `is-success` : `is-danger` : `is-primary`} is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="width: 100%; height: 2.5rem;">
                                    ${spell_mod > 0 ? "+" : ""}${spell_mod}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(${spell_mod != 0 ? spell_mod > 0 ? `--bulma-success` : `--bulma-danger` : `--bulma-primary`})">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Spell Attack</p>
                            </div>
                            <div class="column is-3">
                                <span class="tag ${spell_attack != 0 ? spell_attack > 0 ? `is-success` : `is-danger` : `is-primary`} is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="width: 100%; height: 2.5rem;">
                                ${spell_attack > 0 ? "+" : ""}${spell_attack}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(${spell_mod != 0 ? spell_mod > 0 ? `--bulma-success` : `--bulma-danger` : `--bulma-primary`})">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Con Save</p>
                            </div>
                            <div class="column is-3">
                                <span class="tag ${con_save != 0 ? con_save > 0 ? `is-success` : `is-danger` : `is-primary`} is-size-4 has-text-weight-bold is-flex is-justify-content-center" style="width: 100%; height: 2.5rem;">
                                ${con_save > 0 ? "+" : ""}${con_save}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="box px-4 py-2" style="border: 1px solid var(${concentrating ? "--bulma-link" : "--bulma-primary"})">
                        <div class="columns is-mobile is-vcentered">
                            <div class="column is-9">
                                <p class="is-size-4 is-capitalized has-text-weight-bold has-text-black">Concentrating</p>
                            </div>
                            <div class="column is-3">
                                <div id="spell-casting-concentrating-checkbox-button" class="column is-12 button is-size-4 has-text-weight-extrabold m-0 p-0" style="${concentrating ? "border-color: var(--bulma-link)" : ""}">
                                    <input class="checkbox is-hidden" type="checkbox" id="spell-casting-concentrating-checkbox">
                                    <span class="icon is-clickable m-0" id="">
                                        ${concentrating ?
                                            `<i class="fas fa-eye" style="color:var(--bulma-danger)"></i>`
                                            :
                                            `<i class="fa-regular fa-eye"></i>`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column is-12-mobile is-12-tablet is-12-fullhd">
                    <span class="column card px-4 py-2 is-12 title is-size-4 is-block m-0 has-text-black has-text-centered">Spell Slots</span>
                </div>
                <div class="column is-12-mobile is-12-tablet is-12-fullhd">
                    <div class="card px-4 py-3 is-flex is-justify-content-center is-flex-wrap-wrap" style="gap: 2rem 1rem;">
                    ${Object.keys(spell_slots).length === 0 ? `<span class="is-size-5 has-text-weight-bold has-text-dark mr-4">You don't have any spell slots (yet?)`: ""}
    `;

    Object.entries(spell_slots).forEach(([spell_slot_type, spell_slot]) => {
        spell_slot_type = spell_slot_type === "NaN" ? "All" : spell_slot_type;
        innerHTML += `
                        <div class="is-flex is-align-items-center is-flex is-justify-content-center is-flex-wrap-wrap" style="gap: 2rem 1rem;">
                            <span class="is-size-4 has-text-weight-bold has-text-black mr-4">${spell_slot_type}</span>
        `;
        let activeSlots = spell_slot.used;
        for(let i = 0; i < spell_slot.max; i++) {
            innerHTML += `    
                            <input class="checkbox mr-4" type="checkbox" id="info-spell-slot-${spell_slot_type}-checkbox-${i}" ${activeSlots > 0 ? "checked" : ""} style="transform: scale(2); cursor: pointer;">
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
            <div class="card-content p-3">
                <div class="columns is-multiline">
    `

    Object.entries(weapons).forEach(([weaponName, weapon]) => {
        let weapon_property_choice = ALL_WEAPON_PROPERTIES.filter(prop => !(prop in weapon.properties));
        innerHTML += `
                    <div class="column is-12 is-6-fullhd is-4-widescreen">
                        <div class="box mb-0" style="border: 1px solid var(--bulma-primary); height: 100%;">
                            <div class="is-flex is-justify-content-between is-align-items-center mb-3">
                                <input id="weapons-name-input-${weaponName}" class="input has-text-weight-bold mr-2" value="${weapon.name}" placeholder="Weapon name...">
                                <button id="weapons-remove-${weaponName}" class="button is-danger" type="button">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div class="columns is-mobile is-multiline is-variable is-2 mb-2">
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Weapon Type</label>
                                    <div class="select is-fullwidth">
                                        <select id="weapons-type-input-${weaponName}" class="is-capitalized">
                                            ${weaponTypes.map(w => `<option value="${w}" ${w === weapon.type ? 'selected' : ''}>${w}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold  mb-1">Mod. Type</label>
                                    <div class="select is-fullwidth">
                                        <select id="weapons-mod-type-input-${weaponName}">
                                            ${ALL_ATTRIBUTE_TYPES.map(a => `<option value="${a}" ${a === weapon.mod_type ? 'selected' : ''}>${a}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="column is-3">
                                    <label class="label is-size-5 has-text-weight-bold  mb-1">Effect</label>
                                    <input id="weapons-effect-input-${weaponName}" class="input has-text-weight-bold" value="${weapon.effect}" placeholder="0">
                                </div>
                                <div class="column is-3">
                                    <label class="label is-size-5 has-text-weight-bold  mb-1"><abbr title="Enhancement">Enhance.</abbr></label>
                                    <input id="weapons-enhancement-input-${weaponName}" class="input has-text-weight-bold" value="${weapon.enhancement}" placeholder="0">
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold  mb-1"><abbr title="Hit Modifier">Hit</abbr></label>
                                    <div class="is-size-5 has-text-weight-bold mt-1 ${weapon.hit > 0 ? 'has-text-success' : weapon.hit < 0 ? 'has-text-danger' : ''}">
                                        ${weapon.hit > 0 ? '+' : ''}${weapon.hit}
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold  mb-1"><abbr title="Damage Bonus">Dmg</abbr></label>
                                    <div class="is-size-5 has-text-weight-bold mt-1 ${weapon.damage_bonus > 0 ? 'has-text-success' : weapon.damage_bonus < 0 ? 'has-text-danger' : ''}">
                                        ${weapon.damage_bonus > 0 ? '+' : ''}${weapon.damage_bonus}
                                    </div>
                                </div>
                            </div>

                            <div class="field mb-3">
                                <label class="label is-size-5 has-text-weight-bold  mb-1">Damage Dice</label>
                                <textarea id="weapons-damage-dice-input-${weaponName}" class="textarea" rows="${weapon.damage_dice.split(/\r\n|\r|\n/).length + 1}">${weapon.damage_dice}</textarea>
                            </div>

                            <div class="field">
                                <label class="label is-size-5 has-text-weight-bold  mb-1">Properties</label>
                                <div class="is-flex is-flex-wrap-wrap" style="gap: 0.25rem; align-items: center;">
                                    <div class="select">
                                        <select id="weapons-add-property-${weaponName}" class="is-capitalized">
                                            ${weapon_property_choice.map(p => `<option value="${p}">${p}</option>`).join('')}
                                        </select>
                                    </div>
                                    ${Object.entries(weapon.properties).map(([k, prop]) => `
                                        <div class="tags has-addons m-0">
                                            <div class="tag is-primary is-size-5 is-capitalized has-text-weight-bold">
                                                <span>${prop}</span>
                                                <a id="weapons-remove-property-${weaponName}-${prop}" class="ml-2">
                                                    <i class="fa-solid fa-xmark"></i>
                                                </a>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })

    let weapon_property_choice_new = ALL_WEAPON_PROPERTIES.filter(prop => !tempProperties.includes(prop));
    innerHTML += `
                    <div class="column is-12 is-6-fullhd is-4-widescreen">
                        <div class="box mb-0" style="background: var(--bulma-card-background-color); border: 2px dashed var(--bulma-success); height: 100%;">
                            <h4 class="title is-6 mb-3">Add New Weapon</h4>
                            <input id="weapons-name-input-new" class="input mb-3" placeholder="Weapon name (e.g. Dagger)...">
                            
                            <div class="columns is-mobile is-multiline is-variable is-2 mb-2">
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Weapon Type</label>
                                    <div class="select is-fullwidth">
                                        <select id="weapons-type-input-new" class="is-capitalized">
                                            ${weaponTypes.map(w => `<option value="${w}">${w}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Mod. Type</label>
                                    <div class="select is-fullwidth">
                                        <select id="weapons-mod-type-input-new">
                                            ${ALL_ATTRIBUTE_TYPES.map(a => `<option value="${a}">${a}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="column is-3">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Effect">Effect</abbr></label>
                                    <input id="weapons-effect-input-new" class="input has-text-weight-bold" placeholder="0">
                                </div>
                                <div class="column is-3">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Enhancement">Enhance.</abbr></label>
                                    <input id="weapons-enhancement-input-new" class="input has-text-weight-bold" placeholder="0">
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Hit Modifier">Hit</abbr></label>
                                    <div class="is-size-5 has-text-weight-bold mt-1">-</div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Damage Bonus">Dmg</abbr></label>
                                    <div class="is-size-5 has-text-weight-bold mt-1">-</div>
                                </div>
                            </div>

                            <div class="field mb-3">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Damage Dice</label>
                                <textarea id="weapons-damage-dice-input-new" class="textarea" rows="3" placeholder="1d4 slash"></textarea>
                            </div>

                            <div class="field">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Properties</label>
                                <div class="is-flex is-flex-wrap-wrap" style="gap: 0.25rem; align-items: center;">
                                    <div class="select">
                                        <select id="weapons-add-property-new" class="is-capitalized">
                                            ${weapon_property_choice_new.map(p => `<option value="${p}">${p}</option>`).join('')}
                                        </select>
                                    </div>
                                    ${Object.entries(tempProperties).map(([k, prop]) => `
                                        <div class="tags has-addons m-0">
                                            <div class="tag is-primary is-size-5 is-capitalized has-text-weight-bold">
                                                <span>${prop}</span>
                                                <a id="weapons-remove-temp-property-${prop}" class="ml-2">
                                                    <i class="fa-solid fa-xmark"></i>
                                                </a>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <button id="weapons-add-new" class="button is-success is-fullwidth" type="button">
                                <i class="fa-solid fa-check mr-2"></i> Add Weapon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    return innerHTML;
}

export function createSpellSection(spells: Record<string, ISpell>): string {
    let innerHTML = `
        <div class="card is-shadowless">
            <div class="card-content p-3">
    `

    const groupedSpells: Record<number, [string, ISpell][]> = {};
    Object.entries(spells).forEach(([spellName, spell]) => {
        const lvl = spell.level;
        if (!groupedSpells[lvl]) {
            groupedSpells[lvl] = [];
        }
        groupedSpells[lvl].push([spellName, spell]);
    });

    const sortedLevels = Object.keys(groupedSpells)
        .map(Number)
        .sort((a, b) => a - b);

    sortedLevels.forEach((level) => {
        const title = level === 0 ? "Cantrips" : `Spell Level ${level}`;

        innerHTML += `
                <div class="is-flex is-align-items-center mt-4 mb-2">
                    <h3 class="title is-5 mb-0">${title}</h3>
                </div>
                <hr class="mt-1 mb-4" style="background-color: var(--bulma-primary); height: 2px; border: none;">
                <div class="columns is-multiline mb-5">
        `

        groupedSpells[level].forEach(([spellName, spell]) => {
            innerHTML += `
                    <div class="column is-12 is-6-fullhd is-4-widescreen">
                        <div class="box mb-0" style="border: 1px solid var(--bulma-primary); height: 100%;">
                            <div class="is-flex is-justify-content-between is-align-items-center mb-3">
                                <div id="spells-concentrating-button-${spellName}" class="${spell.concentration ? "" : "is-hidden"} button is-size-4 has-text-weight-extrabold m-0 p-0" style="${spell.concentrating ? "border-color: var(--bulma-link)" : ""}">
                                    <input class="checkbox is-hidden" type="checkbox" id="spells-concentrating-checkbox-${spellName}">
                                    <span class="icon m-0" id="">
                                        ${spell.concentrating ?
                                            `<i class="fas fa-eye" style="color:var(--bulma-danger)"></i>`
                                            :
                                            `<i class="fa-regular fa-eye"></i>`
                                        }
                                    </span>
                                </div>
                                <input id="spells-name-input-${spellName}" class="input has-text-weight-bold mr-2" value="${spell.name}" placeholder="Spell name...">
                                <button id="spells-remove-${spellName}" class="button is-danger" type="button">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div class="columns is-mobile is-multiline is-variable is-2 mb-2">
                                <div class="column is-4">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Level</label>
                                    <input id="spells-level-input-${spellName}" class="input" placeholder="CT" value="${spell.level === 0 ? "CT" : spell.level}">
                                </div>
                                <div class="column is-4">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Cast Time</label>
                                    <input id="spells-casting-time-input-${spellName}" class="input" placeholder="1 action" value="${spell.casting_time}">
                                </div>
                                <div class="column is-4">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Range</label>
                                    <input id="spells-range-input-${spellName}" class="input" placeholder="60ft" value="${spell.range}">
                                </div>
                            </div>

                            <div class="columns is-mobile is-variable is-1 mb-2">
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Concentration">Conc.</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-conc-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" ${spell.concentration ? "checked" : ""}>
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Verbal">V</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-v-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" ${spell.verbal ? "checked" : ""}>
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Somatic">S</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-s-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" ${spell.somatic ? "checked" : ""}>
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Material">M</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-m-checkbox-${spellName}" class="checkbox" type="checkbox" style="transform: scale(1.5);" ${spell.material ? "checked" : ""}>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Notes</label>
                                <textarea spellcheck="false" id="spells-notes-input-${spellName}" class="textarea" rows="${spell.notes.split(/\r\n|\r|\n/).length + 3}" placeholder="Spell details...">${spell.notes}</textarea>
                            </div>
                        </div>
                    </div>
            `
        });

        innerHTML += `
                </div>
        `
    });

    innerHTML += `
                <div class="is-flex is-align-items-center mt-5 mb-2">
                    <h3 class="title is-5 mb-0">Create Spell</h3>
                </div>
                <hr class="mt-1 mb-4" style="background-color: var(--bulma-success); height: 2px; border: none;">
                <div class="columns is-multiline">
                    <div class="column is-12 is-6-fullhd is-4-widescreen">
                        <div class="box mb-0" style="background: var(--bulma-card-background-color); border: 2px dashed var(--bulma-success); height: 100%;">
                            <h4 class="title is-6 mb-3">Add New Spell</h4>
                            <input id="spells-name-input-new" class="input mb-3" placeholder="Spell name (e.g. Create Bonfire)...">
                            
                            <div class="columns is-mobile is-multiline is-variable is-2 mb-2">
                                <div class="column is-4">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Level</label>
                                    <input id="spells-level-input-new" class="input" placeholder="CT">
                                </div>
                                <div class="column is-4">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Cast Time</label>
                                    <input id="spells-casting-time-input-new" class="input" placeholder="1 action">
                                </div>
                                <div class="column is-4">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Range</label>
                                    <input id="spells-range-input-new" class="input" placeholder="60ft">
                                </div>
                            </div>

                            <div class="columns is-mobile is-variable is-1 mb-2">
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Concentration">Conc.</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-conc-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);">
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Verbal">V</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-v-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);">
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Somatic">S</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-s-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);">
                                    </div>
                                </div>
                                <div class="column is-3 has-text-centered">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Material">M</abbr></label>
                                    <div class="is-flex is-justify-content-center mt-1">
                                        <input id="spells-m-checkbox-new" class="checkbox" type="checkbox" style="transform: scale(1.5);">
                                    </div>
                                </div>
                            </div>

                            <div class="field mb-4">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Notes</label>
                                <textarea spellcheck="false" id="spells-notes-input-new" class="textarea" rows="6" placeholder="1 minute - Create a bonfire on ground that you can see within range..."></textarea>
                            </div>

                            <button id="spells-add-new" class="button is-success is-fullwidth" type="button">
                                <i class="fa-solid fa-check mr-2"></i> Add Spell
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    return innerHTML;
}

export function createEntitySection(entities: Record<string, IEntity>): string {
    let innerHTML = `
        <div class="card is-shadowless">
            <div class="card-content p-3">
                <div class="columns is-multiline">
    `

    Object.entries(entities).forEach(([entityName, entity]) => {
        innerHTML += `
                    <div class="column is-12 is-6-fullhd is-4-widescreen">
                        <div class="box mb-0" style="border: 1px solid var(--bulma-primary); height: 100%;">
                            <div class="is-flex is-justify-content-between is-align-items-center mb-3">
                                <input id="entities-name-input-${entityName}" class="input has-text-weight-bold mr-2" value="${entity.name}" placeholder="Wheelbarrow">
                                <button id="entities-remove-${entityName}" class="button is-danger" type="button">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div class="columns is-mobile is-multiline is-variable is-2 mb-2">
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Speed</label>
                                    <input id="entities-speed-input-${entityName}" class="input" placeholder="60ft" value="${entity.speed}">
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Armor-Class">AC</abbr></label>
                                    <input id="entities-ac-input-${entityName}" class="input" placeholder="10" value="${entity.ac}">
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Hit Points">HP</abbr> / Max</label>
                                    <div class="is-flex is-align-items-center" style="gap: 5px;">
                                        <input id="entities-hp_current-input-${entityName}" class="input" placeholder="50" value="${entity.hp_current}">
                                        <span>/</span>
                                        <input id="entities-hp_max-input-${entityName}" class="input" placeholder="100" value="${entity.hp_max}">
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Capacity / Max</label>
                                    <div class="is-flex is-align-items-center" style="gap: 5px;">
                                        <input id="entities-capacity_current-input-${entityName}" class="input" placeholder="100 St." value="${entity.current_capacity}">
                                        <span>/</span>
                                        <input id="entities-capacity_max-input-${entityName}" class="input" placeholder="1000 St." value="${entity.max_capacity}">
                                    </div>
                                </div>
                            </div>

                            <div class="field mb-3">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Notes</label>
                                <textarea spellcheck="false" id="entities-notes-input-${entityName}" class="textarea" rows="${entity.notes.split(/\r\n|\r|\n/).length + 3}" placeholder="Behavior, active effects, or companion traits...">${entity.notes}</textarea>
                            </div>

                            <div class="field">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Inventory</label>
                                <textarea spellcheck="false" id="entities-inventory-input-${entityName}" class="textarea" rows="${entity.inventory.split(/\r\n|\r|\n/).length + 3}" placeholder="Barding, saddlebags, cargo, or equipped gear...">${entity.inventory}</textarea>
                            </div>
                        </div>
                    </div>
        `
    })

    innerHTML += `
                    <div class="column is-12 is-6-fullhd is-4-widescreen">
                        <div class="box mb-0" style="background: var(--bulma-card-background-color); border: 2px dashed var(--bulma-success); height: 100%;">
                            <h4 class="title is-6 mb-3">Add New Entity</h4>
                            <input id="entities-name-input-new" class="input mb-3" placeholder="Entity name (e.g. Wheelbarrow)...">
                            
                            <div class="columns is-mobile is-multiline is-variable is-2 mb-2">
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Speed</label>
                                    <input id="entities-speed-input-new" class="input" placeholder="60ft">
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Armor-Class">AC</abbr></label>
                                    <input id="entities-ac-input-new" class="input" placeholder="10">
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1"><abbr title="Hit Points">HP</abbr> / Max</label>
                                    <div class="is-flex is-align-items-center" style="gap: 5px;">
                                        <input id="entities-hp_current-input-new" class="input" placeholder="50">
                                        <span>/</span>
                                        <input id="entities-hp_max-input-new" class="input" placeholder="100">
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <label class="label is-size-5 has-text-weight-bold mb-1">Capacity / Max</label>
                                    <div class="is-flex is-align-items-center" style="gap: 5px;">
                                        <input id="entities-capacity_current-input-new" class="input" placeholder="100 St.">
                                        <span>/</span>
                                        <input id="entities-capacity_max-input-new" class="input" placeholder="1000 St.">
                                    </div>
                                </div>
                            </div>

                            <div class="field mb-3">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Notes</label>
                                <textarea spellcheck="false" id="entities-notes-input-new" class="textarea" rows="3" placeholder="Behavior, active effects, or companion traits..."></textarea>
                            </div>

                            <div class="field mb-4">
                                <label class="label is-size-5 has-text-weight-bold mb-1">Inventory</label>
                                <textarea spellcheck="false" id="entities-inventory-input-new" class="textarea" rows="3" placeholder="Barding, saddlebags, cargo, or equipped gear..."></textarea>
                            </div>

                            <button id="entities-add-new" class="button is-success is-fullwidth" type="button">
                                <i class="fa-solid fa-check mr-2"></i> Add Entity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    return innerHTML
}

export function createProficientSkillsSection(proficiencies: Record<string, IProficiency>): string {
    let innerHTML = `<div class="columns is-multiline m-0">`;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        innerHTML += `
            <div class="column is-3-fullhd is-6-tablet mb-4">
                <div class="box p-0 pb-2" style="height: 100%">
                    <div class="tag is-link is-flex is-align-items-center p-4" style="border-bottom-left-radius: 0; border-bottom-right-radius: 0; width: 100%;">
                        <span class="icon">
                            <i class="fas fa-lg ${ALL_PROFICIENCIES_ICONS[i]}"></i>
                        </span>
                        <span class="has-text-weight-bold is-size-5">${ALL_PROFICIENCIES[i]}</span>
                    </div>
                    <div class="px-2 py-1">
        `;

        let sortedProficiencies = Object.entries(proficiencies).sort();

        sortedProficiencies.forEach(([proficiencyName, proficiency]) => {
            if (proficiency.proficient <= 0) return;
            if (proficiency.type !== ALL_PROFICIENCIES[i]) return;

            let color = proficiency.mod != 0 ?
                (proficiency.proficient == 1 ?
                    (proficiency.mod > 0 ? "is-success" : "is-warning")
                    : (proficiency.mod > 0 ? "is-info" : "is-danger"))
                : "is-primary";

            innerHTML += `
                <div class="tag ${color} is-flex is-align-items-center py-1 my-1" style="width: 100%; height: auto;">
                    <span class="is-size-5 has-text-weight-semibold is-capitalized mr-auto" style="white-space: normal; text-align: left;">
                        ${proficiencyName}
                    </span>
                    <span class="is-size-5 has-text-weight-semibold px-2">
                        ${proficiency.mod_type !== "NONE" ? proficiency.mod_type : ""}
                    </span>
                    <span class="is-size-5 has-text-weight-semibold">
                        ${proficiency.mod_type !== "NONE" ? (proficiency.mod > 0 ? "+" + proficiency.mod : proficiency.mod) : ""}
                    </span>
                </div>
            `;
        });

        innerHTML += `
                    </div>
                </div>
            </div>
        `;
    }

    innerHTML += `</div>`;
    return innerHTML;
}


export function createProficiencySection({
                                             proficiency,
                                             activeProficiencyTab
                                         }: {
    proficiency: Record<string, IProficiency>,
    activeProficiencyTab: string
}): string {
    let innerHTML = `
        <div class="box p-0 m-0">
            <div class="tabs is-left is-boxed m-0 p-0" id="proficiency-tabs">
                <ul>
    `;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        innerHTML += `
                    <li data-tab="${ALL_PROFICIENCIES[i]}-tab" class="${ALL_PROFICIENCIES[i] == activeProficiencyTab ? "is-active" : ""} is-size-5">
                        <a>
                            <span class="icon is-small">
                                <i class="fas ${ALL_PROFICIENCIES_ICONS[i]}"></i>
                            </span>
                            <span class="label is-size-5 has-text-weight-semibold mx-1">${ALL_PROFICIENCIES[i]}</span>
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

        if (activeGroup) {
            innerHTML += `
            <div id="${ALL_PROFICIENCIES[i]}-list" class="columns is-multiline p-4 ${ALL_PROFICIENCIES[i] == activeProficiencyTab ? "" : "is-hidden"}">
            `;

            Object.entries(activeGroup).sort().forEach(([std_proficiency, attribute]) => {
                let proficiency_level = 0;
                let mod = 0;

                if (proficiency[std_proficiency]) {
                    proficiency_level = proficiency[std_proficiency].proficient;
                    mod = proficiency[std_proficiency].mod;
                }

                innerHTML += `
                <div class="column is-12-mobile is-6-tablet is-4-fullhd">
                    <div class="card px-4 py-2">
                        <div class="columns is-mobile is-vcentered">

                            <div class="column is-2">
                                <div class="is-flex" style="gap: 1rem;">
                                    <input type="checkbox" id="${std_proficiency}-checkbox-1" ${proficiency_level >= 1 ? "checked" : ""} class="checkbox" style="transform: scale(1.4)"/>
                                    <input type="checkbox" id="${std_proficiency}-checkbox-2" ${proficiency_level >= 2 ? "checked" : ""} class="checkbox" style="transform: scale(1.4)"/>
                                </div>
                            </div>
                            
                            <div class="column is-5">
                                <p class="is-size-5 is-capitalized has-text-weight-semibold has-text-dark">${std_proficiency}</p>
                            </div>
                            
                            ${isOnlyNone ? "" : `
                            <div class="column is-5 is-flex is-justify-content-end" style="gap: 0.5rem">
                                <span class="tag is-info is-size-6 has-text-weight-medium px-3" style="width: 4rem">
                                    ${attribute}
                                </span>
                                <span class="tag is-size-6 has-text-weight-bold px-3 ${mod > 0 ? "is-success" : mod < 0 ? "is-danger" : "is-primary"}" style="width: 4rem">
                                    ${mod > 0 ? `+${mod}` : mod}
                                </span>
                            </div>
                            `}

                        </div>
                    </div>
                </div>
                `;
            });

            innerHTML += `
            </div>  
            `;
        }
    }

    innerHTML += `
        </div>
    `

    return innerHTML;
}