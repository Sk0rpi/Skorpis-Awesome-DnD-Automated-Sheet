import {IEntity} from "../../../02_models/021_Interfaces/Entities/IEntity";

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