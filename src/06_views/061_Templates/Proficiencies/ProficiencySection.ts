import {IProficiency} from "../../../02_models/021_Interfaces/Proficiencies/IProficiency";
import {ALL_PROFICIENCIES, ALL_PROFICIENCIES_ICONS} from "../../../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {ALL_PROFICIENCY_TYPES} from "../../../02_models/023_Types/Proficiencies/AnyProficiencyTypes";

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