import {CharacterSheetViewModel} from "./03_viewmodels/CharacterSheet.ViewModel";
import {CharacterView} from "./06_views/Character.View";

document.addEventListener('DOMContentLoaded', () => {
    const viewModel = new CharacterSheetViewModel();
    new CharacterView(viewModel);

    console.log('D&D App erfolgreich initialisiert.')
})