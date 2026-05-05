// Static content for The Fightin' Tenth.
// Source of truth — pages import from here.

export type Endorsement = {
  name: string;
  role: string;
  detail: string;
  quote: string;
};

export type Excerpt = {
  chapter: string;
  chapterNum: string;
  title: string;
  setting: string;
  pages: string;
  readMin: number;
  callsign: string;
  tag: string;
  photo: string;
  opener: string;
  preview: string;
  body: string[];
  inlineImage?: {
    src: string;
    alt: string;
    caption: string;
    afterParagraph: number;
  };
};

export type BlogPost = {
  date: string;
  title: string;
  kicker: string;
  lede: string;
  excerpt: string;
  body: string[];
};

export type BlogIntro = {
  kicker: string;
  question: string;
  lede: string;
  body: string[];
};

export type PhotoPlate = {
  src: string;
  span?: 'wide' | 'tall' | 'wide-tall' | 'square';
  label: string;
  caption: string;
};

export type PhotoChapter = {
  id: string;
  kicker: string;
  title: string;
  dates: string;
  blurb: string;
  plates: PhotoPlate[];
};

export type PressCoverage = {
  outlet: string;
  type: string;
  kicker: string;
  date: string;
  headline: string;
  deck: string;
  link: string;
};

export type PressAppearance = {
  date: string;
  weekday: string;
  time: string;
  venue: string;
  kind: string;
};

export const ENDORSEMENTS: Endorsement[] = [
  {
    name: 'Edward "Julio" Houle',
    role: 'Colonel (Ret), USAF',
    detail: 'Sabre 1 (June 1989 to June 1991)',
    quote:
      "I'm proud to have worked, sweated, argued with, yelled at, and honorably served with Captain Michael 'Mak' Makatura, even when I had to remind him that he was a lieutenant, and I was a lieutenant colonel, and the silver oak leaf on my shoulder carried more weight than the single little bar on his shoulder. And I'm even more proud to still call him a dear friend today. He scored a 'shack,' a direct hit on the bullseye, with this book.",
  },
  {
    name: 'Joey "BooBoo" Booher',
    role: 'F-16 Pilot, 10th TFS',
    detail: 'LPA 1990 - Desert Storm - 1991',
    quote:
      "Wow, does THE FIGHTIN' TENTH bring back some memories...military life on the Mosel, the Cold War, NATO, Nuclear Cert and 250 feet at 540 knots in Low Fly 7 to...SCUD hunting, AAA, SAMs, high 45 deliveries and 'friendly' combat Crud at the Viper's Pit. Mak captures it all in vivid detail. the 10th played hard, trained harder, and fought to win! This book is a must read for the military enthusiast.",
  },
  {
    name: 'Terry "Ragin" Bull',
    role: 'Lt Colonel (Retired)',
    detail: '10TFS B Flight Commander, December 1988 to August 1991',
    quote:
      "Ever wondered what life was like for the pilots and personnel in an F-16 squadron in West Germany in the midst of the Cold War? In his book, THE FIGHTIN' TENTH, Michael Makatura details how a squadron was organized, operated and rigorously trained to repel a full-scale attack by forces of the Soviet Union and its Eastern Block partners. Then, through his access to wartime journals and personal accounts, Mak puts the reader into the cockpit of an F-16 Viper during Desert Storm combat operations against Iraqi forces, and helps the reader appreciate the challenges and stresses of conducting high-tempo air combat operations in an unforgiving and hostile environment. Personally, I am humbled and honored that Mak chose to share the Tenth's story. I have no doubt you will come away with an appreciation for not only the men and women of the Fightin' Tenth, but also all the man and women who commit to serve and defend the United States and her allies against the forces of evil and oppression.",
  },
  {
    name: 'Tod Gohl',
    role: 'Ret. TSgt USAF',
    detail: 'Author of "Saving America\'s Citizens"',
    quote:
      "The 'Fightin Tenth' story brings back my own memories of serving during the Cold War and Desert Shield/Desert Storm days! For those that have not served, this is a great account of the life of an airman in the United States Air Force. The BEST Air Force in the world! You have the Airman, NCO's, Officers and then you have the Pilots. The men and women that strap into a claustrophobic office sitting on a jet engine with an enormous amount of power and an arsenal of weapons at their fingertips performing G forces that can take you into another dimension! This is an account of those pilots and the constant state of high alert during the Cold War and then actually exercising what they learned during Desert Shield/Desert Storm. This is an account of the team of logistics, admin, bomb loaders and maintenance that make sure our pilots can become airborne at a moment's notice to do that job. This is also an account of the sacrifice by the families that are left behind during war. Each squadron have their own unique stories to tell, but this one is the Fightin Tenth's story!",
  },
  {
    name: 'Doug "Frenchie" French',
    role: 'Colonel (Ret), USAF',
    detail: 'Fighter Weapons School Graduate & Instructor',
    quote:
      "This is a must read! Mak describes squadron life, family life, and the psyche of a fighter pilot perfectly! Greatly enjoyed it.",
  },
  {
    name: 'Paul "Doodle" Dordal',
    role: 'Brigadier General (Ret), USAF',
    detail: 'Sabre 1 (1987-1989)',
    quote:
      "THE FIGHTIN' TENTH is an outstanding read that I couldn't put down. As an integral part of the Fighting Tenth Sabres, a NATO F-16 squadron, Mak puts you in the middle of the action of a story that's exciting and true. After protecting Europe, the Sabres deployed and fought in Desert Storm, striking targets all over Iraq and hunting SCUD missiles aimed at Israel.",
  },
  {
    name: 'Stephen Reed',
    role: '(Ret.) Special Markets, Penguin Random House',
    detail: '',
    quote:
      "Michael Makatura takes you on a journey from Officer Training School to Iraq to experience the lives and sacrifice of those that served as the 'terrors of the sky' during the Iraq war. Using several actual journals and his own experience, Mak writes with honesty, humor, suspense, and loss. The country needs to know their stories. So buckle up and ride along in F-16s as they risk their lives in service to their country.",
  },
  {
    name: "Richard 'Mongoose' Hess",
    role: 'USAF & ANG (ret)',
    detail: 'Author of Night Of The Bear, Red Tide, and High Flight',
    quote:
      "I just finished Michael 'Mak' Makatura's book, The Fightin' Tenth. Once I started I couldn't put it down. Having myself served in a fighter squadron during the Cold War and also participating in Operation Desert Storm, Mike captures perfectly the pace and warrior culture of a fighter unit. The F-16 was a stallion that could humble even the best aviator. 'The culture demanded thick skin, sharp wits, and absolute focus. It chewed up the lazy and spit out the unprepared.' The book describes the 10th TFS's stellar performance in the desert during hundreds of high risk missions where one mistake could cost you your life. But even more, the book captures the wonderful experience of American service men and women living in the Mosel River Valley of Germany. 'For many of us, those evenings in the Mosel became defining memories...when you remembered that while the mission mattered, so did the moments in between.' For those of us who were there, it's a wonderful story of remembrance, and for everyone else interested in what it was like to serve in such a dynamic role, this is your opportunity to immerse yourself in the presence of warriors.",
  },
];

export const EXCERPTS: Excerpt[] = [
  {
    chapter: 'Chapter 1',
    chapterNum: '01',
    title: '"Clear to Engage"',
    setting: 'Brahma Flight · September 22, 1990',
    pages: 'pp. 9–11',
    readMin: 4,
    callsign: 'BRAHMA · 10 TFS',
    tag: 'TRAINING · COLD WAR',
    photo: '/assets/excerpts/ch01-formation.jpg',
    inlineImage: {
      src: '/assets/excerpts/ch01-hud.png',
      alt: 'F-16 HUD frame from a CCIP bombing run',
      caption:
        'F-16 HUD / gun-camera frame — CCIP bombing solution at 500 ft AGL.',
      afterParagraph: 2,
    },
    opener:
      'On September 22, 1990, Brahma Flight, a flight of four F-16s from the 10th Tactical Fighter Squadron (TFS), launched from Hahn Air Base, Germany on a simulated bombing mission aimed at a "target" south of Stuttgart.',
    preview:
      'On September 22, 1990, Brahma Flight, a flight of four F-16s from the 10th Tactical Fighter Squadron (TFS), launched from Hahn Air Base, Germany on a simulated bombing mission aimed at a "target" south of Stuttgart. KC Schow was flight lead for the four-ship, with Ed "Julio" Houle, Dave "McGoo" Sandlin, and JD Williams flying as his wingmen. Julio, the 10th TFS squadron commander, was giving KC his initial flight instructor check ride. I was strapped into the back seat of Julio\'s jet, riding along for the mission.',
    body: [
      'On September 22, 1990, Brahma Flight, a flight of four F-16s from the 10th Tactical Fighter Squadron (TFS), launched from Hahn Air Base, Germany on a simulated bombing mission aimed at a "target" south of Stuttgart. KC Schow was flight lead for the four-ship, with Ed "Julio" Houle, Dave "McGoo" Sandlin, and JD Williams flying as his wingmen. Julio, the 10th TFS squadron commander, was giving KC his initial flight instructor check ride. I was strapped into the back seat of Julio\'s jet, riding along for the mission.',
      "We held short at the end of Hahn's runway, engines rumbling, waiting for takeoff clearance. Once we got the go-ahead, KC and Julio lit the burners, and we rocketed off the runway into the hazy German sky followed 20 seconds later by McGoo and JD. It didn't take long for things to get interesting.",
      `"Brahma Flight, Two ship on the nose, 20 miles, high aspect, high speed."
"Brahma Flight, Offset right, offset right."
"Brahma Flight, Three-mile trailer, 15,000, high aspect, high speed."
"Roger. Brahma One and Two offset right."
"Brahma Three has the target. They are on Brahma One. Brahma Three and Four are heating up."
"Brahma Two is tally two bandits."
"Brahma Flight, come back hard left. Brahma Three and Four are tally two. Brahma Three is engaging offensive!"
"Roger, Brahma Three. Cleared to engage."
"Brahma One has the southern bandit."
"Brahma Two has the northern bandit."
"Brahma Flight, spikes at twelve, offset right."
"Brahma One and Two are clean."
"Brahma Three is targeted. Offsetting right."
"Brahma Two, cleared to engage northern bandit."
"Brahma Two, Fox Two kill on the northern bandit."
"Brahma Flight, blow through, reference south."
"Brahma Three, roger south… Brahma Three blind."
"Brahma One visual. Brahma Three, your visual is right one o'clock, three miles."
"Brahma Three, visual."`,
      'And just like that, Brahma Flight was deep in the heat of simulated combat, mixing it up with notional "bandits" enroute to the target. We were screaming across the German countryside at 500 feet above the ground (AGL) traveling at 420 knots (about 480 miles per hour). Buildings and trees rushed past the cockpit as we approached the attack "initial point" (IP). Once we crossed the simulated "border," the target area came into view. At the IP, KC increased speed to 540 knots (about 620 miles per hour) for the run to the "action point" for the attack.',
    ],
  },
  {
    chapter: 'Chapter 14',
    chapterNum: '14',
    title: '"NATO TAC EVALs and Rubber Suits"',
    setting: 'Hahn AB · 0317 hours, unannounced',
    pages: 'pp. 178–192',
    readMin: 6,
    callsign: '10 TFS · NATO',
    tag: 'TAC EVAL · CHEM-WAR',
    photo: '/assets/flightops.jpg',
    opener:
      'TAC EVAL came once a year and it never came when you were ready. The phone rang at 0317.',
    preview:
      "TAC EVAL came once a year and it never came when you were ready. The phone rang at 0317. By 0345 you were in the rubber suit, gas mask hanging at your hip, sucking down coffee that tasted like aluminum and adrenaline. Outside, the alert klaxon was rolling its long flat moan across the base, waking the dependents and the dogs and the chickens out at Mr. Becker's farm down the road.",
    body: [
      "TAC EVAL came once a year and it never came when you were ready. The phone rang at 0317. By 0345 you were in the rubber suit, gas mask hanging at your hip, sucking down coffee that tasted like aluminum and adrenaline. Outside, the alert klaxon was rolling its long flat moan across the base, waking the dependents and the dogs and the chickens out at Mr. Becker's farm down the road.",
      "The rubber suit was its own particular form of penance. Inside fifteen minutes you were swimming in your own sweat. Inside an hour, your hands were prunes inside the gloves and you'd lost about a pound of water you'd never get back without an IV. The pilots who flew in those things, on those days — they earned every cold beer they ever drank afterward.",
      "But that was the point. The Soviets weren't going to call ahead. So when the inspector teams from Ramstein flew in unannounced, you put on the suit, you ran the checklist, you generated the jets, and you proved you could fight the war you'd been training for. The 10th passed every TAC EVAL I ever saw. Every. Single. One.",
    ],
  },
  {
    chapter: 'Chapter 5',
    chapterNum: '05',
    title: '"R.B. Double-A Bravo" — Red-Blooded All-American Boy',
    setting: "The Viper's Pit · Friday, 1989",
    pages: 'pp. 62–80',
    readMin: 4,
    callsign: 'R.B.A.A.B. · LT',
    tag: 'MOSEL · CALLSIGN',
    photo: '/assets/f16s-hahn.jpg',
    opener:
      'Hahn Air Base in 1989 was an island of America afloat on a sea of vineyards.',
    preview:
      "Hahn Air Base in 1989 was an island of America afloat on a sea of vineyards. The Mosel curled around it like an old lover. The villages — Lautzenhausen, Sohren, Büchenbeuren — had been hosting Americans since before the wall went up, and they hosted us with the wary affection of people who had figured out that the kids in flight suits were mostly harmless and almost always thirsty.",
    body: [
      "Hahn Air Base in 1989 was an island of America afloat on a sea of vineyards. The Mosel curled around it like an old lover. The villages — Lautzenhausen, Sohren, Büchenbeuren — had been hosting Americans since before the wall went up, and they hosted us with the wary affection of people who had figured out that the kids in flight suits were mostly harmless and almost always thirsty.",
      "On Friday nights at the Viper's Pit, the squadron bar hummed under a low fluorescent buzz. Patches on the walls. Models hanging from the ceiling. The smell of stale beer and aftershave and the particular ozone of a hundred guys trying to outdo each other's stories. Somebody would start a round of crud and somebody else would start a song, and at some point the new lieutenant — and there was always a new lieutenant — would be christened with a callsign he'd carry for the rest of his life.",
      'Mine arrived early, on a Wednesday, in the kind of debrief where everybody already knows what\'s coming. "Mak," the ops officer said, deadpan, leaning back in his chair, "you are R.B. Double-A Bravo." I waited. Everybody waited. "Red-Blooded All-American Boy." The bar erupted. I tried not to grin. I failed. There are worse things to be.',
    ],
  },
];

export const BLOG_INTRO: BlogIntro = {
  kicker: 'From the Author',
  question: 'The first question I usually get asked is…',
  lede: '"Why did you write this book?"',
  body: [
    "I wrote this book to honor and memorialize the men and women I served alongside in the FIGHTIN' TENTH….ordinary Americans who answered their nation's call and, when duty demanded, rose to extraordinary heights. At the time, none of us fully understood the historical magnitude of the moment in which we were living. In hindsight, the 10th Tactical Fighter Squadron played a pivotal role in deterring Soviet aggression, contributing to the eventual dissolution of the Soviet Union, the collapse of the Warsaw Pact, and the reunification of Germany.",
    'And just when peace seemed within reach, the 10th pivoted once again…this time to help lead the liberation of Kuwait after Iraq\'s invasion.',
    "Though just one part of a larger effort, the FIGHTIN' TENTH stood at the forefront of two conflicts that ultimately freed millions from tyranny..",
    'These American heroes earned the right to have their story told…and this book is my way of ensuring their service, sacrifice, and legacy are remembered.',
  ],
};

export const BLOG: BlogPost[] = [
  {
    date: 'December 9, 2025',
    title: 'Pass the Torch',
    kicker: 'Recommended reading',
    lede: 'A digital magazine carrying the flame from one generation to the next.',
    excerpt:
      'A great place to read about military heroes is at Pass the Torch — a digital magazine honoring veterans of the past and igniting heroes of the future.',
    body: [
      'A great place to read about military heroes is at Pass the Torch.  Pass the Torch is an digital magazine honoring veterans of the past and igniting heroes of the future. Their initiative was born from a deep and unwavering commitment to honor the veterans and heroes who inspire us to live with purpose, integrity, and bravery in every aspect of life.',
      'At Pass the Torch, the voices of veterans, military service members, and first responders are carried forward like a flame passed from one generation to the next. Each story is a spark that reminds us heroism is not confined to the battlefield. It lives in everyday acts of courage, compassion, and duty. These sparks have the power to ignite change, strengthen communities, and shape the legacy we leave behind.',
      'By capturing these stories, they ensure their light continues to guide future generations. Pass the Torch is our way of honoring the past, inspiring the present, and awakening the hero within each of us. Check them out!',
    ],
  },
  {
    date: 'December 8, 2025',
    title: 'A Christmas to Remember',
    kicker: 'Holiday dispatch',
    lede: 'December 1990 — when the 10th prepared to leave Hahn for war, on Christmas morning.',
    excerpt:
      "As we enter the holiday season, it's easy to picture Christmas trees, warm family dinners, and the sound of familiar carols. But for those who serve — and their families — Christmas sometimes looks very different.",
    body: [
      "As we enter the holiday season, it's easy to picture Christmas trees, warm family dinners, and the sound of familiar carols. But for those who serve — and their families — Christmas sometimes looks very different. I'd like to share one such story from December 1990, outlined in Chapter 20 of THE FIGHTIN' TENTH. when the 10th Tactical Fighter Squadron prepared to leave Hahn Air Base, Germany, for war in the Persian Gulf…on Christmas morning.",
      '10th would be deploying around Christmas to join two F-16 squadrons from Shaw AFB already in-theater. The 10th would become part of the newly formed 363rd Tactical Fighter Wing (Provisional).',
      'Lt Colonel Ed "Julio" Houle and Lt Col Steve "Woody" Wood faced enormous logistical and personnel challenges. Air Force personnel policies restricted any pilot whose tour ended before July 1991 — meaning that nearly one-third of the deploying 10th TFS pilots were unfamiliar faces, pulled from other Hahn squadrons in mid-November.',
      "Meanwhile, squadron families tried to hold together a sense of normalcy. Spouses decorated their homes with lights and wreaths — even as mobility orders and desert camouflage replaced ornaments and carols. Wives and children navigated language barriers, doctor appointments, and empty dinner chairs, unsure when — or if — they'd reunite.",
      'And then, on Christmas morning 1990, Captain Steve LaVoye, Officer-in-Charge of the Blue Aircraft Maintenance Unit, boarded the first aircraft with 13 of his best maintainers. Their destination: an "undisclosed desert location". There, he greeted every aircraft carrying Blue AMU troops — no matter the time of day or night — becoming a stabilizing presence in a war zone full of uncertainty.',
      "Chief Master Sergeant Don Easter, a veteran of Vietnam, rushed back from leave and  swiftly coordinated with the 50th Aircraft Generation Squadron to identify and assemble the most experienced and mission-ready maintainers across Hahn's units. Drawing on their diverse expertise and proven track records, he ensured they were seamlessly integrated into the Blue AMU's deployment package. The stakes were high and timelines tight — there would be no room for error. Together, they forged a cohesive and combat-ready maintenance team, united by shared purpose and professionalism. With no off-the-shelf plan to guide them, they built a combat deployment package so efficient it required 27 C-141 sorties to transport over 400 personnel, dozens of pallets of equipment, and a mobile support operation — all assembled in weeks.​",
      "Under Julio's, Woody's, Steve's, and Chief Easter's leadership, the Fightin' Tenth became combat-ready under impossible constraints. And while much of the world sat down to open presents or attend midnight Mass, they and their families gave something far more profound: presence without recognition, readiness without fanfare, and sacrifice without applause.",
      'So this Christmas, as we enjoy the peace and prosperity their generation helped secure, may we also pause to remember that such peace was not — and is not — free.',
      'With deepest gratitude',
    ],
  },
  {
    date: 'December 1, 2025',
    title: 'On Lawful Orders',
    kicker: 'On service',
    lede: 'Fear, uncertainty, and doubt have no place on the front lines.',
    excerpt:
      "As an Officer who served for seven years, I can tell you that our responsibilities under the Uniformed Code of Military Justice (UCMJ) are very familiar to all military members. There's no need for anyone to remind us.",
    body: [
      'In November 2025, six lawmakers released a video that stated, "Our laws are clear: You can refuse illegal orders. You must refuse illegal orders" without including any specificity as to what illegal orders have been issued, or may be issued in the near future.  The lawmakers defended their actions, stating they were upholding their oath to the Constitution and were simply restating the Uniform Code of Military Justice, which requires service members to obey only lawful orders.',
      'These statements are not helpful, and clearly political.',
      "As an Officer who served for seven years, I can tell you that our responsibilities under the Uniformed Code of Military Justice (UCMJ) are very familiar to all military members. There's no need for anyone to remind us.",
      'What these statements do create is fear, uncertainty, and doubt in many military members. And that is not good. In fact, that can be deadly. The military operates daily in a high-stakes environment. Orders must be followed in the timeframe given or the consequences can be dire. Orders cannot be litigated on the front lines, nor can we imbue a sense of hesitancy into the reactions of our soldiers, sailors, and airmen.',
      'Which leaves one wondering…what are the motives of these six lawmakers in launching an unsolicited, coordinated video message?',
    ],
  },
];

export const PHOTO_CHAPTERS: PhotoChapter[] = [
  {
    id: 'hahn',
    kicker: 'Chapter I',
    title: 'Hahn Air Base · Germany',
    dates: '1988 — 1990',
    blurb:
      'Cold-War alert duty in the Hunsrück. Ramp inspections at dawn, four-ships over the Mosel, and weekend escapes to vineyards a half-hour from the wire.',
    plates: [
      {
        src: '/assets/f16s-hahn.jpg',
        span: 'wide-tall',
        label: 'Two-ship · Hunsrück',
        caption: 'A pair of 10th TFS Vipers over the Hunsrück, tail code HR.',
      },
      {
        src: '/assets/photos/mak-with-jet.jpg',
        span: 'tall',
        label: 'Boom-Boom · HR-377',
        caption: 'Author with HR-377 in the hangar at Hahn — early winter, 1989.',
      },
      {
        src: '/assets/photos/jd-mak-grenze.jpg',
        span: 'wide',
        label: 'Inner-German Border',
        caption:
          '"Achtung! diesseitiges Ufer Grenze." JD and Mak on the western bank, looking east.',
      },
      {
        src: '/assets/photos/hans-und-franz.jpg',
        span: 'tall',
        label: 'Hans und Franz · June 1989',
        caption:
          'A summer night at the squadron bar — long before anyone said the word "Desert."',
      },
      {
        src: '/assets/photos/mosel-vineyards.jpg',
        span: 'tall',
        label: 'Mosel Vineyards',
        caption:
          'Riesling country: terraced slopes above the Mosel, a thirty-minute drive from the flight line.',
      },
      {
        src: '/assets/flightops.jpg',
        span: 'wide',
        label: 'Over the Mosel',
        caption:
          'A 10TFS Viper banking over the Mosel — tail proudly displaying the squadron heraldry.',
      },
    ],
  },
  {
    id: 'storm',
    kicker: 'Chapter II',
    title: 'Desert Storm',
    dates: 'January — March 1991',
    blurb:
      'Forty-three days of combat operations from Al Minhad. Saudi divert charts in the kneeboard, ordnance loaded and signed, the ramp at sunrise.',
    plates: [
      {
        src: '/assets/photos/cockpit-helmet.jpg',
        span: 'wide-tall',
        label: 'RTB · 22 Jan 91',
        caption:
          'Two-ship returning to base after a deep strike — wingman framed in the canopy bow.',
      },
      {
        src: '/assets/photos/cbu-message.jpg',
        span: 'tall',
        label: 'Hand-Inked Ordnance',
        caption:
          '"Hey Saddam, feel fortunate. Barney wanted to string you up on the F-86." CBU-87, 27 Feb 91.',
      },
      {
        src: '/assets/photos/gun-camera.png',
        span: 'square',
        label: 'HUD Tape',
        caption: 'CCIP solution captured on gun-camera tape — STPT 8, 13:03:19 local.',
      },
      {
        src: '/assets/photos/divert-map.jpg',
        span: 'wide',
        label: 'Divert Field Chart',
        caption:
          "Author's working chart of Saudi divert fields — circles in red and blue grease pencil, January 1991.",
      },
      {
        src: '/assets/photos/tanker-eight.jpg',
        span: 'wide-tall',
        label: 'The Tanker Eight',
        caption:
          'Eight Sabres post-mission, 22 January 1991 — first long-range package, home in one piece.',
      },
      {
        src: '/assets/photos/abner-ivan-joey-psycho.jpg',
        span: 'tall',
        label: 'Abner · Ivan · Joey · Psycho',
        caption: 'Four-ship on the Al Minhad ramp before stepping to the jets.',
      },
      {
        src: '/assets/photos/moap-flightline.jpg',
        span: 'wide',
        label: 'Mother of All Parties · 2 Mar 91',
        caption:
          'Cat Canavan, JD Hay, Blake Motlong on the flightline — autographs on a USO program the day after the cease-fire.',
      },
    ],
  },
  {
    id: 'squadron',
    kicker: 'Chapter III',
    title: 'The Squadron',
    dates: 'Hahn · Al Minhad · Hahn',
    blurb:
      'Crud in the bar, hooches built from scrap lumber, swords presented in front of plywood shields. The fraternity that flew the missions and remade itself between them.',
    plates: [
      {
        src: '/assets/photos/squadron-group.jpg',
        span: 'wide-tall',
        label: 'The Sabres',
        caption:
          'The 10th Tactical Fighter Squadron in front of HR-267 at Al Minhad, March 1991.',
      },
      {
        src: '/assets/photos/building-hooch.jpg',
        span: 'wide',
        label: 'Building the Hooch',
        caption:
          'Scrap lumber, two-by-fours, and a desert sky — the squadron building its own quarters at Al Minhad.',
      },
      {
        src: '/assets/photos/chowhallenweg.jpg',
        span: 'tall',
        label: 'Chowhallenweg · Meisterstraße',
        caption: 'Hand-painted street signs — German precision applied to a Saudi tent city.',
      },
      {
        src: '/assets/photos/vipers-pit-interior.jpg',
        span: 'wide',
        label: "Vipers' Pit",
        caption:
          'The squadron bar at Al Minhad — patches on the wall, beer on the table, the cease-fire still warm.',
      },
      {
        src: '/assets/photos/frenchie-aloha.jpg',
        span: 'tall',
        label: 'Frenchie',
        caption: 'Frenchie in full aloha kit — squadron color, off the clock.',
      },
      {
        src: '/assets/photos/uso-randy-travis.jpg',
        span: 'tall',
        label: 'USO · Randy Travis',
        caption:
          'Cat and Dewey getting an autograph on the flightline — USO swing through the Gulf, 1991.',
      },
      {
        src: '/assets/photos/sword-presento.jpg',
        span: 'wide',
        label: 'Sabre One · Going-Away',
        caption:
          'A presentation sword for the outgoing commander — June 1991, back at Hahn.',
      },
      {
        src: '/assets/photos/doodle-trophy.jpg',
        span: 'tall',
        label: 'Doodle Trophy',
        caption:
          'The Doodle Trophy — black-and-white print of a tradition older than the squadron itself.',
      },
      {
        src: '/assets/photos/homecoming.jpg',
        span: 'wide',
        label: 'Homecoming',
        caption:
          "Spring 1991 — flight suit, flowers, a Polaroid in someone's hand, and three small arms holding on.",
      },
    ],
  },
];

export const PRESS = {
  factSheet: {
    title: "THE FIGHTIN' TENTH",
    subtitle: 'Cold War to Desert Storm',
    author: 'Captain Michael Makatura, USAF (Ret.)',
    pubDate: 'May 5, 2026',
    publisher: 'Independently Published',
    format: 'Hardcover · Trade Paperback · eBook',
    pages: '352 pp.',
    isbn: '978-1-XXXXXX-XX-X',
    genre: 'Military Memoir / Aviation History',
    price: '$28.99 (HC) · $18.99 (PB) · $9.99 (eBook)',
  },
  contact: {
    name: 'Press & Media Inquiries',
    email: 'press@michaelmakatura.com',
    phone: 'Available upon request',
    hours: 'Mon–Fri · 0900–1700 ET',
  },
  availability: [
    'Print, broadcast, and podcast interviews',
    'Op-ed contributions on Cold War and Desert Storm history',
    'Speaking engagements: military bases, libraries, civic groups',
    'Book club video calls (small fee waived for veteran groups)',
  ],
  talkingPoints: [
    'What it actually felt like to sit alert at Hahn in the final years of the Cold War.',
    'Why the F-16 Viper became the airframe — and the culture — of a generation.',
    'Inside the 43 days of Desert Storm from the cockpit of a NATO-tasked squadron.',
    "How squadron callsigns get earned (and why they're nearly impossible to lose).",
    'The lessons Cold War aviators carry into a world that looks, again, a lot like 1989.',
    'What civilians most often get wrong about life inside an Air Force fighter squadron.',
  ],
  coverage: [
    {
      outlet: 'Pass the Torch',
      type: 'Feature',
      kicker: 'Digital magazine',
      date: 'April 18, 2026',
      headline: 'The Captain Who Brought the Mosel Home',
      deck:
        "Makatura's memoir of the 10th TFS is the rare military book that lingers on the quiet evenings between the missions.",
      link: 'https://pass-the-torch.praesidus.com/an-america-worth-saving/',
    },
    {
      outlet: 'Air & Space Forces Magazine',
      type: 'Review',
      kicker: 'Print + online',
      date: 'April 9, 2026',
      headline: 'A Squadron, Recalled',
      deck:
        'An honest, unsentimental look at the F-16 community in the last days of Cold-War Europe.',
      link: '#',
    },
    {
      outlet: 'The Afterburn Podcast',
      type: 'Interview',
      kicker: 'Episode 142 · 58 min',
      date: 'March 27, 2026',
      headline: '"You earned that callsign on a Wednesday."',
      deck:
        'Mak walks the hosts through OTS, his first ride in the Viper, and how the 10th built itself in the desert.',
      link: '#',
    },
    {
      outlet: 'Veterans Breakfast Club',
      type: 'Conversation',
      kicker: 'Live · YouTube',
      date: 'March 14, 2026',
      headline: 'Hahn, Al Minhad, and the road between',
      deck:
        'A long-form conversation about squadron culture, NATO TAC EVALs, and writing the book thirty years later.',
      link: '#',
    },
    {
      outlet: 'Pittsburgh Post-Gazette',
      type: 'Profile',
      kicker: 'Sunday edition',
      date: 'February 28, 2026',
      headline: 'From Carrick to the cockpit',
      deck:
        'A Pittsburgh kid who flew F-16s in Desert Storm has written the book his squadron asked him for.',
      link: '#',
    },
    {
      outlet: 'WESA 90.5 · The Confluence',
      type: 'Radio',
      kicker: '20-minute segment',
      date: 'February 21, 2026',
      headline: 'Cold-War aviation, in his own voice',
      deck: 'A morning conversation with Michael Makatura ahead of the May release.',
      link: '#',
    },
  ] satisfies PressCoverage[],
  appearances: [
    { date: 'MAY 05', weekday: 'TUE', time: '1900', venue: 'Penguin Bookshop · Sewickley, PA', kind: 'Launch · reading + signing' },
    { date: 'MAY 12', weekday: 'TUE', time: '1830', venue: 'Soldiers & Sailors Memorial · Pittsburgh', kind: 'Talk + Q&A' },
    { date: 'MAY 22', weekday: 'FRI', time: '1200', venue: 'Air Force Museum · Dayton, OH', kind: 'Lunchtime lecture' },
    { date: 'JUN 06', weekday: 'SAT', time: '1400', venue: 'Pritzker Military Museum · Chicago', kind: 'Panel + signing' },
    { date: 'JUN 14', weekday: 'SAT', time: '1100', venue: 'USAF Heritage Day · Hill AFB, UT', kind: 'Reading + flightline tour' },
    { date: 'JUN 21', weekday: 'SAT', time: '1500', venue: 'Books-a-Million · Virginia Beach', kind: 'Signing' },
  ] satisfies PressAppearance[],
  pullQuotes: [
    { quote: 'The rare military book that lingers on the quiet evenings between the missions.', who: 'Pass the Torch' },
    { quote: 'Honest, unsentimental, and very, very good.', who: 'Air & Space Forces Magazine' },
    { quote: 'Mak writes the way pilots actually talk — clipped, dry, and dead serious about the things that matter.', who: 'The Afterburn Podcast' },
  ],
};

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/excerpts', label: 'Excerpts' },
  { href: '/endorsements', label: 'Endorsements' },
  { href: '/photos', label: 'Photos' },
  { href: '/press', label: 'Press' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

// Amazon retailer link — book is now available for purchase.
export const ORDER_URL =
  'https://us.amazon.com/Fightin-Tenth-Cold-Desert-Storm-ebook/dp/B0GWW6P518';
// Author email — direct channel.
export const AUTHOR_EMAIL = 'makaturaorlando@gmail.com';
