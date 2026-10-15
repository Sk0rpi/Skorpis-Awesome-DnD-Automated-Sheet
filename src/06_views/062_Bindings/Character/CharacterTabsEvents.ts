export function bindCharacterTabEvents(): void {
    const tabContainer = document.getElementById('character-tabs');

    if (!tabContainer) return;

const tabs = tabContainer.querySelectorAll('li');

tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
        const targetTab = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const sectionWeapons = document.getElementById('section-weapons');
        const sectionSpells = document.getElementById('section-spells');
        const sectionEntities = document.getElementById('section-entities');

        sectionWeapons?.classList.add('is-hidden');
        sectionSpells?.classList.add('is-hidden');
        sectionEntities?.classList.add('is-hidden');

        switch(targetTab) {
            case 'weapons':
                sectionWeapons?.classList.remove('is-hidden');
                break;
            case 'spells':
                sectionSpells?.classList.remove('is-hidden');
                break;
            case 'entities':
                sectionEntities?.classList.remove('is-hidden');
                break;
        }
    });
});
}