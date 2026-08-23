// ==========================================
// TYPES & INTERFACES
// ==========================================

export type AbilityType = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface CharacterInfos {
  name?: string;
  level?: string | number;
  background?: string;
  species?: string;
  class?: string;
  alignment?: string;
  [key: string]: string | number | undefined;
}

export interface CharacterStatus {
  'speed-base'?: number;
  'speed-mod'?: number;
  'ac-base'?: number;
  'ac-mod'?: number;
  'initiative-mod'?: number;
  'hp-max-base'?: number;
  'hp-max-mod'?: number;
  'hp-current'?: number;
  'hp-temp'?: number;
  'quick-notes'?: string;
  [key: string]: number | string | undefined;
}

export interface AbilityScores {
  STR?: number;
  DEX?: number;
  CON?: number;
  INT?: number;
  WIS?: number;
  CHA?: number;
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  [key: string]: number | undefined;
}

export interface CharacterCurrency {
  cp?: number;
  sp?: number;
  gp?: number;
  pp?: number;
  [key: string]: number | undefined;
}

export interface ProficiencyItem {
  proficient: number;
  'mod-type': AbilityType;
}

export interface WeaponItem {
  'weapon-type'?: string;
  mod?: string;
  effect?: number;
  enhancement?: number;
  'damage-die'?: string;
  [key: string]: any;
}

export interface CharacterProficiencies {
  bonus?: number;
  skills?: Record<string, ProficiencyItem>;
  languages?: Record<string, number>;
  armor?: Record<string, number>;
  weapons?: Record<string, number>;
  'saving-throws'?: Record<string, ProficiencyItem>;
  'artisans-tools'?: Record<string, ProficiencyItem>;
  'gaming-sets'?: Record<string, ProficiencyItem>;
  'musical-instruments'?: Record<string, ProficiencyItem>;
  vehicles?: Record<string, ProficiencyItem>;
}

export interface CharacterData {
  infos?: CharacterInfos;
  status?: CharacterStatus;
  attributes?: AbilityScores;
  currency?: CharacterCurrency;
  weapons?: Record<string, WeaponItem>;
  proficiencies?: CharacterProficiencies;
  saves?: Record<string, ProficiencyItem>;
  name?: string;
  class?: string;
  level?: string | number;
  equipment?: string;
  features?: string;
  inventory?: string;
  notes?: string;
  [key: string]: any;
}

// Standards
const DND_LANGUAGES = [
  'common', 'dwarvish', 'elvish', 'giant', 'gnomish', 'goblin', 'halfling', 'orc',
  'abyssal', 'celestial', 'draconic', 'deep-speech', 'infernal', 'primordial', 'sylvan', 'undercommon', 'cant', 'druidic'
];

const DND_ARMOR = ['light-armor', 'medium-armor', 'heavy-armor', 'shields'];
const DND_WEAPONS = ['simple-weapons', 'martial-weapons'];

// ==========================================
// GLOBALER SPEICHER & DOM-ELEMENTE
// ==========================================

let currentCharacterData: CharacterData | null = null;
let activeCategoryFilter: string = 'skills';

const fileInput = document.querySelector<HTMLInputElement>('#file-input');
const fileInputMain = document.querySelector<HTMLInputElement>('#file-input-main');
const fileName = document.querySelector<HTMLElement>('#file-name');
const newCharBtn = document.querySelector<HTMLButtonElement>('#new-character-btn');
const newCharBtnMain = document.querySelector<HTMLButtonElement>('#new-character-btn-main');

// UI-Sektionen für den Wechsel
const welcomeContainer = document.querySelector<HTMLElement>('#welcome-container');
const detailsSection = document.querySelector<HTMLElement>('#character-details-section');
const characterCardWrapperSub = document.querySelector<HTMLElement>('#character-card-wrapper-sub');

const infosContainer = document.querySelector<HTMLElement>('#infos-container');
const statusContainer = document.querySelector<HTMLElement>('#status-container');
const attributesContainer = document.querySelector<HTMLElement>('#attributes-container');
const proficienciesContainer = document.querySelector<HTMLElement>('#proficiencies-container');
const activeProfSummary = document.querySelector<HTMLElement>('#active-proficiencies-summary');
const profBonusTag = document.querySelector<HTMLElement>('#prof-bonus-tag');
const passivePerceptionTag = document.querySelector<HTMLElement>('#passive-perception-tag');
const searchInput = document.querySelector<HTMLInputElement>('#prof-search-input');
const exportBtn = document.querySelector<HTMLButtonElement>('#export-json-btn');

// ==========================================
// HILFSFUNKTIONEN & UI STATE
// ==========================================

function showCharacterInterface(): void {
  detailsSection?.classList.remove('is-hidden');
  characterCardWrapperSub?.classList.remove('is-hidden');

  setTimeout(() => {
    document.body.classList.add('has-character');
  }, 20);

  setTimeout(() => {
    const welcomeContainer = document.getElementById('welcome-container');
    welcomeContainer?.classList.add('is-completely-gone');
  }, 200); 
}

function cleanName(key: string): string {
  return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function calculateAbilityMod(score: number): number {
  return Math.floor((score - 10) / 2);
}

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function calculateProficiencyBonus(levelInput?: string | number): number {
  const parsedLevel = typeof levelInput === 'string' ? parseInt(levelInput, 10) : levelInput;
  const level = Math.max(1, Math.min(20, parsedLevel || 1));
  return Math.floor((level - 1) / 4) + 2;
}

function isArtificerToolExpertise(data: CharacterData, categoryKey: string): boolean {
  if (categoryKey !== 'artisans-tools') return false;
  
  const charClass = (data.infos?.class || data.class || '').toLowerCase();
  const levelInput = data.infos?.level ?? data.level ?? 1;
  const level = typeof levelInput === 'string' ? parseInt(levelInput, 10) : levelInput;

  return charClass === 'artificer' && level >= 6;
}

// ==========================================
// TEMPLATES
// ==========================================

function createInfosTemplate(infos: CharacterInfos): string {
  const classes = [
    'Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 
    'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 
    'Sorcerer', 'Warlock', 'Wizard'
  ];

  const currentClass = infos.class || '';

  const classOptions = classes.map(c => 
    `<option value="${c}" ${currentClass === c ? 'selected' : ''}>${c}</option>`
  ).join('');

  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'level', label: 'Level', type: 'number' },
    { key: 'species', label: 'Spezies', type: 'text' },
    { key: 'background', label: 'Hintergrund', type: 'text' },
    { key: 'alignment', label: 'Gesinnung', type: 'text' },
  ];

  let html = fields.map(f => `
    <div class="column is-6-tablet is-2-desktop">
      <div class="field">
        <label class="label mb-1">${f.label}</label>
        <div class="control">
          <input class="input info-input" 
                 type="${f.type}" 
                 data-key="${f.key}" 
                 value="${infos[f.key] ?? ''}" />
        </div>
      </div>
    </div>
  `).join('');

  html += `
    <div class="column is-6-tablet is-2-desktop">
      <div class="field">
        <label class="label mb-1">Klasse</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select class="info-input" data-key="class">
              <option value="" disabled ${!currentClass ? 'selected' : ''}>Wähle Klasse...</option>
              ${classOptions}
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  return html;
}

function createStatusBoxTemplate(
  title: string, 
  prefixKey: string, 
  baseVal: number, 
  modVal: number, 
  isReadOnlyBase: boolean = false
): string {
  const total = baseVal + modVal;
  let colorClass = '';
  if (total > 0) colorClass = 'has-text-success';
  if (total < 0) colorClass = 'has-text-danger';

  const readonlyStyle = isReadOnlyBase ? 'background-color: rgba(255, 255, 255, 0.04); cursor: not-allowed; opacity: 0.8;' : '';

  return `
    <div class="column is-6-tablet is-3-desktop">
      <div class="box has-text-centered p-3">
        <label class="label mb-1">${title}</label>
        
        <div class="columns is-mobile is-gapless mb-1">
          <div class="column"><span class="is-size-7 has-text-grey-light">Base</span></div>
          <div class="column is-2"></div>
          <div class="column"><span class="is-size-7 has-text-grey-light">Mod</span></div>
        </div>

        <div class="is-flex is-align-items-center is-justify-content-center mb-2" style="gap: 8px;">
          <div style="width: 42%;">
            <input class="input has-text-centered is-size-4 has-text-weight-bold status-input" 
                   type="number" 
                   data-key="${prefixKey}-base" 
                   value="${baseVal}" 
                   ${isReadOnlyBase ? 'readonly' : ''} 
                   style="${readonlyStyle}"
                   title="Base" />
          </div>
          <span class="is-size-5">+</span>
          <div style="width: 42%;">
            <input class="input has-text-centered is-size-4 has-text-weight-bold status-input" 
                   type="number" 
                   data-key="${prefixKey}-mod" 
                   value="${modVal}" 
                   title="Mod" />
          </div>
        </div>
        
        <div class="is-size-4 has-text-weight-bold my-1 ${colorClass}" id="status-total-${prefixKey}">
          ${total}
        </div>
      </div>
    </div>
  `;
}

function createHpAndNotesTemplate(hpMax: number, hpCurrent: number, hpTemp: number, quickNotes: string): string {
  const tempColorClass = hpTemp > 0 ? 'has-text-success' : '';

  return `
    <div class="column is-12-tablet is-6-desktop mt-2">
      <div class="box has-text-centered p-3" style="height: 100%;">
        <label class="label mb-1">Hit Points <span class="has-text-grey-light" style="font-weight: normal;">(Max: ${hpMax})</span></label>
        
        <div class="columns is-mobile is-gapless mb-1">
          <div class="column"><span class="is-size-7 has-text-grey-light">Current HP</span></div>
          <div class="column is-2"></div>
          <div class="column"><span class="is-size-7 has-text-grey-light">Temp HP</span></div>
        </div>

        <div class="is-flex is-align-items-center is-justify-content-center mb-2" style="gap: 12px;">
          <div style="width: 42%;">
            <input class="input has-text-centered is-size-4 has-text-weight-bold status-input" 
                   type="number" 
                   data-key="hp-current" 
                   value="${hpCurrent}" 
                   title="Current HP" />
          </div>
          <span class="is-size-4">+</span>
          <div style="width: 42%;">
            <input class="input has-text-centered is-size-4 has-text-weight-bold status-input ${tempColorClass}" 
                   type="number" 
                   data-key="hp-temp" 
                   value="${hpTemp}" 
                   title="Temp HP" />
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12-tablet is-6-desktop mt-2">
      <div class="box p-3" style="height: 100%;">
        <label class="label mb-1 is-size-7 has-text-weight-semibold">Quicknotes</label>
        <div class="control">
          <textarea class="textarea status-input" 
                    data-key="quick-notes" 
                    placeholder="Schnelle Notizen, Buffs, Zustände..." 
                    rows="3">${quickNotes}</textarea>
        </div>
      </div>
    </div>
  `;
}

function createAttributeBoxTemplate(abi: AbilityType, score: number, mod: number, isSaveProficient: boolean, saveVal: number): string {
  const lowerAbi = abi.toLowerCase();

  let modColorClass = '';
  if (mod > 0) modColorClass = 'has-text-success';
  if (mod < 0) modColorClass = 'has-text-danger';

  return `
    <div class="column is-6-tablet is-2-desktop">
      <div class="box has-text-centered p-3">
        <label class="label mb-1">${abi}</label>
        <div class="control mb-2">
          <input class="input has-text-centered is-size-4 has-text-weight-bold attr-input" 
                 type="number" 
                 id="char-${lowerAbi}" 
                 data-abi="${abi}" 
                 value="${score}" />
        </div>
        <div class="is-size-4 has-text-weight-bold my-1 ${modColorClass}" id="mod-${lowerAbi}">${formatMod(mod)}</div>
        <div class="is-size-7 pt-2 style-border-top">
          <label class="checkbox">
            <input type="checkbox" 
                   class="save-check" 
                   data-abi="${abi}" 
                   id="save-${lowerAbi}-check" 
                   ${isSaveProficient ? 'checked' : ''} />
            Save: <strong id="save-${lowerAbi}-val">${formatMod(saveVal)}</strong>
          </label>
        </div>
      </div>
    </div>
  `;
}

function createTableCardTemplate(title: string, rowsHtml: string, isSimpleToggle: boolean = false): string {
  if (isSimpleToggle) {
    return `
      <div class="column is-12">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title mb-0">${title}</p>
          </header>
          <div class="card-content p-4">
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px 16px;">
              ${rowsHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="column is-12">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title mb-0">${title}</p>
        </header>
        <div class="card-content p-0">
          <table class="table is-fullwidth is-striped is-hoverable mb-0">
            <thead>
              <tr>
                <th style="width: 180px;">Proficiency</th>
                <th>Name</th>
                <th style="width: 100px;">Attr.</th>
                <th class="has-text-right" style="width: 80px;">Mod</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function buildSimpleToggleCategory(
  title: string, 
  categoryKey: 'languages' | 'armor' | 'weapons', 
  defaultItems: string[], 
  dataObj: Record<string, number> | undefined, 
  search: string
): string | null {
  if (!dataObj) return null;

  let rowsHtml = '';
  let matchCount = 0;

  Object.entries(dataObj).forEach(([key, isKnown]) => {
    const readableName = cleanName(key);
    if (readableName.toLowerCase().includes(search)) {
      matchCount++;
      const checkedAttr = isKnown >= 1 ? 'checked' : '';

      rowsHtml += `
        <label class="checkbox is-flex align-items-center" style="gap: 8px;">
          <input type="checkbox" 
                 class="simple-toggle-check" 
                 data-cat="${categoryKey}" 
                 data-key="${key}" 
                 ${checkedAttr} />
          <span>${readableName}</span>
        </label>
      `;
    }
  });

  return matchCount > 0 ? createTableCardTemplate(title, rowsHtml, true) : null;
}

// ==========================================
// MODAL & NOTIZEN LOGIK
// ==========================================

let currentActiveNoteKey: string | null = null;

const noteModal = document.getElementById('note-modal');
const modalTitle = document.getElementById('modal-title');
const modalTextarea = document.getElementById('modal-textarea') as HTMLTextAreaElement;
const modalCloseBtn = document.getElementById('modal-x-close');
const modalBgClose = document.getElementById('modal-bg-close');
const modalSaveBtn = document.getElementById('modal-save-btn');

const noteConfig: Record<string, { key: string; title: string }> = {
    'btn-equipment': { key: 'equipment', title: 'Equipment' },
    'btn-features': { key: 'features', title: 'Features & Abilities' },
    'btn-inventory': { key: 'inventory', title: 'Inventory' },
    'btn-notes': { key: 'notes', title: 'Notes' }
};

const openNoteModal = (key: string, title: string) => {
    currentActiveNoteKey = key;
    if (modalTitle) modalTitle.textContent = title;
    if (modalTextarea && currentCharacterData) {
        modalTextarea.value = currentCharacterData[key] || '';
    }
    if (noteModal) noteModal.classList.add('is-active');
};

const closeNoteModal = () => {
    if (noteModal) noteModal.classList.remove('is-active');
    currentActiveNoteKey = null;
    if (modalTextarea) modalTextarea.value = '';
};

Object.keys(noteConfig).forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', () => {
            const config = noteConfig[btnId];
            openNoteModal(config.key, config.title);
        });
    }
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeNoteModal);
if (modalBgClose) modalBgClose.addEventListener('click', closeNoteModal);

if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
        if (currentActiveNoteKey && modalTextarea && currentCharacterData) {
            currentCharacterData[currentActiveNoteKey] = modalTextarea.value;
        }
        closeNoteModal();
    });
}

// ==========================================
// WAFFEN-SEKTION RENDERING
// ==========================================

function createWeaponDashboard(data: CharacterData): void {
  const weaponContainer = document.querySelector<HTMLElement>('#weapons-dashboard-container');
  if (!weaponContainer) return;

  const weapons = data.weapons || {};
  const currentLevel = data.infos?.level ?? data.level ?? 1;
  const profBonus = calculateProficiencyBonus(currentLevel);
  const attrs = data.attributes || {};
  const weaponProficiencies = data.proficiencies?.weapons || {};

  const attributesList: AbilityType[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  const weaponTypes = ['Simple', 'Martial', 'Exotic', 'Natural'];

  let rowsHtml = '';

  Object.entries(weapons).forEach(([weaponName, weaponData]) => {
    const weaponType = weaponData['weapon-type'] || 'Simple';
    const mod = (weaponData['mod'] || 'STR').toUpperCase() as AbilityType;
    const effect = weaponData['effect'] ?? 0;
    const enhancement = weaponData['enhancement'] ?? 0;
    const damageDie = weaponData['damage-die'] || '1d6';

    const profKey = `${weaponType.toLowerCase()}-weapons`;
    const isProficient = (weaponProficiencies[profKey] ?? 0) >= 1;

    const lowerMod = mod.toLowerCase();
    const baseStat = attrs[mod] ?? attrs[lowerMod] ?? 10;
    const attrMod = calculateAbilityMod(baseStat);
    
    const hitTotal = effect + enhancement + (isProficient ? profBonus : 0) + attrMod;
    const damageBonusTotal = effect + enhancement + attrMod;

    const typeOptions = weaponTypes.map(t => 
      `<option value="${t}" ${weaponType === t ? 'selected' : ''}>${t}</option>`
    ).join('');

    const modOptions = attributesList.map(a => 
      `<option value="${a}" ${mod === a ? 'selected' : ''}>${a}</option>`
    ).join('');

    const damageColorClass = damageBonusTotal > 0 ? 'has-text-success' : damageBonusTotal < 0 ? 'has-text-danger' : '';

    rowsHtml += `
      <tr data-weapon="${weaponName}">
        <td>
          <input class="input weapon-name-input has-text-weight-bold" type="text" data-old-name="${weaponName}" value="${weaponName}" style="max-width: 280px;" />
        </td>
        <td>
          <div class="select is-fullwidth">
            <select class="weapon-input" data-weapon="${weaponName}" data-key="weapon-type">
              ${typeOptions}
            </select>
          </div>
        </td>
        <td>
          <div class="select is-fullwidth">
            <select class="weapon-input" data-weapon="${weaponName}" data-key="mod">
              ${modOptions}
            </select>
          </div>
        </td>
        <td>
          <input class="input has-text-centered has-text-weight-bold weapon-input" type="number" data-weapon="${weaponName}" data-key="effect" value="${effect}" style="width: 70px;" />
        </td>
        <td>
          <input class="input has-text-centered has-text-weight-bold weapon-input" type="number" data-weapon="${weaponName}" data-key="enhancement" value="${enhancement}" style="width: 70px;" />
        </td>
        <td class="has-text-centered" style="vertical-align: middle;">
          <input type="checkbox" disabled ${isProficient ? 'checked' : ''} title="Basierend auf Waffen-Proficiency" style="transform: scale(1.3);" />
        </td>
        <td class="has-text-centered has-text-weight-bold is-size-5 ${hitTotal >= 0 ? 'has-text-success' : 'has-text-danger'}">
          ${formatMod(hitTotal)}
        </td>
        <td class="has-text-centered">
          <input class="input has-text-centered has-text-weight-bold weapon-input" type="text" data-weapon="${weaponName}" data-key="damage-die" value="${damageDie}" style="width: 90px;" />
        </td>
        <td class="has-text-centered has-text-weight-bold is-size-5 ${damageColorClass}">
          ${formatMod(damageBonusTotal)}
        </td>
        <td class="has-text-centered">
          <button class="button is-danger is-dark remove-weapon-btn" data-weapon="${weaponName}" title="Waffe löschen" type="button">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </td>
      </tr>
    `;
  });

  rowsHtml += `
    <tr class="has-background-dark" id="new-weapon-row">
      <td>
        <input class="input has-text-weight-bold" type="text" id="new-weapon-name" placeholder="Neue Waffe..." style="max-width: 280px;" />
      </td>
      <td>
        <div class="select is-fullwidth">
          <select id="new-weapon-type">
            ${weaponTypes.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>
      </td>
      <td>
        <div class="select is-fullwidth">
          <select id="new-weapon-mod">
            ${attributesList.map(a => `<option value="${a}" ${a === 'STR' ? 'selected' : ''}>${a}</option>`).join('')}
          </select>
        </div>
      </td>
      <td>
        <input class="input has-text-centered" type="number" id="new-weapon-effect" value="0" style="width: 70px;" />
      </td>
      <td>
        <input class="input has-text-centered" type="number" id="new-weapon-enhancement" value="0" style="width: 70px;" />
      </td>
      <td class="has-text-centered" style="vertical-align: middle;">-</td>
      <td class="has-text-centered">-</td>
      <td class="has-text-centered">
        <input class="input has-text-centered" type="text" id="new-weapon-damage" value="1d6" style="width: 90px;" />
      </td>
      <td class="has-text-centered">-</td>
      <td class="has-text-centered">
        <button class="button is-success" id="add-weapon-btn" title="Waffe hinzufügen" type="button">
          <i class="fa-solid fa-check"></i>
        </button>
      </td>
    </tr>
  `;

  weaponContainer.innerHTML = `
    <div class="column is-12">
      <div class="card">
        <header class="header card-header">
          <p class="card-header-title mb-0">Waffen & Angriffe</p>
        </header>
        <div class="card-content p-0">
          <table class="table is-fullwidth is-striped is-hoverable mb-0">
            <thead>
              <tr>
                <th style="width: 300px;">Weapon</th>
                <th style="width: 130px;">Weapon Type</th>
                <th style="width: 110px;">Mod</th>
                <th style="width: 70px;">Effect</th>
                <th style="width: 80px;">Enhance</th>
                <th style="width: 70px;" class="has-text-centered">Prof.</th>
                <th style="width: 70px;" class="has-text-centered">Hit</th>
                <th style="width: 90px;" class="has-text-centered">Damage</th>
                <th style="width: 90px;" class="has-text-centered">Dmg. Bonus</th>
                <th style="width: 60px;" class="has-text-centered"></th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// ZUSAMMENFASSUNG: ACTIVE PROFICIENCIES
// ==========================================

function renderActiveProficienciesSummary(data: CharacterData): void {
  if (!activeProfSummary || !data.proficiencies) return;

  const prof = data.proficiencies;
  const currentLevel = data.infos?.level ?? data.level ?? 1;
  const bonus = calculateProficiencyBonus(currentLevel);
  const attrs = data.attributes || {};

  interface ActiveItem {
    name: string;
    details?: string;
    expertise?: boolean;
    hint?: string;
  }

  const allCategories: { key: keyof CharacterProficiencies; title: string; isSimple?: boolean; isSkill?: boolean }[] = [
    { key: 'skills', title: 'Skills', isSkill: true },
    { key: 'artisans-tools', title: "Artisan's Tools" },
    { key: 'gaming-sets', title: 'Gaming Sets' },
    { key: 'musical-instruments', title: 'Musical Instruments' },
    { key: 'vehicles', title: 'Vehicles' },
    { key: 'languages', title: 'Languages', isSimple: true },
    { key: 'armor', title: 'Armor', isSimple: true },
    { key: 'weapons', title: 'Weapons', isSimple: true }
  ];

  const categories: { title: string; items: ActiveItem[] }[] = [];

  allCategories.forEach(cat => {
    const activeItems: ActiveItem[] = [];
    const isArtificerTools = isArtificerToolExpertise(data, cat.key);

    if (cat.isSimple) {
      const dataObj = prof[cat.key as 'languages' | 'armor' | 'weapons'];
      if (dataObj) {
        Object.entries(dataObj).forEach(([key, isKnown]) => {
          if (isKnown >= 1) {
            activeItems.push({ name: cleanName(key) });
          }
        });
      }
    } else {
      const categoryData = prof[cat.key] as Record<string, any> | undefined;
      if (categoryData) {
        Object.entries(categoryData).forEach(([key, item]) => {
          const profVal = cat.isSkill ? (item?.proficient ?? 0) : (typeof item === 'number' ? item : (item?.proficient ?? 0));
          const hasBaseProf = profVal >= 1;
          const effectiveProficient = (isArtificerTools && hasBaseProf) ? 2 : profVal;

          const isActive = cat.isSkill ? effectiveProficient >= 1 : effectiveProficient >= 1;

          if (isActive) {
            const modType = ((item?.['mod-type']) || 'INT').toUpperCase() as AbilityType;
            const lowerModType = modType.toLowerCase();
            const baseStat = attrs[modType] ?? attrs[lowerModType] ?? 10;
            
            const finalMod = calculateAbilityMod(baseStat) + (effectiveProficient * bonus);

            activeItems.push({
              name: cleanName(key),
              details: cat.isSkill ? formatMod(finalMod) : undefined,
              expertise: cat.isSkill && effectiveProficient === 2,
              hint: (isArtificerTools && profVal === 1) ? 'x2 Artificer (lvl. 6) - Tool Expertise' : undefined
            });
          }
        });
      }
    }

    categories.push({ title: cat.title, items: activeItems });
  });

  activeProfSummary.innerHTML = `
    <div class="column is-12">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        ${categories.map(cat => `
          <div class="box p-3 h-100 is-flex is-flex-direction-column">
            <p class="has-text-weight-bold is-size-6 mb-2 border-bottom pb-1">${cat.title}</p>
            <div class="tags is-flex is-flex-direction-column align-items-flex-start" style="flex-grow: 1;">
              ${cat.items.length > 0 ? cat.items.map(item => `
                <span class="tag ${item.expertise ? 'is-info' : 'is-success'} is-dark ${item.expertise ? 'has-text-success-dark' : 'has-text-info-dark'} has-text-weight-bold mb-1 w-100 is-justify-content-space-between">
                  <span>${item.name} ${item.hint ? `<span class="has-text-grey is-size-7 ml-1">(${item.hint})</span>` : ''}</span>
                  ${item.details ? `<span class="ml-1 has-text-dark">(${item.details})</span>` : ''}
                </span>
              `).join('') : '<span class="has-text-grey-light is-italic is-size-7">Keine</span>'}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// RENDERING DER BEREICHE
// ==========================================

function renderInfos(data: CharacterData): void {
  if (!infosContainer) return;
  const infos = data.infos || {
    name: data.name || '',
    level: data.level || 1,
    class: data.class || ''
  };
  infosContainer.innerHTML = createInfosTemplate(infos);
}

function renderStatus(data: CharacterData): void {
  if (!statusContainer) return;
  const status = data.status || {};
  const attrs = data.attributes || {};

  const dexScore = attrs.DEX ?? attrs.dex ?? 10;
  const dexMod = calculateAbilityMod(dexScore);

  const speedBase = status['speed-base'] ?? 30;
  const speedMod = status['speed-mod'] ?? 0;

  const acBase = status['ac-base'] ?? 10;
  const acMod = status['ac-mod'] ?? 0;

  // Initiative Base zieht sich den DEX-Modifikator
  const initBase = dexMod;
  const initMod = status['initiative-mod'] ?? 0;

  const hpMaxBase = status['hp-max-base'] ?? 10;
  const hpMaxMod = status['hp-max-mod'] ?? 0;
  const hpMaxTotal = hpMaxBase + hpMaxMod;

  const hpCurrent = status['hp-current'] ?? hpMaxTotal;
  const hpTemp = status['hp-temp'] ?? 0;
  const quickNotes = status['quick-notes'] ?? '';

  statusContainer.innerHTML = `
    ${createStatusBoxTemplate('AC', 'ac', acBase, acMod)}
    ${createStatusBoxTemplate('Speed', 'speed', speedBase, speedMod)}
    ${createStatusBoxTemplate('Initiative', 'initiative', initBase, initMod, true)}
    ${createStatusBoxTemplate('HP Max', 'hp-max', hpMaxBase, hpMaxMod)}
    ${createHpAndNotesTemplate(hpMaxTotal, hpCurrent, hpTemp, quickNotes)}
  `;
}

function renderAttributesAndSaves(data: CharacterData): void {
  if (!attributesContainer) return;

  const attrs = data.attributes || {};
  const currentLevel = data.infos?.level ?? data.level ?? 1;
  const profBonus = calculateProficiencyBonus(currentLevel);
  const savesData = data.proficiencies?.['saving-throws'] || data.saves || {};

  const abilities: AbilityType[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  attributesContainer.innerHTML = '';

  abilities.forEach((abi) => {
    const lowerAbi = abi.toLowerCase();
    const score = attrs[abi] ?? attrs[lowerAbi] ?? 10;
    const mod = calculateAbilityMod(score);

    const saveItem = savesData[abi] || savesData[lowerAbi];
    const isSaveProficient = saveItem ? saveItem.proficient > 0 : false;
    const saveVal = mod + (isSaveProficient ? profBonus : 0);

    const boxHtml = createAttributeBoxTemplate(abi, score, mod, isSaveProficient, saveVal);
    attributesContainer.insertAdjacentHTML('beforeend', boxHtml);
  });
}

function buildProficienciesDashboard(data: CharacterData, filterText: string = ''): void {
  currentCharacterData = data;
  if (!data.proficiencies) {
    data.proficiencies = {};
  }

  const prof = data.proficiencies;
  const currentLevel = data.infos?.level ?? data.level ?? 1;
  const bonus = calculateProficiencyBonus(currentLevel);
  
  if (profBonusTag) profBonusTag.textContent = formatMod(bonus);

  if (passivePerceptionTag) {
    const wisScore = data.attributes?.WIS ?? data.attributes?.wis ?? 10;
    const wisMod = calculateAbilityMod(wisScore);
    const skillsData = data.proficiencies?.skills || {};
    const perceptionItem = skillsData['perception'] || skillsData['Perception'];
    const profLevel = perceptionItem ? perceptionItem.proficient : 0;
    const passivePerception = 10 + wisMod + (profLevel * bonus);
    passivePerceptionTag.textContent = passivePerception.toString();
  }

  const currency = data.currency || {};
  const cpInput = document.querySelector<HTMLInputElement>('#currency-cp-input');
  const spInput = document.querySelector<HTMLInputElement>('#currency-sp-input');
  const gpInput = document.querySelector<HTMLInputElement>('#currency-gp-input');
  const ppInput = document.querySelector<HTMLInputElement>('#currency-pp-input');

  if (cpInput) cpInput.value = (currency.cp ?? 0).toString();
  if (spInput) spInput.value = (currency.sp ?? 0).toString();
  if (gpInput) gpInput.value = (currency.gp ?? 0).toString();
  if (ppInput) ppInput.value = (currency.pp ?? 0).toString();

  if (proficienciesContainer) proficienciesContainer.innerHTML = '';

  const ensureCategory = (catKey: 'languages' | 'armor' | 'weapons', defaultList: string[]) => {
    if (!prof[catKey]) prof[catKey] = {};
    defaultList.forEach(item => {
      if (prof[catKey]![item] === undefined) prof[catKey]![item] = 0;
    });
  };

  ensureCategory('languages', DND_LANGUAGES);
  ensureCategory('armor', DND_ARMOR);
  ensureCategory('weapons', DND_WEAPONS);

  renderActiveProficienciesSummary(data);
  createWeaponDashboard(data);

  const attrs = data.attributes || {};
  const search = filterText.trim().toLowerCase();

  if (activeCategoryFilter === 'languages') {
    const html = buildSimpleToggleCategory('Languages', 'languages', DND_LANGUAGES, prof.languages, search);
    if (html && proficienciesContainer) proficienciesContainer.insertAdjacentHTML('beforeend', html);
    return;
  }
  if (activeCategoryFilter === 'armor') {
    const html = buildSimpleToggleCategory('Armor Proficiencies', 'armor', DND_ARMOR, prof.armor, search);
    if (html && proficienciesContainer) proficienciesContainer.insertAdjacentHTML('beforeend', html);
    return;
  }
  if (activeCategoryFilter === 'weapons') {
    const html = buildSimpleToggleCategory('Weapon Proficiencies', 'weapons', DND_WEAPONS, prof.weapons, search);
    if (html && proficienciesContainer) proficienciesContainer.insertAdjacentHTML('beforeend', html);
    return;
  }

  const categories: { jsonKey: keyof CharacterProficiencies; title: string; tabCat: string; isSkill?: boolean }[] = [
    { jsonKey: 'skills', title: 'Skills', tabCat: 'skills', isSkill: true },
    { jsonKey: 'artisans-tools', title: "Artisan's Tools", tabCat: 'artisans-tools', isSkill: false },
    { jsonKey: 'gaming-sets', title: 'Gaming Sets', tabCat: 'gaming-sets', isSkill: false },
    { jsonKey: 'musical-instruments', title: 'Musical Instruments', tabCat: 'musical-instruments', isSkill: false },
    { jsonKey: 'vehicles', title: 'Vehicles', tabCat: 'vehicles', isSkill: false }
  ];

  categories.forEach(cat => {
    if (activeCategoryFilter !== cat.tabCat) return;

    const categoryData = prof[cat.jsonKey] as Record<string, any> | undefined;
    const isArtificerTools = isArtificerToolExpertise(data, cat.jsonKey);

    if (categoryData && Object.keys(categoryData).length > 0) {
      let rowsHtml = '';
      let matchCount = 0;

      Object.entries(categoryData).forEach(([key, item]) => {
        const readableName = cleanName(key);
        
        const isSkillCategory = cat.isSkill;
        const profValue = isSkillCategory ? (item?.proficient ?? 0) : (typeof item === 'number' ? item : (item?.proficient ?? 0));
        const modType = ((isSkillCategory ? item?.['mod-type'] : item?.['mod-type']) || 'INT').toUpperCase() as AbilityType;

        const matches = readableName.toLowerCase().includes(search) || modType.toLowerCase().includes(search);

        if (matches) {
          matchCount++;
          const hasBaseProf = profValue >= 1;
          const showArtificerTag = isArtificerTools && hasBaseProf;
          const effectiveProficient = showArtificerTag ? 2 : profValue;

          const lowerModType = modType.toLowerCase();
          const baseStat = attrs[modType] ?? attrs[lowerModType] ?? 10;
          const finalMod = calculateAbilityMod(baseStat) + (effectiveProficient * bonus);
          
          let checkboxHtml = '';
          if (isSkillCategory) {
            checkboxHtml = `
              <label class="checkbox mr-2">
                <input type="checkbox" class="prof-checkbox-proficient" data-category="${cat.jsonKey}" data-key="${key}" ${profValue >= 1 ? 'checked' : ''}>
              </label>
              <label class="checkbox">
                <input type="checkbox" class="prof-checkbox-expertise" data-category="${cat.jsonKey}" data-key="${key}" ${profValue >= 2 ? 'checked' : ''}>
              </label>
            `;
          } else {
            checkboxHtml = `
              <label class="checkbox">
                <input type="checkbox" class="prof-checkbox-single" data-category="${cat.jsonKey}" data-key="${key}" ${profValue >= 1 ? 'checked' : ''}>
              </label>
            `;
          }

          rowsHtml += `
            <tr>
              <td style="vertical-align: middle; white-space: nowrap;">
                ${checkboxHtml}
              </td>
              <td class="has-text-weight-bold" style="vertical-align: middle;">
                ${readableName} 
                ${showArtificerTag ? '<span class="tag is-info is-light ml-2">Artificer Tool Exp.</span>' : ''}
              </td>
              <td style="vertical-align: middle;">${modType}</td>
              <td class="has-text-right has-text-weight-bold is-size-5 ${finalMod >= 0 ? 'has-text-success' : 'has-text-danger'}" style="vertical-align: middle;">
                ${formatMod(finalMod)}
              </td>
            </tr>
          `;
        }
      });

      if (matchCount > 0 && proficienciesContainer) {
        proficienciesContainer.insertAdjacentHTML('beforeend', createTableCardTemplate(cat.title, rowsHtml));
      }
    }
  });
}

// ==========================================
// EVENT LISTENERS & INITIALISIERUNG
// ==========================================

function updateWholeDashboard(data: CharacterData): void {
  renderInfos(data);
  renderStatus(data);
  renderAttributesAndSaves(data);
  buildProficienciesDashboard(data, searchInput?.value || '');
}

document.addEventListener('input', (e) => {
  const target = e.target as HTMLElement;
  
  if (target.classList.contains('info-input')) {
    const input = target as HTMLInputElement | HTMLSelectElement;
    const key = input.getAttribute('data-key');
    
    if (currentCharacterData) {
      if (!currentCharacterData.infos) {
        currentCharacterData.infos = {};
      }
      
      currentCharacterData.infos[key!] = input.value;
      
      if (key === 'level') {
        currentCharacterData.level = input.value;
        updateWholeDashboard(currentCharacterData);
      } else if (key === 'class') {
        currentCharacterData.class = input.value;
        updateWholeDashboard(currentCharacterData);
      }
    }
  }

  if (target.classList.contains('attr-input')) {
    const input = target as HTMLInputElement;
    const abi = input.getAttribute('data-abi');
    const val = parseInt(input.value, 10) || 0;

    if (currentCharacterData && abi) {
      if (!currentCharacterData.attributes) currentCharacterData.attributes = {};
      currentCharacterData.attributes[abi] = val;

      const mod = calculateAbilityMod(val);
      const lowerAbi = abi.toLowerCase();
      const modContainer = document.querySelector<HTMLElement>(`#mod-${lowerAbi}`);
      
      if (modContainer) {
        modContainer.textContent = formatMod(mod);
        modContainer.className = 'is-size-4 has-text-weight-bold my-1';
        if (mod > 0) modContainer.classList.add('has-text-success');
        if (mod < 0) modContainer.classList.add('has-text-danger');
      }

      if (abi === 'DEX') {
        const initBaseInput = document.querySelector<HTMLInputElement>('[data-key="initiative-base"]');
        const initModInput = document.querySelector<HTMLInputElement>('[data-key="initiative-mod"]');
        const initTotalContainer = document.querySelector<HTMLElement>('#status-total-initiative');
        
        if (initBaseInput) initBaseInput.value = mod.toString();
        if (initBaseInput && initModInput && initTotalContainer) {
          const initTotal = mod + (parseInt(initModInput.value, 10) || 0);
          initTotalContainer.textContent = initTotal.toString();
          initTotalContainer.className = 'is-size-4 has-text-weight-bold my-1';
          if (initTotal > 0) initTotalContainer.classList.add('has-text-success');
          if (initTotal < 0) initTotalContainer.classList.add('has-text-danger');
        }
      }

      const currentLevel = currentCharacterData.infos?.level ?? currentCharacterData.level ?? 1;
      const profBonus = calculateProficiencyBonus(currentLevel);
      const savesData = currentCharacterData.proficiencies?.['saving-throws'] || currentCharacterData.saves || {};
      const saveItem = savesData[abi] || savesData[lowerAbi];
      const isSaveProficient = saveItem ? saveItem.proficient > 0 : false;
      const saveVal = mod + (isSaveProficient ? profBonus : 0);

      const saveValContainer = document.querySelector<HTMLElement>(`#save-${lowerAbi}-val`);
      if (saveValContainer) {
        saveValContainer.textContent = formatMod(saveVal);
      }

      // === NEU HINZUFÜGEN, DAMIT SICH DIE SKILLS LIVE AKTUALISIEREN ===
      renderActiveProficienciesSummary(currentCharacterData);
      buildProficienciesDashboard(currentCharacterData, searchInput?.value || '');
      // ==============================================================

      renderActiveProficienciesSummary(currentCharacterData);
      createWeaponDashboard(currentCharacterData);
    }
  }

  if (target.classList.contains('status-input') || target.tagName.toLowerCase() === 'textarea') {
    const input = target as HTMLInputElement | HTMLTextAreaElement;
    const key = input.getAttribute('data-key');
    
    if (currentCharacterData) {
      if (!currentCharacterData.status) {
        currentCharacterData.status = {};
      }

      if (key === 'quick-notes') {
        currentCharacterData.status['quick-notes'] = input.value;
      } else if (key) {
        const numVal = parseInt(input.value, 10) || 0;
        currentCharacterData.status[key] = numVal;

        let prefix = '';
        if (key.startsWith('hp-max')) {
          prefix = 'hp-max';
        } else {
          const parts = key.split('-');
          if (parts.length >= 2) {
            prefix = parts[0];
          }
        }

        if (prefix) {
          const baseInput = document.querySelector<HTMLInputElement>(`[data-key="${prefix}-base"]`);
          const modInput = document.querySelector<HTMLInputElement>(`[data-key="${prefix}-mod"]`);
          const totalContainer = document.querySelector<HTMLElement>(`#status-total-${prefix}`);

          if (baseInput && modInput && totalContainer) {
            const bVal = parseInt(baseInput.value, 10) || 0;
            const mVal = parseInt(modInput.value, 10) || 0;
            const total = bVal + mVal;

            totalContainer.textContent = total.toString();
            totalContainer.className = 'is-size-4 has-text-weight-bold my-1';
            if (total > 0) totalContainer.classList.add('has-text-success');
            if (total < 0) totalContainer.classList.add('has-text-danger');

            if (prefix === 'hp-max') {
              const hpLabelSpan = document.querySelector<HTMLElement>('#status-container .box label .has-text-grey-light');
              if (hpLabelSpan) {
                hpLabelSpan.textContent = `(Max: ${total})`;
              }
            }
          }
        }
      }
    }
  }
});

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('remove-weapon-btn') || target.closest('.remove-weapon-btn')) {
    const btn = target.classList.contains('remove-weapon-btn') ? target : target.closest('.remove-weapon-btn');
    const weaponName = btn?.getAttribute('data-weapon');

    if (currentCharacterData && currentCharacterData.weapons && weaponName) {
      const confirmed = window.confirm(`Bist du sicher, dass du die Waffe "${weaponName}" entfernen möchtest?`);
      if (confirmed) {
        delete currentCharacterData.weapons[weaponName];
        createWeaponDashboard(currentCharacterData);
      }
    }
  }

  if (target.id === 'add-weapon-btn' || target.closest('#add-weapon-btn')) {
    const nameInput = document.querySelector<HTMLInputElement>('#new-weapon-name');
    const typeSelect = document.querySelector<HTMLSelectElement>('#new-weapon-type');
    const modSelect = document.querySelector<HTMLSelectElement>('#new-weapon-mod');
    const effectInput = document.querySelector<HTMLInputElement>('#new-weapon-effect');
    const enhanceInput = document.querySelector<HTMLInputElement>('#new-weapon-enhancement');
    const damageInput = document.querySelector<HTMLInputElement>('#new-weapon-damage');

    const weaponName = nameInput?.value.trim();
    if (!weaponName) {
      alert("Bitte gib einen Namen für die Waffe ein!");
      return;
    }

    if (currentCharacterData) {
      if (!currentCharacterData.weapons) {
        currentCharacterData.weapons = {};
      }

      if (currentCharacterData.weapons[weaponName]) {
        alert("Eine Waffe mit diesem Namen existiert bereits!");
        return;
      }

      currentCharacterData.weapons[weaponName] = {
        'weapon-type': typeSelect?.value || 'Simple',
        'mod': modSelect?.value || 'STR',
        'effect': parseInt(effectInput?.value || '0', 10) || 0,
        'enhancement': parseInt(enhanceInput?.value || '0', 10) || 0,
        'damage-die': damageInput?.value || '1d6'
      };

      createWeaponDashboard(currentCharacterData);
    }
  }
});

document.addEventListener('change', (e) => {
  const target = e.target as HTMLElement;
  
  if (target.classList.contains('info-input')) {
    const input = target as HTMLInputElement | HTMLSelectElement;
    const key = input.getAttribute('data-key');
    if (currentCharacterData && key) {
      if (!currentCharacterData.infos) currentCharacterData.infos = {};
      currentCharacterData.infos[key] = input.value;
    }
  }

  if (target.classList.contains('save-check')) {
    const checkbox = target as HTMLInputElement;
    const abi = checkbox.getAttribute('data-abi');
    
    if (currentCharacterData && abi) {
      if (!currentCharacterData.proficiencies) {
        currentCharacterData.proficiencies = {};
      }
      if (!currentCharacterData.proficiencies['saving-throws']) {
        currentCharacterData.proficiencies['saving-throws'] = {};
      }
      
      const savesData = currentCharacterData.proficiencies['saving-throws'];
      if (!savesData[abi]) {
        savesData[abi] = { proficient: 0, 'mod-type': abi as AbilityType };
      }
      
      savesData[abi].proficient = checkbox.checked ? 1 : 0;
      updateWholeDashboard(currentCharacterData);
    }
  }

  if (target.classList.contains('simple-toggle-check')) {
    const checkbox = target as HTMLInputElement;
    const cat = checkbox.getAttribute('data-cat') as keyof CharacterProficiencies;
    const key = checkbox.getAttribute('data-key');
    
    if (currentCharacterData && currentCharacterData.proficiencies && cat && key) {
      if (!currentCharacterData.proficiencies[cat]) {
        (currentCharacterData.proficiencies as any)[cat] = {};
      }
      (currentCharacterData.proficiencies[cat] as Record<string, number>)[key] = checkbox.checked ? 1 : 0;
      renderActiveProficienciesSummary(currentCharacterData);
    }
  }

  if (target.classList.contains('prof-checkbox-single')) {
    const checkbox = target as HTMLInputElement;
    const cat = checkbox.getAttribute('data-category') as keyof CharacterProficiencies;
    const key = checkbox.getAttribute('data-key');
    
    if (currentCharacterData && currentCharacterData.proficiencies && cat && key) {
      const categoryData = currentCharacterData.proficiencies[cat] as Record<string, any>;
      if (categoryData && categoryData[key]) {
        if (typeof categoryData[key] === 'object') {
          categoryData[key].proficient = checkbox.checked ? 1 : 0;
        } else {
          categoryData[key] = checkbox.checked ? 1 : 0;
        }
        buildProficienciesDashboard(currentCharacterData, searchInput?.value || '');
      }
    }
  }

  if (target.classList.contains('prof-checkbox-proficient') || target.classList.contains('prof-checkbox-expertise')) {
    const checkbox = target as HTMLInputElement;
    const cat = checkbox.getAttribute('data-category') as keyof CharacterProficiencies;
    const key = checkbox.getAttribute('data-key');
    
    if (currentCharacterData && currentCharacterData.proficiencies && cat && key) {
      const categoryData = currentCharacterData.proficiencies[cat] as Record<string, ProficiencyItem>;
      if (categoryData && categoryData[key]) {
        const row = checkbox.closest('tr');
        const profCb = row?.querySelector('.prof-checkbox-proficient') as HTMLInputElement;
        const expCb = row?.querySelector('.prof-checkbox-expertise') as HTMLInputElement;

        let newProfValue = 0;
        if (expCb?.checked) {
          newProfValue = 2; 
          if (profCb) profCb.checked = true;
        } else if (profCb?.checked) {
          newProfValue = 1;
        } else {
          newProfValue = 0;
          if (expCb) expCb.checked = false;
        }

        categoryData[key].proficient = newProfValue;
        buildProficienciesDashboard(currentCharacterData, searchInput?.value || '');
      }
    }
  }

  if (target.classList.contains('weapon-input')) {
    const input = target as HTMLInputElement | HTMLSelectElement;
    const weaponName = input.getAttribute('data-weapon');
    const key = input.getAttribute('data-key');

    if (currentCharacterData && currentCharacterData.weapons && weaponName && key) {
      if (currentCharacterData.weapons[weaponName]) {
        let val: any = input.value;
        if (key === 'effect' || key === 'enhancement') {
          val = parseInt(val, 10) || 0;
        }
        currentCharacterData.weapons[weaponName][key] = val;
        createWeaponDashboard(currentCharacterData);
      }
    }
  }

  if (target.classList.contains('weapon-name-input')) {
    const input = target as HTMLInputElement;
    const oldName = input.getAttribute('data-old-name');
    const newName = input.value.trim();

    if (currentCharacterData && currentCharacterData.weapons && oldName && newName && oldName !== newName) {
      if (currentCharacterData.weapons[newName]) {
        alert("Eine Waffe mit diesem Namen existiert bereits!");
        input.value = oldName;
        return;
      }

      currentCharacterData.weapons[newName] = currentCharacterData.weapons[oldName];
      delete currentCharacterData.weapons[oldName];
      createWeaponDashboard(currentCharacterData);
    }
  }
});

function handleFileSelection(file: File) {
  if (fileName) fileName.textContent = file.name;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const jsonText = event.target?.result as string;
      const parsedData = JSON.parse(jsonText);
      
      currentCharacterData = parsedData;
      showCharacterInterface();
      updateWholeDashboard(currentCharacterData!);
    } catch (err) {
      console.error("Fehler beim Parsen der JSON-Datei:", err);
      alert("Die ausgewählte Datei ist keine gültige JSON-Datei!");
    }
  };
  reader.readAsText(file);
}

if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      handleFileSelection(target.files[0]);
    }
  });
}

if (fileInputMain) {
  fileInputMain.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      handleFileSelection(target.files[0]);
    }
  });
}

async function loadNewCharacterTemplate() {
  try {
    const response = await fetch('./new_character.json');
    if (!response.ok) {
      throw new Error('new_character.json konnte nicht geladen werden.');
    }
    const data = await response.json();

    currentCharacterData = data;

    if (fileName) fileName.textContent = 'new_character.json (Template)';
    showCharacterInterface();
    updateWholeDashboard(currentCharacterData!);

  } catch (error) {
    console.error('Fehler beim Einlesen der new_character.json:', error);
    alert('Die Datei new_character.json konnte im Server-Verzeichnis nicht gefunden werden.');
  }
}

if (newCharBtn) {
  newCharBtn.addEventListener('click', loadNewCharacterTemplate);
}

if (newCharBtnMain) {
  newCharBtnMain.addEventListener('click', loadNewCharacterTemplate);
}

if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    if (!currentCharacterData) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentCharacterData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentCharacterData.infos?.name || 'character'}_sheet.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    if (currentCharacterData) {
      buildProficienciesDashboard(currentCharacterData, val);
    }
  });
}

const tabItems = document.querySelectorAll('#prof-tabs li');
tabItems.forEach(tab => {
  tab.addEventListener('click', () => {
    tabItems.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    
    const category = tab.getAttribute('data-category');
    if (category) {
      activeCategoryFilter = category;
      if (currentCharacterData) {
        buildProficienciesDashboard(currentCharacterData, searchInput?.value || '');
      }
    }
  });
});