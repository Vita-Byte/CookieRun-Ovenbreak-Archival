// =====================================================================
// ABYSSAL SPIRE MODE — Complete Roguelite 30-Floor Expansion Engine
// Features:
// 1. Branching Route Map (Skirmish, Elite, Sanctuary, Merchant, Mystery, Boss)
// 2. Interactive Multi-Choice Mystery Anomalies with Distinct Dilemmas
// 3. Campfire Cooking, Field Medic & CP Quick-Resolve Controls
// 4. Emergency Tactical Consumables Satchel (In-Battle & Camp)
// 5. Wandering Smuggler Merchant (Embers Economy & Relic Offerings)
// 6. Signature Biome Sovereign Boss Mechanics & Phase Transitions
// 7. Persistent Spire Archive Meta-Progression (Astral Memory Talent Tree)
// =====================================================================

const SPIRE_CONFIG = {
  maxFloors: 30,
  expeditionRosterSize: 12,
  vanguardSlots: 3,
  reserveSlots: 3,
  campSlots: 6,
  shrineHealPct: 0.35,
  bossFloors: [5, 10, 15, 20, 25, 30],
  archiveStorageKey: 'championsOfValor.spireArchive.v2',
  runStorageKey: 'championsOfValor.spireRun.v2'
};

// =====================================================================
// 6 DISTINCT ELEMENTAL BIOMES (5 FLOORS EACH)
// =====================================================================
const SPIRE_BIOMES = [
  {
    id: "biome_earth",
    range: [1, 5],
    name: "Obsidian Caverns",
    element: "Earth",
    icon: "🪨",
    theme: "Earth & Stone",
    desc: "A subterranean labyrinth of jagged volcanic glass that dulls blade edges and impedes agile footwork.",
    hazard: {
      name: "Dense Rubble",
      desc: "All combatants enter with -6 initial DEF; normal strikes deal +10% blunt stagger damage.",
      type: "debuff_def",
      value: 6,
      staggerBonus: 0.10
    },
    boss: {
      name: "Terrakor the Bedrock Colossus",
      avatar: "🗿",
      id: "boss_terrakor",
      traitName: "Tectonic Bastion & Seismic Disruption",
      desc: "Gains a 25% Max PV kinetic shield every 4 turns. At 50% PV, shoves active frontline into Reserve!"
    }
  },
  {
    id: "biome_wind",
    range: [6, 10],
    name: "Gale-Swept Stratosphere",
    element: "Wind",
    icon: "🌪️",
    theme: "Wind & Tempests",
    desc: "Floating sky-islands battered by supersonic squalls and razor-thin vortex slipstreams.",
    hazard: {
      name: "Turbulent Slipstream",
      desc: "Both sides gain +15% counterattack dodge chance; attacks that critically strike refund +1 Pip.",
      type: "wind_dodge",
      dodgeChance: 0.15,
      critPipRefund: true
    },
    boss: {
      name: "Zephyros the Skyreaver",
      avatar: "🦅",
      id: "boss_zephyros",
      traitName: "Cyclone Flight & Gale Evasion",
      desc: "35% counter evasion. Takes flight on Turn 3, plunging on Turn 4 for unmitigated True Damage!"
    }
  },
  {
    id: "biome_water",
    range: [11, 15],
    name: "Sunken Necropolis",
    element: "Water",
    icon: "🌊",
    theme: "Water & Pelagic Frost",
    desc: "Submerged crystalline catacombs where ancient drowned specters leach body heat from the living.",
    hazard: {
      name: "Chilling Deluge",
      desc: "Outgoing healing is reduced by -25%; normal attacks have a 25% chance to inflict 1-turn Freeze.",
      type: "water_freeze",
      healPenalty: 0.25,
      freezeChance: 0.25
    },
    boss: {
      name: "Nerezza the Abyssal Siren",
      avatar: "🧜‍♀️",
      id: "boss_nerezza",
      traitName: "Drowning Deluge & Siren's Hypnosis",
      desc: "Attacks can Freeze. When the player heals, 50% of the healed amount strikes back as True Damage!"
    }
  },
  {
    id: "biome_fire",
    range: [16, 20],
    name: "Searing Caldera",
    element: "Fire",
    icon: "🌋",
    theme: "Fire & Volcanic Ash",
    desc: "Magma flues and superheated sulfur vents that scorch armor plates and ignite fresh wounds.",
    hazard: {
      name: "Cinder Gale",
      desc: "Active champions suffer 3% Max PV Burn chip damage at turn start; all applied Burns last +1 turn.",
      type: "burn_chip",
      burnPct: 0.03,
      extendBurn: 1
    },
    boss: {
      name: "Ignisaur the Ashlord",
      avatar: "🐉",
      id: "boss_ignisaur",
      traitName: "Overheat Reactor & Flame Detonation",
      desc: "Attacks ignite Burning foes, instantly detonating all burn ticks for +15% Max PV bonus damage!"
    }
  },
  {
    id: "biome_dark",
    range: [21, 25],
    name: "Umbral Void Rift",
    element: "Dark",
    icon: "🌑",
    theme: "Darkness & Nether Entropy",
    desc: "A tear in the cosmic firmament where matter unravels and light collapses into singular voids.",
    hazard: {
      name: "Void Entropy",
      desc: "Shield barriers decay by 50% each round; units dropping below 35% PV suffer Necrosis (-20% DEF, no heals).",
      type: "void_decay",
      shieldDecay: 0.50,
      necrosisThreshold: 0.35
    },
    boss: {
      name: "Malakor the Void Sovereign",
      avatar: "🕳️",
      id: "boss_malakor",
      traitName: "Null Horizon & Barrier Pierce",
      desc: "Drains 1 Energy Pip when player fires an Ultimate. All boss attacks completely bypass kinetic barriers."
    }
  },
  {
    id: "biome_light",
    range: [26, 30],
    name: "Celestial Sovereign Apex",
    element: "Light",
    icon: "☀️",
    theme: "Light & Cosmic Transcendence",
    desc: "The sacred crown of the Spire towering into astral nebulae, guarded by eternal draconic seraphs.",
    hazard: {
      name: "Astral Convergence",
      desc: "All Ultimate burst skills deal +30% amplified damage; Elemental Advantage multiplier scales to +40%.",
      type: "astral_overcharge",
      ultAmp: 0.30,
      elemAdvBonus: 0.15
    },
    boss: {
      name: "Aurelion the Cosmic Primarch",
      avatar: "👑",
      id: "boss_aurelion",
      traitName: "Twin-Phase Cosmic Ascendance",
      desc: "Phase 1: +2 Pips & 20% True Damage reflect. Phase 2: Cleanses, restores full PV, and casts Cataclysm every 3 turns!"
    }
  }
];

// =====================================================================
// EMERGENCY BATTLE SATCHELL ITEMS (CONSUMABLES)
// =====================================================================
const SPIRE_CONSUMABLE_ITEMS = [
  {
    id: "item_elixir",
    name: "Elixir of Vitality",
    icon: "🧪",
    cost: 40,
    desc: "Restores 40% Max PV to 1 chosen Vanguard champion immediately without spending a turn.",
    action: (targetUnit) => {
      if (!targetUnit || targetUnit.pv <= 0) return false;
      const heal = Math.round(targetUnit.maxPv * 0.40);
      targetUnit.pv = Math.min(targetUnit.maxPv, targetUnit.pv + heal);
      return heal;
    }
  },
  {
    id: "item_battery",
    name: "Aetherial Battery",
    icon: "🔋",
    cost: 45,
    desc: "Instantly charges +2 Energy Pips to 1 friendly Vanguard champion.",
    action: (targetUnit) => {
      if (!targetUnit || targetUnit.pv <= 0) return false;
      targetUnit.energy = Math.min(3, (targetUnit.energy || 0) + 2);
      return true;
    }
  },
  {
    id: "item_cleanse",
    name: "Purification Salve",
    icon: "💧",
    cost: 35,
    desc: "Cleanses all active debuffs (Stun, Freeze, Burn, Bleed, Necrosis) across your entire active Vanguard.",
    action: (vanguardLine) => {
      if (!Array.isArray(vanguardLine)) return false;
      vanguardLine.forEach(u => { if (u) u.statusEffects = []; });
      return true;
    }
  },
  {
    id: "item_flashbang",
    name: "Flashbang Powder",
    icon: "💥",
    cost: 50,
    desc: "Stuns the selected enemy frontline unit for 1 turn (bypasses debuff resistance).",
    action: (targetEnemy) => {
      if (!targetEnemy || targetEnemy.pv <= 0) return false;
      if (typeof applyStatusEffect === 'function') applyStatusEffect(targetEnemy, 'Stun', 1);
      return true;
    }
  },
  {
    id: "item_smoke",
    name: "Smoke Shroud",
    icon: "🌫️",
    cost: 40,
    desc: "Grants 100% counterattack evasion to your Vanguard for 1 turn.",
    action: (vanguardLine) => {
      if (!Array.isArray(vanguardLine)) return false;
      vanguardLine.forEach(u => { if (u) u._smokeShroudActive = true; });
      return true;
    }
  }
];

// =====================================================================
// EXPANDED 24-RELIC EXPEDITION DRAFT POOL
// =====================================================================
const SPIRE_RELIC_POOL = [
  // --- SUSTAIN & RESTORATION ---
  {
    id: "relic_vampiric_chalice",
    name: "Vampiric Chalice",
    icon: "🍷",
    rarity: "Rare",
    cost: 90,
    desc: "All living vanguard allies gain +12% life-siphon on normal strikes.",
    effectType: "lifesteal",
    value: 0.12
  },
  {
    id: "relic_ancestral_pendant",
    name: "Totem Pendant",
    icon: "🪶",
    rarity: "Epic",
    cost: 140,
    desc: "Shaman Spirit Brand heal ratio increased by +15%, and restores PV to the entire active vanguard.",
    effectType: "shaman_boost",
    value: 0.15
  },
  {
    id: "relic_phoenix_ash_phial",
    name: "Phial of Phoenix Ash",
    icon: "🔥",
    rarity: "Legendary",
    cost: 200,
    desc: "Once per floor, automatically saves a champion from fatal damage, restoring them with 35% Max PV.",
    effectType: "death_ward",
    value: 0.35
  },
  {
    id: "relic_sacred_wellspring",
    name: "Wellspring Talisman",
    icon: "⛲",
    rarity: "Rare",
    cost: 85,
    desc: "Increases all healing, regeneration, and grace skills by +25%.",
    effectType: "healing_boost",
    value: 0.25
  },
  {
    id: "relic_nectar_einherjar",
    name: "Nectar of the Einherjar",
    icon: "🍯",
    rarity: "Epic",
    cost: 130,
    desc: "Defeating an enemy champion restores 15% Max PV to all surviving vanguard champions.",
    effectType: "kill_heal",
    value: 0.15
  },

  // --- OFFENSE & STRIKE AMPLIFICATION ---
  {
    id: "relic_berserk_talisman",
    name: "Blood-Soaked Fang",
    icon: "🩸",
    rarity: "Epic",
    cost: 135,
    desc: "Champions below 50% PV deal +30% amplified strike and counterattack damage.",
    effectType: "low_hp_dmg",
    value: 0.30
  },
  {
    id: "relic_prismatic_shard",
    name: "Prismatic Shard",
    icon: "💠",
    rarity: "Legendary",
    cost: 210,
    desc: "All elemental advantage attacks deal +45% damage (up from base +25%).",
    effectType: "elem_mult_boost",
    value: 0.20
  },
  {
    id: "relic_vorpal_edge",
    name: "Vorpal Whetstone",
    icon: "⚔️",
    rarity: "Rare",
    cost: 85,
    desc: "Normal attacks have a 25% chance to land a Critical Strike dealing 1.75x damage.",
    effectType: "crit_chance",
    value: 0.25
  },
  {
    id: "relic_titan_cleaver",
    name: "Titan's Cleaving Maul",
    icon: "🔨",
    rarity: "Epic",
    cost: 140,
    desc: "All normal strikes splash 25% cleave damage to adjacent frontline enemies.",
    effectType: "cleave_pct",
    value: 0.25
  },
  {
    id: "relic_cataclysm_amplifier",
    name: "Cataclysmic Gyro",
    icon: "⚡",
    rarity: "Legendary",
    cost: 190,
    desc: "All 3-pip Ultimate skills deal +35% increased burst damage.",
    effectType: "ult_dmg_boost",
    value: 0.35
  },

  // --- DEFENSE & MITIGATION ---
  {
    id: "relic_fortified_aegis",
    name: "Fortified Bastion",
    icon: "🛡️",
    rarity: "Rare",
    cost: 80,
    desc: "All squad members gain a permanent +20 flat DEF bonus across all floors.",
    effectType: "flat_def",
    value: 20
  },
  {
    id: "relic_thorned_carapace",
    name: "Spiteful Spines",
    icon: "🌵",
    rarity: "Rare",
    cost: 95,
    desc: "Reflects 20% of all incoming strike damage back to the attacker as True Damage.",
    effectType: "reflect_true_dmg",
    value: 0.20
  },
  {
    id: "relic_colossus_aegis",
    name: "Colossus Kinetic Matrix",
    icon: "🏰",
    rarity: "Legendary",
    cost: 200,
    desc: "At the start of every combat floor, all 3 vanguard champions receive a 25% Max PV barrier shield.",
    effectType: "floor_start_shield",
    value: 0.25
  },
  {
    id: "relic_tome_of_cleanse",
    name: "Tome of Purification",
    icon: "📖",
    rarity: "Epic",
    cost: 125,
    desc: "All vanguard champions cleanse 1 negative debuff at the start of every friendly turn.",
    effectType: "turn_start_cleanse",
    value: 1
  },

  // --- ENERGY, TEMPO & COOLDOWNS ---
  {
    id: "relic_chronos_hourglass",
    name: "Chronos Hourglass",
    icon: "⏳",
    rarity: "Legendary",
    cost: 220,
    desc: "Start every combat floor with +1 bonus Energy Pip on all active frontline champions.",
    effectType: "start_energy",
    value: 1
  },
  {
    id: "relic_leyline_capacitor",
    name: "Echoing Ley-Capacitor",
    icon: "🔋",
    rarity: "Epic",
    cost: 145,
    desc: "After unleashing an Ultimate, 50% chance to immediately refund 1 Energy Pip.",
    effectType: "ult_refund_pip",
    value: 0.50
  },
  {
    id: "relic_tacticians_pivot",
    name: "Tactician's Signal Horn",
    icon: "📯",
    rarity: "Rare",
    cost: 85,
    desc: "Whenever a Reserve champion swaps in to replace a fallen unit, they gain +2 Energy Pips immediately.",
    effectType: "swap_energy_gain",
    value: 2
  },
  {
    id: "relic_primordial_bell",
    name: "Chime of the Primordials",
    icon: "🔔",
    rarity: "Epic",
    cost: 130,
    desc: "Reduces Primal Summon lockout by 1 turn at the start of every battle floor.",
    effectType: "summon_lockout_cut",
    value: 1
  },

  // --- ROLE MASTERY & ARCHETYPES ---
  {
    id: "relic_overclocked_gear",
    name: "Overclocked Gear",
    icon: "⚙️",
    rarity: "Rare",
    cost: 90,
    desc: "Saboteur traps deal +50% detonation burst and strip 1 additional Energy Pip.",
    effectType: "saboteur_boost",
    value: 0.50
  },
  {
    id: "relic_executioner_cowl",
    name: "Executioner's Cowl",
    icon: "🎯",
    rarity: "Epic",
    cost: 135,
    desc: "Assassin execute threshold is expanded to 60% PV, and deals +25% bonus execute damage.",
    effectType: "assassin_boost",
    value: 0.25
  },
  {
    id: "relic_harmonic_tuning_fork",
    name: "Sanctuary Tuning Fork",
    icon: "🪈",
    rarity: "Epic",
    cost: 140,
    desc: "While resting in Reserve or Camp, all benched allies regenerate 8% Max PV after each cleared floor.",
    effectType: "camp_passive_regen",
    value: 0.08
  },

  // --- HIGH-RISK / HIGH-REWARD CURSED RELICS ---
  {
    id: "relic_pandemonium_skull",
    name: "Cursed Skull of Pandemonium",
    icon: "💀",
    rarity: "Mythical",
    cost: 160,
    desc: "CURSED: Squad deals +40% strike & Ultimate damage, but takes 15% more damage from all sources.",
    effectType: "cursed_slaughter",
    bonusDmg: 0.40,
    penaltyTaken: 0.15
  },
  {
    id: "relic_blood_pact_ring",
    name: "Blood Pact Band",
    icon: "💍",
    rarity: "Mythical",
    cost: 160,
    desc: "CURSED: All champions enter battle with -20% Max PV, but all start with +2 Energy Pips.",
    effectType: "cursed_tempo",
    pvPenalty: 0.20,
    energyBonus: 2
  },
  {
    id: "relic_iron_shackles",
    name: "Coliseum Prisoner Shackles",
    icon: "⛓️",
    rarity: "Mythical",
    cost: 160,
    desc: "CURSED: Allies cannot counterattack, but gain +45 flat DEF and reflect 30% True Damage.",
    effectType: "cursed_fortress",
    defBonus: 45,
    reflectBonus: 0.30
  }
];

// =====================================================================
// PERSISTENT META-PROGRESSION: THE SPIRE ARCHIVE
// =====================================================================
const spireArchive = {
  astralMemory: 0,
  upgrades: {
    hardenedRations: 0,    // Max 3: +20% stat bonus per meal tier
    expandedSatchel: 0,    // Max 1: Start runs with 1 random Common/Rare relic
    pouchSlots: 0,         // Max 2: Unlocks slot 2 and slot 3 in the satchel
    leylinePrimer: 0,      // Max 1: Start floor 1 with +1 Pip
    fatesReroll: 0,        // Max 2: 1 free relic draft reroll per run
    stalwartBattalion: 0   // Max 3: +5% Max PV to all squad members
  }
};

const ARCHIVE_UPGRADE_CONFIG = {
  hardenedRations: { name: "Hardened Rations", icon: "🛡️", max: 3, costs: [100, 200, 350], desc: "Campfire meals grant +25% greater defensive and energy benefits." },
  expandedSatchel: { name: "Expedition Relic Cache", icon: "🏺", max: 1, costs: [250], desc: "Start every Spire ascent with 1 random Expedition Relic equipped." },
  pouchSlots: { name: "Satchel Expansion", icon: "🎒", max: 2, costs: [150, 300], desc: "Unlocks an additional emergency consumable slot in your battle satchel (up to 3)." },
  leylinePrimer: { name: "Leyline Primer", icon: "🔮", max: 1, costs: [200], desc: "Vanguard enters Floor 1 overcharged with +1 starting Energy Pip." },
  fatesReroll: { name: "Fate's Reshuffle", icon: "🔄", max: 2, costs: [120, 250], desc: "Gain 1 free Relic Draft reroll per expedition." },
  stalwartBattalion: { name: "Stalwart Endurance", icon: "❤️", max: 3, costs: [100, 180, 280], desc: "Expedition members receive +5% Max PV permanently across all floors." }
};

function loadSpireArchive() {
  try {
    const raw = localStorage.getItem(SPIRE_CONFIG.archiveStorageKey);
    if (!raw) return;
    const data = JSON.parse(raw);
    spireArchive.astralMemory = data.astralMemory || 0;
    spireArchive.upgrades = { ...spireArchive.upgrades, ...(data.upgrades || {}) };
  } catch (e) {
    console.warn("Could not load Spire Archive:", e);
  }
}

function saveSpireArchive() {
  try {
    localStorage.setItem(SPIRE_CONFIG.archiveStorageKey, JSON.stringify(spireArchive));
  } catch (e) {
    console.warn("Could not save Spire Archive:", e);
  }
}

// Active expedition run state
const spireState = {
  isActive: false,
  currentFloor: 1,
  maxFloor: SPIRE_CONFIG.maxFloors,
  expedition: [],                 // 12 unit slots with persistent PV, DEF, Energy
  activeIndices: [0, 1, 2],       // Indices 0..2 -> Active Vanguard
  reserveIndices: [3, 4, 5],      // Indices 3..5 -> Reinforcements
  campIndices: [6, 7, 8, 9, 10, 11], // Indices 6..11 -> Out-of-combat bench
  relics: [],                     // Acquired relics
  satchel: [],                    // Equipped tactical consumables (ids)
  rationsCooked: null,            // Campfire meal active for this floor
  spireEmbers: 0,                 // Run currency
  floorsCleared: 0,
  totalDamageDealt: 0,
  totalCasualties: 0,
  currentEnemyField: [],
  currentEnemyReserve: [],
  currentBossData: null,
  bossCombatState: { phase: 1, shieldTurnCounter: 0, banterFired: false, airborneTimer: 0 },
  isResolvingFloor: false,
  currentNodeType: "skirmish",    // "skirmish" | "elite" | "sanctuary" | "merchant" | "mystery" | "boss"
  upcomingBranches: [],           // Array of 2-3 next floor options
  freeRerollsRemaining: 0
};

// Draft & Muster Selection State (Before run starts)
const spireMusterState = {
  selectedCardIds: [],            // Array of up to 12 card IDs
  filterElement: 'All',
  filterRole: 'All',
  searchQuery: ''
};

function getSpireBiome(floorNumber) {
  const f = Math.max(1, Math.min(SPIRE_CONFIG.maxFloors, floorNumber || spireState.currentFloor));
  return SPIRE_BIOMES.find(b => f >= b.range[0] && f <= b.range[1]) || SPIRE_BIOMES[0];
}

function getSpireFloorType(floorNumber) {
  const f = floorNumber || spireState.currentFloor;
  if (SPIRE_CONFIG.bossFloors.includes(f)) {
    return { type: "boss", label: "Biome Sovereign", icon: "👑" };
  }
  return { type: spireState.currentNodeType || "skirmish", label: getNodeLabel(spireState.currentNodeType), icon: getNodeIcon(spireState.currentNodeType) };
}

function getNodeLabel(type) {
  switch (type) {
    case "elite": return "Elite Ambush";
    case "sanctuary": return "Camp Sanctuary";
    case "merchant": return "Spire Smuggler";
    case "mystery": return "Mysterious Anomaly";
    case "boss": return "Biome Sovereign";
    default: return "Vanguard Skirmish";
  }
}

function getNodeIcon(type) {
  switch (type) {
    case "elite": return "💀";
    case "sanctuary": return "⛺";
    case "merchant": return "🛒";
    case "mystery": return "💎";
    case "boss": return "👑";
    default: return "⚔️";
  }
}

// Roll 2-3 branching path options for the upcoming floor
function rollNextSpireBranches(targetFloor) {
  if (SPIRE_CONFIG.bossFloors.includes(targetFloor)) {
    const biome = getSpireBiome(targetFloor);
    return [{
      type: "boss",
      title: biome.boss.name,
      icon: "👑",
      desc: biome.boss.desc,
      elite: true
    }];
  }

  const pool = [
    { type: "skirmish", title: "Vanguard Skirmish", icon: "⚔️", desc: "Standard elemental enemy encounter with moderate ember yields." },
    { type: "elite", title: "Elite Ambush", icon: "💀", desc: "High-threat encounter! Guarantees an Epic or Legendary Relic draft on victory." },
    { type: "sanctuary", title: "Campfire Sanctuary", icon: "⛺", desc: "Rest, brew rations, or hone armor with zero combat risk." },
    { type: "merchant", title: "Wandering Smuggler", icon: "🛒", desc: "Spend Spire Embers on targeted revives, consumables, and relics." },
    { type: "mystery", title: "Mysterious Anomaly", icon: "💎", desc: "An unpredictable rift offering risk-versus-reward decisions." }
  ];

  // Specific weighting: keep Elites common later, sanctuaries periodically
  const candidateBranches = [];
  const count = (targetFloor % 3 === 0) ? 3 : 2;

  // Guarantee 1 combat option
  candidateBranches.push(Math.random() < 0.35 ? pool[1] : pool[0]);

  // Fill remaining slots without duplicates
  while (candidateBranches.length < count) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!candidateBranches.some(b => b.type === pick.type)) {
      candidateBranches.push(pick);
    }
  }

  return candidateBranches;
}

// =====================================================================
// ROSTER DRAFT & MUSTER CONTROLLER
// =====================================================================

function renderSpireView() {
  loadSpireArchive();
  const musterScreen = document.getElementById('spire-muster-screen');
  const campScreen = document.getElementById('spire-camp-screen');

  if (!spireState.isActive) {
    if (musterScreen) musterScreen.classList.remove('hidden');
    if (campScreen) campScreen.classList.add('hidden');
    renderSpireMusterUI();
  } else {
    if (musterScreen) musterScreen.classList.add('hidden');
    if (campScreen) campScreen.classList.remove('hidden');
    renderSpireCampUI();
  }
}

function renderSpireMusterUI() {
  const previewSlotsContainer = document.getElementById('spire-muster-slots-preview');
  const ownedGrid = document.getElementById('spire-muster-cards-grid');
  const counterEl = document.getElementById('spire-muster-count-badge');
  const embarkBtn = document.getElementById('spire-muster-embark-btn');

  const selectedCount = spireMusterState.selectedCardIds.length;
  if (counterEl) {
    counterEl.innerText = `${selectedCount} / ${SPIRE_CONFIG.expeditionRosterSize} Selected`;
    counterEl.className = selectedCount === 12
      ? "text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-cinzel"
      : "text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-cinzel";
  }

  if (embarkBtn) {
    embarkBtn.disabled = (selectedCount !== SPIRE_CONFIG.expeditionRosterSize);
  }

  // Inject Archive Talent Tree Button in Muster Header if missing
  let archiveBtn = document.getElementById('btn-open-spire-archive');
  if (!archiveBtn) {
    const musterHeader = document.querySelector('#spire-muster-screen .shrink-0');
    if (musterHeader) {
      archiveBtn = document.createElement('button');
      archiveBtn.id = 'btn-open-spire-archive';
      archiveBtn.onclick = openSpireArchiveModal;
      archiveBtn.className = 'py-2 px-3.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 text-xs font-bold border border-purple-500/40 shadow transition flex items-center gap-1.5 active:scale-95';
      archiveBtn.innerHTML = `<span>🔮</span> <span>Spire Archive (${spireArchive.astralMemory}✦)</span>`;
      musterHeader.insertBefore(archiveBtn, musterHeader.firstChild);
    }
  } else {
    archiveBtn.innerHTML = `<span>🔮</span> <span>Spire Archive (${spireArchive.astralMemory}✦)</span>`;
  }

  function renderMusterSlotCard(idx) {
    const cardId = spireMusterState.selectedCardIds[idx];
    const isVanguard = idx < 3;
    const isReserve = idx >= 3 && idx < 6;

    const roleBadge = isVanguard
      ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-slate-950 shadow">#${idx + 1} Vanguard</span>`
      : isReserve
        ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-500 text-slate-950 shadow">#${idx + 1} Reserve</span>`
        : `<span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-slate-700 text-slate-200 shadow">#${idx + 1} Bench</span>`;

    if (!cardId) {
      const borderCol = isVanguard ? 'border-emerald-500/30' : isReserve ? 'border-cyan-500/30' : 'border-slate-800';
      return `
        <div class="h-full min-h-[210px] max-w-[170px] w-full mx-auto rounded-xl border-2 border-dashed ${borderCol} bg-slate-950/40 p-2 flex flex-col items-center justify-center text-center gap-1.5">
          ${roleBadge}
          <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 text-base font-bold">
            ＋
          </div>
          <span class="text-[11px] font-bold text-slate-500">Empty</span>
        </div>
      `;
    }

    const owned = (typeof playerState !== 'undefined' && Array.isArray(playerState.ownedCards))
      ? playerState.ownedCards.find(o => o.cardId === cardId)
      : null;

    const stats = (typeof calculateCardStats === 'function')
      ? calculateCardStats(cardId, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned)
      : { cardId, pv: 150, def: 20 };

    const fullCardHTML = (typeof renderCardHTML === 'function')
      ? renderCardHTML(stats, { isSelected: true, onClick: `toggleSpireRosterPick('${cardId}')` })
      : `<div onclick="toggleSpireRosterPick('${cardId}')" class="p-2 border rounded">${stats.name}</div>`;

    return `
      <div class="relative group cursor-pointer flex flex-col gap-1 w-full max-w-[170px] mx-auto" onclick="toggleSpireRosterPick('${cardId}')" title="Click to remove from roster">
        <div class="flex items-center justify-between px-0.5">
          ${roleBadge}
          <span class="text-[9px] text-rose-400 group-hover:text-rose-300 font-bold opacity-0 group-hover:opacity-100 transition">✕</span>
        </div>
        <div class="transform transition group-hover:scale-[1.02]">
          ${fullCardHTML}
        </div>
      </div>
    `;
  }

  if (previewSlotsContainer) {
    previewSlotsContainer.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <!-- Vanguard (Slots 1-3) -->
        <div class="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-2.5 sm:p-3">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <h4 class="font-cinzel text-xs font-bold text-emerald-300 uppercase tracking-wider">Active Vanguard (1–3)</h4>
            </div>
            <span class="text-[9px] font-mono text-emerald-400/80 font-bold">Frontline</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            ${[0, 1, 2].map(renderMusterSlotCard).join('')}
          </div>
        </div>

        <!-- Reserves (Slots 4-6) -->
        <div class="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-2.5 sm:p-3">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              <h4 class="font-cinzel text-xs font-bold text-cyan-300 uppercase tracking-wider">Reinforcements (4–6)</h4>
            </div>
            <span class="text-[9px] font-mono text-cyan-400/80 font-bold">Backup</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            ${[3, 4, 5].map(renderMusterSlotCard).join('')}
          </div>
        </div>
      </div>

      <!-- Camp Bench (Slots 7-12) -->
      <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-2.5 sm:p-3">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            <h4 class="font-cinzel text-xs font-bold text-slate-300 uppercase tracking-wider">Camp Bench (7–12)</h4>
            <span class="text-[10px] text-slate-500 hidden sm:inline">• Swappable in Camp between floors</span>
          </div>
          <span class="text-[9px] font-mono text-slate-400 font-bold">Camp Reserve</span>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
          ${[6, 7, 8, 9, 10, 11].map(renderMusterSlotCard).join('')}
        </div>
      </div>
    `;
  }

  if (ownedGrid && typeof playerState !== 'undefined' && Array.isArray(playerState.ownedCards)) {
    const owned = playerState.ownedCards.filter(o => {
      const base = (typeof getCardBaseData === 'function') ? getCardBaseData(o.cardId) : null;
      if (!base) return false;

      if (spireMusterState.filterElement !== 'All' && base.element !== spireMusterState.filterElement) return false;
      if (spireMusterState.filterRole !== 'All' && base.role !== spireMusterState.filterRole) return false;
      if (spireMusterState.searchQuery) {
        const q = spireMusterState.searchQuery.toLowerCase();
        if (!base.name.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    if (owned.length === 0) {
      ownedGrid.innerHTML = `
        <div class="col-span-full py-8 text-center text-slate-500 text-xs italic">
          No champions found matching the selected filter criteria.
        </div>
      `;
      return;
    }

    ownedGrid.innerHTML = owned.map(o => {
      const stats = (typeof calculateCardStats === 'function')
        ? calculateCardStats(o.cardId, o.isRainbow, o.level, o)
        : { cardId: o.cardId, pv: 150, def: 20 };

      const pickIndex = spireMusterState.selectedCardIds.indexOf(o.cardId);
      const isSelected = (pickIndex !== -1);

      let slotTag = '';
      if (isSelected) {
        if (pickIndex < 3) slotTag = '<span class="absolute top-1.5 right-1.5 z-30 bg-emerald-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow">VANGUARD</span>';
        else if (pickIndex < 6) slotTag = '<span class="absolute top-1.5 right-1.5 z-30 bg-cyan-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow">RESERVE</span>';
        else slotTag = '<span class="absolute top-1.5 right-1.5 z-30 bg-slate-700 text-slate-200 font-bold text-[9px] px-1.5 py-0.5 rounded shadow">BENCH</span>';
      }

      const cardHTML = (typeof renderCardHTML === 'function')
        ? renderCardHTML(stats, { isSelected, onClick: `toggleSpireRosterPick('${o.cardId}')` })
        : `<div onclick="toggleSpireRosterPick('${o.cardId}')" class="p-2 border rounded">${stats.name}</div>`;

      return `
        <div class="relative ${isSelected ? 'ring-2 ring-amber-400 rounded-2xl' : ''}">
          ${slotTag}
          ${cardHTML}
        </div>
      `;
    }).join('');
  }
}

function toggleSpireRosterPick(cardId) {
  const idx = spireMusterState.selectedCardIds.indexOf(cardId);
  if (idx !== -1) {
    spireMusterState.selectedCardIds.splice(idx, 1);
    playSound('card');
  } else {
    if (spireMusterState.selectedCardIds.length >= SPIRE_CONFIG.expeditionRosterSize) {
      showSpireToast("Battalion is full (12/12)! Remove a champion to pick another.");
      return;
    }
    spireMusterState.selectedCardIds.push(cardId);
    playSound('coin');
  }
  renderSpireMusterUI();
}

const SPIRE_ROLE_ARCHETYPES = {
  sustain: ['Cleric', 'Shaman', 'Herald', 'Priest'],
  tank: ['Knight', 'Sentinel', 'Paladin', 'Bulwark'],
  utility: ['Chronomancer', 'Hexer', 'Bard', 'Commander', 'Saboteur', 'Spellbreaker', 'Blight'],
  dps: ['Assassin', 'Mage', 'Berserker', 'Monk', 'Warrior', 'Duelist', 'Corsair', 'Ranger', 'Thief', 'Elementalist', 'Necromancer', 'Alchemist', 'Warlock', 'Ravager', 'Dragoon', 'Gladiator', 'Valkyrie']
};

function getRoleArchetype(role) {
  if (SPIRE_ROLE_ARCHETYPES.sustain.includes(role)) return 'sustain';
  if (SPIRE_ROLE_ARCHETYPES.tank.includes(role)) return 'tank';
  if (SPIRE_ROLE_ARCHETYPES.utility.includes(role)) return 'utility';
  return 'dps';
}

function autoDraftSpireRoster() {
  if (typeof playerState === 'undefined' || !Array.isArray(playerState.ownedCards) || playerState.ownedCards.length === 0) return;

  const candidatePool = playerState.ownedCards.map(o => {
    const base = (typeof getCardBaseData === 'function') ? getCardBaseData(o.cardId) : null;
    const stats = (typeof calculateCardStats === 'function')
      ? calculateCardStats(o.cardId, o.isRainbow, o.level, o)
      : { pv: 100, def: 10 };
    const cp = (stats.pv || 0) + (stats.def || 0) * 4;
    return {
      cardId: o.cardId,
      name: base ? base.name : o.cardId,
      element: base ? base.element : 'Fire',
      role: base ? base.role : 'Warrior',
      archetype: getRoleArchetype(base ? base.role : 'Warrior'),
      cp
    };
  });

  candidatePool.sort((a, b) => b.cp - a.cp);
  spireMusterState.selectedCardIds = candidatePool.slice(0, 12).map(c => c.cardId);

  playSound('rainbow');
  showSpireToast(`Auto-drafted top 12 champions by combat power!`);
  renderSpireMusterUI();
}

function clearSpireMusterSelection() {
  spireMusterState.selectedCardIds = [];
  renderSpireMusterUI();
}

function setSpireMusterFilterElement(element) {
  spireMusterState.filterElement = element;
  renderSpireMusterUI();
}

function embarkSpireExpedition() {
  if (spireMusterState.selectedCardIds.length !== SPIRE_CONFIG.expeditionRosterSize) {
    showSpireToast(`Please select exactly 12 champions (currently ${spireMusterState.selectedCardIds.length}/12).`);
    return;
  }

  const success = initSpireExpedition(spireMusterState.selectedCardIds);
  if (success) {
    playSound('charge');
    renderSpireView();
  }
}

function abandonSpireExpedition() {
  if (!confirm("Are you sure you want to abandon the current expedition? All unspent Embers will convert into permanent Astral Memory!")) {
    return;
  }
  showSpireExpeditionOverModal(false);
}

// =====================================================================
// EXPEDITION RUN & COMBAT CONTROLLER
// =====================================================================

function initSpireExpedition(chosenCardIds) {
  loadSpireArchive();

  spireState.isActive = true;
  spireState.currentFloor = 1;
  spireState.maxFloor = SPIRE_CONFIG.maxFloors;
  spireState.floorsCleared = 0;
  spireState.totalCasualties = 0;
  spireState.relics = [];
  spireState.spireEmbers = 60; // Starter embers
  spireState.rationsCooked = null;
  spireState.activeIndices = [0, 1, 2];
  spireState.reserveIndices = [3, 4, 5];
  spireState.campIndices = [6, 7, 8, 9, 10, 11];
  spireState.satchel = ['item_elixir']; // Start with 1 basic emergency elixir
  spireState._restUsedFloor = null;
  spireState.currentNodeType = "skirmish";
  spireState.upcomingBranches = rollNextSpireBranches(2);
  spireState.freeRerollsRemaining = spireArchive.upgrades.fatesReroll || 0;

  // Apply Archive bonus: Expanded Satchel
  if (spireArchive.upgrades.expandedSatchel > 0) {
    const startRelics = SPIRE_RELIC_POOL.filter(r => r.rarity === 'Rare');
    if (startRelics.length > 0) {
      spireState.relics.push({ ...startRelics[Math.floor(Math.random() * startRelics.length)] });
    }
  }

  const hpBonusMult = 1.0 + ((spireArchive.upgrades.stalwartBattalion || 0) * 0.05);

  spireState.expedition = chosenCardIds.map((cardId, index) => {
    const owned = (typeof playerState !== 'undefined' && playerState.ownedCards)
      ? playerState.ownedCards.find(o => o.cardId === cardId)
      : null;

    const stats = (typeof calculateCardStats === 'function')
      ? calculateCardStats(cardId, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned)
      : { cardId, pv: 150, maxPv: 150, def: 20, energy: 0 };

    const boostedPv = Math.round(stats.pv * hpBonusMult);
    const startEnergy = (index < 3 && spireArchive.upgrades.leylinePrimer > 0) ? 1 : 0;

    return {
      ...stats,
      expeditionIndex: index,
      pv: boostedPv,
      maxPv: boostedPv,
      energy: startEnergy,
      isFallen: false,
      statusEffects: []
    };
  });

  return true;
}

function swapSpireCampUnits(indexA, indexB) {
  if (indexA < 0 || indexA >= spireState.expedition.length) return;
  if (indexB < 0 || indexB >= spireState.expedition.length) return;
  if (indexA === indexB) return;

  const unitA = spireState.expedition[indexA];
  const unitB = spireState.expedition[indexB];

  if ((indexB < 6 && unitA.isFallen) || (indexA < 6 && unitB.isFallen)) {
    showSpireToast("Fallen champions cannot be placed into Vanguard or Reserves until revived!");
    return;
  }

  spireState.expedition[indexA] = unitB;
  spireState.expedition[indexB] = unitA;
  unitA.expeditionIndex = indexB;
  unitB.expeditionIndex = indexA;

  playSound('coin');
  renderSpireCampUI();
}

function generateSpireEnemyEncounter(floorNumber) {
  const biome = getSpireBiome(floorNumber);
  const isBossFloor = SPIRE_CONFIG.bossFloors.includes(floorNumber);
  const isElite = (spireState.currentNodeType === "elite");
  const scalingFactor = 1.0 + (floorNumber - 1) * 0.075;

  const validCards = (typeof CARD_DATABASE !== 'undefined') ? CARD_DATABASE : [];
  const enemies = [];

  for (let i = 0; i < 6; i++) {
    let candidate = validCards[Math.floor(Math.random() * validCards.length)];

    if ((isBossFloor || isElite) && Math.random() < 0.65) {
      const match = validCards.filter(c => c.element === biome.element);
      if (match.length > 0) candidate = match[Math.floor(Math.random() * match.length)];
    }

    const isBossMinion = isBossFloor;
    const pvMult = isBossMinion ? 1.70 : (isElite ? 1.45 : 1.0);
    const defMult = isBossMinion ? 1.40 : (isElite ? 1.25 : 1.0);

    const basePv = Math.round((candidate.basePV || 140) * scalingFactor * pvMult);
    const baseDef = Math.round((candidate.baseDEF || 18) * scalingFactor * defMult);

    enemies.push({
      ...candidate,
      name: (i === 0 && isBossFloor) ? biome.boss.name : candidate.name,
      pv: basePv,
      maxPv: basePv,
      def: baseDef,
      energy: isBossMinion ? 1 : 0,
      maxEnergy: 3,
      statusEffects: [],
      isRainbow: floorNumber >= 10 && Math.random() < (0.25 + (floorNumber / 30) * 0.50),
      level: Math.min(30, Math.max(1, Math.round(floorNumber)))
    });
  }

  return {
    vanguard: enemies.slice(0, 3),
    reserves: enemies.slice(3, 6),
    biome,
    isBossFloor,
    isElite
  };
}

function selectSpireBranchNode(branchIndex) {
  const chosen = spireState.upcomingBranches[branchIndex];
  if (!chosen) return;

  spireState.currentNodeType = chosen.type;
  showSpireToast(`Approaching ${chosen.title}...`);

  if (chosen.type === "sanctuary") {
    openShrineOfRenewalModal();
  } else if (chosen.type === "merchant") {
    openSpireSmugglerShopModal();
  } else if (chosen.type === "mystery") {
    openSpireMysteryCacheModal();
  } else {
    // Combat floor (skirmish / elite / boss)
    launchSpireFloorBattle();
  }
}

function launchSpireFloorBattle() {
  const livingVanguard = spireState.activeIndices
    .map(idx => spireState.expedition[idx])
    .filter(u => u && !u.isFallen && u.pv > 0);

  if (livingVanguard.length === 0) {
    showSpireToast("No living champions in Vanguard! Swap in healthy allies from Camp Bench.");
    return;
  }

  const encounter = generateSpireEnemyEncounter(spireState.currentFloor);
  spireState.currentEnemyField = encounter.vanguard;
  spireState.currentEnemyReserve = encounter.reserves;
  spireState.currentBossData = encounter.isBossFloor ? encounter.biome.boss : null;

  // Reset Boss combat tracking state
  spireState.bossCombatState = {
    phase: 1,
    shieldTurnCounter: 0,
    banterFired: false,
    airborneTimer: 0
  };

  if (typeof battleEngine !== 'undefined') {
    battleEngine.matchMode = 'spire';
    battleEngine.spireBiome = encounter.biome;
    battleEngine.spireBoss = encounter.isBossFloor ? encounter.biome.boss : null;

    // FIX: clone with a fresh statusEffects array. The shallow copy used to share the roster unit's array,
    // so statuses applied in battle (Burn, Bleed, ...) stayed on the unit on every later floor.
    battleEngine.playerField = spireState.activeIndices.map(idx => {
      const unit = spireState.expedition[idx];
      return unit && !unit.isFallen ? { ...unit, statusEffects: [] } : null;
    });

    battleEngine.playerReserve = spireState.reserveIndices.map(idx => {
      const unit = spireState.expedition[idx];
      return unit && !unit.isFallen ? { ...unit, statusEffects: [] } : null;
    }).filter(Boolean);

    battleEngine.enemyField = encounter.vanguard;
    battleEngine.enemyReserve = encounter.reserves;

    applySpireBiomeHazardToBattle(encounter.biome, battleEngine.playerField, battleEngine.enemyField);
    applySpireRelicsToBattle(battleEngine.playerField, battleEngine.playerReserve);

    // Apply Boss Signature Battle-Start passives
    if (encounter.isBossFloor && encounter.biome.boss.id === 'boss_aurelion') {
      battleEngine.enemyField[0].energy = 2; // Aurelion Phase 1 begins with +2 Pips
    }

    if (typeof switchTab === 'function') switchTab('battle');
    if (typeof renderCombatField === 'function') renderCombatField();
    if (typeof updateReserveDots === 'function') updateReserveDots();

    // Render In-Battle Emergency Satchel Toolbar
    renderSpireCombatSatchelHUD();

    if (typeof runCoinTossModal === 'function') runCoinTossModal();
  }
}

function applySpireBiomeHazardToBattle(biome, playerField, enemyField) {
  if (!biome || !biome.hazard) return;
  const h = biome.hazard;

  if (h.type === 'debuff_def') {
    [...(playerField || []), ...(enemyField || [])].forEach(u => {
      if (u) u.def = Math.max(1, (u.def || 10) - (h.value || 6));
    });
  }

  // Active campfire meal buff application
  if (spireState.rationsCooked) {
    const meal = spireState.rationsCooked;
    const mealMult = 1.0 + ((spireArchive.upgrades.hardenedRations || 0) * 0.25);
    (playerField || []).forEach(u => {
      if (u && meal.type === 'stat_def') u.def += Math.round(meal.value * mealMult);
      if (u && meal.type === 'bonus_energy') u.energy = Math.min(3, (u.energy || 0) + meal.value);
    });
  }
}

function applySpireRelicsToBattle(activeField, reserveField) {
  const allUnits = [...(activeField || []), ...(reserveField || [])];

  spireState.relics.forEach(relic => {
    switch (relic.effectType) {
      case "start_energy":
        (activeField || []).forEach(u => {
          if (u) u.energy = Math.min(u.maxEnergy, (u.energy || 0) + relic.value);
        });
        break;
      case "flat_def":
        allUnits.forEach(u => {
          if (u) u.def = Math.round((u.def || 10) + relic.value);
        });
        break;
      case "floor_start_shield":
        (activeField || []).forEach(u => {
          if (u && u.pv > 0) {
            const shVal = Math.round(u.maxPv * (relic.value || 0.25));
            u.pv += shVal;
            u.maxPv += shVal;
          }
        });
        break;
      case "cursed_tempo":
        (activeField || []).forEach(u => {
          if (u) u.energy = Math.min(3, (u.energy || 0) + (relic.energyBonus || 2));
        });
        break;
      case "cursed_fortress":
        allUnits.forEach(u => {
          if (u) u.def += (relic.defBonus || 45);
        });
        break;
    }
  });
}

// In-Battle Floating Satchel Toolbar
function renderSpireCombatSatchelHUD() {
  let hud = document.getElementById('spire-combat-satchel-hud');
  if (!hud) {
    hud = document.createElement('div');
    hud.id = 'spire-combat-satchel-hud';
    hud.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950/95 border border-amber-500/50 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-2xl backdrop-blur-md';
    document.body.appendChild(hud);
  }

  const satchelItems = spireState.satchel.map(id => SPIRE_CONSUMABLE_ITEMS.find(it => it.id === id)).filter(Boolean);

  hud.innerHTML = `
    <span class="text-[10px] font-black uppercase tracking-wider text-amber-400 font-cinzel">Satchel:</span>
    <div class="flex items-center gap-2">
      ${satchelItems.length === 0 ? '<span class="text-[11px] text-slate-500 italic">Satchel Empty</span>' : ''}
      ${satchelItems.map((item, idx) => `
        <button onclick="useSpireCombatConsumable(${idx})"
          class="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-bold text-slate-200 transition active:scale-95 shadow">
          <span>${item.icon}</span> <span>${escapeHtml(item.name)}</span>
        </button>
      `).join('')}
    </div>
  `;

  hud.classList.remove('hidden');
}

function hideSpireCombatSatchelHUD() {
  const hud = document.getElementById('spire-combat-satchel-hud');
  if (hud) hud.classList.add('hidden');
}

function useSpireCombatConsumable(itemIndex) {
  if (typeof battleEngine === 'undefined' || battleEngine.matchMode !== 'spire') return;
  const itemId = spireState.satchel[itemIndex];
  const item = SPIRE_CONSUMABLE_ITEMS.find(it => it.id === itemId);
  if (!item) return;

  if (item.id === 'item_elixir') {
    const lowestAlly = battleEngine.playerField.find(u => u && u.pv > 0 && u.pv < u.maxPv);
    if (!lowestAlly) {
      showSpireToast("All active vanguard champions are already at full health!");
      return;
    }
    const heal = item.action(lowestAlly);
    playSound('heal');
    if (typeof updateCardVisualStats === 'function') updateCardVisualStats('player', battleEngine.playerField.indexOf(lowestAlly));
    if (typeof showFloatingText === 'function') showFloatingText('player', battleEngine.playerField.indexOf(lowestAlly), `+${heal} ELIXIR`, 'text-emerald-300 font-black');
  } else if (item.id === 'item_battery') {
    const ally = battleEngine.playerField.find(u => u && u.pv > 0 && u.energy < 3);
    if (!ally) {
      showSpireToast("All active allies are already at maximum energy!");
      return;
    }
    item.action(ally);
    playSound('charge');
    if (typeof updateCardVisualStats === 'function') updateCardVisualStats('player', battleEngine.playerField.indexOf(ally));
    if (typeof showFloatingText === 'function') showFloatingText('player', battleEngine.playerField.indexOf(ally), `+2 PIPS (BATTERY)`, 'text-amber-300 font-black');
  } else if (item.id === 'item_cleanse') {
    item.action(battleEngine.playerField);
    playSound('rainbow');
    if (typeof showFloatingText === 'function') showFloatingText('player', 1, `CLEANSED!`, 'text-cyan-300 font-black');
  } else if (item.id === 'item_flashbang') {
    const leadEnemy = battleEngine.enemyField.find(u => u && u.pv > 0);
    if (leadEnemy) {
      item.action(leadEnemy);
      playSound('attack');
      if (typeof showFloatingText === 'function') showFloatingText('enemy', battleEngine.enemyField.indexOf(leadEnemy), `FLASH STUNNED!`, 'text-yellow-300 font-black');
    }
  } else if (item.id === 'item_smoke') {
    item.action(battleEngine.playerField);
    playSound('coin');
    if (typeof showFloatingText === 'function') showFloatingText('player', 1, `SMOKE VEIL (100% EVADE)`, 'text-slate-300 font-black');
  }

  // Consume item
  spireState.satchel.splice(itemIndex, 1);
  renderSpireCombatSatchelHUD();
}

function spireOnBattleComplete(playerWon) {
  if (typeof battleEngine === 'undefined') return;

  hideSpireCombatSatchelHUD();

  // Map of living combatants from both frontline and reserve by their expeditionIndex
  const survivingMap = new Map();
  [...battleEngine.playerField, ...battleEngine.playerReserve].forEach(card => {
    if (card && card.expeditionIndex !== undefined && card.pv > 0) {
      survivingMap.set(card.expeditionIndex, {
        pv: Math.min(card.maxPv, card.pv),
        energy: card.energy || 0
      });
    }
  });

  // Accurately update each unit in the 12-member expedition roster
  spireState.expedition.forEach((expUnit, expIdx) => {
    if (expIdx < 6) { // Unit participated in combat (Vanguard 0-2 or Reserve 3-5)
      if (survivingMap.has(expIdx)) {
        const survivor = survivingMap.get(expIdx);
        // FIX: the Aegis-style relics raise maxPv for the battle only, so clamp to the roster's real max
        expUnit.pv = Math.max(1, Math.min(expUnit.maxPv, survivor.pv));
        expUnit.energy = survivor.energy;
        expUnit.isFallen = false;
      } else {
        expUnit.pv = 0;
        expUnit.isFallen = true;
        spireState.totalCasualties++;
      }
    }
  });

  battleEngine.isResolving = false;
  // Always reset matchMode back to ranked so Arena mode is not blocked
  battleEngine.matchMode = 'ranked';

  if (!playerWon) {
    if (typeof switchTab === 'function') switchTab('spire');
    showSpireExpeditionOverModal(false);
    return;
  }

  spireState.floorsCleared++;
  const earnedEmbers = 18 + Math.round(spireState.currentFloor * 2.0);
  spireState.spireEmbers += earnedEmbers;

  // Passive regen relic trigger for bench
  const benchRegenRelic = spireState.relics.find(r => r.effectType === 'camp_passive_regen');
  if (benchRegenRelic) {
    spireState.expedition.forEach((u, i) => {
      if (i >= 3 && u && !u.isFallen && u.pv < u.maxPv) {
        const healAmt = Math.round(u.maxPv * benchRegenRelic.value);
        u.pv = Math.min(u.maxPv, u.pv + healAmt);
      }
    });
  }

  // Reset meal
  spireState.rationsCooked = null;

  // Milestone payouts at floors 5, 10, 15, 20, 25, 30
  if (SPIRE_CONFIG.bossFloors.includes(spireState.currentFloor) && typeof playerState !== 'undefined') {
    const goldP = spireState.currentFloor * 120;
    const rubyP = spireState.currentFloor * 5;
    playerState.gold += goldP;
    playerState.rubies += rubyP;
    if (typeof updateTopCurrencyUI === 'function') updateTopCurrencyUI();
    showSpireToast(`👑 Sovereign Defeated! Milestone Bounties: +${goldP} Gold & +${rubyP} Rubies awarded!`);
  }

  // Conquered all 30 floors!
  if (spireState.currentFloor >= SPIRE_CONFIG.maxFloors) {
    if (typeof switchTab === 'function') switchTab('spire');
    showSpireExpeditionOverModal(true);
    return;
  }

  // Advance floor & generate new branching paths
  spireState.currentFloor++;
  spireState.upcomingBranches = rollNextSpireBranches(spireState.currentFloor);

  if (typeof switchTab === 'function') switchTab('spire');
  renderSpireCampUI();

  if (typeof saveGameNow === 'function') saveGameNow();

  // Elite floors guarantee Epic/Legendary
  const isEliteClear = (spireState.currentNodeType === "elite");
  openSpireRelicDraftModal(isEliteClear);
}

// =====================================================================
// RELIC DRAFT WITH REROLL SUPPORT
// =====================================================================
function openSpireRelicDraftModal(guaranteeHighRarity = false) {
  const modal = document.getElementById('spire-relic-modal');
  const choicesContainer = document.getElementById('spire-relic-choices');
  if (!modal || !choicesContainer) return;

  const ownedIds = new Set(spireState.relics.map(r => r.id));
  let available = SPIRE_RELIC_POOL.filter(r => !ownedIds.has(r.id));

  if (guaranteeHighRarity) {
    const high = available.filter(r => r.rarity === 'Epic' || r.rarity === 'Legendary');
    if (high.length >= 3) available = high;
  }

  if (available.length === 0) {
    showSpireToast("Floor cleared! All expedition relics mastered.");
    renderSpireCampUI();
    return;
  }

  const rolled = [];
  const draftCount = Math.min(3, available.length);
  const tempPool = [...available];

  for (let i = 0; i < draftCount; i++) {
    const pickIdx = Math.floor(Math.random() * tempPool.length);
    rolled.push(tempPool.splice(pickIdx, 1)[0]);
  }

  const rerolls = spireState.freeRerollsRemaining || 0;
  const rerollBtnHTML = rerolls > 0
    ? `<button onclick="rerollSpireRelicDraft()" class="w-full mt-2 py-2 px-4 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-200 font-bold text-xs border border-purple-500/50 transition">🔄 Reshuffle Relics (${rerolls} Free Rerolls Left)</button>`
    : '';

  choicesContainer.innerHTML = rolled.map(relic => {
    const isCursed = relic.id.includes('cursed') || relic.effectType.startsWith('cursed');
    return `
      <div onclick="selectSpireRelic('${relic.id}')" class="cursor-pointer bg-slate-900 border ${isCursed ? 'border-purple-500/70 hover:border-purple-400 bg-purple-950/20' : 'border-slate-700 hover:border-amber-400'} p-4 rounded-2xl flex flex-col justify-between gap-3 transition transform active:scale-95 shadow-xl hover:shadow-amber-500/20">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-3xl">${relic.icon}</span>
            <span class="text-[9px] uppercase font-black px-2 py-0.5 rounded ${isCursed ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-950 text-amber-300 border border-slate-700'}">${relic.rarity}</span>
          </div>
          <h4 class="font-cinzel text-sm font-bold text-slate-100">${escapeHtml(relic.name)}</h4>
          <p class="text-xs text-slate-400 mt-1 leading-relaxed">${escapeHtml(relic.desc)}</p>
        </div>
        <button class="w-full py-1.5 rounded-xl ${isCursed ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'} font-black text-xs uppercase tracking-wider">
          Claim Relic
        </button>
      </div>
    `;
  }).join('') + rerollBtnHTML;

  modal.classList.remove('hidden');
}

function rerollSpireRelicDraft() {
  if (spireState.freeRerollsRemaining <= 0) return;
  spireState.freeRerollsRemaining--;
  playSound('rainbow');
  openSpireRelicDraftModal(false);
}

function selectSpireRelic(relicId) {
  const relic = SPIRE_RELIC_POOL.find(r => r.id === relicId);
  if (relic) {
    spireState.relics.push({ ...relic });
    playSound('rainbow');
  }

  const modal = document.getElementById('spire-relic-modal');
  if (modal) modal.classList.add('hidden');

  if (typeof switchTab === 'function') switchTab('spire');
  renderSpireCampUI();
}

// =====================================================================
// SANCTUARY & RESTING OVERHAUL
// =====================================================================
function openShrineOfRenewalModal() {
  const modal = document.getElementById('spire-shrine-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
}

function resolveShrineChoice(choiceType) {
  const modal = document.getElementById('spire-shrine-modal');
  if (modal) modal.classList.add('hidden');

  if (choiceType === 'heal') {
    spireState.expedition.forEach(unit => {
      if (unit && !unit.isFallen) {
        const healAmt = Math.round(unit.maxPv * SPIRE_CONFIG.shrineHealPct);
        unit.pv = Math.min(unit.maxPv, unit.pv + healAmt);
      }
    });
    playSound('heal');
    showSpireToast("The sacred font healed all living squad members for 35% PV!");
  } else if (choiceType === 'revive') {
    const fallen = spireState.expedition.find(u => u && u.isFallen);
    if (fallen) {
      fallen.isFallen = false;
      fallen.pv = Math.round(fallen.maxPv * 0.50);
      playSound('rainbow');
      showSpireToast(`Sacred waters revived ${fallen.name} with 50% PV!`);
    } else {
      showSpireToast("No fallen allies to revive; stamina restored instead.");
    }
  } else if (choiceType === 'bless') {
    if (typeof playerState !== 'undefined') {
      playerState.gold += 350;
      playerState.rubies += 30;
      if (typeof updateTopCurrencyUI === 'function') updateTopCurrencyUI();
    }
    playSound('coin');
    showSpireToast("Shrine blessing granted +350 Gold & +30 Rubies!");
  }

  spireState.currentFloor++;
  spireState.upcomingBranches = rollNextSpireBranches(spireState.currentFloor);
  renderSpireCampUI();
}

// =====================================================================
// INTERACTIVE MYSTERY ANOMALIES (MULTI-CHOICE DILEMMAS)
// =====================================================================
const SPIRE_MYSTERY_EVENTS = [
  {
    title: "The Petrified Seraph",
    icon: "🪽",
    narrative: "An ancient cosmic seraph lies frozen in volcanic glass, its petrified hands gripping an intact primordial relic.",
    choices: [
      {
        label: "Pry the Relic Free",
        desc: "Claim 1 random Legendary Relic, but active Vanguard takes 25% current PV kinetic recoil damage.",
        action: () => {
          const legRelics = SPIRE_RELIC_POOL.filter(r => r.rarity === 'Legendary');
          const chosen = legRelics[Math.floor(Math.random() * legRelics.length)];
          spireState.relics.push({ ...chosen });
          spireState.activeIndices.forEach(idx => {
            const u = spireState.expedition[idx];
            if (u && !u.isFallen) u.pv = Math.max(1, Math.round(u.pv * 0.75));
          });
          showSpireToast(`Pried free ${chosen.name}! Frontline suffered 25% recoil damage.`);
        }
      },
      {
        label: "Offer Respects",
        desc: "Cleanse all negative afflictions from the battalion and discover 90 Spire Embers.",
        action: () => {
          spireState.spireEmbers += 90;
          spireState.expedition.forEach(u => { if (u) u.statusEffects = []; });
          showSpireToast("Cleansed afflictions and received 90 Spire Embers!");
        }
      }
    ]
  },
  {
    title: "The Cursed Abyssal Fountain",
    icon: "⛲",
    narrative: "Deep violet water bubbles with volatile ley-energy, radiating both restorative vigor and corrosive decay.",
    choices: [
      {
        label: "Drink Deeply",
        desc: "All active Vanguard champions start with +1 Energy Pip for 3 floors, but lose -12 flat DEF.",
        action: () => {
          spireState.activeIndices.forEach(idx => {
            const u = spireState.expedition[idx];
            if (u) {
              u.energy = Math.min(3, (u.energy || 0) + 1);
              u.def = Math.max(1, u.def - 12);
            }
          });
          showSpireToast("Drank deeply: Gained +1 Starting Pip, but suffered -12 DEF.");
        }
      },
      {
        label: "Bottle a Sample",
        desc: "Store a Flashbang Powder and an Elixir of Vitality into your Expedition Satchel.",
        action: () => {
          spireState.satchel.push("item_flashbang", "item_elixir");
          showSpireToast("Bottled tactical reagents into your satchel!");
        }
      }
    ]
  },
  {
    title: "Trapped Wandering Mercenary",
    icon: "⚔️",
    narrative: "A battle-hardened wanderer is pinned beneath collapsed obsidian rubble, clutching a pouch of spoils.",
    choices: [
      {
        label: "Rescue & Tend Wounds",
        desc: "Spend 30 Embers to pull them free. Restores 30% Max PV across all 12 battalion members.",
        action: () => {
          spireState.spireEmbers = Math.max(0, spireState.spireEmbers - 30);
          spireState.expedition.forEach(u => {
            if (u && !u.isFallen) u.pv = Math.min(u.maxPv, u.pv + Math.round(u.maxPv * 0.30));
          });
          showSpireToast("Rescued the wanderer! Battalion restored by +30% PV.");
        }
      },
      {
        label: "Loot Equipment",
        desc: "Extract 500 Gold, 25 Rubies, and 60 Spire Embers from the surrounding rubble.",
        action: () => {
          if (typeof playerState !== 'undefined') {
            playerState.gold += 500;
            playerState.rubies += 25;
            if (typeof updateTopCurrencyUI === 'function') updateTopCurrencyUI();
          }
          spireState.spireEmbers += 60;
          showSpireToast("Looted 500 Gold, 25 Rubies, and 60 Spire Embers!");
        }
      }
    ]
  }
];

function openSpireMysteryCacheModal() {
  const modal = document.getElementById('spire-mystery-modal') || createSpireMysteryModal();
  const event = SPIRE_MYSTERY_EVENTS[Math.floor(Math.random() * SPIRE_MYSTERY_EVENTS.length)];

  document.getElementById('spire-mystery-title').innerText = event.title;
  document.getElementById('spire-mystery-narrative').innerText = event.narrative;

  const choicesContainer = document.getElementById('spire-mystery-choices');
  choicesContainer.innerHTML = event.choices.map((c, i) => `
    <button onclick="resolveSpireMysteryChoice(${i})"
      class="p-4 rounded-2xl bg-slate-950/80 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-400 transition text-left flex flex-col gap-1 active:scale-95 shadow">
      <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
        <span>✦</span> <span>${escapeHtml(c.label)}</span>
      </span>
      <span class="text-[11px] text-slate-300 leading-snug">${escapeHtml(c.desc)}</span>
    </button>
  `).join('');

  modal._currentEvent = event;
  modal.classList.remove('hidden');
}

function createSpireMysteryModal() {
  const modalEl = document.createElement('div');
  modalEl.id = 'spire-mystery-modal';
  modalEl.className = 'fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 hidden';

  modalEl.innerHTML = `
    <div class="bg-slate-900 border border-indigo-500/40 p-6 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col gap-4">
      <div class="text-center">
        <span class="text-4xl mb-1 block">💎</span>
        <h3 id="spire-mystery-title" class="font-cinzel text-xl font-black text-amber-300">Mysterious Anomaly</h3>
        <p id="spire-mystery-narrative" class="text-xs text-slate-300 mt-1 leading-relaxed"></p>
      </div>

      <div id="spire-mystery-choices" class="flex flex-col gap-2.5 my-2"></div>
    </div>
  `;

  document.body.appendChild(modalEl);
  return modalEl;
}

function resolveSpireMysteryChoice(choiceIndex) {
  const modal = document.getElementById('spire-mystery-modal');
  if (!modal || !modal._currentEvent) return;

  const choice = modal._currentEvent.choices[choiceIndex];
  if (choice && choice.action) choice.action();

  modal.classList.add('hidden');
  playSound('rainbow');

  spireState.currentFloor++;
  spireState.upcomingBranches = rollNextSpireBranches(spireState.currentFloor);
  renderSpireCampUI();
}

// =====================================================================
// WANDERING SMUGGLER (MERCHANT SHOP)
// =====================================================================
function openSpireSmugglerShopModal() {
  let modal = document.getElementById('spire-smuggler-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'spire-smuggler-modal';
    modal.className = 'fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4';
    document.body.appendChild(modal);
  }

  // Offer 2 random relics and consumables
  const ownedRelicIds = new Set(spireState.relics.map(r => r.id));
  const availableRelics = SPIRE_RELIC_POOL.filter(r => !ownedRelicIds.has(r.id)).slice(0, 3);

  modal.innerHTML = `
    <div class="bg-slate-900 border border-amber-500/40 p-6 rounded-3xl max-w-2xl w-full shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🛒</span>
          <div>
            <h3 class="font-cinzel text-lg font-black text-amber-300">The Spire Smuggler</h3>
            <span class="text-xs text-slate-400">Trade Spire Embers for survival assets</span>
          </div>
        </div>
        <div class="px-3 py-1 bg-slate-950 rounded-xl border border-amber-500/40 text-amber-300 font-bold text-xs">
          🔥 ${spireState.spireEmbers} Embers
        </div>
      </div>

      <!-- Consumables Offerings -->
      <div>
        <h4 class="font-cinzel text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Emergency Consumables</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          ${SPIRE_CONSUMABLE_ITEMS.slice(0, 3).map(it => `
            <div class="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-2">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-xl">${it.icon}</span>
                  <span class="text-[10px] font-bold text-amber-400">${it.cost} Embers</span>
                </div>
                <h5 class="text-xs font-bold text-slate-200 mt-1">${escapeHtml(it.name)}</h5>
                <p class="text-[10px] text-slate-400 leading-tight mt-0.5">${escapeHtml(it.desc)}</p>
              </div>
              <button onclick="buySpireSmugglerItem('${it.id}')" ${spireState.spireEmbers >= it.cost ? '' : 'disabled'}
                class="w-full py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-[10px] uppercase">
                Buy Item
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Relic Offerings -->
      <div>
        <h4 class="font-cinzel text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Black-Market Relics</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          ${availableRelics.map(r => `
            <div class="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-2">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-xl">${r.icon}</span>
                  <span class="text-[10px] font-bold text-amber-400">${r.cost} Embers</span>
                </div>
                <h5 class="text-xs font-bold text-slate-200 mt-1">${escapeHtml(r.name)}</h5>
                <p class="text-[10px] text-slate-400 leading-tight mt-0.5">${escapeHtml(r.desc)}</p>
              </div>
              <button onclick="buySpireSmugglerRelic('${r.id}')" ${spireState.spireEmbers >= r.cost ? '' : 'disabled'}
                class="w-full py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white font-black text-[10px] uppercase">
                Buy Relic
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800 flex justify-end">
        <button onclick="leaveSpireSmugglerShop()" class="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition">
          Leave Shop ➔
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function buySpireSmugglerItem(itemId) {
  const item = SPIRE_CONSUMABLE_ITEMS.find(it => it.id === itemId);
  if (!item || spireState.spireEmbers < item.cost) return;

  const maxSlots = 1 + (spireArchive.upgrades.pouchSlots || 0);
  if (spireState.satchel.length >= maxSlots) {
    showSpireToast(`Satchel is full (${maxSlots}/${maxSlots})! Upgrade capacity in the Spire Archive.`);
    return;
  }

  spireState.spireEmbers -= item.cost;
  spireState.satchel.push(item.id);
  playSound('coin');
  showSpireToast(`Purchased ${item.name}! Added to Expedition Satchel.`);
  openSpireSmugglerShopModal();
}

function buySpireSmugglerRelic(relicId) {
  const relic = SPIRE_RELIC_POOL.find(r => r.id === relicId);
  if (!relic || spireState.spireEmbers < relic.cost) return;

  spireState.spireEmbers -= relic.cost;
  spireState.relics.push({ ...relic });
  playSound('rainbow');
  showSpireToast(`Acquired ${relic.name}! Added to active artifacts.`);
  openSpireSmugglerShopModal();
}

function leaveSpireSmugglerShop() {
  const modal = document.getElementById('spire-smuggler-modal');
  if (modal) modal.classList.add('hidden');

  spireState.currentFloor++;
  spireState.upcomingBranches = rollNextSpireBranches(spireState.currentFloor);
  renderSpireCampUI();
}

// =====================================================================
// CAMPFIRE FIELD COOKING & FIELD MEDIC
// =====================================================================
function cookCampRations(mealType) {
  if (spireState.rationsCooked) {
    showSpireToast("A campfire meal is already prepared for the next battle!");
    return;
  }

  if (mealType === 'stew' && spireState.spireEmbers >= 40) {
    spireState.spireEmbers -= 40;
    spireState.rationsCooked = { name: "Hearty Obsidian Stew", type: "stat_def", value: 12 };
    playSound('heal');
    showSpireToast("Prepared Hearty Stew: Vanguard gains +12 DEF on the next floor!");
  } else if (mealType === 'tea' && spireState.spireEmbers >= 50) {
    spireState.spireEmbers -= 50;
    spireState.rationsCooked = { name: "Astral Herbal Infusion", type: "bonus_energy", value: 1 };
    playSound('charge');
    showSpireToast("Brewed Astral Tea: Vanguard starts the next floor with +1 bonus Pip!");
  } else if (mealType === 'broth' && spireState.spireEmbers >= 80) {
    spireState.spireEmbers -= 80;
    spireState.rationsCooked = { name: "Phoenix Broth", type: "death_shield", value: 0.35 };
    playSound('rainbow');
    showSpireToast("Brewed Phoenix Broth: Vanguard protected against the first fatal hit!");
  } else {
    showSpireToast("Not enough Spire Embers to prepare this campfire ration.");
    return;
  }

  renderSpireCampUI();
}

function applyFieldMedicBandage(targetSlotIdx) {
  const unit = spireState.expedition[targetSlotIdx];
  if (!unit || unit.isFallen) return;

  if (spireState.spireEmbers < 30) {
    showSpireToast("Requires 30 Spire Embers to bandage wounds!");
    return;
  }

  spireState.spireEmbers -= 30;
  const heal = Math.round(unit.maxPv * 0.25);
  unit.pv = Math.min(unit.maxPv, unit.pv + heal);
  playSound('heal');
  showSpireToast(`Field Medic bandaged ${unit.name} (+${heal} PV)!`);
  renderSpireCampUI();
}

function applyFieldMedicRevive(targetSlotIdx) {
  const unit = spireState.expedition[targetSlotIdx];
  if (!unit || !unit.isFallen) return;

  if (spireState.spireEmbers < 120) {
    showSpireToast("Requires 120 Spire Embers to defibrillate a fallen champion!");
    return;
  }

  spireState.spireEmbers -= 120;
  unit.isFallen = false;
  unit.pv = Math.round(unit.maxPv * 0.35);
  playSound('rainbow');
  showSpireToast(`Field Medic revived ${unit.name} with 35% PV!`);
  renderSpireCampUI();
}

function performCampfireRest() {
  if (spireState._restUsedFloor === spireState.currentFloor) {
    showSpireToast("Rest & Respite has already been conducted at this campsite!");
    return;
  }
  spireState._restUsedFloor = spireState.currentFloor;
  spireState.expedition.forEach(u => {
    if (u && !u.isFallen) {
      const heal = Math.round(u.maxPv * 0.15);
      u.pv = Math.min(u.maxPv, u.pv + heal);
    }
  });
  playSound('heal');
  showSpireToast("Rest & Respite concluded: All living champions restored by +15% PV!");
  renderSpireCampUI();
}

// =====================================================================
// QUICK-RESOLVE FLOOR CONTROLLER
// =====================================================================
function canQuickResolveSpireFloor() {
  if (!spireState.isActive || spireState.currentFloor > 10) return false;
  const floorType = getSpireFloorType(spireState.currentFloor);
  if (floorType.type === 'shrine' || floorType.type === 'boss' || floorType.type === 'mystery' || floorType.type === 'merchant') return false;

  const playerVanguardCp = spireState.activeIndices
    .map(idx => spireState.expedition[idx])
    .filter(u => u && !u.isFallen)
    .reduce((sum, u) => sum + ((u.pv || 150) + (u.def || 15) * 4), 0);

  const enemyEstimateCp = 160 * 3 * (1.0 + (spireState.currentFloor - 1) * 0.075);
  return playerVanguardCp >= (enemyEstimateCp * 1.50);
}

function quickResolveSpireFloor() {
  if (!canQuickResolveSpireFloor()) return;

  spireState.activeIndices.forEach(idx => {
    const unit = spireState.expedition[idx];
    if (unit && !unit.isFallen) {
      const chip = Math.round(unit.maxPv * (0.02 + Math.random() * 0.03));
      unit.pv = Math.max(1, unit.pv - chip);
      unit.energy = Math.min(3, (unit.energy || 0) + 1);
    }
  });

  spireState.floorsCleared++;
  showSpireToast(`⚡ Quick Resolved Floor ${spireState.currentFloor} with overwhelming CP advantage!`);
  playSound('rainbow');

  spireState.currentFloor++;
  spireState.upcomingBranches = rollNextSpireBranches(spireState.currentFloor);
  renderSpireCampUI();
  openSpireRelicDraftModal(false);
}

// =====================================================================
// RENDER SPIRE CAMP UI
// =====================================================================
function renderSpireCampUI() {
  const floorTitle = document.getElementById('spire-floor-title');
  const biomeDesc = document.getElementById('spire-biome-desc');
  const relicBadges = document.getElementById('spire-active-relics');
  const campGrid = document.getElementById('spire-camp-grid');
  if (!campGrid) return;

  const biome = getSpireBiome();
  const floorType = getSpireFloorType();
  const canQuick = canQuickResolveSpireFloor();

  if (floorTitle) {
    floorTitle.innerHTML = `Floor ${spireState.currentFloor} / ${spireState.maxFloor} • <span class="text-amber-400 font-cinzel">${biome.icon} ${biome.name}</span> (${floorType.icon} ${floorType.label})`;
  }
  if (biomeDesc) {
    biomeDesc.innerText = `${biome.desc} Hazard: ${biome.hazard.name} — ${biome.hazard.desc}`;
  }

  // Branching Route Selector Tray
  let branchTray = document.getElementById('spire-branch-tray');
  if (!branchTray) {
    branchTray = document.createElement('div');
    branchTray.id = 'spire-branch-tray';
    branchTray.className = 'bg-slate-950/80 border border-indigo-500/40 p-4 rounded-3xl flex flex-col gap-3 shadow-xl';
    const campScreen = document.getElementById('spire-camp-screen');
    if (campScreen) campScreen.insertBefore(branchTray, campScreen.childNodes[1]);
  }

  const branches = spireState.upcomingBranches || [];
  branchTray.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <h4 class="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-wider">Choose Route for Next Floor</h4>
        <p class="text-[11px] text-slate-400">Select which node your battalion will approach.</p>
      </div>
      <span class="text-[10px] text-slate-500 font-mono">${branches.length} Routes Discovered</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      ${branches.map((b, i) => `
        <div onclick="selectSpireBranchNode(${i})"
          class="cursor-pointer bg-slate-900 border border-slate-700 hover:border-amber-400 p-3.5 rounded-2xl flex flex-col justify-between gap-2 shadow transition active:scale-95">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-2xl">${b.icon}</span>
              <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-950 text-amber-300 border border-slate-800">${b.type}</span>
            </div>
            <h5 class="font-cinzel text-xs font-bold text-slate-100 mt-1">${escapeHtml(b.title)}</h5>
            <p class="text-[10px] text-slate-400 mt-0.5 leading-snug">${escapeHtml(b.desc)}</p>
          </div>
          <button class="w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] uppercase">
            Head to ${escapeHtml(b.title)}
          </button>
        </div>
      `).join('')}
    </div>
  `;

  // Quick Resolve & Engage Button Bar
  const actionContainer = document.querySelector('#spire-camp-screen .shrink-0');
  if (actionContainer) {
    actionContainer.innerHTML = `
      ${canQuick ? `
        <button onclick="quickResolveSpireFloor()" class="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 flex items-center gap-1.5">
          <span>⚡</span> <span>Quick-Resolve</span>
        </button>
      ` : ''}
      <button onclick="abandonSpireExpedition()" class="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 text-xs font-bold border border-slate-700 transition">
        Abandon
      </button>
      <button onclick="launchSpireFloorBattle()" class="py-2.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 flex items-center gap-1.5">
        <span>⚔️</span> <span>Engage Floor</span>
      </button>
    `;
  }

  // Campfire Cooking & Field Medic Bar
  if (relicBadges) {
    const mealBadge = spireState.rationsCooked
      ? `<span class="px-2.5 py-1 rounded-full text-xs font-black border border-emerald-500/50 bg-emerald-950/70 text-emerald-300 shadow">🍲 Meal: ${spireState.rationsCooked.name}</span>`
      : '';

    relicBadges.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3 w-full">
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold border border-amber-500/40 bg-slate-900 text-amber-300 shadow">
            🔥 ${spireState.spireEmbers} Embers
          </span>
          ${mealBadge}
          ${spireState.relics.map(r => `
            <span class="px-2.5 py-1 rounded-full text-xs font-bold border border-amber-500/40 bg-slate-900 text-amber-300 flex items-center gap-1.5 shadow" title="${r.desc}">
              <span>${r.icon}</span> <span>${escapeHtml(r.name)}</span>
            </span>
          `).join('')}
        </div>

        <!-- Campfire Action Buttons -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button onclick="cookCampRations('stew')" class="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-amber-300 border border-slate-800">
            🍲 Stew (40🔥)
          </button>
          <button onclick="cookCampRations('tea')" class="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-amber-300 border border-slate-800">
            🍵 Tea (50🔥)
          </button>
          <button onclick="cookCampRations('broth')" class="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-amber-300 border border-slate-800">
            🔥 Broth (80🔥)
          </button>
          <button onclick="performCampfireRest()" class="px-2.5 py-1 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-[11px] font-bold text-emerald-300 border border-emerald-700/50">
            ⛺ Rest (+15% PV)
          </button>
        </div>
      </div>
    `;
  }

  // 12-Unit Camp Grid with Field Medic controls
  campGrid.innerHTML = spireState.expedition.map((unit, idx) => {
    const isVanguard = idx < 3;
    const isReserve = idx >= 3 && idx < 6;
    const roleTag = isVanguard
      ? '<span class="bg-emerald-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded font-cinzel">VANGUARD</span>'
      : isReserve
        ? '<span class="bg-cyan-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded font-cinzel">RESERVE</span>'
        : '<span class="bg-slate-800 text-slate-400 font-bold text-[9px] px-1.5 py-0.5 rounded font-cinzel">BENCH</span>';

    const hpPct = Math.round((unit.pv / unit.maxPv) * 100);
    const fallenOverlay = unit.isFallen
      ? '<div class="absolute inset-0 bg-slate-950/85 z-20 flex flex-col items-center justify-center rounded-2xl"><span class="text-rose-500 text-xs font-black">FALLEN</span><span class="text-[9px] text-slate-500">Requires Shrine or Medic Revive</span></div>'
      : '';

    return `
      <div class="relative bg-slate-950/80 border ${isVanguard ? 'border-emerald-500/50' : isReserve ? 'border-cyan-500/50' : 'border-slate-800'} p-3 rounded-2xl flex flex-col justify-between gap-2 shadow-md">
        ${fallenOverlay}
        <div>
          <div class="flex items-center justify-between gap-1 mb-1">
            ${roleTag}
            <span class="text-[10px] text-slate-400 font-mono">Slot ${idx + 1}</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <img src="${unit.image}" onerror="this.src='https://placehold.co/80x80/1e293b/94a3b8?text=Unit'" class="w-10 h-10 rounded-xl object-cover border border-slate-700">
            <div class="overflow-hidden">
              <h5 class="font-cinzel text-xs font-bold text-slate-200 truncate">${escapeHtml(unit.name)}</h5>
              <span class="text-[10px] text-slate-400">${unit.element} · ${unit.role}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-[10px] font-bold mb-0.5">
            <span class="text-emerald-400">${unit.pv} / ${unit.maxPv} PV</span>
            <span class="text-amber-400">⚡ ${unit.energy}/3 Pips</span>
          </div>
          <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all" style="width:${hpPct}%"></div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-1 pt-1 border-t border-slate-800">
          <button onclick="promptSpireSlotSwap(${idx})" class="py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] transition">
            Swap Slot
          </button>
          ${unit.isFallen ? `
            <button onclick="applyFieldMedicRevive(${idx})" class="py-1 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-indigo-200 font-bold text-[10px] transition">
              Revive (120🔥)
            </button>
          ` : `
            <button onclick="applyFieldMedicBandage(${idx})" class="py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold text-[10px] transition">
              Bandage (30🔥)
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

let pendingSpireSwapSlot = null;

function promptSpireSlotSwap(slotIndex) {
  if (pendingSpireSwapSlot === null) {
    pendingSpireSwapSlot = slotIndex;
    showSpireToast(`Selected Slot ${slotIndex + 1}. Now tap another slot to swap positions.`);
  } else {
    const from = pendingSpireSwapSlot;
    pendingSpireSwapSlot = null;
    swapSpireCampUnits(from, slotIndex);
  }
}

// =====================================================================
// SPIRE ARCHIVE MODAL (META-PROGRESSION)
// =====================================================================
function openSpireArchiveModal() {
  loadSpireArchive();
  let modal = document.getElementById('spire-archive-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'spire-archive-modal';
    modal.className = 'fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-slate-900 border border-purple-500/40 p-6 rounded-3xl max-w-3xl w-full shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🔮</span>
          <div>
            <h3 class="font-cinzel text-lg font-black text-purple-200">The Spire Archive</h3>
            <span class="text-xs text-slate-400">Unlock permanent talents using Astral Memory</span>
          </div>
        </div>
        <div class="px-4 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-300 font-black text-xs font-mono">
          ✦ ${spireArchive.astralMemory} Astral Memory
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        ${Object.keys(ARCHIVE_UPGRADE_CONFIG).map(key => {
          const cfg = ARCHIVE_UPGRADE_CONFIG[key];
          const curTier = spireArchive.upgrades[key] || 0;
          const isMax = curTier >= cfg.max;
          const cost = isMax ? null : cfg.costs[curTier];
          const canAfford = !isMax && spireArchive.astralMemory >= cost;

          return `
            <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3 shadow">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-2xl">${cfg.icon}</span>
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800">
                    Tier ${curTier} / ${cfg.max}
                  </span>
                </div>
                <h4 class="font-cinzel text-xs font-bold text-slate-100">${escapeHtml(cfg.name)}</h4>
                <p class="text-[11px] text-slate-400 mt-1 leading-relaxed">${escapeHtml(cfg.desc)}</p>
              </div>

              <button onclick="upgradeSpireArchive('${key}')" ${canAfford ? '' : 'disabled'}
                class="w-full py-2 rounded-xl ${isMax ? 'bg-slate-800 text-slate-500' : 'bg-purple-600 hover:bg-purple-500 text-white'} disabled:opacity-40 disabled:pointer-events-none font-bold text-xs uppercase tracking-wider transition">
                ${isMax ? 'Fully Mastered' : `Upgrade (${cost} ✦)`}
              </button>
            </div>
          `;
        }).join('')}
      </div>

      <div class="pt-3 border-t border-slate-800 flex justify-end">
        <button onclick="document.getElementById('spire-archive-modal').remove()" class="py-2 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function upgradeSpireArchive(key) {
  const cfg = ARCHIVE_UPGRADE_CONFIG[key];
  const curTier = spireArchive.upgrades[key] || 0;
  if (!cfg || curTier >= cfg.max) return;

  const cost = cfg.costs[curTier];
  if (spireArchive.astralMemory < cost) return;

  spireArchive.astralMemory -= cost;
  spireArchive.upgrades[key] = curTier + 1;
  saveSpireArchive();
  playSound('rainbow');
  openSpireArchiveModal();
  renderSpireMusterUI();
}

function showSpireExpeditionOverModal(victory) {
  const modal = document.getElementById('spire-result-modal');
  const title = document.getElementById('spire-result-title');
  const desc = document.getElementById('spire-result-desc');
  if (!modal) return;

  // Convert all unspent Embers into permanent Astral Memory
  const memoryEarned = Math.round(spireState.spireEmbers + (spireState.floorsCleared * 5));
  spireArchive.astralMemory += memoryEarned;
  saveSpireArchive();

  if (title) {
    title.innerText = victory ? "30-Floor Spire Conquered!" : "Expedition Broken";
    title.className = `font-cinzel text-2xl font-black ${victory ? 'text-amber-300' : 'text-rose-400'}`;
  }

  if (desc) {
    desc.innerHTML = `
      <p class="text-xs text-slate-300 mb-2">${victory ? 'Absolute legend! Your 12-champion battalion conquered all 6 biomes and the Celestial Sovereign Apex!' : `Your battalion fell at Floor ${spireState.currentFloor} / 30.`}</p>
      <div class="p-3 my-2 bg-purple-950/40 rounded-xl border border-purple-500/40 text-xs">
        <span class="text-purple-300 font-bold block">✦ +${memoryEarned} Astral Memory Converted!</span>
        <span class="text-[10px] text-slate-400">Invest in permanent traits in the Spire Archive.</span>
      </div>
      <button onclick="openCombatStatsModal()" class="w-full mb-2.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/40 shadow transition flex items-center justify-center gap-1.5 active:scale-95">
        <span>📊</span> <span>View Combat Statistics</span>
      </button>
    `;
  }

  modal.classList.remove('hidden');
}

function closeSpireResultModal() {
  const modal = document.getElementById('spire-result-modal');
  if (modal) modal.classList.add('hidden');
  spireState.isActive = false;
  spireMusterState.selectedCardIds = [];
  if (typeof switchTab === 'function') switchTab('spire');
  renderSpireView();
}

function showSpireToast(message) {
  const existing = document.getElementById('spire-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'spire-toast';
  toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-slate-100 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300';
  toast.innerText = message;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function getSpireRelicBonus(effectType) {
  if (!spireState.isActive || !Array.isArray(spireState.relics)) return 0;
  let total = 0;
  spireState.relics.forEach(r => {
    if (r.effectType === effectType) {
      total += (r.value || 0);
    }
  });
  return total;
}

function hasSpireRelic(effectType) {
  if (!spireState.isActive || !Array.isArray(spireState.relics)) return false;
  return spireState.relics.some(r => r.effectType === effectType);
}

function getSpireCritChanceBonus() {
  return getSpireRelicBonus('crit_chance');
}

function getSpireLifestealBonus() {
  return getSpireRelicBonus('lifesteal');
}

function getSpireCleaveBonus() {
  return getSpireRelicBonus('cleave_pct');
}

function getSpireReflectBonus() {
  let ref = getSpireRelicBonus('reflect_true_dmg');
  if (hasSpireRelic('cursed_fortress')) ref += 0.30;
  return ref;
}

function getSpireUltDmgBonus() {
  return getSpireRelicBonus('ult_dmg_boost');
}

function getSpireHealingMultiplierBonus() {
  return 1.0 + getSpireRelicBonus('healing_boost');
}

function getSpireElemAdvBonus() {
  return getSpireRelicBonus('elem_mult_boost');
}

function getSpireLowHpDmgBonus(card) {
  if (!card || !card.maxPv) return 1.0;
  if (hasSpireRelic('low_hp_dmg') && (card.pv / card.maxPv) <= 0.50) {
    return 1.30;
  }
  return 1.0;
}

function checkSpireDeathWardRevive(card, side, slotIndex) {
  if (!spireState.isActive || side !== 'player' || !card) return false;
  if (spireState.bossCombatState && spireState.bossCombatState.deathWardUsed) return false;

  const phial = spireState.relics.find(r => r.effectType === 'death_ward');
  if (!phial) return false;

  if (!spireState.bossCombatState) spireState.bossCombatState = {};
  spireState.bossCombatState.deathWardUsed = true;

  const restoredPv = Math.max(1, Math.round(card.maxPv * (phial.value || 0.35)));
  card.pv = restoredPv;
  card.statusEffects = [];

  if (typeof showFloatingText === 'function') {
    showFloatingText('player', slotIndex, `PHOENIX WARD (+${restoredPv} PV)`, 'text-amber-300 font-black text-lg');
  }
  if (typeof logBattleEvent === 'function') {
    logBattleEvent(`🔥 <b>${phial.name}:</b> <b>${card.name}</b> was saved from death and restored with ${restoredPv} PV!`);
  }
  if (typeof playSound === 'function') playSound('rainbow');

  return true;
}

function checkSpireOnKillRelicTriggers(killer, side) {
  if (!spireState.isActive || side !== 'player' || !killer) return;

  const nectar = spireState.relics.find(r => r.effectType === 'kill_heal');
  if (nectar && typeof battleEngine !== 'undefined') {
    const healPct = nectar.value || 0.15;
    battleEngine.playerField.forEach((ally, idx) => {
      if (ally && ally.pv > 0) {
        const heal = Math.max(1, Math.round(ally.maxPv * healPct));
        ally.pv = Math.min(ally.maxPv, ally.pv + heal);
        if (typeof updateCardVisualStats === 'function') updateCardVisualStats('player', idx);
        if (typeof showFloatingText === 'function') showFloatingText('player', idx, `+${heal} NECTAR`, 'text-emerald-400 font-bold');
      }
    });
    if (typeof logBattleEvent === 'function') {
      logBattleEvent(`🍯 <b>${nectar.name}:</b> Slaying the enemy restored 15% Max PV across the active vanguard!`);
    }
    if (typeof playSound === 'function') playSound('heal');
  }
}

// =====================================================================
// NON-INVASIVE SOVEREIGN BOSS COMBAT RUNTIME HOOKS
// =====================================================================
(function installSpireCombatHooks() {
  // 1. Turn Start Phase Hook (Shields, Flights, Hazard Checks)
  const originalTurnStart = window.executeTurnStartPhase;
  if (typeof originalTurnStart === 'function') {
    window.executeTurnStartPhase = function() {
      if (typeof battleEngine !== 'undefined' && battleEngine.matchMode === 'spire') {
        const floor = spireState.currentFloor;
        const boss = battleEngine.enemyField ? battleEngine.enemyField[0] : null;

        // Floor 5: Terrakor Tectonic Bastion
        if (floor === 5 && boss && boss.pv > 0) {
          spireState.bossCombatState.shieldTurnCounter++;
          if (spireState.bossCombatState.shieldTurnCounter % 4 === 0) {
            const barrier = Math.round(boss.maxPv * 0.25);
            boss.def += Math.round(barrier / 3);
            if (typeof showFloatingText === 'function') showFloatingText('enemy', 0, `+${barrier} BASTION`, 'text-cyan-300 font-bold');
            if (typeof logBattleEvent === 'function') logBattleEvent(`🗿 <b>Terrakor's Tectonic Bastion:</b> Erected an unassailable kinetic shield!`);
          }
        }

        // Floor 10: Zephyros Cyclone Dive Countdown (Turn 3 Flight, Turn 4 Dive)
        if (floor === 10 && boss && boss.pv > 0) {
          if (battleEngine.turnCount === 3 && !boss.isAirborne) {
            boss.isAirborne = true;
            boss._zephyrosDiving = true;
            if (typeof showFloatingText === 'function') showFloatingText('enemy', 0, 'AIRBORNE FLIGHT', 'text-sky-300 font-black');
            if (typeof logBattleEvent === 'function') logBattleEvent(`🦅 <b>Zephyros the Skyreaver</b> vaulted into the heavens! (Absolute Evasion)`);
          } else if (battleEngine.turnCount === 4 && boss._zephyrosDiving) {
            boss._zephyrosDiving = false;
            boss.isAirborne = false;
            const target = battleEngine.playerField.find(u => u && u.pv > 0) || battleEngine.playerField[0];
            if (target && target.pv > 0) {
              const crashDmg = Math.round(boss.maxPv * 0.35);
              target.pv = Math.max(0, target.pv - crashDmg);
              const tIdx = battleEngine.playerField.indexOf(target);
              if (typeof updateCardVisualStats === 'function') updateCardVisualStats('player', tIdx);
              if (typeof showFloatingText === 'function') showFloatingText('player', tIdx, `-${crashDmg} CYCLONE CRASH`, 'text-rose-500 font-black');
              if (typeof logBattleEvent === 'function') logBattleEvent(`🌪️ <b>Zephyros</b> crashed down with Cyclone Dive dealing ${crashDmg} True Damage!`);
            }
          }
        }
      }
      return originalTurnStart.apply(this, arguments);
    };
  }

  // 2. Status Affliction Interception
  const originalStatusEffect = window.applyStatusEffect;
  if (typeof originalStatusEffect === 'function') {
    window.applyStatusEffect = function(card, type, duration) {
      if (typeof battleEngine !== 'undefined' && battleEngine.matchMode === 'spire') {
        // Floor 15: Nerezza Abyssal Song
        if (spireState.currentFloor === 15 && card && battleEngine.playerField.includes(card) && Math.random() < 0.30) {
          originalStatusEffect.call(this, card, 'Freeze', 1);
        }
      }
      return originalStatusEffect.apply(this, arguments);
    };
  }
})();