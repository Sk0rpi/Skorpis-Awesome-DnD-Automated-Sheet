import {ALL_CURRENCY_TYPES, CurrencyType} from "../../../02_models/023_Types/Character/CurrencyTypes";
import {ICharacterCurrency} from "../../../02_models/021_Interfaces/Character/ICharacterCurrency";
import {ISpellCasting} from "../../../02_models/021_Interfaces/Spells/ISpellCasting";
import {ALL_ATTRIBUTE_TYPES} from "../../../02_models/023_Types/Attributes/AttributeTypes";

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