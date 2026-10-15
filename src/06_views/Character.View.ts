import {CharacterSheetViewModel} from "../03_viewmodels/CharacterSheet.ViewModel";
import {Character} from "../02_models/022_Classes/Character/Character";
import {ALL_PROFICIENCIES} from "../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {createMenuSection} from "./061_Templates/Misc/MenuSection";
import {createSiteMenuSection} from "./061_Templates/Misc/SiteMenuSection";
import {createNoteSection} from "./061_Templates/Character/NoteSection";
import {createCharacterInfoSection} from "./061_Templates/Character/InfoSection";
import {createCharacterStatusSection} from "./061_Templates/Character/StatusSection";
import {createAttributeSection} from "./061_Templates/Attributes/AttributeSection";
import {createCurrencyAndStatBanner} from "./061_Templates/Character/CurrencyAndStatsSection";
import {createWeaponSection} from "./061_Templates/Weapons/WeaponSection";
import {createSpellSection} from "./061_Templates/Spells/SpellSection";
import {createEntitySection} from "./061_Templates/Entities/EntitySection";
import {createProficientSkillsSection} from "./061_Templates/Proficiencies/ProficientSkillSection";
import {createProficiencySection} from "./061_Templates/Proficiencies/ProficiencySection";
import {bindSpellCastingEvents} from "./062_Bindings/Spells/SpellCastingEvents";
import {bindMenuEvents} from "./062_Bindings/Misc/MenuEvents";
import {bindNoteEvents} from "./062_Bindings/Character/NoteEvents";
import {bindInfoEvents} from "./062_Bindings/Character/InfoEvents";
import {bindStatusInputEvents} from "./062_Bindings/Character/StatusInputEvents";
import {bindAttributeInputEvents} from "./062_Bindings/Attributes/AttributeInputEvents";
import {bindCharacterTabEvents} from "./062_Bindings/Character/CharacterTabsEvents";
import {bindProficiencyTabEvents} from "./062_Bindings/Proficiencies/ProficiencyTabsEvents";
import {bindProficiencyCheckboxesEvents} from "./062_Bindings/Proficiencies/ProficiencyCheckboxesEvents";
import {bindWeaponEvents} from "./062_Bindings/Weapons/WeaponEvents";
import {bindSpellEvents} from "./062_Bindings/Spells/SpellEvents";
import {bindEntityEvents} from "./062_Bindings/Entities/EntityEvents";
import {bindCurrencyEvents} from "./062_Bindings/Character/CurrencyEvents";
import {bindSiteMenuEvents} from "./062_Bindings/Misc/SiteMenuEvents";

class CharacterView {
    viewModel: CharacterSheetViewModel;
    private activeProficiencyTab: string = ALL_PROFICIENCIES[0];
    private activeNoteTab: string = "notes-equipment-table-nav";
    private activeSiteMenuTab: string = "menu-nav-character";
    private isAppVisible: boolean = false;

    constructor(viewModel: CharacterSheetViewModel) {
        this.viewModel = viewModel;
        this.initViewModelSubscription();
        this.viewModel.loadCharacterFromCache();
    }

    private initViewModelSubscription(): void {
        this.viewModel.subscribe((character) => {
            if (character) {
                this.render(character);
            }
        })
    }

    private render(character: Character): void {
        this.renderSection(
            'menu',
            createMenuSection
        );

        this.renderSection(
            'site-menu',
            createSiteMenuSection,
            character,
            (c) => this.activeSiteMenuTab
        );

        this.renderSection(
            'note-banner',
            createNoteSection,
            character,
            (c) => ({
                    characterNotes: c.notes,
                    activeNoteTab: this.activeNoteTab
                })
        );

        this.renderSection(
            'character-info-section',
            createCharacterInfoSection,
            character,
            (c) => ({
                characterInfo: c.info,
                characterNotes: c.notes,
                inspiration: c.inspiration
            }),
        );

        this.renderSection(
            'character-status-section',
            createCharacterStatusSection,
            character,
            (c) => ({
                status: c.status,
                maximum_hit_die: c.maximum_hit_die,
                current_hit_die: c.current_hit_die,
                death_save_failure: c.death_save_failure,
                death_save_success: c.death_save_success
            }),
        );

        this.renderSection(
            'attribute-section',
            createAttributeSection,
            character,
            (c) => c.attributes,
        );

        this.renderSection(
            'curreny-stat-banner',
            createCurrencyAndStatBanner,
            character,
            (c) => ({
                currencies: c.currency,
                proficiencyBonus: c.proficiency_bonus,
                passivePerception: c.passive_perception,
                spell_casting: c.spell_casting,
            }),
        );

        this.renderSection(
            'weapon-section',
            createWeaponSection,
            character,
            (c) => ({
                    weapons: c.weapons,
                    tempProperties: this.viewModel.tempProperties
                }),
        );

        this.renderSection(
            'spell-section',
            createSpellSection,
            character,
            (c) => c.spells,
        );

        this.renderSection(
            'entity-section',
            createEntitySection,
            character,
            (c) => c.entities,

        );

        this.renderSection(
            'proficient-skills-section',
            createProficientSkillsSection,
            character,
            (c) => c.proficiencies,
        );

        this.renderSection(
            'proficiency-section',
            createProficiencySection,
            character,
            (c) => ({
                proficiency: c.proficiencies,
                activeProficiencyTab: this.activeProficiencyTab
            }),
        );

        bindSpellCastingEvents();
        bindMenuEvents()
        bindNoteEvents(character);
        bindInfoEvents();
        bindStatusInputEvents(character);
        bindAttributeInputEvents(character);
        bindCharacterTabEvents();
        bindProficiencyTabEvents();
        bindProficiencyCheckboxesEvents(character);
        bindWeaponEvents(character, this.viewModel);
        bindSpellEvents(character);
        bindEntityEvents(character);
        bindCurrencyEvents(character);
        bindSiteMenuEvents();

        if (!this.isAppVisible) {
            const appSection = document.getElementById('app');
            if (appSection) {
                appSection.classList.remove('is-hidden');
                this.isAppVisible = true;
            }
        }
    }

    private renderSection<T, U>(
        container_name: string,
        templateRenderer: (param: U) => string,
        data?: T,
        templateSelector?: (data: T) => U
    ): void {
        const container = document.getElementById(container_name);
        if (!container) {
            console.warn(`Container element not found: ${container_name}`);
            return;
        }

        let nestedData: any = undefined;
        if (data && templateSelector) {
            nestedData = templateSelector(data);
        }

        try {
            container.innerHTML = templateRenderer(nestedData);
        } catch (error) {
            console.error(`Error rendering section [${container_name}]:`, error);
        }
    }
}

export default CharacterView