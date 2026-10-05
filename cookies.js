// COOKIE DATABASE — add one object per cookie.
// rarity: legendary | epic | rare | common | sanrio | teenieping | ppg | special
// img: optional image path/URL for the sprite (emoji used if omitted)
// avatar: optional head icon. Relationship entries use "id" (a cookie id) to pull this avatar automatically.
window.COOKIES = [
  {
    id: "milky-way",
    name: "Milky Way Cookie",
    rarity: "epic",
    img: "https://cdn.wikimg.net/en/cookierunwiki/images/8/87/Crob_standard_milky_way.png",
    emoji: "🌙",
    avatar: "", // head icon shown beside this cookie's name in other cookies' Relationship Charts
    tags: ["Flight", "Speed", "Jellies", "Star Jellies"],
    bonus: true,
    levels: [
	  {
        lv: 1,
        power: 168,
        desc: "Skill activates every 28.5 sec\n+58,600 pts for Milky Way Star Jellies",
        reward: "No Level Up Reward",
      },
	  {
        lv: 2,
        power: 177,
        desc: "Skill activates every 28.5 sec\n+75,700 pts for Milky Way Star Jellies",
        reward: "🔥400  ❤️+30",
      },
	  {
        lv: 3,
        power: 186,
        desc: "Skill activates every 28.5 sec\n+92,800 pts for Milky Way Star Jellies",
        reward: "🔥800  ❤️+30",
      },
	  {
        lv: 4,
        power: 195,
        desc: "Skill activates every 28.5 sec\n+109,900 pts for Milky Way Star Jellies",
        reward: "🔥2,000  ❤️+30",
      },
	  {
        lv: 5,
        power: 204,
        desc: "Skill activates every 28.5 sec\n+127,000 pts for Milky Way Star Jellies",
        reward: "🔥4,000  ❤️+30",
      },
	  {
        lv: 6,
        power: 213,
        desc: "Skill activates every 28.5 sec\n+144,100 pts for Milky Way Star Jellies",
        reward: "🔥4,000  ❤️+30",
      },
	  {
        lv: 7,
        power: 222,
        desc: "Skill activates every 28.5 sec\n+161,200 pts for Milky Way Star Jellies",
        reward: "🔥4,000  ❤️+30",
      },
	  {
        lv: 8,
        power: 231,
        desc: "Skill activates every 28.5 sec\n+178,300 pts for Milky Way Star Jellies",
        reward: "🔥4,000  ❤️+30",
      },
	  {
        lv: 9,
        power: 240,
        desc: "Skill activates every 28.5 sec\n+195,400 pts for Milky Way Star Jellies",
        reward: "🔥5,000  ❤️+30",
      },
	  {
        lv: 10,
        power: 249,
        desc: "Skill activates every 28.5 sec\n+212,500 pts for Milky Way Star Jellies",
        reward: "🔥6,000  ❤️+30",
      },
	  {
        lv: 11,
        power: 258,
        desc: "Skill activates every 28.5 sec\n+229,600 pts for Milky Way Star Jellies",
        reward: "🔥6,000  ❤️+30",
      },
	  {
        lv: 12,
        power: 267,
        desc: "Skill activates every 28.5 sec\n+246,700 pts for Milky Way Star Jellies",
        reward: "🔥6,000  ❤️+30",
      },
      {
        lv: 13,
        power: 276,
        desc: "Skill activates every 28.5 sec\n+263,800 pts for Milky Way Star Jellies",
        reward: "🔥6,000  ❤️+30",
      },
      {
        lv: 14,
        power: 285,
        desc: "Skill activates every 28.5 sec\n+280,900 pts for Milky Way Star Jellies",
        reward: "🔥6,000  ❤️+30",
      },
      {
        lv: 15,
        power: 294,
        desc: "Skill activates every 28.5 sec\n+298,000 pts for Milky Way Star Jellies",
        reward: "🔥6,000  ❤️+30",
      },
    ],
    skillFull:
      "Boards the Star Voyage Express and flies off at certain intervals. While in flight, star clusters appear flying past the train to the right. For each star cluster collected the train increases in speed and its smokestack lets out a certain amount of Milky Way Star Jellies. Level up for more points for Milky Way Star Jellies.",
    story:
      "Take a handful of star powder gathered from all over the Milky Way Galaxy, illuminate it with delicate moonlight—and voilà! Meet Milky Way Cookie, the Slumbering Moon's faithful servant and the conductor of the Star Voyage Express that will take you to your sweetest dreams and back.\n\nDon't be afraid and hop on: one sprinkle of Milky Way Cookie's star powder is enough for a colorful, vibrant dream—just like reality but better! Everything is possible in the World of Dreams, and accidents happen, too: every now and then, the train's floor disappears, and cars reshuffle randomly, leaving crowds of passengers in utter confusion. And right in the middle of the conductor's scheduled nap time! But professionalism never betrays, and there is no problem Milky Way Cookie can't sort out.\n\nColorful hair neatly tied with a Star Jelly, conductor's hat on, and choo choo! The Star Voyage Express will deliver you to your dreamy destination according to the schedule. Just make a wish upon a shooting star...!",
    quote: "Choo choo! Next station is... The World of Dreams!",
    affection: [
	  { n: 0, name: "Strangers" },
	  { n: 200, name: "Almost Friends" },
      { n: 400, name: "Friends" },
      { n: 800, name: "Good Friends", bonus: "+800 pts for Milky Way Star Jellies" },
      { n: 1000, name: "Best Friends", bonus: "+1,600 pts for Milky Way Star Jellies" },
    ],
    relations: [
      {
        who: "Space Doughnut",
        id: "space-doughnut",
		img: "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/b/bf/Crob_head_space_doughnut.png/30px-Crob_head_space_doughnut.png",
        text: "What a fun passenger! Where would you like to go? Everywhere in the World of Dreams?",
        type: "Friendly",
      },
	  {
        who: "Moonlight Cookie",
        id: "moonlight",
		img: "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/3/30/Crob_head_moonlight.png/30px-Crob_head_moonlight.png",
        text: "I would go anywhere in the World of Dreams... or the entire universe, if the Slumbering Moon desired it!",
        type: "Trust",
      },
	  {
        who: "Tiramisu Cookie",
        id: "tiramisu",
        text: "See you on the Stardust Platform right before the winter holiday! We need gifts for our passengers, after all!",
        type: "Friendly",
      },
	  {
        who: "Stollen Cookie",
        id: "stollen",
        text: "You dream about becoming the best conductor quite often! I wonder when that will come true, hehe!",
        type: "Friendly",
      },
	  {
        who: "Dreamweaver Cookie",
        id: "dreamweaver",
        text: "Navigating the World of Dreams is our specialty, after all!",
        type: "Trust",
      },
	  {
        who: "Blueberry Pie Cookie",
        id: "blueberry-pie",
        text: "Perhaps I should visit lonesome Cookies' dreams and tell them all about the Moon...!",
        type: "Friendly",
      },
	  {
        who: "Sugar Glass Cookie",
        id: "sugar-glass",
        text: "You should limit adventures through the City of Wizards to your dreams!",
        type: "Friendly",
      },
	  {
        who: "Elderberry Cookie",
        id: "elderberry",
        text: "I'd never expect a Cookie to know more about the Milky Way than I do!",
        type: "Friendly",
      },
	  {
        who: "Dreamjelly Cookie",
        id: "dreamjelly",
        text: "You'd make the perfect attendant for the Central Station in the World of Dreams!",
        type: "Friendly",
      },
    ],
    costumes: [
      { 
	    name: "Milky Way Cookie",
		img: "https://cdn.wikimg.net/en/cookierunwiki/images/8/87/Crob_standard_milky_way.png",
		desc: "Default Costume", 
		tier: "default", 
		emoji: "🚂", equipped: true, 
	  },
      {
        name: "Guide to Sweet Dreams",
        img: "https://cdn.wikimg.net/en/cookierunwiki/images/9/92/Guide_to_sweet_dreams.png",
		illust: "https://cdn.wikimg.net/en/cookierunwiki/images/e/ef/Img_skinIllust_457301.png",
        bonus: "+1,600 pts for Milky Way Star Jellies",
        tier: "superepic",
        emoji: "🌙",
        info: "Upon the night of the full moon, if you slip into your favorite pajamas and wait, you might just hear an unfamiliar sound from just outside your window. Take a glimpse outside and you'll see it's none other than Milky Way Cookie, choo choo!-ing her wat over to guide you into dreamland! Follow the sound and before you know it, you'll be deep, deep asleep. A good night's sleep with a cozy, relaxing dream sounds like an exhausted Cookie's dream come true!",
      },
	  {
        name: "Sweet Travel Gift",
        img: "https://cdn.wikimg.net/en/cookierunwiki/images/a/a8/Crob_standard_sweet_travel_gift.png",
		illust: "https://cdn.wikimg.net/en/cookierunwiki/images/0/00/Crob_illustration_sweet_travel_gift.png",
        bonus: "+1,600 pts for Milky Way Star Jellies",
        tier: "superepic",
        emoji: "💝",
        info: "Something feels different about the Star Voyage Express! The interior is bathed in pink colors and sweet candies... and then the conductor herself appears—just as adorably decorated—as she hands you a bouquet of strawberry candies! According to the Cookie, it's a special treat just for today's passengers. Imagine how sweet it would be to travel the dream world if every day was like this!",
      },
      {
        name: "Star Coal Express Engineer",
		img: "https://cdn.wikimg.net/en/cookierunwiki/images/2/27/Crob_standard_star_coal_express_engineer.png",
        bonus: "+800 pts for Milky Way Star Jellies",
        tier: "epic",
        emoji: "🚂",
        info: "In place of a certain engineer who has not yet arrived to the World of Dreams, Milky Way Cookie has taken the helm of the dream's Star Coal Express! While shoveling Star Coal into the furnace, the dancing sparks have a way oof completely stealing her attention, but don't worry! With her capable crew of Coco Drop helpers keeping everything on track, the train runs smooth as ever. Now then... the dream passengers at the Pancake Tower are waiting! All aboard, CHOO CHOO!",
      },
      {
        name: "Fluffy Like Cinnamoroll",
		img: "https://cdn.wikimg.net/en/cookierunwiki/images/8/82/Crob_standard_fluffy_like_cinnamoroll.png",
        bonus: "+400 pts for Milky Way Star Jellies",
        tier: "sanrio",
        emoji: "☁️",
        info: "Even trains have to travel along rough tracks from time to time! But put on this outfit inspired by Icon Cinnamoroll Cookie, and you'll only ever travel along routes as soft and cozy as the clouds! Maybe Milky Way Cookie can't quite believe she's finally getting to enjoy such a comfortable train ride again after all this time!",
        shop: "Sanrio characters! Costume Shop",
      },
    ],
    combi: [
      { type: "pet", id: "marshpillow", desc: "+300,000 pts for Milky Way Star Jellies" },
      {
        type: "treasure",
        id: "starlight-nightlight",
        desc: "+60,000 pts for Starlight Jellies",
      },
    ],
    candy: {
      name: "Milky Way Cookie's Magic Candy",
	  img: "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/0/0a/Crob_magic_candy_milky_way.png/150px-Crob_magic_candy_milky_way.png",
      levels: [
        {
          lv: 5,
          desc: "Skill activates every 9.5 sec\n+193,000 pts for Milky Way Candy Jellies",
          reward: "",
        },
      ],
	  skillFull: "The Star Voyage Express passes at certain intervals, dropping Milky Way Star Jellies. The stronger the enchanted power, the more points for Milky Way Star Jellies.",
      emoji: "🍬",
    },
  },
];