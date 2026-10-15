import {IWeapon} from "../../../02_models/021_Interfaces/Weapons/IWeapon";
import {ALL_WEAPON_PROPERTIES, WeaponPropertyType} from "../../../02_models/023_Types/Weapons/WeaponPropertyTypes";
import {ALL_WEAPONS, WeaponType} from "../../../02_models/023_Types/Proficiencies/WeaponTypes";
import {ALL_ATTRIBUTE_TYPES} from "../../../02_models/023_Types/Attributes/AttributeTypes";

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