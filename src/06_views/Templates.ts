function createInfosTemplate(infos: CharacterInfos): string {
  const classes = [
  // Artificer
  'Artificer',
  'Artificer: Alchemist',
  'Artificer: Armorer',
  'Artificer: Artillery',
  'Artificer: Battle Smith',
  '----------',
  
  // Barbarian
  'Barbarian',
  'Barbarian: Path of the Ancestral Guardian',
  'Barbarian: Path of the Battlerager',
  'Barbarian: Path of the Beast',
  'Barbarian: Path of the Berserker',
  'Barbarian: Path of the Giant',
  'Barbarian: Path of the Storm Herald',
  'Barbarian: Path of the Totem Warrior',
  'Barbarian: Path of the Wild Magic',
  'Barbarian: Path of the Zealot',
  '----------',

  // Bard
  'Bard',
  'Bard: College of Creation',
  'Bard: College of Eloquence',
  'Bard: College of Glamour',
  'Bard: College of Lore',
  'Bard: College of Spirits',
  'Bard: College of Swords',
  'Bard: College of Valor',
  'Bard: College of Whispers',
  '----------',

  // Cleric
  'Cleric',
  'Cleric: Arcana Domain',
  'Cleric: Death Domain',
  'Cleric: Forge Domain',
  'Cleric: Grave Domain',
  'Cleric: Knowledge Domain',
  'Cleric: Life Domain',
  'Cleric: Light Domain',
  'Cleric: Nature Domain',
  'Cleric: Order Domain',
  'Cleric: Peace Domain',
  'Cleric: Tempest Domain',
  'Cleric: Trickery Domain',
  'Cleric: Twilight Domain',
  'Cleric: War Domain',
  '----------',

  // Druid
  'Druid',
  'Druid: Circle of Dreams',
  'Druid: Circle of Land',
  'Druid: Circle of Moon',
  'Druid: Circle of Spores',
  'Druid: Circle of Stars',
  'Druid: Circle of Wildfire',
  '----------',

  // Fighter
  'Fighter',
  'Fighter: Arcane Archer',
  'Fighter: Battle Master',
  'Fighter: Cavalier',
  'Fighter: Champion',
  'Fighter: Echo Knight',
  'Fighter: Eldritch Knight',
  'Fighter: Psi Warrior',
  'Fighter: Purple Dragon Knight',
  'Fighter: Rune Knight',
  '----------',

  // Monk
  'Monk',
  'Monk: Way of Mercy',
  'Monk: Way of the Astral Self',
  'Monk: Way of the Drunken Master',
  'Monk: Way of the Four Elements',
  'Monk: Way of the Kensei',
  'Monk: Way of the Long Death',
  'Monk: Way of the Open Hand',
  'Monk: Way of the Shadow',
  'Monk: Way of the Sun Soul',
  'Monk: Way of the Ascendant Dragon',
  '----------',

  // Paladin
  'Paladin',
  'Paladin: Oath of Devotion',
  'Paladin: Oath of Glory',
  'Paladin: Oath of Redemption',
  'Paladin: Oath of Conquest',
  'Paladin: Oath of the Ancients',
  'Paladin: Oath of the Crown',
  'Paladin: Oath of the Watchers',
  'Paladin: Oathbreaker',
  'Paladin: Oath of Vengeance',
  '----------',

  // Ranger
  'Ranger',
  'Ranger: Beast Master',
  'Ranger: Fey Wanderer',
  'Ranger: Gloom Stalker',
  'Ranger: Horizon Walker',
  'Ranger: Hunter',
  'Ranger: Monster Slayer',
  'Ranger: Swarmkeeper',
  'Ranger: Drakewarden',
  '----------',

  // Rogue
  'Rogue',
  'Rogue: Arcane Trickster',
  'Rogue: Assassin',
  'Rogue: Inquisitive',
  'Rogue: Mastermind',
  'Rogue: Phantom',
  'Rogue: Scout',
  'Rogue: Soulknife',
  'Rogue: Swashbuckler',
  'Rogue: Thief',
  '----------',

  // Sorcerer
  'Sorcerer',
  'Sorcerer: Aberrant Mind',
  'Sorcerer: Clockwork Soul',
  'Sorcerer: Divine Soul',
  'Sorcerer: Draconic Bloodline',
  'Sorcerer: Shadow Magic',
  'Sorcerer: Storm Sorcery',
  'Sorcerer: Wild Magic',
  '----------',

  // Warlock
  'Warlock',
  'Warlock: The Archfey',
  'Warlock: The Celestial',
  'Warlock: The Fathomless',
  'Warlock: The Fiend',
  'Warlock: The Genie',
  'Warlock: The Great Old One',
  'Warlock: The Hexblade',
  'Warlock: The Undying',
  'Warlock: The Undead',
  '----------',

  // Wizard
  'Wizard',
  'Wizard: School of Abjuration',
  'Wizard: School of Conjuration',
  'Wizard: School of Divination',
  'Wizard: School of Enchantment',
  'Wizard: School of Evocation',
  'Wizard: School of Illusion',
  'Wizard: School of Necromancy',
  'Wizard: School of Transmutation',
  'Wizard: Bladesinging',
  'Wizard: Chronurgy Magic',
  'Wizard: Graviturgy Magic',
  'Wizard: Order of Scribes',
  'Wizard: War Magic'
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