var videos = [
  { path: "keep-my-coo", name: "Keep My Coo", artists: ["Lil Peep"] },
  { path: "live-forever", name: "Live Forever", artists: ["Lil Peep"] },
  { path: "gym-class", name: "Gym Class", artists: ["Lil Peep"] },
  {
    path: "hollywood-dreaming",
    name: "Hollywood Dreaming",
    artists: ["Lil Peep", "Gab3"],
  },
  { path: "beamer-boy", name: "beamer boy", artists: ["Lil Peep", "Nedarb"] },
  {
    path: "lil-kennedy",
    name: "lil kennedy",
    artists: ["Lil Peep", "Nedarb"],
  },
  { path: "2nd-hand", name: "2nd Hand", artists: ["$uicideboy$"] },
  { path: "face-it", name: "Face It", artists: ["$uicideboy$"] },
  {
    path: "for-the-last-time",
    name: "For the Last Time",
    artists: ["$uicideboy$"],
  },
  { path: "matte-black", name: "Matte Black", artists: ["$uicideboy$"] },
  {
    path: "new-chains-same-shackles",
    name: "New Chains, Same Shackles",
    artists: ["$uicideboy$"],
  },
  {
    path: "suicideboys-were-better-in-2015",
    name: "$uicideboy$ were better in 2015",
    artists: ["$uicideboy$"],
  },
  {
    path: "not-even-ghosts-are-this-empty",
    name: "Not Even Ghosts Are This Empty",
    artists: ["$uicideboy$"],
  },
  {
    path: "gutter-bravado",
    name: "Gutter Bravado",
    artists: ["$uicideboy$", "Shakewell"],
  },
  {
    path: "i-dream-of-chrome",
    name: "I Dream of Chrome",
    artists: ["$uicideboy$", "Germ"],
  },
  {
    path: "sorry-for-the-delay",
    name: "Sorry for the Delay",
    artists: ["$uicideboy$", "Germ"],
  },
  {
    path: "to-have-and-have-not",
    name: "To Have and Have Not",
    artists: ["$uicideboy$"],
  },
  {
    path: "kein-pflaster",
    name: "Kein Pflaster",
    artists: ["GlenGang 030", "Joey99", "ODG"],
  },
  {
    path: "platz-in-der-stadt",
    name: "Platz in der Stadt",
    artists: ["GlenGang 030", "Jonzon104", "JulioMC", "Kilian437"],
  },
  {
    path: "eden-im-herz",
    name: "Eden im Herz",
    artists: ["GlenGang 030", "Kilian437", "Joey99"],
  },

  {
    path: "graue-maenner",
    name: "Graue Männer",
    artists: ["GlenGang 030", "JulioMC", "Kilian437", "Joey99"],
  },
  {
    path: "pillz",
    name: "Pillz",
    artists: ["GlenGang 030", "JulioMC", "ODG", "Jonzon104"],
  },
  {
    path: "packs-ein",
    name: "Packs Ein",
    artists: ["GlenGang 030", "Kilian437", "JulioMC"],
  },
  {
    path: "statement",
    name: "Statement",
    artists: [
      "GlenGang 030",
      "Grzegorz",
      "Joey99",
      "Kilian437",
      "Samo104",
      "Ocboyblau",
      "Jonzon104",
      "JulioMC",
      "ODG",
    ],
  },
  {
    path: "fuer-immer-gg",
    name: "Für immer",
    artists: ["GlenGang 030", "Jonzon104", "Joey99", "JulioMC"],
  },
  {
    path: "dreck",
    name: "Dreck",
    artists: ["GlenGang 030", "Joey99", "Kilian437", "JulioMC"],
  },
  {
    path: "evil",
    name: "Evil",
    artists: ["GlenGang 030", "Kilian437", "JulioMC"],
  },
  {
    path: "schatten",
    name: "Schatten",
    artists: ["Ocboyblau"],
  },
  { path: "oxycodon", name: "Oxycodon", artists: ["t-low"] },
  { path: "bankaccount", name: "BANKACCOUNT", artists: ["t-low"] },
  {
    path: "vorsichtig",
    name: "Vorsichtig",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "fliegen-laesst",
    name: "Fliegen lässt",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "bestes-leben-remix",
    name: "Bestes Leben (Remix)",
    artists: ["Heinie Nüchtern", "t-low"],
  },
  { path: "80ox", name: "80 O X", artists: ["Heinie Nüchtern"] },
  {
    path: "verdient",
    name: "Verdient",
    artists: ["Yung Vision", "Heinie Nüchtern", "Doktor Sterben"],
  },
  { path: "besser-allein", name: "Besser allein", artists: ["Sevi Rin"] },
  { path: "aufgehoert", name: "Aufgehört", artists: ["Sevi Rin", "t-low"] },
  { path: "geheimnis-2", name: "Geheimnis 2", artists: ["Sevi Rin", "t-low"] },
  {
    path: "einmal-verliebt-3",
    name: "Einmal verliebt 3",
    artists: ["Sevi Rin"],
  },
  {
    path: "fuer-immer",
    name: "Für Immer",
    artists: ["Sevi Rin", "Young Lime"],
  },
  { path: "heisshunger", name: "Heißhunger", artists: ["Sevi Rin"] },
  {
    path: "perky-bag",
    name: "Perky Bag",
    artists: ["Sevi Rin", "killdummies"],
  },
  {
    path: "jungs-mit-rueckgrat",
    name: "Jungs mit Rückgrat",
    artists: ["102 Boyz", "Chapo102", "Stacks102"],
  },
  {
    path: "heineken-emblem",
    name: "Heineken Emblem",
    artists: [
      "102 Boyz",
      "Chapo102",
      "Skoob102",
      "KKuba102",
      "Addikt102",
      "Duke102",
      "Stacks102",
    ],
  },
  {
    path: "uber-xl",
    name: "Uber XL",
    artists: ["Addikt102", "Stacks102", "102 Boyz"],
  },
  {
    path: "packs-auf-mir",
    name: "Packs auf mir",
    artists: ["102 Boyz", "65Goonz", "Chapo102", "Addikt102"],
  },
  {
    path: "4-schritte",
    name: "4 Schritte",
    artists: ["65Goonz", "TM", "Endzone", "Ezco 44"],
  },
  { path: "mr-x", name: "Mr. X", artists: ["Lucio101"] },
  {
    path: "bunte-flavours",
    name: "Bunte Flavours",
    artists: ["Lucio101", "Nizi19", "Omar101"],
  },
  {
    path: "bunte-papiere",
    name: "Bunte Papiere",
    artists: ["Lucio101", "Lerizzle", "Omar101"],
  },
  {
    path: "powerade",
    name: "Powerade",
    artists: ["Ion Miles", "SiraOne", "BHZ"],
  },
  {
    path: "top-auf",
    name: "Top Auf",
    artists: ["Ion Miles", "BHZ"],
  },
  {
    path: "kalenji",
    name: "Kalenji",
    artists: ["G.FiT", "Keanu"],
  },
  {
    path: "nachts-wach",
    name: "Nachts wach",
    artists: ["Miksu / Macloud", "makko"],
  },
];

const litkidsVideos = [
  { path: "litkids-goldrausch", name: "Goldrausch", artists: ["negatiiv OG"] },
  {
    path: "litkids-crashen",
    name: "Crashen",
    artists: ["t-low"],
  },
  {
    path: "litkids-sehnsucht",
    name: "Sehnsucht",
    artists: ["t-low"],
  },
  {
    path: "litkids-we-made-it-1",
    name: "We Made It 1",
    artists: ["t-low"],
  },
  {
    path: "litkids-we-made-it-2",
    name: "We Made It 2",
    artists: ["t-low"],
  },
  {
    path: "litkids-geh-allein",
    name: "Geh Allein",
    artists: ["t-low"],
  },
  {
    path: "litkids-aufgehoert",
    name: "Aufgehört",
    artists: ["Sevi Rin", "t-low"],
  },
  {
    path: "litkids-beautiful-drugs",
    name: "Beatiful Drugs",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-beautiful-drugs-zugabe",
    name: "Beatiful Drugs encore",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-bin-1-litkid",
    name: "Bin 1 LiTKiD",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-dumm-gehen-will",
    name: "Dumm gehen will",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-flasche-leer",
    name: "Flasche leer",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-fliegen-laesst",
    name: "Fliegen lässt",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-lebenswerk",
    name: "Lebenswerk",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-sprite-fuer-mich",
    name: "Sprite für mich",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-vorsichtig-1",
    name: "Vorsichtig 1",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-vorsichtig-2",
    name: "Vorsichtig 2",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
  {
    path: "litkids-vorsichtig-3",
    name: "Vorsichtig 3",
    artists: ["Heinie Nüchtern", "t-low", "Sevi Rin"],
  },
];
