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
    ProficiencyType
} from "../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {ALL_PROFICIENCY_TYPES, AnyProficiencyType} from "../02_models/023_Types/Proficiencies/AnyProficiencyTypes";
import {Proficiency} from "../02_models/022_Classes/Proficiencies/Proficiency";
import {ALL_CURRENCY_TYPES, CurrencyType} from "../02_models/023_Types/Character/CurrencyTypes";
import {ALL_ATTRIBUTE_TYPES, AttributeType} from "../02_models/023_Types/Attributes/AttributeTypes";
import {ICharacterStatusData} from "../02_models/021_Interfaces/Attributes/ICharacterStatusData";
import {ALL_STATUS_TYPES, StatusType} from "../02_models/023_Types/Attributes/StatusTypes";

export function createMenuSection(): string{
    let innerHTML = `
        <div class="is-flex has-text-centered" style="gap: 1rem;">
            <input id="import-character-input" type="file" class="is-hidden" accept=".json">
            <button id="import-character-button" class="button is-success is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-file-import"></i>
                </span>
                <span class="pl-1">Import Character</span>
            </button>
            
            <button id="export-character-button" class="button is-info is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-file-export"></i>
                </span>
                <span class="pl-1">Export Character</span>
            </button>
            
            <button id="create-character-button" class="button is-danger is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-user-plus"></i>
                </span>
                <span class="pl-1">Create New Character</span>
            </button>
            
            <a class="button is-love is-outlined" href="https://ko-fi.com/sk0rp1" target="_blank" rel="noopener noreferrer">
                <span class="icon mr-0">
                    <i class="fas fa-hand-holding-heart"></i>
                </span>
                <span class="pl-1">Donate</span>
            </a>
           
        </div>
    `;
    return innerHTML;
}

export function createNoteBannerSection(characterNotes: ICharacterNotes): string {
    let innerHTML = `
        <div class="is-flex has-text-centered" style="gap: 1rem;">
            <button class="button is-light is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-shield-alt"></i>
                </span>
                <span class="pl-1">Equipment</span>
            </button>
            
            <button class="button is-light is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-star"></i>
                </span>
                <span class="pl-1">Features & Abilities</span>
            </button>
            
            <button class="button is-light is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-box-open"></i>
                </span>
                <span class="pl-1">Inventory</span>
            </button>
            
            <button class="button is-light is-outlined">
                <span class="icon mr-0">
                    <i class="fas fa-book-open"></i>
                </span>
                <span class="pl-1">Notes</span>
            </button>
        </div>
    `;

    return innerHTML;
}

export function createCharacterInfoSection({
    characterInfo,
    inspiration
                                           }:{
    characterInfo: ICharacterInfo,
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

    let innerHTML = `
        <div class="columns is-flex is-align-items-center has-text-centered">
            <div class="column is-1">
                <div class="card p-4" style="height: 8rem;">
                    <label class="label is-medium">Level</label>
                    <div class="card-body">
                        <input id="info-level-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" style="height: 3.5rem" placeholder="1" value="${level}">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card p-4">
                    <label class="label is-medium">Background</label>
                    <div class="card-body">
                        <input id="info-background-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Professional Home Brewer" value="${background}">
                    </div>
                    <hr class="has-background-white my-4" style="width: 100%;">
                    <div class="card-body">
                        <input id="info-species-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Fairy-Giant" value="${species}">
                    </div>
                    <label class="label is-medium pt-2">Species</label>
                </div>
            </div>
            <div class="column">
                <div class="card p-4">
                    <div class="card-body">
                        <input class="file-input is-hidden" type="file" id="image-import-input" accept=".png,.jpg,.jpeg,.gif">
                        <figure class="image is-3by4 is-clickable is-flex is-align-items-center is-justify-content-center border-placeholder" id="image-import-trigger-figure">
                            ${appearance ? `
                                <img class="card is-shadowless" src="data:image/jpeg;base64,${appearance}" style="object-fit: cover; width: 100%; height: 100%;" alt="Character Portrait" />
                            ` : `
                                <div class="has-text-centered p-4">
                                    <span class="icon is-large"><i class="fas fa-image fa-2x"></i></span>
                                    <p class="has-text-weight-bold">Click Here To Insert Picture</p>
                                </div>
                            `}
                        </figure>
                        <input id="info-name-input" class="input is-medium has-text-weight-bold has-text-centered mt-4" type="text" placeholder="Johann von Doovenschmirtz" value="${name}">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card p-4">
                    <label class="label is-medium">Class</label>
                    <div class="card-body">
                        <input id="info-class-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Artificer: Armorer" value="${characterClass}">
                    </div>
                    <hr class="has-background-white my-4" style="width: 100%;">
                    <div class="card-body">
                        <input id="info-alignment-input" class="input is-medium has-text-weight-bold has-text-centered" type="text" placeholder="Chaotic Evil" value="${alignment}">
                    </div>
                    <label class="label is-medium pt-2">Alignment</label>
                </div>
            </div>
            <div class="column is-1">
                <div class="card p-4" style="height: 8rem;">
                    <label class="label is-medium pb-4 mb-0"><abbr title="Inspiration">Insp.</abbr></label>
                    <div class="card-body is-flex is-align-items-center is-justify-content-center" style="height: 50%">
                        <input class="checkbox is-hidden" type="checkbox" id="info-inspiration-checkbox">
                        <span class="icon is-medium mr-0 is-clickable" id="info-inspiration-trigger">
                            ${characterInspiration?
                                `<i class="fas fa-2xl fa-star" style="color:var(--is-gold)"></i>`
                            :
                                `<i class="fa-regular fa-2xl fa-star"></i>`
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <hr class="has-background-grey-dark my-5" />
        <div class="columns has-text-centered is-flex is-flex-direction-row">
            <div class="column is-6">
                <div class="card is-flex is-flex-direction-column" style="height: 100%">
                    <label class="label is-medium mb-0 pt-4">Quick-Notes</label>
                    <div class="card-body p-4" style="height: 100%">
                        <textarea id="info-quick-notes-textarea" class="textarea is-medium" style="height: 100%" placeholder="Physical appearance, personality traits, campaign notes, factions, and current quest goals...">${quick_notes}</textarea>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="card is-flex is-flex-direction-column" style="height: 100%">
                    <label class="label is-medium mb-0 pt-4">Active-Effects</label>
                    <div class="card-body p-4" style="height: 100%">
                        <textarea id="info-active-effects-textarea" class="textarea is-medium" style="height: 100%" placeholder="Active effects (e.g., Bless, Shield), temporary conditions (e.g., Poisoned), or magical item bonuses...">${active_effects}</textarea>
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
        <div class="columns mx-0" style="gap: 0.5rem;">
    `;

    Object.entries(ALL_STATUS_TYPES).forEach(([key, value]) => {
        let type = value;

        let base = 0;
        let effect = 0;
        let total = 0;
        let color = "is-dark";
        let pre_total_extra = "";
        let post_total_extra = "";
        let read_only_base = false;

        if(status[value]) {
            base = status[value].base ? status[value].base : 0;
            effect = status[value].effect ? status[value].effect : 0;
            total = status[value].total ? status[value].total : 0;
            color = status[value].color ? status[value].color : "is-dark";
            pre_total_extra = status[value].pre_total_extra ? status[value].pre_total_extra : "";
            post_total_extra = status[value].post_total_extra ? status[value].post_total_extra : "";
            read_only_base = status[value].read_only_base ? status[value].read_only_base : false;
        }

        innerHTML += `
            <div class="column" id="status">
                <div class="card p-4">
                    <div class="card-header is-justify-content-center">
                        <span class="title m-4 is-4">${type}</span>
                    </div>
                    <div class="card-body is-flex is-flex-direction-column is-align-items-center has-text-centered">

                        <div class="columns is-vcentered is-mobile" style="gap: 0.5rem; margin: 0;">
                            <div class="">
                                <span class="is-small is-block">Base</span>
                                ${read_only_base ?
                                    `<span class="tag is-dark is-large has-text-weight-bold is-flex is-justify-content-center is-align-items-center mb-3" style="width: 5rem; height:3rem">${base}</span>`
                                    :
                                    `<input id="${type}-base-input" class="input is-large has-text-weight-bold has-text-centered mb-3" style="width: 5rem; height: 3rem" type="text" placeholder="0" value="${base}">`
                                }
                            </div>
                            <div class="column">
                                <span class="is-small is-block">Effect</span>
                                <input id="${type}-effect-input" class="input is-large has-text-weight-bold has-text-centered mb-3" style="width: 5rem; height: 3rem" type="text" placeholder="0" value="${effect}">
                            </div>
                        </div>
                        
                        <div class="columns is-vcentered is-mobile" style="gap: 0.5rem; margin: 0;">
                            <div class="column">
                                <span class="is-small is-block">Total</span>
                                <span class="tag ${color} is-large has-text-weight-bold is-flex is-justify-content-center is-align-items-center mb-3" style="width: 11rem; height:3rem">${pre_total_extra}${total}${post_total_extra}</span>
                            </div>
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
    <div class="card">
        <div class="card-body is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center has-text-centered" style="gap: 1rem;">
            <div class="card-content is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center has-text-centered" style="gap: 1rem;">
                <tag class="tag is-dark is-medium" style="width: 10rem; height: 3rem">
                    <span class="is-block has-text-weight-bold">Maximum Hit Die</span>
                </tag>
                <input id="maximum-hit-die-input" class="input is-large has-text-weight-bold has-text-centered" style="width: 10rem; height: 3rem" type="text" placeholder="1d6" value="${maximum_hit_die}">
            </div>
            <div class="card-content is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center has-text-centered" style="gap: 1rem;">
            <tag class="tag is-dark" style="width: 7rem; height: 3rem; gap: 0.25rem; background: #9B374B">
                <span class="icon is-medium mr-0">
                    <i class="fas fa-xl fa-skull"></i>
                </span>
    `

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                <input id="death-save-failure-${i}-checkbox" class="checkbox redCheck" type="checkbox" ${death_save_failure > 0 ? "checked" : ""}>
        `
        death_save_failure--;
    }

    innerHTML += `
            </tag>
            <tag class="tag is-dark is-medium" style="width: 10rem; height: 3rem">
                <span class="subtitle is-block has-text-weight-bold has-text-white">Death Saves</span>
            </tag>
            <tag class="tag is-dark" style="width: 7rem; height: 3rem; gap: 0.25rem; background: #3F7E55">
    `

    for(let i = 1; i <= 3; i++) {
        innerHTML += `
                <input id="death-save-success-${i}-checkbox" class="checkbox greenCheck" type="checkbox" ${death_save_success > 0 ? "checked" : ""}>
        `
        death_save_success--;
    }

    innerHTML += `
                <span class="icon is-medium ml-0">
                    <i class="fas fa-xl fa-heart-pulse"></i>
                </span>
            </tag>
            </div>
            <div class="card-content is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center has-text-centered" style="gap: 1rem;">
            <input id="current-hit-die-input" class="input is-large has-text-weight-bold has-text-centered" style="width: 10rem; height: 3rem" type="text" placeholder="1d6" value="${current_hit_die}">
            <tag class="tag is-dark is-medium" style="width: 10rem; height: 3rem">
                <span class="is-block has-text-weight-bold">Current Hit Die</span>
            </tag>
            </div>
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
            <div class="column is-2">
                <div class="card p-4">
                    <div class="card-header is-justify-content-center">
                        <span class="title m-4 is-4">${type}</span>
                    </div>
                    <div class="card-body is-flex is-flex-direction-column is-align-items-center has-text-centered">

                        <div class="columns is-vcentered is-mobile" style="gap: 0.5rem; margin: 0;">
                            <div class="column">
                                <span class="is-small is-block">Base</span>
                                <input id="${type}-base-input" class="input is-large has-text-weight-bold has-text-centered mb-3" style="width: 5rem; height: 3rem" type="text" placeholder="0" value="${base}">
                            </div>
                            <div class="column">
                                <span class="is-small is-block">Effect</span>
                                <input id="${type}-input" class="input is-large has-text-weight-bold has-text-centered mb-3" style="width: 5rem; height: 3rem" type="text" placeholder="0" value="${effect}">
                            </div>
                        </div>
                        
                        <div class="columns is-vcentered is-mobile" style="gap: 0.5rem; margin: 0;">
                            <div class="column">
                                <span class="is-small is-block">Total</span>
                                <span class="tag is-dark is-large has-text-weight-bold is-flex is-justify-content-center is-align-items-center mb-3" style="width: 5rem; height:3rem">${total}</span>
                            </div>
                            <div class="column">
                                <span class="is-small is-block">Modifier</span>
                                <span class="tag ${mod != 0 ? mod > 0 ? "is-success" : "is-danger" : "is-dark"} is-large has-text-weight-bold mb-3" style="width: 5rem; height: 3rem">${mod > 0 ? "+" : ""}${mod}</span>
                            </div>
                        </div>

                        <hr class="has-background-white my-2" style="width: 100%;" />
                        <div class="is-flex is-flex-direction-row is-align-items-center has-text-centered" style="gap: 0.5rem">
                           <input type="checkbox" id="${type}-checkbox" ${isSave ? "checked" : ""} />
                           <span>Save</span>
                           <div class="tag ${save_mod != 0 ? save_mod > 0 ? "is-success" : "is-danger" : "is-dark"} has-text-weight-bold">${save_mod > 0 ? "+" : ""}${save_mod}</div>     
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
    currencies, proficiencyBonus, passivePerception
                                            }: {
    currencies: Record<CurrencyType, ICharacterCurrency>; proficiencyBonus: number;   passivePerception: number;
}): string {
    let innerHTML = `
        <div class="level box has-background-dark has-text-white mb-5 is-shadowless">
            <div class="level-left is-flex is-align-content-center has-text-centered columns">
                <div class="column level-item">
                    <span class="is-size-4 has-text-weight-bold is-align-content-center mr-3">Proficiency Bonus</span>
                    <span class="tag is-primary is-large has-text-weight-bold" style="width: 4rem">
                        +${proficiencyBonus}
                    </span>
                </div>
                <div class="column level-item">
                    <span class="is-size-4 has-text-weight-bold is-align-content-center mr-3">Passive Perception</span>
                    <span class="tag is-primary is-large has-text-weight-bold" style="width: 4rem">
                        ${passivePerception}
                    </span>
                </div>
                <div class="column columns level-item">
    `

    Object.entries(ALL_CURRENCY_TYPES).forEach(([currencyType, color]) => {
        let type = currencyType as CurrencyType;
        let amount = 0;

        if (currencies[type])
            amount = currencies[type].amount;

        innerHTML += `
                <div class="column level-item">
                    <span class="is-size-4 has-text-weight-bold is-align-content-center mr-3 is-capitalized">${type}</span>
                    <input class="tag is-large has-text-weight-bold has-text-centered has-text-white" style="width: 4rem; background: ${color}" type="text" placeholder="0" value="${amount}">
                </div>
                
        `
    })

    innerHTML += `
            </div>
        </div>
    `
    return innerHTML;
}

export function createWeaponSection(weapons: Record<string, IWeapon>): string {
    return ""
}

export function createSpellCastingBanner(spell_casting: ISpellCasting): string {
    return ""
}

export function createSpellSection(spells: Record<string, ISpell>): string {
    return ""
}

export function createEntitySection(entities: Record<string, IEntity>): string {
    return ""
}

export function createActiveProficienciesSection(proficiencies: Record<string, IProficiency>): string {
    let innerHTML = `
            <div class="columns is-multiline" style="width: 100%">
    `;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        innerHTML +=`
                <div class="column is-one-quarter">
                    <div class="card h-100 is-shadowless">
                        <div class="card-header">
                            <div class="tag column is-flex is-align-items-center is-dark is-medium my-0 ml-2">
                                <span class="icon is-small mr-2">
                                    <i class="fas ${ALL_PROFICIENCIES_ICONS[i]}"></i>
                                </span>
                                <span>${ALL_PROFICIENCIES[i]}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="columns is-multiline card-content px-2 py-2">
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
                : "is-dark"
            ;

            innerHTML += `
                                <div class="tag is-medium column is-full py-0 m-1 ${color}">
                                    <div class="tags has-addons columns m-0">
                                        <span class="tag is-medium is-capitalized ${color} column is-flex is-justify-content-start has-text-weight-bold">${proficiencyName}</span>
                                        <span class="tag is-medium ${color} is-narrow px-3 is-2 has-text-weight-semibold is-flex is-justify-content-end" style="width: 3rem">${proficiency.mod > 0 ? "+" : ""}${proficiency.mod}</span>
                                    </div>
                                </div>
            `
        })

        innerHTML +=`
                            </div>
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
                        <span>${ALL_PROFICIENCIES[i]}</span>
                    </a>
                </li>
    `;
    }

    innerHTML += `
            </ul>
        </div>
    `;

    for (let i = 0; i < ALL_PROFICIENCIES.length; i++) {
        innerHTML += `
        <div id="${ALL_PROFICIENCIES[i]}-list" class="${ALL_PROFICIENCIES[i] == activeProficiencyTab ? "" : "is-hidden"} card-content pt-0">
            <table class="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th class="is-narrow"><abbr title="Proficiency">Prof.</abbr></th>
                        <th class="">Name</th>
                        <th class="is-narrow"><abbr title="Attribute-Type">Attr.</abbr></th>
                        <th class="is-narrow"><abbr title="Modifier">Mod.</abbr></th>
                    </tr>
                </thead>
                <tbody>
        `;

        const groups = Object.values(ALL_PROFICIENCY_TYPES);
        const activeGroup = groups[i];

        if (activeGroup) {
            Object.entries(activeGroup).forEach(([std_proficiency, attribute]) => {
                let proficiency_level = 0;
                let mod = 0;

                if (proficiency[std_proficiency]) {
                    proficiency_level = proficiency[std_proficiency].proficient;
                    mod = proficiency[std_proficiency].mod;
                }

                innerHTML += `
                    <tr>
                        <td>
            `;

                for (let checkboxNum = 1; checkboxNum <= 2; checkboxNum++) {
                    const isChecked = proficiency_level >= checkboxNum ? "checked" : "";

                    innerHTML += `
                        <input type="checkbox" id="${std_proficiency}-checkbox-${checkboxNum}" ${isChecked} />
                    `;
                }


                let noneAttribute = attribute === "NONE";

                innerHTML += `
                        </td>
                        <td><p class="is-medium is-capitalized has-text-weight-bold">${std_proficiency}</p></td>
                        <td>
                            <span class="tag is-medium has-text-weight-semibold ${noneAttribute? "is-hidden" : "is-link"}" style="width: 3rem; justify-content: center;">${attribute}</span>
                        </td>
                        <td>
                            <span class="tag is-medium has-text-weight-semibold ${mod > 0 ? "is-success" : mod < 0 ? "is-danger" : "is-dark"}" style="width: 3rem; justify-content: center;">${mod}</span>
                        </td>
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

