import {ISpell} from "../../../02_models/021_Interfaces/Spells/ISpell";

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