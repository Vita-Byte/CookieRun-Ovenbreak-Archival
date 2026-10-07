const ELEMENT_CONFIG = {
  Fire:  { icon: '🔥', text: 'text-orange-400', border: 'border-orange-500/40', badgeBg: 'bg-orange-950/80' },
  Water: { icon: '💧', text: 'text-cyan-400',   border: 'border-cyan-500/40',   badgeBg: 'bg-cyan-950/80' },
  Wind:  { icon: '🌪️', text: 'text-emerald-400',border: 'border-emerald-500/40',badgeBg: 'bg-emerald-950/80' },
  Earth: { icon: '🌿', text: 'text-amber-500',  border: 'border-amber-600/40',  badgeBg: 'bg-amber-950/80' },
  Light: { icon: '☀️', text: 'text-yellow-300', border: 'border-yellow-400/40', badgeBg: 'bg-yellow-950/80' },
  Dark:  { icon: '🌑', text: 'text-purple-400', border: 'border-purple-600/40', badgeBg: 'bg-purple-950/80' }
};

const ROLE_ICONS = {
  Warrior: '⚔️', Knight: '🛡️', Paladin: '⚜️', Berserker: '🪓',
  Mage: '🔮', Warlock: '🕯️', Assassin: '🎯', Ranger: '🏹',
  Thief: '🗡️', Commander: '📯', Hexer: '🧿', Sentinel: '🏰',
  Spellbreaker: '⚡', Duelist: '🤺', Necromancer: '💀', Monk: '👊',
  Alchemist: '⚗️', Corsair: '🎲', Bard: '🎵', Cleric: '✨',
  Saboteur: '💣', Chronomancer: '⏳', Shaman: '🪶', Elementalist: '💠',
  Ravager: '🌀', Blight: '☣️', Bulwark: '🧱', Herald: '🎺', Priest: '🕊️',
  Dragoon: '🔱', Gladiator: '🪓', Valkyrie: '🪽', Inquisitor: '⚖️',
  Geomancer: '🌋', Mimic: '🎭', Dreadnought: '⚓', Sapper: '🪤', 
  Runesmith: '⚒️', Revenant: '⚰️', Maledictor: '🕯️'
};

function getElementalAdvantage(atkElem, defElem) {
  if (!atkElem || !defElem) return { mult: 1.0, label: '', counterMult: 1.0 };
  if (
    (atkElem === 'Fire' && defElem === 'Wind') ||
    (atkElem === 'Wind' && defElem === 'Earth') ||
    (atkElem === 'Earth' && defElem === 'Water') ||
    (atkElem === 'Water' && defElem === 'Fire')
  ) {
    return { mult: 1.25, label: 'ELEMENTAL ADVANTAGE (+25%)', counterMult: 0.85, isAdvantage: true };
  }
  if (
    (atkElem === 'Wind' && defElem === 'Fire') ||
    (atkElem === 'Earth' && defElem === 'Wind') ||
    (atkElem === 'Water' && defElem === 'Earth') ||
    (atkElem === 'Fire' && defElem === 'Water')
  ) {
    return { mult: 0.85, label: 'ELEMENTAL DISADVANTAGE (-15%)', counterMult: 1.15, isDisadvantage: true };
  }
  if ((atkElem === 'Light' && defElem === 'Dark') || (atkElem === 'Dark' && defElem === 'Light')) {
    return { mult: 1.25, label: 'OPPOSING ELEMENTS (+25%)', counterMult: 1.25, isAdvantage: true };
  }
  return { mult: 1.0, label: '', counterMult: 1.0 };
}

const RARITY_STATS = {
  Common:    { pv: 100, def: 8,  color: 'slate',  border: 'border-slate-500',  rubyUpgrade: 25 },
  Uncommon:  { pv: 130, def: 12, color: 'emerald',border: 'border-emerald-500',rubyUpgrade: 50 },
  Rare:      { pv: 175, def: 18, color: 'blue',   border: 'border-blue-500',   rubyUpgrade: 100 },
  Epic:      { pv: 230, def: 25, color: 'purple', border: 'border-purple-500', rubyUpgrade: 200 },
  Legendary: { pv: 300, def: 35, color: 'amber',  border: 'border-amber-500',  rubyUpgrade: 400 },
  Mythical:  { pv: 390, def: 48, color: 'rose',   border: 'border-rose-500',   rubyUpgrade: 800 }
};

const ROLE_SKILL_SCALING = {
  Knight:       { Common: 10, Uncommon: 15, Rare: 20, Epic: 25, Legendary: 35, Mythical: 50 },
  Cleric:       { Common: 5,  Uncommon: 7.5,Rare: 10, Epic: 13, Legendary: 17, Mythical: 22 },
  Paladin:      { Common: 15, Uncommon: 20, Rare: 26, Epic: 33, Legendary: 42, Mythical: 55 },
  Berserker:    { Common: 10, Uncommon: 14, Rare: 18, Epic: 23, Legendary: 30, Mythical: 40 },
  Mage:         { Common: 25, Uncommon: 35, Rare: 45, Epic: 55, Legendary: 70, Mythical: 85 },
  Warlock:      { Common: 15, Uncommon: 20, Rare: 26, Epic: 33, Legendary: 42, Mythical: 55 },
  Assassin:     { Common: 30, Uncommon: 45, Rare: 60, Epic: 80, Legendary: 110, Mythical: 150 },
  Warrior:      { Common: 15, Uncommon: 20, Rare: 25, Epic: 30, Legendary: 35, Mythical: 45 },
  WarriorRage:  { Common: 50, Uncommon: 60, Rare: 70, Epic: 80, Legendary: 90, Mythical: 100 },
  Commander:    { Common: 6,  Uncommon: 8,  Rare: 10, Epic: 13, Legendary: 17, Mythical: 22 },
  Hexer:        { Common: 15, Uncommon: 20, Rare: 25, Epic: 30, Legendary: 35, Mythical: 45 },
  Sentinel:     { Common: 15, Uncommon: 20, Rare: 25, Epic: 30, Legendary: 35, Mythical: 45 },
  Spellbreaker: { Common: 30, Uncommon: 40, Rare: 50, Epic: 65, Legendary: 80, Mythical: 100 },
  Duelist:      { Common: 40, Uncommon: 50, Rare: 60, Epic: 75, Legendary: 90, Mythical: 110 },
  NecromancerPV:  { Common: 6, Uncommon: 8, Rare: 10, Epic: 12, Legendary: 15, Mythical: 20 },
  NecromancerDEF: { Common: 2, Uncommon: 3, Rare: 4,  Epic: 6,  Legendary: 8,  Mythical: 12 },
  MonkBonusDmg: { Common: 6,  Uncommon: 7,  Rare: 8,  Epic: 10, Legendary: 12, Mythical: 15 },
  MonkBonusDef: { Common: 2,  Uncommon: 3,  Rare: 4,  Epic: 5,  Legendary: 6,  Mythical: 8 },
  Alchemist:    { Common: 4,  Uncommon: 6,  Rare: 8,  Epic: 10, Legendary: 12, Mythical: 15 },
  CorsairCrit:  { Common: 35, Uncommon: 38, Rare: 42, Epic: 46, Legendary: 50, Mythical: 55 },
  BardSiphonChance: { Common: 25, Uncommon: 28, Rare: 30, Epic: 35, Legendary: 40, Mythical: 50 },
  SaboteurTrapDmg:    { Common: 25, Uncommon: 35, Rare: 50, Epic: 70, Legendary: 95, Mythical: 130 },
  ChronomancerHaste:  { Common: 15, Uncommon: 18, Rare: 22, Epic: 26, Legendary: 32, Mythical: 40 },
  ShamanLeechPct:     { Common: 12, Uncommon: 15, Rare: 18, Epic: 22, Legendary: 26, Mythical: 32 },
  ElementalistPierce: { Common: 25, Uncommon: 30, Rare: 35, Epic: 42, Legendary: 50, Mythical: 60 },
  RavagerSplash:     { Common: 35, Uncommon: 40, Rare: 45, Epic: 50, Legendary: 55, Mythical: 65 },
  BlightNecrosisDef: { Common: 10, Uncommon: 12, Rare: 15, Epic: 18, Legendary: 22, Mythical: 28 },
  BulwarkShieldPct:  { Common: 12, Uncommon: 15, Rare: 18, Epic: 22, Legendary: 26, Mythical: 32 },
  HeraldDmgBuff:     { Common: 8,  Uncommon: 10, Rare: 12, Epic: 15, Legendary: 18, Mythical: 22 },
  PriestHeal:         { Common: 5,  Uncommon: 6.5, Rare: 8,  Epic: 10, Legendary: 12, Mythical: 15 },
  PriestReviveHp:     { Common: 25, Uncommon: 30,  Rare: 35, Epic: 42, Legendary: 50, Mythical: 60 },
  DragoonPierce:      { Common: 25, Uncommon: 30,  Rare: 35, Epic: 42, Legendary: 50, Mythical: 60 },
  DragoonPlunge:      { Common: 1.6,Uncommon: 1.85,Rare: 2.1,Epic: 2.4, Legendary: 2.7, Mythical: 3.1 },
  GladiatorArmorPen:  { Common: 12, Uncommon: 15,  Rare: 18, Epic: 22, Legendary: 26, Mythical: 32 },
  GladiatorCritBonus: { Common: 10, Uncommon: 12,  Rare: 15, Epic: 18, Legendary: 22, Mythical: 25 },
  ValkyrieAbsorbRatio:{ Common: 40, Uncommon: 46,  Rare: 52, Epic: 58, Legendary: 66, Mythical: 75 },
  InquisitorBuffBonus:  { Common: 10, Uncommon: 14, Rare: 18, Epic: 24, Legendary: 30, Mythical: 38 },
  GeomancerTrenchChip:  { Common: 8,  Uncommon: 10, Rare: 13, Epic: 16, Legendary: 20, Mythical: 25 },
  GeomancerCounterMit:  { Common: 15, Uncommon: 18, Rare: 22, Epic: 27, Legendary: 32, Mythical: 40 },
  MimicPotencyPct:      { Common: 60, Uncommon: 70, Rare: 80, Epic: 90, Legendary: 100, Mythical: 115 },
  DreadnoughtDefStack:  { Common: 4,  Uncommon: 6,  Rare: 8,  Epic: 10, Legendary: 12, Mythical: 15 },
  DreadnoughtThornsPct: { Common: 6,  Uncommon: 8,  Rare: 10, Epic: 12, Legendary: 15, Mythical: 18 },
  MaledictorCurse:   { Common: 20, Uncommon: 28, Rare: 36, Epic: 45, Legendary: 55, Mythical: 70 },
  SapperEmpChance:  { Common: 30, Uncommon: 40, Rare: 50, Epic: 60, Legendary: 75, Mythical: 90 },
  SapperPipDmg:     { Common: 25, Uncommon: 35, Rare: 50, Epic: 70, Legendary: 95, Mythical: 130 },
  SapperSplashDmg:  { Common: 40, Uncommon: 55, Rare: 75, Epic: 100, Legendary: 135, Mythical: 180 },
  RunesmithDef:      { Common: 4,  Uncommon: 6,  Rare: 8,  Epic: 10, Legendary: 13, Mythical: 16 },
  RevenantLeech:     { Common: 20, Uncommon: 25, Rare: 30, Epic: 38, Legendary: 48, Mythical: 60 }
};

const COMMANDER_ULT_ENERGY = 2;
const HEXER_STUN_TURNS = 2;
const BERSERKER_BONUS_MULT = 2;
const BERSERKER_ULT_BONUS = 0.80;
const THIEF_CHAIN_PCT = 0.5;

function getWarriorRetaliationReduction(card) {
  return (ROLE_SKILL_SCALING.Warrior[card.rarity] ?? 15) / 100;
}

function getWarriorRageMultiplier(card) {
  const maxBonus = (ROLE_SKILL_SCALING.WarriorRage[card.rarity] ?? 50) / 100;
  const missing = card.maxPv > 0 ? Math.min(1, Math.max(0, 1 - card.pv / card.maxPv)) : 0;
  return 1 + maxBonus * missing;
}

function getCommanderAura(field) {
  let best = 0;
  (field || []).forEach(c => {
    if (c && c.pv > 0 && c.role === 'Commander') {
      best = Math.max(best, (ROLE_SKILL_SCALING.Commander[c.rarity] ?? 6) / 100);
    }
  });
  return best;
}

const AQUA_POTENCY_BONUS = 0.25;

function getAquaPotencyMultiplier(side) {
  if (side !== 'player') return 1;
  const aquaActive = getActiveResonances(playerState.equippedDeckIds).some(r => r.element === 'Water');
  return aquaActive ? 1 + AQUA_POTENCY_BONUS : 1;
}

const PYRO_BURN_CHANCE = 0.20;
const PYRO_BURN_EXTRA_PCT = 0.02;
const TERRA_DEF_BONUS = 0.15;
const TERRA_ELEM_REDUCTION = 0.15;
const ABYSSAL_EXECUTE_THRESHOLD = 0.60;
const ABYSSAL_WOUNDED_THRESHOLD = 0.60;
const ABYSSAL_WOUNDED_BONUS = 0.15;

function isResonanceActive(side, element) {
  return side === 'player' && getActiveResonances(playerState.equippedDeckIds).some(r => r.element === element);
}

const RESONANCE_CONFIG = {
  Fire: {
    name: "Pyro Resonance",
    icon: "🔥",
    threshold: 2,
    badgeClass: "bg-orange-950/80 text-orange-300 border-orange-500/50",
    desc: "20% chance to Burn the target on attack. Burns your team inflicts deal +2% extra max PV each turn."
  },
  Water: {
    name: "Aqua Resonance",
    icon: "💧",
    threshold: 2,
    badgeClass: "bg-cyan-950/80 text-cyan-300 border-cyan-500/50",
    desc: "All Cleric heals & Warlock siphons gain +25% increased potency."
  },
  Wind: {
    name: "Zephyr Resonance",
    icon: "🌪️",
    threshold: 2,
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-500/50",
    desc: "20% chance to completely evade counterattacks."
  },
  Earth: {
    name: "Terra Resonance",
    icon: "🌿",
    threshold: 2,
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-600/50",
    desc: "+15% team DEF at the start of battle, and takes 15% less damage from attacks and counters that have elemental advantage over your team."
  },
  Light: {
    name: "Radiant Resonance",
    icon: "☀️",
    threshold: 2,
    badgeClass: "bg-yellow-950/80 text-yellow-200 border-yellow-400/50",
    desc: "All active frontline Light champions start combat with +1 Energy Pip."
  },
  Dark: {
    name: "Abyssal Resonance",
    icon: "🌑",
    threshold: 2,
    badgeClass: "bg-purple-950/80 text-purple-300 border-purple-500/50",
    desc: "Assassin normal-attack execute threshold rises to 60% PV; your whole team deals +15% damage to targets at or below 60% PV."
  }
};

function getActiveResonances(deckIds) {
  const counts = { Fire: 0, Water: 0, Wind: 0, Earth: 0, Light: 0, Dark: 0 };
  (deckIds || []).forEach(id => {
    const card = getCardBaseData(id);
    if (card && card.element && counts[card.element] !== undefined) {
      counts[card.element]++;
    }
  });

  const active = [];
  for (const [elem, count] of Object.entries(counts)) {
    if (count >= RESONANCE_CONFIG[elem].threshold) {
      active.push({ element: elem, count, ...RESONANCE_CONFIG[elem] });
    }
  }
  return active;
}

const PACK_LEVEL_TABLE = {
  1:  { unlockAt: 0,    cost: 300,  common: 75.0, uncommon: 20.0, rare: 5.0,  epic: 0.0,  legendary: 0.0,  mythical: 0.0, currencyChance: 10.0 },
  2:  { unlockAt: 50,   cost: 500,  common: 65.0, uncommon: 24.0, rare: 9.0,  epic: 2.0,  legendary: 0.0,  mythical: 0.0, currencyChance: 10.0 },
  3:  { unlockAt: 125,  cost: 700,  common: 55.0, uncommon: 27.0, rare: 13.0, epic: 4.5,  legendary: 0.5,  mythical: 0.0, currencyChance: 11.0 },
  4:  { unlockAt: 225,  cost: 900,  common: 46.0, uncommon: 28.0, rare: 17.0, epic: 7.5,  legendary: 1.5,  mythical: 0.0, currencyChance: 11.0 },
  5:  { unlockAt: 350,  cost: 1100, common: 38.0, uncommon: 29.0, rare: 20.0, epic: 10.5, legendary: 2.4,  mythical: 0.1, currencyChance: 12.0 },
  6:  { unlockAt: 500,  cost: 1300, common: 30.0, uncommon: 30.0, rare: 22.0, epic: 13.5, legendary: 4.0,  mythical: 0.5, currencyChance: 12.0 },
  7:  { unlockAt: 700,  cost: 1500, common: 24.0, uncommon: 28.0, rare: 24.0, epic: 17.0, legendary: 6.0,  mythical: 1.0, currencyChance: 13.0 },
  8:  { unlockAt: 950,  cost: 1700, common: 18.0, uncommon: 26.0, rare: 25.0, epic: 21.0, legendary: 8.0,  mythical: 2.0, currencyChance: 13.0 },
  9:  { unlockAt: 1250, cost: 1900, common: 12.0, uncommon: 23.0, rare: 26.0, epic: 25.0, legendary: 10.5, mythical: 3.5, currencyChance: 14.0 },
  10: { unlockAt: 1650, cost: 2100, common: 8.0,  uncommon: 19.0, rare: 26.0, epic: 28.0, legendary: 13.5, mythical: 5.5, currencyChance: 15.0 }
};

const RARITY_ORDER = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical'];
function rarityRank(rarity) { return RARITY_ORDER.indexOf(rarity); }

// REWRITTEN RANKED LADDER CONFIGURATION
const TIERS = [
  { name: "Bronze",   divisions: [3, 2, 1], starsPerDiv: 3, promoFormat: "bo3", winGold: [40, 60],   winRubies: [0, 1], color: "text-amber-600" },
  { name: "Silver",   divisions: [3, 2, 1], starsPerDiv: 3, promoFormat: "bo3", winGold: [75, 100],  winRubies: [1, 2], color: "text-slate-300" },
  { name: "Gold",     divisions: [3, 2, 1], starsPerDiv: 3, promoFormat: "bo3", winGold: [120, 160], winRubies: [2, 3], color: "text-amber-400" },
  { name: "Platinum", divisions: [4, 3, 2, 1], starsPerDiv: 4, promoFormat: "bo5", winGold: [180, 240], winRubies: [3, 5], color: "text-cyan-400" },
  { name: "Emerald",  divisions: [4, 3, 2, 1], starsPerDiv: 4, promoFormat: "bo5", winGold: [240, 300], winRubies: [4, 6], color: "text-emerald-400" },
  { name: "Ruby",     divisions: [5, 4, 3, 2, 1], starsPerDiv: 5, promoFormat: "bo5", winGold: [300, 380], winRubies: [5, 7], color: "text-rose-400" },
  { name: "Pearl",    divisions: [5, 4, 3, 2, 1], starsPerDiv: 5, promoFormat: "bo5", winGold: [380, 470], winRubies: [6, 9], color: "text-pink-300" },
  { name: "Diamond",  divisions: [5, 4, 3, 2, 1], starsPerDiv: 5, promoFormat: "bo5", winGold: [470, 580], winRubies: [8, 12], color: "text-blue-400" },
  { name: "Master",   divisions: [1], starsPerDiv: 999, promoFormat: null,  winGold: [650, 650], winRubies: [15, 15], color: "text-purple-400" }
];

function formatDivisionRoman(divNum) {
  const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];
  return ROMAN_NUMERALS[(Number(divNum) || 1) - 1] || "I";
}

const MASTER_TIER_INDEX = TIERS.length - 1;

// =====================================================================
// COMBAT SPEED & AUTO-BATTLE STATE
// =====================================================================
let currentCombatSpeed = 1;
let isAutoBattle = false;

function getCombatDelay(baseMs, mode) {
  const speedBtn = document.getElementById('btn-combat-speed');
  if (speedBtn) {
    if (mode === 'spire' || mode === 'showdown' || mode === 'calamity') {
      speedBtn.classList.remove('hidden');
    } else {
      speedBtn.classList.add('hidden');
      currentCombatSpeed = 1;
    }
  }

  if (mode === 'spire' || mode === 'showdown' || mode === 'calamity') {
    return Math.round(baseMs / currentCombatSpeed);
  }
  return baseMs;
}

function toggleCombatSpeed() {
  if (currentCombatSpeed === 1) currentCombatSpeed = 1.5;
  else if (currentCombatSpeed === 1.5) currentCombatSpeed = 2;
  else if (currentCombatSpeed === 2) currentCombatSpeed = 3;
  else currentCombatSpeed = 1;
  
  document.querySelectorAll('.speed-toggle-btn').forEach(btn => {
    btn.innerText = `⏩ x${currentCombatSpeed}`;
    if (currentCombatSpeed === 3) {
      btn.className = "speed-toggle-btn px-4 py-1.5 rounded-lg text-xs font-black transition bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50";
    } else if (currentCombatSpeed > 1) {
      btn.className = "speed-toggle-btn px-4 py-1.5 rounded-lg text-xs font-bold transition bg-indigo-600 text-white shadow";
    } else {
      btn.className = "speed-toggle-btn px-4 py-1.5 rounded-lg text-xs font-bold transition bg-slate-800 text-slate-400 hover:text-white";
    }
  });

  const mode = typeof battleEngine !== 'undefined' ? battleEngine.matchMode : 'showdown';
  if (mode === 'spire' || mode === 'showdown' || mode === 'sandbox_arena') {
    if (typeof showFloatingText === 'function' && battleEngine && battleEngine.playerField[1]) {
       showFloatingText('player', 1, `SPEED x${currentCombatSpeed}`, 'text-amber-300 font-black');
    }
  }
}

function toggleAutoBattle() {
  isAutoBattle = !isAutoBattle;
  document.querySelectorAll('.auto-toggle-btn').forEach(btn => {
    if (isAutoBattle) {
      btn.classList.remove('bg-slate-800', 'text-slate-400');
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-md', 'shadow-emerald-500/50');
    } else {
      btn.classList.add('bg-slate-800', 'text-slate-400');
      btn.classList.remove('bg-emerald-600', 'text-white', 'shadow-md', 'shadow-emerald-500/50');
    }
  });

  // Jumpstart standard arena/spire battle
  if (isAutoBattle && typeof battleEngine !== 'undefined' && battleEngine.turn === 'player' && !battleEngine.isResolving && isSideAlive('player')) {
     executePlayerAutoTurn();
  }
  // Jumpstart showdown boss battle
  if (isAutoBattle && typeof showdownState !== 'undefined' && !showdownState.isResolving && !showdownState.isOver) {
     const view = document.getElementById('view-showdown');
     if (view && !view.classList.contains('hidden')) {
        if (typeof showdownRunAutoTurnLoop === 'function') showdownRunAutoTurnLoop();
     }
  }
  // Jumpstart calamity auto-battle loop
  if (isAutoBattle && typeof calamityState !== 'undefined' && calamityState.isInBattle && !calamityState.isResolving) {
     if (typeof calamityRunAutoTurnLoop === 'function') calamityRunAutoTurnLoop();
  }
}

function executePlayerAutoTurn() {
  if (battleEngine.turn !== 'player' || !isSideAlive('player') || !isSideAlive('enemy')) return;

  const livingAttackers = [];
  battleEngine.playerField.forEach((c, idx) => {
    if (c && c.pv > 0 && !c.statusEffects.some(s => s.type === 'Stun')) livingAttackers.push(idx);
  });

  const livingTargets = [];
  battleEngine.enemyField.forEach((c, idx) => {
    if (c && c.pv > 0) livingTargets.push(idx);
  });

  if (livingAttackers.length === 0 || livingTargets.length === 0) {
    finishTurnCycle();
    return;
  }

  const attackerSlot = livingAttackers[Math.floor(Math.random() * livingAttackers.length)];
  const attackerUnit = battleEngine.playerField[attackerSlot];
  const isCharge = canUseCharge(attackerUnit);
  
  let targetSlot = -1;
  const tauntIdx = battleEngine.enemyField.findIndex(c => c && c.pv > 0 && c.statusEffects.some(s => s.type === 'Taunt'));

  if (tauntIdx !== -1) {
    targetSlot = tauntIdx;
  } else {
    if (attackerUnit.role === 'Assassin' || attackerUnit.role === 'Duelist') {
      let lowest = 999999;
      livingTargets.forEach(idx => {
        if (battleEngine.enemyField[idx].pv < lowest) { lowest = battleEngine.enemyField[idx].pv; targetSlot = idx; }
      });
    } else {
      targetSlot = livingTargets[Math.floor(Math.random() * livingTargets.length)];
    }
  }

  battleEngine.selectedAllySlot = attackerSlot;
  executeAttackSequence(attackerSlot, targetSlot, 'player', isCharge);
}

const ENEMY_TIER_RARITY_WEIGHTS = [
  { Common: 60, Uncommon: 30, Rare: 10, Epic: 0,  Legendary: 0,  Mythical: 0  },
  { Common: 40, Uncommon: 35, Rare: 20, Epic: 5,  Legendary: 0,  Mythical: 0  },
  { Common: 20, Uncommon: 35, Rare: 30, Epic: 12, Legendary: 3,  Mythical: 0  },
  { Common: 10, Uncommon: 25, Rare: 35, Epic: 22, Legendary: 7,  Mythical: 1  },
  { Common: 4,  Uncommon: 16, Rare: 35, Epic: 28, Legendary: 14, Mythical: 3  },
  { Common: 1,  Uncommon: 8,  Rare: 28, Epic: 35, Legendary: 22, Mythical: 6  },
  { Common: 0,  Uncommon: 4,  Rare: 20, Epic: 36, Legendary: 28, Mythical: 12 },
  { Common: 0,  Uncommon: 1,  Rare: 12, Epic: 30, Legendary: 37, Mythical: 20 },
  { Common: 0,  Uncommon: 0,  Rare: 5,  Epic: 20, Legendary: 45, Mythical: 30 }
];

const ENEMY_TIER_SCALING = [
  // Tier 0: Bronze (No Sigils)
  { levels: [1, 3],   enlightenment: [0, 0], awakenChance: 0,    sigilAlphaChance: 0.00, sigilOmegaChance: 0.00 },
  // Tier 1: Silver
  { levels: [1, 3],   enlightenment: [0, 0], awakenChance: 0,    sigilAlphaChance: 0.15, sigilOmegaChance: 0.00 },
  // Tier 2: Gold
  { levels: [2, 4],   enlightenment: [0, 0], awakenChance: 0,    sigilAlphaChance: 0.35, sigilOmegaChance: 0.00 },
  // Tier 3: Platinum
  { levels: [3, 5],   enlightenment: [0, 0], awakenChance: 0,    sigilAlphaChance: 0.60, sigilOmegaChance: 0.00 },
  // Tier 4: Emerald
  { levels: [5, 7],   enlightenment: [0, 0], awakenChance: 0,    sigilAlphaChance: 0.80, sigilOmegaChance: 0.20 },
  // Tier 5: Ruby
  { levels: [8, 10],  enlightenment: [0, 1], awakenChance: 0,    sigilAlphaChance: 1.00, sigilOmegaChance: 0.35 },
  // Tier 6: Pearl
  { levels: [11, 14], enlightenment: [0, 3], awakenChance: 0,    sigilAlphaChance: 1.00, sigilOmegaChance: 0.50 },
  // Tier 7: Diamond
  { levels: [16, 21], enlightenment: [1, 5], awakenChance: 0,    sigilAlphaChance: 1.00, sigilOmegaChance: 0.75 },
  // Tier 8: Master
  { levels: [22, 30], enlightenment: [3, 9], awakenChance: 0.25, sigilAlphaChance: 1.00, sigilOmegaChance: 1.00 }
];

function getEnemyRainbowChance(tierIdx) {
  return 0.05 + (tierIdx / (TIERS.length - 1)) * 0.65;
}

function pickWeightedRarity(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (const rarity of RARITY_ORDER) {
    roll -= (weights[rarity] || 0);
    if (roll <= 0) return rarity;
  }
  return 'Common';
}

function createDefaultStats() {
  return {
    rankedWins: 0,
    rankedLosses: 0,
    practiceWins: 0,
    practiceLosses: 0,
    currentStreak: 0,
    bestStreak: 0,
    goldFromBattles: 0,
    rubiesFromBattles: 0,
    startedAt: Date.now(),
    peakRank: { tierIndex: 0, division: 3, masterStars: 0 },
    recent: []
  };
}

function createDefaultSeason() {
  return {
    number: 1,
    startAt: Date.now(),
    peak: { tierIndex: 0, division: 3, masterStars: 0 },
    rankedWins: 0,
    rankedLosses: 0,
    goldEarned: 0,
    rubiesEarned: 0,
    cardUsage: {},      // e.g. { "c_eso": 12, "c_anna": 8 }
    roleUsage: {},      // e.g. { "Warrior": 14, "Mage": 9 }
    elementUsage: {},   // e.g. { "Fire": 20, "Dark": 12 }
    favoriteLineup: [], // Snapshot of most frequent 6-card squad
    history: []
  };
}

// Sub-tab state for Career view
let careerSubTab = 'overview'; // 'overview' | 'seasons'
let selectedRecapSeasonIdx = 0; // Index in season.history

function switchCareerSubTab(tab) {
  careerSubTab = tab;
  renderCareerUI();
}

function selectRecapSeason(idx) {
  selectedRecapSeasonIdx = idx;
  renderCareerUI();
}

// Track card, role, and element usage whenever a ranked or practice match starts
function trackSeasonSquadUsage(deckIds) {
  if (!playerState.season || !Array.isArray(deckIds)) return;
  const s = playerState.season;
  s.cardUsage = s.cardUsage || {};
  s.roleUsage = s.roleUsage || {};
  s.elementUsage = s.elementUsage || {};

  deckIds.forEach(id => {
    s.cardUsage[id] = (s.cardUsage[id] || 0) + 1;
    const base = getCardBaseData(id);
    if (base) {
      if (base.role) s.roleUsage[base.role] = (s.roleUsage[base.role] || 0) + 1;
      if (base.element) s.elementUsage[base.element] = (s.elementUsage[base.element] || 0) + 1;
    }
  });
}

// Expand normal arena presets to 9, add showdown 10-card presets (8 slots)
const playerState = {
  gold: 1400,
  rubies: 220,
  packLevel: 1,
  totalPacksOpened: 0,
  essence: 0,
  spotlight: { targetId: null, opensSinceTarget: 0 },
  equippedDeckIds: ["c_eso", "c_alistair", "c_anna", "c_flesselles", "c_cordelia", "c_lunalu"],
  // --- SHOWDOWN 10-CARD EQUIPPED LINEUP ---
  equippedShowdownDeckIds: ["c_eso", "c_alistair", "c_anna", "c_flesselles", "c_cordelia", "c_lunalu", "c_balurga", "u_johann", "r_amira", "c_bridgette"],
  ownedCards: [
    { cardId: "c_eso", isRainbow: false, level: 1 },
    { cardId: "c_alistair", isRainbow: false, level: 1 },
    { cardId: "c_anna", isRainbow: true, level: 1 },
    { cardId: "c_flesselles", isRainbow: false, level: 1 },
    { cardId: "c_cordelia", isRainbow: false, level: 1 },
    { cardId: "c_lunalu", isRainbow: false, level: 1 },
    { cardId: "c_balurga", isRainbow: false, level: 1 },
    { cardId: "u_johann", isRainbow: false, level: 1 },
    { cardId: "r_amira", isRainbow: false, level: 1 }
  ],
  ownedSummons: [{ summonId: "s_colossus" }],
  equippedSummonId: "s_colossus",
  showdownSummonGrid: ["s_colossus", null, null],
  equippedRelicIds: [null, null, null],
  ownedRelics: [
    { relicId: "rel_lion_crest", acquiredAt: Date.now() },
    { relicId: "rel_chalice_of_vigor", acquiredAt: Date.now() }
  ],
  deckSubTab: 'champions', // 'champions', 'showdown', 'summons'
  gachaSubTab: 'cards',
  collectionSubTab: 'champions',
  tierIndex: 0,
  division: 3,
  stars: 1,
  masterStars: 0,
  inPromotion: false,
  promoWins: 0,
  promoLosses: 0,
  deckPresets: Array.from({ length: 9 }, () => null),            // 9 Normal Presets
  showdownPresets: Array.from({ length: 8 }, () => null),        // 8 Showdown Presets
  stats: createDefaultStats(),
  season: createDefaultSeason(),
  soundEnabled: true,
  musicEnabled: true
};

// =====================================================================
// AUDIO AND MUSIC SYSTEM
// =====================================================================

// Pre-linked Epic Fantasy/Battle track from Pixabay
const bgmPlayer = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=epic-fantasy-adventure-111002.mp3');
bgmPlayer.loop = true;
bgmPlayer.volume = 0.25; // Balanced background volume

// Modern browsers block background audio until the user interacts with the page
let hasUserInteracted = false;
document.body.addEventListener('click', () => {
  if (!hasUserInteracted) {
    hasUserInteracted = true;
    if (playerState.musicEnabled) {
      bgmPlayer.play().catch(e => console.log("Music play prevented by browser policy:", e));
    }
  }
}, { once: true });

function updateMusicUI() {
  const musicToggleBtn = document.getElementById('btn-music-toggle');
  if (!musicToggleBtn) return;

  musicToggleBtn.classList.toggle('opacity-50', !playerState.musicEnabled);
  musicToggleBtn.classList.toggle('text-rose-400', !playerState.musicEnabled);
  musicToggleBtn.classList.toggle('text-slate-300', playerState.musicEnabled);

  if (playerState.musicEnabled && hasUserInteracted) {
    bgmPlayer.play().catch(e => console.log("Music play prevented:", e));
  } else {
    bgmPlayer.pause();
  }
}

const musicToggleBtn = document.getElementById('btn-music-toggle');
if (musicToggleBtn) {
  musicToggleBtn.addEventListener('click', () => {
    playerState.musicEnabled = !playerState.musicEnabled;
    hasUserInteracted = true;
    updateMusicUI();
    scheduleSave();
  });
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (!playerState.soundEnabled) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'attack') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'charge') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'counter') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.27);
    } else if (type === 'heal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.32);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'coin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'rainbow') {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2); gain2.connect(audioCtx.destination);
      osc.type = 'sine'; osc2.type = 'triangle';
      osc.frequency.setValueAtTime(440, now); osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
      osc2.frequency.setValueAtTime(659, now); osc2.frequency.exponentialRampToValueAtTime(1318, now + 0.4);
      gain.gain.setValueAtTime(0.2, now); gain2.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.45); gain2.gain.linearRampToValueAtTime(0.01, now + 0.45);
      osc.start(now); osc2.start(now);
      osc.stop(now + 0.5); osc2.stop(now + 0.5);
    }
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
}

function getCardBaseData(cardId) {
  return CARD_DATABASE.find(c => c.id === cardId) || CARD_DATABASE[0];
}

function getCardUpgradeCost(cardId) {
  const base = getCardBaseData(cardId);
  if (base.rubyUpgrade !== undefined) return base.rubyUpgrade;
  return (RARITY_STATS[base.rarity] || RARITY_STATS.Common).rubyUpgrade;
}

const MAX_CARD_LEVEL = 30;
const MAX_ENLIGHTENMENT = 10;
const ENLIGHTENMENT_BONUS_PER_LEVEL = 0.02;
const AWAKENING_BONUS = 0.15;
const BANK_COPY_ON_LEVEL_UP = false;

const ENLIGHTENMENT_COSTS = Array.from({ length: 8 }, (_, i) => ({ copies: 1, rubies: 30 + 10 * i }))
  .concat([{ copies: 2, rubies: 120 }, { copies: 3, rubies: 180 }]);
const AWAKENING_COST = { copies: 5, rubies: 350 };

function calculateCardStats(cardId, isRainbow, level, awakening) {
  const base = getCardBaseData(cardId);
  const rarityInfo = RARITY_STATS[base.rarity] || RARITY_STATS.Common;
  let pv = base.basePV !== undefined ? base.basePV : rarityInfo.pv;
  let def = base.baseDEF !== undefined ? base.baseDEF : rarityInfo.def;
  const rubyUpgrade = getCardUpgradeCost(cardId);

  if (isRainbow) {
    pv = Math.round(pv * 1.5);
    def = Math.round(def * 1.25);
  }

  const lvl = Math.max(1, Math.min(MAX_CARD_LEVEL, level || 1));
  if (lvl > 1) {
    const levelMult = 1 + (lvl - 1) * 0.02;
    pv = Math.round(pv * levelMult);
    def = Math.round(def * levelMult);
  }

  const enlightenment = (isRainbow && awakening)
    ? Math.max(0, Math.min(MAX_ENLIGHTENMENT, Math.floor(awakening.enlightenment || 0)))
    : 0;
  const awakened = !!(isRainbow && awakening && awakening.awakened && enlightenment >= MAX_ENLIGHTENMENT);
  if (enlightenment > 0 || awakened) {
    const bonusMult = (1 + enlightenment * ENLIGHTENMENT_BONUS_PER_LEVEL) * (awakened ? 1 + AWAKENING_BONUS : 1);
    pv = Math.round(pv * bonusMult);
    def = Math.round(def * bonusMult);
  }

  // 🌟 ORDER GUILD TREASURY PASSIVE BONUSES (Bastion DEF & Vitality PV)
  if (typeof getGuildPlayerStatBonuses === 'function') {
    const guildBonuses = getGuildPlayerStatBonuses();
    pv += guildBonuses.pvBonus;
    def += guildBonuses.defBonus;
  }

  // 🌟 RENTED MERCENARY CONTRACT BONUS INTEGRATION
  if (typeof getGuildRentedMercenaryBonus === 'function') {
    const mercBonus = getGuildRentedMercenaryBonus();
    if (mercBonus.statMult > 1.0) {
      pv = Math.round(pv * mercBonus.statMult) + mercBonus.flatPv;
      def = Math.round(def * mercBonus.statMult);
    }
  }

  return { 
    pv, 
    maxPv: pv, 
    def, 
    isRainbow, 
    level: lvl, 
    enlightenment,
    awakened,
    energy: 0, 
    maxEnergy: 3, 
    statusEffects: [], 
    element: base.element || 'Fire',
    chargeSkillName: base.chargeSkillName || 'Overdrive Cataclysm',
    rubyUpgrade,
    focusStacks: 0,
    soulsHarvested: 0,
    crescendoBuff: 0,
    crowdFavorStacks: 0,
    valhallaFuryStored: 0,
    isAirborne: false,
    dreadnoughtPressure: 0,
    mimicCopiedRole: null,
    mimicRoleTurnsRemaining: 0,
    ...base 
  };
}

function getCardCombatPower(cardId, isRainbow, level, awakening) {
  const stats = calculateCardStats(cardId, isRainbow, level, awakening);
  return Math.round(stats.pv + (stats.def * 4));
}

function calculateTeamPower(deckIds) {
  let total = 0;
  deckIds.forEach(id => {
    const owned = playerState.ownedCards.find(o => o.cardId === id);
    total += getCardCombatPower(id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
  });
  return total;
}

const battleEngine = {
  playerDeckPool: [],
  enemyDeckPool: [],
  playerField: [null, null, null],
  enemyField: [null, null, null],
  playerReserve: [],
  enemyReserve: [],
  turn: 'player',
  turnCount: 1,
  selectedAllySlot: null,
  attackMode: 'normal',
  isResolving: false,
  battleHistory: [],
  matchMode: 'ranked',
  practiceTier: 0,
  arenaSummon: null,
  enemyArenaSummon: null,
  enemyRelicIds: []
};

function logBattleEvent(msg) {
  battleEngine.battleHistory.unshift(msg);
  const logEl = document.getElementById('battle-latest-log');
  if (logEl) logEl.innerHTML = msg;
  
  const logContainer = document.getElementById('full-battle-log');
  if (logContainer) {
    const item = document.createElement('div');
    item.className = "p-2 rounded bg-slate-950/60 border border-slate-800 text-[11px]";
    item.innerHTML = msg;
    logContainer.prepend(item);
  }
}

function setAttackMode(mode) {
  battleEngine.attackMode = mode;
  const normalBtn = document.getElementById('btn-mode-normal');
  const chargeBtn = document.getElementById('btn-mode-charge');
  if (!normalBtn || !chargeBtn) return;

  if (mode === 'charge') {
    chargeBtn.className = "px-3 py-1 rounded-lg text-xs font-bold transition bg-amber-500 text-slate-950 shadow-md shadow-amber-500/50";
    normalBtn.className = "px-3 py-1 rounded-lg text-xs font-bold transition bg-slate-800 text-slate-400 hover:text-white";
    logBattleEvent(`⚡ <b>Ultimate Skill Mode Selected!</b> Target an enemy to unleash charge skill!`);
  } else {
    normalBtn.className = "px-3 py-1 rounded-lg text-xs font-bold transition bg-indigo-600 text-white shadow-md shadow-indigo-600/50";
    chargeBtn.className = "px-3 py-1 rounded-lg text-xs font-bold transition bg-slate-800 text-slate-400 hover:text-amber-300";
  }
}

// ---------------------------------------------------------------------------
// ROLE STATUS CONSUMERS (Guilt, Divine Ward, Spectral Vengeance, Immovable Wall, Grid Lockdown)
// ---------------------------------------------------------------------------

// Charge skills are blocked while Grid Locked (Sapper ultimate).
function canUseCharge(unit) {
  if (!unit) return false;
  if (unit.statusEffects && unit.statusEffects.some(s => s.type === 'GridLock')) return false;
  return unit.energy >= 3;
}

// All healing goes through here so Inquisitor's Guilt can siphon half of it to the Inquisitor's vanguard.
function applyHealing(unit, amount) {
  if (!unit || !(amount > 0)) return 0;
  let toUnit = amount;
  const guilt = unit.statusEffects && unit.statusEffects.find(s => s.type === 'Guilt');
  if (guilt && guilt.siphonSide) {
    const siphon = Math.round(amount * 0.5);
    const field = guilt.siphonSide === 'player' ? battleEngine.playerField : battleEngine.enemyField;
    let best = null, bestIdx = -1;
    field.forEach((c, i) => {
      if (c && c.pv > 0 && c.pv < c.maxPv) {
        const r = c.pv / c.maxPv;
        if (!best || r < best.r) { best = { c, r }; bestIdx = i; }
      }
    });
    if (best && siphon > 0) {
      best.c.pv = Math.min(best.c.maxPv, best.c.pv + siphon);
      toUnit = amount - siphon;
      updateCardVisualStats(guilt.siphonSide, bestIdx);
      showFloatingText(guilt.siphonSide, bestIdx, `+${siphon} GUILT TITHE`, 'text-emerald-300 font-bold');
    }
  }
  unit.pv = Math.min(unit.maxPv, unit.pv + toUnit);
  return toUnit;
}

// Divine Ward / Spectral Vengeance: survive a fatal blow at 1 PV. Returns true if the unit was saved.
function triggerFatalGuard(unit, side, slot) {
  if (!unit || unit.pv > 0 || !Array.isArray(unit.statusEffects)) return false;
  const spectral = unit.statusEffects.find(s => s.type === 'SpectralVengeance');
  if (spectral) {
    unit.pv = 1;
    updateCardVisualStats(side, slot);
    showFloatingText(side, slot, 'SPECTRAL: 1 PV', 'text-violet-300 font-black');
    logBattleEvent(`👻 <b>${unit.name}</b>'s Undying Vengeance refused to let it fall (1 PV)!`);
    return true;
  }
  const wardIdx = unit.statusEffects.findIndex(s => s.type === 'DivineWard');
  if (wardIdx !== -1) {
    unit.statusEffects.splice(wardIdx, 1);
    unit.pv = 1;
    updateCardVisualStats(side, slot);
    showFloatingText(side, slot, 'DIVINE WARD SAVED!', 'text-yellow-300 font-black');
    logBattleEvent(`🕊️ <b>Divine Ward</b> saved <b>${unit.name}</b> from a fatal blow (1 PV)!`);
    return true;
  }
  return false;
}

// Spectral Vengeance stores the damage the unit absorbs (never more than its PV above 1).
function storeSpectralDamage(unit, dmg, pvBefore) {
  if (!unit || !(dmg > 0)) return;
  const s = unit.statusEffects && unit.statusEffects.find(x => x.type === 'SpectralVengeance');
  if (s) s.stored = (s.stored || 0) + Math.min(dmg, Math.max(0, pvBefore - 1));
}

// Immovable Wall: a Bulwark under the wall absorbs half of the damage meant for its frontline allies.
function redirectWallDamage(target, field, side, dmg) {
  if (!(dmg > 1)) return dmg;
  const wallIdx = field.findIndex(c => c && c.pv > 0 && c !== target && c.statusEffects.some(s => s.type === 'ImmovableWall'));
  if (wallIdx === -1) return dmg;
  const wall = field[wallIdx];
  const moved = Math.round(dmg * 0.5);
  wall.pv = Math.max(0, wall.pv - moved);
  updateCardVisualStats(side, wallIdx);
  showFloatingText(side, wallIdx, `-${moved} INTERCEPT`, 'text-cyan-300 font-bold');
  recordCombatStat(wall, 'damageTaken', moved, side === 'player');
  logBattleEvent(`🧱 <b>${wall.name}</b> intercepted ${moved} damage meant for <b>${target.name}</b>!`);
  return dmg - moved;
}

function addCardEnergy(card, amount = 1) {
  if (!card || card.pv <= 0) return;

  // --- EMP LOCKOUT DEBUFF CHECK ---
  if (Array.isArray(card.statusEffects) && card.statusEffects.some(s => s.type === 'EmpLockout')) {
    return false; // Blocks energy gain completely while EMP locked out
  }

  const prev = card.energy;
  card.energy = Math.min(card.maxEnergy, card.energy + amount);
  const gained = card.energy - prev;

  // Inquisitor's Guilt: half of the Pips gained are siphoned to the Inquisitor's vanguard
  const guilt = Array.isArray(card.statusEffects) && card.statusEffects.find(s => s.type === 'Guilt');
  if (guilt && guilt.siphonSide && gained > 0 && !addCardEnergy._busy) {
    const field = guilt.siphonSide === 'player' ? battleEngine.playerField : battleEngine.enemyField;
    for (let i = 0; i < gained; i++) {
      if (Math.random() >= 0.5) continue;
      let lowest = null, lowIdx = -1;
      field.forEach((c, idx) => { if (c && c.pv > 0 && c.energy < c.maxEnergy && (!lowest || c.energy < lowest.energy)) { lowest = c; lowIdx = idx; } });
      if (!lowest) break;
      card.energy -= 1;
      addCardEnergy._busy = true;
      addCardEnergy(lowest, 1);
      addCardEnergy._busy = false;
      showFloatingText(guilt.siphonSide, lowIdx, '+1 PIP (GUILT)', 'text-yellow-300 font-bold');
    }
  }
  return card.energy > prev;
}

function applyStatusEffect(card, type, duration = 2) {
  if (!card || card.pv <= 0) return;
  const existing = card.statusEffects.find(s => s.type === type);
  if (existing) {
    existing.duration = Math.max(existing.duration, duration);
  } else {
    card.statusEffects.push({ type, duration });
  }
}

function updateCardVisualStats(side, slotIndex) {
  const card = side === 'player' ? battleEngine.playerField[slotIndex] : battleEngine.enemyField[slotIndex];
  const cardEl = document.getElementById(`${side}-card-${slotIndex}`);
  if (!cardEl || !card) return;

  const pvEl = cardEl.querySelector('.card-pv-display');
  const barEl = cardEl.querySelector('.card-hp-bar');
  const defEl = cardEl.querySelector('.card-def-display');

  if (pvEl) {
    pvEl.innerText = Math.max(0, card.pv);
    pvEl.classList.add('scale-110');
    setTimeout(() => pvEl.classList.remove('scale-110'), 250);
  }
  if (barEl) {
    const pct = Math.max(0, Math.min(100, (card.pv / card.maxPv) * 100));
    barEl.style.width = `${pct}%`;
  }
  if (defEl) {
    defEl.innerText = card.def;
    defEl.classList.add('scale-110');
    setTimeout(() => defEl.classList.remove('scale-110'), 250);
  }

  let enemyPvSum = 0;
  let allyPvSum = 0;
  battleEngine.enemyField.forEach(c => { if (c) enemyPvSum += Math.max(0, c.pv); });
  battleEngine.playerField.forEach(c => { if (c) allyPvSum += Math.max(0, c.pv); });
  const enemySummary = document.getElementById('enemy-field-summary');
  const playerSummary = document.getElementById('player-field-summary');
  if (enemySummary) enemySummary.innerText = `Total Enemy PV: ${enemyPvSum}`;
  if (playerSummary) playerSummary.innerText = `Total Ally PV: ${allyPvSum}`;
}

function switchTab(tab) {
  const views = ['home', 'battle', 'deck', 'gacha', 'ranked', 'collection', 'career', 'showdown', 'spire', 'calamity', 'coliseum', 'relics', 'guild'];
  views.forEach(v => {
    const viewEl = document.getElementById(`view-${v}`);
    if (viewEl) viewEl.classList.add('hidden');
    const btn = document.getElementById(`tab-btn-${v}`);
    if (btn) {
      btn.classList.remove('border-indigo-500', 'text-indigo-400', 'font-bold');
      btn.classList.add('border-transparent', 'text-slate-400');
    }
  });

  const targetView = document.getElementById(`view-${tab}`);
  if (targetView) targetView.classList.remove('hidden');
  const activeBtn = document.getElementById(`tab-btn-${tab}`);
  if (activeBtn) {
    activeBtn.classList.remove('border-transparent', 'text-slate-400');
    activeBtn.classList.add('border-indigo-500', 'text-indigo-400', 'font-bold');
  }

  // If leaving sandbox/battle, clean up the floating live widget
  if (tab !== 'battle' && tab !== 'showdown') {
    const widget = document.getElementById('sandbox-live-widget');
    if (widget) widget.remove();
  }

  if (tab === 'home') renderHomeUI();
  if (tab === 'deck') renderDeckBuilderUI();
  if (tab === 'gacha') renderGachaUI();
  if (tab === 'ranked') updateRankedLadderUI();
  if (tab === 'collection') switchCollectionSubTab(playerState.collectionSubTab || 'champions');
  if (tab === 'career') renderCareerUI();
  if (tab === 'showdown') renderShowdownSelectUI();
  if (tab === 'calamity' && typeof renderCalamityView === 'function') renderCalamityView();
  if (tab === 'coliseum' && typeof renderColiseumView === 'function') renderColiseumView();
  if (tab === 'relics' && typeof renderRelicLoadoutUI === 'function') renderRelicLoadoutUI();
  if (tab === 'guild' && typeof renderGuildView === 'function') renderGuildView();

  // FIX: Properly call renderSpireView for Spire
  if (tab === 'spire' && typeof renderSpireView === 'function') {
    renderSpireView();
  }

  if (tab === 'battle') {
  const isSpecialMode = (
    battleEngine.matchMode === 'coliseum' ||
    battleEngine.matchMode === 'spire' ||
    battleEngine.matchMode === 'sandbox_arena'
  );

  // Only start a default ranked match if no battle is loaded AND we are not in a special mode
  if (!isSpecialMode && (!battleEngine.playerField || !battleEngine.playerField.some(c => c && c.pv > 0))) {
    startNewBattleMatch('ranked');
  }
}


  if (tab !== 'battle') checkSeasonRollover();
}

function switchDeckSubTab(tab) {
  playerState.deckSubTab = tab;
  const champContainer = document.getElementById('deck-champions-container');
  const showdownContainer = document.getElementById('deck-showdown-container');
  const summonContainer = document.getElementById('deck-summons-container');

  const btnChamp = document.getElementById('deck-subtab-champions');
  const btnShowdown = document.getElementById('deck-subtab-showdown');
  const btnSummon = document.getElementById('deck-subtab-summons');

  if (champContainer) champContainer.classList.toggle('hidden', tab !== 'champions');
  if (showdownContainer) showdownContainer.classList.toggle('hidden', tab !== 'showdown');
  if (summonContainer) summonContainer.classList.toggle('hidden', tab !== 'summons');

  const activeClass = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-indigo-600 text-white shadow";
  const inactiveClass = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800";

  if (btnChamp) btnChamp.className = (tab === 'champions') ? activeClass : inactiveClass;
  if (btnShowdown) btnShowdown.className = (tab === 'showdown') ? "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-rose-600 text-white shadow" : inactiveClass;
  if (btnSummon) btnSummon.className = (tab === 'summons') ? "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-purple-600 text-white shadow font-cinzel" : inactiveClass;

  if (tab === 'champions') renderDeckBuilderUI();
  else if (tab === 'showdown') renderShowdownDeckBuilderUI();
  else if (tab === 'summons') renderSummonLoadoutUI();
}

// =====================================================================
// SHOWDOWN 10-CARD DECK BUILDER & 8-PRESET CONTROLLER
// =====================================================================

function renderShowdownDeckBuilderUI() {
  const container = document.getElementById('equipped-showdown-deck-grid');
  const vaultContainer = document.getElementById('showdown-vault-card-grid');
  if (!container) return;

  const equipped = playerState.equippedShowdownDeckIds || [];

  container.innerHTML = Array.from({ length: 10 }).map((_, slotIdx) => {
    const cardId = equipped[slotIdx];
    const isFrontline = slotIdx < 5;
    const slotBadge = isFrontline
      ? `<span class="absolute top-1 left-1 z-20 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-500 text-slate-950">Active #${slotIdx + 1}</span>`
      : `<span class="absolute top-1 left-1 z-20 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-amber-500 text-slate-950">Preserve #${slotIdx - 4}</span>`;

    if (!cardId) {
      return `
        <div class="aspect-[3/4.2] rounded-2xl border-2 border-dashed ${isFrontline ? 'border-emerald-500/30' : 'border-amber-500/30'} flex flex-col items-center justify-center p-2 text-center text-slate-600 text-xs font-bold">
          ${isFrontline ? 'ACTIVE' : 'PRESERVE'} #${(slotIdx % 5) + 1}
        </div>`;
    }

    const owned = playerState.ownedCards.find(o => o.cardId === cardId);
    const stats = calculateCardStats(cardId, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);

    return `
      <div class="relative group">
        ${slotBadge}
        ${renderCardHTML(stats)}
        <button onclick="unequipShowdownCardSlot(${slotIdx})" class="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-lg hover:bg-rose-500 z-30" title="Unequip">✕</button>
      </div>`;
  }).join('');

  if (vaultContainer) {
    const owned = playerState.ownedCards.filter(o => !equipped.includes(o.cardId));
    vaultContainer.innerHTML = owned.length === 0
      ? `<p class="col-span-full py-6 text-center text-xs text-slate-500 italic">All owned cards are equipped or none available.</p>`
      : owned.map(item => {
          const stats = calculateCardStats(item.cardId, item.isRainbow, item.level, item);
          return `
            <div class="flex flex-col gap-1.5 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
              ${renderCardHTML(stats)}
              <button onclick="equipCardToShowdownDeck('${item.cardId}')" class="w-full py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] transition">
                + Add to Raid
              </button>
            </div>`;
        }).join('');
  }

  const cpDisplay = document.getElementById('showdown-deck-power-display');
  if (cpDisplay) {
    cpDisplay.innerText = `${calculateTeamPower(equipped)} CP`;
  }

  renderShowdownPresetsUI();
}

function equipCardToShowdownDeck(cardId) {
  playerState.equippedShowdownDeckIds = playerState.equippedShowdownDeckIds || [];
  if (playerState.equippedShowdownDeckIds.length >= 10) {
    alert("Showdown line is full (10/10)! Unequip a card first.");
    return;
  }
  if (!playerState.equippedShowdownDeckIds.includes(cardId)) {
    playerState.equippedShowdownDeckIds.push(cardId);
    renderShowdownDeckBuilderUI();
    scheduleSave();
  }
}

function unequipShowdownCardSlot(slotIdx) {
  if (!playerState.equippedShowdownDeckIds) return;
  playerState.equippedShowdownDeckIds.splice(slotIdx, 1);
  renderShowdownDeckBuilderUI();
  scheduleSave();
}

function autoFillShowdownDeck() {
  const sorted = [...playerState.ownedCards].sort((a, b) => {
    return getCardCombatPower(b.cardId, b.isRainbow, b.level, b) - getCardCombatPower(a.cardId, a.isRainbow, a.level, a);
  });
  playerState.equippedShowdownDeckIds = sorted.slice(0, 10).map(c => c.cardId);
  renderShowdownDeckBuilderUI();
  scheduleSave();
}

let pendingShowdownPresetDelete = -1;

function renderShowdownPresetsUI() {
  const grid = document.getElementById('showdown-presets-grid');
  if (!grid) return;

  const equipped = playerState.equippedShowdownDeckIds || [];
  const canSave = equipped.length === 10;
  const equippedKey = [...equipped].sort().join('|');

  playerState.showdownPresets = playerState.showdownPresets || Array.from({ length: 8 }, () => null);

  grid.innerHTML = playerState.showdownPresets.map((preset, i) => {
    if (!preset) {
      return `
        <div class="rounded-2xl border-2 border-dashed border-slate-800 p-2.5 flex flex-col items-center justify-center gap-2 min-h-[118px]">
          <span class="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Raid Preset ${i + 1}</span>
          <button onclick="saveShowdownPreset(${i})" ${canSave ? '' : 'disabled'} class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-200 text-[11px] font-semibold transition disabled:opacity-40 disabled:pointer-events-none">
            💾 Save Raid Lineup
          </button>
        </div>`;
    }

    const isActive = canSave && [...preset.ids].sort().join('|') === equippedKey;
    const isPendingDelete = pendingShowdownPresetDelete === i;

    return `
      <div class="rounded-2xl border ${isActive ? 'border-rose-500 bg-rose-950/30' : 'border-slate-800 bg-slate-900/70'} p-2.5 flex flex-col gap-2">
        <input type="text" maxlength="20" value="${escapeHtml(preset.name)}" onchange="renameShowdownPreset(${i}, this.value)"
          class="select-text w-full bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none rounded-lg px-2 py-1 text-xs font-bold text-slate-100">
        <div class="flex items-center justify-between text-[11px]">
          <span class="text-[10px] text-slate-400">10 Champions</span>
          <span class="font-bold text-rose-300">${calculateTeamPower(preset.ids)} CP</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="loadShowdownPreset(${i})" ${isActive ? 'disabled' : ''} class="flex-1 py-1 rounded-lg ${isActive ? 'bg-rose-950 text-rose-300' : 'bg-rose-600 hover:bg-rose-500 text-white'} text-[11px] font-semibold transition disabled:pointer-events-none">
            ${isActive ? '✓ Loaded' : 'Load'}
          </button>
          <button onclick="saveShowdownPreset(${i})" ${canSave ? '' : 'disabled'} title="Overwrite" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] transition disabled:opacity-40">💾</button>
          <button onclick="deleteShowdownPreset(${i})" class="px-2 py-1 rounded-lg text-[11px] font-semibold transition ${isPendingDelete ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-rose-700 text-slate-300'}">${isPendingDelete ? 'Sure?' : '🗑'}</button>
        </div>
      </div>`;
  }).join('');
}

function saveShowdownPreset(index) {
  const equipped = playerState.equippedShowdownDeckIds || [];
  if (equipped.length !== 10) {
    alert("Equip exactly 10 cards before saving a Showdown Raid Preset.");
    return;
  }
  const existing = playerState.showdownPresets[index];
  const name = existing ? existing.name : `Raid Squad ${index + 1}`;
  playerState.showdownPresets[index] = { name, ids: [...equipped] };
  pendingShowdownPresetDelete = -1;
  renderShowdownDeckBuilderUI();
  scheduleSave();
}

function loadShowdownPreset(index) {
  const preset = playerState.showdownPresets[index];
  if (!preset) return;
  const ownedIds = new Set(playerState.ownedCards.map(o => o.cardId));
  const usable = preset.ids.filter(id => ownedIds.has(id)).slice(0, 10);
  playerState.equippedShowdownDeckIds = usable;
  pendingShowdownPresetDelete = -1;
  renderShowdownDeckBuilderUI();
  scheduleSave();
}

function renameShowdownPreset(index, val) {
  const preset = playerState.showdownPresets[index];
  if (!preset) return;
  preset.name = (val || '').trim().slice(0, 20) || `Raid Squad ${index + 1}`;
  renderShowdownPresetsUI();
  scheduleSave();
}

function deleteShowdownPreset(index) {
  if (!playerState.showdownPresets[index]) return;
  if (pendingShowdownPresetDelete !== index) {
    pendingShowdownPresetDelete = index;
    renderShowdownPresetsUI();
    setTimeout(() => {
      if (pendingShowdownPresetDelete === index) {
        pendingShowdownPresetDelete = -1;
        renderShowdownPresetsUI();
      }
    }, 3000);
    return;
  }
  playerState.showdownPresets[index] = null;
  pendingShowdownPresetDelete = -1;
  renderShowdownDeckBuilderUI();
  scheduleSave();
}

function switchGachaSubTab(tab) {
  playerState.gachaSubTab = tab;
  const isCards = tab === 'cards';
  const isSummons = tab === 'summons';
  const isRelics = tab === 'relics';

  const cardContainer = document.getElementById('gacha-champions-container');
  const summonContainer = document.getElementById('gacha-summons-container');
  const relicContainer = document.getElementById('gacha-relics-container');

  const btnCards = document.getElementById('gacha-subtab-cards');
  const btnSummon = document.getElementById('gacha-subtab-summons');
  const btnRelic = document.getElementById('gacha-subtab-relics');

  if (cardContainer) cardContainer.classList.toggle('hidden', !isCards);
  if (summonContainer) summonContainer.classList.toggle('hidden', !isSummons);
  if (relicContainer) relicContainer.classList.toggle('hidden', !isRelics);

  if (btnCards) {
    btnCards.className = isCards
      ? "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-amber-500 text-slate-950 shadow font-cinzel"
      : "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 hover:text-purple-300 border border-slate-800 font-cinzel";
  }
  if (btnSummon) {
    btnSummon.className = isSummons
      ? "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-purple-600 text-white shadow font-cinzel"
      : "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 hover:text-purple-300 border border-slate-800 font-cinzel";
  }
  if (btnRelic) {
    btnRelic.className = isRelics
      ? "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-amber-500 text-slate-950 shadow font-cinzel"
      : "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 hover:text-amber-300 border border-slate-800 font-cinzel";
  }

  if (isRelics && typeof renderRelicGachaUI === 'function') {
    renderRelicGachaUI();
  } else {
    renderGachaUI();
  }
}

function switchCollectionSubTab(tab) {
  playerState.collectionSubTab = tab;
  const isChampions = tab === 'champions';
  const isSummons = tab === 'summons';
  const isRelics = tab === 'relics';
  const isSigils = tab === 'sigils';

  const champContainer = document.getElementById('collection-champions-container');
  const summonContainer = document.getElementById('collection-summons-container');
  const relicContainer = document.getElementById('collection-relics-container');
  const sigilContainer = document.getElementById('collection-sigils-container');

  const btnChamp = document.getElementById('col-subtab-champions');
  const btnSummon = document.getElementById('col-subtab-summons');
  const btnRelic = document.getElementById('col-subtab-relics');
  const btnSigil = document.getElementById('col-subtab-sigils');

  if (champContainer) champContainer.classList.toggle('hidden', !isChampions);
  if (summonContainer) summonContainer.classList.toggle('hidden', !isSummons);
  if (relicContainer) relicContainer.classList.toggle('hidden', !isRelics);
  if (sigilContainer) sigilContainer.classList.toggle('hidden', !isSigils);

  const activeBase = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow font-cinzel";
  const inactiveBase = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 border border-slate-800 font-cinzel";

  if (btnChamp) {
    btnChamp.className = isChampions ? `${activeBase} bg-indigo-600 text-white` : `${inactiveBase} hover:text-slate-200`;
  }
  if (btnSummon) {
    btnSummon.className = isSummons ? `${activeBase} bg-purple-600 text-white` : `${inactiveBase} hover:text-purple-300`;
  }
  if (btnRelic) {
    btnRelic.className = isRelics ? `${activeBase} bg-amber-500 text-slate-950` : `${inactiveBase} hover:text-amber-300`;
  }
  if (btnSigil) {
    btnSigil.className = isSigils ? `${activeBase} bg-cyan-600 text-white` : `${inactiveBase} hover:text-cyan-300`;
  }

  if (isChampions) {
    renderCollectionUI();
  } else if (isSummons) {
    renderSummonGrimoireUI();
  } else if (isRelics && typeof renderRelicCollectionUI === 'function') {
    renderRelicCollectionUI();
  } else if (isSigils && typeof renderSigilCollectionUI === 'function') {
    renderSigilCollectionUI();
  }
}

function updateOpponentInfoPanel() {
  const panel = document.getElementById('battle-opponent-info');
  const nameEl = document.getElementById('battle-opponent-name');
  const tierEl = document.getElementById('battle-opponent-tier');
  const avatarEl = document.getElementById('battle-opponent-avatar');
  
  if (!panel || !nameEl || !tierEl || !avatarEl) return;

  if (battleEngine.matchMode === 'ghost' && battleEngine.currentGhost) {
    // Show panel for Ghost Rivals
    panel.classList.remove('hidden');
    panel.classList.add('md:flex');
    nameEl.innerText = battleEngine.currentGhost.ghostName;
    tierEl.innerText = battleEngine.currentGhost.tier;
    avatarEl.innerText = battleEngine.currentGhost.avatar;
  } else {
    // Hide panel for standard Ranked/Practice to keep UI clean
    panel.classList.add('hidden');
    panel.classList.remove('md:flex');
  }
}

function startNewBattleMatch(mode, practiceTier) {
  if (typeof playerState === 'undefined') return;

  // Deck has fewer than 6 champions (e.g. after unequipping to swap cards).
  // Fill empty slots with your strongest unequipped champions instead of silently failing.
  let autoFilled = [];
  if (playerState.equippedDeckIds.length < 6) {
    const spare = playerState.ownedCards
      .filter(o => !playerState.equippedDeckIds.includes(o.cardId))
      .sort((a, b) => getCardCombatPower(b.cardId, b.isRainbow, b.level, b) - getCardCombatPower(a.cardId, a.isRainbow, a.level, a));
    while (playerState.equippedDeckIds.length < 6 && spare.length) {
      const pick = spare.shift();
      playerState.equippedDeckIds.push(pick.cardId);
      autoFilled.push(getCardBaseData(pick.cardId).name);
    }
    if (playerState.equippedDeckIds.length < 6) {
      const msg = `You need 6 champions to fight but only own ${playerState.equippedDeckIds.length}. Open more packs first.`;
      const el = document.getElementById('battle-latest-log');
      if (el) el.innerText = msg;
      alert(msg);
      return;
    }
    renderDeckBuilderUI();
  }
  try {
    const result = _startNewBattleMatchInner(mode, practiceTier);
    if (autoFilled.length) logBattleEvent(`🃏 Your deck was short, so <b>${autoFilled.join(', ')}</b> were auto-equipped.`);
    return result;
  } catch (err) {
    console.error('[Arena] startNewBattleMatch crashed:', err);
    const el = document.getElementById('battle-latest-log');
    if (el) el.innerText = 'Arena failed to start: ' + (err && err.message);
    battleEngine.isResolving = false;
    throw err;
  }
}

function _startNewBattleMatchInner(mode, practiceTier) {

  // 1. Completely reset battleEngine mode & special overrides (prevents Coliseum / Sandbox leaks)
  battleEngine.matchMode = (mode === 'practice') ? 'practice' : 'ranked';
  battleEngine.practiceTier = (mode === 'practice') ? Math.min(MASTER_TIER_INDEX, Math.max(0, Number(practiceTier) || 0)) : 0;
  battleEngine.currentGhost = null;
  battleEngine.playerRelicIds = null;     // Clears Coliseum/Sandbox relic override
  battleEngine.enemyRelicIds = [];
  battleEngine.arenaSummon = null;        // Clears Coliseum/Sandbox summon override
  battleEngine.enemyArenaSummon = null;
  battleEngine.extraTurn = false;         // Clears Chronomancer bleed
  battleEngine.relicFirstUltUsed = { player: false, enemy: false }; // Clears 1st Ult discount
  battleEngine.selectedAllySlot = null;
  battleEngine.attackMode = 'normal';
  battleEngine.isResolving = false;
  battleEngine.turnCount = 1;
  battleEngine.battleHistory = [];

  // Remove any lingering sandbox widget
  const sbWidget = document.getElementById('sandbox-live-widget');
  if (sbWidget) sbWidget.remove();

  updateMatchModeBadge();

  // Initialize Combat Statistics Tracker
  if (typeof initCombatStatsTracker === 'function') {
    initCombatStatsTracker('arena');
  }

  // 2. Build and register player deck
  const playerDeck = playerState.equippedDeckIds.map(id => {
    const owned = playerState.ownedCards.find(o => o.cardId === id);
    const stats = calculateCardStats(id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
    if (typeof registerCombatStatUnit === 'function') {
      registerCombatStatUnit(stats, true);
    }
    return stats;
  });
  
  trackSeasonSquadUsage(playerState.equippedDeckIds);

  // 3. Apply Arena Main Summon Auras & Sub-Auras
  if (playerState.equippedSummonId && typeof calculateSummonStats === 'function') {
    const summon = calculateSummonStats(playerState.equippedSummonId);
    if (summon) {
      playerDeck.forEach(c => {
        if (c.element === summon.element && summon.mainAura) {
          const statKey = summon.mainAura.stat;
          const bonusPct = (summon.mainAura.percent || 0) / 100;
          if (statKey === 'pv') {
            const boost = Math.round(c.maxPv * bonusPct);
            c.maxPv += boost;
            c.pv += boost;
          } else if (statKey === 'def') {
            c.def = Math.round(c.def * (1 + bonusPct));
          }
        }
        if (summon.subAura) {
          if (summon.subAura.stat === 'pv') {
            c.maxPv += summon.subAura.flat;
            c.pv += summon.subAura.flat;
          } else if (summon.subAura.stat === 'def') {
            c.def += summon.subAura.flat;
          }
        }
      });

      // 3-Turn Arena initial lockout
      battleEngine.arenaSummon = {
        ...summon,
        lockoutTurns: 3,
        used: false
      };
    }
  } else {
    battleEngine.arenaSummon = null;
  }

  // 4. Generate and register enemy deck & loadout
  const opponentTier = (battleEngine.matchMode === 'practice') ? battleEngine.practiceTier : playerState.tierIndex;
  const enemyDeck = generateEnemyDeckForCurrentTier();

  const enemySummon = generateEnemySummonForTier(opponentTier, enemyDeck);
  if (enemySummon) {
    enemyDeck.forEach(c => {
      if (c.element === enemySummon.element && enemySummon.mainAura) {
        const bonusPct = (enemySummon.mainAura.percent || 0) / 100;
        if (enemySummon.mainAura.stat === 'pv') {
          const boost = Math.round(c.maxPv * bonusPct);
          c.maxPv += boost;
          c.pv += boost;
        } else if (enemySummon.mainAura.stat === 'def') {
          c.def = Math.round(c.def * (1 + bonusPct));
        }
      }
      if (enemySummon.subAura) {
        if (enemySummon.subAura.stat === 'pv') {
          c.maxPv += enemySummon.subAura.flat;
          c.pv += enemySummon.subAura.flat;
        } else if (enemySummon.subAura.stat === 'def') {
          c.def += enemySummon.subAura.flat;
        }
      }
    });

    battleEngine.enemyArenaSummon = {
      ...enemySummon,
      lockoutTurns: 3,
      used: false
    };
  } else {
    battleEngine.enemyArenaSummon = null;
  }

  battleEngine.enemyRelicIds = generateEnemyRelicsForTier(opponentTier);

  if (typeof registerCombatStatUnit === 'function') {
    enemyDeck.forEach(c => registerCombatStatUnit(c, false));
  }
  
  if (typeof triggerSigilsBattleStart === 'function') {
    triggerSigilsBattleStart('player', battleEngine.playerField);
    triggerSigilsBattleStart('enemy', battleEngine.enemyField);
  }

  shuffleArray(playerDeck);
  shuffleArray(enemyDeck);

  battleEngine.playerField = [playerDeck[0], playerDeck[1], playerDeck[2]];
  battleEngine.playerReserve = [playerDeck[3], playerDeck[4], playerDeck[5]];

  battleEngine.enemyField = [enemyDeck[0], enemyDeck[1], enemyDeck[2]];
  battleEngine.enemyReserve = [enemyDeck[3], enemyDeck[4], enemyDeck[5]];

  // 5. Apply Resonances & Relics
  const activeResonances = getActiveResonances(playerState.equippedDeckIds);
  if (activeResonances.some(r => r.element === 'Light')) {
    battleEngine.playerField.forEach(card => {
      if (card && card.element === 'Light') card.energy = 1;
    });
  }
  if (activeResonances.some(r => r.element === 'Earth')) {
    [...battleEngine.playerField, ...battleEngine.playerReserve].forEach(card => {
      if (card) card.def = Math.round(card.def * (1 + TERRA_DEF_BONUS));
    });
  }

  if (typeof triggerRelicBattleStart === 'function') {
    triggerRelicBattleStart('player', battleEngine.playerField);
    triggerRelicBattleStart('enemy', battleEngine.enemyField);
  }
  
  if (typeof applySigilBattleStartPassives === 'function') {
    applySigilBattleStartPassives('player', battleEngine.playerField);
    applySigilBattleStartPassives('enemy', battleEngine.enemyField);
  }

  battleEngine.selectedAllySlot = null;
  battleEngine.attackMode = 'normal';
  battleEngine.isResolving = true;
  battleEngine.turnCount = 1;
  battleEngine.battleHistory = [];
  const logContainer = document.getElementById('full-battle-log');
  if (logContainer) logContainer.innerHTML = '';

  updateOpponentInfoPanel();
  renderCombatField();
  updateReserveDots();
  renderBattleResonancesBar();
  runCoinTossModal();
}

function handleBattleRestart() {
  const mode = battleEngine.matchMode;

  // 1. Coliseum Mode: Restart the active Coliseum fixture
  if (mode === 'coliseum') {
    if (typeof coliseumState !== 'undefined' && coliseumState.isActive) {
      if (confirm("Restart this Coliseum match?")) {
        launchColiseumBattle();
      }
    } else {
      switchTab('coliseum');
    }
    return;
  }

  // 2. Abyssal Spire Mode: Restart the active floor battle
  if (mode === 'spire') {
    if (typeof spireState !== 'undefined' && spireState.isActive) {
      if (confirm("Restart this Spire floor encounter?")) {
        launchSpireFloorBattle();
      }
    } else {
      switchTab('spire');
    }
    return;
  }

  // 3. Ghost Rival PvP Mode: Restart the active ghost rival encounter
  if (mode === 'ghost') {
    if (battleEngine.currentGhost && typeof GHOST_LADDER !== 'undefined') {
      const gIdx = GHOST_LADDER.findIndex(g => g.ghostName === battleEngine.currentGhost.ghostName);
      if (gIdx !== -1) {
        startGhostMatch(gIdx);
        return;
      }
    }
    startNewBattleMatch('ranked');
    return;
  }

  // 4. Practice Arena Mode: Restart with current selected practice tier
  if (mode === 'practice') {
    startNewBattleMatch('practice', battleEngine.practiceTier);
    return;
  }

  // 5. Training Dummy Sandbox: Re-arm sandbox dummies
  if (mode === 'sandbox_arena') {
    if (typeof launchArenaSandboxCombat === 'function') {
      launchArenaSandboxCombat();
      return;
    }
  }

  // 6. Default Fallback: Standard Ranked 3v3 Arena
  startNewBattleMatch('ranked');
}

function pickEnemySigilForCard(cardBase, excludeSigilId = null) {
  if (typeof SIGIL_DATABASE === 'undefined' || SIGIL_DATABASE.length === 0) return null;

  // Filter out Calamity-exclusive sigils and already equipped slot
  const craftableSigils = SIGIL_DATABASE.filter(s => !s.uncraftable && s.id !== excludeSigilId);
  if (craftableSigils.length === 0) return null;

  const role = cardBase.role;
  let preferredThemes = [];

  switch (role) {
    case 'Assassin':
    case 'Duelist':
    case 'Thief':
      preferredThemes = ['Execution', 'Disruption', 'Affliction', 'Critical'];
      break;
    case 'Knight':
    case 'Bulwark':
    case 'Sentinel':
    case 'Paladin':
      preferredThemes = ['Defense', 'Protection', 'Bulwark', 'Fortitude', 'Retaliation'];
      break;
    case 'Mage':
    case 'Warlock':
    case 'Hexer':
    case 'Alchemist':
    case 'Saboteur':
      preferredThemes = ['Ultimate', 'Affliction', 'Disruption', 'Energy'];
      break;
    case 'Cleric':
    case 'Priest':
    case 'Shaman':
    case 'Bard':
      preferredThemes = ['Survival', 'Sustain', 'Support', 'Tempo'];
      break;
    case 'Berserker':
    case 'Warrior':
    case 'Monk':
    case 'Ravager':
    case 'Gladiator':
      preferredThemes = ['Bruiser', 'Offense', 'Retaliation', 'Tempo'];
      break;
    default:
      preferredThemes = ['Offense', 'Defense', 'Tactical'];
  }

  const synergistic = craftableSigils.filter(s => preferredThemes.includes(s.theme));
  const pool = synergistic.length > 0 ? synergistic : craftableSigils;

  return pool[Math.floor(Math.random() * pool.length)].id;
}

function generateEnemyDeckForCurrentTier() {
  const opponentTier = battleEngine.matchMode === 'practice' ? battleEngine.practiceTier : playerState.tierIndex;
  const tierIdx = Math.min(opponentTier, ENEMY_TIER_RARITY_WEIGHTS.length - 1);
  const weights = ENEMY_TIER_RARITY_WEIGHTS[tierIdx];
  const enemyHasRainbowChance = getEnemyRainbowChance(tierIdx);
  const scaling = ENEMY_TIER_SCALING[tierIdx] || ENEMY_TIER_SCALING[ENEMY_TIER_SCALING.length - 1];

  // 🌟 Retrieve current player guild bonuses so high-tier enemies match your guild progression footprint
  const guildBonuses = (typeof getGuildPlayerStatBonuses === 'function') ? getGuildPlayerStatBonuses() : { defBonus: 6, pvBonus: 15 };
  // Scale enemy guild compensation factor based on tier difficulty
  const enemyGuildDefScale = Math.round(guildBonuses.defBonus * (0.5 + (tierIdx * 0.1)));
  const enemyGuildPvScale = Math.round(guildBonuses.pvBonus * (0.5 + (tierIdx * 0.1)));

  const chosen = [];
  for (let i = 0; i < 6; i++) {
    const targetRarity = pickWeightedRarity(weights);
    let candidates = CARD_DATABASE.filter(c => c.rarity === targetRarity);
    if (candidates.length === 0) candidates = CARD_DATABASE.filter(c => c.rarity === 'Common');
    chosen.push(candidates[Math.floor(Math.random() * candidates.length)]);
  }

  return chosen.map(card => {
    const isRainbow = Math.random() < enemyHasRainbowChance;
    const level = getRandomInt(scaling.levels[0], scaling.levels[1]);

    let enlightenment = 0;
    let awakened = false;
    if (isRainbow) {
      enlightenment = getRandomInt(scaling.enlightenment[0], scaling.enlightenment[1]);
      if (scaling.awakenChance > 0 && Math.random() < scaling.awakenChance) {
        enlightenment = MAX_ENLIGHTENMENT;
        awakened = true;
      }
    }

    const stats = calculateCardStats(card.id, isRainbow, level, { enlightenment, awakened });

    // Apply scaling enemy guild compensation stats so battles remain challenging
    stats.def += enemyGuildDefScale;
    stats.maxPv += enemyGuildPvScale;
    stats.pv = stats.maxPv;

    // === Enemy Sigil Socket Assignment ===
    stats.sigilIds = [null, null];
    if (isRainbow && Math.random() < (scaling.sigilAlphaChance || 0)) {
      stats.sigilIds[0] = pickEnemySigilForCard(card);
      
      if ((awakened || level >= 25) && Math.random() < (scaling.sigilOmegaChance || 0)) {
        stats.sigilIds[1] = pickEnemySigilForCard(card, stats.sigilIds[0]);
      }
    }

    return stats;
  });
}

function generateEnemyRelicsForTier(tierIdx) {
  if (typeof RELIC_DATABASE === 'undefined' || RELIC_DATABASE.length === 0) return [];
  const count = tierIdx >= 8 ? 3 : tierIdx >= 6 ? 2 : tierIdx >= 3 ? 1 : (tierIdx >= 1 && Math.random() < 0.5 ? 1 : 0);
  if (count === 0) return [];

  const eligibleRarities = tierIdx >= 7 
    ? ['Legendary', 'Mythical'] 
    : tierIdx >= 4 
      ? ['Epic', 'Legendary'] 
      : ['Rare', 'Epic'];

  let pool = RELIC_DATABASE.filter(r => eligibleRarities.includes(r.rarity));
  if (pool.length === 0) pool = RELIC_DATABASE;

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(r => r.id);
}

function generateEnemySummonForTier(tierIdx, enemyDeck) {
  if (typeof SUMMON_DATABASE === 'undefined' || SUMMON_DATABASE.length === 0) return null;
  // Tier Gold (2) and above gets summons; Silver (1) has 40% chance
  const hasSummon = tierIdx >= 2 || (tierIdx >= 1 && Math.random() < 0.40);
  if (!hasSummon) return null;

  // Try to match the dominant element of the enemy deck
  const elemCounts = {};
  enemyDeck.forEach(c => { elemCounts[c.element] = (elemCounts[c.element] || 0) + 1; });
  let dominantElem = Object.keys(elemCounts).sort((a, b) => elemCounts[b] - elemCounts[a])[0];

  let candidates = SUMMON_DATABASE.filter(s => s.element === dominantElem);
  if (candidates.length === 0) candidates = SUMMON_DATABASE;

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  return (typeof calculateSummonStats === 'function') ? calculateSummonStats(chosen.id) : chosen;
}

function runCoinTossModal() {
  const modal = document.getElementById('coin-toss-modal');
  const coin = document.getElementById('coin-element');
  const resultText = document.getElementById('coin-result-text');
  if (!modal || !coin || !resultText) return;
  modal.classList.remove('hidden');

  coin.className = "w-28 h-28 rounded-full border-4 border-amber-400 bg-slate-800 text-slate-100 flex items-center justify-center text-xl font-cinzel font-black flipping-coin";
  resultText.innerText = "Tossing coin of initiative...";
  playSound('coin');

  const isBlue = Math.random() < 0.5;

  setTimeout(() => {
    coin.classList.remove('flipping-coin');
    if (isBlue) {
      coin.className = "w-28 h-28 rounded-full border-4 border-blue-400 bg-blue-600/30 text-blue-300 flex items-center justify-center text-2xl font-cinzel font-black shadow-lg shadow-blue-500/50";
      coin.innerText = "BLUE";
      resultText.innerHTML = "<span class='text-blue-400 font-bold'>BLUE WINS!</span> You take the first turn!";
      battleEngine.turn = 'player';
    } else {
      coin.className = "w-28 h-28 rounded-full border-4 border-rose-500 bg-rose-600/30 text-rose-300 flex items-center justify-center text-2xl font-cinzel font-black shadow-lg shadow-rose-500/50";
      coin.innerText = "RED";
      resultText.innerHTML = "<span class='text-rose-400 font-bold'>RED WINS!</span> Opponent strikes first!";
      battleEngine.turn = 'enemy';
    }

    setTimeout(() => {
      modal.classList.add('hidden');
      battleEngine.isResolving = false;
      executeTurnStartPhase();
    }, getCombatDelay(1300, battleEngine.matchMode));
  }, getCombatDelay(1600, battleEngine.matchMode));
}

function executeTurnStartPhase() {
  updateTurnStatusUI();

  const activeField = battleEngine.turn === 'player' ? battleEngine.playerField : battleEngine.enemyField;
  const activeReserve = battleEngine.turn === 'player' ? battleEngine.playerReserve : battleEngine.enemyReserve;
  const sideKey = battleEngine.turn;
  
  if (typeof triggerRelicTurnStart === 'function') {
    triggerRelicTurnStart(sideKey, activeField);
  }

  // --- SIGIL TURN START HOOK ---
  if (typeof triggerSigilsTurnStart === 'function') {
    triggerSigilsTurnStart(sideKey, activeField);
  }

  // --- ABYSSAL SPIRE BIOME HAZARDS & BOSS TURN-START HOOKS ---
  if (battleEngine.matchMode === 'spire' && typeof spireState !== 'undefined') {
    const floor = spireState.currentFloor;
    const biome = typeof getSpireBiome === 'function' ? getSpireBiome(floor) : null;

    // Floor 16-20 (Searing Caldera): Cinder Gale 3% Max PV chip
    if (biome && biome.id === 'biome_fire') {
      activeField.forEach((u, i) => {
        if (u && u.pv > 0) {
          const chip = Math.max(1, Math.round(u.maxPv * 0.03));
          u.pv = Math.max(1, u.pv - chip);
          updateCardVisualStats(sideKey, i);
          showFloatingText(sideKey, i, `-${chip} CINDER GALE`, 'text-orange-400 font-bold');
        }
      });
    }

    // Floor 21-25 (Umbral Void Rift): Void Entropy Necrosis if below 35% PV
    if (biome && biome.id === 'biome_dark') {
      activeField.forEach((u, i) => {
        if (u && u.pv > 0 && (u.pv / u.maxPv) <= 0.35 && !u.statusEffects.some(s => s.type === 'Necrosis')) {
          applyStatusEffect(u, 'Necrosis', 2);
          showFloatingText(sideKey, i, 'VOID NECROSIS', 'text-purple-400 font-bold');
        }
      });
    }

    // Floor 30: Aurelion Phase 2 Cataclysm Countdown
    if (floor === 30 && sideKey === 'enemy') {
      const boss = battleEngine.enemyField[0];
      if (boss && boss.pv > 0 && spireState.bossCombatState?.phase === 2) {
        if (battleEngine.turnCount % 3 === 0) {
          battleEngine.playerField.forEach((ally, aIdx) => {
            if (ally && ally.pv > 0) {
              const cataclysmDmg = Math.max(1, Math.round(boss.maxPv * 0.20));
              ally.pv = Math.max(0, ally.pv - cataclysmDmg);
              updateCardVisualStats('player', aIdx);
              showFloatingText('player', aIdx, `-${cataclysmDmg} CATACLYSM`, 'text-yellow-300 font-black');
            }
          });
          logBattleEvent(`👑 <b>Aurelion's Cosmic Cataclysm:</b> Unleashed astral shockwaves across the vanguard!`);
        }
      }
    }
  }

  if (typeof triggerRelicTurnStartCleanse === 'function') {
    triggerRelicTurnStartCleanse(sideKey, activeField);
  }

  // Hook: Bench Passive Heal for Reserve units
  if (typeof triggerRelicBenchPassiveHeal === 'function') {
    triggerRelicBenchPassiveHeal(sideKey, activeReserve);
  }

  // Landing airborne units at the start of their active turn
  activeField.forEach((card, idx) => {
    if (card && card.pv > 0 && card.isAirborne) {
      card.isAirborne = false;
      showFloatingText(sideKey, idx, 'LANDED!', 'text-sky-300 font-bold');
      logBattleEvent(`🔱 <b>${card.name}</b> safely descended from orbit back into the vanguard.`);
    }
  });

  activeField.forEach((card, idx) => {
    if (!card || card.pv <= 0) return;

    const burnEffect = card.statusEffects.find(s => s.type === 'Burn');
    if (burnEffect) {
      const pyroBonus = (sideKey === 'enemy' && isResonanceActive('player', 'Fire')) ? PYRO_BURN_EXTRA_PCT : 0;
      let burnDmg = Math.max(1, Math.round(card.maxPv * (0.06 + pyroBonus)));
      const dotMult = (typeof getRelicDotMultiplier === 'function') ? getRelicDotMultiplier(sideKey === 'player' ? 'enemy' : 'player') : 1.0;
      burnDmg = Math.round(burnDmg * dotMult);

      card.pv = Math.max(0, card.pv - burnDmg);
      updateCardVisualStats(sideKey, idx);
      showFloatingText(sideKey, idx, `-${burnDmg} BURN`, 'text-orange-400');
      logBattleEvent(`🔥 <b>${card.name}</b> suffered ${burnDmg} Burn damage!${pyroBonus ? ' <span class="text-orange-300">(Pyro +2%)</span>' : ''}${dotMult > 1 ? ' <span class="text-amber-300">(Relic DoT +40%)</span>' : ''}`);
      recordCombatStat(card, 'damageTaken', burnDmg, sideKey === 'player');
    }

    // Inquisitor Torment tick
    if (card.statusEffects.some(s => s.type === 'Torment')) {
      const tormentDmg = Math.max(1, Math.round(card.maxPv * 0.05));
      card.pv = Math.max(0, card.pv - tormentDmg);
      updateCardVisualStats(sideKey, idx);
      showFloatingText(sideKey, idx, `-${tormentDmg} TORMENT`, 'text-amber-500 font-bold');
      logBattleEvent(`⚖️ <b>Torment:</b> Purged heretical energies seared <b>${card.name}</b> for ${tormentDmg} True DMG!`);
    }

    // Geomancer Ley-Trench tick upon acting
    if (card.statusEffects.some(s => s.type === 'LeyTrench')) {
      const trenchChip = Math.max(1, Math.round(card.maxPv * 0.10));
      card.pv = Math.max(0, card.pv - trenchChip);
      updateCardVisualStats(sideKey, idx);
      showFloatingText(sideKey, idx, `-${trenchChip} TECTONIC CHIP`, 'text-amber-600 font-bold');
      logBattleEvent(`🌋 <b>Ley-Trench:</b> The fractured ground erupted under <b>${card.name}</b> (-${trenchChip} PV)!`);
    }

    // Maledictor Curse tick (true damage)
    const curseTick = card.statusEffects.find(s => s.type === 'Curse');
    if (curseTick && (curseTick.power || 0) > 0) {
      const curseDmg = Math.max(1, Math.round(curseTick.power * 0.25));
      card.pv = Math.max(0, card.pv - curseDmg);
      updateCardVisualStats(sideKey, idx);
      showFloatingText(sideKey, idx, `-${curseDmg} CURSE`, 'text-purple-400 font-bold');
      logBattleEvent(`🧿 <b>Curse:</b> dark hexes wracked <b>${card.name}</b> for ${curseDmg} True DMG!`);
      recordCombatStat(card, 'damageTaken', curseDmg, sideKey === 'player');
    }

    // Revenant Spectral Vengeance expiring: release the stored damage as a burst wave
    const spectralFx = card.statusEffects.find(s => s.type === 'SpectralVengeance');
    if (spectralFx && spectralFx.duration <= 1 && (spectralFx.stored || 0) > 0) {
      const foeField = sideKey === 'player' ? battleEngine.enemyField : battleEngine.playerField;
      const foeSide = sideKey === 'player' ? 'enemy' : 'player';
      foeField.forEach((foe, fIdx) => {
        if (foe && foe.pv > 0) {
          foe.pv = Math.max(0, foe.pv - spectralFx.stored);
          updateCardVisualStats(foeSide, fIdx);
          showFloatingText(foeSide, fIdx, `-${spectralFx.stored} SPECTRAL BURST`, 'text-violet-300 font-black');
        }
      });
      logBattleEvent(`💥 <b>${card.name}</b>'s Undying Vengeance expired, unleashing a burst wave of ${spectralFx.stored} stored damage on every foe!`);
      spectralFx.stored = 0;
    }

    card.statusEffects.forEach(s => s.duration--);
    card.statusEffects = card.statusEffects.filter(s => s.duration > 0);

    // Valkyrie / Bulwark ultimate DEF boost ends together with the Taunt
    if (card.ultDefBonus && !card.statusEffects.some(s => s.type === 'Taunt')) {
      card.def = Math.max(1, card.def - card.ultDefBonus);
      card.ultDefBonus = 0;
      updateCardVisualStats(sideKey, idx);
    }
  });

  handleReinforcements('player');
  handleReinforcements('enemy');

  // FIX: Burn / Torment / Ley-Trench ticks above can kill a side's last unit.
  // Without this check the match never ended and the Arena froze forever.
  renderCombatField();
  updateReserveDots();
  if (!isSideAlive('enemy')) { battleEngine.isResolving = true; handleMatchOver(true); return; }
  if (!isSideAlive('player')) { battleEngine.isResolving = true; handleMatchOver(false); return; }

  activeField.forEach((card, idx) => {
    if (!card || card.pv <= 0) return;
    if (card.role === 'Knight') {
      const boostPct = ROLE_SKILL_SCALING.Knight[card.rarity] || 15;
      const defIncrease = Math.max(1, Math.round(card.def * (boostPct / 100)));
      card.def += defIncrease;
      updateCardVisualStats(sideKey, idx);
      showFloatingText(sideKey, idx, `+${defIncrease} DEF`, 'text-cyan-400');
      logBattleEvent(`<span class="${sideKey === 'player' ? 'text-indigo-400' : 'text-rose-400'} font-bold">${card.name}</span> fortified (+${boostPct}% DEF)!`);
      playSound('heal');
    }
  });

  activeField.forEach((card, idx) => {
    if (!card || card.pv <= 0) return;
    if (card.role === 'Cleric') {
      const healPct = ROLE_SKILL_SCALING.Cleric[card.rarity] || 8;
      const aquaMult = getAquaPotencyMultiplier(sideKey);
      const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(sideKey) : 1.0;
      const healAmount = Math.max(1, Math.round(card.pv * (healPct / 100) * aquaMult * cauterize));

      activeField.forEach((ally, allyIdx) => {
        if (ally && allyIdx !== idx && ally.pv > 0 && !ally.statusEffects.some(s => s.type === 'Necrosis')) {
          const oldPv = ally.pv;
          applyHealing(ally, healAmount);
          const restored = ally.pv - oldPv;
          if (restored > 0) {
            updateCardVisualStats(sideKey, allyIdx);
            showFloatingText(sideKey, allyIdx, `+${restored} PV`, 'text-emerald-400');
            recordCombatStat(card, 'healingDone', restored, sideKey === 'player');
          }
        }
      });
      logBattleEvent(`<span class="${sideKey === 'player' ? 'text-indigo-400' : 'text-rose-400'} font-bold">${card.name}</span> channeled <b>Party Blessing</b>!${aquaMult > 1 ? ' <span class="text-cyan-300">(Aqua +25%)</span>' : ''}${cauterize < 1.0 ? ' <span class="text-rose-400">(Cauterized -50%)</span>' : ''}`);
      playSound('heal');
    }
  });

  if (battleEngine.turn === 'enemy') {
    setTimeout(executeEnemyAITurn, getCombatDelay(900, battleEngine.matchMode));
  }

  if (battleEngine.turn === 'player' && isSideAlive('player')) {
    const canAct = battleEngine.playerField.some(c => c && c.pv > 0 && !c.statusEffects.some(s => s.type === 'Stun'));
    if (!canAct) {
      battleEngine.isResolving = true;
      logBattleEvent('❄️ <b>Every champion is Stunned!</b> Your turn is skipped.');
      setTimeout(finishTurnCycle, getCombatDelay(1200, battleEngine.matchMode));
    } else if (isAutoBattle) {
      setTimeout(executePlayerAutoTurn, getCombatDelay(600, battleEngine.matchMode));
    }
  }
}

function calculateMitigatedDamage(attackPV, defenseValue) {
  const K = 100;
  const reductionFactor = K / (K + Math.max(0, defenseValue));
  const rawDamage = attackPV * reductionFactor;
  return Math.max(1, Math.round(rawDamage));
}

function selectAllyForAttack(slotIndex) {
  if (battleEngine.turn !== 'player' || battleEngine.isResolving) return;
  const ally = battleEngine.playerField[slotIndex];
  if (!ally || ally.pv <= 0) return;

  if (ally.statusEffects.some(s => s.type === 'Stun')) {
    logBattleEvent(`❄️ <span class="text-cyan-300 font-bold">${ally.name}</span> is Stunned and cannot act this turn!`);
    return;
  }

  battleEngine.selectedAllySlot = slotIndex;

  const chargeBtn = document.getElementById('btn-mode-charge');
  if (chargeBtn) {
    const hasDiscount = (typeof hasRelicFirstUltDiscount === 'function') && hasRelicFirstUltDiscount('player');
    const requiredEnergy = hasDiscount ? 2 : 3;

    if (ally.statusEffects.some(s => s.type === 'GridLock')) {
      chargeBtn.setAttribute('disabled', 'true');
      chargeBtn.innerText = '🧲 GRID LOCKED';
      setAttackMode('normal');
    } else if (ally.energy >= requiredEnergy) {
      chargeBtn.removeAttribute('disabled');
      chargeBtn.innerText = `⚡ ${ally.chargeSkillName} (Ready${hasDiscount ? ' - 2 Pips' : ''})`;
    } else {
      chargeBtn.setAttribute('disabled', 'true');
      chargeBtn.innerText = `⚡ Ultimate (${ally.energy}/${requiredEnergy} Pips)`;
      setAttackMode('normal');
    }
  }

  logBattleEvent(`Selected <span class="text-indigo-300 font-bold">${ally.name}</span> (${ally.element}). Choose target!`);
  renderCombatField();
}

function predictCombatOutcome(attacker, defender, isCharge = false) {
  if (!attacker || !defender) return null;

  // The forecast mirrors _executeAttackSequenceInner step by step (deterministic parts only:
  // crit rolls, Elementalist's random pierce and other dice are not included).
  const hasFx = (u, t) => !!(u.statusEffects && u.statusEffects.some(s => s.type === t));
  const findFx = (u, t) => (u.statusEffects ? u.statusEffects.find(s => s.type === t) : undefined);

  // A Mimic with a borrowed passive fights as that role (decided before any Grid Lock downgrade, like the real attack)
  let role = attacker.role;
  if (role === 'Mimic' && !isCharge && attacker.mimicCopiedRole && attacker.mimicCopiedRole !== 'Mimic' && attacker.mimicRoleTurnsRemaining > 0) {
    role = attacker.mimicCopiedRole;
  }
  // A Grid Locked unit cannot use its charge skill
  if (isCharge && hasFx(attacker, 'GridLock')) isCharge = false;

  // ---- Spellbreaker strips bonus DEF before the strike ----
  let defenderDef = defender.def;
  let spellbreakerBonusDmg = 0;
  if (role === 'Spellbreaker') {
    const baseDefOriginal = (getCardBaseData(defender.id).baseDEF) * (defender.isRainbow ? 1.25 : 1.0);
    if (defenderDef > baseDefOriginal) {
      const stripped = Math.round((defenderDef - baseDefOriginal) * ((ROLE_SKILL_SCALING.Spellbreaker[attacker.rarity] ?? 50) / 100));
      defenderDef -= stripped;
      spellbreakerBonusDmg = stripped;
    }
  }

  // ---- Effective DEF ----
  let effectiveDef = defenderDef;
  if (hasFx(defender, 'ArmorBreak')) effectiveDef = Math.round(effectiveDef * 0.6);
  if (hasFx(defender, 'Necrosis')) {
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - (ROLE_SKILL_SCALING.BlightNecrosisDef[attacker.rarity] ?? 15) / 100)));
  }
  if (role === 'Mage') {
    const penPct = isCharge ? 100 : (ROLE_SKILL_SCALING.Mage[attacker.rarity] || 35);
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - (penPct / 100))));
  }
  if (role === 'Dreadnought') effectiveDef = Math.max(0, Math.round(effectiveDef * 0.75));
  const curseFx = findFx(defender, 'Curse');
  if (curseFx) effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - Math.min(0.20, 0.04 * (curseFx.stacks || 1)))));
  if (role === 'Dragoon') {
    const piercePct = (ROLE_SKILL_SCALING.DragoonPierce && ROLE_SKILL_SCALING.DragoonPierce[attacker.rarity] || 35) / 100;
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - piercePct)));
  }
  if (role === 'Gladiator' && attacker.crowdFavorStacks > 0) {
    const penPerStack = (ROLE_SKILL_SCALING.GladiatorArmorPen[attacker.rarity] || 15) / 100;
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - Math.min(0.85, penPerStack * attacker.crowdFavorStacks))));
  }

  // ---- Base strike ----
  let strikePv = attacker.pv;
  let berserkerSacPv = 0;
  let sacrificeDmg = 0;
  if (role === 'Berserker') {
    const sacPct = isCharge ? 25 : (ROLE_SKILL_SCALING.Berserker[attacker.rarity] || 15);
    berserkerSacPv = Math.max(1, Math.round(attacker.pv * (sacPct / 100)));
    strikePv = Math.max(1, attacker.pv - berserkerSacPv);
    sacrificeDmg = isCharge ? 0 : berserkerSacPv * BERSERKER_BONUS_MULT;
  }
  let estStrike = calculateMitigatedDamage(strikePv, effectiveDef);

  // ---- Spire Light biome ----
  const elemRes = Object.assign({}, getElementalAdvantage(attacker.element, defender.element));
  if (battleEngine.matchMode === 'spire' && typeof spireState !== 'undefined' && typeof getSpireBiome === 'function') {
    const biome = getSpireBiome(spireState.currentFloor);
    if (biome && biome.id === 'biome_light') {
      if (elemRes.mult > 1.0) elemRes.mult += 0.15;
      if (isCharge) estStrike = Math.round(estStrike * 1.30);
    }
  }

  // ---- Elemental modifiers (relics / Elementalist) ----
  if (elemRes.mult > 1.0 && typeof hasRelicPrismaticInversion === 'function' && hasRelicPrismaticInversion('enemy')) {
    elemRes.mult = 0.80;
  } else if (elemRes.mult > 1.0 && typeof getRelicElemAdvBonus === 'function') {
    const bonus = getRelicElemAdvBonus('player');
    if (bonus > 0) elemRes.mult += bonus;
  }
  if (role === 'Elementalist') {
    if (isCharge) elemRes.mult = 1.25;
    else if (elemRes.mult < 1.0) elemRes.mult = 1.0;
  }
  estStrike = Math.round(estStrike * elemRes.mult);

  // ---- Multipliers (same order as the real strike) ----
  if (role === 'Warrior') {
    const rageMult = getWarriorRageMultiplier(attacker);
    if (rageMult > 1.005) estStrike = Math.round(estStrike * rageMult);
  }
  if (typeof getRelicLowPvFrenzyMultiplier === 'function') {
    const m = getRelicLowPvFrenzyMultiplier(attacker, 'player');
    if (m > 1.0) estStrike = Math.round(estStrike * m);
  }
  if (attacker.relicResonanceBuff && attacker.relicResonanceBuff > 0) {
    estStrike = Math.round(estStrike * (1 + attacker.relicResonanceBuff));
  }
  if (role === 'Valkyrie' && !isCharge && attacker.valhallaFuryStored > 0) estStrike += attacker.valhallaFuryStored;
  if (hasFx(attacker, 'AnthemBuff')) estStrike = Math.round(estStrike * (1 + (ROLE_SKILL_SCALING.HeraldDmgBuff[attacker.rarity] ?? 10) / 100));
  if (hasFx(attacker, 'Bloodrage')) estStrike = Math.round(estStrike * 1.25);
  if (hasFx(attacker, 'CrescendoValor')) estStrike = Math.round(estStrike * 1.25);
  if (hasFx(attacker, 'Haste')) estStrike = Math.round(estStrike * 1.25);
  if (isCharge) {
    estStrike = Math.round(estStrike * 1.35);
    if (typeof getRelicUltDamageMultiplier === 'function') {
      const um = getRelicUltDamageMultiplier('player');
      if (um > 1.0) estStrike = Math.round(estStrike * um);
    }
  }
  const forecastAura = getCommanderAura(battleEngine.playerField);
  if (forecastAura > 0) estStrike = Math.round(estStrike * (1 + forecastAura));
  if (hasFx(attacker, 'GraveCurse')) estStrike = Math.max(1, Math.round(estStrike * 0.70));

  const hasDarkResonance = isResonanceActive('player', 'Dark');
  const executeThreshold = isCharge ? 0.65 : (hasDarkResonance ? ABYSSAL_EXECUTE_THRESHOLD : 0.50);
  if (hasDarkResonance && defender.pv <= Math.floor(defender.maxPv * ABYSSAL_WOUNDED_THRESHOLD)) {
    estStrike += Math.max(1, Math.round(estStrike * ABYSSAL_WOUNDED_BONUS));
  }
  if (role === 'Assassin' && defender.pv <= Math.floor(defender.maxPv * executeThreshold)) {
    const execPct = isCharge ? 90 : (ROLE_SKILL_SCALING.Assassin[attacker.rarity] || 45);
    estStrike += Math.max(1, Math.round(estStrike * (execPct / 100)));
  }
  if (role === 'Berserker' && isCharge) {
    sacrificeDmg = Math.max(1, Math.round(estStrike * BERSERKER_ULT_BONUS));
  }
  if (role === 'Monk') {
    const nextStacks = Math.min(5, (attacker.focusStacks || 0) + 1);
    estStrike = Math.round(estStrike * (1 + ((ROLE_SKILL_SCALING.MonkBonusDmg[attacker.rarity] ?? 8) / 100) * nextStacks));
  }

  let alchemistDmg = 0;
  if (role === 'Alchemist' && (hasFx(defender, 'Burn') || hasFx(defender, 'Bleed') || hasFx(defender, 'ArmorBreak'))) {
    alchemistDmg = Math.max(1, Math.round(defender.maxPv * ((ROLE_SKILL_SCALING.Alchemist[attacker.rarity] ?? 8) / 100)));
  }
  if (typeof getRelicDamageMultiplier === 'function') {
    const rm = getRelicDamageMultiplier(attacker, defender, 'player');
    if (rm > 1.0) estStrike = Math.round(estStrike * rm);
  }
  if (typeof getSigilDamageMultiplier === 'function') {
    // that helper consumes one-shot buffs, so snapshot and restore them: a forecast must never change the game
    const keep = { h: attacker.sigilHarmonicResonanceBuff, g: attacker._sigilGamblerCritActive };
    const sm = getSigilDamageMultiplier(attacker, defender, isCharge);
    attacker.sigilHarmonicResonanceBuff = keep.h;
    attacker._sigilGamblerCritActive = keep.g;
    if (sm > 1.0) estStrike = Math.round(estStrike * sm);
  }
  if (attacker.crescendoBuff && attacker.crescendoBuff > 0) estStrike += Math.round(estStrike * attacker.crescendoBuff);
  if (role === 'Revenant' && !isCharge) estStrike = Math.round(estStrike * (1 + (1 - attacker.pv / attacker.maxPv) * 0.50));

  let inquisitorBonus = 0;
  if (role === 'Inquisitor' && !isCharge) {
    const buffTypes = ['AnthemBuff', 'Bloodrage', 'Haste', 'Taunt', 'ImmovableWall', 'DivineWard', 'Parry', 'TotemWard', 'CrescendoValor'];
    const buffs = (defender.statusEffects || []).filter(s => buffTypes.includes(s.type)).length;
    if (buffs > 0) inquisitorBonus = Math.round(estStrike * buffs * ((ROLE_SKILL_SCALING.InquisitorBuffBonus[attacker.rarity] ?? 20) / 100));
  }

  estStrike += spellbreakerBonusDmg + alchemistDmg + inquisitorBonus;

  const totalDmg = estStrike + sacrificeDmg;
  const willKill = (defender.pv - totalDmg) <= 0;

  let counterNote = "";
  if (willKill) {
    counterNote = attacker.role === 'Berserker' ? "Lethal Strike (Bloodlust)" : "Lethal Strike (No Counter)";
  } else if (attacker.role === 'Ranger' || (isCharge && attacker.role === 'Assassin')) {
    counterNote = "Bypassed (Sniper/Execute)";
  } else if (attacker.role === 'Hexer' && isCharge) {
    counterNote = "Target Stunned (No Counter)";
  } else if (defender.statusEffects && defender.statusEffects.some(s => s.type === 'Stun')) {
    counterNote = "Target Stunned (No Counter)";
  } else {
    const newDefPv = Math.max(0, defender.pv - totalDmg);
    let baseCounter = calculateMitigatedDamage(newDefPv, attacker.def);
    const counterElemRes = getElementalAdvantage(defender.element, attacker.element);
    let estCounter = Math.round(baseCounter * counterElemRes.mult);
    if (counterElemRes.mult > 1 && isResonanceActive('player', 'Earth')) {
      estCounter = Math.round(estCounter * (1 - TERRA_ELEM_REDUCTION));
    }
    if (attacker.role === 'Warrior') {
      estCounter = Math.max(1, Math.round(estCounter * (1 - getWarriorRetaliationReduction(attacker))));
    }
    counterNote = `~${estCounter} DMG`;
  }

  return {
    strikeDmg: totalDmg,
    willKill,
    elemLabel: elemRes.label || "Neutral (1.0x)",
    elemMultiplier: elemRes.mult,
    counterNote
  };
}

function showTargetForecast(targetIndex) {
  if (battleEngine.turn !== 'player' || battleEngine.selectedAllySlot === null) return;
  const attacker = battleEngine.playerField[battleEngine.selectedAllySlot];
  const defender = battleEngine.enemyField[targetIndex];
  if (!attacker || !defender || defender.pv <= 0) return;

  const isCharge = battleEngine.attackMode === 'charge';
  const forecast = predictCombatOutcome(attacker, defender, isCharge);
  if (!forecast) return;

  const bar = document.getElementById('tactical-forecast-bar');
  const nameEl = document.getElementById('forecast-target-name');
  const badgeEl = document.getElementById('forecast-elem-badge');
  const strikeEl = document.getElementById('forecast-strike-dmg');
  const counterEl = document.getElementById('forecast-counter-dmg');
  if (!bar || !nameEl || !badgeEl || !strikeEl || !counterEl) return;

  nameEl.innerText = `${defender.name} (${defender.element})`;
  
  if (forecast.elemMultiplier > 1) {
    badgeEl.className = "px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
    badgeEl.innerText = "+25% ADV";
  } else if (forecast.elemMultiplier < 1) {
    badgeEl.className = "px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40";
    badgeEl.innerText = "-15% DISADV";
  } else {
    badgeEl.className = "px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-800 text-slate-300 border border-slate-700";
    badgeEl.innerText = "Neutral";
  }

  strikeEl.innerHTML = `${forecast.strikeDmg} DMG ${forecast.willKill ? '<span class="text-amber-400 font-bold">(LETHAL)</span>' : ''}`;
  counterEl.innerText = forecast.counterNote;

  bar.classList.remove('hidden');
}

function hideTargetForecast() {
  const bar = document.getElementById('tactical-forecast-bar');
  if (bar) bar.classList.add('hidden');
}

function selectEnemyTarget(targetIndex) {
  if (battleEngine.turn !== 'player' || battleEngine.isResolving) return;
  if (battleEngine.selectedAllySlot === null) {
    logBattleEvent("<span class='text-amber-400 font-medium'>Please select your active attacker card first!</span>");
    return;
  }
  const enemy = battleEngine.enemyField[targetIndex];
  if (!enemy || enemy.pv <= 0) return;
  if (enemy.isAirborne) {
    logBattleEvent(`🌪️ <b>${enemy.name}</b> is high in the air and cannot be targeted!`);
    return;
  }

  hideTargetForecast();
  const isCharge = battleEngine.attackMode === 'charge';
  executeAttackSequence(battleEngine.selectedAllySlot, targetIndex, 'player', isCharge);
}

function triggerSoulHarvest(deceasedUnit) {
  if (!deceasedUnit) return;
  const allLivingUnits = [
    ...battleEngine.playerField.map((u, idx) => ({ unit: u, side: 'player', slot: idx })),
    ...battleEngine.enemyField.map((u, idx) => ({ unit: u, side: 'enemy', slot: idx }))
  ];

  allLivingUnits.forEach(({ unit, side, slot }) => {
    if (unit && unit.pv > 0 && unit.role === 'Necromancer' && unit !== deceasedUnit) {
      const pvPct = (ROLE_SKILL_SCALING.NecromancerPV[unit.rarity] ?? 10) / 100;
      const defGain = ROLE_SKILL_SCALING.NecromancerDEF[unit.rarity] ?? 5;

      const pvGain = Math.max(1, Math.round(unit.maxPv * pvPct));
      unit.maxPv += pvGain;
      unit.pv += pvGain;
      unit.def += defGain;
      unit.soulsHarvested = (unit.soulsHarvested || 0) + 1;

      updateCardVisualStats(side, slot);
      showFloatingText(side, slot, `+${pvGain} PV / +${defGain} DEF`, 'text-purple-400');
      logBattleEvent(`💀 <b>${unit.name}</b> harvested the soul of <b>${deceasedUnit.name}</b> (+${pvGain} Max PV, +${defGain} DEF)!`);
      playSound('heal');
    }
  });
}

// Mimic wrapper: for its next normal strikes the Mimic really does fight with the role it copied.
function executeAttackSequence(attackerSlot, defenderSlot, side, isChargeAttack = false) {
  const field = side === 'player' ? battleEngine.playerField : battleEngine.enemyField;
  const unit = field[attackerSlot];
  let borrowed = false;
  if (unit && unit.role === 'Mimic' && !isChargeAttack && unit.mimicCopiedRole && unit.mimicCopiedRole !== 'Mimic' && unit.mimicRoleTurnsRemaining > 0) {
    unit.mimicRoleTurnsRemaining -= 1;
    logBattleEvent(`🎭 <b>${unit.name}</b> strikes with the borrowed <b>${unit.mimicCopiedRole}</b> passive!`);
    unit.role = unit.mimicCopiedRole;
    borrowed = true;
  }
  try {
    return _executeAttackSequenceInner(attackerSlot, defenderSlot, side, isChargeAttack);
  } finally {
    if (borrowed) unit.role = 'Mimic';
  }
}

function _executeAttackSequenceInner(attackerSlot, defenderSlot, side, isChargeAttack = false) {
  battleEngine.isResolving = true;

  const attackerField = side === 'player' ? battleEngine.playerField : battleEngine.enemyField;
  const defenderField = side === 'player' ? battleEngine.enemyField : battleEngine.playerField;
  const attackerSide = side;
  const defenderSide = side === 'player' ? 'enemy' : 'player';

  const attacker = attackerField[attackerSlot];
  const defender = defenderField[defenderSlot];

  // Grid Lockdown: a locked unit cannot use its charge skill
  if (isChargeAttack && attacker.statusEffects.some(s => s.type === 'GridLock')) {
    isChargeAttack = false;
    showFloatingText(attackerSide, attackerSlot, 'GRID LOCKED: NORMAL STRIKE', 'text-amber-400 font-bold');
    logBattleEvent(`🧲 <b>${attacker.name}</b> is Grid Locked and cannot use its charge skill!`);
  }

  // 1. Bleed status damage check
  if (attacker.statusEffects.some(s => s.type === 'Bleed')) {
    const bleedDmg = Math.max(1, Math.round(attacker.maxPv * 0.08));
    attacker.pv = Math.max(1, attacker.pv - bleedDmg);
    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `-${bleedDmg} BLEED`, 'text-rose-500');
    logBattleEvent(`🩸 <b>${attacker.name}</b> suffered ${bleedDmg} Bleed damage from moving!`);
  }

  // 2. Saboteur Trap detonation trigger on acting unit
  const trapIndex = attacker.statusEffects.findIndex(s => s.type === 'Trap');
  if (trapIndex !== -1) {
    const trapEffect = attacker.statusEffects[trapIndex];
    const trapDamage = trapEffect.trapDamage || 45;
    attacker.pv = Math.max(1, attacker.pv - trapDamage);
    if (attacker.energy > 0) attacker.energy = Math.max(0, attacker.energy - 1);
    attacker.statusEffects.splice(trapIndex, 1);

    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `-${trapDamage} TRAP (-1 PIP)`, 'text-amber-400 font-bold');
    logBattleEvent(`💣 <b>${attacker.name}</b> triggered a concealed <b>Booby Trap</b> (-${trapDamage} PV, -1 Pip)!`);
  }

  if (isChargeAttack) {
    // Relic: First Ultimate Discount (Aetherial Compression Conduit)
    const hasDiscount = (typeof hasRelicFirstUltDiscount === 'function') && hasRelicFirstUltDiscount(attackerSide);
    if (hasDiscount) {
      attacker.energy = Math.max(0, (attacker.energy || 0) - 2);
      if (typeof consumeRelicFirstUltDiscount === 'function') {
        consumeRelicFirstUltDiscount(attackerSide, attacker);
      }
    } else {
      attacker.energy = 0;
    }
    playSound('charge');

    // Spire Boss Floor 25: Malakor Null Horizon (drains 1 Pip from player on Ultimate)
    if (battleEngine.matchMode === 'spire' && attackerSide === 'player' && typeof spireState !== 'undefined' && spireState.currentFloor === 25) {
      if (attacker.energy > 0) {
        attacker.energy = Math.max(0, attacker.energy - 1);
        showFloatingText(attackerSide, attackerSlot, '-1 PIP (NULL HORIZON)', 'text-purple-400 font-bold');
        logBattleEvent(`🕳️ <b>Malakor's Null Horizon:</b> Drained 1 Pip from <b>${attacker.name}</b> upon casting Ultimate!`);
      }
    }

    // Relic: Drain Enemy on Ult (Abyssal Null-Sphere)
    if (typeof triggerRelicDrainEnemyOnUlt === 'function') {
      triggerRelicDrainEnemyOnUlt(attacker, attackerSide, defenderField, defenderSide);
    }

    // Relic: Ultimate Chain Resonance (Harmonic Symphony Baton)
    if (typeof triggerRelicUltChainResonance === 'function') {
      triggerRelicUltChainResonance(attacker, attackerSide, attackerField);
    }
  } else {
    addCardEnergy(attacker, 1);
    playSound('attack');
  }

  const attackerCardEl = document.getElementById(`${attackerSide}-card-${attackerSlot}`);
  if (attackerCardEl) {
    attackerCardEl.classList.add(attackerSide === 'player' ? 'lunge-ally' : 'lunge-enemy');
  }

  // Sentinel Intercept Check
  let actualDefenderSlot = defenderSlot;
  let actualDefender = defender;
  let isIntercepted = false;

  if (defender.pv <= Math.floor(defender.maxPv * 0.40)) {
    const sentinelSlot = defenderField.findIndex((ally, sIdx) => 
      sIdx !== defenderSlot &&
      ally && ally.pv > 0 &&
      ally.role === 'Sentinel' &&
      !ally.statusEffects.some(s => s.type === 'Stun')
    );

    if (sentinelSlot !== -1) {
      actualDefenderSlot = sentinelSlot;
      actualDefender = defenderField[sentinelSlot];
      isIntercepted = true;
      showFloatingText(defenderSide, actualDefenderSlot, 'INTERCEPT!', 'text-amber-300');
      logBattleEvent(`🛡️ <b>${actualDefender.name}</b> intercepted the attack meant for <b>${defender.name}</b>!`);
    }
  }

  const finalTarget = actualDefender;

  let sacrificeBonusDmg = 0;
  let berserkerSacPv = 0;
  if (attacker.role === 'Berserker') {
    const sacPct = isChargeAttack ? 25 : (ROLE_SKILL_SCALING.Berserker[attacker.rarity] || 15);
    const sacPv = Math.max(1, Math.round(attacker.pv * (sacPct / 100)));
    attacker.pv = Math.max(1, attacker.pv - sacPv);
    updateCardVisualStats(attackerSide, attackerSlot);
    berserkerSacPv = sacPv;
    sacrificeBonusDmg = isChargeAttack ? 0 : sacPv * BERSERKER_BONUS_MULT;
    showFloatingText(attackerSide, attackerSlot, `-${sacPv} PV`, 'text-purple-400');
    logBattleEvent(`🩸 <b>${attacker.name}</b> sacrificed ${sacPv} PV for destructive wrath!`);
  }
  
  let spellbreakerBonusDmg = 0;
  if (attacker.role === 'Spellbreaker') {
    const baseDefOriginal = (getCardBaseData(finalTarget.id).baseDEF) * (finalTarget.isRainbow ? 1.25 : 1.0);
    const currentDef = finalTarget.def;

    if (currentDef > baseDefOriginal) {
      const excessDef = currentDef - baseDefOriginal;
      const stripRatio = (ROLE_SKILL_SCALING.Spellbreaker[attacker.rarity] ?? 50) / 100;
      const defStripped = Math.round(excessDef * stripRatio);

      finalTarget.def -= defStripped;
      spellbreakerBonusDmg = defStripped;

      updateCardVisualStats(defenderSide, actualDefenderSlot);
      showFloatingText(defenderSide, actualDefenderSlot, `-${defStripped} BUFF DEF`, 'text-purple-400');
      logBattleEvent(`⚡ <b>${attacker.name}</b>'s <i>Nullifying Brand</i> shattered ${defStripped} bonus DEF from <b>${finalTarget.name}</b>!`);
    }
  }

  let effectiveDef = finalTarget.def;
  if (finalTarget.statusEffects.some(s => s.type === 'ArmorBreak')) {
    effectiveDef = Math.round(effectiveDef * 0.6);
  }
  if (finalTarget.statusEffects.some(s => s.type === 'Necrosis')) {
    const necrosisDrop = (ROLE_SKILL_SCALING.BlightNecrosisDef[attacker.rarity] ?? 15) / 100;
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - necrosisDrop)));
  }

  // Spire Boss Floor 25: Malakor ignores barriers and kinetic armor completely
  if (battleEngine.matchMode === 'spire' && attackerSide === 'enemy' && typeof spireState !== 'undefined' && spireState.currentFloor === 25) {
    effectiveDef = 0;
  }

  if (attacker.role === 'Mage') {
    const penPct = isChargeAttack ? 100 : (ROLE_SKILL_SCALING.Mage[attacker.rarity] || 35);
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - (penPct / 100))));
    logBattleEvent(`🔮 <b>${attacker.name}</b> pierced ${penPct}% DEF (Effective DEF: ${effectiveDef})!`);
  }

  if (attacker.role === 'Dreadnought') {
    effectiveDef = Math.max(0, Math.round(effectiveDef * 0.75));
  }

  // Maledictor Curse: each stack lowers DEF by 4% (max 20%)
  const curseOnTarget = finalTarget.statusEffects.find(s => s.type === 'Curse');
  if (curseOnTarget) {
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - Math.min(0.20, 0.04 * (curseOnTarget.stacks || 1)))));
  }

  // Dragoon DEF piercing (FIX: previously applied after the damage was already calculated, so it did nothing)
  if (attacker.role === 'Dragoon') {
    const piercePct = (ROLE_SKILL_SCALING.DragoonPierce && ROLE_SKILL_SCALING.DragoonPierce[attacker.rarity] || 35) / 100;
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - piercePct)));
  }

  // Gladiator Crowd Favor armor penetration (FIX: same ordering bug)
  if (attacker.role === 'Gladiator' && attacker.crowdFavorStacks > 0) {
    const penPerStack = (ROLE_SKILL_SCALING.GladiatorArmorPen[attacker.rarity] || 15) / 100;
    const totalPen = Math.min(0.85, penPerStack * attacker.crowdFavorStacks);
    effectiveDef = Math.max(0, Math.round(effectiveDef * (1 - totalPen)));
  }

  let baseStrikeDmg = calculateMitigatedDamage(attacker.pv, effectiveDef);
  const elemRes = getElementalAdvantage(attacker.element, defender.element);

  // Spire Biome Light (Floors 26-30): Astral Convergence amplifies Advantage and Ultimates
  if (battleEngine.matchMode === 'spire' && typeof spireState !== 'undefined') {
    const biome = typeof getSpireBiome === 'function' ? getSpireBiome(spireState.currentFloor) : null;
    if (biome && biome.id === 'biome_light') {
      if (elemRes.mult > 1.0) elemRes.mult += 0.15;
      if (isChargeAttack) baseStrikeDmg = Math.round(baseStrikeDmg * 1.30);
    }
  }

  // Spire Boss Floor 20: Ignisaur Flame Detonation (+15% Max PV bonus against burning foes)
  if (battleEngine.matchMode === 'spire' && attackerSide === 'enemy' && typeof spireState !== 'undefined' && spireState.currentFloor === 20) {
    if (finalTarget.statusEffects.some(s => s.type === 'Burn')) {
      const detonationBonus = Math.max(1, Math.round(finalTarget.maxPv * 0.15));
      baseStrikeDmg += detonationBonus;
      showFloatingText(defenderSide, actualDefenderSlot, `+${detonationBonus} FLAME DETONATION`, 'text-orange-500 font-black');
      logBattleEvent(`🐉 <b>Ignisaur's Flame Detonation:</b> Detonated burns for ${detonationBonus} bonus damage!`);
    } else {
      applyStatusEffect(finalTarget, 'Burn', 2);
    }
  }

  // Relic: Prismatic Inversion Aura (Mirror of Twisted Fates)
  if (elemRes.mult > 1.0 && typeof hasRelicPrismaticInversion === 'function' && hasRelicPrismaticInversion(defenderSide)) {
    elemRes.mult = 0.80;
    elemRes.label = 'INVERTED ADVANTAGE (0.80x)';
    showFloatingText(defenderSide, actualDefenderSlot, 'TWISTED FATES (0.80x)', 'text-purple-400 font-bold');
  } else if (elemRes.mult > 1.0 && typeof getRelicElemAdvBonus === 'function') {
    const relicAdvBonus = getRelicElemAdvBonus(attackerSide);
    if (relicAdvBonus > 0) {
      elemRes.mult += relicAdvBonus;
      elemRes.label = `ELEM ADVANTAGE (+${Math.round((elemRes.mult - 1) * 100)}%)`;
    }
  }

  // Elementalist Disadvantage Negation & Prismatic Pierce
  if (attacker.role === 'Elementalist') {
    if (isChargeAttack) {
      elemRes.mult = 1.25;
      elemRes.label = 'PRISMATIC ADVANTAGE (+25%)';
    } else if (elemRes.mult < 1.0) {
      elemRes.mult = 1.0;
      elemRes.label = 'PRISMATIC NEUTRAL (1.0x)';
    } else if (elemRes.mult === 1.0) {
      const pierceChance = (ROLE_SKILL_SCALING.ElementalistPierce[attacker.rarity] ?? 35) / 100;
      if (Math.random() < pierceChance) {
        elemRes.mult = 1.25;
        elemRes.label = 'PRISMATIC PIERCE (+25%)';
        showFloatingText(attackerSide, attackerSlot, 'PRISMATIC PIERCE (+25%)', 'text-cyan-300 font-bold');
        logBattleEvent(`💠 <b>${attacker.name}</b> pierced elemental defenses (+25% Advantage)!`);
      }
    }
  }

  baseStrikeDmg = Math.round(baseStrikeDmg * elemRes.mult);
  
  if (isIntercepted) {
    const mitigationPct = (ROLE_SKILL_SCALING.Sentinel[finalTarget.rarity] ?? 25) / 100;
    baseStrikeDmg = Math.max(1, Math.round(baseStrikeDmg * (1 - mitigationPct)));
    showFloatingText(defenderSide, actualDefenderSlot, `COVER -${Math.round(mitigationPct * 100)}%`, 'text-amber-300');
  }

  if (defenderSide === 'player' && elemRes.mult > 1 && isResonanceActive('player', 'Earth')) {
    baseStrikeDmg = Math.round(baseStrikeDmg * (1 - TERRA_ELEM_REDUCTION));
    showFloatingText(defenderSide, defenderSlot, 'TERRA -15%', 'text-amber-300');
  }

  if (elemRes.label) {
    showFloatingText(defenderSide, defenderSlot, elemRes.mult > 1 ? '+25% ELEM' : '-15% ELEM', elemRes.mult > 1 ? 'text-amber-300' : 'text-slate-400');
  }

  if (attacker.role === 'Warrior') {
    const rageMult = getWarriorRageMultiplier(attacker);
    if (rageMult > 1.005) {
      baseStrikeDmg = Math.round(baseStrikeDmg * rageMult);
      const ragePct = Math.round((rageMult - 1) * 100);
      showFloatingText(attackerSide, attackerSlot, `RAGE +${ragePct}%`, 'text-red-400');
      logBattleEvent(`😡 <b>${attacker.name}</b> is enraged by its wounds (+${ragePct}% DMG)!`);
    }
  }

  // Relic: Low PV Frenzy
  if (typeof getRelicLowPvFrenzyMultiplier === 'function') {
    const frenzyMult = getRelicLowPvFrenzyMultiplier(attacker, attackerSide);
    if (frenzyMult > 1.0) {
      baseStrikeDmg = Math.round(baseStrikeDmg * frenzyMult);
      showFloatingText(attackerSide, attackerSlot, 'RELIC FRENZY (+30%)', 'text-rose-500 font-bold');
    }
  }

  // Relic: Chain Resonance Buff (+15% from teammate's Ult)
  if (attacker.relicResonanceBuff && attacker.relicResonanceBuff > 0) {
    baseStrikeDmg = Math.round(baseStrikeDmg * (1 + attacker.relicResonanceBuff));
    attacker.relicResonanceBuff = 0;
    showFloatingText(attackerSide, attackerSlot, 'CHAIN RESONANCE (+15%)', 'text-amber-300 font-bold');
  }

  // 1. Valkyrie Kinetic Discharge on Normal Strike
  if (attacker.role === 'Valkyrie' && !isChargeAttack && attacker.valhallaFuryStored > 0) {
    const discharge = attacker.valhallaFuryStored;
    baseStrikeDmg += discharge;
    attacker.valhallaFuryStored = 0;
    showFloatingText(attackerSide, attackerSlot, `+${discharge} FURY DISCHARGE`, 'text-amber-400 font-black');
    logBattleEvent(`⚡ <b>${attacker.name}</b> discharged ${discharge} stored Valhalla Fury into the attack!`);
  }

  // Herald Anthem Buff (+ATK)
  if (attacker.statusEffects.some(s => s.type === 'AnthemBuff')) {
    const anthemBonus = (ROLE_SKILL_SCALING.HeraldDmgBuff[attacker.rarity] ?? 10) / 100;
    baseStrikeDmg = Math.round(baseStrikeDmg * (1 + anthemBonus));
    showFloatingText(attackerSide, attackerSlot, `ANTHEM +${Math.round(anthemBonus * 100)}%`, 'text-yellow-300');
  }

  // Ravager Bloodrage Buff (+25% ATK)
  if (attacker.statusEffects.some(s => s.type === 'Bloodrage')) {
    baseStrikeDmg = Math.round(baseStrikeDmg * 1.25);
    showFloatingText(attackerSide, attackerSlot, 'BLOODRAGE +25%', 'text-rose-500 font-bold');
  }

  // Coliseum Rival On-Attack Traits & Weather Spectacle Modifier
  if (battleEngine.matchMode === 'coliseum' && typeof handleColiseumOnAttackTraits === 'function' && battleEngine.coliseumRival) {
    const colMod = handleColiseumOnAttackTraits(battleEngine.coliseumRival, attacker, finalTarget, isChargeAttack, attackerSide);
    if (colMod.bonusMult > 1.0) baseStrikeDmg = Math.round(baseStrikeDmg * colMod.bonusMult);
    if (colMod.bonusDmg > 0) baseStrikeDmg += colMod.bonusDmg;
  }

  // Herald Crescendo of Valor (+25% Strike Scaling)
  if (attacker.statusEffects.some(s => s.type === 'CrescendoValor')) {
    baseStrikeDmg = Math.round(baseStrikeDmg * 1.25);
  }

  // Consuming Chronomancer Haste on attacker
  const hasteIdx = attacker.statusEffects.findIndex(s => s.type === 'Haste');
  if (hasteIdx !== -1) {
    baseStrikeDmg = Math.round(baseStrikeDmg * 1.25);
    addCardEnergy(attacker, 1);
    attacker.statusEffects.splice(hasteIdx, 1);
    showFloatingText(attackerSide, attackerSlot, 'HASTE (+25% & +1 PIP)', 'text-amber-300 font-black');
    logBattleEvent(`⏳ <b>${attacker.name}</b> surged with <b>Temporal Haste</b> (+25% DMG & +1 Pip)!`);
  }

  if (isChargeAttack) {
    baseStrikeDmg = Math.round(baseStrikeDmg * 1.35);
    if (typeof getRelicUltDamageMultiplier === 'function') {
      const ultMult = getRelicUltDamageMultiplier(attackerSide);
      if (ultMult > 1.0) {
        baseStrikeDmg = Math.round(baseStrikeDmg * ultMult);
        showFloatingText(attackerSide, attackerSlot, 'CATACLYSM AMP', 'text-amber-300 font-black');
      }
    }
  }

  const commanderAura = getCommanderAura(attackerField);
  if (commanderAura > 0) {
    baseStrikeDmg = Math.round(baseStrikeDmg * (1 + commanderAura));
    showFloatingText(attackerSide, attackerSlot, `COMMAND +${Math.round(commanderAura * 100)}%`, 'text-sky-300');
  }
  
  if (attacker.statusEffects.some(s => s.type === 'GraveCurse')) {
    baseStrikeDmg = Math.max(1, Math.round(baseStrikeDmg * 0.70));
    showFloatingText(attackerSide, attackerSlot, 'CURSED (-30% ATK)', 'text-purple-400');
  }

  if (isResonanceActive(side, 'Dark') && defender.pv <= Math.floor(defender.maxPv * ABYSSAL_WOUNDED_THRESHOLD)) {
    const woundedBonus = Math.max(1, Math.round(baseStrikeDmg * ABYSSAL_WOUNDED_BONUS));
    baseStrikeDmg += woundedBonus;
    showFloatingText(defenderSide, defenderSlot, `+${woundedBonus} ABYSSAL`, 'text-purple-400');
  }

  if (attacker.role === 'Assassin') {
    const threshold = isChargeAttack ? 0.65 : (isResonanceActive(side, 'Dark') ? ABYSSAL_EXECUTE_THRESHOLD : 0.50);
    if (defender.pv <= Math.floor(defender.maxPv * threshold)) {
      const execPct = isChargeAttack ? 90 : (ROLE_SKILL_SCALING.Assassin[attacker.rarity] || 45);
      const bonusDmg = Math.max(1, Math.round(baseStrikeDmg * (execPct / 100)));
      baseStrikeDmg += bonusDmg;
      showFloatingText(defenderSide, defenderSlot, `+${bonusDmg} EXECUTE`, 'text-red-500');
      logBattleEvent(`🎯 <b>${attacker.name}</b> triggered <i>Executioner's Mark</i> (+${execPct}% DMG)!`);
    }
  }

  if (attacker.role === 'Berserker' && isChargeAttack) {
    sacrificeBonusDmg = Math.max(1, Math.round(baseStrikeDmg * BERSERKER_ULT_BONUS));
  }
  
  if (attacker.role === 'Monk') {
    const prevFocus = attacker.focusStacks || 0;
    attacker.focusStacks = Math.min(5, prevFocus + 1);
    const dmgBonusPerStack = (ROLE_SKILL_SCALING.MonkBonusDmg[attacker.rarity] ?? 8) / 100;
    const defBonusPerStack = ROLE_SKILL_SCALING.MonkBonusDef[attacker.rarity] ?? 4;
    
    // FIX: DEF was added on every attack even at max stacks (unbounded); now only when a stack is gained.
    if (attacker.focusStacks > prevFocus) attacker.def += defBonusPerStack;
    baseStrikeDmg = Math.round(baseStrikeDmg * (1 + (dmgBonusPerStack * attacker.focusStacks)));
    showFloatingText(attackerSide, attackerSlot, `FOCUS x${attacker.focusStacks}`, 'text-amber-300');
    logBattleEvent(`🥋 <b>${attacker.name}</b> channeled <i>Inner Focus</i> (Stack ${attacker.focusStacks}/5)!`);
  }

  let alchemistCatalystDmg = 0;
  if (attacker.role === 'Alchemist') {
    const hasDebuff = finalTarget.statusEffects.some(s => s.type === 'Burn' || s.type === 'Bleed' || s.type === 'ArmorBreak');
    if (hasDebuff) {
      const combustionPct = (ROLE_SKILL_SCALING.Alchemist[attacker.rarity] ?? 8) / 100;
      alchemistCatalystDmg = Math.max(1, Math.round(finalTarget.maxPv * combustionPct));
      showFloatingText(defenderSide, actualDefenderSlot, `+${alchemistCatalystDmg} COMBUSTION`, 'text-emerald-400');
      logBattleEvent(`⚗️ <b>${attacker.name}</b> catalyzed volatile reagents on <b>${finalTarget.name}</b> for ${alchemistCatalystDmg} true damage!`);
    }
  }
  
  if (typeof getRelicDamageMultiplier === 'function') {
    const relicMultiplier = getRelicDamageMultiplier(attacker, finalTarget, attackerSide);
    if (relicMultiplier > 1.0) {
      baseStrikeDmg = Math.round(baseStrikeDmg * relicMultiplier);
    }
  }
  
  if (typeof getSigilDamageMultiplier === 'function') {
    const sigilMult = getSigilDamageMultiplier(attacker, finalTarget, isChargeAttack);
    if (sigilMult > 1.0) {
      baseStrikeDmg = Math.round(baseStrikeDmg * sigilMult);
    }
  }
  
  if (attacker.crescendoBuff && attacker.crescendoBuff > 0) {
    const bonusFromCrescendo = Math.round(baseStrikeDmg * attacker.crescendoBuff);
    baseStrikeDmg += bonusFromCrescendo;
    showFloatingText(attackerSide, attackerSlot, `CRESCENDO +${Math.round(attacker.crescendoBuff * 100)}%`, 'text-cyan-300');
    logBattleEvent(`🎵 <b>${attacker.name}</b> unleashed rhythmic fury with <b>Grand Crescendo</b> (+${bonusFromCrescendo} DMG)!`);
    attacker.crescendoBuff = 0;
  }

  if (attacker.role === 'Corsair' && !isChargeAttack) {
    const critChance = (ROLE_SKILL_SCALING.CorsairCrit[attacker.rarity] ?? 40) / 100;
    if (Math.random() < critChance) {
      baseStrikeDmg = Math.round(baseStrikeDmg * 1.75);
      addCardEnergy(attacker, 1);
      showFloatingText(attackerSide, attackerSlot, 'CRIT! (1.75x) +1 PIP', 'text-amber-300 font-black');
      logBattleEvent(`🎲 <b>JACKPOT!</b> <b>${attacker.name}</b> rolled a <i>Critical Strike</i> (1.75x DMG & +1 Pip)!`);
      playSound('rainbow');
    }
  }

  // Revenant: hits harder the more PV it is missing (FIX: used to be applied after damage was dealt)
  if (attacker.role === 'Revenant' && !isChargeAttack) {
    const missingPvRatio = 1 - (attacker.pv / attacker.maxPv);
    baseStrikeDmg = Math.round(baseStrikeDmg * (1 + missingPvRatio * 0.50));
  }

  // Gladiator: Crowd Favor grants crit chance (previously only shown in the log, never rolled)
  if (attacker.role === 'Gladiator' && (attacker.crowdFavorStacks || 0) > 0) {
    const critPct = (ROLE_SKILL_SCALING.GladiatorCritBonus[attacker.rarity] || 12) * attacker.crowdFavorStacks;
    if (Math.random() * 100 < critPct) {
      baseStrikeDmg = Math.round(baseStrikeDmg * 1.5);
      showFloatingText(attackerSide, attackerSlot, 'CROWD CRIT! (1.5x)', 'text-amber-300 font-black');
      logBattleEvent(`🪓 The crowd roared! <b>${attacker.name}</b> landed a <i>Critical Hit</i> (1.5x DMG)!`);
    }
  }

  // INQUISITOR NORMAL STRIKE SCALING
  let inquisitorBonusDmg = 0;
  if (attacker.role === 'Inquisitor' && !isChargeAttack) {
    const positiveBuffTypes = ['AnthemBuff', 'Bloodrage', 'Haste', 'Taunt', 'ImmovableWall', 'DivineWard', 'Parry', 'TotemWard', 'CrescendoValor'];
    const activeBuffs = finalTarget.statusEffects.filter(s => positiveBuffTypes.includes(s.type)).length;
    
    if (activeBuffs > 0) {
      const bonusPct = (ROLE_SKILL_SCALING.InquisitorBuffBonus[attacker.rarity] ?? 20) / 100;
      inquisitorBonusDmg = Math.round(baseStrikeDmg * (activeBuffs * bonusPct));
      showFloatingText(defenderSide, actualDefenderSlot, `+${inquisitorBonusDmg} ANATHEMA (${activeBuffs} BUFFS)`, 'text-amber-400 font-black');
      logBattleEvent(`⚖️ <b>${attacker.name}</b> condemned <b>${finalTarget.name}</b>'s ${activeBuffs} blessings for +${inquisitorBonusDmg} bonus damage!`);
    } else {
      applyStatusEffect(finalTarget, 'Guilt', 2);
      finalTarget.statusEffects.find(s => s.type === 'Guilt').siphonSide = attackerSide;
      showFloatingText(defenderSide, actualDefenderSlot, 'GUILT INFLICTED', 'text-purple-400 font-bold');
      logBattleEvent(`⚖️ <b>${attacker.name}</b> branded <b>${finalTarget.name}</b> with Guilt (Healing & Pips siphoned to vanguard)!`);
    }
  }

  const totalStrikeDamage = baseStrikeDmg + sacrificeBonusDmg + spellbreakerBonusDmg + alchemistCatalystDmg + inquisitorBonusDmg;
  let actualDmgDealt = Math.min(defender.pv, totalStrikeDamage);

  // Coliseum Match 7 Apex Boss Reflection & Reaction
  if (battleEngine.matchMode === 'coliseum' && typeof handleColiseumReflectAndReaction === 'function' && battleEngine.coliseumRival) {
    handleColiseumReflectAndReaction(battleEngine.coliseumRival, attacker, finalTarget, actualDmgDealt, defenderSide);
  }

  // Trigger on-attack relic effects (Armor Break, Pip Steal, Burn chance)
  if (typeof triggerRelicOnAttack === 'function') {
    triggerRelicOnAttack(attacker, finalTarget, attackerSide, defenderSide, actualDefenderSlot);
  }
  
 if (typeof triggerSigilsOnAttack === 'function') {
    triggerSigilsOnAttack(attacker, finalTarget, attackerSide, defenderSide, actualDefenderSlot, defenderField);
  }

  let mathBreakdownHTML = '';
  if (typeof formatDamageMathBreakdown === 'function') {
    mathBreakdownHTML = formatDamageMathBreakdown({
      atkName: attacker.name,
      basePv: attacker.pv,
      def: finalTarget.def,
      effDef: effectiveDef,
      rawMitigated: calculateMitigatedDamage(attacker.pv, effectiveDef),
      elemMult: elemRes.mult,
      elemLabel: elemRes.label,
      bonusMult: (totalStrikeDamage / Math.max(1, baseStrikeDmg)),
      finalDmg: totalStrikeDamage
    });
  }
  const activeSkillDisplayName = isChargeAttack ? attacker.chargeSkillName : attacker.skillName;
  logBattleEvent(`⚔️ <b>${attacker.name}</b> unleashed <b>${activeSkillDisplayName}</b> on <b>${defender.name}</b> for <span class="text-rose-400 font-bold">${totalStrikeDamage} DMG</span>! ${mathBreakdownHTML}`);

  if (battleEngine.matchMode === 'sandbox_arena' && typeof recordSandboxDamageDealt === 'function') {
    recordSandboxDamageDealt(actualDmgDealt);
  }

  if (finalTarget.isDummy && finalTarget.isImmortal && finalTarget.pv <= 0) {
    finalTarget.pv = 1;
    updateCardVisualStats(defenderSide, actualDefenderSlot);
  }
  
  if (attacker.role === 'Gladiator') {
    attacker.crowdFavorStacks = Math.min(3, (attacker.crowdFavorStacks || 0) + 1);
    const critRate = (ROLE_SKILL_SCALING.GladiatorCritBonus[attacker.rarity] || 12) * attacker.crowdFavorStacks;
    showFloatingText(attackerSide, attackerSlot, `FAVOR x${attacker.crowdFavorStacks}`, 'text-amber-400 font-bold');
    logBattleEvent(`🪓 <b>${attacker.name}</b> rallied the arena crowd (+${critRate}% Crit Rate, +DEF Pen)!`);
  }

  if (attacker.role === 'Priest') {
    let lowestAlly = null;
    let minPvRatio = 1.0;
    let lowestSlot = -1;

    attackerField.forEach((ally, aIdx) => {
      if (ally && ally.pv > 0) {
        const ratio = ally.pv / ally.maxPv;
        if (ratio < minPvRatio) {
          minPvRatio = ratio;
          lowestAlly = ally;
          lowestSlot = aIdx;
        }
      }
    });

    if (lowestAlly && lowestAlly.pv < lowestAlly.maxPv) {
      const healPct = (ROLE_SKILL_SCALING.PriestHeal[attacker.rarity] || 8) / 100;
      const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;
      const healAmt = Math.max(1, Math.round(lowestAlly.maxPv * healPct * cauterize));
      applyHealing(lowestAlly, healAmt);
      updateCardVisualStats(attackerSide, lowestSlot);
      showFloatingText(attackerSide, lowestSlot, `+${healAmt} GRACE`, 'text-emerald-400 font-bold');
      logBattleEvent(`🕊️ <b>${attacker.name}</b>'s Sacred Grace restored ${healAmt} PV to <b>${lowestAlly.name}</b>!`);
      playSound('heal');

      // Spire Boss Floor 15: Nerezza Drowning Deluge (50% of healing damages healer as True Damage)
      if (battleEngine.matchMode === 'spire' && attackerSide === 'player' && typeof spireState !== 'undefined' && spireState.currentFloor === 15) {
        const backlash = Math.max(1, Math.round(healAmt * 0.50));
        attacker.pv = Math.max(0, attacker.pv - backlash);
        updateCardVisualStats(attackerSide, attackerSlot);
        showFloatingText(attackerSide, attackerSlot, `-${backlash} DROWNING DELUGE`, 'text-cyan-400 font-black');
        logBattleEvent(`🌊 <b>Nerezza's Drowning Deluge:</b> Heals strike back! Dealt ${backlash} True Damage to <b>${attacker.name}</b>!`);
      }
    }
  }
	
  if (!isChargeAttack) {
    // GEOMANCER LEY-TRENCH
    if (attacker.role === 'Geomancer') {
      applyStatusEffect(finalTarget, 'LeyTrench', 2);
      showFloatingText(defenderSide, actualDefenderSlot, 'LEY-TRENCH CARVED', 'text-amber-500 font-black');
      logBattleEvent(`🌋 <b>${attacker.name}</b> carved a seismic Ley-Trench into slot ${actualDefenderSlot + 1}!`);
    }

    // MIMIC ECHO FACSIMILE
    if (attacker.role === 'Mimic') {
      attacker.mimicCopiedRole = finalTarget.role;
      attacker.mimicRoleTurnsRemaining = 2;
      showFloatingText(attackerSide, attackerSlot, `MIMICKED: ${finalTarget.role}`, 'text-pink-400 font-black');
      logBattleEvent(`🎭 <b>${attacker.name}</b> studied <b>${finalTarget.name}</b> and adopted the <b>${finalTarget.role}</b> passive!`);
    }

    // MALEDICTOR CURSE (FIX: this lived in the ultimate-only switch, so normal strikes never cursed)
    if (attacker.role === 'Maledictor' && finalTarget.pv > 0) {
      applyStatusEffect(finalTarget, 'Curse', 2);
      const curseFx = finalTarget.statusEffects.find(s => s.type === 'Curse');
      curseFx.stacks = Math.min(5, (curseFx.stacks || 0) + 1);
      curseFx.power = (curseFx.power || 0) + Math.round(actualDmgDealt * ((ROLE_SKILL_SCALING.MaledictorCurse[attacker.rarity] ?? 36) / 100));
      showText(defenderSide, actualDefenderSlot, `CURSED x${curseFx.stacks}`, 'text-purple-400');
    }

    // RUNESMITH AEGIS RUNE (FIX: same ultimate-only placement bug)
    if (attacker.role === 'Runesmith') {
      let runeTarget = null;
      attackerField.forEach(a => { if (a && a.pv > 0 && (!runeTarget || a.pv < runeTarget.pv)) runeTarget = a; });
      if (runeTarget) {
        const defBonus = ROLE_SKILL_SCALING.RunesmithDef[attacker.rarity] ?? 8;
        runeTarget.def += defBonus;
        showText(attackerSide, attackerField.indexOf(runeTarget), `+${defBonus} DEF (RUNE)`, 'text-cyan-300 font-bold');
      }
    }

    // REVENANT SOUL SUNDER (FIX: same ultimate-only placement bug)
    if (attacker.role === 'Revenant') {
      const leechPct = (ROLE_SKILL_SCALING.RevenantLeech[attacker.rarity] ?? 30) / 100;
      const sunderHeal = Math.round(actualDmgDealt * leechPct);
      if (sunderHeal > 0) {
        applyHealing(attacker, sunderHeal);
        showText(attackerSide, attackerSlot, `+${sunderHeal} SOUL SUNDER`, 'text-emerald-400 font-bold');
      }
    }

    // DREADNOUGHT PRESSURE ACCUMULATION
    if (attacker.role === 'Dreadnought') {
      const prevPressure = attacker.dreadnoughtPressure || 0;
      attacker.dreadnoughtPressure = Math.min(4, prevPressure + 1);
      const defPerStack = (ROLE_SKILL_SCALING.DreadnoughtDefStack[attacker.rarity] ?? 10) / 100;
      // FIX: the DEF bonus used to compound on EVERY attack (unbounded -> unkillable, endless matches).
      // It is now granted once per stack gained, for at most 4 stacks per match.
      if (attacker.dreadnoughtPressure > prevPressure && (attacker.dreadnoughtDefStacksGranted || 0) < 4) {
        attacker.dreadnoughtDefStacksGranted = (attacker.dreadnoughtDefStacksGranted || 0) + 1;
        attacker.def += Math.round(attacker.def * defPerStack);
      }
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `PRESSURE x${attacker.dreadnoughtPressure}`, 'text-cyan-400 font-black');
      logBattleEvent(`⚓ <b>${attacker.name}</b> fired main battery, building Pressure stack (${attacker.dreadnoughtPressure}/4, +${Math.round(defPerStack * 100)}% DEF)!`);
    }
	
    if (attacker.role === 'Ravager') {
      const splashPct = (ROLE_SKILL_SCALING.RavagerSplash[attacker.rarity] ?? 40) / 100;
      const splashDmg = Math.max(1, Math.round(baseStrikeDmg * splashPct));
      const adjacentSlots = [defenderSlot - 1, defenderSlot + 1].filter(s => s >= 0 && s < 3);

      adjacentSlots.forEach(slot => {
        const adjTarget = defenderField[slot];
        if (adjTarget && adjTarget.pv > 0) {
          adjTarget.pv = Math.max(0, adjTarget.pv - splashDmg);
          updateCardVisualStats(defenderSide, slot);
          showFloatingText(defenderSide, slot, `-${splashDmg} CLEAVE`, 'text-orange-400 font-bold');
        }
      });
      attacker.def = Math.max(1, Math.round(attacker.def * 0.90));
      updateCardVisualStats(attackerSide, attackerSlot);
      logBattleEvent(`🌀 <b>${attacker.name}</b> spun into a Whirlwind, cleaving adjacent enemies!`);
    } else if (attacker.role === 'Blight') {
      applyStatusEffect(finalTarget, 'Necrosis', 2);
      showFloatingText(defenderSide, actualDefenderSlot, 'NECROSIS (NO HEAL)', 'text-lime-400 font-bold');
      logBattleEvent(`☣️ <b>${attacker.name}</b> poisoned <b>${finalTarget.name}</b> with Necrosis (Healing negated, -DEF)!`);
    } else if (attacker.role === 'Bulwark') {
      const shieldPct = (ROLE_SKILL_SCALING.BulwarkShieldPct[attacker.rarity] ?? 15) / 100;
      const barrierVal = Math.round(attacker.maxPv * shieldPct);
      attacker.def += Math.round(barrierVal / 3);
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `+${barrierVal} BARRIER`, 'text-cyan-300 font-bold');
      logBattleEvent(`🧱 <b>${attacker.name}</b> fortified behind a heavy barrier (+${barrierVal} PV Shield)!`);
    } else if (attacker.role === 'Herald') {
      let lowestEnergy = 99;
      let targetAllySlot = -1;
      attackerField.forEach((ally, aIdx) => {
        if (ally && ally.pv > 0 && aIdx !== attackerSlot && ally.energy < lowestEnergy) {
          lowestEnergy = ally.energy;
          targetAllySlot = aIdx;
        }
      });
      if (targetAllySlot !== -1 && attackerField[targetAllySlot].energy < 3) {
        addCardEnergy(attackerField[targetAllySlot], 1);
        updateCardVisualStats(attackerSide, targetAllySlot);
        showFloatingText(attackerSide, targetAllySlot, '+1 PIP (ANTHEM)', 'text-yellow-300 font-bold');
      }
      attackerField.forEach((ally, aIdx) => {
        if (ally && ally.pv > 0) {
          applyStatusEffect(ally, 'AnthemBuff', 1);
          showFloatingText(attackerSide, aIdx, '+ATK', 'text-amber-300 font-semibold');
        }
      });
      logBattleEvent(`🎺 <b>${attacker.name}</b> sounded an inspiring Anthem (+1 Pip, +ATK)!`);
    }
  }

  let wasParried = false;
  const parryIndex = finalTarget.statusEffects.findIndex(s => s.type === 'Parry');
  const relicParry = (parryIndex === -1) && (typeof checkRelicUniversalParry === 'function') && checkRelicUniversalParry(finalTarget, attacker, defenderSide);

  if (parryIndex !== -1 || relicParry) {
    wasParried = true;
    if (parryIndex !== -1) finalTarget.statusEffects.splice(parryIndex, 1);
    showFloatingText(defenderSide, actualDefenderSlot, relicParry ? 'RELIC PARRY! (0 DMG)' : 'PARRIED! (0 DMG)', 'text-cyan-300 font-black');
    logBattleEvent(`⚔️ <b>${finalTarget.name}</b> executed a <i>Perfect Parry</i>${relicParry ? ' (Relic)' : ''}, deflecting all incoming damage!`);
    actualDmgDealt = 0;
  } else {
    // Check Turn 1 Relic Guard Reduction on Defender
    if (typeof getRelicTurn1DamageReduction === 'function') {
      const t1Red = getRelicTurn1DamageReduction(defenderSide, battleEngine.turnCount);
      if (t1Red > 0) {
        actualDmgDealt = Math.max(1, Math.round(actualDmgDealt * (1 - t1Red)));
        showFloatingText(defenderSide, actualDefenderSlot, `GUARD -${Math.round(t1Red * 100)}%`, 'text-cyan-300 font-bold');
      }
    }

    actualDmgDealt = redirectWallDamage(finalTarget, defenderField, defenderSide, actualDmgDealt);
    const prePvForSpectral = finalTarget.pv;
    finalTarget.pv = Math.max(0, finalTarget.pv - actualDmgDealt);
    storeSpectralDamage(finalTarget, actualDmgDealt, prePvForSpectral);
    recordCombatStat(attacker, 'damageDealt', actualDmgDealt, attackerSide === 'player');
    recordCombatStat(finalTarget, 'damageTaken', actualDmgDealt, defenderSide === 'player');

    // Defender Takes Hit Hook (Pip Siphon)
    if (typeof triggerRelicOnHitTaken === 'function' && actualDmgDealt > 0) {
      triggerRelicOnHitTaken(finalTarget, attacker, defenderSide, attackerSide, actualDefenderSlot, attackerSlot);
    }
  }

  // ---> PASTE THE CLEAVE, REFLECT, AND LIFESTEAL BLOCKS RIGHT HERE:
  // Relic Cleave Splash (Titan-Shatter Maul & Spire Cleaving Maul)
  let totalCleavePct = 0;
  if (typeof getRelicCleavePercentage === 'function') {
    totalCleavePct += getRelicCleavePercentage(attackerSide);
  }
  if (battleEngine.matchMode === 'spire' && attackerSide === 'player' && typeof getSpireCleaveBonus === 'function') {
    totalCleavePct += getSpireCleaveBonus();
  }

  if (totalCleavePct > 0 && actualDmgDealt > 0 && !isChargeAttack) {
    const splashDmg = Math.max(1, Math.round(actualDmgDealt * totalCleavePct));
    const adjacentSlots = [actualDefenderSlot - 1, actualDefenderSlot + 1].filter(s => s >= 0 && s < 3);
    adjacentSlots.forEach(sIdx => {
      const adjTarget = defenderField[sIdx];
      if (adjTarget && adjTarget.pv > 0) {
        adjTarget.pv = Math.max(0, adjTarget.pv - splashDmg);
        updateCardVisualStats(defenderSide, sIdx);
        showFloatingText(defenderSide, sIdx, `-${splashDmg} CLEAVE`, 'text-amber-400 font-bold');
      }
    });
  }

  // Relic & Spire True Damage Reflection (Barbed Carapace, Spiteful Spines)
  let totalReflectPct = 0;
  if (typeof getRelicReflectPercentage === 'function') {
    totalReflectPct += getRelicReflectPercentage(defenderSide);
  }
  if (battleEngine.matchMode === 'spire' && defenderSide === 'player' && typeof getSpireReflectBonus === 'function') {
    totalReflectPct += getSpireReflectBonus();
  }

  if (totalReflectPct > 0 && actualDmgDealt > 0 && !wasParried) {
    const reflectDmg = Math.max(1, Math.round(actualDmgDealt * totalReflectPct));
    attacker.pv = Math.max(0, attacker.pv - reflectDmg);
    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `-${reflectDmg} REFLECT`, 'text-amber-400 font-bold');
    logBattleEvent(`🌵 <b>Thorns:</b> Reflected ${reflectDmg} True Damage back to <b>${attacker.name}</b>!`);
  }

  // Relic & Spire Lifesteal (Bloodfont, Vampiric Chalice)
  let totalLeechPct = 0;
  if (typeof getRelicLifestealPercentage === 'function') {
    totalLeechPct += getRelicLifestealPercentage(attackerSide);
  }
  if (battleEngine.matchMode === 'spire' && attackerSide === 'player' && typeof getSpireLifestealBonus === 'function') {
    totalLeechPct += getSpireLifestealBonus();
  }

  if (totalLeechPct > 0 && actualDmgDealt > 0 && !attacker.statusEffects.some(s => s.type === 'Necrosis')) {
    const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;
    const leechHeal = Math.max(1, Math.round(actualDmgDealt * totalLeechPct * cauterize));
    applyHealing(attacker, leechHeal);
    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `+${leechHeal} LEECH`, 'text-rose-400 font-bold');
  }

  updateCardVisualStats(defenderSide, defenderSlot);

  // Relic Cleave Splash (Titan-Shatter Maul)
  if (typeof getRelicCleavePercentage === 'function' && actualDmgDealt > 0 && !isChargeAttack) {
    const relicCleavePct = getRelicCleavePercentage(attackerSide);
    if (relicCleavePct > 0) {
      const splashDmg = Math.max(1, Math.round(actualDmgDealt * relicCleavePct));
      const adjacentSlots = [actualDefenderSlot - 1, actualDefenderSlot + 1].filter(s => s >= 0 && s < 3);
      adjacentSlots.forEach(sIdx => {
        const adjTarget = defenderField[sIdx];
        if (adjTarget && adjTarget.pv > 0) {
          adjTarget.pv = Math.max(0, adjTarget.pv - splashDmg);
          updateCardVisualStats(defenderSide, sIdx);
          showFloatingText(defenderSide, sIdx, `-${splashDmg} RELIC CLEAVE`, 'text-amber-400 font-bold');
        }
      });
    }
  }

  // Relic True Damage Reflection (Barbed Carapace)
  if (typeof getRelicReflectPercentage === 'function' && actualDmgDealt > 0 && !wasParried) {
    const reflectPct = getRelicReflectPercentage(defenderSide);
    if (reflectPct > 0) {
      const reflectDmg = Math.max(1, Math.round(actualDmgDealt * reflectPct));
      attacker.pv = Math.max(0, attacker.pv - reflectDmg);
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `-${reflectDmg} REFLECT`, 'text-amber-400 font-bold');
      logBattleEvent(`🌵 <b>Barbed Carapace:</b> Reflected ${reflectDmg} True Damage back to <b>${attacker.name}</b>!`);
    }
  }
  
  // Dreadnought Pressure Thorns Reflect
  if (finalTarget.role === 'Dreadnought' && (finalTarget.dreadnoughtPressure || 0) > 0 && actualDmgDealt > 0 && !wasParried) {
    const thornsPct = ((ROLE_SKILL_SCALING.DreadnoughtThornsPct[finalTarget.rarity] ?? 12) / 100) * finalTarget.dreadnoughtPressure;
    const refDmg = Math.max(1, Math.round(actualDmgDealt * thornsPct));
    attacker.pv = Math.max(0, attacker.pv - refDmg);
    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `-${refDmg} BOILER BACKFIRE`, 'text-cyan-400 font-bold');
    logBattleEvent(`⚓ <b>${finalTarget.name}</b>'s boilers vented recoil for ${refDmg} True Damage!`);
  }

  // Spire Boss Floor 30 Phase 1: Aurelion 20% True Damage Reflection
  if (battleEngine.matchMode === 'spire' && defenderSide === 'enemy' && typeof spireState !== 'undefined' && spireState.currentFloor === 30) {
    if (spireState.bossCombatState?.phase === 1 && actualDmgDealt > 0 && !wasParried) {
      const reflectDmg = Math.max(1, Math.round(actualDmgDealt * 0.20));
      attacker.pv = Math.max(0, attacker.pv - reflectDmg);
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `-${reflectDmg} ASTRAL REFLECT`, 'text-yellow-300 font-black');
      logBattleEvent(`👑 <b>Aurelion's Sun-Emperor Guard:</b> Reflected ${reflectDmg} True Damage back onto <b>${attacker.name}</b>!`);
    }
  }

  // Spire Boss Floor 5: Terrakor 50% PV Frontline Shove to Reserve
  if (battleEngine.matchMode === 'spire' && defenderSide === 'enemy' && typeof spireState !== 'undefined' && spireState.currentFloor === 5) {
    const boss = battleEngine.enemyField[0];
    if (boss && boss.pv > 0 && (boss.pv / boss.maxPv) <= 0.50 && !spireState.bossCombatState?.shoveTriggered) {
      spireState.bossCombatState.shoveTriggered = true;
      if (battleEngine.playerReserve.length > 0) {
        const displaced = battleEngine.playerField.splice(0, 3, ...battleEngine.playerReserve.splice(0, 3));
        battleEngine.playerReserve.push(...displaced.filter(Boolean));
        renderCombatField();
        updateReserveDots();
        showFloatingText('player', 1, 'SEISMIC SHIFT (RESERVES DEPLOYED)', 'text-amber-400 font-black');
        logBattleEvent(`🗿 <b>Terrakor's Seismic Disruption:</b> Shoved your frontline into Reserve, forcing reinforcements into Vanguard!`);
      }
    }
  }

  // Relic Lifesteal with Cauterize reduction check
  if (typeof getRelicLifestealPercentage === 'function' && actualDmgDealt > 0) {
    const relicLeechPct = getRelicLifestealPercentage(attackerSide);
    const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;

    if (relicLeechPct > 0 && !attacker.statusEffects.some(s => s.type === 'Necrosis')) {
      const leechHeal = Math.max(1, Math.round(actualDmgDealt * relicLeechPct * cauterize));
      applyHealing(attacker, leechHeal);
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `+${leechHeal} RELIC LEECH`, 'text-rose-400 font-bold');
    }
  }
  
  // Herald Crescendo of Valor (10% Lifesteal on hit)
  if (attacker.statusEffects.some(s => s.type === 'CrescendoValor') && !attacker.statusEffects.some(s => s.type === 'Necrosis') && actualDmgDealt > 0) {
    const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;
    const leechAmt = Math.max(1, Math.round(actualDmgDealt * 0.10 * cauterize));
    applyHealing(attacker, leechAmt);
    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `+${leechAmt} VIGOR`, 'text-emerald-400');
  }

  updateCardVisualStats(defenderSide, defenderSlot);

  if (attacker.role === 'Berserker' && berserkerSacPv > 0 && defender.pv <= 0) {
    const restored = Math.min(attacker.maxPv - attacker.pv, berserkerSacPv);
    if (restored > 0) {
      attacker.pv += restored;
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `+${restored} BLOODLUST`, 'text-emerald-400');
      logBattleEvent(`🩸 <b>${attacker.name}</b> revels in the kill and recovers ${restored} PV (Bloodlust)!`);
      playSound('heal');
    }
  }
  showFloatingText(defenderSide, defenderSlot, `-${totalStrikeDamage}`, isChargeAttack ? 'text-amber-300' : 'text-rose-400');

  const defenderCardEl = document.getElementById(`${defenderSide}-card-${defenderSlot}`);
  if (defenderCardEl) defenderCardEl.classList.add('hit-shake');

  if (isChargeAttack) {
    // Coliseum Ultimate Cast Hook (triggers Siren's Chord, Xylar drain & +25% Crowd Favor)
    if (battleEngine.matchMode === 'coliseum' && typeof handleColiseumUltimateCast === 'function' && battleEngine.coliseumRival) {
      handleColiseumUltimateCast(battleEngine.coliseumRival, attacker, attackerSide);
    }

    switch (attacker.role) {
      case 'Chronomancer': {
        if (side === 'player') {
          battleEngine.extraTurn = true;
          showFloatingText(attackerSide, attackerSlot, 'TIME WARP! (+1 TURN)', 'text-amber-300 font-black');
          logBattleEvent(`⏳ <b>${attacker.name}</b> warped the timeline, unlocking an immediate extra turn!`);
        }
        break;
      }
	  
	  case 'Maledictor': {
        if (isChargeAttack) {
          defenderField.forEach((target, tIdx) => {
            if (target && target.pv > 0) {
              target.statusEffects.forEach(s => { if (s.type === 'Curse') s.duration += 2; });
              showText(defenderSide, tIdx, 'CURSES AMPLIFIED (+2T)', 'text-purple-400 font-black');
            }
          });
          logBattleEvent(`🧿 <b>${attacker.name}</b> unleashed <b>Pandemonium Hex</b>, extending all curses across the enemy line!`);
        }
        break;
      }
      case 'Sapper': {
        // Grid Lockdown: lock Pip gains across the whole enemy vanguard
        defenderField.forEach((target, tIdx) => {
          if (target && target.pv > 0) {
            applyStatusEffect(target, 'EmpLockout', 2);
            applyStatusEffect(target, 'GridLock', 2);
            showFloatingText(defenderSide, tIdx, 'GRID LOCKDOWN', 'text-amber-400 font-black');
          }
        });
        logBattleEvent(`🧲 <b>${attacker.name}</b> deployed <b>Grid Lockdown</b>, locking enemy Pip gains!`);
        break;
      }
	  
      case 'Runesmith': {
        if (isChargeAttack) {
          attackerField.forEach(ally => {
            if (ally && ally.pv > 0) {
              ally.statusEffects = [];
              applyHealing(ally, Math.round(ally.maxPv * 0.20));
            }
          });
          logBattleEvent(`⚒️ <b>${attacker.name}</b> triggered <b>Runic Resonance</b>, cleansing debuffs and shielding allies!`);
        }
        break;
      }
      case 'Revenant': {
        if (isChargeAttack) {
          applyStatusEffect(attacker, 'SpectralVengeance', 2);
          logBattleEvent(`👻 <b>${attacker.name}</b> entered <b>Undying Vengeance</b> spectral state!`);
        }
        break;
      }
	  
	  case 'Inquisitor': {
        const positiveBuffTypes = ['AnthemBuff', 'Bloodrage', 'Haste', 'Taunt', 'ImmovableWall', 'DivineWard', 'Parry', 'TotemWard', 'CrescendoValor'];
        let totalPurged = 0;
        defenderField.forEach((target, tIdx) => {
          if (target && target.pv > 0) {
            const beforeCount = target.statusEffects.length;
            target.statusEffects = target.statusEffects.filter(s => !positiveBuffTypes.includes(s.type));
            const purgedHere = beforeCount - target.statusEffects.length;
            totalPurged += purgedHere;
            if (purgedHere > 0) {
              applyStatusEffect(target, 'Torment', 2);
              showFloatingText(defenderSide, tIdx, `PURGED ${purgedHere} BUFFS`, 'text-amber-400 font-black');
            }
          }
        });
        logBattleEvent(`⚖️ <b>${attacker.name}</b> delivered the <b>Heresy Verdict</b>, purging ${totalPurged} blessings across the enemy frontline!`);
        break;
      }

      case 'Geomancer': {
        showFloatingText(defenderSide, actualDefenderSlot, 'SEISMIC FAULTLINE', 'text-amber-600 font-black');
        // Swap slots 0 and 2 if both enemies are alive
        const leftTarget = defenderField[0];
        const rightTarget = defenderField[2];
        if (leftTarget && rightTarget && leftTarget.pv > 0 && rightTarget.pv > 0) {
          defenderField[0] = rightTarget;
          defenderField[2] = leftTarget;
          leftTarget.energy = Math.max(0, (leftTarget.energy || 0) - 1);
          rightTarget.energy = Math.max(0, (rightTarget.energy || 0) - 1);
          showFloatingText(defenderSide, 0, 'LINE SHIFTED (-1 PIP)', 'text-amber-400 font-bold');
          showFloatingText(defenderSide, 2, 'LINE SHIFTED (-1 PIP)', 'text-amber-400 font-bold');
          logBattleEvent(`🌋 <b>${attacker.name}</b> collapsed the earth, swapping opposing flanking champions and draining 1 Pip!`);
        }
        defenderField.forEach((target, tIdx) => {
          if (target && target.pv > 0) {
            applyStatusEffect(target, 'FaultlineStagger', 2);
          }
        });
        break;
      }

      case 'Mimic': {
        // Find the other living ally with the highest Max PV
        const eligibleAllies = attackerField.filter((a, idx) => a && a.pv > 0 && idx !== attackerSlot && a.role !== 'Mimic');
        if (eligibleAllies.length > 0) {
          const donor = eligibleAllies.reduce((max, a) => a.maxPv > max.maxPv ? a : max, eligibleAllies[0]);
          logBattleEvent(`🎭 <b>MIRROR METAMORPHOSIS!</b> <b>${attacker.name}</b> replicated <b>${donor.name}</b>'s [${donor.chargeSkillName}]!`);
          
          // Execute donor's ultimate effects
          const tempAttacker = { ...attacker, role: donor.role };
          if (donor.role === 'Commander') {
            attackerField.forEach((ally, aIdx) => {
              if (ally && ally !== attacker && ally.pv > 0) addCardEnergy(ally, 2);
            });
          } else if (donor.role === 'Chronomancer' && side === 'player') {
            battleEngine.extraTurn = true;
          } else if (donor.role === 'Cleric') {
            attackerField.forEach(ally => {
              if (ally && ally.pv > 0) {
                ally.statusEffects = [];
                applyHealing(ally, Math.round(ally.maxPv * 0.25));
              }
            });
          } else if (donor.role === 'Hexer') {
            defenderField.forEach(t => { if (t && t.pv > 0) applyStatusEffect(t, 'Stun', 2); });
          } else {
            // General damage splash
            defenderField.forEach(t => {
              if (t && t.pv > 0 && t !== finalTarget) {
                t.pv = Math.max(0, t.pv - Math.round(baseStrikeDmg * 0.40));
              }
            });
          }
        }
        break;
      }

      case 'Dreadnought': {
        const stacks = attacker.dreadnoughtPressure || 0;
        attacker.dreadnoughtPressure = 0;
        const stackBonus = 1 + (stacks * 0.20);
        const salvoDmg = Math.round(baseStrikeDmg * stackBonus);
        finalTarget.pv = Math.max(0, finalTarget.pv - salvoDmg);
        showFloatingText(defenderSide, actualDefenderSlot, `-${salvoDmg} BATTERY SALVO`, 'text-cyan-300 font-black text-lg');

        if (stacks >= 4) {
          applyStatusEffect(finalTarget, 'Stun', 1);
          const splashDmg = Math.round(salvoDmg * 0.50);
          defenderField.forEach((target, tIdx) => {
            if (target && tIdx !== actualDefenderSlot && target.pv > 0) {
              target.pv = Math.max(0, target.pv - splashDmg);
              updateCardVisualStats(defenderSide, tIdx);
              showFloatingText(defenderSide, tIdx, `-${splashDmg} SALVO SPLASH`, 'text-cyan-400 font-bold');
            }
          });
          logBattleEvent(`⚓ <b>MAX PRESSURE OVERHEAT!</b> <b>${attacker.name}</b> fired all 4 siege batteries, cleaving the frontline and concussing the target!`);
        }
        updateCardVisualStats(defenderSide, actualDefenderSlot);
        break;
      }
      case 'Gladiator': {
        const stacks = attacker.crowdFavorStacks || 0;
        const bonusMult = 1 + (stacks * 0.25);
        const execDmg = Math.round(baseStrikeDmg * bonusMult);
        finalTarget.pv = Math.max(0, finalTarget.pv - execDmg);
        showFloatingText(defenderSide, actualDefenderSlot, `-${execDmg} EXECUTION`, 'text-rose-500 font-black');
        logBattleEvent(`🪓 <b>${attacker.name}</b> unleashed <b>Coliseum Execution</b>, consuming ${stacks} Favor (+${stacks * 25}% DMG)!`);

        if (finalTarget.pv <= 0) {
          addCardEnergy(attacker, 2);
          attacker.crowdFavorStacks = 3;
          showFloatingText(attackerSide, attackerSlot, '+2 PIPS & MAX FAVOR', 'text-amber-300 font-black');
          logBattleEvent(`👑 <b>CROWD ROAR!</b> <b>${attacker.name}</b> executed the enemy! 2 Pips refunded and Favor maximized!`);
        } else {
          attacker.crowdFavorStacks = 0;
        }
        updateCardVisualStats(defenderSide, actualDefenderSlot);
        updateCardVisualStats(attackerSide, attackerSlot);
        break;
      }
      case 'Valkyrie': {
        applyStatusEffect(attacker, 'Taunt', 2);
        if (!attacker.ultDefBonus) {   // FIX: used to multiply DEF permanently on every ultimate
          attacker.ultDefBonus = Math.round(attacker.def * 0.35);
          attacker.def += attacker.ultDefBonus;
        }
        updateCardVisualStats(attackerSide, attackerSlot);
        showFloatingText(attackerSide, attackerSlot, 'EINHERJAR TAUNT (+35% DEF)', 'text-cyan-300 font-black');

        const shockwaveDmg = Math.max(1, Math.round(baseStrikeDmg * 0.40));
        defenderField.forEach((target, tIdx) => {
          if (target && tIdx !== defenderSlot && target.pv > 0 && !target.isAirborne) {
            target.pv = Math.max(0, target.pv - shockwaveDmg);
            updateCardVisualStats(defenderSide, tIdx);
            showFloatingText(defenderSide, tIdx, `-${shockwaveDmg} SHOCKWAVE`, 'text-cyan-400 font-bold');
          }
        });
        logBattleEvent(`🪽 <b>${attacker.name}</b> raised <b>Shield of the Einherjar</b>, taunting all enemies and fortifying armor!`);
        break;
      }
      case 'Priest': {
        const reserveDeadIdx = (side === 'player' ? battleEngine.playerReserve : battleEngine.enemyReserve)
          .findIndex(c => c && c.pv <= 0);

        if (reserveDeadIdx !== -1) {
          const targetPool = side === 'player' ? battleEngine.playerReserve : battleEngine.enemyReserve;
          const revivedUnit = targetPool[reserveDeadIdx];
          const revivePct = (ROLE_SKILL_SCALING.PriestReviveHp[attacker.rarity] || 35) / 100;
          revivedUnit.pv = Math.round(revivedUnit.maxPv * revivePct);
          revivedUnit.statusEffects = [];
          logBattleEvent(`🕊️ <b>RESURRECTION RITE!</b> <b>${attacker.name}</b> revived <b>${revivedUnit.name}</b> into reserve with ${revivedUnit.pv} PV!`);
          playSound('rainbow');
        } else {
          attackerField.forEach((ally, aIdx) => {
            if (ally && ally.pv > 0) {
              applyStatusEffect(ally, 'DivineWard', 2);
              showFloatingText(attackerSide, aIdx, 'DIVINE WARD', 'text-yellow-300 font-bold');
            }
          });
          logBattleEvent(`🕊️ <b>DIVINE WARD!</b> <b>${attacker.name}</b> warded the frontline against fatal damage!`);
        }
        break;
      }
      case 'Dragoon': {
        const plungeMult = ROLE_SKILL_SCALING.DragoonPlunge[attacker.rarity] || 2.4;
        const totalPlungeDmg = Math.round(baseStrikeDmg * plungeMult);
        finalTarget.pv = Math.max(0, finalTarget.pv - totalPlungeDmg);
        showFloatingText(defenderSide, actualDefenderSlot, `-${totalPlungeDmg} DRAGON PLUNGE!`, 'text-cyan-300 font-black text-xl');

        const splashSlots = [actualDefenderSlot - 1, actualDefenderSlot + 1].filter(s => s >= 0 && s < 3);
        const splashDmg = Math.round(totalPlungeDmg * 0.30);
        splashSlots.forEach(sIdx => {
          const adj = defenderField[sIdx];
          if (adj && adj.pv > 0) {
            adj.pv = Math.max(0, adj.pv - splashDmg);
            updateCardVisualStats(defenderSide, sIdx);
            showFloatingText(defenderSide, sIdx, `-${splashDmg} IMPACT`, 'text-cyan-400 font-bold');
          }
        });

        updateCardVisualStats(defenderSide, actualDefenderSlot);
        logBattleEvent(`🔱 <b>${attacker.name}</b> executed <b>Dragon Plunge</b> for <span class="text-cyan-300 font-bold">${totalPlungeDmg} DMG</span>!`);

        attacker.isAirborne = true;
        showFloatingText(attackerSide, attackerSlot, 'CELESTIAL ASCENT (AIRBORNE)', 'text-sky-300 font-black text-sm');
        logBattleEvent(`🌪️ <b>${attacker.name}</b> immediately vaulted into the stratosphere with <b>Celestial Ascent</b> (Airborne for 1 full turn: Absolute Evasion)!`);

        setTimeout(() => {
          if (attackerCardEl) attackerCardEl.classList.remove('lunge-ally', 'lunge-enemy');
          if (defenderCardEl) defenderCardEl.classList.remove('hit-shake');
          finishTurnCycle();
        }, getCombatDelay(650, battleEngine.matchMode));
        return;
      }
      case 'Ravager': {
        logBattleEvent(`🌀 <b>${attacker.name}</b> unleashed <b>Executioner's Frenzy</b>!`);
        let currentHitDmg = Math.round(baseStrikeDmg * 0.70);
        let executedEnemy = false;

        for (let hit = 1; hit <= 4 && finalTarget.pv > 0; hit++) {
          finalTarget.pv = Math.max(0, finalTarget.pv - currentHitDmg);
          showFloatingText(defenderSide, actualDefenderSlot, `-${currentHitDmg} HIT ${hit}`, 'text-rose-500 font-black');
          if (finalTarget.pv <= 0) executedEnemy = true;
          currentHitDmg = Math.round(currentHitDmg * 1.20);
        }
        updateCardVisualStats(defenderSide, actualDefenderSlot);

        if (executedEnemy) {
          addCardEnergy(attacker, 1);
          applyStatusEffect(attacker, 'Bloodrage', 2);
          showFloatingText(attackerSide, attackerSlot, '+1 PIP / BLOODRAGE', 'text-amber-300 font-black');
          logBattleEvent(`🩸 <b>${attacker.name}</b> executed the foe, entering Bloodrage (+25% ATK, +1 Pip refunded)!`);
        }
        break;
      }
      case 'Blight': {
        const miasmaTrueDmg = Math.max(1, Math.round(attacker.maxPv * 0.12));
        defenderField.forEach((target, tIdx) => {
          if (target && target.pv > 0) {
            target.pv = Math.max(0, target.pv - miasmaTrueDmg);
            target.statusEffects.forEach(s => {
              if (['Burn', 'Bleed', 'ArmorBreak', 'Stun', 'Necrosis', 'Trap'].includes(s.type)) {
                s.duration += 1;
              }
            });
            updateCardVisualStats(defenderSide, tIdx);
            showFloatingText(defenderSide, tIdx, `-${miasmaTrueDmg} MIASMA (+1T)`, 'text-lime-400 font-black');
          }
        });
        logBattleEvent(`☣️ <b>${attacker.name}</b> flooded the battlefield with Miasma Field, extending all afflictions!`);
        break;
      }
      case 'Bulwark': {
        applyStatusEffect(attacker, 'Taunt', 2);
        applyStatusEffect(attacker, 'ImmovableWall', 2);
        if (!attacker.ultDefBonus) {   // FIX: used to multiply DEF permanently on every ultimate
          attacker.ultDefBonus = Math.round(attacker.def * 0.50);
          attacker.def += attacker.ultDefBonus;
        }
        updateCardVisualStats(attackerSide, attackerSlot);
        showFloatingText(attackerSide, attackerSlot, 'IMMOVABLE WALL', 'text-cyan-300 font-black');
        logBattleEvent(`🧱 <b>${attacker.name}</b> anchored an Immovable Wall, taunting foes and shielding allies!`);
        break;
      }
      case 'Herald': {
        attackerField.forEach((ally, aIdx) => {
          if (ally && ally.pv > 0) {
            applyStatusEffect(ally, 'CrescendoValor', 2);
            showFloatingText(attackerSide, aIdx, 'CRESCENDO OF VALOR', 'text-yellow-300 font-bold');
          }
        });
        logBattleEvent(`🎺 <b>${attacker.name}</b> conducted the Crescendo of Valor (+25% DMG & 10% Lifesteal)!`);
        playSound('heal');
        break;
      }
      case 'Saboteur': {
        defenderField.forEach((target, tIdx) => {
          if (target && target.pv > 0) {
            const existingTrap = target.statusEffects.find(s => s.type === 'Trap');
            if (existingTrap) {
              const detonationDmg = Math.round((existingTrap.trapDamage || 50) * 2.0);
              target.pv = Math.max(0, target.pv - detonationDmg);
              target.statusEffects = target.statusEffects.filter(s => s.type !== 'Trap');
              showFloatingText(defenderSide, tIdx, `-${detonationDmg} MINEFIELD!`, 'text-rose-500 font-black');
            }
            applyStatusEffect(target, 'ArmorBreak', 2);
          }
        });
        logBattleEvent(`💣 <b>${attacker.name}</b> detonated all enemy traps and fractured armor (-40% DEF)!`);
        break;
      }
      case 'Shaman': {
        attackerField.forEach((ally, aIdx) => {
          if (ally && ally.pv > 0) {
            const heal = Math.round(ally.maxPv * 0.20);
            applyHealing(ally, heal);
            applyStatusEffect(ally, 'TotemWard', 2);
            updateCardVisualStats(attackerSide, aIdx);
            showFloatingText(attackerSide, aIdx, `+${heal} PV (TOTEM WARD)`, 'text-emerald-300');
          }
        });
        logBattleEvent(`🪶 <b>${attacker.name}</b> summoned an Ancestral Totem (35% counter mitigation)!`);
        break;
      }
      case 'Elementalist': {
        showFloatingText(attackerSide, attackerSlot, 'PRISMATIC CONVERGENCE', 'text-cyan-300 font-black');
        logBattleEvent(`💠 <b>${attacker.name}</b> unleashed Prismatic Convergence with absolute +25% Advantage!`);
        break;
      }
      case 'Spellbreaker': {
        const drainedPrimary = Math.min(finalTarget.energy, 2);
        finalTarget.energy = Math.max(0, finalTarget.energy - 2);
        updateCardVisualStats(defenderSide, actualDefenderSlot);
        showFloatingText(defenderSide, actualDefenderSlot, `-${drainedPrimary} PIPS`, 'text-purple-400');

        defenderField.forEach((target, tIdx) => {
          if (target && tIdx !== actualDefenderSlot && target.pv > 0) {
            if (target.energy > 0) {
              target.energy -= 1;
              updateCardVisualStats(defenderSide, tIdx);
              showFloatingText(defenderSide, tIdx, `-1 PIP`, 'text-purple-400');
            }
          }
        });
        logBattleEvent(`⚡ <b>${attacker.name}</b> severed enemy energy reserves with <b>Severance Rite</b>!`);
        break;
      }
      case 'Sentinel': {
        const defBonus = Math.max(2, Math.round(attacker.def * 0.40));
        attacker.def += defBonus;
        applyStatusEffect(attacker, 'Taunt', 2);
        updateCardVisualStats(attackerSide, attackerSlot);
        showFloatingText(attackerSide, attackerSlot, `+${defBonus} DEF (TAUNT)`, 'text-amber-300');
        logBattleEvent(`🛡️ <b>${attacker.name}</b> activated <b>Bastion of Defiance</b>, forcing enemy focus!`);
        break;
      }
      case 'Warrior': {
        const cleaveDmg = Math.max(1, Math.round(totalStrikeDamage * 0.3));
        defenderField.forEach((target, tIdx) => {
          if (target && tIdx !== defenderSlot && target.pv > 0) {
            target.pv = Math.max(0, target.pv - cleaveDmg);
            updateCardVisualStats(defenderSide, tIdx);
            showFloatingText(defenderSide, tIdx, `-${cleaveDmg} CLEAVE`, 'text-orange-400');
          }
        });
        logBattleEvent(`💥 <b>${attacker.name}</b> cleaved adjacent enemies for ${cleaveDmg} DMG!`);
        break;
      }
      case 'Knight': {
        attackerField.forEach((ally, aIdx) => {
          if (ally && ally.pv > 0) {
            const bonus = Math.max(2, Math.round(ally.def * 0.35));
            ally.def += bonus;
            updateCardVisualStats(attackerSide, aIdx);
            showFloatingText(attackerSide, aIdx, `+${bonus} DEF`, 'text-cyan-300');
          }
        });
        logBattleEvent(`🛡️ <b>${attacker.name}</b> fortified the entire team with Aegis Fortress!`);
        break;
      }
      case 'Mage': {
        const burnDur = (typeof getRelicStatusDuration === 'function') ? getRelicStatusDuration('Burn', 2, attackerSide) : 2;
        applyStatusEffect(defender, 'Burn', burnDur);
        applyStatusEffect(defender, 'ArmorBreak', 2);
        showFloatingText(defenderSide, defenderSlot, `BURN (${burnDur}T) + BREAK`, 'text-orange-400');
        break;
      }
      case 'Warlock': {
        const bleedDur = (typeof getRelicStatusDuration === 'function') ? getRelicStatusDuration('Bleed', 2, attackerSide) : 2;
        applyStatusEffect(defender, 'Bleed', bleedDur);
        showFloatingText(defenderSide, defenderSlot, `BLEED (${bleedDur}T)`, 'text-rose-500');
        break;
      }
      case 'Ranger': {
        const multiDmg = Math.max(1, Math.round(baseStrikeDmg * 0.5));
        defenderField.forEach((target, tIdx) => {
          if (target && tIdx !== defenderSlot && target.pv > 0) {
            target.pv = Math.max(0, target.pv - multiDmg);
            updateCardVisualStats(defenderSide, tIdx);
            showFloatingText(defenderSide, tIdx, `-${multiDmg} ARROWS`, 'text-emerald-400');
          }
        });
        logBattleEvent(`🏹 <b>${attacker.name}</b> unleashed Arrow Tempest across the battlefield!`);
        break;
      }
      case 'Commander': {
        attackerField.forEach((ally, aIdx) => {
          if (ally && ally !== attacker && ally.pv > 0 && ally.energy < ally.maxEnergy) {
            addCardEnergy(ally, COMMANDER_ULT_ENERGY);
            updateCardVisualStats(attackerSide, aIdx);
            showFloatingText(attackerSide, aIdx, `+${COMMANDER_ULT_ENERGY} PIPS`, 'text-sky-300');
          }
        });
        logBattleEvent(`📯 <b>${attacker.name}</b> sounded the <i>Battle Cry</i>, rallying the team (+${COMMANDER_ULT_ENERGY} Pips)!`);
        break;
      }
      case 'Cleric': {
        const aquaMult = getAquaPotencyMultiplier(attackerSide);
        const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;
        attackerField.forEach((ally, aIdx) => {
          if (ally && ally.pv > 0) {
            ally.statusEffects = [];
            const heal = Math.round(ally.maxPv * 0.25 * aquaMult * cauterize);
            applyHealing(ally, heal);
            updateCardVisualStats(attackerSide, aIdx);
            showFloatingText(attackerSide, aIdx, `+${heal} CLEANSE`, 'text-emerald-400');
          }
        });
        logBattleEvent(`✨ <b>${attacker.name}</b> cleansed all status debuffs and blessed the vanguard!${aquaMult > 1 ? ' <span class="text-cyan-300">(Aqua +25%)</span>' : ''}${cauterize < 1.0 ? ' <span class="text-rose-400">(Cauterized -50%)</span>' : ''}`);
        break;
      }
      case 'Duelist': {
        applyStatusEffect(attacker, 'Parry', 2);
        updateCardVisualStats(attackerSide, attackerSlot);
        showFloatingText(attackerSide, attackerSlot, 'PARRY STANCE READY', 'text-cyan-300');
        logBattleEvent(`🤺 <b>${attacker.name}</b> took a defensive stance with <b>Perfect Parry</b>!`);
        break;
      }
      case 'Monk': {
        const stacks = attacker.focusStacks || 0;
        if (stacks > 0) {
          const bonusHitDmg = Math.max(1, Math.round(baseStrikeDmg * 0.15));
          const totalFlurryDmg = bonusHitDmg * stacks;
          finalTarget.pv = Math.max(0, finalTarget.pv - totalFlurryDmg);
          updateCardVisualStats(defenderSide, actualDefenderSlot);
          showFloatingText(defenderSide, actualDefenderSlot, `-${totalFlurryDmg} FLURRY (${stacks} HITS)`, 'text-amber-400');
          logBattleEvent(`👊 <b>${attacker.name}</b> unleashed a <i>Hundred-Fist Cascade</i>, landing ${stacks} bonus strikes for ${totalFlurryDmg} DMG!`);
        }
        break;
      }
      case 'Necromancer': {
        if (finalTarget.pv <= 0) {
          const healPv = Math.round(attacker.maxPv * 0.50);
          applyHealing(attacker, healPv);
          addCardEnergy(attacker, 1);
          updateCardVisualStats(attackerSide, attackerSlot);
          showFloatingText(attackerSide, attackerSlot, `+${healPv} SOUL SIPHON (+1 PIP)`, 'text-emerald-400');
          logBattleEvent(`☠️ <b>${attacker.name}</b> executed <b>${finalTarget.name}</b>, siphoning ${healPv} PV and replenishing 1 Energy Pip!`);
          playSound('heal');
        }
        break;
      }
      case 'Alchemist': {
        defenderField.forEach((target, tIdx) => {
          if (target && target.pv > 0) {
            let burstDmg = 0;
            target.statusEffects.forEach(s => {
              if (s.type === 'Burn') burstDmg += Math.round(target.maxPv * 0.08 * s.duration);
              if (s.type === 'Bleed') burstDmg += Math.round(target.maxPv * 0.08 * s.duration);
            });

            if (burstDmg > 0) {
              target.pv = Math.max(0, target.pv - burstDmg);
              target.statusEffects = target.statusEffects.filter(s => s.type !== 'Burn' && s.type !== 'Bleed');
              applyStatusEffect(target, 'ArmorBreak', 2);
              updateCardVisualStats(defenderSide, tIdx);
              showFloatingText(defenderSide, tIdx, `-${burstDmg} DETONATION`, 'text-orange-500');
            }
          }
        });
        logBattleEvent(`💥 <b>${attacker.name}</b> triggered <b>Grand Detonation</b>, exploding all enemy afflictions!`);
        break;
      }
      case 'Corsair': {
        const fateDie = Math.floor(Math.random() * 6) + 1;
        playSound('coin');

        if (fateDie <= 2) {
          attackerField.forEach((ally, aIdx) => {
            if (ally && ally.pv > 0) {
              ally.def += 15;
              updateCardVisualStats(attackerSide, aIdx);
              showFloatingText(attackerSide, aIdx, '+15 DEF', 'text-cyan-300');
            }
          });
          applyStatusEffect(finalTarget, 'Burn', 2);
          updateCardVisualStats(defenderSide, actualDefenderSlot);
          showFloatingText(defenderSide, actualDefenderSlot, 'BURN INFLICTED', 'text-orange-400');
          logBattleEvent(`🎲 <b>${attacker.name}</b> rolled a <b>${fateDie} (Fold)</b>! Fortified team armor (+15 DEF) and set <b>${finalTarget.name}</b> ablaze!`);
        } else if (fateDie <= 4) {
          const raiseBonusDmg = Math.max(1, Math.round(baseStrikeDmg * 0.60));
          finalTarget.pv = Math.max(0, finalTarget.pv - raiseBonusDmg);
          if (finalTarget.energy > 0) {
            finalTarget.energy = Math.max(0, finalTarget.energy - 1);
            addCardEnergy(attacker, 1);
          }
          updateCardVisualStats(defenderSide, actualDefenderSlot);
          updateCardVisualStats(attackerSide, attackerSlot);
          showFloatingText(defenderSide, actualDefenderSlot, `-${raiseBonusDmg} RAISE (-1 PIP)`, 'text-amber-400');
          logBattleEvent(`🎲 <b>${attacker.name}</b> rolled a <b>${fateDie} (Raise)</b>! Struck for ${raiseBonusDmg} extra DMG and stole 1 Energy Pip!`);
        } else {
          const jackpotDmg = Math.max(1, Math.round(baseStrikeDmg * 1.30));
          finalTarget.pv = Math.max(0, finalTarget.pv - jackpotDmg);
          addCardEnergy(attacker, 2);
          updateCardVisualStats(defenderSide, actualDefenderSlot);
          updateCardVisualStats(attackerSide, attackerSlot);
          showFloatingText(defenderSide, actualDefenderSlot, `-${jackpotDmg} JACKPOT!!`, 'text-rose-500 font-black');
          showFloatingText(attackerSide, attackerSlot, '+2 PIPS REFUNDED', 'text-amber-300');
          logBattleEvent(`🎰 <b>MEGA JACKPOT!</b> <b>${attacker.name}</b> rolled a <b>${fateDie}</b>, obliterating <b>${finalTarget.name}</b> for ${jackpotDmg} bonus DMG and refilling 2 Energy Pips!`);
          playSound('rainbow');
        }
        break;
      }
      case 'Bard': {
        attackerField.forEach((ally, aIdx) => {
          if (ally && ally.pv > 0) {
            ally.statusEffects = ally.statusEffects.filter(s => s.type !== 'Stun');
            ally.crescendoBuff = 0.40;
            updateCardVisualStats(attackerSide, aIdx);
            showFloatingText(attackerSide, aIdx, 'CRESCENDO (+40% ATK)', 'text-emerald-300');
          }
        });
        logBattleEvent(`🎼 <b>${attacker.name}</b> conducted a <b>Grand Crescendo</b>, breaking all Stuns and empowering all allies with +40% strike power!`);
        playSound('heal');
        break;
      }
    }
  }

  // Sapper EMP Lockout (normal attacks only)
  if (attacker.role === 'Sapper' && !isChargeAttack && finalTarget && finalTarget.pv > 0) {
    const empChance = (ROLE_SKILL_SCALING.SapperEmpChance[attacker.rarity] ?? 50) / 100;
    if (Math.random() < empChance) {
      // duration 2: statuses tick at the start of the foe's turn, so 1 would expire before it could matter
      applyStatusEffect(finalTarget, 'EmpLockout', 2);
      showFloatingText(defenderSide, actualDefenderSlot, 'EMP LOCKED OUT', 'text-amber-400 font-black');
      logBattleEvent(`💣 <b>${attacker.name}</b> landed an <b>EMP Lockout</b> on <b>${finalTarget.name}</b> (Pip gains blocked for 1 turn)!`);
    } else {
      const pipDmgVal = ROLE_SKILL_SCALING.SapperPipDmg[attacker.rarity] ?? 50;
      const splashVal = ROLE_SKILL_SCALING.SapperSplashDmg[attacker.rarity] ?? 75;
      const targetPips = finalTarget.energy || 0;
      if (targetPips > 0) {
        const dmg = targetPips * pipDmgVal;
        finalTarget.pv = Math.max(0, finalTarget.pv - dmg);
        updateCardVisualStats(defenderSide, actualDefenderSlot);
        showFloatingText(defenderSide, actualDefenderSlot, `-${dmg} EMP FEEDBACK`, 'text-rose-400 font-black');
        logBattleEvent(`⚡ <b>EMP Feedback:</b> Lockout failed! <b>${finalTarget.name}</b>'s ${targetPips} Pips backfired for ${dmg} true damage!`);
      } else {
        const adjSlot = [actualDefenderSlot - 1, actualDefenderSlot + 1]
          .find(s => s >= 0 && s < 3 && defenderField[s] && defenderField[s].pv > 0);
        if (adjSlot !== undefined) {
          const adj = defenderField[adjSlot];
          adj.pv = Math.max(0, adj.pv - splashVal);
          updateCardVisualStats(defenderSide, adjSlot);
          showFloatingText(defenderSide, adjSlot, `-${splashVal} ZERO-PIP SPLASH`, 'text-orange-400 font-bold');
          logBattleEvent(`💥 <b>Zero-Pip Overload:</b> splash hit <b>${adj.name}</b> for ${splashVal} DMG!`);
        } else {
          const dmg = splashVal + pipDmgVal;
          finalTarget.pv = Math.max(0, finalTarget.pv - dmg);
          updateCardVisualStats(defenderSide, actualDefenderSlot);
          showFloatingText(defenderSide, actualDefenderSlot, `-${dmg} OVERLOAD TRANSFER`, 'text-rose-500 font-black');
          logBattleEvent(`💥 <b>Overload Transfer:</b> no neighbours left, <b>${finalTarget.name}</b> took ${dmg} true DMG!`);
        }
      }
    }
    // Deaths from the above are picked up by the normal defeat handling / finishTurnCycle checks.
  }

  // Saboteur Trap Placement
  if (attacker.role === 'Saboteur' && !isChargeAttack) {
    const trapDmg = ROLE_SKILL_SCALING.SaboteurTrapDmg[attacker.rarity] ?? 50;
    applyStatusEffect(finalTarget, 'Trap', 2);
    const trapObj = finalTarget.statusEffects.find(s => s.type === 'Trap');
    if (trapObj) trapObj.trapDamage = trapDmg;
    showFloatingText(defenderSide, actualDefenderSlot, 'TRAP RIGGED', 'text-amber-400 font-bold');
    logBattleEvent(`💣 <b>${attacker.name}</b> concealed a Booby Trap on <b>${finalTarget.name}</b>!`);
  }

  // Chronomancer Haste Acceleration
  if (attacker.role === 'Chronomancer' && !isChargeAttack) {
    let candidateSlot = -1;
    let minEnergy = 99;
    attackerField.forEach((ally, idx) => {
      if (ally && ally.pv > 0 && idx !== attackerSlot && ally.energy < minEnergy) {
        minEnergy = ally.energy;
        candidateSlot = idx;
      }
    });

    if (candidateSlot !== -1) {
      const targetAlly = attackerField[candidateSlot];
      applyStatusEffect(targetAlly, 'Haste', 2);
      updateCardVisualStats(attackerSide, candidateSlot);
      showFloatingText(attackerSide, candidateSlot, 'HASTE (+25% DMG)', 'text-amber-300 font-bold');
      logBattleEvent(`⏳ <b>${attacker.name}</b> accelerated time for <b>${targetAlly.name}</b> (Haste)!`);
    }
  }

  // Shaman Spirit Brand Placement
  if (attacker.role === 'Shaman' && !isChargeAttack) {
    applyStatusEffect(finalTarget, 'SpiritBrand', 2);
    showFloatingText(defenderSide, actualDefenderSlot, 'SPIRIT BRANDED', 'text-emerald-400 font-bold');
    logBattleEvent(`🪶 <b>${attacker.name}</b> branded <b>${finalTarget.name}</b> with ancestral markings!`);
  }

  // Shaman Spirit Brand Healing Leech on Hit
  const brandIdx = finalTarget.statusEffects.findIndex(s => s.type === 'SpiritBrand');
  if (brandIdx !== -1 && actualDmgDealt > 0) {
    const healPct = (ROLE_SKILL_SCALING.ShamanLeechPct[attacker.rarity] ?? 18) / 100;
    const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;
    const healAmount = Math.max(1, Math.round(actualDmgDealt * healPct * cauterize));
    applyHealing(attacker, healAmount);
    attacker.def += 3;
    updateCardVisualStats(attackerSide, attackerSlot);
    showFloatingText(attackerSide, attackerSlot, `+${healAmount} VITALITY (+3 DEF)`, 'text-emerald-400');
    logBattleEvent(`🪶 <b>${attacker.name}</b> absorbed ${healAmount} PV from the Spirit Brand!`);
  }

  if (attacker.role === 'Hexer') {
    const stunTargets = [];
    if (isChargeAttack) {
      defenderField.forEach((target, tIdx) => {
        if (target && target.pv > 0) stunTargets.push(tIdx);
      });
    } else if (Math.random() < (ROLE_SKILL_SCALING.Hexer[attacker.rarity] ?? 15) / 100) {
      const candidates = [];
      defenderField.forEach((target, tIdx) => {
        if (target && target.pv > 0 && !target.statusEffects.some(s => s.type === 'Stun')) candidates.push(tIdx);
      });
      candidates.sort((a, b) => {
        const A = defenderField[a];
        const B = defenderField[b];
        return ((B.energy >= 3) - (A.energy >= 3)) || (B.pv - A.pv);
      });
      if (candidates.length > 0) stunTargets.push(candidates[0]);
    }
    if (stunTargets.length > 0) {
      stunTargets.forEach(tIdx => {
        applyStatusEffect(defenderField[tIdx], 'Stun', HEXER_STUN_TURNS);
        updateCardVisualStats(defenderSide, tIdx);
        showFloatingText(defenderSide, tIdx, 'STUNNED', 'text-cyan-300');
      });
      const names = stunTargets.map(i => `<b>${defenderField[i].name}</b>`).join(', ');
      logBattleEvent(`❄️ <b>${attacker.name}</b> cast <i>Paralyzing Hex</i>, stunning ${names}!`);
    }
  }

  if (attacker.role === 'Warlock' && actualDmgDealt > 0 && !attacker.statusEffects.some(s => s.type === 'Necrosis')) {
    const leechPct = isChargeAttack ? 45 : (ROLE_SKILL_SCALING.Warlock[attacker.rarity] || 20);
    const aquaMult = getAquaPotencyMultiplier(attackerSide);
    const cauterize = (typeof getRelicCauterizeMultiplier === 'function') ? getRelicCauterizeMultiplier(attackerSide) : 1.0;
    const healAmount = Math.max(1, Math.round(actualDmgDealt * (leechPct / 100) * aquaMult * cauterize));
    const oldPv = attacker.pv;
    applyHealing(attacker, healAmount);
    const actualRecovered = attacker.pv - oldPv;
    if (actualRecovered > 0) {
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(attackerSide, attackerSlot, `+${actualRecovered} LEECH`, 'text-emerald-400');
      logBattleEvent(`🩸 <b>${attacker.name}</b> siphoned ${actualRecovered} PV!${aquaMult > 1 ? ' <span class="text-cyan-300">(Aqua +25%)</span>' : ''}${cauterize < 1.0 ? ' <span class="text-rose-400">(Cauterized -50%)</span>' : ''}`);
      playSound('heal');
    }
  }

  if (attacker.role === 'Paladin') {
    const transferPct = isChargeAttack ? 40 : (ROLE_SKILL_SCALING.Paladin[attacker.rarity] || 20);
    const totalShield = Math.max(1, Math.round(totalStrikeDamage * (transferPct / 100)));
    const splitShield = Math.max(1, Math.round(totalShield / 2));

    attackerField.forEach((ally, aIdx) => {
      if (ally && aIdx !== attackerSlot && ally.pv > 0) {
        ally.def += splitShield;
        updateCardVisualStats(attackerSide, aIdx);
        showFloatingText(attackerSide, aIdx, `+${splitShield} DEF`, 'text-cyan-300');
      }
    });
    logBattleEvent(`🛡️ <b>${attacker.name}</b> shielded allies for +${splitShield} DEF each!`);
  }

  const activeResonances = getActiveResonances(playerState.equippedDeckIds);
  if (side === 'player' && activeResonances.some(r => r.element === 'Fire') && Math.random() < PYRO_BURN_CHANCE) {
    applyStatusEffect(defender, 'Burn', 2);
    showFloatingText(defenderSide, defenderSlot, 'PYRO BURN', 'text-orange-400');
    logBattleEvent(`🔥 <b>Pyro Resonance</b> ignited <b>${defender.name}</b> with bonus Burn!`);
  }

  if (attacker.role === 'Thief') {
    const chainDamage = Math.max(1, Math.round(baseStrikeDmg * THIEF_CHAIN_PCT));
    const otherEnemySlots = [0, 1, 2].filter(s => s !== defenderSlot && defenderField[s] && defenderField[s].pv > 0);

    const chainSlots = isChargeAttack
      ? otherEnemySlots
      : otherEnemySlots.filter((slot, i) => i === 0 || Math.random() < 0.5);

    chainSlots.forEach(slot => {
      defenderField[slot].pv = Math.max(0, defenderField[slot].pv - chainDamage);
      updateCardVisualStats(defenderSide, slot);
      showFloatingText(defenderSide, slot, `-${chainDamage} ${isChargeAttack ? 'PHANTOM' : 'CHAIN'}`, 'text-amber-400');
      logBattleEvent(`🗡️ <b>${attacker.name}</b> ${isChargeAttack ? 'unleashed a phantom strike on' : 'chained attack to'} <b>${defenderField[slot].name}</b> for ${chainDamage} DMG!`);
    });
  }
  
  if (attacker.role === 'Bard' && !isChargeAttack) {
    let lowestAllySlot = -1;
    let lowestPips = 99;
    attackerField.forEach((ally, aIdx) => {
      if (ally && ally.pv > 0 && aIdx !== attackerSlot) {
        if (ally.energy < lowestPips) {
          lowestPips = ally.energy;
          lowestAllySlot = aIdx;
        }
      }
    });

    if (lowestAllySlot !== -1) {
      const batteryTarget = attackerField[lowestAllySlot];
      if (batteryTarget.energy < batteryTarget.maxEnergy) {
        addCardEnergy(batteryTarget, 1);
        updateCardVisualStats(attackerSide, lowestAllySlot);
        showFloatingText(attackerSide, lowestAllySlot, '+1 PIP (HARMONY)', 'text-sky-300');
        logBattleEvent(`🎶 <b>${attacker.name}</b> energized <b>${batteryTarget.name}</b> with an inspiring chord (+1 Pip)!`);
      }
    }

    const siphonChance = (ROLE_SKILL_SCALING.BardSiphonChance[attacker.rarity] ?? 30) / 100;
    if (Math.random() < siphonChance && finalTarget.energy > 0) {
      finalTarget.energy = Math.max(0, finalTarget.energy - 1);
      addCardEnergy(attacker, 1);
      updateCardVisualStats(defenderSide, actualDefenderSlot);
      updateCardVisualStats(attackerSide, attackerSlot);
      showFloatingText(defenderSide, actualDefenderSlot, '-1 PIP (SIPHON)', 'text-purple-400');
      showFloatingText(attackerSide, attackerSlot, '+1 PIP (STOLEN)', 'text-cyan-300');
      logBattleEvent(`🪕 <b>${attacker.name}</b> struck a dissonant chord, siphoning 1 Pip from <b>${finalTarget.name}</b>!`);
    }
  }

  setTimeout(() => {
    if (attackerCardEl) attackerCardEl.classList.remove('lunge-ally', 'lunge-enemy');
    if (defenderCardEl) defenderCardEl.classList.remove('hit-shake');

    if (defender.pv > 0) {
      addCardEnergy(defender, 1);

      if (finalTarget.isDummy && !finalTarget.canRetaliate) {
        logBattleEvent(`🎯 <b>${finalTarget.name}</b> absorbed the strike without retaliating (Counter Disabled).`);
        setTimeout(() => {
          if (attackerCardEl) attackerCardEl.classList.remove('lunge-ally', 'lunge-enemy');
          if (defenderCardEl) defenderCardEl.classList.remove('hit-shake');
          finishTurnCycle();
        }, getCombatDelay(400, battleEngine.matchMode));
        return;
      }

      const hasZephyr = (side === 'player') && activeResonances.some(r => r.element === 'Wind');
      if (hasZephyr && Math.random() < 0.20) {
        showFloatingText(attackerSide, attackerSlot, `DODGED!`, 'text-emerald-300');
        logBattleEvent(`🌪️ <b>Zephyr Resonance:</b> ${attacker.name} dodged the counterattack!`);
        finishTurnCycle();
        return;
      }

      // Check for Relic Snipe Bypass (All-Seeing Eagle Monocle on Stunned/Frozen/<30% PV foes)
      const relicSnipeBypass = (typeof canRelicBypassCounter === 'function') && canRelicBypassCounter(attacker, defender, attackerSide);

      // --- LOCATION 2: SIGIL COUNTER EVASION HOOK (Sigil of Zephyr's Evasion) ---
  const sigilEvaded = (typeof canSigilEvadeCounter === 'function') && canSigilEvadeCounter(attacker);

  // --- COLISEUM COUNTER EVASION HOOK (Talia, Zephyr Gale & Dust Devil Weather) ---
  const coliseumEvaded = (battleEngine.matchMode === 'coliseum' && typeof handleColiseumCounterEvasion === 'function')
    ? handleColiseumCounterEvasion(battleEngine.coliseumRival, attacker, defender, attackerSide)
    : false;

  // --- SPIRE COUNTER EVASION (Smoke Shroud Consumable & Biome Wind Slipstream) ---
  const spireEvaded = (battleEngine.matchMode === 'spire') && (
    !!attacker._smokeShroudActive ||
    (battleEngine.spireBiome && battleEngine.spireBiome.id === 'biome_wind' && Math.random() < 0.15)
  );

  if (attacker.role === 'Ranger' || (isChargeAttack && attacker.role === 'Assassin') || relicSnipeBypass || sigilEvaded || coliseumEvaded || spireEvaded) {
    if (spireEvaded) {
      showFloatingText(attackerSide, attackerSlot, attacker._smokeShroudActive ? 'SMOKE SHROUD' : 'SLIPSTREAM EVADED', 'text-slate-300 font-bold');
      logBattleEvent(`🌫️ <b>${attacker.name}</b> evaded retaliation behind defensive cover!`);
    } else if (coliseumEvaded) {
      logBattleEvent(`🌪️ <b>${attacker.name}</b> evaded retaliation through coliseum agility!`);
    } else if (sigilEvaded) {
      showFloatingText(attackerSide, attackerSlot, 'ZEPHYR EVADED', 'text-emerald-300 font-bold');
      logBattleEvent(`🌪️ <b>Zephyr's Evasion:</b> <b>${attacker.name}</b> slipped behind defenses and avoided retaliation!`);
    } else if (relicSnipeBypass && attacker.role !== 'Ranger') {
      showFloatingText(attackerSide, attackerSlot, 'SNIPE BYPASS', 'text-amber-300 font-bold');
      logBattleEvent(`🦅 <b>Eagle Monocle:</b> <b>${attacker.name}</b> bypassed retaliation completely!`);
    } else {
      logBattleEvent(`🏹 <b>${attacker.name}</b> bypassed retaliation completely!`);
    }
    finishTurnCycle();
  } else if (defender.statusEffects.some(s => s.type === 'Stun')) {
        logBattleEvent(`❄️ <b>${defender.name}</b> is Stunned and cannot counterattack!`);
        finishTurnCycle();
      } else if (finalTarget.statusEffects.some(s => s.type === 'FaultlineStagger') && Math.random() < 0.40) {
        showFloatingText(defenderSide, actualDefenderSlot, 'COUNTER MISSED (FAULTLINE)', 'text-amber-400 font-bold');
        logBattleEvent(`🌋 <b>${finalTarget.name}</b> lost its footing on the Faultline and its counterattack missed!`);
        finishTurnCycle();
      } else {
        playSound('counter');

        if (finalTarget.role === 'Valkyrie') {
          const ratio = (ROLE_SKILL_SCALING.ValkyrieAbsorbRatio[finalTarget.rarity] || 50) / 100;
          const absorbed = Math.round(actualDmgDealt * ratio);
          const maxStorage = Math.round(finalTarget.maxPv * 1.5);

          finalTarget.valhallaFuryStored = Math.min(maxStorage, (finalTarget.valhallaFuryStored || 0) + absorbed);

          showFloatingText(defenderSide, actualDefenderSlot, `+${absorbed} FURY STORED`, 'text-cyan-300 font-bold');
          logBattleEvent(`🛡️ <b>${finalTarget.name}</b> absorbed ${absorbed} damage into <b>Valhalla Fury</b> (No Counterattack)!`);

          setTimeout(() => {
            if (attackerCardEl) attackerCardEl.classList.remove('lunge-ally', 'lunge-enemy');
            if (defenderCardEl) defenderCardEl.classList.remove('hit-shake');
            finishTurnCycle();
          }, getCombatDelay(500, battleEngine.matchMode));
          return;
        }
		
        let counterDef = attacker.def;
        let riposteMult = 1.0;

        if (finalTarget.role === 'Duelist') {
          const bonusPct = (ROLE_SKILL_SCALING.Duelist[finalTarget.rarity] ?? 60) / 100;
          riposteMult = 1.0 + bonusPct;
          counterDef = Math.round(counterDef * 0.70);
          showFloatingText(defenderSide, actualDefenderSlot, `RIPOSTE +${Math.round(bonusPct * 100)}%`, 'text-cyan-300');
          logBattleEvent(`🤺 <b>${finalTarget.name}</b> prepared a lethal <i>Riposte</i> (+${Math.round(bonusPct * 100)}% counter damage)!`);
        }

        if (finalTarget.role === 'Monk') {
          finalTarget.focusStacks = Math.min(5, (finalTarget.focusStacks || 0) + 1);
          showFloatingText(defenderSide, actualDefenderSlot, `FOCUS x${finalTarget.focusStacks}`, 'text-amber-300');
        }

        let counterBase = calculateMitigatedDamage(finalTarget.pv, counterDef);
        const counterElemRes = getElementalAdvantage(finalTarget.element, attacker.element);
        counterBase = Math.round(counterBase * counterElemRes.mult * riposteMult);

        // Relic Counterattack Multiplier
        if (typeof getRelicCounterMultiplier === 'function') {
          const counterMult = getRelicCounterMultiplier(defenderSide);
          if (counterMult > 1.0) {
            counterBase = Math.round(counterBase * counterMult);
          }
        }

        if (attackerSide === 'player' && counterElemRes.mult > 1 && isResonanceActive('player', 'Earth')) {
          counterBase = Math.round(counterBase * (1 - TERRA_ELEM_REDUCTION));
        }

        if (attacker.statusEffects.some(s => s.type === 'TotemWard')) {
          counterBase = Math.max(1, Math.round(counterBase * 0.65));
          showFloatingText(attackerSide, attackerSlot, 'TOTEM WARD (-35%)', 'text-emerald-300 font-bold');
        }
		
		// Geomancer Counterattack Reduction
        if (defender.statusEffects.some(s => s.type === 'LeyTrench')) {
          const trenchMit = (ROLE_SKILL_SCALING.GeomancerCounterMit[defender.rarity] ?? 22) / 100;
          counterBase = Math.max(1, Math.round(counterBase * (1 - trenchMit)));
          showFloatingText(defenderSide, actualDefenderSlot, `TRENCH -${Math.round(trenchMit * 100)}%`, 'text-amber-500 font-bold');
        }

        const ironWill = attacker.role === 'Warrior';
        if (ironWill) {
          counterBase = Math.max(1, Math.round(counterBase * (1 - getWarriorRetaliationReduction(attacker))));
        }

        const prePvCounter = attacker.pv;
        attacker.pv = Math.max(0, attacker.pv - counterBase);
        storeSpectralDamage(attacker, counterBase, prePvCounter);
        recordCombatStat(finalTarget, 'damageDealt', counterBase, defenderSide === 'player');
        recordCombatStat(attacker, 'damageTaken', counterBase, attackerSide === 'player');
        updateCardVisualStats(attackerSide, attackerSlot);
        addCardEnergy(attacker, 1);

        showFloatingText(attackerSide, attackerSlot, `-${counterBase} RETALIATE`, 'text-yellow-400');
        if (attackerCardEl) attackerCardEl.classList.add('hit-shake');
        logBattleEvent(`↩️️ <b>${defender.name}</b> counterattacked for <span class="text-yellow-400 font-bold">${counterBase} DMG</span>!${ironWill ? ' <i>(Iron Will)</i>' : ''}`);
        
        if (attacker.pv <= 0) {
          let wasRevived = triggerFatalGuard(attacker, attackerSide, attackerSlot) || ((typeof triggerRelicReviveIfEligible === 'function')
            ? triggerRelicReviveIfEligible(attacker, attackerSide, attackerSlot)
            : false);
            
          if (!wasRevived && typeof triggerSigilFatalRebirth === 'function') {
            wasRevived = triggerSigilFatalRebirth(attacker, attackerSide, attackerSlot);
          }

          if (!wasRevived) {
            logBattleEvent(`💀 <span class="text-rose-400 font-bold">${attacker.name}</span> fell to the counterattack!`);
            triggerSoulHarvest(attacker);
          } else {
            updateCardVisualStats(attackerSide, attackerSlot);
          }
        }

        setTimeout(() => {
          if (attackerCardEl) attackerCardEl.classList.remove('hit-shake');
          finishTurnCycle();
        }, getCombatDelay(600, battleEngine.matchMode));
      }
    } else {
      // Spire Floor 30: Aurelion Phase 1 to Phase 2 Cosmic Ascendance Transition
      if (battleEngine.matchMode === 'spire' && defenderSide === 'enemy' && typeof spireState !== 'undefined' && spireState.currentFloor === 30 && spireState.bossCombatState?.phase === 1 && actualDefenderSlot === 0) {
        spireState.bossCombatState.phase = 2;
        finalTarget.pv = finalTarget.maxPv;
        finalTarget.energy = 3;
        finalTarget.statusEffects = [];
        updateCardVisualStats(defenderSide, actualDefenderSlot);
        showFloatingText(defenderSide, actualDefenderSlot, 'PHASE 2: COSMIC ASCENDANCE', 'text-yellow-300 font-black text-lg');
        logBattleEvent(`👑 <b>AURELION TRANSCENDED MORTALITY!</b> Phase 2: Restored to full PV with +35% ATK & casts Cataclysm!`);
        playSound('rainbow');
        finishTurnCycle();
        return;
      }

      const wasRevived = triggerFatalGuard(finalTarget, defenderSide, actualDefenderSlot) || ((typeof triggerRelicReviveIfEligible === 'function')
        ? triggerRelicReviveIfEligible(finalTarget, defenderSide, actualDefenderSlot)
        : false);

      if (wasRevived) {
        updateCardVisualStats(defenderSide, actualDefenderSlot);
      } else {
        logBattleEvent(`💀 <span class="text-rose-400 font-bold">${defender.name}</span> has been defeated!`);
        triggerSoulHarvest(finalTarget);

        if (finalTarget.role === 'Necromancer') {
          applyStatusEffect(attacker, 'GraveCurse', 2);
          showFloatingText(attackerSide, attackerSlot, 'GRAVE CURSE (-30% ATK)', 'text-purple-600');
          logBattleEvent(`☠️ <b>${finalTarget.name}</b> placed an undying <i>Grave Curse</i> on <b>${attacker.name}</b>!`);
        }

        // Relic On-Kill Trigger
        if (typeof triggerRelicOnKill === 'function') {
          triggerRelicOnKill(attacker, attackerSide, attackerField);
        }
      }
      finishTurnCycle();
    }
  }, getCombatDelay(650, battleEngine.matchMode));
}

// Safety net: some matchups (high-DEF tanks, healers, stalling kits) can never kill each other.
// After this many turns the match is decided by total PV remaining (a tie counts as a loss).
const ARENA_TURN_LIMIT = 150;

function finishTurnCycle() {
  handleReinforcements('player');
  handleReinforcements('enemy');

  if (battleEngine.arenaSummon && battleEngine.arenaSummon.lockoutTurns > 0) {
    battleEngine.arenaSummon.lockoutTurns = Math.max(0, battleEngine.arenaSummon.lockoutTurns - 1);
  }
  if (battleEngine.enemyArenaSummon && battleEngine.enemyArenaSummon.lockoutTurns > 0) {
    battleEngine.enemyArenaSummon.lockoutTurns = Math.max(0, battleEngine.enemyArenaSummon.lockoutTurns - 1);
  }

  renderCombatField();
  updateReserveDots();

  const playerAlive = isSideAlive('player');
  const enemyAlive = isSideAlive('enemy');

  if (!enemyAlive) {
    handleMatchOver(true);
    return;
  } else if (!playerAlive) {
    handleMatchOver(false);
    return;
  }

  // --- CHRONOMANCER EXTRA TURN CHECK ---
  if (battleEngine.extraTurn) {
    battleEngine.extraTurn = false;
    battleEngine.selectedAllySlot = null;
    battleEngine.attackMode = 'normal';
    battleEngine.isResolving = false;
    logBattleEvent(`⏳ <b>TIME WARP ACTIVATED!</b> You take another consecutive attack turn!`);
    updateTurnStatusUI();
    // FIX: in Auto-Battle nothing scheduled the next action, so the extra turn stalled.
    if (isAutoBattle && battleEngine.turn === 'player') {
      setTimeout(executePlayerAutoTurn, getCombatDelay(600, battleEngine.matchMode));
    }
    return;
  }

  battleEngine.selectedAllySlot = null;
  battleEngine.attackMode = 'normal';
  battleEngine.turn = battleEngine.turn === 'player' ? 'enemy' : 'player';
  battleEngine.turnCount++;

  if (battleEngine.turnCount > ARENA_TURN_LIMIT && battleEngine.matchMode !== 'sandbox_arena') {
    const remaining = (field, reserve) => [...field, ...reserve].reduce((sum, c) => sum + (c ? Math.max(0, c.pv) : 0), 0);
    const pRem = remaining(battleEngine.playerField, battleEngine.playerReserve);
    const eRem = remaining(battleEngine.enemyField, battleEngine.enemyReserve);
    logBattleEvent(`⏳ <b>TIME'S UP!</b> After ${ARENA_TURN_LIMIT} turns the judges decide by remaining vitality: <b>${pRem.toLocaleString()}</b> PV (you) vs <b>${eRem.toLocaleString()}</b> PV (enemy). A tie counts as a loss.`);
    battleEngine.isResolving = true;
    handleMatchOver(pRem > eRem);
    return;
  }

  battleEngine.isResolving = false;

  executeTurnStartPhase();
}

function handleReinforcements(side) {
  const field = side === 'player' ? battleEngine.playerField : battleEngine.enemyField;
  const reserve = side === 'player' ? battleEngine.playerReserve : battleEngine.enemyReserve;

  for (let i = 0; i < 3; i++) {
    // Divine Ward / Spectral Vengeance also protect against splash, reflect and DoT deaths
    if (field[i] && field[i].pv <= 0 && triggerFatalGuard(field[i], side, i)) continue;
    if (!field[i] || field[i].pv <= 0) {
      if (reserve.length > 0) {
        const nextUnit = reserve.shift();
        field[i] = nextUnit;
        logBattleEvent(`🚩 ${side === 'player' ? 'Your' : 'Enemy'} reserve unit <b>${nextUnit.name}</b> joined slot ${i + 1}!`);

        // Hook: Swap Energy Grant from Relic
        if (typeof triggerRelicSwapEnergy === 'function') {
          triggerRelicSwapEnergy(nextUnit, side, i);
        }
      } else {
        field[i] = null;
      }
    }
  }
}

function isSideAlive(side) {
  const field = side === 'player' ? battleEngine.playerField : battleEngine.enemyField;
  const reserve = side === 'player' ? battleEngine.playerReserve : battleEngine.enemyReserve;
  const hasField = field.some(c => c !== null && c.pv > 0);
  return hasField || reserve.length > 0;
}

function executeEnemySummonInvocation() {
  const summon = battleEngine.enemyArenaSummon;
  if (!summon || summon.used || summon.lockoutTurns > 0 || battleEngine.turn !== 'enemy' || battleEngine.isResolving) return false;

  summon.used = true;
  playSound('charge');

  logBattleEvent(`🔮 <span class="text-rose-400 font-bold">OPPONENT TACTICAL INVOCATION!</span> Summoned <b>${summon.name}</b> [${summon.callName}]!`);
  if (typeof executeSummonCallEffects === 'function') {
    executeSummonCallEffects(summon, 'enemy', false);
  }

  // Process player casualties from summon damage
  let playerDied = false;
  battleEngine.playerField.forEach((ally, idx) => {
    if (ally && ally.pv <= 0) {
      logBattleEvent(`💀 <span class="text-rose-400 font-bold">${ally.name}</span> fell to the summon call!`);
      if (typeof triggerSoulHarvest === 'function') triggerSoulHarvest(ally);
      playerDied = true;
    }
  });

  if (playerDied) {
    handleReinforcements('player');
    updateReserveDots();
  }

  renderCombatField();
  return true;
}

function executeEnemyAITurn() {
  if (battleEngine.turn !== 'enemy' || !isSideAlive('enemy') || !isSideAlive('player')) return;

  // If in Arena Sandbox and Dummies have attack disabled:
  if (battleEngine.matchMode === 'sandbox_arena') {
    const anyCanAttack = battleEngine.enemyField.some(c => c && c.pv > 0 && c.canAttack);
    if (!anyCanAttack) {
      logBattleEvent(`🎯 Automatons idling (Dummy Turn Attacks Disabled).`);
      setTimeout(finishTurnCycle, getCombatDelay(400, battleEngine.matchMode));
      return;
    }
  }

  // Enemy Summon Invocation AI Check (Invoke when ready!)
  if (battleEngine.enemyArenaSummon && battleEngine.enemyArenaSummon.lockoutTurns <= 0 && !battleEngine.enemyArenaSummon.used) {
    executeEnemySummonInvocation();
    if (!isSideAlive('player')) {
      handleMatchOver(false);
      return;
    }
  }

  const livingAttackers = [];
  battleEngine.enemyField.forEach((c, idx) => {
    if (c && c.pv > 0 && !c.statusEffects.some(s => s.type === 'Stun')) {
      livingAttackers.push(idx);
    }
  });

  const livingTargets = [];
  battleEngine.playerField.forEach((c, idx) => {
    if (c && c.pv > 0 && !c.isAirborne) livingTargets.push(idx);
  });

  if (livingAttackers.length === 0 || livingTargets.length === 0) {
    finishTurnCycle();
    return;
  }

  const attackerSlot = livingAttackers[Math.floor(Math.random() * livingAttackers.length)];
  const attackerUnit = battleEngine.enemyField[attackerSlot];
  const isCharge = canUseCharge(attackerUnit);
  
  let targetSlot = -1;

  // 1. Mandatory Taunt Override Check
  const taunterIndex = battleEngine.playerField.findIndex(c => 
    c && c.pv > 0 && !c.isAirborne && c.statusEffects.some(s => s.type === 'Taunt')
  );

  if (taunterIndex !== -1) {
    targetSlot = taunterIndex;
    logBattleEvent(`🎯 Opponent is forced to target <b>${battleEngine.playerField[targetSlot].name}</b> due to Taunt!`);
  } else {
    // 2. Smarter Archetype AI Logic
    const role = attackerUnit.role;
    
    if (role === 'Assassin' || role === 'Duelist' || role === 'Ranger' || role === 'Thief') {
      // Predators: Hunt the weakest link (Lowest PV)
      let lowestPv = 999999;
      livingTargets.forEach(idx => {
        if (battleEngine.playerField[idx].pv < lowestPv) {
          lowestPv = battleEngine.playerField[idx].pv;
          targetSlot = idx;
        }
      });
      logBattleEvent(`🎯 <b>${attackerUnit.name}</b> targets your weakest champion!`);
      
    } else if (role === 'Mage' || role === 'Warlock' || role === 'Saboteur' || role === 'Hexer') {
      // Tacticians: Suppress ultimates (Highest Energy)
      let highestEnergy = -1;
      livingTargets.forEach(idx => {
        if (battleEngine.playerField[idx].energy > highestEnergy) {
          highestEnergy = battleEngine.playerField[idx].energy;
          targetSlot = idx;
        }
      });
      logBattleEvent(`🧿 <b>${attackerUnit.name}</b> targets your highest energy champion!`);
      
    } else if (role === 'Warrior' || role === 'Knight' || role === 'Paladin' || role === 'Monk') {
      // Frontliners: Clash directly forward if possible
      if (battleEngine.playerField[attackerSlot] && battleEngine.playerField[attackerSlot].pv > 0) {
        targetSlot = attackerSlot;
      } else {
        targetSlot = livingTargets[Math.floor(Math.random() * livingTargets.length)];
      }
    } else {
      // Fallback: Random Target
      targetSlot = livingTargets[Math.floor(Math.random() * livingTargets.length)];
    }
  }

  executeAttackSequence(attackerSlot, targetSlot, 'enemy', isCharge);
}

function handleMatchOver(playerWon) {
  // Divert combat resolution to Abyssal Spire controller if in Spire match
  if (battleEngine.matchMode === 'spire') {
    battleEngine.isResolving = false;
    if (typeof spireOnBattleComplete === 'function') {
      spireOnBattleComplete(playerWon);
    }
    return;
  }

  // Divert combat resolution to Coliseum controller if in Coliseum match
  if (battleEngine.matchMode === 'coliseum') {
    battleEngine.isResolving = false;
    if (typeof coliseumOnBattleComplete === 'function') {
      coliseumOnBattleComplete(playerWon);
    }
    return;
  }

  battleEngine.isResolving = true;
  const modal = document.getElementById('match-result-modal');
  const title = document.getElementById('result-title');
  const subtitle = document.getElementById('result-subtitle');
  const icon = document.getElementById('result-icon-badge');
  const starChangeEl = document.getElementById('result-star-change');
  const goldChangeEl = document.getElementById('result-gold-change');
  const rubyChangeEl = document.getElementById('result-ruby-change');
  if (!modal || !title || !subtitle || !icon || !starChangeEl || !goldChangeEl || !rubyChangeEl) return;

  const isPractice = battleEngine.matchMode === 'practice';
  const isGhost = battleEngine.matchMode === 'ghost';
  const opponentTier = isPractice ? battleEngine.practiceTier : playerState.tierIndex;
  const currentTier = TIERS[playerState.tierIndex];
  
  let goldReward = 0;
  let rubyReward = 0;

  if (playerWon) {
    title.innerText = isPractice ? "PRACTICE VICTORY" : isGhost ? "RIVAL DEFEATED!" : "VICTORY!";
    title.className = "font-cinzel text-3xl font-black text-amber-300 tracking-wider";
    subtitle.innerText = isPractice
      ? "Nicely done! Nothing was at stake, so your rank and rewards are untouched."
      : isGhost 
        ? `You crushed ${battleEngine.currentGhost.ghostName} and claimed their bounty!` 
        : "Glorious triumph! You routed the enemy squad!";
    icon.className = "w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500 flex items-center justify-center text-4xl mb-3 shadow-xl";
    icon.innerText = isPractice ? "🎯" : isGhost ? "🥷" : "🏆";

    if (isGhost) {
      goldReward = battleEngine.currentGhost.bountyGold;
      rubyReward = battleEngine.currentGhost.bountyRubies;
      playerState.gold += goldReward;
      playerState.rubies += rubyReward;
    } else if (!isPractice) {
      const baseGold = getRandomInt(currentTier.winGold[0], currentTier.winGold[1]);
      const baseRuby = getRandomInt(currentTier.winRubies[0], currentTier.winRubies[1]);
      let multiplier = 1.0;
      if (playerState.tierIndex === MASTER_TIER_INDEX) multiplier += (playerState.masterStars * 0.02);
      goldReward = Math.round(baseGold * multiplier);
      rubyReward = Math.round(baseRuby * multiplier);

      playerState.gold += goldReward;
      playerState.rubies += rubyReward;
      handleRankedWin();
    }
    
    starChangeEl.innerText = isPractice || isGhost ? "No change" : "+1 Star";
    starChangeEl.className = isPractice || isGhost ? "text-base font-bold text-slate-400" : "text-base font-bold text-amber-400";
  } else {
    title.innerText = isPractice ? "PRACTICE DEFEAT" : isGhost ? "RIVAL TOO STRONG" : "DEFEAT";
    title.className = "font-cinzel text-3xl font-black text-rose-400 tracking-wider";
    subtitle.innerText = isPractice
      ? "No harm done. Tweak your deck and try again!"
      : isGhost 
        ? `${battleEngine.currentGhost.ghostName}'s deck overwhelmed you. Try again later.` 
        : "Your frontlines were shattered. Regroup and fight again!";
    icon.className = "w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500 flex items-center justify-center text-4xl mb-3 shadow-xl";
    icon.innerText = isPractice ? "🎯" : isGhost ? "💀" : "💀";

    if (!isPractice && !isGhost) handleRankedLoss();
    starChangeEl.innerText = isPractice || isGhost ? "No change" : "-1 Star";
    starChangeEl.className = isPractice || isGhost ? "text-base font-bold text-slate-400" : "text-base font-bold text-rose-400";
  }

  if (!isGhost) {
    recordMatchResult(playerWon, isPractice, opponentTier, goldReward, rubyReward);
  }

  goldChangeEl.innerText = `+${goldReward}`;
  rubyChangeEl.innerText = `+${rubyReward}`;

  updateTopCurrencyUI();
  updateRankedLadderUI();
  renderHomeUI();
  modal.classList.remove('hidden');
}

function handleRankedWin() {
  if (playerState.tierIndex === MASTER_TIER_INDEX) {
    playerState.masterStars++;
    return;
  }

  const currentTier = TIERS[playerState.tierIndex];
  const isBo3 = currentTier.promoFormat === 'bo3';
  const requiredPromoWins = isBo3 ? 2 : 3;

  // 1. Handling Promotion Series
  if (playerState.inPromotion) {
    playerState.promoWins++;
    if (playerState.promoWins >= requiredPromoWins) {
      playerState.tierIndex++;
      const nextTier = TIERS[playerState.tierIndex];
      playerState.division = nextTier.divisions[0]; // Enters at base division (e.g., Division 3)
      playerState.stars = 1;
      playerState.inPromotion = false;
      playerState.promoWins = 0;
      playerState.promoLosses = 0;
      if (typeof playSound === 'function') playSound('rainbow');
      logBattleEvent(`🎉 <b>PROMOTION ACHIEVED!</b> Promoted to <b>${nextTier.name} ${formatDivisionRoman(playerState.division)}</b>!`);
    }
    return;
  }

  // 2. Win Streak Star Multiplier (Tiers up to Platinum only)
  const isStreakEligible = playerState.tierIndex <= 3; // Bronze to Platinum
  const streakBonus = (isStreakEligible && (playerState.stats.currentStreak || 0) >= 3) ? 2 : 1;

  playerState.stars += streakBonus;

  if (streakBonus > 1) {
    logBattleEvent(`🔥 <b>WIN STREAK!</b> Earned +2 Stars for your winning streak!`);
  }

  // 3. Advancing Divisions or Triggering Promotion
  if (playerState.stars > currentTier.starsPerDiv) {
    const currentDivIdx = currentTier.divisions.indexOf(playerState.division);
    
    // If not in the final division (e.g. at Division 3 or 2, moving toward 1):
    if (currentDivIdx < currentTier.divisions.length - 1) {
      playerState.division = currentTier.divisions[currentDivIdx + 1];
      playerState.stars = 1;
      logBattleEvent(`⭐ Advanced to <b>${currentTier.name} ${formatDivisionRoman(playerState.division)}</b>!`);
    } else {
      // At Division 1: Trigger Promotion Series!
      playerState.inPromotion = true;
      playerState.promoWins = 0;
      playerState.promoLosses = 0;
      playerState.stars = currentTier.starsPerDiv;
      logBattleEvent(`⚔️ <b>PROMOTION SERIES UNLOCKED!</b> Win ${requiredPromoWins} matches to enter ${TIERS[playerState.tierIndex + 1].name}!`);
    }
  }
}

function handleRankedLoss() {
  if (playerState.tierIndex === MASTER_TIER_INDEX) {
    playerState.masterStars = Math.max(0, playerState.masterStars - 1);
    return;
  }

  const currentTier = TIERS[playerState.tierIndex];
  const isBo3 = currentTier.promoFormat === 'bo3';
  const maxAllowedLosses = isBo3 ? 2 : 3;

  // 1. Handling Promotion Failure
  if (playerState.inPromotion) {
    playerState.promoLosses++;
    if (playerState.promoLosses >= maxAllowedLosses) {
      playerState.inPromotion = false;
      playerState.promoWins = 0;
      playerState.promoLosses = 0;
      playerState.stars = Math.max(1, currentTier.starsPerDiv - 1);
      logBattleEvent(`❌ Promotion series concluded. Win 1 match to challenge again.`);
    }
    return;
  }

  // 2. Base Floor Protection (Bronze III cannot lose stars below 1)
  const isAbsoluteFloor = (playerState.tierIndex === 0 && playerState.division === currentTier.divisions[0] && playerState.stars <= 1);
  if (isAbsoluteFloor) {
    playerState.stars = 1;
    return;
  }

  playerState.stars--;

  // 3. Falling back a division
  if (playerState.stars < 1) {
    const currentDivIdx = currentTier.divisions.indexOf(playerState.division);
    if (currentDivIdx > 0) {
      // Step down to the previous division
      playerState.division = currentTier.divisions[currentDivIdx - 1];
      playerState.stars = currentTier.starsPerDiv;
      logBattleEvent(`⚠️ Demoted to <b>${currentTier.name} ${formatDivisionRoman(playerState.division)}</b>.`);
    } else {
      // Keep at 1 star if at the bottom division of current tier (Tier Floor Protection)
      playerState.stars = 1;
    }
  }
}


function closeMatchResultModal() {
  const modal = document.getElementById('match-result-modal');
  if (modal) modal.classList.add('hidden');
  switchTab('home');
}

const CARD_REGISTRY = [];
function registerCard(card) {
  CARD_REGISTRY.push(card);
  return CARD_REGISTRY.length - 1;
}

function renderCardHTML(card, options = {}) {
  if (!card) {
    return `<div class="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-600 text-xs font-semibold">EMPTY</div>`;
  }

  const isRainbow = card.isRainbow;
  const level = card.level || 1;
  const rarityInfo = RARITY_STATS[card.rarity] || RARITY_STATS.Common;
  const isSelected = options.isSelected;
  const isTargetable = options.isTargetable;
  const clickHandler = options.onClick ? `onclick="${options.onClick}"` : '';
  const regIdx = registerCard(card);
  const showLabel = !options.hideLabel;
  const elem = ELEMENT_CONFIG[card.element] || ELEMENT_CONFIG.Fire;
  const energy = card.energy || 0;
  const isUltReady = energy >= 3;
  const airborneBadge = card.isAirborne
    ? `<span class="bg-sky-950/90 text-sky-300 px-1.5 py-0.5 rounded text-[9px] font-black border border-sky-400 animate-pulse">🌪️ AIRBORNE</span>`
  : '';

  const statusBadges = (card.statusEffects || []).map(s => {
    const iconMap = { Burn: '🔥', Bleed: '🩸', ArmorBreak: '🛡️', Stun: '❄️' };
	const airborneBadge = card.isAirborne 
      ? `<span class="bg-sky-950/90 text-sky-300 px-1 py-0.5 rounded text-[9px] font-black border border-sky-400 animate-pulse">🌪️ AIRBORNE</span>`
      : '';
    return `<span class="bg-black/80 px-1 py-0.5 rounded text-[9px] font-bold border border-white/20">${iconMap[s.type] || '✦'} ${s.duration}</span>`;
  }).join('');

  return `
    <div class="flex flex-col gap-1">
      <div ${clickHandler} class="relative group cursor-pointer transition-all duration-300 transform active:scale-95 ${isSelected ? 'ring-4 ring-indigo-400 scale-105 shadow-xl shadow-indigo-500/50' : ''} ${isTargetable ? 'hover:ring-2 hover:ring-rose-500' : ''}">
        <div class="relative rounded-2xl aspect-[3/4.2] flex flex-col justify-between overflow-hidden shadow-xl ${isRainbow ? 'rainbow-card' : `bg-slate-900 border-2 ${rarityInfo.border}`} ${isUltReady ? 'ult-ready' : ''} ${card.awakened ? 'awakened-glow' : ''}">

          <div class="absolute inset-0 z-0">
            <img src="${card.image}" onerror="this.src='https://placehold.co/400x500/1e293b/94a3b8?text=${encodeURIComponent(card.name)}'" class="w-full h-full object-cover object-center opacity-100" alt="${card.name}">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40 pointer-events-none"></div>
          </div>

          <button onclick="event.stopPropagation(); openCardModal(${regIdx})" title="View Card Details" class="absolute top-1.5 right-1.5 z-30 w-5 h-5 rounded-full bg-black/80 border border-white/30 text-white text-[10px] font-bold flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-400 transition shadow">
            i
          </button>

          <div class="relative z-10 p-2 pr-7 flex items-center gap-1.5">
            <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${elem.badgeBg} ${elem.text} border ${elem.border}">
              ${elem.icon} ${card.element}
            </span>
          </div>

          <div class="relative z-10 px-2 flex flex-wrap gap-1">
		    ${airborneBadge}
            ${statusBadges}
          </div>

          <div class="relative z-10 px-2 flex justify-end -mb-3.5 pointer-events-none">
            <div class="w-7 h-7 rounded-full bg-slate-950/90 border border-amber-400/60 shadow-lg flex items-center justify-center text-xs pointer-events-auto" title="${card.role}">
              ${ROLE_ICONS[card.role] || '⚔️'}
            </div>
          </div>

          <div class="relative z-10 p-2 bg-slate-950/85 backdrop-blur-sm border-t border-slate-800/80 rounded-b-2xl">
            <div class="flex items-center justify-between mb-1 text-[10px]">
              <span class="text-slate-400 font-bold uppercase text-[8px] tracking-wider">Charge:</span>
              <div class="flex gap-1">
                <span class="w-2.5 h-2.5 rounded-full ${energy >= 1 ? 'bg-amber-400 shadow-sm shadow-amber-400/80' : 'bg-slate-700'}"></span>
                <span class="w-2.5 h-2.5 rounded-full ${energy >= 2 ? 'bg-amber-400 shadow-sm shadow-amber-400/80' : 'bg-slate-700'}"></span>
                <span class="w-2.5 h-2.5 rounded-full ${energy >= 3 ? 'bg-yellow-300 shadow-md shadow-yellow-300 animate-pulse' : 'bg-slate-700'}"></span>
              </div>
            </div>

            <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
              <div class="card-hp-bar bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-150" style="width: ${Math.max(0, Math.min(100, (card.pv / card.maxPv) * 100))}%"></div>
            </div>
            <div class="flex justify-between items-center text-[11px] font-bold">
              <div class="flex items-center gap-1 text-emerald-300" title="Primary Value (PV)">
                <span>PV</span>
                <span class="card-pv-display font-extrabold transition-transform duration-200">${card.pv}</span>
                <span class="text-[9px] text-slate-500">/${card.maxPv}</span>
              </div>
              <div class="flex items-center gap-1 text-cyan-300" title="Defense Value (DEF)">
                <span>DEF</span>
                <span class="card-def-display font-extrabold transition-transform duration-200">${card.def}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      ${showLabel ? `
      <button onclick="event.stopPropagation(); openCardModal(${regIdx})" class="w-full text-center px-1.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition shadow-sm flex items-center justify-between gap-1.5" title="Click to view details">
        <span class="text-[9px] font-black text-lime-400 bg-slate-950/90 px-1.5 py-0.5 rounded border border-lime-500/30 shrink-0">Lv.${level}</span>
        <h4 class="font-cinzel font-bold text-[11px] sm:text-xs text-slate-100 leading-tight truncate flex-1 text-center">
          ${card.name}
        </h4>
        <span class="text-[9px] font-extrabold text-${rarityInfo.color}-400 uppercase tracking-tight shrink-0">${(card.rarity || 'Common').slice(0, 3)}</span>
      </button>` : ''}
    </div>
  `;
}

function getRoleSkillDescription(card) {
  const rarity = card.rarity;
  switch (card.role) {
    case 'Knight': {
      const pct = ROLE_SKILL_SCALING.Knight[rarity] ?? 15;
      return `Fortify (Turn-Start): Automatically increases own DEF by +${pct}%. Stacks every turn throughout combat.`;
    }
    case 'Cleric': {
      const pct = ROLE_SKILL_SCALING.Cleric[rarity] ?? 8;
      return `Party Blessing (Turn-Start): Restores ${pct}% of this unit's PV to both other active frontline allies.`;
    }
    case 'Paladin': {
      const pct = ROLE_SKILL_SCALING.Paladin[rarity] ?? 20;
      return `Aegis Transfer: Converts ${pct}% of damage dealt into defensive shields split between the other two active allies.`;
    }
    case 'Berserker': {
      const pct = ROLE_SKILL_SCALING.Berserker[rarity] ?? 15;
      return `Blood Sacrifice: Consumes ${pct}% current PV before striking to deal double that amount as pure, uncounterable bonus damage. Bloodlust: if the strike defeats the target, the sacrificed PV is restored.`;
    }
    case 'Mage': {
      const pct = ROLE_SKILL_SCALING.Mage[rarity] ?? 35;
      return `Arcane Pierce: Attacks bypass ${pct}% of the enemy target's current DEF value.`;
    }
    case 'Warlock': {
      const pct = ROLE_SKILL_SCALING.Warlock[rarity] ?? 20;
      return `Soul Leech: Immediately siphons ${pct}% of damage dealt back into own PV before the target retaliates.`;
    }
    case 'Assassin': {
      const pct = ROLE_SKILL_SCALING.Assassin[rarity] ?? 45;
      return `Executioner's Mark: Deals +${pct}% amplified damage against any enemy whose current PV is at or below 50%.`;
    }
    case 'Ranger':
      return `Snipe: Long-range precision strike that completely bypasses and negates enemy counterattacks.`;
    case 'Thief':
      return `Chain Combo: Strikes the primary foe, then splashes 50% damage to a second enemy (with a 50% chance to hit a third).`;
    case 'Commander': {
      const aura = ROLE_SKILL_SCALING.Commander[rarity] ?? 6;
      return `Inspiring Presence: While on the battlefield, every ally deals +${aura}% damage (the strongest Commander's bonus applies).`;
    }
    case 'Hexer': {
      const chance = ROLE_SKILL_SCALING.Hexer[rarity] ?? 15;
      return `Paralyzing Hex: After attacking, ${chance}% chance to Stun the enemy's strongest champion for ${HEXER_STUN_TURNS} turns. A Stunned champion cannot act or counterattack.`;
    }
    case 'Warrior': {
      const ironWill = ROLE_SKILL_SCALING.Warrior[rarity] ?? 15;
      const rage = ROLE_SKILL_SCALING.WarriorRage[rarity] ?? 50;
      return `Iron Will & Rage: Takes ${ironWill}% less retaliation damage when attacking. Deals bonus damage that grows as PV is lost, up to +${rage}% near zero PV.`;
    }
    case 'Sentinel': {
      const redPct = ROLE_SKILL_SCALING.Sentinel[card.rarity] ?? 25;
      return `Vanguard Cover: If an ally drops to or below 40% PV, this unit intercepts incoming attacks aimed at them, absorbing the blow with ${redPct}% damage mitigation.`;
    }
    case 'Spellbreaker': {
      const stripPct = ROLE_SKILL_SCALING.Spellbreaker[card.rarity] ?? 50;
      return `Nullifying Brand: Strikes shatter up to ${stripPct}% of the target's bonus DEF (gained from buffs/shields), converting the stripped armor into unmitigated bonus damage.`;
    }
    case 'Duelist': {
      const bonusPct = ROLE_SKILL_SCALING.Duelist[card.rarity] ?? 60;
      return `Riposte Mastery: Retaliates on the opponent's turn with +${bonusPct}% amplified counter damage, and ignores 30% of the attacker's DEF.`;
    }
    case 'Necromancer': {
      const pvPct = ROLE_SKILL_SCALING.NecromancerPV[card.rarity] ?? 10;
      const defGain = ROLE_SKILL_SCALING.NecromancerDEF[card.rarity] ?? 5;
      return `Soul Harvest: Whenever ANY champion falls in battle, this unit harvests their essence, permanently gaining +${pvPct}% Max PV and +${defGain} DEF for the match.`;
    }
    case 'Monk': {
      const dmgPct = ROLE_SKILL_SCALING.MonkBonusDmg[card.rarity] ?? 8;
      const defBonus = ROLE_SKILL_SCALING.MonkBonusDef[card.rarity] ?? 4;
      return `Inner Focus: Every attack or counter builds +1 Focus stack (max 5). Each stack permanently grants +${dmgPct}% strike damage and +${defBonus} DEF.`;
    }
    case 'Alchemist': {
      const truePct = ROLE_SKILL_SCALING.Alchemist[card.rarity] ?? 8;
      return `Volatile Concoction: Strikes against enemies afflicted with Burn, Bleed, or Armor Break trigger Combustion, dealing +${truePct}% of the target's Max PV as unmitigated true damage.`;
    }
    case 'Corsair': {
      const critPct = ROLE_SKILL_SCALING.CorsairCrit[rarity] ?? 40;
      return `High Stakes: Attacks have a ${critPct}% chance to land a Critical Hit (1.75x damage) and immediately generate +1 bonus Energy Pip.`;
    }
    case 'Bard': {
      const siphChance = ROLE_SKILL_SCALING.BardSiphonChance[rarity] ?? 30;
      return `Aria of Haste: On attack, grants +1 Energy Pip to the ally with the lowest energy. In addition, has a ${siphChance}% chance to siphon 1 Pip from the defender.`;
    }
	case 'Saboteur': {
      const trapDmg = ROLE_SKILL_SCALING.SaboteurTrapDmg[rarity] ?? 50;
      return `Booby Trap: Normal attacks rig the target with an explosive charge for 2 turns. When the target attacks or takes an action, the trap detonates for ${trapDmg} true damage and strips 1 Energy Pip.`;
    }
    case 'Chronomancer': {
      const hastePct = ROLE_SKILL_SCALING.ChronomancerHaste[rarity] ?? 22;
      return `Temporal Dilation: Attacks grant Haste to the ally with the lowest energy. Their next strike deals +${hastePct}% bonus damage and refunds +1 Energy Pip.`;
    }
    case 'Shaman': {
      const leechPct = ROLE_SKILL_SCALING.ShamanLeechPct[rarity] ?? 18;
      return `Ancestral Brand: Attacks mark the target for 2 turns. Whenever any ally damages a marked enemy, they siphon ${leechPct}% of the damage dealt back into PV.`;
    }
    case 'Elementalist': {
      const pierceChance = ROLE_SKILL_SCALING.ElementalistPierce[rarity] ?? 35;
      return `Prismatic Affinity: Attacks ignore elemental disadvantage penalties (always 1.0x or higher). Has a ${pierceChance}% chance to convert neutral damage into +25% Elemental Advantage.`;
    }
	case 'Ravager': {
      const splash = ROLE_SKILL_SCALING.RavagerSplash[rarity] ?? 40;
      return `Whirlwind Slice: Normal strikes cleave adjacent frontline targets for ${splash}% splash damage. Reduces own DEF by 10% for that turn.`;
    }
    case 'Blight': {
      const defDrop = ROLE_SKILL_SCALING.BlightNecrosisDef[rarity] ?? 15;
      return `Noxious Vial: Normal attacks afflict the target with Necrosis for 2 turns. Targets afflicted with Necrosis cannot receive healing or life-siphon and lose ${defDrop}% DEF.`;
    }
    case 'Bulwark': {
      const shPct = ROLE_SKILL_SCALING.BulwarkShieldPct[rarity] ?? 15;
      return `Bulwark Slam: Strikes the enemy and converts kinetic force into a defensive barrier equal to ${shPct}% Max PV for 2 turns.`;
    }
    case 'Herald': {
      const buff = ROLE_SKILL_SCALING.HeraldDmgBuff[rarity] ?? 10;
      return `Rhythmic Anthem: Grants +1 Energy Pip to the active ally with the lowest energy, and empowers the vanguard's normal strikes by +${buff}% for 1 turn.`;
    }
    case 'Gladiator':
      return `Crowd Favor: Normal attacks grant +1 stack of Crowd Favor (max 3). Each stack ignores DEF and increases critical strike chance. Stacks fuel Coliseum Execution.`;
    case 'Valkyrie':
      return `Aegis Battery: When attacked, this unit CANNOT counterattack. Instead, absorbs 40%-75% of incoming damage into Valhalla Fury, releasing it as flat bonus damage on the next normal attack. Normal attacks remain subject to retaliation.`;
    case 'Priest':
      return `Sacred Grace: Strikes the enemy and restores 5%-15% Max PV to the most wounded living active ally.`;
    case 'Dragoon':
      return `Wyrm Piercer: Thrusts through armor, ignoring 25%-60% of the defender's DEF value.`;
	case 'Inquisitor': {
      const bonusPerBuff = ROLE_SKILL_SCALING.InquisitorBuffBonus[card.rarity] ?? 20;
      return `Anathema Condemnation: Strikes the foe. Deals +${bonusPerBuff}% unmitigated bonus damage for every positive buff or barrier on the target. If the foe has no buffs, applies Guilt for 2 turns (siphons 50% of heals/pips received by target to your vanguard).`;
    }
    case 'Geomancer': {
      const chip = ROLE_SKILL_SCALING.GeomancerTrenchChip[card.rarity] ?? 13;
      const mit = ROLE_SKILL_SCALING.GeomancerCounterMit[card.rarity] ?? 22;
      return `Tectonic Ley-Trench: Strikes the foe and carves a Ley-Trench into their slot for 2 turns. Foes acting from this slot take ${chip}% Max PV earth chip damage and their counterattacks deal ${mit}% less damage.`;
    }
    case 'Mimic': {
      const eff = ROLE_SKILL_SCALING.MimicPotencyPct[card.rarity] ?? 80;
      return `Echo Facsimile: Strikes the defender and copies their role passive for 1 turn (at ${eff}% potency). Mimics become whatever they strike!`;
    }
    case 'Dreadnought': {
      const defPerStack = ROLE_SKILL_SCALING.DreadnoughtDefStack[card.rarity] ?? 10;
      const thorns = ROLE_SKILL_SCALING.DreadnoughtThornsPct[card.rarity] ?? 12;
      return `Heavy Caliber Barrage: Attacks ignore 25% of the target's DEF and build +1 Pressure stack (max 4). Each stack permanently grants +${defPerStack}% DEF and reflects ${thorns}% True Damage when struck.`;
    }
	case 'Maledictor': {
      const cursePct = ROLE_SKILL_SCALING.MaledictorCurse[card.rarity] ?? 36;
      return `Malediction: Normal strikes inflict a stacking Curse for 2 turns, dealing true damage and reducing enemy DEF by ${cursePct}% of the damage dealt.`;
    }
    case 'Sapper': {
      const chance = ROLE_SKILL_SCALING.SapperEmpChance[card.rarity] ?? 50;
      const pipDmg = ROLE_SKILL_SCALING.SapperPipDmg[card.rarity] ?? 50;
      const splash = ROLE_SKILL_SCALING.SapperSplashDmg[card.rarity] ?? 75;
      return `EMP Lockout: Normal attacks have a ${chance}% chance to banish the target from gaining Energy Pips for 1 turn. If it fails, deals +${pipDmg} true damage per Pip held by the target, or splashes ${splash} damage to a neighboring enemy if they hold 0 Pips.`;
    }
    case 'Runesmith': {
      const defVal = ROLE_SKILL_SCALING.RunesmithDef[card.rarity] ?? 8;
      return `Aegis Rune: Normal strikes etch a protective rune onto the most wounded ally, permanently granting +${defVal} DEF for the match.`;
    }
    case 'Revenant': {
      const leechPct = ROLE_SKILL_SCALING.RevenantLeech[card.rarity] ?? 30;
      return `Soul Sunder: Deals heavy damage scaling higher as the Revenant's own PV drops. Heals for ${leechPct}% of damage dealt.`;
    }
    default:
      return `Standard Strike: Solid frontline combatant who delivers reliable offensive output.`;
  }
}

function getRoleChargeDescription(card) {
  switch (card.role) {
    case 'Warrior':
      return `Consumes 3 Pips. Strikes the primary target for +35% amplified damage and cleaves 30% of that damage across all other active enemy frontliners!`;
    case 'Knight':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and fortifies your whole vanguard, granting +35% bonus DEF to all active allies!`;
    case 'Ranger':
      return `Consumes 3 Pips. Rains down an arrow barrage hitting all 3 active enemies for 50% damage each, completely immune to counterattacks!`;
    case 'Mage':
      return `Consumes 3 Pips. Unleashes an arcane breach that ignores 100% of target DEF, dealing amplified damage and inflicting 2 turns of Burn (6% max PV DoT) and Armor Break (-40% DEF)!`;
    case 'Warlock':
      return `Consumes 3 Pips. Strikes for +35% amplified damage, siphons 45% of damage dealt back into PV, and inflicts 2 turns of Bleed (target takes pure damage upon taking action)!`;
    case 'Cleric':
      return `Consumes 3 Pips. Channels sacred grace to restore 25% max PV to all active allies and immediately cleanses all negative status debuffs!`;
    case 'Paladin':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and converts 40% of the damage dealt into team armor split across active allies!`;
    case 'Berserker':
      return `Consumes 3 Pips. Sacrifices 25% current PV to deliver catastrophic wrath dealing +80% devastating uncounterable bonus damage! Bloodlust restores the sacrificed PV if it defeats the target.`;
    case 'Assassin':
      return `Consumes 3 Pips. Broadens execution threshold to 65% PV to deal massive +90% execute damage with zero retaliation chance!`;
    case 'Commander':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and sounds a Battle Cry, granting every other ally +${COMMANDER_ULT_ENERGY} Pips!`;
    case 'Hexer':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and Stuns every enemy champion on the battlefield for ${HEXER_STUN_TURNS} turns!`;
    case 'Thief':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and unleashes chained phantom strikes that hit every other active enemy for 50% of that damage, guaranteed!`;
    case 'Sentinel':
      return `Consumes 3 Pips. Strikes for +35% damage, applies a 1-turn Taunt forcing all enemy attacks onto this unit, and grants +40% bonus DEF.`;
    case 'Spellbreaker':
      return `Consumes 3 Pips. Strikes for +35% damage and severs the opponent's energy, draining 2 Energy Pips from the target and 1 Pip from adjacent foes.`;
    case 'Duelist':
      return `Consumes 3 Pips. Strikes for +35% damage and enters Perfect Parry stance: the next incoming strike aimed at this unit deals 0 damage and triggers an automatic critical counterattack.`;
    case 'Necromancer':
      return `Consumes 3 Pips. Strikes for +35% damage. If the strike eliminates the target, siphons 50% max PV and restores +1 Energy Pip. On death, inflicts Grave Curse (-30% damage) on the killer.`;
    case 'Monk':
      return `Consumes 3 Pips. Strikes for +35% damage and unleashes a Hundred-Fist Cascade, landing 1 bonus strike per active Focus stack (15% damage each).`;
    case 'Alchemist':
      return `Consumes 3 Pips. Strikes for +35% damage and triggers Grand Detonation: detonates all active Burn and Bleed debuffs across all frontline enemies, dealing their total remaining tick damage in one instant burst!`;
    case 'Corsair':
      return `Consumes 3 Pips. Strikes for +35% damage and rolls the Fate Die (1-6): [1-2] Grants allies +15 DEF & Burns foe; [3-4] Deals +60% bonus damage & steals 1 Pip; [5-6 JACKPOT!] Deals +130% massive damage & refunds 2 Pips!`;
    case 'Bard':
      return `Consumes 3 Pips. Strikes for +35% damage, cleanses Stun from all frontline allies, and plays a Grand Crescendo granting active allies +40% bonus damage on their next attack!`;
	case 'Saboteur':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and detonates all enemy traps immediately for 200% burst damage while inflicting Armor Break (-40% DEF) for 2 turns!`;
    case 'Chronomancer':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and creates a Time Warp: grants your team an immediate extra turn! (Control does not pass to the opponent).`;
    case 'Shaman':
      return `Consumes 3 Pips. Restores 20% Max PV to all frontline allies and erects an Ancestral Totem that reduces all counter-attack damage taken by 35% for 2 turns.`;
    case 'Elementalist':
      return `Consumes 3 Pips. Strikes for +35% damage that is guaranteed to deal +25% Elemental Advantage regardless of the enemy's element, and empowers team elemental resonances by 50% for 2 turns!`;  
	case 'Ravager':
      return `Consumes 3 Pips. Launches Executioner's Frenzy against the lowest-PV foe: a 4-hit assault (+20% damage per strike). Eliminating the target grants +1 Pip and Bloodrage (+25% ATK) for 2 turns!`;
    case 'Blight':
      return `Consumes 3 Pips. Unleashes Miasma Field: deals unmitigated true damage to all active enemies and extends the duration of all active negative status effects (Burn, Bleed, Break, Stun) by +1 turn!`;
    case 'Bulwark':
      return `Consumes 3 Pips. Erects Immovable Wall: activates Taunt for 2 turns and intercepts 50% of all damage dealt to active frontline allies!`;
    case 'Herald':
      return `Consumes 3 Pips. Conducts Crescendo of Valor for 2 turns: active allies gain +25% amplified damage scaling and restore 10% of all damage dealt back into PV!`;
	case 'Gladiator':
      return `Consumes 3 Pips. Coliseum Execution: Strikes for massive damage (+25% per Crowd Favor stack). Defeating the target refunds 2 Energy Pips and maximizes Crowd Favor!`;
    case 'Valkyrie':
      return `Consumes 3 Pips. Shield of the Einherjar: Deals an AoE shockwave, forces all enemy attacks onto this unit for 2 turns (Taunt), and boosts DEF by +35%.`;
    case 'Priest':
      return `Consumes 3 Pips. Resurrection Rite: Revives a fallen ally with 25%-60% Max PV. If all allies are alive, casts Divine Ward, saving all active allies from fatal blows.`;
    case 'Dragoon':
      return `Consumes 3 Pips. Dragon Plunge: Crashes down with massive kinetic damage (up to 3.1x), cleaving adjacent enemies for 30% splash damage, then immediately launches into orbit with Celestial Ascent (Airborne: absolute evasion against single-target and AoE attacks for 1 full turn)!`;
	case 'Inquisitor':
      return `Consumes 3 Pips. Strikes for +35% amplified damage and purges all shields and positive enhancements across the entire enemy frontline! Each purged buff applies 1 stack of Torment (5% Max PV true damage per turn).`;
    case 'Geomancer':
      return `Consumes 3 Pips. Seismic Faultline Collapse: Deals +35% amplified damage to the primary target and collapses enemy lines: forces left and right targets to swap positions, drains 1 Pip from both, and applies Faultline Stagger (40% counterattack miss chance for 2 turns)!`;
    case 'Mimic':
      return `Consumes 3 Pips. Mirror Metamorphosis: Strikes for +35% amplified damage and duplicates the Ultimate skill effect of the strongest active vanguard ally on the field!`;
    case 'Dreadnought':
      return `Consumes 3 Pips. Super-Dreadnought Battery Salvo: Consumes all Pressure stacks to deliver massive artillery damage (+35% base + 20% per consumed stack). If fired at 4 stacks, deals 50% splash damage across all other frontliners and inflicts Stun for 1 turn!`;
	case 'Maledictor':
      return `Consumes 3 Pips. Pandemonium Hex: Unleashes a wave of dark energy across the enemy frontline, amplifying all active curses and extending their duration by +2 turns!`;
    case 'Sapper':
      return `Consumes 3 Pips. Grid Lockdown: Deploys an electromagnetic barrier across the entire enemy vanguard, locking all energy gains and preventing charge skills for 1 turn!`;
    case 'Runesmith':
      return `Consumes 3 Pips. Runic Resonance: Cleanses all debuffs from allies and erects a 2-turn elemental shield equal to 20% of their Max PV!`;
    case 'Revenant':
      return `Consumes 3 Pips. Undying Vengeance: Enters a spectral state for 2 turns where PV cannot drop below 1. All damage taken is stored and unleashed as an explosive burst wave upon expiration!`;
    default:
      return `Consumes 3 Pips. Strikes the target for +35% amplified damage!`;
  }
}

function openCardModal(regIdx) {
  const card = CARD_REGISTRY[regIdx];
  if (!card) return;
  const base = getCardBaseData(card.id);
  const owned = playerState.ownedCards.find(o => o.cardId === card.id);
  const isEquipped = playerState.equippedDeckIds.includes(card.id);
  const elem = ELEMENT_CONFIG[card.element] || ELEMENT_CONFIG.Fire;
  const upgradeCost = card.rubyUpgrade !== undefined ? card.rubyUpgrade : getCardUpgradeCost(card.id);

  // --- NEW: LORE BOOK REWARD LOGIC ---
  playerState.loreUnlocked = playerState.loreUnlocked || [];
  let isFirstRead = false;
  if (owned && !playerState.loreUnlocked.includes(card.id)) {
    playerState.loreUnlocked.push(card.id);
    playerState.rubies += 10;
    isFirstRead = true;
    if (typeof updateTopCurrencyUI === 'function') updateTopCurrencyUI();
    if (typeof scheduleSave === 'function') scheduleSave();
    if (typeof playSound === 'function') playSound('coin');
  }
  // -----------------------------------

  const modalBody = document.getElementById('card-modal-body');
  const modalName = document.getElementById('card-modal-name');
  const modalSkill = document.getElementById('card-modal-skill');
  const modalCharge = document.getElementById('card-modal-charge-skill');
  const modalFlavor = document.getElementById('card-modal-flavor');
  const modalRole = document.getElementById('card-modal-role-rarity');
  const modalSkillDesc = document.getElementById('card-modal-skill-desc');
  const modalChargeDesc = document.getElementById('card-modal-charge-desc');
  const modalActions = document.getElementById('card-modal-actions');

  if (modalBody) modalBody.innerHTML = renderCardHTML(card, { hideLabel: true });
  if (modalName) modalName.innerText = card.name;
  if (modalSkill) modalSkill.innerText = `⚔️ Normal: ${card.skillName}`;
  if (modalCharge) modalCharge.innerText = `⚡ Ultimate: ${card.chargeSkillName}`;
  
  if (modalFlavor) {
    modalFlavor.innerHTML = `"${base.flavor || ''}"`;
    // Inject the reward banner if they just earned it
    if (isFirstRead) {
      modalFlavor.innerHTML += `<br><br><span class="inline-block bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg animate-pulse">✨ First-time Lore Bonus: +10 Rubies!</span>`;
    }
  }

  if (modalRole) {
    const extras = [];
    if (card.isRainbow) extras.push('🌈 Rainbow');
    if (card.awakened) extras.push('★ Awakened');
    else if (card.enlightenment > 0) extras.push(`✦ E${card.enlightenment}`);

    const extrasText = extras.length ? ` • ${extras.join(' ')}` : '';
    modalRole.innerText = `${elem.icon} ${card.element} • ${card.role} • ${card.rarity}${extrasText}`;
  }
  if (modalSkillDesc) modalSkillDesc.innerText = getRoleSkillDescription(card);
  if (modalChargeDesc) modalChargeDesc.innerText = getRoleChargeDescription(card);

  if (modalActions) {
    if (owned) {
      let html = '';
      html += isEquipped
        ? `<span class="block text-xs text-center font-bold text-indigo-400 py-2 bg-indigo-950/40 rounded-xl">Equipped in Deck</span>`
        : `<button onclick="equipCardToDeck('${card.id}'); openCardModalFor('${card.id}');" class="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition">Equip to Deck</button>`;

      html += `<button onclick="openSigilSocketModal('${card.id}')" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/40 shadow transition flex items-center justify-center gap-1.5 active:scale-95">
                 <span>🔮</span> <span>Aetherial Sockets (Sigils)</span>
               </button>`;

      html += !owned.isRainbow
        ? `<button onclick="upgradeToRainbow('${card.id}'); openCardModalFor('${card.id}', true);" class="w-full py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs transition flex items-center justify-center gap-1">
             <span>Upgrade to Rainbow</span><span class="text-rose-200">💎 ${upgradeCost}</span>
           </button><p class="text-[10px] text-center text-slate-500 mt-1.5">Rainbow cards unlock Enlightenment &amp; Awakening.</p>`
        : renderAwakeningPanelHTML(owned);
      modalActions.innerHTML = html;
    } else {
      modalActions.innerHTML = `
        <div class="flex flex-col gap-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
          <span class="text-xs font-bold text-slate-300">🔒 Not Yet Owned</span>
          <span class="text-[11px] text-slate-500">Pull this card in Celestial Packs Gacha to add it to your battle deck!</span>
          <button onclick="closeCardModal(); switchTab('gacha');" class="mt-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
            Go to Packs Gacha →
          </button>
        </div>
      `;
    }
  }

  const modalEl = document.getElementById('card-detail-modal');
  if (modalEl) modalEl.classList.remove('hidden');
}

function closeCardModal() {
  const modalEl = document.getElementById('card-detail-modal');
  if (modalEl) modalEl.classList.add('hidden');
}

function renderCombatField() {
  const enemyContainer = document.getElementById('enemy-field-slots');
  const allyContainer = document.getElementById('player-field-slots');
  if (!enemyContainer || !allyContainer) return;

  let enemyPvSum = 0;
  let allyPvSum = 0;

  enemyContainer.innerHTML = battleEngine.enemyField.map((card, idx) => {
    if (card) enemyPvSum += Math.max(0, card.pv);
    const html = renderCardHTML(card, {
      isTargetable: battleEngine.turn === 'player' && battleEngine.selectedAllySlot !== null,
      onClick: `selectEnemyTarget(${idx})`
    });
    return `<div id="enemy-card-${idx}" onmouseenter="showTargetForecast(${idx})" onmouseleave="hideTargetForecast()" class="relative">${html}</div>`;
  }).join('');

  allyContainer.innerHTML = battleEngine.playerField.map((card, idx) => {
    if (card) allyPvSum += Math.max(0, card.pv);
    const html = renderCardHTML(card, {
      isSelected: battleEngine.selectedAllySlot === idx,
      onClick: `selectAllyForAttack(${idx})`
    });
    return `<div id="player-card-${idx}" class="relative">${html}</div>`;
  }).join('');

  renderArenaEnemyLoadout();
  renderArenaSummonSlot();

  const enemySummary = document.getElementById('enemy-field-summary');
  const playerSummary = document.getElementById('player-field-summary');
  if (enemySummary) enemySummary.innerText = `Total Enemy PV: ${enemyPvSum}`;
  if (playerSummary) playerSummary.innerText = `Total Ally PV: ${allyPvSum}`;
  updateTurnStatusUI();
}

function renderArenaEnemyLoadout() {
  let container = document.getElementById('arena-enemy-loadout-container');
  if (!container) {
    const enemySlots = document.getElementById('enemy-field-slots');
    if (!enemySlots) return;
    container = document.createElement('div');
    container.id = 'arena-enemy-loadout-container';
    container.className = 'mb-3 max-w-4xl mx-auto';
    enemySlots.parentNode.insertBefore(container, enemySlots);
  }

  const enemySummon = battleEngine.enemyArenaSummon;
  const enemyRelics = (typeof getEquippedRelics === 'function') ? getEquippedRelics('enemy') : [];

  let summonHTML = '';
  if (enemySummon) {
    const isReady = enemySummon.lockoutTurns <= 0 && !enemySummon.used;
    summonHTML = `
      <div class="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-purple-500/30 shadow-sm shrink-0">
        <img src="${enemySummon.image}" onerror="this.src='https://placehold.co/80x80/1e1b4b/c084fc?text=Summon'" class="w-7 h-7 rounded-lg object-cover border border-purple-500/40">
        <div class="overflow-hidden">
          <div class="flex items-center gap-1">
            <span class="font-cinzel text-[11px] font-bold text-purple-200 truncate">${escapeHtml(enemySummon.name)}</span>
            <span class="text-[8px] uppercase px-1 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">${enemySummon.element}</span>
          </div>
          <span class="text-[9px] text-slate-400 block font-mono">
            ${enemySummon.used ? 'Call Expended' : enemySummon.lockoutTurns > 0 ? `Lock: ${enemySummon.lockoutTurns}T` : '<span class="text-rose-400 font-bold animate-pulse">Call Primed</span>'}
          </span>
        </div>
      </div>
    `;
  } else {
    summonHTML = `
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-500">
        <span>🔮</span> <span>No Summon</span>
      </div>
    `;
  }

  let relicsHTML = '';
  if (enemyRelics.length > 0) {
    relicsHTML = `
      <div class="flex flex-wrap items-center gap-1.5">
        ${enemyRelics.map(r => {
          const cfg = (typeof RELIC_RARITY_CONFIG !== 'undefined' && RELIC_RARITY_CONFIG[r.rarity]) || { badgeBg: 'bg-slate-900', text: 'text-slate-300', border: 'border-slate-700' };
          return `
            <div class="group relative flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-950/80 border ${cfg.border} shadow-sm text-xs cursor-help" title="${escapeHtml(r.name)}: ${escapeHtml(r.description)}">
              <span class="text-sm">${r.icon}</span>
              <span class="font-cinzel text-[10px] font-bold ${cfg.text} max-w-[110px] truncate">${escapeHtml(r.name)}</span>
              <span class="text-[8px] uppercase px-1 py-0.2 rounded ${cfg.badgeBg} ${cfg.text} font-black">${r.rarity.slice(0, 3)}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    relicsHTML = `
      <div class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-500 italic">
        <span>🏺</span> <span>No Relics Armed</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="bg-slate-900/70 p-2 rounded-2xl border border-rose-900/40 flex flex-wrap items-center justify-between gap-2 shadow-inner text-xs">
      <div class="flex items-center gap-1.5">
        <span class="text-[9px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-lg border border-rose-800/40">Opponent Tactical Loadout</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        ${summonHTML}
        ${relicsHTML}
      </div>
    </div>
  `;
}

function renderArenaSummonSlot() {
  const container = document.getElementById('arena-summon-slot-container');
  if (!container) return;

  const summon = battleEngine.arenaSummon;

  // Resolve player relics across general Arena, Coliseum, and Sandbox
  let playerRelics = [];
  if (typeof getEquippedRelics === 'function') {
    playerRelics = getEquippedRelics('player');
  } else if (typeof battleEngine !== 'undefined' && Array.isArray(battleEngine.playerRelicIds) && battleEngine.playerRelicIds.length > 0) {
    playerRelics = battleEngine.playerRelicIds.map(id => (typeof getRelicBaseData === 'function' ? getRelicBaseData(id) : null)).filter(Boolean);
  } else if (typeof playerState !== 'undefined' && Array.isArray(playerState.equippedRelicIds)) {
    playerRelics = playerState.equippedRelicIds.map(id => (typeof getRelicBaseData === 'function' ? getRelicBaseData(id) : null)).filter(Boolean);
  }

  // 1. Summon Section HTML (never returns early so relics always render)
  let summonSectionHTML = '';
  if (!summon) {
    summonSectionHTML = `
      <div class="flex items-center gap-2 text-xs text-slate-500 py-1">
        <span>🔮</span>
        <span>No Summon Equipped (Set in <b>Deck &gt; Primal Summon Grid</b>)</span>
      </div>`;
  } else {
    const isReady = summon.lockoutTurns <= 0 && !summon.used;
    const canInvoke = isReady && battleEngine.turn === 'player' && !battleEngine.isResolving;

    summonSectionHTML = `
      <div class="flex items-center gap-3">
        <img src="${summon.image}" onerror="this.src='https://placehold.co/100x100/1e1b4b/c084fc?text=Summon'" class="w-10 h-10 rounded-xl object-cover border border-purple-500/40 cursor-pointer" onclick="if(typeof openSummonModal==='function') openSummonModal('${summon.id}')">
        <div>
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-bold text-purple-200">${escapeHtml(summon.name)}</span>
            <span class="text-[9px] uppercase px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">${summon.element}</span>
          </div>
          <span class="text-[10px] text-slate-400 block">${escapeHtml(summon.callName || 'Tactical Call')}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        ${summon.used
          ? `<span class="text-xs font-bold text-slate-500 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Call Expended</span>`
          : summon.lockoutTurns > 0
            ? `<span class="text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl">Lockout: ${summon.lockoutTurns}T</span>`
            : `<button onclick="invokeArenaSummon()" ${canInvoke ? '' : 'disabled'} class="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 disabled:pointer-events-none text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition active:scale-95">🔮 Invoke Call</button>`
        }
      </div>
    `;
  }

  let relicsSectionHTML = '';
  if (playerRelics.length > 0) {
    relicsSectionHTML = `
      <div class="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
        <span class="text-[9px] font-black uppercase tracking-wider text-amber-400 hidden lg:inline">Relics:</span>
        <div class="flex flex-wrap items-center gap-1.5">
          ${playerRelics.map(r => {
            const cfg = (typeof RELIC_RARITY_CONFIG !== 'undefined' && RELIC_RARITY_CONFIG[r.rarity]) || { badgeBg: 'bg-slate-900', text: 'text-amber-300', border: 'border-amber-500/50' };
            return `
              <div onclick="if(typeof openRelicDetailModal==='function') openRelicDetailModal('${r.id}')" class="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border ${cfg.border} hover:border-amber-400 transition shadow-sm text-xs" title="${escapeHtml(r.name)}: ${escapeHtml(r.description)} (Tap to Inspect)">
                <span class="text-sm">${r.icon}</span>
                <span class="font-cinzel text-[10px] font-bold text-slate-200 max-w-[100px] truncate">${escapeHtml(r.name)}</span>
                <span class="text-[8px] uppercase px-1 py-0.2 rounded ${cfg.badgeBg} ${cfg.text} font-black">${r.rarity.slice(0, 3)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } else {
    relicsSectionHTML = `
      <div class="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3 text-[10px] text-slate-500 italic">
        <span>🏺</span>
        <span>No Relics Equipped (Arm in <button onclick="switchTab('relics')" class="underline text-amber-400 font-semibold">Relics</button> tab)</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3 w-full">
      <div class="flex items-center justify-between gap-3 flex-1 min-w-[200px]">
        ${summonSectionHTML}
      </div>
      ${relicsSectionHTML}
    </div>
  `;
}

const matchCombatStats = {
  activeMode: 'arena', // 'arena', 'showdown', 'spire'
  filterTab: 'all',    // 'all', 'player', 'enemy'
  units: {}            // Keyed by card unique key -> stats
};

function initCombatStatsTracker(mode = 'arena') {
  matchCombatStats.activeMode = mode;
  matchCombatStats.filterTab = 'all';
  matchCombatStats.units = {};
}

function getStatUnitKey(unit, isPlayer) {
  if (!unit) return null;
  const prefix = isPlayer ? 'p_' : 'e_';
  return prefix + (unit.id || unit.name || 'unknown');
}

function registerCombatStatUnit(unit, isPlayer) {
  if (!unit) return;
  const key = getStatUnitKey(unit, isPlayer);
  if (!matchCombatStats.units[key]) {
    matchCombatStats.units[key] = {
      key,
      id: unit.id || 'unit',
      name: unit.name || 'Champion',
      role: unit.role || 'Warrior',
      element: unit.element || 'Fire',
      image: unit.image || unit.avatar || 'https://placehold.co/100x100/1e293b/94a3b8?text=Unit',
      isPlayer: !!isPlayer,
      damageDealt: 0,
      damageTaken: 0,
      healingDone: 0
    };
  }
}

function recordCombatStat(unit, statType, amount, isPlayer = true) {
  if (!unit || !statType || amount <= 0) return;
  registerCombatStatUnit(unit, isPlayer);
  const key = getStatUnitKey(unit, isPlayer);
  if (matchCombatStats.units[key] && matchCombatStats.units[key][statType] !== undefined) {
    matchCombatStats.units[key][statType] += Math.round(amount);
  }
}

function openCombatStatsModal() {
  const modal = document.getElementById('combat-stats-modal');
  if (!modal) return;
  renderCombatStatsModal();
  modal.classList.remove('hidden');
}

function closeCombatStatsModal() {
  const modal = document.getElementById('combat-stats-modal');
  if (modal) modal.classList.add('hidden');
}

function setCombatStatsFilter(tab) {
  matchCombatStats.filterTab = tab;
  renderCombatStatsModal();
}

function renderCombatStatsModal() {
  const body = document.getElementById('combat-stats-table-body');
  const mvpBox = document.getElementById('combat-stats-mvp-summary');
  const modeBadge = document.getElementById('combat-stats-mode-badge');
  if (!body) return;

  const mode = matchCombatStats.activeMode;
  if (modeBadge) {
    modeBadge.innerText = mode === 'showdown' 
      ? '💀 Showdown Boss Raid' 
      : mode === 'spire' 
        ? '🏰 Abyssal Spire' 
        : '⚔️ 3v3 Arena Skirmish';
  }

  const allUnits = Object.values(matchCombatStats.units);

  let topDps = { unit: null, val: 0 };
  let topTank = { unit: null, val: 0 };
  let topHeal = { unit: null, val: 0 };

  allUnits.forEach(u => {
    if (u.damageDealt > topDps.val) topDps = { unit: u, val: u.damageDealt };
    if (u.damageTaken > topTank.val) topTank = { unit: u, val: u.damageTaken };
    if (u.healingDone > topHeal.val) topHeal = { unit: u, val: u.healingDone };
  });

  const maxDmg = Math.max(1, topDps.val);
  const maxTaken = Math.max(1, topTank.val);
  const maxHeal = Math.max(1, topHeal.val);

  if (mvpBox) {
    mvpBox.innerHTML = `
      <div class="bg-slate-950/80 p-3 rounded-2xl border border-rose-500/40 flex items-center gap-3">
        <span class="text-2xl">⚔️</span>
        <div class="overflow-hidden">
          <span class="text-[9px] font-black uppercase tracking-wider text-rose-400 block">Top Damage Dealer</span>
          <div class="font-cinzel text-xs font-bold text-slate-100 truncate">${topDps.unit ? escapeHtml(topDps.unit.name) : 'None'}</div>
          <span class="text-[10px] font-mono font-bold text-rose-300">${topDps.val.toLocaleString()} DMG</span>
        </div>
      </div>
      <div class="bg-slate-950/80 p-3 rounded-2xl border border-cyan-500/40 flex items-center gap-3">
        <span class="text-2xl">🛡️</span>
        <div class="overflow-hidden">
          <span class="text-[9px] font-black uppercase tracking-wider text-cyan-400 block">Damage Absorbed (Tank)</span>
          <div class="font-cinzel text-xs font-bold text-slate-100 truncate">${topTank.unit ? escapeHtml(topTank.unit.name) : 'None'}</div>
          <span class="text-[10px] font-mono font-bold text-cyan-300">${topTank.val.toLocaleString()} Taken</span>
        </div>
      </div>
      <div class="bg-slate-950/80 p-3 rounded-2xl border border-emerald-500/40 flex items-center gap-3">
        <span class="text-2xl">💚</span>
        <div class="overflow-hidden">
          <span class="text-[9px] font-black uppercase tracking-wider text-emerald-400 block">Recovery Champion</span>
          <div class="font-cinzel text-xs font-bold text-slate-100 truncate">${topHeal.unit && topHeal.val > 0 ? escapeHtml(topHeal.unit.name) : 'None'}</div>
          <span class="text-[10px] font-mono font-bold text-emerald-300">${topHeal.val > 0 ? topHeal.val.toLocaleString() + ' PV Healed' : '0 PV'}</span>
        </div>
      </div>
    `;
  }

  const filtered = allUnits.filter(u => {
    if (matchCombatStats.filterTab === 'player') return u.isPlayer;
    if (matchCombatStats.filterTab === 'enemy') return !u.isPlayer;
    return true;
  });

  filtered.sort((a, b) => (b.isPlayer - a.isPlayer) || (b.damageDealt - a.damageDealt));

  if (filtered.length === 0) {
    body.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-xs text-slate-500 italic">No combat interactions recorded for this view.</td></tr>`;
    return;
  }

  body.innerHTML = filtered.map(u => {
    const dmgPct = Math.round((u.damageDealt / maxDmg) * 100);
    const takenPct = Math.round((u.damageTaken / maxTaken) * 100);
    const healPct = maxHeal > 1 ? Math.round((u.healingDone / maxHeal) * 100) : 0;
    const isMvp = topDps.unit && topDps.unit.key === u.key;

    return `
      <tr class="hover:bg-slate-950/40 border-b border-slate-800/60 transition">
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-2.5">
            <div class="relative shrink-0">
              <img src="${u.image}" onerror="this.src='https://placehold.co/80x80/1e293b/94a3b8?text=Unit'" class="w-9 h-9 rounded-xl object-cover border ${u.isPlayer ? 'border-indigo-500/40' : 'border-rose-500/40'}">
              ${isMvp ? '<span class="absolute -top-1.5 -right-1 text-xs">👑</span>' : ''}
            </div>
            <div class="overflow-hidden">
              <div class="flex items-center gap-1.5">
                <span class="font-cinzel text-xs font-bold text-slate-100 truncate">${escapeHtml(u.name)}</span>
                <span class="text-[8px] font-black uppercase px-1 py-0.2 rounded ${u.isPlayer ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}">
                  ${u.isPlayer ? 'Squad' : 'Foe'}
                </span>
              </div>
              <span class="text-[10px] text-slate-400 block">${u.element} · ${u.role}</span>
            </div>
          </div>
        </td>

        <td class="py-2.5 px-3 min-w-[140px]">
          <div class="flex items-center justify-between text-[11px] font-mono font-bold text-rose-400 mb-1">
            <span>${u.damageDealt.toLocaleString()}</span>
            <span class="text-[9px] text-slate-500 font-sans">${dmgPct}%</span>
          </div>
          <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-gradient-to-r from-rose-600 to-amber-500 h-full rounded-full transition-all duration-300" style="width:${dmgPct}%"></div>
          </div>
        </td>

        <td class="py-2.5 px-3 min-w-[140px]">
          <div class="flex items-center justify-between text-[11px] font-mono font-bold text-cyan-400 mb-1">
            <span>${u.damageTaken.toLocaleString()}</span>
            <span class="text-[9px] text-slate-500 font-sans">${takenPct}%</span>
          </div>
          <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-gradient-to-r from-cyan-600 to-teal-400 h-full rounded-full transition-all duration-300" style="width:${takenPct}%"></div>
          </div>
        </td>

        <td class="py-2.5 px-3 min-w-[140px]">
          <div class="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-400 mb-1">
            <span>${u.healingDone > 0 ? u.healingDone.toLocaleString() : '—'}</span>
            ${u.healingDone > 0 ? `<span class="text-[9px] text-slate-500 font-sans">${healPct}%</span>` : ''}
          </div>
          <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-gradient-to-r from-emerald-600 to-green-400 h-full rounded-full transition-all duration-300" style="width:${healPct}%"></div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function invokeArenaSummon() {
  const summon = battleEngine.arenaSummon;
  if (!summon || summon.used || summon.lockoutTurns > 0 || battleEngine.turn !== 'player' || battleEngine.isResolving) return;

  battleEngine.isResolving = true;
  summon.used = true;
  playSound('charge');

  logBattleEvent(`🔮 <b>TACTICAL INVOCATION!</b> Summoned <b>${summon.name}</b> [${summon.callName}]!`);
  if (typeof executeSummonCallEffects === 'function') {
    executeSummonCallEffects(summon, 'player', false);
  }

  // --- NEW: Process Deaths from Summon Damage ---
  let enemyDied = false;
  battleEngine.enemyField.forEach((enemy, idx) => {
    if (enemy && enemy.pv <= 0) {
      logBattleEvent(`💀 <span class="text-rose-400 font-bold">${enemy.name}</span> was obliterated by the summon!`);
      if (typeof triggerSoulHarvest === 'function') triggerSoulHarvest(enemy);
      enemyDied = true;
    }
  });

  // Pull reinforcements immediately if a frontline slot was emptied
  if (enemyDied) {
    handleReinforcements('enemy');
    updateReserveDots();
  }

  renderCombatField();
  
  setTimeout(() => {
    // Check if the summon completely wiped the remaining team
    if (!isSideAlive('enemy')) {
      handleMatchOver(true);
    } else {
      battleEngine.isResolving = false;
      renderCombatField();
    }
  }, getCombatDelay(700, battleEngine.matchMode));
}

function renderBattleResonancesBar() {
  const container = document.getElementById('battle-resonances-bar');
  if (!container) return;
  const resonances = getActiveResonances(playerState.equippedDeckIds);

  if (resonances.length === 0) {
    container.innerHTML = `<span class="text-[10px] text-slate-500 italic">No Elemental Resonances Active (Equip 2+ of matching element)</span>`;
    return;
  }

  container.innerHTML = resonances.map(res => `
    <span class="px-2 py-0.5 rounded-full border text-[10px] font-bold shadow ${res.badgeClass}" title="${res.desc}">
      ${res.icon} ${res.name} (${res.count})
    </span>
  `).join('');
}

function updateReserveDots() {
  const enemyDots = document.getElementById('enemy-bench-dots');
  const allyDots = document.getElementById('player-bench-dots');
  if (!enemyDots || !allyDots) return;

  enemyDots.innerHTML = [0, 1, 2].map(i => `
    <span class="w-3 h-3 rounded-full ${i < battleEngine.enemyReserve.length ? 'bg-rose-500 shadow-md shadow-rose-500/50' : 'bg-slate-800'}"></span>
  `).join('');

  allyDots.innerHTML = [0, 1, 2].map(i => `
    <span class="w-2.5 h-2.5 rounded-full ${i < battleEngine.playerReserve.length ? 'bg-emerald-500 shadow-md shadow-emerald-500/50' : 'bg-slate-800'}"></span>
  `).join('');
}

function updateTurnStatusUI() {
  const badge = document.getElementById('turn-badge');
  const msg = document.getElementById('battle-status-msg');
  if (!badge || !msg) return;

  if (battleEngine.turn === 'player') {
    badge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow shadow-indigo-600/50";
    badge.innerText = "Your Turn";
    msg.innerText = battleEngine.selectedAllySlot !== null 
      ? `Selected vanguard ready! Choose an enemy target to attack.` 
      : "Click one of your 3 vanguard cards to prepare attack.";
  } else {
    badge.className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow shadow-rose-600/50";
    badge.innerText = "Enemy Turn";
    msg.innerText = "Opponent is preparing offensive strike...";
  }
}

// Alias used by the Maledictor / Runesmith / Revenant role code (was previously undefined -> ReferenceError mid-attack)
function showText(side, slot, text, cls) {
  showFloatingText(side, slot, text, cls);
}

function showFloatingText(side, slotIndex, text, colorClass) {
  const overlay = document.getElementById('combat-fx-overlay');
  const cardEl = document.getElementById(`${side}-card-${slotIndex}`);
  if (!cardEl || !overlay) return;

  const rect = cardEl.getBoundingClientRect();
  const parentRect = overlay.getBoundingClientRect();

  const floatEl = document.createElement('div');
  floatEl.className = `absolute z-40 font-black text-sm sm:text-base drop-shadow-md pointer-events-none floating-text ${colorClass}`;
  floatEl.style.left = `${(rect.left - parentRect.left) + (rect.width / 2) - 30}px`;
  floatEl.style.top = `${(rect.top - parentRect.top) + (rect.height / 2)}px`;
  floatEl.innerText = text;

  overlay.appendChild(floatEl);
  setTimeout(() => floatEl.remove(), 1300);
}

function renderDeckBuilderUI() {
  const equippedContainer = document.getElementById('equipped-deck-grid');
  const vaultContainer = document.getElementById('vault-card-grid');
  if (!equippedContainer || !vaultContainer) return;

  equippedContainer.innerHTML = [0, 1, 2, 3, 4, 5].map(slotIdx => {
    const cardId = playerState.equippedDeckIds[slotIdx];
    if (!cardId) {
      return `<div class="aspect-[3/4.2] rounded-2xl border-2 border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-600 font-bold">SLOT ${slotIdx + 1}</div>`;
    }
    const owned = playerState.ownedCards.find(o => o.cardId === cardId);
    const stats = calculateCardStats(cardId, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
    return `
      <div class="relative group">
        ${renderCardHTML(stats)}
        <button onclick="unequipCardSlot(${slotIdx})" class="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-lg hover:bg-rose-500 z-20" title="Unequip">✕</button>
      </div>
    `;
  }).join('');

  const filteredOwned = getCardViewEntries('vault').map(e => e.owned);
  updateCardViewCount('vault', filteredOwned.length, playerState.ownedCards.length);

  vaultContainer.innerHTML = filteredOwned.length === 0 ? cardViewEmptyHTML('vault') : filteredOwned.map((item) => {
    const card = getCardBaseData(item.cardId);
    const stats = calculateCardStats(item.cardId, item.isRainbow, item.level, item);
    const isEquipped = playerState.equippedDeckIds.includes(item.cardId);
    const upgradeCost = stats.rubyUpgrade !== undefined ? stats.rubyUpgrade : getCardUpgradeCost(item.cardId);

    return `
      <div class="flex flex-col gap-1.5 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        ${renderCardHTML(stats)}
        
        <div class="flex flex-col gap-1 mt-1 text-xs">
          ${isEquipped 
            ? `<span class="text-[10px] text-center font-bold text-indigo-400 py-1 bg-indigo-950/40 rounded-lg">Equipped in Deck</span>`
            : `<button onclick="equipCardToDeck('${item.cardId}')" class="w-full py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition">Equip to Deck</button>`
          }

          ${!item.isRainbow 
            ? `<button onclick="upgradeToRainbow('${item.cardId}')" class="w-full py-1 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-[10px] transition flex items-center justify-center gap-1">
                <span>Rainbow</span>
                <span class="text-rose-200">💎 ${upgradeCost}</span>
               </button>`
            : `<button onclick="openCardModalFor('${item.cardId}', true)" class="w-full py-1 rounded-lg text-[10px] font-bold transition ${item.awakened ? 'bg-amber-950/50 text-amber-300 border border-amber-500/40' : 'bg-cyan-950/50 text-cyan-300 border border-cyan-700/40 hover:bg-cyan-900/50'}">${item.awakened ? '★ Awakened' : `✦ Enlighten E${item.enlightenment || 0}/${MAX_ENLIGHTENMENT} · 🃏${item.copies || 0}`}</button>`
          }
        </div>
      </div>
    `;
  }).join('');

  const totalCp = calculateTeamPower(playerState.equippedDeckIds);
  const deckPower = document.getElementById('deck-power-display');
  const headerPower = document.getElementById('header-team-power');
  if (deckPower) deckPower.innerText = `${totalCp} CP`;
  if (headerPower) headerPower.innerText = `Team CP: ${totalCp}`;

  const resonanceContainer = document.getElementById('deck-resonance-pills');
  if (resonanceContainer) {
    const resonances = getActiveResonances(playerState.equippedDeckIds);
    if (resonances.length === 0) {
      resonanceContainer.innerHTML = `<span class="text-slate-500 text-[10px]">No Resonances Active (Pair 2+ of same element)</span>`;
    } else {
      resonanceContainer.innerHTML = resonances.map(r => `
        <span class="px-2 py-0.5 rounded-full border text-[10px] font-bold ${r.badgeClass}" title="${r.desc}">
          ${r.icon} ${r.name}
        </span>
      `).join('');
    }
  }

  renderDeckPresetsUI();
  renderHomeUI();
}

function equipCardToDeck(cardId) {
  if (playerState.equippedDeckIds.length >= 6) return;
  if (!playerState.equippedDeckIds.includes(cardId)) {
    playerState.equippedDeckIds.push(cardId);
    renderDeckBuilderUI();
  }
}

function unequipCardSlot(slotIndex) {
  if (playerState.equippedDeckIds.length <= 1) return;
  playerState.equippedDeckIds.splice(slotIndex, 1);
  renderDeckBuilderUI();
}

function autoFillDeck() {
  const sorted = [...playerState.ownedCards].sort((a, b) => {
    return getCardCombatPower(b.cardId, b.isRainbow, b.level, b) - getCardCombatPower(a.cardId, a.isRainbow, a.level, a);
  });
  playerState.equippedDeckIds = sorted.slice(0, 6).map(c => c.cardId);
  renderDeckBuilderUI();
}

function upgradeToRainbow(cardId) {
  const owned = playerState.ownedCards.find(o => o.cardId === cardId);
  if (!owned || owned.isRainbow) return;

  const cost = getCardUpgradeCost(cardId);
  if (playerState.rubies < cost) return;

  playerState.rubies -= cost;
  owned.isRainbow = true;
  playSound('rainbow');
  updateTopCurrencyUI();
  renderDeckBuilderUI();
}

function renderSummonLoadoutUI() {
  if (typeof SUMMON_DATABASE === 'undefined') return;
  const countEl = document.getElementById('summon-vault-count-display');
  if (countEl) countEl.innerText = `${playerState.ownedSummons.length} / ${SUMMON_DATABASE.length}`;

  const arenaSlot = document.getElementById('arena-equipped-summon-slot');
  if (arenaSlot) {
    const equippedId = playerState.equippedSummonId;
    const summon = equippedId ? getSummonBaseData(equippedId) : null;
    if (summon) {
      const auraDesc = getSummonAuraDescription(summon);
      arenaSlot.innerHTML = `
        <div class="flex items-center justify-between gap-3 bg-slate-950 p-2.5 rounded-xl border border-purple-500/40">
          <div class="flex items-center gap-3 cursor-pointer" onclick="openSummonModal('${summon.id}')">
            <img src="${summon.image}" onerror="this.src='https://placehold.co/100x100/1e1b4b/c084fc?text=Summon'" class="w-12 h-12 rounded-xl object-cover border border-purple-400/50">
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-cinzel font-bold text-sm text-purple-200">${escapeHtml(summon.name)}</span>
                <span class="text-[9px] uppercase px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 font-bold border border-purple-800">${summon.element}</span>
              </div>
              <p class="text-[10px] text-amber-300 font-medium">${auraDesc.mainText}</p>
            </div>
          </div>
          <button onclick="playerState.equippedSummonId=null; renderSummonLoadoutUI();" class="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 bg-slate-800 rounded-lg">Unequip</button>
        </div>`;
    } else {
      arenaSlot.innerHTML = `<p class="text-xs text-slate-500 italic text-center py-3">No Arena Summon equipped. Tap an owned summon below to equip.</p>`;
    }
  }

  const showdownGrid = document.getElementById('showdown-equipped-summon-grid');
  if (showdownGrid) {
    showdownGrid.innerHTML = [0, 1, 2].map(slotIdx => {
      const sid = playerState.showdownSummonGrid[slotIdx];
      const summon = sid ? getSummonBaseData(sid) : null;
      const isMain = slotIdx === 0;

      if (summon) {
        return `
          <div class="relative bg-slate-950 p-2 rounded-xl border ${isMain ? 'border-purple-500/50' : 'border-slate-800'} flex flex-col items-center text-center">
            <span class="text-[9px] font-black uppercase tracking-wider mb-1 ${isMain ? 'text-amber-400' : 'text-slate-400'}">${isMain ? 'Main Summon' : `Sub-Summon ${slotIdx}`}</span>
            <img onclick="openSummonModal('${summon.id}')" src="${summon.image}" onerror="this.src='https://placehold.co/100x100/1e1b4b/c084fc?text=Summon'" class="w-14 h-14 rounded-xl object-cover cursor-pointer hover:scale-105 transition mb-1 border border-purple-900/50">
            <span class="font-cinzel text-xs font-bold text-slate-200 truncate w-full">${escapeHtml(summon.name)}</span>
            <button onclick="unequipSummonFromShowdown(${slotIdx})" class="mt-1 text-[10px] text-rose-400 hover:underline">Unequip</button>
          </div>`;
      }
      return `
        <div class="p-3 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center min-h-[110px]">
          <span class="text-[10px] font-bold text-slate-600 uppercase">${isMain ? 'Main (Turn 1 Ready)' : `Sub-Slot ${slotIdx}`}</span>
          <span class="text-xs text-slate-600 mt-1">Empty</span>
        </div>`;
    }).join('');
  }

  const vaultGrid = document.getElementById('summon-vault-grid');
  if (vaultGrid) {
    vaultGrid.innerHTML = playerState.ownedSummons.map(owned => {
      const summon = getSummonBaseData(owned.summonId);
      const isArenaEquipped = playerState.equippedSummonId === summon.id;
      const showdownSlotIdx = playerState.showdownSummonGrid.indexOf(summon.id);

      return `
        <div class="bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex flex-col justify-between gap-2">
          <div onclick="openSummonModal('${summon.id}')" class="cursor-pointer group">
            <div class="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-2 border border-slate-800 group-hover:border-purple-500/50 transition flex items-center justify-center p-2">
              <img src="${summon.image}" onerror="this.src='https://placehold.co/400x250/1e1b4b/c084fc?text=${encodeURIComponent(summon.name)}'" class="max-w-full max-h-full object-contain">
            </div>
            <div class="flex items-center justify-between">
              <h5 class="font-cinzel text-xs font-bold text-purple-200 truncate">${escapeHtml(summon.name)}</h5>
              <span class="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 font-bold">${summon.element}</span>
            </div>
          </div>

          <div class="flex flex-col gap-1 mt-1 text-[10px]">
            <button onclick="equipSummonToArena('${summon.id}')" class="w-full py-1 rounded-lg font-bold transition ${isArenaEquipped ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}">
              ${isArenaEquipped ? '✓ Arena Equipped' : 'Equip to Arena'}
            </button>
            <div class="grid grid-cols-3 gap-1">
              <button onclick="equipSummonToShowdown('${summon.id}', 0)" class="py-1 rounded bg-slate-800 hover:bg-purple-900 text-slate-300 font-bold ${showdownSlotIdx === 0 ? 'ring-1 ring-amber-400 text-amber-300' : ''}">Main</button>
              <button onclick="equipSummonToShowdown('${summon.id}', 1)" class="py-1 rounded bg-slate-800 hover:bg-purple-900 text-slate-300 font-bold ${showdownSlotIdx === 1 ? 'ring-1 ring-cyan-400 text-cyan-300' : ''}">Sub 1</button>
              <button onclick="equipSummonToShowdown('${summon.id}', 2)" class="py-1 rounded bg-slate-800 hover:bg-purple-900 text-slate-300 font-bold ${showdownSlotIdx === 2 ? 'ring-1 ring-cyan-400 text-cyan-300' : ''}">Sub 2</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }
}

function equipSummonToArena(summonId) {
  playerState.equippedSummonId = summonId;
  renderSummonLoadoutUI();
  scheduleSave();
}

function equipSummonToShowdown(summonId, slotIdx) {
  const existingIdx = playerState.showdownSummonGrid.indexOf(summonId);
  if (existingIdx !== -1) playerState.showdownSummonGrid[existingIdx] = null;
  playerState.showdownSummonGrid[slotIdx] = summonId;
  renderSummonLoadoutUI();
  scheduleSave();
}

function unequipSummonFromShowdown(slotIdx) {
  playerState.showdownSummonGrid[slotIdx] = null;
  renderSummonLoadoutUI();
  scheduleSave();
}

function renderSummonGrimoireUI() {
  if (typeof SUMMON_DATABASE === 'undefined') return;
  const countEl = document.getElementById('summon-collection-progress-display');
  if (countEl) countEl.innerText = `${playerState.ownedSummons.length} / ${SUMMON_DATABASE.length}`;

  const grid = document.getElementById('summon-collection-grid');
  if (!grid) return;

  grid.innerHTML = SUMMON_DATABASE.map(summon => {
    const isOwned = playerState.ownedSummons.some(o => o.summonId === summon.id);
    const auraDesc = getSummonAuraDescription(summon);

    return `
      <div onclick="openSummonModal('${summon.id}')" class="cursor-pointer bg-slate-900/70 hover:border-purple-500/50 p-4 rounded-3xl border border-slate-800 transition flex flex-col justify-between gap-3 shadow-xl ${isOwned ? '' : 'opacity-50 grayscale'}">
        <div>
          <div class="aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 mb-3 border border-purple-500/20 relative flex items-center justify-center p-2">
            <img src="${summon.image}" onerror="this.src='https://placehold.co/400x250/1e1b4b/c084fc?text=${encodeURIComponent(summon.name)}'" class="max-w-full max-h-full object-contain">
            ${isOwned ? '' : '<div class="absolute inset-0 bg-slate-950/70 flex items-center justify-center font-bold text-xs text-slate-300 z-10">🔒 Not Owned</div>'}
          </div>
          <div class="flex items-center justify-between gap-2 mb-1">
            <h4 class="font-cinzel text-base font-black text-purple-200">${escapeHtml(summon.name)}</h4>
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">${summon.element}</span>
          </div>
          <p class="text-xs text-amber-300 font-semibold">${escapeHtml(summon.callName)}</p>
          <div class="flex flex-wrap gap-1 mt-1.5">
            ${summon.roles.map(r => `<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">${r}</span>`).join('')}
          </div>
        </div>
        <div class="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
          <span class="text-amber-400 block font-semibold">${auraDesc.mainText}</span>
          <span class="text-cyan-400 block">${auraDesc.subText}</span>
        </div>
      </div>`;
  }).join('');
}

function openSummonModal(summonId) {
  if (typeof getSummonBaseData !== 'function') return;
  const summon = getSummonBaseData(summonId);
  if (!summon) return;

  const isOwned = playerState.ownedSummons.some(o => o.summonId === summon.id);
  const auraDesc = getSummonAuraDescription(summon);

  const elemRarity = document.getElementById('summon-modal-element-rarity');
  const img = document.getElementById('summon-modal-img');
  const name = document.getElementById('summon-modal-name');
  const callTitle = document.getElementById('summon-modal-call-title');
  const rolesContainer = document.getElementById('summon-modal-roles');
  const flavor = document.getElementById('summon-modal-flavor');
  const mainAura = document.getElementById('summon-modal-main-aura');
  const subAura = document.getElementById('summon-modal-sub-aura');
  const cd = document.getElementById('summon-modal-cd');
  const limit = document.getElementById('summon-modal-limit');
  const actions = document.getElementById('summon-modal-actions');

  if (elemRarity) elemRarity.innerText = `${summon.element} • ${summon.rarity} Summon`;
  if (img) img.src = summon.image;
  if (name) name.innerText = summon.name;
  if (callTitle) callTitle.innerText = `🔮 Call: ${summon.callName}`;
  if (rolesContainer) {
    rolesContainer.innerHTML = summon.roles.map(r => 
      `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">${r}</span>`
    ).join('');
  }
  if (flavor) flavor.innerText = `"${summon.flavor}"`;
  if (mainAura) mainAura.innerText = auraDesc.mainText;
  if (subAura) subAura.innerText = auraDesc.subText;
  if (cd) cd.innerText = `${summon.cooldown} Turns`;
  if (limit) limit.innerText = `${summon.maxCallsPerBattle}x per Battle`;

  if (actions) {
    actions.innerHTML = isOwned
      ? `<button onclick="equipSummonToArena('${summon.id}'); closeSummonModal();" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition">Equip as Arena Main Summon</button>`
      : `<div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs text-slate-400">Unlock via Primal Summon Gacha packs</div>`;
  }

  const modal = document.getElementById('summon-detail-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSummonModal() {
  const modal = document.getElementById('summon-detail-modal');
  if (modal) modal.classList.add('hidden');
}

function getSummonPackCost(packLevel) {
  return 200 + (Math.max(1, packLevel) - 1) * 100;
}

function openSummonGachaPacks() {
  if (typeof SUMMON_DATABASE === 'undefined') return;
  const cost = getSummonPackCost(playerState.packLevel);
  if (playerState.gold < cost) return;

  playerState.gold -= cost;
  playerState.totalPacksOpened += 5;
  checkPackLevelUp();

  const config = PACK_LEVEL_TABLE[playerState.packLevel];
  const results = [];
  let goldRefund = 0;
  let rubiesFound = 0;
  let essenceEarned = 0;

  for (let i = 0; i < 25; i++) {
    if (Math.random() * 100 < config.currencyChance) {
      if (Math.random() < 0.65) {
        const amt = getRandomInt(100, 300);
        goldRefund += amt;
        results.push({ type: 'gold', amount: amt });
      } else {
        const amt = getRandomInt(5, 15);
        rubiesFound += amt;
        results.push({ type: 'ruby', amount: amt });
      }
    } else {
      const roll = Math.random() * 100;
      let cum = 0;
      let targetRarity = 'Common';
      if (roll < (cum += config.mythical)) targetRarity = 'Mythical';
      else if (roll < (cum += config.legendary)) targetRarity = 'Legendary';
      else if (roll < (cum += config.epic)) targetRarity = 'Epic';
      else if (roll < (cum += config.rare)) targetRarity = 'Rare';
      else if (roll < (cum += config.uncommon)) targetRarity = 'Uncommon';
      else targetRarity = 'Common';

      let candidates = SUMMON_DATABASE.filter(s => s.rarity === targetRarity);
      if (candidates.length === 0) candidates = SUMMON_DATABASE;
      const pulled = candidates[Math.floor(Math.random() * candidates.length)];

      const owned = playerState.ownedSummons.find(o => o.summonId === pulled.id);
      if (!owned) {
        playerState.ownedSummons.push({ summonId: pulled.id });
        results.push({ type: 'summon', summon: pulled, isDuplicate: false });
      } else {
        const ess = DUPLICATE_ESSENCE_BY_RARITY[pulled.rarity] || 15;
        essenceEarned += ess;
        results.push({ type: 'summon', summon: pulled, isDuplicate: true, essenceAmount: ess });
      }
    }
  }

  playerState.gold += goldRefund;
  playerState.rubies += rubiesFound;
  playerState.essence += essenceEarned;

  playSound('rainbow');
  updateTopCurrencyUI();
  renderGachaUI();
  renderHomeUI();
  renderSummonPullResults(results, { cost, gold: goldRefund, rubies: rubiesFound, essence: essenceEarned });
}

function renderSummonPullResults(items, outcome) {
  const container = document.getElementById('gacha-results-container');
  const grid = document.getElementById('gacha-results-grid');
  const title = document.getElementById('gacha-results-title');
  const summary = document.getElementById('gacha-results-summary');
  if (!container || !grid) return;
  container.classList.remove('hidden');

  if (title) title.innerText = `Primal Summon Results (${items.length} Items)`;
  if (summary) {
    summary.innerText = `Totals: +${outcome.gold.toLocaleString()} Gold • +${outcome.rubies.toLocaleString()} Rubies • +${outcome.essence.toLocaleString()} Essence`;
  }

  grid.innerHTML = items.map(item => {
    if (item.type === 'gold') {
      return `
        <div class="bg-amber-950/40 p-3 rounded-2xl border border-yellow-500/40 flex flex-col items-center justify-center text-center">
          <span class="text-2xl">💰</span>
          <span class="text-xs font-bold text-yellow-300 mt-1">+${item.amount} Gold</span>
        </div>`;
    } else if (item.type === 'ruby') {
      return `
        <div class="bg-rose-950/40 p-3 rounded-2xl border border-rose-500/40 flex flex-col items-center justify-center text-center">
          <span class="text-2xl">💎</span>
          <span class="text-xs font-bold text-rose-300 mt-1">+${item.amount} Rubies</span>
        </div>`;
    } else {
      const s = item.summon;
      return `
        <div class="flex flex-col gap-1 bg-slate-900/90 p-2 rounded-2xl border border-purple-500/40">
          <div class="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-2">
            <img src="${s.image}" onerror="this.src='https://placehold.co/200x120/1e1b4b/c084fc?text=${encodeURIComponent(s.name)}'" class="max-w-full max-h-full object-contain">
          </div>
          <div class="text-center mt-1">
            <span class="font-cinzel text-xs font-bold text-purple-200 block truncate">${escapeHtml(s.name)}</span>
            <span class="text-[9px] uppercase font-bold text-purple-400">${s.element} · ${s.rarity}</span>
          </div>
          ${item.isDuplicate
            ? `<span class="text-[10px] text-center font-bold text-cyan-300 py-0.5 bg-cyan-950/40 rounded-lg border border-cyan-700/40">Duplicate • +${item.essenceAmount} ✦</span>`
            : `<span class="text-[10px] text-center font-bold text-emerald-300 py-0.5 bg-emerald-950/40 rounded-lg border border-emerald-600/40">New Summon!</span>`
          }
        </div>`;
    }
  }).join('');
}

const DUPLICATE_GOLD_BY_RARITY    = { Common: 5, Uncommon: 10, Rare: 18, Epic: 35, Legendary: 70, Mythical: 140 };
const DUPLICATE_RUBIES_BY_RARITY  = { Common: 0, Uncommon: 0, Rare: 0, Epic: 3, Legendary: 8, Mythical: 20 };
const DUPLICATE_ESSENCE_BY_RARITY = { Common: 1, Uncommon: 2, Rare: 5, Epic: 12, Legendary: 30, Mythical: 80 };

const ESSENCE_EXCHANGE_COST = { Common: 20, Uncommon: 40, Rare: 150, Epic: 400, Legendary: 800, Mythical: 2000 };

const SPOTLIGHT_UNLOCK_PACK_LEVEL = 5;
const SPOTLIGHT_COST_MULT = 1.5;
const SPOTLIGHT_TARGET_SHARE = 0.30;
const SPOTLIGHT_GUARANTEE_OPENS = 6;
const SPOTLIGHT_MIN_RARITY = 'Epic';

function grantCardCopy(card) {
  const owned = playerState.ownedCards.find(c => c.cardId === card.id);
  if (!owned) {
    playerState.ownedCards.push({ cardId: card.id, isRainbow: false, level: 1, copies: 0, enlightenment: 0, awakened: false });
    return { isNew: true };
  }

  const currentLevel = owned.level || 1;
  if (currentLevel < MAX_CARD_LEVEL) {
    owned.level = currentLevel + 1;
    if (BANK_COPY_ON_LEVEL_UP) owned.copies = (owned.copies || 0) + 1;
    return { isNew: false, leveledUp: true, copyBanked: BANK_COPY_ON_LEVEL_UP, newLevel: owned.level };
  }

  owned.copies = (owned.copies || 0) + 1;
  return { isNew: false, leveledUp: false, copyBanked: true, copies: owned.copies, newLevel: MAX_CARD_LEVEL };
}

function processCardPull(pulledCard, flags) {
  flags = (flags && typeof flags === 'object') ? flags : {};
  const grant = grantCardCopy(pulledCard);
  if (grant.isNew) return { type: 'card', card: pulledCard, isDuplicate: false, ...flags };

  const rarity = pulledCard.rarity;
  return {
    type: 'card',
    card: pulledCard,
    isDuplicate: true,
    leveledUp: grant.leveledUp,
    copyBanked: grant.copyBanked,
    newLevel: grant.newLevel,
    copies: grant.copies,
    refundAmount: grant.leveledUp ? (DUPLICATE_GOLD_BY_RARITY[rarity] || 0) : 0,
    rubyAmount: DUPLICATE_RUBIES_BY_RARITY[rarity] || 0,
    essenceAmount: DUPLICATE_ESSENCE_BY_RARITY[rarity] || 0,
    ...flags
  };
}

function isRarityDroppable(rarity) {
  const config = PACK_LEVEL_TABLE[playerState.packLevel];
  return !!config && (config[rarity.toLowerCase()] || 0) > 0;
}

function isSpotlightUnlocked() {
  return playerState.packLevel >= SPOTLIGHT_UNLOCK_PACK_LEVEL;
}

function getSpotlightTargetCard() {
  const id = playerState.spotlight && playerState.spotlight.targetId;
  return id ? (CARD_DATABASE.find(c => c.id === id) || null) : null;
}

function isValidSpotlightTarget(card) {
  return !!card && rarityRank(card.rarity) >= rarityRank(SPOTLIGHT_MIN_RARITY) && isRarityDroppable(card.rarity);
}

function getSpotlightCost() {
  return Math.round((PACK_LEVEL_TABLE[playerState.packLevel].cost * SPOTLIGHT_COST_MULT) / 10) * 10;
}

function setSpotlightTarget(cardId) {
  const card = CARD_DATABASE.find(c => c.id === cardId);
  const newId = (isSpotlightUnlocked() && isValidSpotlightTarget(card)) ? card.id : null;
  if (newId !== playerState.spotlight.targetId) {
    playerState.spotlight.targetId = newId;
    playerState.spotlight.opensSinceTarget = 0;
  }
  renderGachaUI();
}

function runPackOpen(kind) {
  const isSpotlight = kind === 'spotlight';
  const config = PACK_LEVEL_TABLE[playerState.packLevel];

  let target = null;
  if (isSpotlight) {
    target = getSpotlightTargetCard();
    if (!isSpotlightUnlocked() || !isValidSpotlightTarget(target)) return null;
  }

  const cost = isSpotlight ? getSpotlightCost() : config.cost;
  if (playerState.gold < cost) return null;

  playerState.gold -= cost;
  playerState.totalPacksOpened += 5;
  checkPackLevelUp();

  const results = [];
  let gold = 0;
  let rubies = 0;
  let essence = 0;
  let targetHits = 0;
  const tally = r => {
    gold += r.refundAmount || 0;
    rubies += r.rubyAmount || 0;
    essence += r.essenceAmount || 0;
  };

  for (let i = 0; i < 25; i++) {
    if ((Math.random() * 100) < config.currencyChance) {
      if (Math.random() < 0.65) {
        const amount = getRandomInt(100, 300);
        gold += amount;
        results.push({ type: 'gold', amount });
      } else {
        const amount = getRandomInt(5, 15);
        rubies += amount;
        results.push({ type: 'ruby', amount });
      }
    } else {
      const pulledCard = rollCardByPackOdds(config, target);
      const isTargetHit = !!target && pulledCard.id === target.id;
      const result = processCardPull(pulledCard, isTargetHit ? { isTarget: true } : {});
      if (isTargetHit) targetHits++;
      tally(result);
      results.push(result);
    }
  }

  if (isSpotlight) {
    const spotlight = playerState.spotlight;
    if (targetHits > 0) {
      spotlight.opensSinceTarget = 0;
    } else {
      spotlight.opensSinceTarget += 1;
      if (spotlight.opensSinceTarget >= SPOTLIGHT_GUARANTEE_OPENS) {
        const guaranteed = processCardPull(target, { isTarget: true, isGuarantee: true });
        tally(guaranteed);
        results.push(guaranteed);
        spotlight.opensSinceTarget = 0;
      }
    }
  }

  playerState.gold += gold;
  playerState.rubies += rubies;
  playerState.essence += essence;
  return { kind, cost, results, gold, rubies, essence };
}

function presentPackOpen(outcome) {
  if (!outcome) return;
  playSound('rainbow');
  updateTopCurrencyUI();
  renderGachaUI();
  renderHomeUI();
  renderGachaPullResults(outcome.results, outcome);
}

function openGachaPacks() {
  presentPackOpen(runPackOpen('standard'));
}

function openSpotlightPack() {
  presentPackOpen(runPackOpen('spotlight'));
}

function rollCardByPackOdds(config, spotlightTarget) {
  const roll = Math.random() * 100;
  let cumulative = 0;

  let targetRarity = 'Common';
  if (roll < (cumulative += config.mythical)) targetRarity = 'Mythical';
  else if (roll < (cumulative += config.legendary)) targetRarity = 'Legendary';
  else if (roll < (cumulative += config.epic)) targetRarity = 'Epic';
  else if (roll < (cumulative += config.rare)) targetRarity = 'Rare';
  else if (roll < (cumulative += config.uncommon)) targetRarity = 'Uncommon';
  else targetRarity = 'Common';

  if (spotlightTarget && targetRarity === spotlightTarget.rarity && Math.random() < SPOTLIGHT_TARGET_SHARE) {
    return spotlightTarget;
  }

  let candidates = CARD_DATABASE.filter(c => c.rarity === targetRarity);
  if (candidates.length === 0) candidates = CARD_DATABASE.filter(c => c.rarity === 'Common');
  return candidates[Math.floor(Math.random() * candidates.length)];
}

const essenceUi = { rarity: null, cardId: null, rarityChosen: false };

function exchangeEssenceForCard(cardId) {
  const card = CARD_DATABASE.find(c => c.id === cardId);
  if (!card) return { ok: false, reason: 'unknown' };
  if (!isRarityDroppable(card.rarity)) return { ok: false, reason: 'locked' };
  const cost = ESSENCE_EXCHANGE_COST[card.rarity];
  if (playerState.essence < cost) return { ok: false, reason: 'essence', cost };
  playerState.essence -= cost;
  const grant = grantCardCopy(card);
  return { ok: true, card, cost, grant };
}

function setEssenceRarity(rarity) {
  essenceUi.rarity = rarity;
  essenceUi.rarityChosen = true;
  essenceUi.cardId = null;
  renderEssenceExchangeUI();
}

function setEssenceCard(cardId) {
  essenceUi.cardId = cardId;
  renderEssenceExchangeUI();
}

function doEssenceExchange() {
  const result = exchangeEssenceForCard(essenceUi.cardId);
  const status = document.getElementById('essence-status');
  if (result.ok) {
    playSound('rainbow');
    const g = result.grant;
    const what = g.isNew ? 'a new card at Lv.1' : g.leveledUp ? `level ${g.newLevel}` : `a spare copy (${g.copies} now)`;
    if (status) {
      status.innerText = `Exchanged ${result.cost.toLocaleString()} ✦ for ${result.card.name}: ${what}.`;
      status.className = 'text-xs text-center py-2 px-3 rounded-xl font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40';
    }
    renderGachaUI();
    renderDeckBuilderUI();
    renderCollectionUI();
    renderHomeUI();
  } else if (status) {
    status.innerText = result.reason === 'essence' ? 'Not enough Essence.' : result.reason === 'locked' ? 'Reach a higher Pack Level to unlock this rarity.' : 'Choose a card first.';
    status.className = 'text-xs text-center py-2 px-3 rounded-xl font-semibold bg-rose-950/80 text-rose-300 border border-rose-600/40';
  }
}

function renderEssenceExchangeUI() {
  const raritySelect = document.getElementById('essence-rarity-select');
  const cardSelect = document.getElementById('essence-card-select');
  const balanceEl = document.getElementById('essence-balance');
  const infoEl = document.getElementById('essence-info');
  const button = document.getElementById('btn-essence-exchange');
  if (!raritySelect || !cardSelect) return;

  if (balanceEl) balanceEl.innerText = playerState.essence.toLocaleString();

  const droppable = RARITY_ORDER.filter(isRarityDroppable);
  if (!essenceUi.rarityChosen || !essenceUi.rarity || !isRarityDroppable(essenceUi.rarity)) {
    const best = droppable[droppable.length - 1] || 'Common';
    if (best !== essenceUi.rarity) essenceUi.cardId = null;
    essenceUi.rarity = best;
  }

  raritySelect.innerHTML = RARITY_ORDER.map(r => {
    const open = isRarityDroppable(r);
    return `<option value="${r}" ${open ? '' : 'disabled'}>${r} — ${ESSENCE_EXCHANGE_COST[r].toLocaleString()} ✦${open ? '' : ' (locked)'}</option>`;
  }).join('');
  raritySelect.value = essenceUi.rarity;

  const cards = CARD_DATABASE.filter(c => c.rarity === essenceUi.rarity).sort((a, b) => a.name.localeCompare(b.name));
  if (!cards.some(c => c.id === essenceUi.cardId)) essenceUi.cardId = cards.length ? cards[0].id : null;
  cardSelect.innerHTML = cards.map(c => {
    const owned = playerState.ownedCards.find(o => o.cardId === c.id);
    return `<option value="${c.id}">${escapeHtml(c.name)} — ${c.element} ${c.role}${owned ? ` (Lv.${owned.level || 1})` : ' (new)'}</option>`;
  }).join('');
  cardSelect.value = essenceUi.cardId || '';

  const card = cards.find(c => c.id === essenceUi.cardId);
  const cost = ESSENCE_EXCHANGE_COST[essenceUi.rarity];
  if (infoEl && card) {
    const owned = playerState.ownedCards.find(o => o.cardId === card.id);
    infoEl.innerText = !owned
      ? `You don't own ${card.name} yet: you'll get it at Lv.1.`
      : (owned.level || 1) < MAX_CARD_LEVEL
        ? `${card.name} is Lv.${owned.level || 1}: the copy raises it to Lv.${(owned.level || 1) + 1}.`
        : `${card.name} is at Lv.${MAX_CARD_LEVEL}: the copy is kept as a spare for Enlightenment / Awakening (${owned.copies || 0} spare now).`;
  }
  if (button) {
    button.disabled = !card || playerState.essence < cost || !isRarityDroppable(essenceUi.rarity);
    button.innerText = `Exchange for ${cost.toLocaleString()} ✦`;
  }
}

function renderSpotlightUI() {
  const badge = document.getElementById('spotlight-status-badge');
  const lockedBox = document.getElementById('spotlight-locked');
  const body = document.getElementById('spotlight-body');
  if (!badge || !lockedBox || !body) return;

  const unlocked = isSpotlightUnlocked();
  lockedBox.classList.toggle('hidden', unlocked);
  body.classList.toggle('hidden', !unlocked);
  badge.innerText = unlocked ? 'Unlocked' : `Unlocks at Pack Level ${SPOTLIGHT_UNLOCK_PACK_LEVEL}`;
  badge.className = 'text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ' +
    (unlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400');
  if (!unlocked) {
    lockedBox.innerText = `Reach Pack Level ${SPOTLIGHT_UNLOCK_PACK_LEVEL} to unlock (you are Level ${playerState.packLevel}).`;
    return;
  }

  const select = document.getElementById('spotlight-target-select');
  const info = document.getElementById('spotlight-info');
  const button = document.getElementById('btn-open-spotlight');
  const costEl = document.getElementById('spotlight-cost-display');
  const gText = document.getElementById('spotlight-guarantee-text');
  const gBar = document.getElementById('spotlight-guarantee-bar');

  const rarities = RARITY_ORDER.filter(r => rarityRank(r) >= rarityRank(SPOTLIGHT_MIN_RARITY) && isRarityDroppable(r));
  let html = '<option value="">— Choose a target —</option>';
  rarities.forEach(r => {
    html += `<optgroup label="${r}">` +
      CARD_DATABASE.filter(c => c.rarity === r).sort((a, b) => a.name.localeCompare(b.name)).map(c => {
        const owned = playerState.ownedCards.find(o => o.cardId === c.id);
        return `<option value="${c.id}">${escapeHtml(c.name)} — ${c.element} ${c.role}${owned ? ` (Lv.${owned.level || 1})` : ' (new)'}</option>`;
      }).join('') + '</optgroup>';
  });
  select.innerHTML = html;
  const target = getSpotlightTargetCard();
  select.value = target ? target.id : '';

  const config = PACK_LEVEL_TABLE[playerState.packLevel];
  const cost = getSpotlightCost();
  if (costEl) costEl.innerText = cost.toLocaleString();
  if (info) {
    if (target) {
      const inRarity = CARD_DATABASE.filter(c => c.rarity === target.rarity).length;
      const cardSlots = 1 - config.currencyChance / 100;
      const boosted = cardSlots * (config[target.rarity.toLowerCase()] / 100) * (SPOTLIGHT_TARGET_SHARE + (1 - SPOTLIGHT_TARGET_SHARE) / inRarity);
      const normal = cardSlots * (config[target.rarity.toLowerCase()] / 100) / inRarity;
      info.innerText = `${Math.round(SPOTLIGHT_TARGET_SHARE * 100)}% of pulls that roll ${target.rarity} become ${target.name}. About ${(boosted * 100).toFixed(2)}% per pull here vs ${(normal * 100).toFixed(2)}% in a standard pack. Same odds otherwise.`;
    } else {
      info.innerText = 'Pick a target to see your boosted odds.';
    }
  }
  const opens = Math.min(playerState.spotlight.opensSinceTarget, SPOTLIGHT_GUARANTEE_OPENS);
  if (gText) gText.innerText = `${opens} / ${SPOTLIGHT_GUARANTEE_OPENS} opens without a copy`;
  if (gBar) gBar.style.width = `${(opens / SPOTLIGHT_GUARANTEE_OPENS) * 100}%`;
  if (button) button.disabled = !isValidSpotlightTarget(target) || playerState.gold < cost;
}

function checkPackLevelUp() {
  for (let lvl = 10; lvl >= 1; lvl--) {
    if (playerState.totalPacksOpened >= PACK_LEVEL_TABLE[lvl].unlockAt) {
      if (playerState.packLevel < lvl) {
        playerState.packLevel = lvl;
      }
      break;
    }
  }
}

function renderGachaUI() {
  const lvl = playerState.packLevel;
  const config = PACK_LEVEL_TABLE[lvl];
  const nextConfig = PACK_LEVEL_TABLE[Math.min(10, lvl + 1)];

  const packLvlBadge = document.getElementById('gacha-pack-lvl-badge');
  const oddsLvlDisplay = document.getElementById('odds-lvl-display');
  const gachaCostDisplay = document.getElementById('gacha-cost-display');
  const summonCostDisplay = document.getElementById('gacha-summon-cost-display');
  const oddsCurrencyDisplay = document.getElementById('odds-currency-display');
  if (packLvlBadge) packLvlBadge.innerText = `Pack Level ${lvl}`;
  if (oddsLvlDisplay) oddsLvlDisplay.innerText = lvl;
  if (gachaCostDisplay) gachaCostDisplay.innerText = config.cost;
  if (summonCostDisplay) summonCostDisplay.innerText = `${getSummonPackCost(lvl)} Gold`;
  if (oddsCurrencyDisplay) oddsCurrencyDisplay.innerText = `${config.currencyChance}%`;

  const commonEl = document.getElementById('rate-common');
  const uncommonEl = document.getElementById('rate-uncommon');
  const rareEl = document.getElementById('rate-rare');
  const epicEl = document.getElementById('rate-epic');
  const legendaryEl = document.getElementById('rate-legendary');
  const mythicalEl = document.getElementById('rate-mythical');
  if (commonEl) commonEl.innerText = `${config.common}%`;
  if (uncommonEl) uncommonEl.innerText = `${config.uncommon}%`;
  if (rareEl) rareEl.innerText = `${config.rare}%`;
  if (epicEl) epicEl.innerText = `${config.epic}%`;
  if (legendaryEl) legendaryEl.innerText = `${config.legendary}%`;
  if (mythicalEl) mythicalEl.innerText = `${config.mythical}%`;

  const gachaProgressText = document.getElementById('gacha-progress-text');
  const gachaProgressBar = document.getElementById('gacha-progress-bar');
  if (lvl >= 10) {
    if (gachaProgressText) gachaProgressText.innerText = "MAX LEVEL REACHED";
    if (gachaProgressBar) gachaProgressBar.style.width = "100%";
  } else {
    const curProgress = playerState.totalPacksOpened - config.unlockAt;
    const needed = nextConfig.unlockAt - config.unlockAt;
    const pct = Math.min(100, Math.max(0, (curProgress / needed) * 100));
    if (gachaProgressText) gachaProgressText.innerText = `${playerState.totalPacksOpened} / ${nextConfig.unlockAt} Packs`;
    if (gachaProgressBar) gachaProgressBar.style.width = `${pct}%`;
  }

  const essenceDisplay = document.getElementById('gacha-essence-display');
  if (essenceDisplay) essenceDisplay.innerText = playerState.essence.toLocaleString();

  renderSpotlightUI();
  renderEssenceExchangeUI();
}

function renderGachaPullResults(items, outcome) {
  const container = document.getElementById('gacha-results-container');
  const grid = document.getElementById('gacha-results-grid');
  const title = document.getElementById('gacha-results-title');
  const summary = document.getElementById('gacha-results-summary');
  if (!container || !grid) return;
  container.classList.remove('hidden');

  if (title) title.innerText = `${outcome && outcome.kind === 'spotlight' ? 'Spotlight Pack' : 'Summon'} Results (${items.length} Items)`;
  if (summary) {
    summary.innerText = outcome
      ? `Totals: +${outcome.gold.toLocaleString()} Gold • +${outcome.rubies.toLocaleString()} Rubies • +${outcome.essence.toLocaleString()} Essence`
      : '';
  }

  grid.innerHTML = items.map(item => {
    if (item.type === 'gold') {
      return `
        <div class="bg-amber-950/40 p-3 rounded-2xl border border-yellow-500/40 flex flex-col items-center justify-center text-center">
          <span class="text-2xl">💰</span>
          <span class="text-xs font-bold text-yellow-300 mt-1">+${item.amount} Gold</span>
        </div>
      `;
    } else if (item.type === 'ruby') {
      return `
        <div class="bg-rose-950/40 p-3 rounded-2xl border border-rose-500/40 flex flex-col items-center justify-center text-center">
          <span class="text-2xl">💎</span>
          <span class="text-xs font-bold text-rose-300 mt-1">+${item.amount} Rubies</span>
        </div>
      `;
    } else {
      const owned = playerState.ownedCards.find(o => o.cardId === item.card.id);
      const stats = calculateCardStats(item.card.id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
      const cardHtml = renderCardHTML(stats, { hideLabel: true });
      const tagBadge = item.isGuarantee
        ? `<span class="text-[9px] text-center font-black uppercase py-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 rounded-lg">🎯 Guaranteed Target</span>`
        : item.isTarget
          ? `<span class="text-[9px] text-center font-black uppercase py-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 text-slate-950 rounded-lg">🎯 Spotlight Target</span>`
          : '';

      if (item.isDuplicate) {
        const rewards = [];
        if (item.refundAmount) rewards.push(`+${item.refundAmount} 💰`);
        if (item.essenceAmount) rewards.push(`+${item.essenceAmount} ✦`);
        if (item.rubyAmount) rewards.push(`+${item.rubyAmount} 💎`);
        const rewardText = rewards.length ? ` • ${rewards.join(' • ')}` : '';
        const dupBadge = item.leveledUp
          ? `<span class="text-[10px] text-center font-bold text-yellow-300 py-1 bg-yellow-950/40 rounded-lg border border-yellow-600/40">Duplicate • Lv.${item.newLevel}${item.copyBanked ? ' • +1 🃏' : ''}${rewardText}</span>`
          : `<span class="text-[10px] text-center font-bold text-lime-300 py-1 bg-lime-950/40 rounded-lg border border-lime-600/40">MAX LEVEL • +1 🃏 Spare Copy${rewardText}</span>`;
        return `
          <div class="flex flex-col gap-1">
            ${tagBadge}
            ${cardHtml}
            ${dupBadge}
          </div>
        `;
      }
      return `
        <div class="flex flex-col gap-1">
          ${tagBadge}
          ${cardHtml}
          <span class="text-[10px] text-center font-bold text-emerald-300 py-1 bg-emerald-950/40 rounded-lg border border-emerald-600/40">
            New Card!
          </span>
        </div>
      `;
    }
  }).join('');
}

function updateRankedLadderUI() {
  renderSeasonUI();
  const currentTier = TIERS[playerState.tierIndex];
  const tierNameEl = document.getElementById('header-tier-name');
  const titleEl = document.getElementById('rank-title-display');
  const shieldIcon = document.getElementById('rank-shield-icon');
  const starsContainer = document.getElementById('rank-stars-container');
  const promoCard = document.getElementById('promo-series-card');
  const promoNodes = document.getElementById('promo-nodes');

  const isMaster = playerState.tierIndex === MASTER_TIER_INDEX;
  const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];
  const divisionRoman = ROMAN_NUMERALS[playerState.division - 1] || "I";
  const fullRankName = isMaster 
    ? `Master Tier (${playerState.masterStars} ⭐)` 
    : `${currentTier.name} ${divisionRoman}`;

  if (tierNameEl) tierNameEl.innerText = fullRankName;
  if (titleEl) {
    titleEl.innerText = fullRankName;
    titleEl.className = `font-cinzel text-2xl font-black ${currentTier.color}`;
  }
  if (shieldIcon) shieldIcon.innerText = isMaster ? "👑" : divisionRoman;

  if (starsContainer) {
    if (isMaster) {
      starsContainer.innerHTML = `<span class="text-base font-bold text-purple-300">⭐ ${playerState.masterStars} Master Stars</span>`;
    } else {
      const totalDivStars = currentTier.starsPerDiv;
      starsContainer.innerHTML = Array.from({ length: totalDivStars }).map((_, i) => {
        return i < playerState.stars 
          ? '<span class="text-amber-400 drop-shadow">★</span>' 
          : '<span class="text-slate-700">☆</span>';
      }).join('');
    }
  }
  
  const promoDesc = document.getElementById('promo-series-desc');
  const streakBadge = document.getElementById('rank-streak-badge');

  // 1. Dynamic Win Streak Callout
  if (streakBadge) {
    const currentStreak = playerState.stats?.currentStreak || 0;
    if (currentStreak >= 3 && playerState.tierIndex <= 3) {
      streakBadge.classList.remove('hidden');
      streakBadge.innerText = `🔥 ${currentStreak} Win Streak (+2 Stars Active)`;
    } else {
      streakBadge.classList.add('hidden');
    }
  }

  // 2. Dynamic Promotion Series Nodes & Descriptions
  if (promoCard && promoNodes) {
    if (playerState.inPromotion) {
      promoCard.classList.remove('hidden');
      const isBo3 = currentTier.promoFormat === 'bo3' || playerState.tierIndex <= 2;
      const totalRounds = isBo3 ? 3 : 5;
      const requiredWins = isBo3 ? 2 : 3;

      if (promoDesc) {
        promoDesc.innerHTML = `Best-of-${totalRounds} Series. Win <b>${requiredWins} matches</b> to promote to <b>${TIERS[playerState.tierIndex + 1]?.name || 'Next Tier'}</b>!`;
      }

      promoNodes.innerHTML = Array.from({ length: totalRounds }).map((_, i) => {
        let nodeColor = "bg-slate-800 border-slate-700 text-slate-500";
        if (i < playerState.promoWins) {
          nodeColor = "bg-emerald-600 border-emerald-400 text-white";
        } else if (i < (playerState.promoWins + playerState.promoLosses)) {
          nodeColor = "bg-rose-600 border-rose-400 text-white";
        }
        return `<div class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${nodeColor}">${i + 1}</div>`;
      }).join('');
    } else {
      promoCard.classList.add('hidden');
    }
  }
}

function formatCurrencyCompact(amount) {
  if (amount < 1e6) return amount.toLocaleString();
  const units = [[1e12, 999.5e9, 'T'], [1e9, 999.5e6, 'B'], [1e6, 1e6, 'M']];
  for (const [size, threshold, suffix] of units) {
    if (amount >= threshold) {
      const value = amount / size;
      return (value >= 99.95 ? Math.round(value).toString() : value >= 9.995 ? value.toFixed(1) : value.toFixed(2)) + suffix;
    }
  }
  return amount.toLocaleString();
}

function updateTopCurrencyUI() {
  const goldEl = document.getElementById('ui-gold');
  const rubiesEl = document.getElementById('ui-rubies');
  if (goldEl) {
    goldEl.innerText = formatCurrencyCompact(playerState.gold);
    goldEl.title = playerState.gold.toLocaleString();
  }
  if (rubiesEl) {
    rubiesEl.innerText = formatCurrencyCompact(playerState.rubies);
    rubiesEl.title = playerState.rubies.toLocaleString();
  }
}

function renderHomeUI() {
  const isMaster = playerState.tierIndex === MASTER_TIER_INDEX;
  const currentTier = TIERS[playerState.tierIndex];
  const divisionRoman = ["I", "II", "III"][playerState.division - 1] || "I";
  const fullRankName = isMaster 
    ? `Master Tier (${playerState.masterStars} ⭐)` 
    : `${currentTier.name} ${divisionRoman}`;
  const totalCp = calculateTeamPower(playerState.equippedDeckIds);

  const rankDisplay = document.getElementById('home-rank-display');
  const cpDisplay = document.getElementById('home-cp-display');
  const packlvlDisplay = document.getElementById('home-packlvl-display');
  const collectionDisplay = document.getElementById('home-collection-display');
  if (rankDisplay) rankDisplay.innerText = fullRankName;
  if (cpDisplay) cpDisplay.innerText = `${totalCp} CP`;
  if (packlvlDisplay) packlvlDisplay.innerText = `Level ${playerState.packLevel}`;
  if (collectionDisplay) collectionDisplay.innerText = `${playerState.ownedCards.length} / ${CARD_DATABASE.length}`;

  const homeGrid = document.getElementById('home-lineup-grid');
  if (homeGrid) {
    homeGrid.innerHTML = playerState.equippedDeckIds.map(id => {
      const owned = playerState.ownedCards.find(o => o.cardId === id);
      const stats = calculateCardStats(id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
      return `<div>${renderCardHTML(stats)}</div>`;
    }).join('');
  }
  updateSeasonBadge();
}

function renderCollectionUI() {
  const grid = document.getElementById('collection-grid');
  const progressDisplay = document.getElementById('collection-progress-display');
  const progressBar = document.getElementById('collection-progress-bar');
  if (!grid) return;

  const ownedCount = playerState.ownedCards.length;
  const totalCount = CARD_DATABASE.length;

  if (progressDisplay) progressDisplay.innerText = `${ownedCount} / ${totalCount}`;
  if (progressBar) progressBar.style.width = `${Math.round((ownedCount / totalCount) * 100)}%`;

  const sortedDb = getCardViewEntries('collection').map(e => e.base);
  updateCardViewCount('collection', sortedDb.length, totalCount);

  grid.innerHTML = sortedDb.length === 0 ? cardViewEmptyHTML('collection') : sortedDb.map(base => {
    const owned = playerState.ownedCards.find(o => o.cardId === base.id);
    const stats = calculateCardStats(base.id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
    const regIdx = registerCard(stats);
    const elem = ELEMENT_CONFIG[stats.element] || ELEMENT_CONFIG.Fire;
    const rarityInfo = RARITY_STATS[stats.rarity] || RARITY_STATS.Common;

    if (owned) {
      return renderCardHTML(stats);
    }

    return `
      <div class="flex flex-col gap-1">
        <div onclick="openCardModal(${regIdx})" class="relative group cursor-pointer transition-all duration-300 transform active:scale-95 hover:ring-2 hover:ring-indigo-400 rounded-2xl">
          <div class="relative rounded-2xl aspect-[3/4.2] flex flex-col justify-between overflow-hidden shadow-xl bg-slate-900 border-2 border-slate-700/80">
            <div class="absolute inset-0 z-0">
              <img src="${base.image}" onerror="this.src='https://placehold.co/400x500/1e293b/94a3b8?text=${encodeURIComponent(base.name)}'" class="w-full h-full object-cover object-center grayscale opacity-30 group-hover:opacity-45 transition duration-300" alt="${base.name}">
              <div class="absolute inset-0 bg-slate-950/60"></div>
            </div>

            <button onclick="event.stopPropagation(); openCardModal(${regIdx})" title="View Details" class="absolute top-1.5 right-1.5 z-30 w-5 h-5 rounded-full bg-black/80 border border-white/30 text-white text-[10px] font-bold flex items-center justify-center hover:bg-indigo-600 transition shadow">
              i
            </button>

            <div class="relative z-10 p-2 flex items-start gap-1">
              <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${elem.badgeBg} ${elem.text} border ${elem.border}">
                ${elem.icon} ${base.element}
              </span>
              <span class="text-[9px] font-bold uppercase px-1 rounded bg-slate-900/90 text-${rarityInfo.color}-400">
                ${base.rarity}
              </span>
            </div>

            <div class="relative z-10 flex-1 flex flex-col items-center justify-center">
              <span class="text-2xl opacity-75">🔒</span>
              <span class="text-[10px] font-extrabold text-slate-300 mt-1 uppercase tracking-wider">Unowned</span>
            </div>

            <div class="relative z-10 p-2 bg-slate-950/90 border-t border-slate-800 text-center">
              <span class="text-[10px] font-bold text-slate-400">Click to Inspect</span>
            </div>
          </div>
        </div>

        <button onclick="openCardModal(${regIdx})" class="w-full text-center px-1.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-indigo-500/60 transition shadow-sm">
          <h4 class="font-cinzel font-bold text-[11px] sm:text-xs text-slate-300 truncate">
            ${base.name}
          </h4>
        </button>
      </div>
    `;
  }).join('');
}

function toggleLogModal() {
  const modal = document.getElementById('history-modal');
  if (modal) modal.classList.toggle('hidden');
}

function openSaveModal() {
  const modal = document.getElementById('save-manager-modal');
  const textarea = document.getElementById('save-code-textarea');
  const alertBox = document.getElementById('save-modal-alert');
  if (!modal || !textarea || !alertBox) return;
  alertBox.className = "hidden";

  const exportData = buildSaveData();
  textarea.value = btoa(JSON.stringify(exportData));
  modal.classList.remove('hidden');
}

function closeSaveModal() {
  const modal = document.getElementById('save-manager-modal');
  if (modal) modal.classList.add('hidden');
}

function copySaveCodeToClipboard() {
  const textarea = document.getElementById('save-code-textarea');
  const alertBox = document.getElementById('save-modal-alert');
  if (!textarea || !alertBox) return;

  textarea.select();
  document.execCommand('copy');

  alertBox.className = "text-xs text-center py-2 px-3 rounded-xl font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 block";
  alertBox.innerText = "✓ Save code copied to clipboard successfully!";
  playSound('heal');
}

function importSaveCodeFromTextarea() {
  const textarea = document.getElementById('save-code-textarea');
  const alertBox = document.getElementById('save-modal-alert');
  if (!textarea || !alertBox) return;
  const raw = textarea.value.trim();

  if (!raw) {
    alertBox.className = "text-xs text-center py-2 px-3 rounded-xl font-semibold bg-rose-950/80 text-rose-300 border border-rose-600/40 block";
    alertBox.innerText = "Please paste a valid save code into the box above.";
    return;
  }

  try {
    let parsed;
    if (raw.startsWith('{')) {
      parsed = JSON.parse(raw);
    } else {
      parsed = JSON.parse(atob(raw));
    }

    if (typeof parsed.gold !== 'number' || !Array.isArray(parsed.ownedCards)) {
      throw new Error("Corrupted save format.");
    }

    applySaveData(parsed);
    checkSeasonRollover();

    alertBox.className = "text-xs text-center py-2 px-3 rounded-xl font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 block";
    alertBox.innerText = "✓ Save loaded successfully! Profile updated.";
    playSound('rainbow');

    updateTopCurrencyUI();
    updateRankedLadderUI();
    renderHomeUI();
    renderDeckBuilderUI();
    renderGachaUI();
  } catch (err) {
    alertBox.className = "text-xs text-center py-2 px-3 rounded-xl font-semibold bg-rose-950/80 text-rose-300 border border-rose-600/40 block";
    alertBox.innerText = "Invalid save code. Could not parse data.";
  }
}

function resetSaveProgress() {
  const alertBox = document.getElementById('save-modal-alert');
  const textarea = document.getElementById('save-code-textarea');

  playerState.gold = 1400;
  playerState.rubies = 220;
  playerState.packLevel = 1;
  playerState.totalPacksOpened = 0;
  playerState.essence = 0;
  playerState.spotlight = { targetId: null, opensSinceTarget: 0 };
  playerState.equippedDeckIds = ["c_eso", "c_alistair", "c_anna", "c_flesselles", "c_cordelia", "c_lunalu"];
  playerState.ownedCards = [
    { cardId: "c_eso", isRainbow: false, level: 1 },
    { cardId: "c_alistair", isRainbow: false, level: 1 },
    { cardId: "c_anna", isRainbow: true, level: 1 },
    { cardId: "c_flesselles", isRainbow: false, level: 1 },
    { cardId: "c_cordelia", isRainbow: false, level: 1 },
    { cardId: "c_lunalu", isRainbow: false, level: 1 },
    { cardId: "c_balurga", isRainbow: false, level: 1 },
    { cardId: "u_johann", isRainbow: false, level: 1 },
    { cardId: "r_amira", isRainbow: false, level: 1 }
  ];
  playerState.ownedSummons = [{ summonId: "s_colossus" }];
  playerState.equippedSummonId = "s_colossus";
  playerState.showdownSummonGrid = ["s_colossus", null, null];
  playerState.equippedRelicIds = [null, null, null];
  playerState.ownedRelics = [
    { relicId: "rel_lion_crest", acquiredAt: Date.now() },
    { relicId: "rel_chalice_of_vigor", acquiredAt: Date.now() }
  ];
  playerState.tierIndex = 0;
  playerState.division = 3;
  playerState.stars = 1;
  playerState.masterStars = 0;
  playerState.inPromotion = false;
  playerState.promoWins = 0;
  playerState.promoLosses = 0;

  playerState.deckPresets = Array.from({ length: 5 }, () => null);
  playerState.stats = createDefaultStats();
  playerState.season = createDefaultSeason();
  updatePeakRank();
  pendingPresetDelete = -1;

  if (alertBox) {
    alertBox.className = "text-xs text-center py-2 px-3 rounded-xl font-semibold bg-amber-950/80 text-amber-300 border border-amber-600/40 block";
    alertBox.innerText = "Progress has been reset to starter defaults.";
  }
  if (textarea) textarea.value = "";

  updateTopCurrencyUI();
  updateRankedLadderUI();
  renderHomeUI();
  renderDeckBuilderUI();
  renderGachaUI();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

function formatRankName(rank) {
  if (!rank) rank = { tierIndex: playerState.tierIndex, division: playerState.division, masterStars: playerState.masterStars };
  if (rank.tierIndex === MASTER_TIER_INDEX) return `Master (${rank.masterStars} ⭐)`;
  const roman = ["I", "II", "III", "IV", "V", "VI"][rank.division - 1] || "I";
  return `${TIERS[rank.tierIndex].name} ${roman}`;
}

function rankScore(rank) {
  const inTier = rank.tierIndex === MASTER_TIER_INDEX
    ? rank.masterStars
    : (3 - rank.division) * 100;
  return rank.tierIndex * 10000 + inTier;
}

function updatePeakRank() {
  const current = {
    tierIndex: playerState.tierIndex,
    division: playerState.division,
    masterStars: playerState.masterStars
  };
  const stats = playerState.stats;
  if (!stats.peakRank || rankScore(current) > rankScore(stats.peakRank)) {
    stats.peakRank = { ...current };
  }
  const season = playerState.season;
  if (season && (!season.peak || rankScore(current) > rankScore(season.peak))) {
    season.peak = { ...current };
  }
}

function recordMatchResult(playerWon, isPractice, opponentTier, gold, rubies) {
  const stats = playerState.stats;

  if (isPractice) {
    if (playerWon) stats.practiceWins++; else stats.practiceLosses++;
  } else {
    if (playerWon) {
      stats.rankedWins++;
      stats.currentStreak++;
      stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    } else {
      stats.rankedLosses++;
      stats.currentStreak = 0;
    }
    stats.goldFromBattles += gold;
    stats.rubiesFromBattles += rubies;
    updatePeakRank();
  }
  
  if (!isPractice && playerState.season) {
    if (playerWon) playerState.season.rankedWins = (playerState.season.rankedWins || 0) + 1;
    else playerState.season.rankedLosses = (playerState.season.rankedLosses || 0) + 1;
    playerState.season.goldEarned = (playerState.season.goldEarned || 0) + gold;
    playerState.season.rubiesEarned = (playerState.season.rubiesEarned || 0) + rubies;
  }

  stats.recent.unshift({
    win: !!playerWon,
    mode: isPractice ? 'practice' : 'ranked',
    tier: opponentTier,
    ts: Date.now()
  });
  stats.recent = stats.recent.slice(0, 15);
}

function formatMatchTime(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch (err) {
    return '';
  }
}

const RARITY_BAR_COLORS = {
  Common: 'bg-slate-400',
  Uncommon: 'bg-emerald-500',
  Rare: 'bg-blue-500',
  Epic: 'bg-purple-500',
  Legendary: 'bg-amber-500',
  Mythical: 'bg-rose-500'
};

function careerTile(label, value, sub, valueClass) {
  return `
    <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-0.5">
      <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">${label}</span>
      <span class="font-cinzel text-xl font-black ${valueClass || 'text-slate-100'}">${value}</span>
      ${sub ? `<span class="text-[11px] text-slate-500">${sub}</span>` : ''}
    </div>`;
}

function renderCareerUI() {
  const root = document.getElementById('career-content');
  if (!root) return;
  const s = playerState.stats;
  const season = playerState.season;

  // Header Sub-Tab Navigation Bar
  const navHTML = `
    <div class="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-800">
      <div class="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
        <button onclick="switchCareerSubTab('overview')" class="px-4 py-1.5 rounded-xl text-xs font-bold transition ${careerSubTab === 'overview' ? 'bg-indigo-600 text-white shadow font-cinzel' : 'text-slate-400 hover:text-slate-200'}">
          📊 Lifetime Overview
        </button>
        <button onclick="switchCareerSubTab('seasons')" class="px-4 py-1.5 rounded-xl text-xs font-bold transition ${careerSubTab === 'seasons' ? 'bg-amber-500 text-slate-950 shadow font-cinzel' : 'text-slate-400 hover:text-amber-300'}">
          📜 Past Season Recaps (${season && season.history ? season.history.length : 0})
        </button>
      </div>
      <span class="text-xs text-slate-400 font-mono">Season ${season ? season.number : 1} Ongoing</span>
    </div>
  `;

  if (careerSubTab === 'seasons') {
    root.innerHTML = navHTML + renderPastSeasonsRecapHTML();
    return;
  }

  // STANDARD LIFETIME OVERVIEW
  const rankedGames = s.rankedWins + s.rankedLosses;
  const practiceGames = s.practiceWins + s.practiceLosses;
  const winRate = rankedGames ? `${Math.round((s.rankedWins / rankedGames) * 100)}%` : '—';
  const since = new Date(s.startedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  const owned = playerState.ownedCards;
  const rainbowCount = owned.filter(o => o.isRainbow).length;
  const awakenedCount = owned.filter(o => o.awakened).length;
  const spareCopies = owned.reduce((sum, o) => sum + (o.copies || 0), 0);
  const topLevel = owned.reduce((max, o) => Math.max(max, o.level || 1), 1);
  let rarest = null;
  owned.forEach(o => {
    const base = getCardBaseData(o.cardId);
    if (!rarest || rarityRank(base.rarity) > rarityRank(rarest.rarity)) rarest = base;
  });

  const rarityBars = RARITY_ORDER.map(rarity => {
    const total = CARD_DATABASE.filter(c => c.rarity === rarity).length;
    if (total === 0) return '';
    const have = owned.filter(o => getCardBaseData(o.cardId).rarity === rarity).length;
    const pct = Math.round((have / total) * 100);
    return `
      <div class="flex items-center gap-3 text-xs">
        <span class="w-20 text-slate-400 font-semibold">${rarity}</span>
        <div class="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div class="${RARITY_BAR_COLORS[rarity] || 'bg-slate-400'} h-full transition-all duration-500" style="width:${pct}%"></div>
        </div>
        <span class="w-12 text-right text-slate-300 font-bold">${have}/${total}</span>
      </div>`;
  }).join('');

  const recentHTML = s.recent.length === 0
    ? `<p class="text-xs text-slate-500 py-4 text-center">No matches yet. Play a ranked or practice match and it will show up here.</p>`
    : s.recent.map(m => `
        <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
          <span class="w-6 h-6 rounded-full flex items-center justify-center font-black ${m.win ? 'bg-emerald-600/25 text-emerald-300' : 'bg-rose-600/25 text-rose-300'}">${m.win ? 'W' : 'L'}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${m.mode === 'practice' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'}">${m.mode === 'practice' ? '🎯 Practice' : '🏆 Ranked'}</span>
          <span class="text-slate-300 flex-1">vs ${escapeHtml(TIERS[m.tier] ? TIERS[m.tier].name : 'Unknown')} opponents</span>
          <span class="text-slate-500 text-[11px]">${escapeHtml(formatMatchTime(m.ts))}</span>
        </div>`).join('');

  root.innerHTML = navHTML + `
    <div class="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-5 rounded-3xl border border-indigo-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="text-xs uppercase tracking-widest text-indigo-400 font-bold">Career Record</span>
        <h2 class="font-cinzel text-2xl font-black text-amber-200">${escapeHtml(formatRankName({ tierIndex: playerState.tierIndex, division: playerState.division, masterStars: playerState.masterStars }))}</h2>
        <p class="text-xs text-slate-400 mt-0.5">Commanding since ${escapeHtml(since)}</p>
      </div>
      <div class="text-right">
        <span class="text-xs text-slate-400 block">Total Matches</span>
        <span class="font-cinzel text-3xl font-black text-indigo-300">${rankedGames + practiceGames}</span>
      </div>
    </div>

    <div>
      <h3 class="font-cinzel text-sm font-bold text-slate-300 mb-2">Battle Record</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${careerTile('Ranked Record', `${s.rankedWins}W –${s.rankedLosses}L`, `${rankedGames} ranked matches`, 'text-amber-300')}
        ${careerTile('Win Rate', winRate, 'ranked only', 'text-emerald-300')}
        ${careerTile('Current Streak', s.currentStreak, 'ranked wins in a row', 'text-orange-300')}
        ${careerTile('Best Streak', s.bestStreak, 'ranked wins in a row', 'text-orange-300')}
        ${careerTile('Peak Rank', escapeHtml(formatRankName(s.peakRank)), 'highest reached', 'text-purple-300')}
        ${careerTile('Practice Record', `${s.practiceWins}W –${s.practiceLosses}L`, `${practiceGames} practice matches`, 'text-cyan-300')}
        ${careerTile('Gold from Battles', s.goldFromBattles.toLocaleString(), 'ranked wins', 'text-yellow-300')}
        ${careerTile('Rubies from Battles', s.rubiesFromBattles.toLocaleString(), 'ranked wins', 'text-rose-300')}
      </div>
    </div>

    <div>
      <h3 class="font-cinzel text-sm font-bold text-slate-300 mb-2">Collection & Progress</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        ${careerTile('Cards Owned', `${owned.length} /${CARD_DATABASE.length}`, '', 'text-indigo-300')}
        ${careerTile('Rainbow Cards', rainbowCount, '', 'text-pink-300')}
        ${careerTile('Highest Card Level', topLevel, '', 'text-emerald-300')}
        ${careerTile('Packs Opened', playerState.totalPacksOpened, '', 'text-yellow-300')}
        ${careerTile('Awakened Cards', awakenedCount, `of ${rainbowCount} Rainbow`, 'text-amber-300')}
        ${careerTile('Spare Copies', spareCopies, 'for Enlightenment', 'text-cyan-300')}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5">
          <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Rarest Card Owned</span>
          <div class="mt-1 font-cinzel text-lg font-black text-amber-200">${rarest ? escapeHtml(rarest.name) : '—'}</div>
          <span class="text-[11px] text-slate-500">${rarest ? `${escapeHtml(rarest.rarity)} • ${escapeHtml(rarest.element)}${escapeHtml(rarest.role)}` : ''}</span>
        </div>
        <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2 justify-center">
          ${rarityBars}
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-cinzel text-sm font-bold text-slate-300 mb-2">Recent Matches <span class="text-slate-500 font-sans font-medium text-xs">(last 15)</span></h3>
      <div class="flex flex-col gap-1.5">${recentHTML}</div>
    </div>
  `;
}

function renderPastSeasonsRecapHTML() {
  const history = playerState.season?.history || [];

  if (history.length === 0) {
    return `
      <div class="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-center gap-3">
        <div class="text-4xl">📜</div>
        <h3 class="font-cinzel text-lg font-bold text-slate-200">No Past Seasons Recorded Yet</h3>
        <p class="text-xs text-slate-400 max-w-md leading-relaxed">
          Season ${playerState.season.number} is currently active! Once the 21-day ladder rollover concludes, your complete seasonal statistics, most deployed champions, favorite lineup, and role analytics will be archived here.
        </p>
      </div>
    `;
  }

  const selectedIdx = Math.min(history.length - 1, Math.max(0, selectedRecapSeasonIdx));
  const record = history[selectedIdx];
  const totalGames = (record.rankedWins || 0) + (record.rankedLosses || 0);
  const winRate = totalGames > 0 ? `${Math.round((record.rankedWins / totalGames) * 100)}%` : '—';

  const mvpCard = record.mostUsedCardId ? getCardBaseData(record.mostUsedCardId) : null;
  const mvpElem = mvpCard && ELEMENT_CONFIG[mvpCard.element] ? ELEMENT_CONFIG[mvpCard.element] : null;

  return `
    <div class="flex flex-col gap-5">
      <!-- Season Selector Carousel Bar -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        ${history.map((h, idx) => {
          const isSelected = idx === selectedIdx;
          return `
            <button onclick="selectRecapSeason(${idx})" class="px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 flex items-center gap-2 ${
              isSelected 
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400' 
                : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
            }">
              <span>📜 Season ${h.season}</span>
              <span class="text-[10px] ${isSelected ? 'text-slate-900' : 'text-purple-300'} font-cinzel">(${formatRankName(h.peak)})</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Main Seasonal Showcase Banner -->
      <div class="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 p-6 rounded-3xl border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-cinzel">
              Season ${record.season} Chronicle
            </span>
            <span class="text-xs text-slate-400">Concluded ${new Date(record.endedAt).toLocaleDateString()}</span>
          </div>
          <h2 class="font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
            Peak Rank: ${escapeHtml(formatRankName(record.peak))}
          </h2>
          <p class="text-xs text-slate-300 mt-1 max-w-xl">
            Archived seasonal campaign summary including squad composition telemetry and resource yields.
          </p>
        </div>

        <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-4 shrink-0 shadow-inner">
          <div class="text-center">
            <span class="text-[10px] uppercase text-slate-400 font-bold block">Ranked Record</span>
            <span class="font-cinzel text-sm font-bold text-amber-300">${record.rankedWins}W - ${record.rankedLosses}L</span>
          </div>
          <div class="w-px h-8 bg-slate-800"></div>
          <div class="text-center">
            <span class="text-[10px] uppercase text-slate-400 font-bold block">Win Rate</span>
            <span class="font-cinzel text-sm font-bold text-emerald-400">${winRate}</span>
          </div>
        </div>
      </div>

      <!-- Analytics & Meta Snapshot Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <!-- Most Used Champion -->
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div class="w-14 h-14 rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/40 shrink-0 flex items-center justify-center p-0.5">
            ${mvpCard ? `<img src="${mvpCard.image}" class="w-full h-full object-cover rounded-xl" onerror="this.src='https://placehold.co/100x100/1e293b/94a3b8?text=MVP'">` : '<span class="text-2xl">⭐</span>'}
          </div>
          <div class="overflow-hidden">
            <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Signature Champion</span>
            <h4 class="font-cinzel text-sm font-black text-slate-100 truncate">${mvpCard ? escapeHtml(mvpCard.name) : 'None'}</h4>
            <span class="text-[10px] font-bold text-amber-400">${mvpCard ? `${mvpCard.element} ·${mvpCard.role}` : '—'}</span>
          </div>
        </div>

        <!-- Most Played Role -->
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div class="w-14 h-14 rounded-2xl bg-slate-950 border border-indigo-500/40 shrink-0 flex items-center justify-center text-3xl shadow-inner">
            ${ROLE_ICONS[record.mostUsedRole] || '⚔️'}
          </div>
          <div class="overflow-hidden">
            <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Dominant Role</span>
            <h4 class="font-cinzel text-sm font-black text-indigo-300 truncate">${escapeHtml(record.mostUsedRole || 'Warrior')}</h4>
            <span class="text-[10px] text-slate-400">Most Deployed Class</span>
          </div>
        </div>

        <!-- Dominant Element -->
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div class="w-14 h-14 rounded-2xl bg-slate-950 border border-emerald-500/40 shrink-0 flex items-center justify-center text-3xl shadow-inner">
            ${ELEMENT_CONFIG[record.mostUsedElement]?.icon || '🔥'}
          </div>
          <div class="overflow-hidden">
            <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Primary Resonance</span>
            <h4 class="font-cinzel text-sm font-black text-emerald-300 truncate">${escapeHtml(record.mostUsedElement || 'Fire')} Element</h4>
            <span class="text-[10px] text-slate-400">Favored Squad Element</span>
          </div>
        </div>
      </div>

      <!-- Most Deployed Squad Lineup (6 Cards) -->
      <div class="bg-slate-900/60 p-5 rounded-3xl border border-slate-800 flex flex-col gap-3 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-cinzel text-sm font-bold text-slate-200">Season ${record.season} Signature Vanguard (Most Played Lineup)</h3>
            <p class="text-xs text-slate-400">The 6 champions that saw the highest deployment frequency across this season.</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          ${(record.favoriteLineup || []).map(cardId => {
            const base = getCardBaseData(cardId);
            if (!base) return '';
            const elem = ELEMENT_CONFIG[base.element] || ELEMENT_CONFIG.Fire;
            return `
              <div class="bg-slate-950/80 rounded-2xl border border-slate-800 p-2 flex flex-col items-center text-center gap-1.5 shadow">
                <div class="aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 relative">
                  <img src="${base.image}" onerror="this.src='https://placehold.co/400x500/1e293b/94a3b8?text=${encodeURIComponent(base.name)}'" class="w-full h-full object-cover">
                  <span class="absolute top-1 left-1 ${elem.badgeBg} ${elem.text} text-[8px] font-black px-1.5 py-0.2 rounded border${elem.border}">${elem.icon}${base.element}</span>
                </div>
                <div class="w-full overflow-hidden">
                  <span class="font-cinzel text-xs font-bold text-slate-200 truncate block">${escapeHtml(base.name)}</span>
                  <span class="text-[9px] text-slate-400">${base.role}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Economic Payouts & Rewards Earned -->
      <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span class="text-slate-400 font-semibold">Total Spoils Claimed During Season ${record.season}:</span>
        <div class="flex items-center gap-4">
          <span class="font-bold text-yellow-300 flex items-center gap-1"><span>💰</span> <span>+${(record.totalGoldEarned || record.gold).toLocaleString()} Gold</span></span>
          <span class="font-bold text-rose-300 flex items-center gap-1"><span>💎</span> <span>+${(record.totalRubiesEarned || record.rubies).toLocaleString()} Rubies</span></span>
        </div>
      </div>
    </div>
  `;
}

function updateMatchModeBadge() {
  const badge = document.getElementById('match-mode-badge');
  if (!badge) return;
  if (battleEngine.matchMode === 'practice') {
    const tierName = TIERS[battleEngine.practiceTier] ? TIERS[battleEngine.practiceTier].name : '';
    badge.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40";
    badge.innerText = `🎯 Practice • ${tierName} opponents`;
  } else if (battleEngine.matchMode === 'spire') {
    const floor = (typeof spireState !== 'undefined') ? spireState.currentFloor : 1;
    badge.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm";
    badge.innerText = `🏰 Abyssal Spire • Floor ${floor}`;
  } else {
    badge.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40";
    badge.innerText = "🏆 Ranked";
  }
}

// Automatically drafts the best 12 owned champions into an expedition battalion
function startDefaultSpireExpedition() {
  if (typeof initSpireExpedition !== 'function') return;

  const owned = [...playerState.ownedCards];
  const equippedSet = new Set(playerState.equippedDeckIds);

  // Sort: Equipped deck first, then highest combat power
  owned.sort((a, b) => {
    const aEq = equippedSet.has(a.cardId) ? 1 : 0;
    const bEq = equippedSet.has(b.cardId) ? 1 : 0;
    if (aEq !== bEq) return bEq - aEq;
    return getCardCombatPower(b.cardId, b.isRainbow, b.level, b) - getCardCombatPower(a.cardId, a.isRainbow, a.level, a);
  });

  const chosenIds = [];
  for (const o of owned) {
    if (!chosenIds.includes(o.cardId)) chosenIds.push(o.cardId);
    if (chosenIds.length === 12) break;
  }

  // Fallback to database cards if fewer than 12 cards are owned
  if (chosenIds.length < 12 && typeof CARD_DATABASE !== 'undefined') {
    for (const c of CARD_DATABASE) {
      if (!chosenIds.includes(c.id)) chosenIds.push(c.id);
      if (chosenIds.length === 12) break;
    }
  }

  const success = initSpireExpedition(chosenIds);
  if (success) {
    const startPanel = document.getElementById('spire-start-panel');
    const activePanel = document.getElementById('spire-active-panel');
    if (startPanel) startPanel.classList.add('hidden');
    if (activePanel) activePanel.classList.remove('hidden');
    playSound('rainbow');
  }
}

let practiceTierChosen = false;

function updatePracticeTierHint() {
  const select = document.getElementById('practice-tier-select');
  const hint = document.getElementById('practice-tier-hint');
  if (!select || !hint) return;

  const rawVal = select.value !== "" ? Number(select.value) : (playerState.tierIndex || 0);
  const tierIdx = Math.min(Math.max(0, rawVal), (typeof TIERS !== 'undefined' ? TIERS.length - 1 : 0));

  const weights = (typeof ENEMY_TIER_RARITY_WEIGHTS !== 'undefined' && ENEMY_TIER_RARITY_WEIGHTS[tierIdx]) 
    ? ENEMY_TIER_RARITY_WEIGHTS[tierIdx] 
    : {};

  const parts = (typeof RARITY_ORDER !== 'undefined' ? RARITY_ORDER : [])
    .filter(r => weights[r] > 0)
    .map(r => `${r} ${weights[r]}%`);

  const scaling = (typeof ENEMY_TIER_SCALING !== 'undefined' && ENEMY_TIER_SCALING[tierIdx])
    ? ENEMY_TIER_SCALING[tierIdx]
    : { levels: [1, 5], enlightenment: [0, 0], awakenChance: 0, sigilAlphaChance: 0, sigilOmegaChance: 0 };

  const extras = [
    `Levels ${scaling.levels[0]}–${scaling.levels[1]}`,
    `${Math.round(getEnemyRainbowChance(tierIdx) * 100)}% Rainbow`
  ];

  if (scaling.enlightenment && scaling.enlightenment[1] > 0) {
    extras.push(`Enlightenment E${scaling.enlightenment[0]}–${scaling.enlightenment[1]}`);
  }
  if (scaling.awakenChance > 0) {
    extras.push(`${Math.round(scaling.awakenChance * 100)}% Awakened`);
  }

  // Sigil Threat Level description
  if ((scaling.sigilAlphaChance || 0) > 0) {
    extras.push(`🔯 ${Math.round(scaling.sigilAlphaChance * 100)}% Alpha Sigils`);
  }
  if ((scaling.sigilOmegaChance || 0) > 0) {
    extras.push(`⚡ ${Math.round(scaling.sigilOmegaChance * 100)}% Omega Dual-Sigils`);
  }

  hint.innerText = `Enemy card rarity mix: ${parts.join(' • ')}\n${extras.join(' • ')}`;
}

function onPracticeTierChange() {
  practiceTierChosen = true;
  updatePracticeTierHint();
}

function initPracticeModal() {
  const select = document.getElementById('practice-tier-select');
  if (!select) return;
  select.innerHTML = TIERS.map((tier, i) => `<option value="${i}">${tier.name}</option>`).join('');
  select.value = String(playerState.tierIndex);
  updatePracticeTierHint();
}

function openPracticeModal() {
  const modal = document.getElementById('practice-modal');
  const select = document.getElementById('practice-tier-select');
  const alertBox = document.getElementById('practice-modal-alert');
  if (!modal) return;

  if (alertBox) alertBox.classList.add('hidden');

  if (select && typeof TIERS !== 'undefined') {
    const previous = select.value;
    select.innerHTML = TIERS.map((tier, i) =>
      `<option value="${i}">${tier.name}${i === playerState.tierIndex ? ' (your rank)' : ''}</option>`
    ).join('');

    const targetVal = (practiceTierChosen && previous !== "" && TIERS[Number(previous)])
      ? previous
      : String(playerState.tierIndex || 0);

    select.value = targetVal;
  }

  updatePracticeTierHint();
  modal.classList.remove('hidden');
}

function closePracticeModal() {
  const modal = document.getElementById('practice-modal');
  if (modal) modal.classList.add('hidden');
}

function startPracticeMatch() {
  const select = document.getElementById('practice-tier-select');
  const alertBox = document.getElementById('practice-modal-alert');
  if (playerState.equippedDeckIds.length < 6) {
    if (alertBox) {
      alertBox.innerText = "Equip all 6 cards in the Deck tab before starting a match.";
      alertBox.classList.remove('hidden');
    }
    return;
  }
  const tier = select ? Number(select.value) : playerState.tierIndex;
  closePracticeModal();
  switchTab('battle');
  startNewBattleMatch('practice', tier);
}

let pendingPresetDelete = -1;
let presetMsgTimer = null;

function showPresetMessage(text, tone) {
  const el = document.getElementById('deck-preset-msg');
  if (!el) return;
  el.innerText = text;
  el.className = 'text-[11px] font-semibold ' +
    (tone === 'error' ? 'text-rose-400' : tone === 'ok' ? 'text-emerald-400' : 'text-slate-400');
  clearTimeout(presetMsgTimer);
  presetMsgTimer = setTimeout(() => { el.innerText = ''; }, 3500);
}

function renderDeckPresetsUI() {
  const grid = document.getElementById('deck-presets-grid');
  if (!grid) return;

  const canSave = playerState.equippedDeckIds.length === 6;
  const equippedKey = [...playerState.equippedDeckIds].sort().join('|');

  grid.innerHTML = playerState.deckPresets.map((preset, i) => {
    if (!preset) {
      return `
        <div class="rounded-2xl border-2 border-dashed border-slate-800 p-2.5 flex flex-col items-center justify-center gap-2 min-h-[118px]">
          <span class="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Empty Slot ${i + 1}</span>
          <button onclick="saveDeckPreset(${i})" ${canSave ? '' : 'disabled'} class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 text-[11px] font-semibold transition disabled:opacity-40 disabled:pointer-events-none">
            💾 Save current deck
          </button>
        </div>`;
    }

    const isActive = canSave && [...preset.ids].sort().join('|') === equippedKey;
    const pips = preset.ids.map(id => {
      const base = getCardBaseData(id);
      const elem = ELEMENT_CONFIG[base.element] || ELEMENT_CONFIG.Fire;
      return `<span title="${escapeHtml(base.name)}">${elem.icon}</span>`;
    }).join('');
    const isPendingDelete = pendingPresetDelete === i;

    return `
      <div class="rounded-2xl border ${isActive ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-800 bg-slate-900/70'} p-2.5 flex flex-col gap-2">
        <input type="text" maxlength="20" value="${escapeHtml(preset.name)}" onchange="renameDeckPreset(${i}, this.value)" aria-label="Preset name"
          class="select-text w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-lg px-2 py-1 text-xs font-bold text-slate-100">
        <div class="flex items-center justify-between text-[11px]">
          <span class="tracking-widest">${pips}</span>
          <span class="font-bold text-indigo-300">${calculateTeamPower(preset.ids)} CP</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="loadDeckPreset(${i})" ${isActive ? 'disabled' : ''} class="flex-1 py-1 rounded-lg ${isActive ? 'bg-indigo-950 text-indigo-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white'} text-[11px] font-semibold transition disabled:pointer-events-none">
            ${isActive ? '✓ Equipped' : 'Load'}
          </button>
          <button onclick="saveDeckPreset(${i})" ${canSave ? '' : 'disabled'} title="Overwrite with your current deck" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] transition disabled:opacity-40 disabled:pointer-events-none">💾</button>
          <button onclick="deleteDeckPreset(${i})" title="Delete preset" class="px-2 py-1 rounded-lg text-[11px] font-semibold transition ${isPendingDelete ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-rose-700 text-slate-300'}">${isPendingDelete ? 'Sure?' : '🗑'}</button>
        </div>
      </div>`;
  }).join('');
}

function saveDeckPreset(index) {
  if (playerState.equippedDeckIds.length !== 6) {
    showPresetMessage('Fill all 6 deck slots before saving a preset.', 'error');
    return;
  }
  const existing = playerState.deckPresets[index];
  const name = existing ? existing.name : `Deck ${index + 1}`;
  playerState.deckPresets[index] = { name, ids: [...playerState.equippedDeckIds] };
  pendingPresetDelete = -1;
  renderDeckBuilderUI();
  showPresetMessage(`Saved current deck to "${name}".`, 'ok');
}

function loadDeckPreset(index) {
  const preset = playerState.deckPresets[index];
  if (!preset) return;
  const ownedIds = new Set(playerState.ownedCards.map(o => o.cardId));
  const usable = preset.ids.filter(id => ownedIds.has(id)).slice(0, 6);
  if (usable.length === 0) {
    showPresetMessage('None of the cards in this preset are owned.', 'error');
    return;
  }
  playerState.equippedDeckIds = usable;
  pendingPresetDelete = -1;
  renderDeckBuilderUI();
  if (usable.length < preset.ids.length) {
    showPresetMessage(`Loaded "${preset.name}", but ${preset.ids.length - usable.length} card(s) are no longer owned.`, 'error');
  } else {
    showPresetMessage(`Loaded "${preset.name}".`, 'ok');
  }
}

function renameDeckPreset(index, value) {
  const preset = playerState.deckPresets[index];
  if (!preset) return;
  preset.name = (value || '').trim().slice(0, 20) || `Deck ${index + 1}`;
  renderDeckPresetsUI();
  scheduleSave();
}

function deleteDeckPreset(index) {
  if (!playerState.deckPresets[index]) return;
  if (pendingPresetDelete !== index) {
    pendingPresetDelete = index;
    renderDeckPresetsUI();
    setTimeout(() => {
      if (pendingPresetDelete === index) {
        pendingPresetDelete = -1;
        renderDeckPresetsUI();
      }
    }, 3000);
    return;
  }
  const name = playerState.deckPresets[index].name;
  playerState.deckPresets[index] = null;
  pendingPresetDelete = -1;
  renderDeckBuilderUI();
  showPresetMessage(`Deleted "${name}".`, 'ok');
}

const CARD_VIEW_DEFAULTS = { search: '', element: 'All', rarity: 'All', role: 'All', status: 'All', sort: 'default' };
const cardViews = {
  vault: { ...CARD_VIEW_DEFAULTS },
  collection: { ...CARD_VIEW_DEFAULTS }
};

const CARD_SORT_OPTIONS = [
  ['default', 'Sort: Default'],
  ['rarity_desc', 'Rarity: High → Low'],
  ['rarity_asc', 'Rarity: Low → High'],
  ['cp_desc', 'Power: High → Low'],
  ['cp_asc', 'Power: Low → High'],
  ['level_desc', 'Level: High → Low'],
  ['name_asc', 'Name: A → Z'],
  ['element', 'Element']
];

const CARD_STATUS_OPTIONS = {
  vault: [['All', 'All cards'], ['Equipped', 'Equipped'], ['Benched', 'Not equipped'], ['Rainbow', 'Rainbow'], ['Awakened', 'Awakened'], ['Normal', 'Not rainbow']],
  collection: [['All', 'Owned & unowned'], ['Owned', 'Owned'], ['Unowned', 'Unowned'], ['Rainbow', 'Rainbow'], ['Awakened', 'Awakened']]
};

// ... existing code ...
function buildCardToolbarHTML(view) {
  const select = (field, options) => `
    <select id="${view}-f-${field}" onchange="setCardView('${view}', '${field}', this.value)" aria-label="${field}"
      class="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:border-indigo-500 focus:outline-none">
      ${options.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}
    </select>`;

  const roles = [...new Set(CARD_DATABASE.map(c => c.role))].sort();

  return `
    <div class="flex flex-wrap items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-2.5">
      <input id="${view}-f-search" type="search" placeholder="Search name or skill..." oninput="setCardView('${view}', 'search', this.value)"
        class="select-text flex-1 min-w-[140px] bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:outline-none rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600">
      ${select('element', [['All', 'All elements'], ...Object.keys(ELEMENT_CONFIG).map(e => [e, `${ELEMENT_CONFIG[e].icon} ${e}`])])}
      ${select('rarity', [['All', 'All rarities'], ...RARITY_ORDER.map(r => [r, r])])}
      ${select('role', [['All', 'All roles'], ...roles.map(r => [r, r])])}
      ${select('status', CARD_STATUS_OPTIONS[view])}
      ${select('sort', CARD_SORT_OPTIONS)}
      <button onclick="resetCardView('${view}')" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition">Reset</button>
      <span id="${view}-count" class="text-[11px] text-slate-500 ml-auto"></span>
    </div>`;
}

function syncCardToolbar(view) {
  const st = cardViews[view];
  ['search', 'element', 'rarity', 'role', 'status', 'sort'].forEach(field => {
    const el = document.getElementById(`${view}-f-${field}`);
    if (el) el.value = st[field];
  });
}

function initCardToolbars() {
  ['vault', 'collection'].forEach(view => {
    const container = document.getElementById(`${view}-toolbar`);
    if (!container) return;
    container.innerHTML = buildCardToolbarHTML(view);
    syncCardToolbar(view);
  });
}

function refreshCardView(view) {
  if (view === 'vault') renderDeckBuilderUI();
  else renderCollectionUI();
}

function setCardView(view, field, value) {
  cardViews[view][field] = value;
  refreshCardView(view);
}

function resetCardView(view) {
  cardViews[view] = { ...CARD_VIEW_DEFAULTS };
  syncCardToolbar(view);
  refreshCardView(view);
}

function updateCardViewCount(view, shown, total) {
  const el = document.getElementById(`${view}-count`);
  if (el) el.innerText = shown === total ? `${total} cards` : `Showing ${shown} of ${total}`;
}

function cardViewEmptyHTML(view) {
  return `
    <div class="col-span-full text-center py-10 text-slate-500 text-sm">
      No cards match these filters.
      <button onclick="resetCardView('${view}')" class="text-indigo-400 hover:text-indigo-300 underline font-semibold ml-1">Clear filters</button>
    </div>`;
}

function getCardViewEntries(view) {
  const st = cardViews[view];
  const query = st.search.trim().toLowerCase();

  let entries = view === 'vault'
    ? playerState.ownedCards.map(o => ({ base: getCardBaseData(o.cardId), owned: o }))
    : CARD_DATABASE.map(b => ({ base: b, owned: playerState.ownedCards.find(o => o.cardId === b.id) || null }));

  entries = entries.filter(({ base, owned }) => {
    if (st.element !== 'All' && base.element !== st.element) return false;
    if (st.rarity !== 'All' && base.rarity !== st.rarity) return false;
    if (st.role !== 'All' && base.role !== st.role) return false;

    if (st.status === 'Equipped' && !playerState.equippedDeckIds.includes(base.id)) return false;
    if (st.status === 'Benched' && playerState.equippedDeckIds.includes(base.id)) return false;
    if (st.status === 'Rainbow' && !(owned && owned.isRainbow)) return false;
    if (st.status === 'Awakened' && !(owned && owned.awakened)) return false;
    if (st.status === 'Normal' && owned && owned.isRainbow) return false;
    if (st.status === 'Owned' && !owned) return false;
    if (st.status === 'Unowned' && owned) return false;

    if (query) {
      const haystack = [base.name, base.skillName, base.chargeSkillName].join(' ').toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  entries.forEach(e => {
    e.level = e.owned ? (e.owned.level || 1) : 0;
    e.cp = getCardCombatPower(e.base.id, e.owned ? e.owned.isRainbow : false, e.owned ? e.owned.level : 1, e.owned);
  });

  const byName = (a, b) => a.base.name.localeCompare(b.base.name);
  const sorters = {
    default: view === 'collection' ? (a, b) => rarityRank(b.base.rarity) - rarityRank(a.base.rarity) || byName(a, b) : null,
    rarity_desc: (a, b) => rarityRank(b.base.rarity) - rarityRank(a.base.rarity) || byName(a, b),
    rarity_asc: (a, b) => rarityRank(a.base.rarity) - rarityRank(b.base.rarity) || byName(a, b),
    cp_desc: (a, b) => b.cp - a.cp || byName(a, b),
    cp_asc: (a, b) => a.cp - b.cp || byName(a, b),
    level_desc: (a, b) => b.level - a.level || b.cp - a.cp || byName(a, b),
    name_asc: byName,
    element: (a, b) => a.base.element.localeCompare(b.base.element) || byName(a, b)
  };
  const sorter = sorters[st.sort];
  if (sorter) entries.sort(sorter);

  return entries;
}

function getAwakeningStep(owned) {
  if (!owned || !owned.isRainbow) return null;
  if (owned.awakened) return { done: true };
  const level = Math.min(MAX_ENLIGHTENMENT, owned.enlightenment || 0);
  if (level < MAX_ENLIGHTENMENT) {
    const cost = ENLIGHTENMENT_COSTS[level];
    return { kind: 'enlighten', toLevel: level + 1, copies: cost.copies, rubies: cost.rubies };
  }
  return { kind: 'awaken', toLevel: MAX_ENLIGHTENMENT, copies: AWAKENING_COST.copies, rubies: AWAKENING_COST.rubies };
}

function enlightenCard(cardId) {
  const owned = playerState.ownedCards.find(o => o.cardId === cardId);
  const step = getAwakeningStep(owned);
  if (!step || step.done) return false;
  if ((owned.copies || 0) < step.copies || playerState.rubies < step.rubies) return false;

  owned.copies -= step.copies;
  playerState.rubies -= step.rubies;
  if (step.kind === 'awaken') owned.awakened = true;
  else owned.enlightenment = step.toLevel;

  playSound('rainbow');
  updateTopCurrencyUI();
  renderDeckBuilderUI();
  openCardModalFor(cardId, true);
  return true;
}

function openCardModalFor(cardId, focusActions) {
  const owned = playerState.ownedCards.find(o => o.cardId === cardId);
  const stats = calculateCardStats(cardId, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
  openCardModal(registerCard(stats));
  if (focusActions) {
    const actions = document.getElementById('card-modal-actions');
    if (actions) actions.scrollIntoView({ block: 'end' });
  }
}

function renderAwakeningPanelHTML(owned) {
  const enlightenment = owned.enlightenment || 0;
  const copies = owned.copies || 0;
  const step = getAwakeningStep(owned);
  const pct = v => Math.round(v * 100);
  const currentBonus = pct(enlightenment * ENLIGHTENMENT_BONUS_PER_LEVEL) + (owned.awakened ? pct(AWAKENING_BONUS) : 0);

  const pips = Array.from({ length: MAX_ENLIGHTENMENT }, (_, i) =>
    `<span class="flex-1 h-2 rounded-full ${i < enlightenment ? 'bg-gradient-to-r from-cyan-400 to-pink-400' : 'bg-slate-800'}"></span>`
  ).join('');

  let action;
  if (step.done) {
    action = `<div class="text-center text-xs font-black text-amber-300 py-2 bg-amber-950/40 border border-amber-500/40 rounded-lg">★ Fully Awakened</div>`;
  } else {
    const haveCopies = copies >= step.copies;
    const haveRubies = playerState.rubies >= step.rubies;
    const canDo = haveCopies && haveRubies;
    const isAwaken = step.kind === 'awaken';
    const effect = isAwaken
      ? `+${pct(AWAKENING_BONUS)}% PV & DEF and a golden Awakened aura`
      : `+${pct(ENLIGHTENMENT_BONUS_PER_LEVEL)}% PV & DEF`;
    const needsCopiesHint = !haveCopies && !BANK_COPY_ON_LEVEL_UP && (owned.level || 1) < MAX_CARD_LEVEL
      ? `<p class="text-[10px] text-slate-500 leading-snug">Duplicates level this card up first (now Lv.${owned.level || 1}/${MAX_CARD_LEVEL}). Once it reaches Lv.${MAX_CARD_LEVEL}, extra duplicates are kept as spare copies.</p>`
      : '';

    action = `
      <div class="flex flex-col gap-1 text-[11px]">
        <div class="flex justify-between"><span class="text-slate-400">Next: <b class="${isAwaken ? 'text-amber-300' : 'text-cyan-300'}">${isAwaken ? '★ Awakening' : `Enlightenment ${enlightenment} → ${step.toLevel}`}</b></span><span class="text-slate-500">${effect}</span></div>
        <div class="flex justify-between"><span class="text-slate-400">🃏 Duplicates</span><span class="font-bold ${haveCopies ? 'text-emerald-300' : 'text-rose-400'}">${copies} / ${step.copies}</span></div>
        <div class="flex justify-between"><span class="text-slate-400">💎 Rubies</span><span class="font-bold ${haveRubies ? 'text-emerald-300' : 'text-rose-400'}">${playerState.rubies} / ${step.rubies}</span></div>
      </div>
      <button onclick="enlightenCard('${owned.cardId}')" ${canDo ? '' : 'disabled'}
        class="w-full py-2 rounded-lg text-xs font-bold transition disabled:opacity-40 disabled:pointer-events-none ${isAwaken ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400' : 'bg-gradient-to-r from-cyan-600 to-pink-600 text-white hover:from-cyan-500 hover:to-pink-500'}">
        ${isAwaken ? '★ Awaken' : `✦ Enlighten to E${step.toLevel}`}
      </button>
      ${needsCopiesHint}`;
  }

  return `
    <div class="bg-slate-950/80 border border-cyan-800/40 rounded-xl p-3 flex flex-col gap-2">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-cyan-300">✦ Enlightenment</span>
        <span class="font-black text-slate-200">E${enlightenment}/${MAX_ENLIGHTENMENT}${owned.awakened ? ' ★' : ''}</span>
      </div>
      <div class="flex gap-1">${pips}</div>
      <div class="flex justify-between text-[11px] text-slate-400"><span>Bonus: <b class="text-emerald-300">+${currentBonus}% PV & DEF</b></span><span>Spare copies: <b class="text-slate-200">${copies}</b></span></div>
      ${action}
    </div>`;
}

const SEASON_LENGTH_DAYS = 21;
const SEASON_LENGTH_MS = SEASON_LENGTH_DAYS * 24 * 60 * 60 * 1000;
const SEASON_RESET_TIER_DROP = 2;

const SEASON_REWARDS = [
  { gold: 300,  rubies: 10 },
  { gold: 500,  rubies: 20 },
  { gold: 800,  rubies: 40 },
  { gold: 1200, rubies: 70 },
  { gold: 1800, rubies: 110 },
  { gold: 2600, rubies: 160 },
  { gold: 3600, rubies: 220 },
  { gold: 5000, rubies: 300 },
  { gold: 7500, rubies: 400 }
];

function sanitizeRank(rank) {
  if (!rank || typeof rank !== 'object') return null;
  const n = (v, d) => (typeof v === 'number' && isFinite(v)) ? v : d;
  return {
    tierIndex: Math.min(MASTER_TIER_INDEX, Math.max(0, Math.floor(n(rank.tierIndex, 0)))),
    division: Math.min(3, Math.max(1, Math.floor(n(rank.division, 3)))),
    masterStars: Math.max(0, Math.floor(n(rank.masterStars, 0)))
  };
}

function getSeasonReward(rank) {
  return SEASON_REWARDS[Math.min(rank.tierIndex, SEASON_REWARDS.length - 1)];
}

function getRankAfterSeasonReset() {
  return { tierIndex: Math.max(0, playerState.tierIndex - SEASON_RESET_TIER_DROP), division: 3, masterStars: 0 };
}

function isBattleViewActive() {
  const view = document.getElementById('view-battle');
  return !!view && !view.classList.contains('hidden');
}

function formatSeasonRemaining(ms) {
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${Math.max(1, minutes)}m`;
}

function getSeasonTiming(now) {
  const season = playerState.season;
  const end = season.startAt + SEASON_LENGTH_MS;
  const remaining = Math.max(0, Math.min(SEASON_LENGTH_MS, end - (now || Date.now())));
  return { end, remaining, progress: 1 - remaining / SEASON_LENGTH_MS };
}

function checkSeasonRollover(now) {
  const season = playerState.season;
  now = now || Date.now();
  if (!season || now < season.startAt + SEASON_LENGTH_MS) return false;
  if (isBattleViewActive()) return false;

  const seasonsPassed = Math.floor((now - season.startAt) / SEASON_LENGTH_MS);
  const endedNumber = season.number;
  const peak = season.peak || { tierIndex: playerState.tierIndex, division: playerState.division, masterStars: playerState.masterStars };
  const reward = getSeasonReward(peak);

  playerState.gold += reward.gold;
  playerState.rubies += reward.rubies;

  const newRank = getRankAfterSeasonReset();
  playerState.tierIndex = newRank.tierIndex;
  playerState.division = newRank.division;
  playerState.stars = 0;
  playerState.masterStars = 0;
  playerState.inPromotion = false;
  playerState.promoWins = 0;
  playerState.promoLosses = 0;

  // Calculate MVP analytics
  const sortedCards = Object.entries(season.cardUsage || {}).sort((a, b) => b[1] - a[1]);
  const sortedRoles = Object.entries(season.roleUsage || {}).sort((a, b) => b[1] - a[1]);
  const sortedElems = Object.entries(season.elementUsage || {}).sort((a, b) => b[1] - a[1]);

  const mostUsedCard = sortedCards[0] ? sortedCards[0][0] : (playerState.equippedDeckIds[0] || null);
  const mostUsedRole = sortedRoles[0] ? sortedRoles[0][0] : "Warrior";
  const mostUsedElem = sortedElems[0] ? sortedElems[0][0] : "Fire";
  const topLineup = sortedCards.slice(0, 6).map(c => c[0]);

  // Archive full seasonal chronicle
  season.history.unshift({
    season: endedNumber,
    peak: { ...peak },
    gold: reward.gold,
    rubies: reward.rubies,
    totalGoldEarned: (season.goldEarned || 0) + reward.gold,
    totalRubiesEarned: (season.rubiesEarned || 0) + reward.rubies,
    rankedWins: season.rankedWins || 0,
    rankedLosses: season.rankedLosses || 0,
    mostUsedCardId: mostUsedCard,
    mostUsedRole: mostUsedRole,
    mostUsedElement: mostUsedElem,
    favoriteLineup: topLineup.length === 6 ? topLineup : [...playerState.equippedDeckIds],
    endedAt: season.startAt + SEASON_LENGTH_MS
  });
  season.history = season.history.slice(0, 15);

  season.number += seasonsPassed;
  season.startAt += seasonsPassed * SEASON_LENGTH_MS;
  season.peak = { ...newRank };
  season.rankedWins = 0;
  season.rankedLosses = 0;
  season.goldEarned = 0;
  season.rubiesEarned = 0;
  season.cardUsage = {};
  season.roleUsage = {};
  season.elementUsage = {};

  updateTopCurrencyUI();
  updateRankedLadderUI();
  renderHomeUI();
  showSeasonEndModal({
    ended: endedNumber,
    next: season.number,
    peak,
    reward,
    newRank,
    skipped: seasonsPassed - 1
  });
  return true;
}

function showSeasonEndModal(info) {
  const set = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };
  set('season-modal-title', `Season ${info.ended} Complete`);
  set('season-modal-peak', formatRankName(info.peak));
  set('season-modal-gold', `+${info.reward.gold.toLocaleString()}`);
  set('season-modal-rubies', `+${info.reward.rubies.toLocaleString()}`);
  set('season-modal-reset', `Your rank has been reset to ${formatRankName(info.newRank)}.`);
  set('season-modal-skipped', info.skipped > 0
    ? `You were away for ${info.skipped} extra season${info.skipped > 1 ? 's' : ''}. Only the season you last played pays out.`
    : '');
  set('season-modal-next', `Start Season ${info.next}`);
  const modal = document.getElementById('season-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSeasonModal() {
  const modal = document.getElementById('season-modal');
  if (modal) modal.classList.add('hidden');
}

function updateSeasonBadge() {
  const badge = document.getElementById('home-season-badge');
  if (!badge || !playerState.season) return;
  badge.innerText = `Season ${playerState.season.number} • ${formatSeasonRemaining(getSeasonTiming().remaining)} left`;
}

function renderSeasonUI() {
  const root = document.getElementById('season-card');
  const season = playerState.season;
  if (!root || !season) return;

  const timing = getSeasonTiming();
  const peak = season.peak || { tierIndex: playerState.tierIndex, division: playerState.division, masterStars: playerState.masterStars };
  const reward = getSeasonReward(peak);
  const afterReset = getRankAfterSeasonReset();
  const endDate = new Date(timing.end).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  const rewardRows = TIERS.map((tier, i) => `
    <tr class="${i === peak.tierIndex ? 'bg-amber-500/10' : ''}">
      <td class="py-1.5 px-3 font-semibold ${tier.color}">${tier.name}${i === peak.tierIndex ? ' <span class="text-[10px] text-amber-300">(your peak)</span>' : ''}</td>
      <td class="py-1.5 px-3 text-yellow-400">${SEASON_REWARDS[i].gold.toLocaleString()}</td>
      <td class="py-1.5 px-3 text-rose-400">${SEASON_REWARDS[i].rubies}</td>
    </tr>`).join('');

  const historyHTML = season.history.length === 0
    ? ''
    : `<div class="flex flex-col gap-1.5">
        <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Past Seasons</span>
        ${season.history.slice(0, 5).map(h => `
          <div class="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            <span class="font-bold text-slate-200">Season ${h.season}</span>
            <span class="text-slate-400">Peak <b class="text-purple-300">${escapeHtml(formatRankName(h.peak))}</b></span>
            <span class="text-yellow-300">+${h.gold.toLocaleString()} 💰</span>
            <span class="text-rose-300">+${h.rubies} 💎</span>
          </div>`).join('')}
      </div>`;

  root.innerHTML = `
    <div class="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-xl flex flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="text-xs uppercase tracking-widest text-amber-400 font-bold">Ladder Season</span>
          <h3 class="font-cinzel text-xl font-black text-amber-200">Season ${season.number}</h3>
        </div>
        <div class="text-right">
          <span class="text-xs text-slate-400 block">Ends in (${escapeHtml(endDate)})</span>
          <span class="font-cinzel text-lg font-black text-amber-300">${formatSeasonRemaining(timing.remaining)}</span>
        </div>
      </div>

      <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div class="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-500" style="width:${Math.round(timing.progress * 100)}%"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-3">
          <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Season Peak</span>
          <div class="font-cinzel text-base font-black text-purple-300 mt-0.5">${escapeHtml(formatRankName(peak))}</div>
        </div>
        <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-3">
          <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Rewards at Season End</span>
          <div class="text-sm font-bold mt-0.5"><span class="text-yellow-300">${reward.gold.toLocaleString()} 💰</span> <span class="text-rose-300 ml-1">${reward.rubies} 💎</span></div>
        </div>
        <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-3">
          <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Rank After Reset</span>
          <div class="font-cinzel text-base font-black text-slate-100 mt-0.5">${escapeHtml(formatRankName(afterReset))}</div>
        </div>
      </div>

      <details class="text-xs">
        <summary class="cursor-pointer text-indigo-400 hover:text-indigo-300 font-semibold">How seasons work &amp; all rewards</summary>
        <p class="text-slate-400 mt-2 leading-relaxed">
          Every ${SEASON_LENGTH_DAYS} days the season ends. You are paid based on the highest tier you reached that season, then your rank drops ${SEASON_RESET_TIER_DROP} tiers (never below Bronze) so a new climb begins. Cards, Gold and Rubies are never reset.
        </p>
        <table class="w-full text-left mt-2">
          <thead class="text-slate-400 uppercase bg-slate-950/60"><tr><th class="py-1.5 px-3">Peak Tier</th><th class="py-1.5 px-3">Gold</th><th class="py-1.5 px-3">Rubies</th></tr></thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-300">${rewardRows}</tbody>
        </table>
      </details>

      ${historyHTML}
    </div>`;
}

function startSeasonTimer() {
  setInterval(() => {
    if (isBattleViewActive()) return;
    checkSeasonRollover();
    updateSeasonBadge();
    const ladder = document.getElementById('view-ranked');
    if (ladder && !ladder.classList.contains('hidden')) renderSeasonUI();
  }, 60000);
}

const DEV_GOLD_AMOUNT = 1000000000;
const DEV_RUBY_AMOUNT = 1000000;

function showDevToolsStatus(text) {
  const el = document.getElementById('dev-tools-status');
  if (!el) return;
  el.innerText = text;
  el.classList.remove('hidden');
}

function refreshAfterDevAction() {
  updateTopCurrencyUI();
  renderDeckBuilderUI();
  renderCollectionUI();
  renderHomeUI();
  renderGachaUI();
  renderCareerUI();
  if (typeof renderRelicLoadoutUI === 'function') renderRelicLoadoutUI();
  if (typeof renderRelicCollectionUI === 'function') renderRelicCollectionUI();
  if (typeof renderSummonLoadoutUI === 'function') renderSummonLoadoutUI();
  if (typeof renderSummonGrimoireUI === 'function') renderSummonGrimoireUI();
  if (typeof renderSigilCollectionUI === 'function') renderSigilCollectionUI();
  saveGameNow();
}

function devAcquireAllCards() {
  const ownedIds = new Set(playerState.ownedCards.map(o => o.cardId));
  let added = 0;
  CARD_DATABASE.forEach(card => {
    if (ownedIds.has(card.id)) return;
    playerState.ownedCards.push({ cardId: card.id, isRainbow: false, level: 1, copies: 0, enlightenment: 0, awakened: false });
    added++;
  });
  refreshAfterDevAction();
  showDevToolsStatus(added > 0
    ? `Added ${added} new card${added > 1 ? 's' : ''}. You now own all ${CARD_DATABASE.length}.`
    : `You already own all ${CARD_DATABASE.length} cards.`);
  return added;
}

function devAcquireAllSummons() {
  if (typeof SUMMON_DATABASE === 'undefined') return 0;
  playerState.ownedSummons = playerState.ownedSummons || [];
  const ownedIds = new Set(playerState.ownedSummons.map(s => s.summonId));
  let added = 0;
  SUMMON_DATABASE.forEach(s => {
    if (!ownedIds.has(s.id)) {
      playerState.ownedSummons.push({ summonId: s.id });
      added++;
    }
  });
  refreshAfterDevAction();
  showDevToolsStatus(added > 0
    ? `Acquired ${added} new Primal Summon${added > 1 ? 's' : ''}. You now own all ${SUMMON_DATABASE.length}.`
    : `You already own all ${SUMMON_DATABASE.length} Primal Summons.`);
  return added;
}

function devAcquireAllRelics() {
  if (typeof RELIC_DATABASE === 'undefined') return 0;
  if (typeof ensureRelicPlayerState === 'function') ensureRelicPlayerState();
  playerState.ownedRelics = playerState.ownedRelics || [];
  const ownedIds = new Set(playerState.ownedRelics.map(r => r.relicId));
  let added = 0;
  RELIC_DATABASE.forEach(r => {
    if (!ownedIds.has(r.id)) {
      playerState.ownedRelics.push({ relicId: r.id, acquiredAt: Date.now() });
      added++;
    }
  });
  refreshAfterDevAction();
  showDevToolsStatus(added > 0
    ? `Acquired ${added} new Relic${added > 1 ? 's' : ''}. You now own all ${RELIC_DATABASE.length}.`
    : `You already own all ${RELIC_DATABASE.length} Relics.`);
  return added;
}

function devAcquireAllSigils() {
  if (typeof SIGIL_DATABASE === 'undefined') return 0;
  if (typeof ensureSigilPlayerState === 'function') ensureSigilPlayerState();
  playerState.ownedSigilInventory = playerState.ownedSigilInventory || [];
  let added = 0;
  SIGIL_DATABASE.forEach(s => {
    const existing = playerState.ownedSigilInventory.find(i => i.sigilId === s.id);
    if (!existing) {
      playerState.ownedSigilInventory.push({ sigilId: s.id, count: 2 });
      added++;
    } else if (existing.count < 2) {
      existing.count = 2;
      added++;
    }
  });
  refreshAfterDevAction();
  showDevToolsStatus(added > 0
    ? `Added / topped-up ${added} Sigil types (2x copies each). You now possess all ${SIGIL_DATABASE.length} Sigils!`
    : `You already possess 2x or more copies of all ${SIGIL_DATABASE.length} Sigils.`);
  return added;
}

function devUpgradeAllRainbow() {
  let upgraded = 0;
  playerState.ownedCards.forEach(o => {
    if (!o.isRainbow) { o.isRainbow = true; upgraded++; }
  });
  refreshAfterDevAction();
  showDevToolsStatus(upgraded > 0
    ? `Upgraded ${upgraded} card${upgraded > 1 ? 's' : ''} to Rainbow.`
    : 'Every card you own is already Rainbow.');
  return upgraded;
}

function devMaxAllCards() {
  let leveled = 0;
  let awakened = 0;
  let notRainbow = 0;
  playerState.ownedCards.forEach(o => {
    if ((o.level || 1) < MAX_CARD_LEVEL) { o.level = MAX_CARD_LEVEL; leveled++; }
    if (o.isRainbow) {
      if ((o.enlightenment || 0) < MAX_ENLIGHTENMENT || !o.awakened) {
        o.enlightenment = MAX_ENLIGHTENMENT;
        o.awakened = true;
        awakened++;
      }
    } else {
      notRainbow++;
    }
  });
  refreshAfterDevAction();
  let msg = (leveled + awakened) > 0
    ? `Set ${leveled} card${leveled === 1 ? '' : 's'} to Lv.${MAX_CARD_LEVEL} and fully awakened ${awakened}.`
    : 'Every owned card is already maxed.';
  if (notRainbow > 0) {
    msg += ` ${notRainbow} non-Rainbow card${notRainbow > 1 ? 's' : ''} can't be awakened until upgraded to Rainbow.`;
  }
  showDevToolsStatus(msg);
  return { leveled, awakened, notRainbow };
}

function devAddGold() {
  playerState.gold += DEV_GOLD_AMOUNT;
  refreshAfterDevAction();
  showDevToolsStatus(`+${DEV_GOLD_AMOUNT.toLocaleString()} Gold. You now have ${playerState.gold.toLocaleString()}.`);
}

function devAddRubies() {
  playerState.rubies += DEV_RUBY_AMOUNT;
  refreshAfterDevAction();
  showDevToolsStatus(`+${DEV_RUBY_AMOUNT.toLocaleString()} Rubies. You now have ${playerState.rubies.toLocaleString()}.`);
}

const SAVE_STORAGE_KEY = 'championsOfValor.save.v1';

function buildSaveData() {
  return {
    gold: playerState.gold,
    rubies: playerState.rubies,
    packLevel: playerState.packLevel,
    totalPacksOpened: playerState.totalPacksOpened,
    essence: playerState.essence,
    spotlight: playerState.spotlight,
    equippedDeckIds: playerState.equippedDeckIds,
    ownedCards: playerState.ownedCards.map(c => ({
      cardId: c.cardId,
      isRainbow: c.isRainbow,
      level: c.level,
      copies: c.copies,
      enlightenment: c.enlightenment,
      awakened: c.awakened,
      sigilIds: c.sigilIds || [null, null] // <--- SAVES EQUIPPED SOCKETS PER CARD
    })),
    ownedSigilInventory: playerState.ownedSigilInventory || [], // <--- SAVES INVENTORY RUNE COPIES
    ownedSummons: playerState.ownedSummons,
    equippedSummonId: playerState.equippedSummonId,
    showdownSummonGrid: playerState.showdownSummonGrid,
    deckSubTab: playerState.deckSubTab,
    gachaSubTab: playerState.gachaSubTab,
    collectionSubTab: playerState.collectionSubTab,
    tierIndex: playerState.tierIndex,
    division: playerState.division,
    stars: playerState.stars,
    masterStars: playerState.masterStars,
    inPromotion: playerState.inPromotion,
    promoWins: playerState.promoWins,
    promoLosses: playerState.promoLosses,
    soundEnabled: playerState.soundEnabled,
    musicEnabled: playerState.musicEnabled,
    deckPresets: playerState.deckPresets,
    equippedShowdownDeckIds: playerState.equippedShowdownDeckIds,
    showdownPresets: playerState.showdownPresets,
    equippedRelicIds: playerState.equippedRelicIds || [null, null, null],
    ownedRelics: playerState.ownedRelics || [],
    spireArchive: (typeof spireArchive !== 'undefined') ? {
      astralMemory: spireArchive.astralMemory || 0,
      upgrades: { ...(spireArchive.upgrades || {}) }
    } : null,
    stats: playerState.stats,
    season: {
      number: playerState.season.number,
      startAt: playerState.season.startAt,
      peak: playerState.season.peak,
      history: playerState.season.history
    },
    version: "2.1"
  };
}

function applySaveData(parsed) {
  const num = (v, fallback) => (typeof v === 'number' && isFinite(v)) ? v : fallback;

  const validIds = new Set(CARD_DATABASE.map(c => c.id));
  const validSigilIds = (typeof SIGIL_DATABASE !== 'undefined') ? new Set(SIGIL_DATABASE.map(s => s.id)) : new Set();

  const cleanCards = (Array.isArray(parsed.ownedCards) ? parsed.ownedCards : [])
    .filter(c => c && validIds.has(c.cardId))
    .map(c => {
      const isRainbow = !!c.isRainbow;
      const enlightenment = isRainbow ? Math.min(MAX_ENLIGHTENMENT, Math.max(0, Math.floor(num(c.enlightenment, 0)))) : 0;
      
      // Sanitize and clean equipped socket sigils
      let rawSigils = Array.isArray(c.sigilIds) ? c.sigilIds : [null, null];
      let cleanSigils = [
        rawSigils[0] && validSigilIds.has(rawSigils[0]) ? rawSigils[0] : null,
        rawSigils[1] && validSigilIds.has(rawSigils[1]) ? rawSigils[1] : null
      ];

      return {
        cardId: c.cardId,
        isRainbow,
        level: Math.min(MAX_CARD_LEVEL, Math.max(1, Math.floor(num(c.level, 1)))),
        copies: Math.max(0, Math.floor(num(c.copies, 0))),
        enlightenment,
        awakened: isRainbow && enlightenment >= MAX_ENLIGHTENMENT && !!c.awakened,
        sigilIds: cleanSigils
      };
    });

  // Restore Owned Sigil Inventory
  if (Array.isArray(parsed.ownedSigilInventory)) {
    playerState.ownedSigilInventory = parsed.ownedSigilInventory
      .filter(i => i && i.sigilId && validSigilIds.has(i.sigilId))
      .map(i => ({ sigilId: i.sigilId, count: Math.max(0, Math.floor(num(i.count, 1))) }));
  } else {
    playerState.ownedSigilInventory = [];
  }

  const ownedIds = new Set(cleanCards.map(c => c.cardId));
  const cleanDeck = (Array.isArray(parsed.equippedDeckIds) ? parsed.equippedDeckIds : [])
    .filter(id => ownedIds.has(id))
    .slice(0, 6);

  playerState.gold = num(parsed.gold, 0);
  playerState.rubies = num(parsed.rubies, 0);
  playerState.packLevel = Math.min(10, Math.max(1, Math.floor(num(parsed.packLevel, 1))));
  playerState.totalPacksOpened = num(parsed.totalPacksOpened, 0);
  playerState.essence = Math.max(0, Math.floor(num(parsed.essence, 0)));

  const rawSpotlight = (parsed.spotlight && typeof parsed.spotlight === 'object') ? parsed.spotlight : {};
  const spotlightCard = CARD_DATABASE.find(c => c.id === rawSpotlight.targetId);
  const spotlightValid = !!spotlightCard
    && playerState.packLevel >= SPOTLIGHT_UNLOCK_PACK_LEVEL
    && rarityRank(spotlightCard.rarity) >= rarityRank(SPOTLIGHT_MIN_RARITY)
    && (PACK_LEVEL_TABLE[playerState.packLevel][spotlightCard.rarity.toLowerCase()] || 0) > 0;
  playerState.spotlight = {
    targetId: spotlightValid ? spotlightCard.id : null,
    opensSinceTarget: spotlightValid
      ? Math.min(SPOTLIGHT_GUARANTEE_OPENS - 1, Math.max(0, Math.floor(num(rawSpotlight.opensSinceTarget, 0))))
      : 0
  };
  playerState.ownedCards = cleanCards.length ? cleanCards : playerState.ownedCards;
  playerState.equippedDeckIds = cleanDeck.length ? cleanDeck : playerState.equippedDeckIds;

  if (Array.isArray(parsed.ownedSummons) && parsed.ownedSummons.length > 0) {
    playerState.ownedSummons = parsed.ownedSummons;
  }
  if (parsed.equippedSummonId !== undefined) {
    playerState.equippedSummonId = parsed.equippedSummonId;
  }
  if (Array.isArray(parsed.showdownSummonGrid)) {
    playerState.showdownSummonGrid = parsed.showdownSummonGrid;
  }
  if (parsed.deckSubTab) playerState.deckSubTab = parsed.deckSubTab;
  if (parsed.gachaSubTab) playerState.gachaSubTab = parsed.gachaSubTab;
  if (parsed.collectionSubTab) playerState.collectionSubTab = parsed.collectionSubTab;

  playerState.tierIndex = Math.min(MASTER_TIER_INDEX, Math.max(0, num(parsed.tierIndex, 0)));
  playerState.division = num(parsed.division, 3);
  playerState.stars = num(parsed.stars, 0);
  playerState.masterStars = num(parsed.masterStars, 0);
  playerState.inPromotion = !!parsed.inPromotion;
  playerState.promoWins = num(parsed.promoWins, 0);
  playerState.promoLosses = num(parsed.promoLosses, 0);
  if (typeof parsed.soundEnabled === 'boolean') playerState.soundEnabled = parsed.soundEnabled;
  if (typeof parsed.musicEnabled === 'boolean') playerState.musicEnabled = parsed.musicEnabled;

  if (Array.isArray(parsed.equippedShowdownDeckIds)) {
    playerState.equippedShowdownDeckIds = parsed.equippedShowdownDeckIds.filter(id => ownedIds.has(id)).slice(0, 10);
  }
  playerState.deckPresets = Array.from({ length: 9 }, (_, i) => {
    const p = Array.isArray(parsed.deckPresets) ? parsed.deckPresets[i] : null;
    if (!p || !Array.isArray(p.ids)) return null;
    const ids = [...new Set(p.ids.filter(id => validIds.has(id)))].slice(0, 6);
    return ids.length ? { name: p.name || `Deck ${i + 1}`, ids } : null;
  });
  playerState.showdownPresets = Array.from({ length: 8 }, (_, i) => {
    const p = Array.isArray(parsed.showdownPresets) ? parsed.showdownPresets[i] : null;
    if (!p || !Array.isArray(p.ids)) return null;
    const ids = [...new Set(p.ids.filter(id => validIds.has(id)))].slice(0, 10);
    return ids.length ? { name: p.name || `Raid Squad ${i + 1}`, ids } : null;
  });

  const rawStats = (parsed.stats && typeof parsed.stats === 'object') ? parsed.stats : {};
  const stats = createDefaultStats();
  ['rankedWins', 'rankedLosses', 'practiceWins', 'practiceLosses', 'currentStreak', 'bestStreak', 'goldFromBattles', 'rubiesFromBattles']
    .forEach(key => { stats[key] = Math.max(0, Math.floor(num(rawStats[key], 0))); });
  stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  stats.startedAt = num(rawStats.startedAt, stats.startedAt);
  stats.peakRank = sanitizeRank(rawStats.peakRank);
  stats.recent = (Array.isArray(rawStats.recent) ? rawStats.recent : [])
    .filter(m => m && typeof m === 'object' && TIERS[m.tier])
    .slice(0, 15)
    .map(m => ({ win: !!m.win, mode: m.mode === 'practice' ? 'practice' : 'ranked', tier: m.tier, ts: num(m.ts, 0) }));
  playerState.stats = stats;

  const rawSeason = (parsed.season && typeof parsed.season === 'object') ? parsed.season : null;
  const season = createDefaultSeason();
  if (rawSeason) {
    season.number = Math.max(1, Math.floor(num(rawSeason.number, 1)));
    season.startAt = (typeof rawSeason.startAt === 'number' && rawSeason.startAt > 0)
      ? rawSeason.startAt
      : (playerState.season && playerState.season.startAt ? playerState.season.startAt : Date.now());
    season.peak = sanitizeRank(rawSeason.peak);
    season.rankedWins = Math.max(0, Math.floor(num(rawSeason.rankedWins, 0)));
    season.rankedLosses = Math.max(0, Math.floor(num(rawSeason.rankedLosses, 0)));
    season.goldEarned = Math.max(0, Math.floor(num(rawSeason.goldEarned, 0)));
    season.rubiesEarned = Math.max(0, Math.floor(num(rawSeason.rubiesEarned, 0)));
    season.cardUsage = (rawSeason.cardUsage && typeof rawSeason.cardUsage === 'object') ? rawSeason.cardUsage : {};
    season.roleUsage = (rawSeason.roleUsage && typeof rawSeason.roleUsage === 'object') ? rawSeason.roleUsage : {};
    season.elementUsage = (rawSeason.elementUsage && typeof rawSeason.elementUsage === 'object') ? rawSeason.elementUsage : {};
    season.history = (Array.isArray(rawSeason.history) ? rawSeason.history : [])
      .map(h => (h && typeof h === 'object') ? {
        season: Math.max(1, Math.floor(num(h.season, 1))),
        peak: sanitizeRank(h.peak),
        gold: Math.max(0, Math.floor(num(h.gold, 0))),
        rubies: Math.max(0, Math.floor(num(h.rubies, 0))),
        totalGoldEarned: Math.max(0, Math.floor(num(h.totalGoldEarned, 0))),
        totalRubiesEarned: Math.max(0, Math.floor(num(h.totalRubiesEarned, 0))),
        rankedWins: Math.max(0, Math.floor(num(h.rankedWins, 0))),
        rankedLosses: Math.max(0, Math.floor(num(h.rankedLosses, 0))),
        mostUsedCardId: h.mostUsedCardId || null,
        mostUsedRole: h.mostUsedRole || "Warrior",
        mostUsedElement: h.mostUsedElement || "Fire",
        favoriteLineup: Array.isArray(h.favoriteLineup) ? h.favoriteLineup : [],
        endedAt: num(h.endedAt, 0)
      } : null)
      .filter(h => h && h.peak)
      .slice(0, 15);
  }
  playerState.season = season;

  // Restore Spire Archive meta-progression
  if (parsed.spireArchive && typeof spireArchive !== 'undefined') {
    spireArchive.astralMemory = parsed.spireArchive.astralMemory || 0;
    spireArchive.upgrades = { ...spireArchive.upgrades, ...(parsed.spireArchive.upgrades || {}) };
    if (typeof saveSpireArchive === 'function') saveSpireArchive();
  }

  // Restore persistent Spire run if present in save file
  if (parsed.spireState && typeof spireState !== 'undefined') {
    Object.assign(spireState, parsed.spireState);
  }
  
  if (Array.isArray(parsed.equippedRelicIds)) playerState.equippedRelicIds = parsed.equippedRelicIds;
  if (Array.isArray(parsed.ownedRelics)) playerState.ownedRelics = parsed.ownedRelics;

  updatePeakRank();
}

let saveTimer = null;
let autoSaveReady = false;

function saveGameNow() {
  if (!autoSaveReady) return;
  clearTimeout(saveTimer);
  saveTimer = null;
  try {
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(buildSaveData()));
  } catch (err) {
    console.warn('Auto-save unavailable (storage blocked or full):', err);
  }
}

function scheduleSave() {
  if (!autoSaveReady) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveGameNow, 250);
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (raw) applySaveData(JSON.parse(raw));
  } catch (err) {
    console.warn('Could not load saved game, starting fresh:', err);
  }
  autoSaveReady = true;
}

['updateTopCurrencyUI', 'updateRankedLadderUI', 'renderHomeUI', 'renderGachaUI', 'renderDeckBuilderUI', 'renderSummonLoadoutUI']
  .forEach(name => {
    const original = window[name];
    if (typeof original === 'function') {
      window[name] = function () {
        const result = original.apply(this, arguments);
        scheduleSave();
        return result;
      };
    }
  });

window.addEventListener('pagehide', saveGameNow);
window.addEventListener('beforeunload', saveGameNow);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveGameNow();
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// SVG path definitions for Unmuted (waves) vs Muted (cross mark)
const SOUND_ON_PATH = "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.829 1 1 0 010-1.414z";
const SOUND_OFF_PATH = "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z";

function updateSoundUI() {
  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  const pathEl = document.getElementById('icon-sound-path');
  if (!soundToggleBtn) return;

  // Toggle opacity and color accents
  soundToggleBtn.classList.toggle('opacity-50', !playerState.soundEnabled);
  soundToggleBtn.classList.toggle('text-rose-400', !playerState.soundEnabled);
  soundToggleBtn.classList.toggle('text-slate-300', playerState.soundEnabled);

  // Swap SVG icon path
  if (pathEl) {
    pathEl.setAttribute('d', playerState.soundEnabled ? SOUND_ON_PATH : SOUND_OFF_PATH);
  }
}

const soundToggleBtn = document.getElementById('btn-sound-toggle');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    playerState.soundEnabled = !playerState.soundEnabled;
    updateSoundUI();
    scheduleSave();
  });
}

window.onload = function() {
  loadSavedGame();
  initCardToolbars();
  initPracticeModal();
  updateMatchModeBadge();
  checkSeasonRollover();
  updateSeasonBadge();
  startSeasonTimer();
  updateSoundUI();
  updateTopCurrencyUI();
  updateRankedLadderUI();
  renderHomeUI();
  renderGachaUI();
  renderDeckBuilderUI();
  switchTab('home');
};

// =====================================================================
// ASYNCHRONOUS GHOST PvP SYSTEM
// =====================================================================

const GHOST_LADDER = [
  {
    ghostName: "xX_DragonSlayer_Xx", tier: "Gold II", avatar: "🐉",
    deckIds: ["c_eso", "c_anna", "c_balurga", "u_johann", "r_amira", "c_flesselles"],
    summonId: "s_shiva", bountyGold: 250, bountyRubies: 5
  },
  {
    ghostName: "Kite_The_Reaper", tier: "Platinum IV", avatar: "🗡️",
    deckIds: ["c_lunalu", "c_cordelia", "r_amira", "c_eso", "c_balurga", "c_anna"],
    summonId: "s_celeste", bountyGold: 400, bountyRubies: 8
  },
  {
    ghostName: "Grandmaster_Yuki", tier: "Diamond I", avatar: "💠",
    deckIds: ["c_anna", "r_amira", "u_johann", "c_lunalu", "c_cordelia", "c_eso"],
    summonId: "s_lucifer", bountyGold: 750, bountyRubies: 15
  }
];

function startGhostMatch(ghostIndex) {
  if (playerState.equippedDeckIds.length < 6) {
    alert("Equip a full 6-card deck first!");
    return;
  }
  
  const ghost = GHOST_LADDER[ghostIndex];
  if (!ghost) return;

  if (typeof initCombatStatsTracker === 'function') initCombatStatsTracker('arena');
  
  battleEngine.matchMode = 'ghost';
  battleEngine.currentGhost = ghost;
  
  const badge = document.getElementById('match-mode-badge');
  if (badge) {
    badge.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/50";
    badge.innerText = `PvP Rival: ${ghost.avatar} ${ghost.ghostName}`;
  }

  const playerDeck = playerState.equippedDeckIds.map(id => {
    const owned = playerState.ownedCards.find(o => o.cardId === id);
    const stats = calculateCardStats(id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
    if (typeof registerCombatStatUnit === 'function') registerCombatStatUnit(stats, true);
    return stats;
  });

  const enemyDeck = ghost.deckIds.map(id => {
    const stats = calculateCardStats(id, true, 20, {enlightenment: 5, awakened: false});
    if (typeof registerCombatStatUnit === 'function') registerCombatStatUnit(stats, false);
    return stats;
  });

  // Apply Player Summon Auras
  if (playerState.equippedSummonId && typeof calculateSummonStats === 'function') {
    const summon = calculateSummonStats(playerState.equippedSummonId);
    playerDeck.forEach(c => {
      if (summon.mainAura && c.element === summon.element) {
        if (summon.mainAura.stat === 'pv') c.maxPv += Math.round(c.maxPv * (summon.mainAura.percent / 100));
        else if (summon.mainAura.stat === 'def') c.def += Math.round(c.def * (summon.mainAura.percent / 100));
        c.pv = c.maxPv;
      }
      if (summon.subAura) {
        if (summon.subAura.stat === 'pv') { c.maxPv += summon.subAura.flat; c.pv += summon.subAura.flat; }
        else if (summon.subAura.stat === 'def') c.def += summon.subAura.flat;
      }
    });
    battleEngine.arenaSummon = { ...summon, lockoutTurns: 3, used: false };
  } else {
    battleEngine.arenaSummon = null;
  }

  if (ghost.summonId && typeof calculateSummonStats === 'function') {
    battleEngine.enemyArenaSummon = {
      ...calculateSummonStats(ghost.summonId),
      lockoutTurns: 3,
      used: false
    };
  } else {
    battleEngine.enemyArenaSummon = null;
  }
  battleEngine.enemyRelicIds = ghost.relicIds || ["rel_lion_crest", "rel_thorns_aegis"];

  battleEngine.playerField = [playerDeck[0], playerDeck[1], playerDeck[2]];
  battleEngine.playerReserve = [playerDeck[3], playerDeck[4], playerDeck[5]];
  battleEngine.enemyField = [enemyDeck[0], enemyDeck[1], enemyDeck[2]];
  battleEngine.enemyReserve = [enemyDeck[3], enemyDeck[4], enemyDeck[5]];

  battleEngine.selectedAllySlot = null;
  battleEngine.attackMode = 'normal';
  battleEngine.isResolving = true;
  battleEngine.turnCount = 1;
  battleEngine.battleHistory = [];
  
  switchTab('battle');
  updateOpponentInfoPanel();
  renderCombatField();
  updateReserveDots();
  renderBattleResonancesBar();
  runCoinTossModal();
}

let rankedSubTab = 'ladder'; // 'ladder' | 'global'

function switchRankedSubTab(tab) {
  rankedSubTab = tab;
  const ladderContainer = document.getElementById('ranked-ladder-container');
  const globalContainer = document.getElementById('ranked-global-container');
  
  const btnLadder = document.getElementById('ranked-subtab-ladder');
  const btnGlobal = document.getElementById('ranked-subtab-global');

  if (ladderContainer) ladderContainer.classList.toggle('hidden', tab !== 'ladder');
  if (globalContainer) globalContainer.classList.toggle('hidden', tab !== 'global');

  if (btnLadder) {
    btnLadder.className = tab === 'ladder'
      ? "px-4 py-1.5 rounded-xl text-xs font-bold transition bg-amber-500 text-slate-950 shadow font-cinzel"
      : "px-4 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 hover:text-amber-300 border border-slate-800 font-cinzel";
  }
  if (btnGlobal) {
    btnGlobal.className = tab === 'global'
      ? "px-4 py-1.5 rounded-xl text-xs font-bold transition bg-amber-500 text-slate-950 shadow font-cinzel"
      : "px-4 py-1.5 rounded-xl text-xs font-bold transition bg-slate-900 text-slate-400 hover:text-amber-300 border border-slate-800 font-cinzel";
    renderGlobalLeaderboardUI();
  }
}

const GLOBAL_REAL_PLAYER_POOL = [
  { id: "gp_1", name: "Aurelia_Valkyrie", avatar: "⚜️", tierIndex: 8, division: 1, masterStars: 42, deckIds: ["m_michael", "m_shiva", "m_gabriel", "m_uriel", "l_lancelot", "m_sandalphon"] },
  { id: "gp_2", name: "Kite_The_Reaper", avatar: "🗡️", tierIndex: 7, division: 1, masterStars: 0, deckIds: ["l_noire", "m_olivia_grand", "m_fediel", "l_azazel", "r_predator", "u_danua"] },
  { id: "gp_3", name: "Grandmaster_Yuki", avatar: "💠", tierIndex: 8, division: 1, masterStars: 88, deckIds: ["m_lucio", "m_jeanne_d_arc_grand", "m_cosmos", "l_arulumaya_light", "u_johann", "r_amira"] },
  { id: "gp_4", name: "Skyfarer_Dan", avatar: "⛵", tierIndex: 6, division: 2, masterStars: 0, deckIds: ["c_eso", "c_alistair", "c_anna", "c_flesselles", "u_johann", "r_amira"] },
  { id: "gp_5", name: "Valkyrie_Blaze", avatar: "🔥", tierIndex: 5, division: 1, masterStars: 0, deckIds: ["e_aliza", "e_aoidos", "m_michael", "u_elmott", "r_arusha", "c_eso"] },
  { id: "gp_6", name: "Abyssal_Zero", avatar: "🌑", tierIndex: 7, division: 3, masterStars: 0, deckIds: ["m_lich", "m_sariel", "l_vania_sr", "u_danua", "c_lunalu", "r_predator"] }
];

function renderGlobalLeaderboardUI() {
  const tbody = document.getElementById('global-leaderboard-tbody');
  const rankBadge = document.getElementById('global-player-rank-badge');
  if (!tbody) return;

  const playerRankScore = rankScore({
    tierIndex: playerState.tierIndex,
    division: playerState.division,
    masterStars: playerState.masterStars
  });

  const playerEntry = {
    id: "player_self",
    name: "YOU",
    avatar: "👑",
    tierIndex: playerState.tierIndex,
    division: playerState.division,
    masterStars: playerState.masterStars,
    deckIds: playerState.equippedDeckIds,
    isPlayer: true,
    score: playerRankScore
  };

  const processedPool = GLOBAL_REAL_PLAYER_POOL.map(gp => ({
    ...gp,
    score: rankScore({ tierIndex: gp.tierIndex, division: gp.division, masterStars: gp.masterStars || 0 }),
    isPlayer: false
  }));

  processedPool.push(playerEntry);
  processedPool.sort((a, b) => b.score - a.score);

  const playerGlobalIndex = processedPool.findIndex(p => p.isPlayer);
  if (rankBadge) rankBadge.innerText = `#${playerGlobalIndex + 1}`;

  tbody.innerHTML = processedPool.map((entry, idx) => {
    const isSelf = !!entry.isPlayer;
    const rankNum = idx + 1;
    const rankDisplay = rankNum === 1 ? '🥇 #1' : rankNum === 2 ? '🥈 #2' : rankNum === 3 ? '🥉 #3' : `#${rankNum}`;
    const rankNameStr = formatRankName({ tierIndex: entry.tierIndex, division: entry.division, masterStars: entry.masterStars });
    const cpVal = calculateTeamPower(entry.deckIds);

    return `
      <tr class="${isSelf ? 'bg-indigo-950/50 font-bold text-indigo-200 ring-1 ring-indigo-500/50' : 'hover:bg-slate-900/50'} transition">
        <td class="py-3 px-4 font-mono font-bold">${rankDisplay}</td>
        <td class="py-3 px-4">
          <div class="flex items-center gap-2.5">
            <span class="text-lg">${entry.avatar}</span>
            <span class="${isSelf ? 'text-amber-300 font-black' : 'text-slate-200'}">${escapeHtml(entry.name)}</span>
          </div>
        </td>
        <td class="py-3 px-4 font-cinzel text-purple-300 font-semibold">${rankNameStr}</td>
        <td class="py-3 px-4 font-mono text-indigo-300">${cpVal.toLocaleString()} CP</td>
        <td class="py-3 px-4 text-right">
          ${isSelf ? '<span class="text-[10px] text-slate-500 uppercase font-bold">Your Standing</span>' : `
            <button onclick="startGlobalLadderPvP('${entry.id}')" class="py-1 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-wider transition active:scale-95 shadow">
              ⚔️ Challenge
            </button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function startGlobalLadderPvP(opponentId) {
  if (playerState.equippedDeckIds.length < 6) {
    alert("Equip a full 6-card deck in your active lineup first!");
    return;
  }

  const opponent = GLOBAL_REAL_PLAYER_POOL.find(p => p.id === opponentId);
  if (!opponent) return;

  if (typeof initCombatStatsTracker === 'function') initCombatStatsTracker('arena');

  battleEngine.matchMode = 'ranked';
  battleEngine.currentGhost = {
    ghostName: opponent.name,
    tier: formatRankName({ tierIndex: opponent.tierIndex, division: opponent.division, masterStars: opponent.masterStars }),
    avatar: opponent.avatar,
    bountyGold: 300,
    bountyRubies: 5
  };

  const badge = document.getElementById('match-mode-badge');
  if (badge) {
    badge.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/50";
    badge.innerText = `🏆 Global Ladder PvP vs ${opponent.avatar} ${opponent.name}`;
  }

  const playerDeck = playerState.equippedDeckIds.map(id => {
    const owned = playerState.ownedCards.find(o => o.cardId === id);
    const stats = calculateCardStats(id, owned ? owned.isRainbow : false, owned ? owned.level : 1, owned);
    if (typeof registerCombatStatUnit === 'function') registerCombatStatUnit(stats, true);
    return stats;
  });

  const enemyDeck = opponent.deckIds.map(id => {
    const stats = calculateCardStats(id, true, 25, { enlightenment: 5, awakened: true });
    if (typeof registerCombatStatUnit === 'function') registerCombatStatUnit(stats, false);
    return stats;
  });

  if (playerState.equippedSummonId && typeof calculateSummonStats === 'function') {
    const summon = calculateSummonStats(playerState.equippedSummonId);
    battleEngine.arenaSummon = { ...summon, lockoutTurns: 3, used: false };
  } else {
    battleEngine.arenaSummon = null;
  }

  battleEngine.enemyArenaSummon = null;
  battleEngine.enemyRelicIds = ["rel_titan_barrier_core", "rel_sunder_chisel"];

  battleEngine.playerField = [playerDeck[0], playerDeck[1], playerDeck[2]];
  battleEngine.playerReserve = [playerDeck[3], playerDeck[4], playerDeck[5]];
  battleEngine.enemyField = [enemyDeck[0], enemyDeck[1], enemyDeck[2]];
  battleEngine.enemyReserve = [enemyDeck[3], enemyDeck[4], enemyDeck[5]];

  battleEngine.selectedAllySlot = null;
  battleEngine.attackMode = 'normal';
  battleEngine.isResolving = true;
  battleEngine.turnCount = 1;
  battleEngine.battleHistory = [];

  switchTab('battle');
  updateOpponentInfoPanel();
  renderCombatField();
  updateReserveDots();
  renderBattleResonancesBar();
  runCoinTossModal();
}

function formatDamageMathBreakdown(calc) {
  // LaTeX format: Damage = (PV * [100 / (100 + DEF)]) * Elem * Modifiers
  const { atkName, basePv, def, effDef, rawMitigated, elemMult, elemLabel, bonusMult, finalDmg } = calc;
  
  const multText = bonusMult > 1 ? ` × ${bonusMult.toFixed(2)} [Buffs]` : '';
  const elemText = elemMult !== 1.0 ? ` × ${elemMult} [${elemLabel || 'Elem'}]` : '';

  return `
    <span class="inline-block cursor-help text-slate-400 hover:text-amber-300 ml-1 font-mono text-[10px] border border-slate-700 hover:border-amber-400 px-1.5 py-0.2 rounded transition"
      title="Math: (${basePv} PV × [100 / (100 + ${effDef} DEF)]) = ${rawMitigated}${elemText}${multText} = ${finalDmg} DMG">
      [Math ℹ️]
    </span>
  `;
}