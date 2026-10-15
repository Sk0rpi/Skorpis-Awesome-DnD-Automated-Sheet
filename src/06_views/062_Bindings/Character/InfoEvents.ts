import {addAdvancedEventListener} from "../../../07_services/Util";

export function bindInfoEvents(): void {
    const infoLevelInput = document.getElementById("info-level-input") as HTMLInputElement;
    const infoBackgroundInput = document.getElementById("info-background-input") as HTMLInputElement;
    const infoSpeciesInput = document.getElementById("info-species-input") as HTMLInputElement;

    const imageImportInput = document.getElementById("image-import-input") as HTMLInputElement;
    const imageImportTriggerFigure = document.getElementById("image-import-trigger-figure") as HTMLElement;

    const infoAppearanceButton = document.getElementById("info-appearance-button") as HTMLButtonElement;

    const infoNameInput = document.getElementById("info-name-input") as HTMLInputElement;
    const infoClassInput = document.getElementById("info-class-input") as HTMLInputElement;
    const infoAlignmentInput = document.getElementById("info-alignment-input") as HTMLInputElement;

    const infoInspirationCheckbox = document.getElementById("info-inspiration-checkbox") as HTMLInputElement;
    const infoInspirationTrigger = document.getElementById("info-inspiration-trigger") as HTMLElement;

    const infoQuickNotesTextarea = document.getElementById("info-quick-notes-textarea") as HTMLTextAreaElement;
    const infoActiveEffectsTextarea = document.getElementById("info-active-effects-textarea") as HTMLTextAreaElement;

    addAdvancedEventListener(infoLevelInput, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoBackgroundInput, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoSpeciesInput, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoNameInput, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoClassInput, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoAlignmentInput, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoQuickNotesTextarea, (id, val) => this.viewModel.handleInfoInput(id, val));
addAdvancedEventListener(infoActiveEffectsTextarea, (id, val) => this.viewModel.handleInfoInput(id, val));

if(infoAppearanceButton) {
    infoAppearanceButton.addEventListener('click', (event): void => {
        const target = event.target as HTMLInputElement;
        const id = target.id;
        this.viewModel.handleInfoInput(id, "");
    })
}

if(!infoAppearanceButton) {
    imageImportTriggerFigure.addEventListener(
        'click',
        (): void => {
            imageImportInput.click();
        }
    )
}

imageImportInput.addEventListener('change', (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const id = target.id;
    const files = target.files;

    if (files && files.length > 0) {
        const file = files[0];
        this.viewModel.handleInfoInput(id, file)
    }
});

infoInspirationTrigger.addEventListener('click', (): void => {
    infoInspirationCheckbox.click();
});

infoInspirationCheckbox.addEventListener('change', (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const id = target.id;
    const value = target.checked;
    this.viewModel.handleInfoInput(id, value);
});
}