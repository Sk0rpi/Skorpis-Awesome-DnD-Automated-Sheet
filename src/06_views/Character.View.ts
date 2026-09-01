import {CharacterSheetViewModel} from "../03_viewmodels/CharacterSheet.ViewModel";
import {Character} from "../02_models/022_Classes/Character/Character";
import {
    createActiveProficienciesSection,
    createAttributeSection,
    createCharacterInfoSection, createCharacterStatusSection, createCurrencyAndStatBanner, createEntitySection,
    createMenuSection,
    createNoteBannerSection, createProficiencySection, createSpellCastingBanner, createSpellSection, createWeaponSection
} from "./Templates";
import {ALL_PROFICIENCY_TYPES} from "../02_models/023_Types/Proficiencies/AnyProficiencyTypes";
import {ALL_PROFICIENCIES} from "../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {ALL_ATTRIBUTE_TYPES, AttributeType} from "../02_models/023_Types/Attributes/AttributeTypes";
import {addInfoEventListener, isNumeric} from "../07_services/Util";
import {ALL_STATUS_TYPES, StatusType} from "../02_models/023_Types/Attributes/StatusTypes";

export class CharacterView {
    private viewModel: CharacterSheetViewModel;
    private activeProficiencyTab: string = ALL_PROFICIENCIES[0];
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
            'note-banner',
            createNoteBannerSection,
            character,
            (c) => c.notes,
        );

        this.renderSection(
            'character-info-section',
            createCharacterInfoSection,
            character,
            (c) => ({
                characterInfo: c.info,
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
                passivePerception: c.passive_perception
            }),
        );

        this.renderSection(
            'weapon-section',
            createWeaponSection,
            character,
            (c) => c.weapons,
        );

        this.renderSection(
            'spell-casting-section',
            createSpellCastingBanner,
            character,
            (c) => c.spell_casting,
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
            'active-proficiencies-section',
            createActiveProficienciesSection,
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

        this.bindMenuEvents();
        this.bindInfoEvents();
        this.bindStatusInputEvents(character);
        this.bindAttributeInputEvents(character);
        this.bindCharacterTabEvents();
        this.bindProficiencyTabEvents();
        this.bindProficiencyCheckboxesEvents(character);

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

    private bindMenuEvents(): void {
        const importCharacterInput = document.getElementById('import-character-input') as HTMLInputElement;
        const importCharacterButton = document.getElementById('import-character-button') as HTMLButtonElement;
        const exportCharacterButton = document.getElementById('export-character-button') as HTMLButtonElement;
        const createCharacterButton = document.getElementById('create-character-button') as HTMLButtonElement;

        importCharacterButton.addEventListener('click', (event): void => {
            importCharacterInput.click();
        })

        importCharacterInput.addEventListener('change', (event): void => {
            const target = event.currentTarget as HTMLInputElement;
            const id = target.id;
            const files = target.files;

            if (files && files.length > 0) {
                const file = files[0];
                this.viewModel.handleMenuClick(id, file)
            }
        })

        exportCharacterButton.addEventListener('click', (event): void => {
            const target = event.currentTarget as HTMLInputElement;
            const id = target.id;
            this.viewModel.handleMenuClick(id, null);
        })

        createCharacterButton.addEventListener('click', (event): void => {
            const target = event.currentTarget as HTMLInputElement;
            const id = target.id;
            this.viewModel.handleMenuClick(id, null);
        })
    }

    private bindInfoEvents(): void {
        const infoLevelInput = document.getElementById("info-level-input") as HTMLInputElement;
        const infoBackgroundInput = document.getElementById("info-background-input") as HTMLInputElement;
        const infoSpeciesInput = document.getElementById("info-species-input") as HTMLInputElement;

        const imageImportInput = document.getElementById("image-import-input") as HTMLInputElement;
        const imageImportTriggerFigure = document.getElementById("image-import-trigger-figure") as HTMLElement;

        const infoNameInput = document.getElementById("info-name-input") as HTMLInputElement;
        const infoClassInput = document.getElementById("info-class-input") as HTMLInputElement;
        const infoAlignmentInput = document.getElementById("info-alignment-input") as HTMLInputElement;

        const infoInspirationCheckbox = document.getElementById("info-inspiration-checkbox") as HTMLInputElement;
        const infoInspirationTrigger = document.getElementById("info-inspiration-trigger") as HTMLElement;

        const infoQuickNotesTextarea = document.getElementById("info-quick-notes-textarea") as HTMLTextAreaElement;
        const infoActiveEffectsTextarea = document.getElementById("info-active-effects-textarea") as HTMLTextAreaElement;

        addInfoEventListener(infoLevelInput, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoBackgroundInput, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoSpeciesInput, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoNameInput, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoClassInput, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoAlignmentInput, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoQuickNotesTextarea, (id, val) => this.viewModel.handleInfoInput(id, val));
        addInfoEventListener(infoActiveEffectsTextarea, (id, val) => this.viewModel.handleInfoInput(id, val));

        imageImportTriggerFigure.addEventListener('click', (): void => {
            imageImportInput.click();
        });

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

    private bindStatusInputEvents(character: Character): void {
        Object.entries(ALL_STATUS_TYPES).forEach(([key, value]) => {
            const inputBase = document.getElementById(value + "-base-input") as HTMLInputElement;

            inputBase?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id;
                const targetIDSplit = targetID.split("-");
                const targetType = targetIDSplit.length > 3 ? `${targetIDSplit[0]}-${targetIDSplit[1]}` as StatusType : targetIDSplit[0] as StatusType;

                if (!isNumeric(target.value)) {
                    target.value = character.status[value].base.toString();
                    return;
                }

                const newStatusBase = Number(target.value);

                this.viewModel.handleStatusInputBaseChange(targetType, newStatusBase);
            });

            const inputEffect = document.getElementById(value + "-effect-input") as HTMLInputElement | null;

            inputEffect?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id;
                const targetIDSplit = targetID.split("-");
                const targetType = targetIDSplit.length > 3 ? `${targetIDSplit[0]}-${targetIDSplit[1]}` as StatusType : targetIDSplit[0] as StatusType;

                console.log(target.value, targetType);

                if (!isNumeric(target.value)) {
                    target.value = character.status[value].effect.toString();
                    return;
                }

                const newStatusEffect = Number(target.value);

                this.viewModel.handleStatusInputEffectChange(targetType, newStatusEffect);
            });
        });

        const inputMaximumHitDie = document.getElementById("maximum-hit-die-input") as HTMLInputElement | null;
        inputMaximumHitDie?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleMaximumHitDieChange(target.value);
        })

        const inputCurrentHitDie = document.getElementById("current-hit-die-input") as HTMLInputElement | null;
        inputCurrentHitDie?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleCurrentHitDieChange(target.value);
        })

        for(let i = 1; i <= 3; i++) {
            const checkboxDeathSaveFailure = document.getElementById(`death-save-failure-${i}-checkbox`) as HTMLInputElement | null;
            checkboxDeathSaveFailure?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id.split("-").at(-2);
                this.viewModel.handleDeathSaveFailureChange(Number(targetID), target.checked);
            })

            const checkboxDeathSaveSuccess = document.getElementById(`death-save-success-${i}-checkbox`) as HTMLInputElement | null;
            checkboxDeathSaveSuccess?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id.split("-").at(-2);
                this.viewModel.handleDeathSaveSuccessChange(Number(targetID), target.checked);
            })
        }
    }

    private bindAttributeInputEvents(character: Character): void {
        Object.entries(ALL_ATTRIBUTE_TYPES).forEach(([key, value]) => {
            const checkbox = document.getElementById(value + "-checkbox") as HTMLInputElement | null;
            if (checkbox) checkbox.checked = character.attributes[value].isSave;

            checkbox?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id;
                const targetType = targetID.split("-")[0] as AttributeType;

                this.viewModel.handleAttributeSaveCheckboxChange(targetType, target.checked);
            });

            const input = document.getElementById(value + "-input") as HTMLInputElement | null;

            input?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id;
                const targetType = targetID.split("-")[0] as AttributeType;

                if (!isNumeric(target.value)) {
                    target.value = character.attributes[targetType].effect.toString();
                    return;
                }

                const newAttributeEffect = Number(target.value);

                this.viewModel.handleAttributeInputChange(targetType, newAttributeEffect);
            });

            const inputBase = document.getElementById(value + "-base-input") as HTMLInputElement;

            inputBase?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                const targetID = target.id;
                const targetType = targetID.split("-")[0] as AttributeType;

                if (!isNumeric(target.value)) {
                    target.value = character.attributes[targetType].effect.toString();
                    return;
                }

                const newAttributeBase = Number(target.value);

                this.viewModel.handleAttributeInputBaseChange(targetType, newAttributeBase);
            })
        })
    }

    private bindProficiencyCheckboxesEvents(character: Character): void {
        Object.entries(ALL_PROFICIENCY_TYPES).forEach(([typeName, typeGroup]) => {
            Object.entries(typeGroup).forEach(([proficiencyKey, attribute]) => {

                const proficiency = proficiencyKey as keyof typeof character.proficiencies;
                const checkbox_1 = document.getElementById(`${proficiency}-checkbox-1`) as HTMLInputElement | null;
                const checkbox_2 = document.getElementById(`${proficiency}-checkbox-2`) as HTMLInputElement | null;

                const currentProfLevel = character.proficiencies[proficiency]?.proficient ?? 0;

                if (checkbox_1) checkbox_1.checked = currentProfLevel >= 1;
                if (checkbox_2) checkbox_2.checked = currentProfLevel === 2;

                checkbox_2?.addEventListener('change', (event: Event) => {
                    const target = event.target as HTMLInputElement;
                    const nextLevel = target.checked ? 2 : 1;

                    this.viewModel.handleProficiencyChange(proficiency, nextLevel);
                });

                checkbox_1?.addEventListener('change', (event: Event) => {
                    const target = event.target as HTMLInputElement;
                    const nextLevel = target.checked ? 1 : 0;

                    this.viewModel.handleProficiencyChange(proficiency, nextLevel);
                });
            });
        });
    }

    private bindProficiencyTabEvents(): void {
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

    private bindCharacterTabEvents(): void {
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
}