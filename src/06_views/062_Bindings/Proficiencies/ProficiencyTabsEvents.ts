import {ALL_PROFICIENCIES} from "../../../02_models/023_Types/Proficiencies/ProficiencyTypes";

export function bindProficiencyTabEvents(): void {
    const tabContainer = document.getElementById('proficiency-tabs');

    if (!tabContainer) return;

const tabs = tabContainer.querySelectorAll('li');

tabs.forEach(tab => {
    tab.addEventListener('click', (event: Event) => {
        const targetTab = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        ALL_PROFICIENCIES.forEach(proficiency => {
            let profList = document.getElementById(proficiency+"-list");
            profList?.classList.add('is-hidden');
        })

        const proficiency = targetTab?.split("-")[0]
        if(!proficiency) return;
        this.activeProficiencyTab = proficiency;
        const listName = proficiency + "-list";
        if(!listName) return;
        const activeList = document.getElementById(listName);
        activeList?.classList.remove('is-hidden');

    })
})
}