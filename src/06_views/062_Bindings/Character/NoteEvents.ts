import {Character} from "../../../02_models/022_Classes/Character/Character";
import {addAdvancedEventListener} from "../../../07_services/Util";

export function bindNoteEvents(character: Character): void {
    const notesTabs = document.getElementById('notes-tabs') as HTMLDivElement;

    const sectionNotesEquipment = document.getElementById('section-notes-equipment') as HTMLDivElement;
    const sectionNotesFeaturesAndAbilities = document.getElementById('section-notes-features-and-abilities') as HTMLDivElement;
    const sectionNotesInventory = document.getElementById('section-notes-inventory') as HTMLDivElement;
    const sectionNotesNotes = document.getElementById('section-notes-notes') as HTMLDivElement;
    const sectionNotesIdeals = document.getElementById('section-notes-ideals') as HTMLDivElement;
    const sectionNotesBonds = document.getElementById('section-notes-bonds') as HTMLDivElement;
    const sectionNotesFlaws = document.getElementById('section-notes-flaws') as HTMLDivElement;
    const sectionNotesAllies = document.getElementById('section-notes-allies') as HTMLDivElement;

    const tabSections = [
        { tabId: 'notes-equipment-table-nav', element: sectionNotesEquipment },
        { tabId: 'notes-features-and-abilities-table-nav', element: sectionNotesFeaturesAndAbilities },
        { tabId: 'notes-inventory-table-nav', element: sectionNotesInventory },
        { tabId: 'notes-notes-table-nav', element: sectionNotesNotes },
        { tabId: 'notes-ideals-table-nav', element: sectionNotesIdeals },
        { tabId: 'notes-bonds-table-nav', element: sectionNotesBonds },
        { tabId: 'notes-flaws-table-nav', element: sectionNotesFlaws },
        { tabId: 'notes-allies-table-nav', element: sectionNotesAllies }
    ];

    notesTabs.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
            const targetTab = li.getAttribute('data-tab');

            if (targetTab) this.activeNoteTab = targetTab.toString();

            notesTabs.querySelectorAll('li').forEach(tab => tab.classList.remove('is-active'));
            li.classList.add('is-active');

            tabSections.forEach(item => {
                if (item.tabId === targetTab) {
                    item.element.classList.remove('is-hidden');
                } else {
                    item.element.classList.add('is-hidden');
                }
            });
        });
    });

    const notesHeightInput = document.getElementById('notes-height-input') as HTMLInputElement;
    const notesAgeInput = document.getElementById('notes-age-input') as HTMLInputElement;
    const notesWeightInput = document.getElementById('notes-weight-input') as HTMLInputElement;

    addAdvancedEventListener(notesHeightInput, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesAgeInput, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesWeightInput, (id, val) => this.viewModel.handleNoteInput(id, val));

const notesEquipmentTextarea = document.getElementById('notes-equipment-textarea') as HTMLTextAreaElement;
const notesFeaturesAndAbilitiesTextarea = document.getElementById('notes-features-and-abilities-textarea') as HTMLTextAreaElement;
const notesNotesTextarea = document.getElementById('notes-notes-textarea') as HTMLTextAreaElement;
const notesIdealsTextarea = document.getElementById('notes-ideals-textarea') as HTMLTextAreaElement;
const notesBondsTextarea = document.getElementById('notes-bonds-textarea') as HTMLTextAreaElement;
const notesFlawsTextarea = document.getElementById('notes-flaws-textarea') as HTMLTextAreaElement;
const notesAlliesTextarea = document.getElementById('notes-allies-textarea') as HTMLTextAreaElement;

addAdvancedEventListener(notesEquipmentTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesFeaturesAndAbilitiesTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesNotesTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesIdealsTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesBondsTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesFlawsTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
addAdvancedEventListener(notesAlliesTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));

for(let i = 1; i <= 3; i++) {
    const notesInventoryTextarea = document.getElementById(`notes-inventory-textarea-${i}`) as HTMLTextAreaElement;
    addAdvancedEventListener(notesInventoryTextarea, (id, val) => this.viewModel.handleNoteInput(id, val));
}
}