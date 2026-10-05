// TREASURE DATABASE — rarity: legendary | epic | rare | special
// enhancements (optional): shown after the treasure reaches its max level.
//   [{ lv: 1..6, effect: "+x pts for ...", desc?: "(overrides main skill text)", reward?: "..." }]
//   The LAST entry is displayed in the "Enhancement Effect" box; all of them appear in Level Info.
window.TREASURES = [
{
    id: "sticker-diary",
    name: "Bursting Sticker Diary",
    rarity: "epic",
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
        id: "milky-way",
        desc: "+300,000 pts for Milky Way Star Jellies",
      },
    ],
  },
];