import {IAttribute} from "../../../02_models/021_Interfaces/Attributes/IAttribute";
import {ALL_ATTRIBUTE_TYPES, AttributeType} from "../../../02_models/023_Types/Attributes/AttributeTypes";

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