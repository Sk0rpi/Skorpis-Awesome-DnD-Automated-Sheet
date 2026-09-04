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
import {calculateSizeByHeight, convertFileToBase64, isNumeric} from "../07_services/Util";
import {WeaponPropertyType} from "../02_models/023_Types/Weapons/WeaponPropertyTypes";
import {WeaponType} from "../02_models/023_Types/Proficiencies/WeaponTypes";
import {Weapon} from "../02_models/022_Classes/Weapons/Weapon";
import {Spell} from "../02_models/022_Classes/Spells/Spell";
import {Entity} from "../02_models/022_Classes/Entities/Entity";

export class CharacterSheetViewModel {
    private _character: Character | null = null;
    private _onUpdateListeners: ((char: Character | null) => void)[] = [];
    public tempProperties: WeaponPropertyType[] = [];

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

        Object.entries(character.weapons).forEach(([key, weapon]) => {
            weapon.mod = character.attributes[weapon.mod_type].mod;
            if (!character.proficiencies[weapon.type]) return;
            weapon.proficient = character.proficiencies[weapon.type].proficient > 0;
            weapon.proficiency_bonus = character.proficiencies[weapon.type].proficient * proficiencyBonus;
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

        character.notes.size = calculateSizeByHeight(character.notes.height);

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

        if(targetType === "Max-HP") {
            this._character.status["Current-HP"].base = newStatusBase < this._character.status["Current-HP"].base ? newStatusBase : this._character.status["Current-HP"].base;
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

            case "info-appearance-button":
                this._character.info.character_appearance = "";
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

    public handleNoteInput(
        id: string,
        value: string
    ) {
        if(!this._character) return;
        let promisedNumber = value.split(" ")[0];

        switch (id) {
            case 'notes-height-input':
                if(!isNumeric(promisedNumber)) break;
                this._character.notes.height = Number(promisedNumber);
                break;
            case 'notes-age-input':
                if(!isNumeric(promisedNumber)) break;
                this._character.notes.age = Number(promisedNumber);
                break;
            case 'notes-weight-input':
                if(!isNumeric(promisedNumber)) break;
                this._character.notes.weight = Number(promisedNumber);
                break;
            case 'notes-equipment-textarea':
                this._character.notes.equipment = value;
                break;
            case 'notes-features-and-abilities-textarea':
                this._character.notes.features = value;
                break;
            case 'notes-notes-textarea':
                this._character.notes.notes = value;
                break;
            case 'notes-ideals-textarea':
                this._character.notes.ideals = value;
                break;
            case 'notes-bonds-textarea':
                this._character.notes.bonds = value;
                break;
            case 'notes-flaws-textarea':
                this._character.notes.flaws = value;
                break;
            case 'notes-allies-textarea':
                this._character.notes.allies = value;
                break;
        }

        if(id.includes("notes-inventory-textarea")) {
            let arrayIDRaw = id.split("-").at(-1);
            let arrayID = Number(arrayIDRaw);
            this._character.notes.inventory[arrayID] = value;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleSpellCastingEvent(
        id: string,
        val: string
    ) {
        if(!this._character) return;
        switch(id) {
            case "spell-casting-mod-type-input":
                this._character.spell_casting.spell_mod_type = val as AttributeType;
                break;
            case "spell-casting-concentrating-checkbox":
                this._character.spell_casting.concentrating = !this._character.spell_casting.concentrating;
                break;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleNewWeapon(
        name: string,
        type: WeaponType,
        mod_type: AttributeType,
        effect: string,
        enhancement: string,
        damage_dice: string
    ) {
        if(!this._character) return;

        let effectNum = isNumeric(effect) ? Number(effect): 0;
        let enhancementNum = isNumeric(enhancement) ? Number(enhancement) : 0;
        let namePlaceholder = name === "" ? "empty" : name;

        while(this._character.weapons[namePlaceholder]){
            if(!namePlaceholder.includes("clone")) {
                namePlaceholder += " clone";
                continue;
            }

            if(!namePlaceholder.includes("please")) {
                namePlaceholder += " please";
                continue;
            }

            if(!namePlaceholder.includes("get")) {
                namePlaceholder += " get";
                continue;
            }

            if(!namePlaceholder.includes("creative")) {
                namePlaceholder += " creative";
                continue;
            }

            namePlaceholder = "The Codewriter's Fury";
            damage_dice = "";
            effectNum = -100;
            enhancementNum = -100;
            break;
        }

        let properties: Record<string, WeaponPropertyType> = {}
        this.tempProperties.forEach((property) => {
            properties[property] = property;
        })

        let weapon = new Weapon({
            name: namePlaceholder,
            damage_dice,
            effect: effectNum,
            enhancement: enhancementNum,
            mod_type,
            properties,
            type
        });

        this._character.weapons[namePlaceholder] = weapon;

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleAddNewTempProperty(
        id: string,
        val: string
    ) {
        if (!this._character) return;
        this.tempProperties.push(val as WeaponPropertyType);
        this.notifyListeners();
    }

    public handleRemoveProperty(
        id: string
    ) {
        if (!this._character) return;
        let val = id.split("-").at(-1) as WeaponPropertyType;

        if (id.includes("temp")) {
            this.tempProperties = this.tempProperties.filter(property => property !== val);

            this.notifyListeners();

            return;
        }

        let name = id.split("-").at(-2) as string;

        delete this._character.weapons[name].properties[val];

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    handleWeaponInput(
        id: string,
        val: string
    ) {
        if(!this._character) return;

        const idType = id.replace(/-[^-]+$/, "");
        const weaponName = id.split("-").at(-1);

        if(!weaponName) return;

        switch(idType) {
            case "weapons-name-input":
                this._character.weapons[weaponName].name = val;
                break;

            case "weapons-type-input":
                this._character.weapons[weaponName].type = val as WeaponType;
                break;

            case "weapons-mod-type-input":
                this._character.weapons[weaponName].mod_type = val as AttributeType;
                break;

            case "weapons-effect-input":
                let newEffect = isNumeric(val) ? Number(val) : this._character.weapons[weaponName].effect;
                this._character.weapons[weaponName].effect = newEffect;
                break;

            case "weapons-enhancement-input":
                let newEnhancement = isNumeric(val) ? Number(val) : this._character.weapons[weaponName].enhancement;
                this._character.weapons[weaponName].enhancement = newEnhancement;
                break;

            case "weapons-damage-dice-input":
                this._character.weapons[weaponName].damage_dice = val;
                break;

            case "weapons-add-property":
                this._character.weapons[weaponName].properties[val] = val as WeaponPropertyType;
                break;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleRemoveWeapon(id: string) {
        if(!this._character) return;

        let val = id.split("-").at(-1);

        delete this._character.weapons[val as string];

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleNewSpell(
        level: string,
        name: string,
        casting_time: string,
        range: string,
        concentration: boolean,
        verbal: boolean,
        somatic: boolean,
        material: boolean,
        notes: string
    ) {
        if (!this._character) return;

        let namePlaceholder = name === "" ? "empty spell" : name;

        while (this._character.spells[namePlaceholder]) {
            namePlaceholder += " clone";
        }

        let levelNum = isNumeric(level) ? Number(level) : 0;

        let spell = new Spell({
            level: levelNum,
            name: namePlaceholder,
            casting_time,
            range,
            concentration,
            verbal,
            somatic,
            material,
            notes
        });

        this._character.spells[namePlaceholder] = spell;

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }

    public handleSpellInput(
        id: string,
        val: string
    ) {
        if (!this._character) return;

        const idType = id.replace(/-[^-]+$/, "");
        const spellName = id.split("-").at(-1);

        if (!spellName || !this._character.spells[spellName]) return;

        switch (idType) {
            case "spells-level-input":
                val = val === "CT" ? "0" : val;
                let valNum = isNumeric(val) ? Number(val) : this._character.spells[spellName].level;
                this._character.spells[spellName].level = valNum;
                break;
            case "spells-name-input":
                this._character.spells[spellName].name = val;
                break;
            case "spells-casting-time-input":
                this._character.spells[spellName].casting_time = val;
                break;
            case "spells-range-input":
                this._character.spells[spellName].range = val;
                break;
            case "spells-notes-input":
                this._character.spells[spellName].notes = val;
                break;
        }

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }

    public handleRemoveSpell(id: string) {
        if (!this._character) return;

        let val = id.split("-").at(-1);

        if (val && this._character.spells[val]) {
            delete this._character.spells[val];
        }

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }

    public handleSpellCheckboxChange(id: string, checked: boolean) {
        if (!this._character) return;

        const idType = id.replace(/-[^-]+$/, "");
        const spellName = id.split("-").at(-1);

        if (!spellName || !this._character.spells[spellName]) return;

        switch (idType) {
            case "spells-conc-checkbox":
                this._character.spells[spellName].concentration = checked;
                break;
            case "spells-v-checkbox":
                this._character.spells[spellName].verbal = checked;
                break;
            case "spells-s-checkbox":
                this._character.spells[spellName].somatic = checked;
                break;
            case "spells-m-checkbox":
                this._character.spells[spellName].material = checked;
                break;
        }

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }

    public handleNewEntity(
        name: string,
        ac: string,
        hp_current: string,
        hp_max: string,
        capacity_current: string,
        capacity_max: string,
        notes: string,
        inventory: string,
        speed: string
    ) {
        if (!this._character) return;

        let namePlaceholder = name === "" ? "empty" : name;

        while (this._character.entities[namePlaceholder]) {
            namePlaceholder += " clone";
        }

        let entity = new Entity({
            ac: isNumeric(ac) ? Number(ac) : 0,
            current_capacity: isNumeric(capacity_current) ? Number(capacity_current) : 0,
            hp_max: isNumeric(hp_max) ? Number(hp_max) : 0,
            hp_current: isNumeric(hp_current) ? Number(hp_current) : 0,
            inventory: inventory,
            max_capacity: isNumeric(capacity_max) ? Number(capacity_max) : 0,
            name: namePlaceholder,
            notes: notes,
            speed: speed
        });

        this._character.entities[namePlaceholder] = entity;

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }

    public handleEntityInput(
        id: string,
        val: string
    ) {
        if (!this._character) return;

        const idSplit = id.split("-");
        const idType = idSplit[1];
        const entityName = id.split(`input-`).at(-1);

        if (!entityName || !this._character.entities[entityName]) return;

        switch (idType) {
            case "name":
                this._character.entities[entityName].name = val.replaceAll(`"`, `„`);
                break;
            case "ac":
                this._character.entities[entityName].ac = isNumeric(val) ? Number(val) : this._character.entities[entityName].ac;
                break;
            case "hp_current":
                let hpCurrent = isNumeric(val) ? Number(val) : this._character.entities[entityName].hp_current;
                this._character.entities[entityName].hp_current = hpCurrent > this._character.entities[entityName].hp_current ? this._character.entities[entityName].hp_max : hpCurrent ;
                break;
            case "hp_max":
                this._character.entities[entityName].hp_max = isNumeric(val) ? Number(val) : this._character.entities[entityName].hp_max;
                this._character.entities[entityName].hp_current = this._character.entities[entityName].hp_current > this._character.entities[entityName].hp_max ? this._character.entities[entityName].hp_max : this._character.entities[entityName].hp_current;
                break;
            case "capacity_current":
                let capCurrent = isNumeric(val) ? Number(val) : this._character.entities[entityName].current_capacity;
                this._character.entities[entityName].current_capacity = capCurrent > this._character.entities[entityName].current_capacity ? this._character.entities[entityName].max_capacity : capCurrent ;
                break;
            case "capacity_max":
                this._character.entities[entityName].max_capacity = isNumeric(val) ? Number(val) : this._character.entities[entityName].max_capacity;
                this._character.entities[entityName].current_capacity = this._character.entities[entityName].current_capacity > this._character.entities[entityName].max_capacity ? this._character.entities[entityName].max_capacity : this._character.entities[entityName].current_capacity;
                break;
            case "notes":
                this._character.entities[entityName].notes = val;
                break;
            case "inventory":
                this._character.entities[entityName].inventory = val;
                break;
            case "speed":
                this._character.entities[entityName].speed = val;
                break;
        }

        this._character = this.processCalculations(this._character);

        this.saveCharacterToCache();

        this.notifyListeners();
    }

    public handleRemoveEntity(id: string) {
        if (!this._character) return;

        let val = id.split(`remove-`).at(-1);
        if(!val) return;

        if (val && this._character.entities[val]) {
            delete this._character.entities[val];
        }

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }

    public handleCurrencyEvents(
        id: string,
        val: string
    ) {
        if (!this._character) return;

        const entityName = id.split(`input-`).at(-1) as CurrencyType;

        if(!entityName) return;

        let valNum = isNumeric(val) ? Number(val) : this._character.currency[entityName].amount;

        this._character.currency[entityName].amount = valNum;

        this._character = this.processCalculations(this._character);
        this.saveCharacterToCache();
        this.notifyListeners();
    }
}