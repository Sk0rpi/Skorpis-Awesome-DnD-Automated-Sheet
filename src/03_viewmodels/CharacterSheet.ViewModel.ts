import {Character} from "../02_models/022_Classes/Character/Character";
import {importFromJson} from "../07_services/CharacterImportService";
import {calculateProficiencyBonus} from "../05_engine/Calculations";
import {Proficiency} from "../02_models/022_Classes/Proficiencies/Proficiency";
import {ALL_PROFICIENCY_TYPES, AnyProficiencyType} from "../02_models/023_Types/Proficiencies/AnyProficiencyTypes";
import {ALL_ATTRIBUTE_TYPES, AttributeType} from "../02_models/023_Types/Attributes/AttributeTypes";
import {ALL_STATUS_TYPES, StatusType} from "../02_models/023_Types/Attributes/StatusTypes";
import {IAttribute} from "../02_models/021_Interfaces/Attributes/IAttribute";
import {Attribute} from "../02_models/022_Classes/Attributes/Attribute";
import {CharacterInfo} from "../02_models/022_Classes/Character/CharacterInfo";
import {ALL_CURRENCY_TYPES, CurrencyType} from "../02_models/023_Types/Character/CurrencyTypes";
import {ICharacterCurrency} from "../02_models/021_Interfaces/Character/ICharacterCurrency";
import {CharacterCurrency} from "../02_models/022_Classes/Character/CharacterCurrency";
import {ProficiencyType} from "../02_models/023_Types/Proficiencies/ProficiencyTypes";
import {IProficiency} from "../02_models/021_Interfaces/Proficiencies/IProficiency";
import {CharacterStatus} from "../02_models/022_Classes/Character/CharacterStatus";
import {ICharacterStatus} from "../02_models/021_Interfaces/Character/ICharacterStatus";
import {SpellCasting} from "../02_models/022_Classes/Spells/SpellCasting";
import {ALL_SPELL_SLOT_TYPES, SpellSlotType} from "../02_models/023_Types/Spells/SpellSlotTypes";
import {SpellSlot} from "../02_models/022_Classes/Spells/SpellSlot";
import {convertFileToBase64} from "../07_services/Util";

export class CharacterSheetViewModel {
    private _character: Character | null = null;
    private _onUpdateListeners: ((char: Character | null) => void)[] = [];

    get character(): Character | null {
        return this._character;
    }

    public createNewCharacter(): void {
        const rawCharacter = new Character();

        let attributes = {} as Record<AttributeType, IAttribute>;
        ALL_ATTRIBUTE_TYPES.forEach((type) => {
            if (type === "NONE") return;

            let attribute = new Attribute();
            attribute.type = type;
            attributes[type] = attribute;
        })
        rawCharacter.attributes = attributes;

        let info: CharacterInfo = new CharacterInfo();
        rawCharacter.info = info;

        let currencies = {} as Record<CurrencyType, ICharacterCurrency>;
        Object.entries(ALL_CURRENCY_TYPES).forEach(([type, color]) => {
            let currency = new CharacterCurrency();
            currency.name = type as CurrencyType;
            currencies[type as CurrencyType] = currency;
        })
        rawCharacter.currency = currencies;

        let proficiencies = {} as Record<string, IProficiency>;
        Object.entries(ALL_PROFICIENCY_TYPES).forEach(([type, group]) => {
            Object.entries(group).forEach(([name, attribute]) => {
                let proficiency = new Proficiency();
                proficiency.name = name;
                proficiency.type = type as ProficiencyType;
                proficiency.mod_type = attribute as AttributeType;
                proficiencies[name] = proficiency;
            })
        })
        rawCharacter.proficiencies = proficiencies;

        let spell_Casting: SpellCasting = new SpellCasting();
        Object.entries(ALL_SPELL_SLOT_TYPES).forEach(([level, max]) => {
            let spell_Slot = new SpellSlot();
            let level_Number = Number(level) as SpellSlotType;
            spell_Slot.level = level_Number;
            spell_Slot.max = max;
            spell_Casting.spell_slots[level_Number] = spell_Slot;
        })
        rawCharacter.spell_casting = spell_Casting;

        let status = {} as Record<StatusType, ICharacterStatus>;
        ALL_STATUS_TYPES.forEach((type) => {
            let stat = new CharacterStatus();
            stat.type = type;
            status[type] = stat;
        })
        rawCharacter.status = status;

        this._character = this.processCalculations(rawCharacter);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public async importCharacterFromFile(file: File): Promise<void> {
        try {
            const jsonString = await file.text();

            const rawCharacter = await importFromJson(jsonString);

            this._character = this.processCalculations(rawCharacter);

            this.notifyListeners();
        }
        catch (error) {
            console.error("Error importing character:", error);
        }
    }

    private processCalculations(character: Character): Character {
        const proficiencyBonus = calculateProficiencyBonus(character.info.level);

        Object.entries(character.attributes).forEach(([key, attribute]) => {
            attribute.save_mod = attribute.mod + (attribute.isSave ? proficiencyBonus : 0);
        })

        if(character.status["Initiative"])
            character.status["Initiative"].base = character.attributes["DEX"].mod;

        let spell_mod_type = character.spell_casting.spell_mod_type;
        character.spell_casting.spell_mod = character.attributes[spell_mod_type].mod;
        character.spell_casting.proficiency_bonus = proficiencyBonus;
        character.spell_casting.con_save = character.attributes["CON"].save_mod;

        (Object.entries(ALL_PROFICIENCY_TYPES) as [AnyProficiencyType, typeof ALL_PROFICIENCY_TYPES[AnyProficiencyType]][]).forEach(
            ([proficiencyType, proficiencyTypeGroup]) => {
                Object.entries(proficiencyTypeGroup).forEach(([proficiency, mod_type]) => {
                    let prof: Proficiency = new Proficiency(
                        mod_type as AttributeType,
                        proficiency,
                        0,
                        proficiencyType
                    );

                    if(character.proficiencies[proficiency]){
                        prof.proficient = character.proficiencies[proficiency].proficient;
                    }

                    let attributeMod = (prof.mod_type != "NONE" && prof.mod_type) ? character.attributes[prof.mod_type].mod : 0;
                    prof.mod = attributeMod + (prof.proficient * proficiencyBonus);

                    character.proficiencies[prof.name] = prof;
                });
            }
        );

        let proficientWeaponArray: string[] = [];
        Object.entries(character.proficiencies).forEach(([key, proficiency]) => {
            if(proficiency.type === 'Weapons') {
                proficientWeaponArray.push(proficiency.name)
            }
        })

        Object.entries(character.weapons).forEach(([key, weapon]) => {
            weapon.proficient = proficientWeaponArray.includes(weapon.type);
            weapon.proficiency_bonus = weapon.proficient ? proficiencyBonus : 0;
            weapon.mod = character.attributes[weapon.mod_type].mod;
        })

        let prof_bonus = 0;

        character.proficiency_bonus = proficiencyBonus;

        if (character.proficiencies["perception"]){
            prof_bonus = character.proficiencies["perception"].proficient ? character.proficiencies["perception"].mod : 0;
        }

        character.passive_perception = 10 + prof_bonus;

        character.status["Current-HP"].post_total_extra = ` / ${character.status["Max-HP"].total}${character.status["Current-HP"].effect > 0 ? ` + <span class="icon is-small m-2"><i class="fas fa-shield-halved"></i></span> ${character.status["Current-HP"].effect}` : ""}`;
        character.status["Current-HP"].color = character.status["Current-HP"].effect > 0 ? "is-info" : "is-dark";

        character.status["Initiative"].read_only_base = true;
        character.status["Initiative"].color = character.status["Initiative"].total == 0 ? "is-dark" : character.status["Initiative"].total > 0 ? "is-success" : "is-danger";
        character.status["Initiative"].pre_total_extra = character.status["Initiative"].total > 0 ? "+" : "";

        return character;
    }

    public subscribe(listener: (char: Character | null) => void): void {
        this._onUpdateListeners.push(listener);
    }

    private notifyListeners(): void {
        this._onUpdateListeners.forEach((listener) => listener(this._character));
    }

    public handleStatusInputBaseChange(targetType: StatusType, newStatusBase: number): void {
        if (!this._character) return;

        if (!this._character.status[targetType]) {
            console.warn(`Status ${targetType} not in character model.`);
            return;
        }

        if(targetType === "Current-HP") {
            newStatusBase = newStatusBase > this._character.status["Max-HP"].total ? this._character.status["Max-HP"].total : newStatusBase;
        }

        this._character.status[targetType].base = newStatusBase;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleStatusInputEffectChange(targetType: StatusType, newStatusEffect: number): void {
        if (!this._character) return;

        if (!this._character.status[targetType]) {
            console.warn(`Status ${targetType} not in character model.`);
            return;
        }

        this._character.status[targetType].effect = newStatusEffect;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleAttributeInputChange(targetType: AttributeType, newAttributeEffect: number): void {
        if (!this._character) return;

        if (!this._character.attributes[targetType]) {
            console.warn(`Attribute ${targetType} not in character model.`);
            return;
        }

        this._character.attributes[targetType].effect = newAttributeEffect;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleAttributeInputBaseChange(targetType: AttributeType, newAttributeBase: number): void {
        if (!this._character) return;

        if (!this._character.attributes[targetType]) {
            console.warn(`Attribute ${targetType} not in character model.`);
            return;
        }

        this._character.attributes[targetType].base = newAttributeBase;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleAttributeSaveCheckboxChange(targetType: AttributeType, newSaveState: boolean): void {
        if (!this._character) return;

        if (!this._character.attributes[targetType]) {
            console.warn(`Attribute ${targetType} not in character model.`);
            return;
        }

        this._character.attributes[targetType].isSave = newSaveState;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleProficiencyChange(proficiencyKey: string, newProficiencyLevel: number): void {
        if (!this._character) return;

        if (!this._character.proficiencies[proficiencyKey]) {
            console.warn(`Proficiency ${proficiencyKey} not in character model.`);
            return;
        }

        this._character.proficiencies[proficiencyKey].proficient = newProficiencyLevel;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleDeathSaveFailureChange(targetID: number, checked: boolean): void {
        if (!this._character) return;

        switch (targetID) {
            case 1:
                if (checked) {
                    this._character.death_save_failure = 1;
                }
                else {
                    this._character.death_save_failure = 0;
                }
                break;
            case 2:
                if (checked) {
                    this._character.death_save_failure = 2;
                }
                else {
                    this._character.death_save_failure = 1;
                }
                break;
            case 3:
                if (checked) {
                    this._character.death_save_failure = 3;
                }
                else {
                    this._character.death_save_failure = 2;
                }
                break;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleDeathSaveSuccessChange(targetID: number, checked: boolean): void {
        if (!this._character) return;

        switch (targetID) {
            case 1:
                if(checked) {
                    this._character.death_save_success = 1;
                }
                else {
                    this._character.death_save_success = 0;
                }
                break;
            case 2:
                if(checked) {
                    this._character.death_save_success = 2;
                }
                else {
                    this._character.death_save_success = 1;
                }
                break;
            case 3:
                if(checked) {
                    this._character.death_save_success = 3;
                }
                else {
                    this._character.death_save_success = 2;
                }
                break;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleMaximumHitDieChange(value: string) {
        if (!this._character) return;

        this._character.maximum_hit_die = value;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleCurrentHitDieChange(value: string) {
        if (!this._character) return;

        this._character.current_hit_die = value;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    handleInfoInput(
        id: string,
        value: string | boolean | File
    ) {
        if (!this._character) return;
        switch (id) {
            case "info-level-input":
                const parsedLevel = parseInt(value.toString(), 10);

                if (!isNaN(parsedLevel)) {
                    this._character.info.level = parsedLevel <= 0 ? 1 : parsedLevel;
                }
                break;

            case "info-background-input":
                this._character.info.background = value.toString();
                break;

            case "info-species-input":
                this._character.info.species = value.toString();
                break;

            case "info-name-input":
                this._character.info.name = value.toString();
                break;

            case "info-class-input":
                this._character.info.class = value.toString();
                break;

            case "info-alignment-input":
                this._character.info.alignment = value.toString();
                break;

            case "info-quick-notes-textarea":
                this._character.info.quick_notes = value.toString();
                break;

            case "info-active-effects-textarea":
                this._character.info.active_effects = value.toString();
                break;

            case "image-import-input":
                if (!(value instanceof File)) break;
                convertFileToBase64(value)
                    .then((base64String) => {
                        if(!this._character) return;
                        this._character.info.character_appearance = base64String;
                        this._character = this.processCalculations(this._character);
                        this.saveCharacterToCache();
                        this.notifyListeners();
                    })
                    .catch((err) => {
                        console.error("Error importing file: ", err);
                    });
                return;

            case "info-inspiration-checkbox":
                this._character.inspiration = !this._character.inspiration;
                break;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    private saveCharacterToCache(): void {
        try {
            const characterJson = JSON.stringify(this._character);
            localStorage.setItem("saddas_character_sheet_cache", characterJson);
        } catch (error) {
            console.error("Error Saving Character At LocalStorage Cache:", error);
        }
    }

    private downloadCharacterAsFile(): void {
        try {
            const characterJson = JSON.stringify(this._character, null, 2);
            const blob = new Blob([characterJson], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${this._character?.info.name || "character"}_sheet.json`;
            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error Downloading Character File:", error);
        }
    }

    public loadCharacterFromCache(): void {
        const cachedData = localStorage.getItem("saddas_character_sheet_cache");

        if (cachedData) {
            try {
                const rawData = JSON.parse(cachedData);

                const instantiatedCharacter = new Character(rawData);

                this._character = this.processCalculations(instantiatedCharacter);

                this.notifyListeners();

            } catch (error) {
                console.error("Cache data was corrupted. Creating a new character instead.", error);
                this.createNewCharacter();
            }
        } else {
            this.createNewCharacter();
        }
    }

    public handleMenuClick(id: string, file: File | null) {
        switch(id) {
            case 'import-character-input':
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        const jsonText = e.target?.result as string;

                        const rawData = JSON.parse(jsonText);

                        const instantiatedCharacter = new Character(rawData);

                        this._character = this.processCalculations(instantiatedCharacter);

                        this.notifyListeners();

                        this.saveCharacterToCache();

                    } catch (error) {
                        console.error("Error importing character file:", error);
                        alert(error instanceof Error ? error.message : "An unknown error occurred during import.");
                    }
                }
                if(!file) return;
                reader.readAsText(file);
                break;

            case 'export-character-button':
                this.downloadCharacterAsFile();
                break;

            case 'create-character-button':
                localStorage.clear();
                this.createNewCharacter();
                break;
        }

    }
}