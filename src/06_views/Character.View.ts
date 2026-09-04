import {CharacterSheetViewModel} from "../03_viewmodels/CharacterSheet.ViewModel";
import {Character} from "../02_models/022_Classes/Character/Character";
import {
    createActiveProficienciesSection,
    createAttributeSection,
    createCharacterInfoSection, createCharacterStatusSection, createCurrencyAndStatBanner, createEntitySection,
    createMenuSection, createNoteSection,
    createProficiencySection, createSpellCastingBanner, createSpellSection, createWeaponSection
} from "./Templates";
import {ALL_PROFICIENCY_TYPES} from "../02_models/023_Types/Proficiencies/AnyProficiencyTypes";
import {ALL_PROFICIENCIES} from "../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {ALL_ATTRIBUTE_TYPES, AttributeType} from "../02_models/023_Types/Attributes/AttributeTypes";
import {addAdvancedEventListener, isNumeric} from "../07_services/Util";
import {ALL_STATUS_TYPES, StatusType} from "../02_models/023_Types/Attributes/StatusTypes";
import {WeaponType} from "../02_models/023_Types/Proficiencies/WeaponTypes";

export class CharacterView {
    private viewModel: CharacterSheetViewModel;
    private activeProficiencyTab: string = ALL_PROFICIENCIES[0];
    private activeNoteTab: string = "notes-equipment-table-nav";
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
            (c) => ({
                    weapons: c.weapons,
                    tempProperties: this.viewModel.tempProperties
                }),
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

        this.bindSpellCastingEvents();
        this.bindMenuEvents();
        this.bindNoteEvents(character);
        this.bindInfoEvents();
        this.bindStatusInputEvents(character);
        this.bindAttributeInputEvents(character);
        this.bindCharacterTabEvents();
        this.bindProficiencyTabEvents();
        this.bindProficiencyCheckboxesEvents(character);
        this.bindWeaponEvents(character);
        this.bindSpellEvents(character);
        this.bindEntityEvents(character);
        this.bindCurrencyEvents(character);

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

    private bindCurrencyEvents(character: Character): void {
        Object.entries(character.currency).forEach(([currencyName, currency]) => {
            const currencyTypeInput = document.getElementById(`currency-input-${currencyName}`) as HTMLInputElement;
            if(!currencyTypeInput) return;
            addAdvancedEventListener(currencyTypeInput, (id, val) => this.viewModel.handleCurrencyEvents(id, val));
        })
    }

    private bindSpellCastingEvents(): void {
        const modTypeInput = document.getElementById('spell-casting-mod-type-input') as HTMLInputElement;
        const concentrationCheckbox = document.getElementById('spell-casting-concentrating-checkbox') as HTMLInputElement;
        const concentrationTrigger = document.getElementById('spell-casting-concentrating-trigger') as HTMLElement;

        addAdvancedEventListener(modTypeInput, (id, val) => this.viewModel.handleSpellCastingEvent(id, val));

        concentrationTrigger.addEventListener('click', (event): void => {
            concentrationCheckbox.click();
        })

        concentrationCheckbox.addEventListener('change', (event): void => {
            const target = event.currentTarget as HTMLInputElement;
            const id = target.id;
            this.viewModel.handleSpellCastingEvent(id, "")
        })
    }

    private bindNoteEvents(character: Character): void {
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

    private bindWeaponEvents(character: Character): void {
        const weaponsAddNew = document.getElementById("weapons-add-new") as HTMLButtonElement;

        weaponsAddNew.addEventListener("click", (event) => {
            const weaponsNameInputNew = document.getElementById("weapons-name-input-new") as HTMLInputElement;
            const weaponsTypeInputNew = document.getElementById("weapons-type-input-new") as HTMLSelectElement;
            const weaponsModTypeInputNew = document.getElementById("weapons-mod-type-input-new") as HTMLSelectElement;
            const weaponsEffectInputNew = document.getElementById("weapons-effect-input-new") as HTMLInputElement;
            const weaponsEnhancementInputNew = document.getElementById("weapons-enhancement-input-new") as HTMLInputElement;
            const weaponsDamageDiceInputNew = document.getElementById("weapons-damage-dice-input-new") as HTMLInputElement;

            const name = weaponsNameInputNew.value;
            const type = weaponsTypeInputNew.value;
            const mod_type = weaponsModTypeInputNew.value;
            const effect = weaponsEffectInputNew.value;
            const enhancement = weaponsEnhancementInputNew.value;
            const damage_dice = weaponsDamageDiceInputNew.value;

            this.viewModel.handleNewWeapon(name, type as WeaponType, mod_type as AttributeType, effect, enhancement, damage_dice);
        })

        const weaponsAddPropertyNew = document.getElementById("weapons-add-property-new") as HTMLInputElement;

        addAdvancedEventListener(weaponsAddPropertyNew, (id, val) => this.viewModel.handleAddNewTempProperty(id, val));

        this.viewModel.tempProperties.forEach(property => {
            const weaponsRemoveTempProperty = document.getElementById(`weapons-remove-temp-property-${property}`) as HTMLButtonElement;

            if(!weaponsRemoveTempProperty) return;

            weaponsRemoveTempProperty.addEventListener("click", (event) => {
                const button = event.currentTarget as HTMLButtonElement;
                this.viewModel.handleRemoveProperty(button.id);
            })
        })

        Object.entries(character.weapons).forEach(([name, weapon]) => {
            const weaponDelete = document.getElementById(`weapons-remove-${name}`) as HTMLButtonElement;

            weaponDelete.addEventListener("click", (event) => {
                const button = event.currentTarget as HTMLButtonElement;
                this.viewModel.handleRemoveWeapon(button.id);
            })

            const weaponsNameInput = document.getElementById(`weapons-name-input-${name}`) as HTMLInputElement;
            const weaponsTypeInput = document.getElementById(`weapons-type-input-${name}`) as HTMLInputElement;
            const weaponsModTypeInput = document.getElementById(`weapons-mod-type-input-${name}`) as HTMLInputElement;
            const weaponsEffectInput = document.getElementById(`weapons-effect-input-${name}`) as HTMLInputElement;
            const weaponsEnhancementInput = document.getElementById(`weapons-enhancement-input-${name}`) as HTMLInputElement;
            const weaponsDamageDiceInput = document.getElementById(`weapons-damage-dice-input-${name}`) as HTMLInputElement;
            const weaponsAddProperty = document.getElementById(`weapons-add-property-${name}`) as HTMLInputElement;

            addAdvancedEventListener(weaponsNameInput, (id, val) => this.viewModel.handleWeaponInput(id, val));
            addAdvancedEventListener(weaponsTypeInput, (id, val) => this.viewModel.handleWeaponInput(id, val));
            addAdvancedEventListener(weaponsModTypeInput, (id, val) => this.viewModel.handleWeaponInput(id, val));
            addAdvancedEventListener(weaponsEffectInput, (id, val) => this.viewModel.handleWeaponInput(id, val));
            addAdvancedEventListener(weaponsEnhancementInput, (id, val) => this.viewModel.handleWeaponInput(id, val));
            addAdvancedEventListener(weaponsDamageDiceInput, (id, val) => this.viewModel.handleWeaponInput(id, val));
            addAdvancedEventListener(weaponsAddProperty, (id, val) => this.viewModel.handleWeaponInput(id, val));

            Object.entries(weapon.properties).forEach(([key, property]) => {
                const weaponProperty = document.getElementById(`weapons-remove-property-${name}-${property}`) as HTMLInputElement;

                if(!weaponProperty) return;

                weaponProperty.addEventListener("click", (event) => {
                    const button = event.currentTarget as HTMLButtonElement;
                    this.viewModel.handleRemoveProperty(button.id);
                })
            })
        })
    }

    private bindSpellEvents(character: Character): void {
        const spellsAddNew = document.getElementById("spells-add-new") as HTMLButtonElement;

        spellsAddNew.addEventListener("click", () => {
            const spellsLevelInputNew = document.getElementById("spells-level-input-new") as HTMLInputElement;
            const spellsNameInputNew = document.getElementById("spells-name-input-new") as HTMLInputElement;
            const spellsCastingTimeInputNew = document.getElementById("spells-casting-time-input-new") as HTMLInputElement;
            const spellsRangeInputNew = document.getElementById("spells-range-input-new") as HTMLInputElement;
            const spellsConcCheckboxNew = document.getElementById("spells-conc-checkbox-new") as HTMLInputElement;
            const spellsVCheckboxNew = document.getElementById("spells-v-checkbox-new") as HTMLInputElement;
            const spellsSCheckboxNew = document.getElementById("spells-s-checkbox-new") as HTMLInputElement;
            const spellsMCheckboxNew = document.getElementById("spells-m-checkbox-new") as HTMLInputElement;
            const spellsNotesInputNew = document.getElementById("spells-notes-input-new") as HTMLTextAreaElement;

            const level = spellsLevelInputNew.value;
            const name = spellsNameInputNew.value;
            const casting_time = spellsCastingTimeInputNew.value;
            const range = spellsRangeInputNew.value;
            const concentration = spellsConcCheckboxNew.checked;
            const verbal = spellsVCheckboxNew.checked;
            const somatic = spellsSCheckboxNew.checked;
            const material = spellsMCheckboxNew.checked;
            const notes = spellsNotesInputNew.value;

            this.viewModel.handleNewSpell(level, name, casting_time, range, concentration, verbal, somatic, material, notes);
        });

        Object.entries(character.spells).forEach(([spellName, spell]) => {
            const spellDelete = document.getElementById(`spells-remove-${spellName}`) as HTMLButtonElement;

            spellDelete.addEventListener("click", (event) => {
                const button = event.currentTarget as HTMLButtonElement;
                this.viewModel.handleRemoveSpell(button.id);
            });

            const spellsLevelInput = document.getElementById(`spells-level-input-${spellName}`) as HTMLInputElement;
            const spellsNameInput = document.getElementById(`spells-name-input-${spellName}`) as HTMLInputElement;
            const spellsCastingTimeInput = document.getElementById(`spells-casting-time-input-${spellName}`) as HTMLInputElement;
            const spellsRangeInput = document.getElementById(`spells-range-input-${spellName}`) as HTMLInputElement;
            const spellsNotesInput = document.getElementById(`spells-notes-input-${spellName}`) as HTMLTextAreaElement;

            addAdvancedEventListener(spellsLevelInput, (id, val) => this.viewModel.handleSpellInput(id, val));
            addAdvancedEventListener(spellsNameInput, (id, val) => this.viewModel.handleSpellInput(id, val));
            addAdvancedEventListener(spellsCastingTimeInput, (id, val) => this.viewModel.handleSpellInput(id, val));
            addAdvancedEventListener(spellsRangeInput, (id, val) => this.viewModel.handleSpellInput(id, val));
            addAdvancedEventListener(spellsNotesInput, (id, val) => this.viewModel.handleSpellInput(id, val));

            const spellsConcCheckbox = document.getElementById(`spells-conc-checkbox-${spellName}`) as HTMLInputElement;
            const spellsVCheckbox = document.getElementById(`spells-v-checkbox-${spellName}`) as HTMLInputElement;
            const spellsSCheckbox = document.getElementById(`spells-s-checkbox-${spellName}`) as HTMLInputElement;
            const spellsMCheckbox = document.getElementById(`spells-m-checkbox-${spellName}`) as HTMLInputElement;

            spellsConcCheckbox?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
            });

            spellsVCheckbox?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
            });

            spellsSCheckbox?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
            });

            spellsMCheckbox?.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
            });
        });
    }

    private bindEntityEvents(character: Character): void {
        const entitiesAddNew = document.getElementById("entities-add-new") as HTMLButtonElement;

        entitiesAddNew.addEventListener("click", () => {
            const entitiesNameInputNew = document.getElementById("entities-name-input-new") as HTMLInputElement;
            const entitiesACInputNew = document.getElementById("entities-ac-input-new") as HTMLInputElement;
            const entitiesHPCurrentInputNew = document.getElementById("entities-hp_current-input-new") as HTMLInputElement;
            const entitiesHPMaxInputNew = document.getElementById("entities-hp_max-input-new") as HTMLInputElement;
            const entitiesCapacityCurrentInputNew = document.getElementById("entities-capacity_current-input-new") as HTMLInputElement;
            const entitiesCapacityMaxInputNew = document.getElementById("entities-capacity_max-input-new") as HTMLInputElement;
            const entitiesNotesInputNew = document.getElementById("entities-notes-input-new") as HTMLTextAreaElement;
            const entitiesInventoryInputNew = document.getElementById("entities-inventory-input-new") as HTMLTextAreaElement;
            const entitiesSpeedInputNew = document.getElementById("entities-speed-input-new") as HTMLInputElement;

            const name = entitiesNameInputNew.value.replaceAll(`"`, `„`);
            const ac = entitiesACInputNew.value;
            const hp_current = entitiesHPCurrentInputNew.value;
            const hp_max = entitiesHPMaxInputNew.value;
            const capacity_current = entitiesCapacityCurrentInputNew.value;
            const capacity_max = entitiesCapacityMaxInputNew.value;
            const notes = entitiesNotesInputNew.value;
            const inventory = entitiesInventoryInputNew.value;
            const speed = entitiesSpeedInputNew.value;

            this.viewModel.handleNewEntity(name, ac, hp_current, hp_max, capacity_current, capacity_max, notes, inventory, speed);
        });

        Object.entries(character.entities).forEach(([entityName, entity]) => {
            const entityDelete = document.getElementById(`entities-remove-${entityName}`) as HTMLButtonElement;

            if(!entityDelete) return;

            entityDelete.addEventListener("click", (event) => {
                const button = event.currentTarget as HTMLButtonElement;
                this.viewModel.handleRemoveEntity(button.id);
            });

            const entitiesNameInput = document.getElementById(`entities-name-input-${entityName}`) as HTMLInputElement;
            const entitiesACInput = document.getElementById(`entities-ac-input-${entityName}`) as HTMLInputElement;
            const entitiesHPCurrentInput = document.getElementById(`entities-hp_current-input-${entityName}`) as HTMLInputElement;
            const entitiesHPMaxInput = document.getElementById(`entities-hp_max-input-${entityName}`) as HTMLInputElement;
            const entitiesCapacityCurrentInput = document.getElementById(`entities-capacity_current-input-${entityName}`) as HTMLInputElement;
            const entitiesCapacityMaxInput = document.getElementById(`entities-capacity_max-input-${entityName}`) as HTMLInputElement;
            const entitiesNotesInput = document.getElementById(`entities-notes-input-${entityName}`) as HTMLTextAreaElement;
            const entitiesInventoryInput = document.getElementById(`entities-inventory-input-${entityName}`) as HTMLTextAreaElement;
            const entitiesSpeedInput = document.getElementById(`entities-speed-input-${entityName}`) as HTMLInputElement;

            addAdvancedEventListener(entitiesNameInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesACInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesHPCurrentInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesHPMaxInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesCapacityCurrentInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesCapacityMaxInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesNotesInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesInventoryInput, (id, val) => this.viewModel.handleEntityInput(id, val));
            addAdvancedEventListener(entitiesSpeedInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        });
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