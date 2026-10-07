// TREASURE DATABASE — rarity: legendary | epic | rare | special
// enhancements (optional): shown after the treasure reaches its max level.
//   [{ lv: 1..6, effect: "+x pts for ...", desc?: "(overrides main skill text)", reward?: "..." }]
//   The LAST entry is displayed in the "Enhancement Effect" box; all of them appear in Level Info.
window.TREASURES = [
  {
    id: "dread-grasp-of-darkness",
    name: "Dread Grasp of Darkness",
    rarity: "legendary",
	released: "March 31, 2026",
    emoji: "📔",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/6/65/Crob_sprite_background_dread_grasp_of_darkness.png",
	avatar: "https://cdn.wikimg.net/en/cookierunwiki/images/7/7d/Crob_sprite_dread_grasp_of_darkness.png",
    tags: ["Jellies"],
    bonus: true,
	skillFull: "After first activation, a colossal hand appears for a certain period of time. The eye within the hand scans the surrounding area before striking down with Dark Lightning, destroying obstacles and creating Dark Crimson Gem Jellies. At the end of the skill, the claw falls down, destroying everything in the surrounding area, creating Dark Crimson Gem Jellies and Dark Sigil Jellies. Afterwards, Dark Lightning strikes at certain intervals, destroying obstacles to create Dark Crimson Gem Jellies. Level Up for more points for Dark Crimson Gem Jellies and Dark Sigil Jellies.",
    levels: [
      {
        lv: 1,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+108,540 pts for Crimson Gem Jellies\n+1,340,000 pts for Dark Sigil Jellies",
        reward: "No Level Up Reward",
      },
	  {
        lv: 2,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+117,450 pts for Crimson Gem Jellies\n+1,450,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 3,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+126,360 pts for Crimson Gem Jellies\n+1,560,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 4,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+135,270 pts for Crimson Gem Jellies\n+1,670,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 5,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+144,180 pts for Crimson Gem Jellies\n+1,780,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 6,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+153,090 pts for Crimson Gem Jellies\n+1,890,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 7,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+162,000 pts for Crimson Gem Jellies\n+2,000,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 8,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+178,200 pts for Crimson Gem Jellies\n+2,200,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 9,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+194,400 pts for Crimson Gem Jellies\n+2,400,000 pts for Dark Sigil Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 10,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+210,600 pts for Crimson Gem Jellies\n+2,600,000 pts for Dark Sigil Jellies",
        reward: "🔥8,000",
      },
	  {
        lv: 11,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+226,800 pts for Crimson Gem Jellies\n+2,800,000 pts for Dark Sigil Jellies",
        reward: "🔥8,000",
      },
	  {
        lv: 12,
        desc: "Colossal Hand cooldown 56 sec\nSkill activates every 9 sec after Colossal Hand\n+243,000 pts for Crimson Gem Jellies\n+3,000,000 pts for Dark Sigil Jellies",
        reward: "🔥12,000",
      },
    ],
    story: "When the night sky is torn apart by crimson and black lightning, beware...! A colossal hand closes around the world, dragging it inexorably into eternal Darkness!",
	combi: [
      {
        type: "cookie",
        id: "dark-enchantress",
        desc: "+18,000 pts for Crimson Gem Jellies",
      },
    ],
  },
  {
    id: "sticker-diary",
    name: "Bursting Sticker Diary",
    rarity: "epic",
	released: "September 23, 2026",
    emoji: "📔",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/0/07/Crob_sprite_bursting_sticker_diary.png",
	avatar: "https://cdn.wikimg.net/en/cookierunwiki/images/0/07/Crob_sprite_bursting_sticker_diary.png",
    tags: ["Jellies"],
    bonus: true,
	skillFull: "Places a sticker in midair at cetain intervals. Obstacles around the sticker are destroyed as it falls downward. When the sticker hits the ground, it bounces and creates multiple Tiny Sticker Jellies. Level Up for more points for Tiny Sticker Jellies.",
    levels: [
      {
        lv: 1,
        desc: "Skill activation every 16.2 sec\n+217,080 pts for Tiny Sticker Jellies",
        reward: "No Level Up Reward",
      },
	  {
        lv: 2,
        desc: "Skill activation every 16.2 sec\n+234,900 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 3,
        desc: "Skill activation every 16.2 sec\n+252,720 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 4,
        desc: "Skill activation every 16.2 sec\n+270,540 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 5,
        desc: "Skill activation every 16.2 sec\n+288,360 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 6,
        desc: "Skill activation every 16.2 sec\n+306,180 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 7,
        desc: "Skill activation every 16.2 sec\n+324,000 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 8,
        desc: "Skill activation every 16.2 sec\n+341,820 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 9,
        desc: "Skill activation every 16.2 sec\n+359,640 pts for Tiny Sticker Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 10,
        desc: "Skill activation every 16.2 sec\n+377,460 pts for Tiny Sticker Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 11,
        desc: "Skill activation every 16.2 sec\n+395,280 pts for Tiny Sticker Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 12,
        desc: "Skill activation every 16.2 sec\n+413,100 pts for Tiny Sticker Jellies",
        reward: "🔥6,000",
      },
    ],
    enhancements: [
      { lv: 1, effect: "+12,150 pts for Tiny Sticker Jellies" },
      { lv: 2, effect: "+24,300 pts for Tiny Sticker Jellies" },
      { lv: 3, effect: "+36,450 pts for Tiny Sticker Jellies" },
      { lv: 4, effect: "+48,600 pts for Tiny Sticker Jellies" },
      { lv: 5, effect: "+60,750 pts for Tiny Sticker Jellies" },
      { lv: 6, effect: "+72,900 pts for Tiny Sticker Jellies" },
    ],
    story: "One sticker for each wonderful memory... and oops! The page is full! What stickers should we put on the next page?",
	combi: [
      {
        type: "cookie",
        id: "apple",
        desc: "+36,000 pts for Tiny Sticker Jellies",
      },
    ],
  },
  {
    id: "starlight-nightlight",
    name: "Starlight Nightlight",
    rarity: "epic",
	released: "March 26, 2021",
    emoji: "🔮",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/f/f7/Starlight_Nightlight.png",
	avatar: "https://cdn.wikimg.net/en/cookierunwiki/images/9/93/Starlight_nightlight.png",
    tags: ["Jellies", "StarJellies", "Distance"],
    bonus: true,
    enhancements: [
      { lv: 1, effect: "+20,250 pts for Starlight Jellies" },
      { lv: 2, effect: "+40,500 pts for Starlight Jellies" },
      { lv: 3, effect: "+60,750 pts for Starlight Jellies" },
      { lv: 4, effect: "+81,000 pts for Starlight Jellies" },
      { lv: 5, effect: "+101,250 pts for Starlight Jellies" },
      { lv: 6, effect: "+121,500 pts for Starlight Jellies" },
    ],
	skillFull: "Starlight shines down from the sky at certain intervals, creating Starlight Jellies. Level Up for more points for Starlight Jellies.",
    levels: [
	  {
        lv: 1,
        desc: "Creates Starlight Jellies every 1,200px run\n+361,800 pts for Starlight Jellies",
        reward: "No Level Up Reward",
      },
      {
        lv: 2,
        desc: "Creates Starlight Jellies every 1,200px run\n+391,500 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 3,
        desc: "Creates Starlight Jellies every 1,200px run\n+421,200 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 4,
        desc: "Creates Starlight Jellies every 1,200px run\n+450,900 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 5,
        desc: "Creates Starlight Jellies every 1,200px run\n+480,600 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 6,
        desc: "Creates Starlight Jellies every 1,200px run\n+510,300 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 7,
        desc: "Creates Starlight Jellies every 1,200px run\n+540,000 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 8,
        desc: "Creates Starlight Jellies every 1,200px run\n+569,700 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 9,
        desc: "Creates Starlight Jellies every 1,200px run\n+599,400 pts for Starlight Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 10,
        desc: "Creates Starlight Jellies every 1,200px run\n+629,100 pts for Starlight Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 11,
        desc: "Creates Starlight Jellies every 1,200px run\n+658,800 pts for Starlight Jellies",
        reward: "🔥4,000",
      },
      {
        lv: 12,
        desc: "Creates Starlight Jellies every 1,200px run\n+688,500 pts for Starlight Jellies",
        reward: "🔥6,000",
      },
    ],
    story: "A nightlight with twinkling little stars! Put it near your bed if you're afraid of the dark!",
    combi: [
      {
        type: "cookie",
        id: "chestnut",
        desc: "+60,000 pts for Starlight Jellies",
      },
	  {
        type: "cookie",
        id: "tiramisu",
        desc: "+60,000 pts for Starlight Jellies",
      },
	  {
        type: "cookie",
        id: "crowberry",
        desc: "+60,000 pts for Starlight Jellies",
      },
	  {
        type: "cookie",
        id: "milky-way",
        desc: "+60,000 pts for Starlight Jellies",
      },
    ],
  },
  {
    id: "butterfly-brooch",
    name: "Butterfly Brooch",
    rarity: "epic",
	released: "October 27, 2022",
    emoji: "🔮",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/8/80/Butterfly_Brooch.png",
	avatar: "https://cdn.wikimg.net/en/cookierunwiki/images/4/48/Butterfly_brooch.png",
    tags: ["Score", "Jellies"],
    bonus: true,
    enhancements: [
      { lv: 1, effect: "+10,800 Scale Powder Jelly Points" },
      { lv: 2, effect: "+21,600 Scale Powder Jelly Points" },
      { lv: 3, effect: "+32,400 Scale Powder Jelly Points" },
      { lv: 4, effect: "+43,200 Scale Powder Jelly Points" },
      { lv: 5, effect: "+54,000 Scale Powder Jelly Points" },
      { lv: 6, effect: "+64,800 Scale Powder Jelly Points" },
    ],
	skillFull: "Butterflies appear at certain intervals. Reaching a butterfly grants points, and collecting a pair creates Scale Powder Jellies as the butterflies fly away together. Level Up for more points for Scale Powder Jellies.",
    levels: [
	  {
        lv: 1,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+92,960 pts for Scale Powder Jellies",
        reward: "No Level Up Reward",
      },
      {
        lv: 2,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+108,800 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 3,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+124,640 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 4,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+140,480 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 5,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+156,320 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 6,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+172,160 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 7,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+188,000 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 8,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+203,840 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 9,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+219,680 pts for Scale Powder Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 10,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+235,520 pts for Scale Powder Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 11,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+251,360 pts for Scale Powder Jellies",
        reward: "🔥4,000",
      },
      {
        lv: 12,
        desc: "Creates butterfly every 9 sec\nSkill activation after collecting 2 butterflies\n+1,000,000 Butterfly Points\n+267,200 pts for Scale Powder Jellies",
        reward: "🔥6,000",
      },
    ],
    story: "It may seem like just one butterfly, but it is a brooch made of two butterflies attached together. Friendship shines brighter than any gem in the world!",
    combi: [
      {
        type: "cookie",
        id: "sugar-glass",
        desc: "+32,000 Scale Powder Jelly Points",
      },
	  {
        type: "cookie",
        id: "blue-lily",
        desc: "+32,000 Scale Powder Jelly Points",
      },
	  {
        type: "cookie",
        id: "blue-slushy",
        desc: "+32,000 Scale Powder Jelly Points",
      }
    ],
  },
  {
    id: "ghost-repellent-sticker",
    name: "Ghost-Repellent Sticker",
    rarity: "epic",
	released: "July 28, 2022",
    emoji: "🔮",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/4/43/Ghost_Repellent_Sticker.png",
	avatar: "https://cdn.wikimg.net/en/cookierunwiki/images/c/c9/Ghost_repellent_sticker.png",
    tags: ["Jellies"],
    bonus: true,
    enhancements: [
      { lv: 1, effect: "+15,050 points for Ghost Tear Jellies" },
      { lv: 2, effect: "+30,100 points for Ghost Tear Jellies" },
      { lv: 3, effect: "+45,150 points for Ghost Tear Jellies" },
      { lv: 4, effect: "+60,200 points for Ghost Tear Jellies" },
      { lv: 5, effect: "+75,250 points for Ghost Tear Jellies" },
      { lv: 6, effect: "+90,300 points for Ghost Tear Jellies" },
    ],
	skillFull: "Ghosts approach at certain intervals. When they appear, a talisman sticker is thrown towards them, making them go away. Ghosts hit by the sticker create Ghost Tear Jellies as they disappear. Level Up for more points for Ghost Tear Jellies.",
    levels: [
	  {
        lv: 1,
        desc: "Skill activation every 22.3 sec\n+268,820 points for Ghost Tear Jellies",
        reward: "No Level Up Reward",
      },
      {
        lv: 2,
        desc: "Skill activation every 22.3 sec\n+290,900 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 3,
        desc: "Skill activation every 22.3 sec\n+312,980 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 4,
        desc: "Skill activation every 22.3 sec\n+335,060 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 5,
        desc: "Skill activation every 22.3 sec\n+357,140 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 6,
        desc: "Skill activation every 22.3 sec\n+379,220 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 7,
        desc: "Skill activation every 22.3 sec\n+401,300 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 8,
        desc: "Skill activation every 22.3 sec\n+423,380 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
	  {
        lv: 9,
        desc: "Skill activation every 22.3 sec\n+445,460 points for Ghost Tear Jellies",
        reward: "🔥2,000",
      },
      {
        lv: 10,
        desc: "Skill activation every 22.3 sec\n+467,540 points for Ghost Tear Jellies",
        reward: "🔥4,000",
      },
	  {
        lv: 11,
        desc: "Skill activation every 22.3 sec\n+489,620 points for Ghost Tear Jellies",
        reward: "🔥4,000",
      },
      {
        lv: 12,
        desc: "Skill activation every 18,8 sec\n+511,700 points for Ghost Tear Jellies",
        reward: "🔥6,000",
      },
    ],
    story: "A sticker talisman said to have been drawn by a particularly skillful Cookie, putting their heart and soul into it. Highly recommended for anyone afraid of ghosts, as it sticks to them with ease!",
    combi: [
      {
        type: "cookie",
        id: "black-garlic",
        desc: "+44,600 pts for Ghost Tear Jellies",
      },
	  {
        type: "cookie",
        id: "gim",
        desc: "+44,600 pts for Ghost Tear Jellies",
      },
	  {
        type: "cookie",
        id: "white-kimchi",
        desc: "+44,600 pts for Ghost Tear Jellies",
      },
    ],
  },
  {
    id: "candy-dynamite",
    name: "Candy Dynamite",
    rarity: "rare",
	released: "July 28, 2022",
    emoji: "🔮",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/7/72/Candy_Dynamite.png",
	avatar: "https://cdn.wikimg.net/en/cookierunwiki/images/6/64/Candy_dynamite.png",
    tags: ["Score"],
    bonus: true,
    enhancements: [
      { lv: 1, effect: "+35,000 Explosion Points" },
      { lv: 2, effect: "+70,000 Explosion Points" },
      { lv: 3, effect: "+105,000 Explosion Points" },
      { lv: 4, effect: "+140,000 Explosion Points" },
      { lv: 5, effect: "+175,000 Explosion Points" },
      { lv: 6, effect: "+210,000 Explosion Points" },
    ],
	skillFull: "Dynamite destroys all visible obstacles at given intervals. Level Up for more Explosion Points.",
    levels: [
	  {
        lv: 1,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+624,600 Explosion Points",
        reward: "No Level Up Reward",
      },
      {
        lv: 2,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+676,000 Explosion Points",
        reward: "🔥2,000",
      },
	  {
        lv: 3,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+727,400 Explosion Points",
        reward: "🔥4,000",
      },
      {
        lv: 4,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+1,190,000 Explosion Points",
        reward: "🔥4,000",
      },
	  {
        lv: 5,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+778,800 Explosion Points",
        reward: "🔥6,000",
      },
      {
        lv: 6,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+830,200 Explosion Points",
        reward: "🔥6,000",
      },
	  {
        lv: 7,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+933,000 Explosion Points",
        reward: "🔥6,000",
      },
      {
        lv: 8,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+984,400 Explosion Points",
        reward: "🔥8,000",
      },
	  {
        lv: 9,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+1,035,800 Explosion Points",
        reward: "🔥8,000",
      },
      {
        lv: 10,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+1,087,200 Explosion Points",
        reward: "🔥8,000",
      },
	  {
        lv: 11,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+1,138,600 Explosion Points",
        reward: "🔥12,000",
      },
      {
        lv: 12,
        desc: "Dynamite Explosion every 10.9 sec for 3 sec\n+1,190,000 Explosion Points",
        reward: "🔥12,000",
      },
    ],
    story: "A dynamite that catches fire so fast, you can never guess when it'll blow! KaBoom!",
    combi: [
      {
        type: "cookie",
        id: "rockstar",
        desc: "+280,000 Explosion Points",
      }
    ],
  },
];