import {ICharacterNotes} from "../../../02_models/021_Interfaces/Character/ICharacterNotes";

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