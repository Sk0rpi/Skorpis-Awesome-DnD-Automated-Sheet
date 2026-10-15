import {ICharacterInfo} from "../../../02_models/021_Interfaces/Character/ICharacterInfo";
import {ICharacterNotes} from "../../../02_models/021_Interfaces/Character/ICharacterNotes";
import {ALL_CLASS_TYPES} from "../../../02_models/023_Types/Character/ClassTypes";

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