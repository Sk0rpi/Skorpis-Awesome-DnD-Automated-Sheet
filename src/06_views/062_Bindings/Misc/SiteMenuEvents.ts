export function bindSiteMenuEvents(): void {
    const siteMenuTabs = document.getElementById('site-menu-tabs') as HTMLDivElement;

    const sectionMenuCharacter = document.getElementById('section-menu-character') as HTMLDivElement;
    const sectionMenuActiveSkillsAndNotes = document.getElementById('section-menu-proficient-skills-and-notes') as HTMLDivElement;
    const sectionAttributes = document.getElementById('section-attributes') as HTMLDivElement;
    const sectionWeaponsSpellsAndEntities = document.getElementById('section-weapons-spells-and-entities') as HTMLDivElement;
    const sectionAllSkills = document.getElementById('section-all-skills') as HTMLDivElement;

    const tabSections = [
        { tabId: 'menu-nav-character', element: sectionMenuCharacter },
        { tabId: 'menu-nav-proficient-skills-notes', element: sectionMenuActiveSkillsAndNotes },
        { tabId: 'menu-nav-attributes', element: sectionAttributes },
        { tabId: 'menu-nav-weapons-spells-entities', element: sectionWeaponsSpellsAndEntities },
        { tabId: 'menu-nav-all-skills', element: sectionAllSkills },
    ];

    siteMenuTabs.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
            const targetTab = li.getAttribute('data-tab');

            if (targetTab) this.activeSiteMenuTab = targetTab.toString();

            siteMenuTabs.querySelectorAll('li').forEach(tab => tab.classList.remove('is-active'));
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

}