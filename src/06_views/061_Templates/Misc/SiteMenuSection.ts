export function createSiteMenuSection(activeSiteMenuTab: string): string {
    let innerHTML= `
        <div class="tabs column is-medium is-full p-0 mb-4" id="site-menu-tabs">
            <ul>
                <li class="${`menu-nav-character` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-character">
                    <a>
                        <span class="icon is-small"><i class="fas fa-user-shield" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Character</span>
                    </a>
                </li>
                <li class="${`menu-nav-proficient-skills-notes` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-proficient-skills-notes">
                    <a>
                        <span class="icon is-small"><i class="fas fa-bolt" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Proficient Skills & Notes</span>
                    </a>
                </li>
                <li class="${`menu-nav-attributes` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-attributes">
                    <a>
                        <span class="icon is-small"><i class="fas fa-shield-alt" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Attributes</span>
                    </a>
                </li>
                <li class="${`menu-nav-weapons-spells-entities` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-weapons-spells-entities">
                    <a>
                        <span class="icon is-small"><i class="fas fa-magic" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">Weapons, Spells & Entities</span>
                    </a>
                </li>
                <li class="${`menu-nav-all-skills` === activeSiteMenuTab ? "is-active" : ""}" data-tab="menu-nav-all-skills">
                    <a>
                        <span class="icon is-small"><i class="fas fa-book" aria-hidden="true"></i></span>
                        <span class="label is-size-4 has-text-weight-semibold">All Skills</span>
                    </a>
                </li>
            </ul>
        </div>
    `
    return innerHTML;
}