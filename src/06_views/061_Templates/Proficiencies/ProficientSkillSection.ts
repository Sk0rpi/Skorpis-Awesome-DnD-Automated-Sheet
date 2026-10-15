import {IProficiency} from "../../../02_models/021_Interfaces/Proficiencies/IProficiency";
import {ALL_PROFICIENCIES, ALL_PROFICIENCIES_ICONS} from "../../../02_models/023_Types/Proficiencies/ProficiencyTypes";

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