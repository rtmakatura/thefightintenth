// Phase 3 migration: populates excerpts with full v1 rich fields (callsign, tag,
// setting, pages, readMin, opener, preview, photo, inlineImage, body) and
// expands blogPosts with kicker/lede + creates the blogIntro singleton.
//
// Idempotent: re-running upserts via deterministic IDs.
//
// Run with:
//   node --env-file=.env.local scripts/migrate-phase-3.mjs
//
// Requires SANITY_API_WRITE_TOKEN in .env.local (Editor permission).

import { createClient } from '@sanity/client';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const client = createClient({
  projectId: required('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: required('NEXT_PUBLIC_SANITY_DATASET'),
  token: required('SANITY_API_WRITE_TOKEN'),
  apiVersion: '2026-05-23',
  useCdn: false,
});

// ===== v1 EXCERPTS (from fightin-tenth-site/lib/content.ts) =====

const EXCERPTS = [
  {
    id: 'excerpt-1',
    chapterNumber: 1,
    chapterLabel: 'Chapter 1',
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
      caption: 'F-16 HUD / gun-camera frame — CCIP bombing solution at 500 ft AGL.',
      afterParagraph: 2,
    },
    opener:
      'On September 22, 1990, Brahma Flight, a flight of four F-16s from the 10th Tactical Fighter Squadron (TFS), launched from Hahn Air Base, Germany on a simulated bombing mission aimed at a "target" south of Stuttgart.',
    preview:
      'On September 22, 1990, Brahma Flight, a flight of four F-16s from the 10th Tactical Fighter Squadron (TFS), launched from Hahn Air Base, Germany on a simulated bombing mission aimed at a "target" south of Stuttgart. KC Schow was flight lead for the four-ship, with Ed "Julio" Houle, Dave "McGoo" Sandlin, and JD Williams flying as his wingmen. Julio, the 10th TFS squadron commander, was giving KC his initial flight instructor check ride. I was strapped into the back seat of Julio\'s jet, riding along for the mission.',
    body: [
      'On September 22, 1990, Brahma Flight, a flight of four F-16s from the 10th Tactical Fighter Squadron (TFS), launched from Hahn Air Base, Germany on a simulated bombing mission aimed at a "target" south of Stuttgart. KC Schow was flight lead for the four-ship, with Ed "Julio" Houle, Dave "McGoo" Sandlin, and JD Williams flying as his wingmen. Julio, the 10th TFS squadron commander, was giving KC his initial flight instructor check ride. I was strapped into the back seat of Julio\'s jet, riding along for the mission.',
      "We held short at the end of Hahn's runway, engines rumbling, waiting for takeoff clearance. Once we got the go-ahead, KC and Julio lit the burners, and we rocketed off the runway into the hazy German sky followed 20 seconds later by McGoo and JD. It didn't take long for things to get interesting.",
      `"Brahma Flight, Two ship on the nose, 20 miles, high aspect, high speed."\n"Brahma Flight, Offset right, offset right."\n"Brahma Flight, Three-mile trailer, 15,000, high aspect, high speed."\n"Roger. Brahma One and Two offset right."\n"Brahma Three has the target. They are on Brahma One. Brahma Three and Four are heating up."\n"Brahma Two is tally two bandits."\n"Brahma Flight, come back hard left. Brahma Three and Four are tally two. Brahma Three is engaging offensive!"\n"Roger, Brahma Three. Cleared to engage."\n"Brahma One has the southern bandit."\n"Brahma Two has the northern bandit."\n"Brahma Flight, spikes at twelve, offset right."\n"Brahma One and Two are clean."\n"Brahma Three is targeted. Offsetting right."\n"Brahma Two, cleared to engage northern bandit."\n"Brahma Two, Fox Two kill on the northern bandit."\n"Brahma Flight, blow through, reference south."\n"Brahma Three, roger south… Brahma Three blind."\n"Brahma One visual. Brahma Three, your visual is right one o'clock, three miles."\n"Brahma Three, visual."`,
      'And just like that, Brahma Flight was deep in the heat of simulated combat, mixing it up with notional "bandits" enroute to the target. We were screaming across the German countryside at 500 feet above the ground (AGL) traveling at 420 knots (about 480 miles per hour). Buildings and trees rushed past the cockpit as we approached the attack "initial point" (IP). Once we crossed the simulated "border," the target area came into view. At the IP, KC increased speed to 540 knots (about 620 miles per hour) for the run to the "action point" for the attack.',
    ],
  },
  {
    id: 'excerpt-5',
    chapterNumber: 5,
    chapterLabel: 'Chapter 5',
    title: '"R.B. Double-A Bravo"',
    setting: 'Tactical Callsigns · The Real Names of War',
    pages: 'pp. 62–66',
    readMin: 5,
    callsign: 'R.B.A.A.B. · 10 TFS',
    tag: 'NAMING · TRADITION',
    photo: '/assets/excerpts/ch05-callsigns.jpg',
    inlineImage: {
      src: '/assets/excerpts/ch05-pilots.jpg',
      alt: '10th Tactical Fighter Squadron pilots',
      caption: '10th TFS · Hahn Air Base.',
      afterParagraph: 3,
    },
    opener:
      'One of the most sacred. . .and most humiliating. . .traditions in fighter pilot culture is the naming ceremony.',
    preview:
      "One of the most sacred. . .and most humiliating. . .traditions in fighter pilot culture is the naming ceremony. Nobody picks their own call sign. It's not a gamer tag, a pilot's license alias, or something cool you write on a helmet. It's earned the hard way. . .through mistake, misfortune, or something stupid you said in a mission brief.",
    body: [
      "One of the most sacred. . .and most humiliating. . .traditions in fighter pilot culture is the naming ceremony. Nobody picks their own call sign. It's not a gamer tag, a pilot's license alias, or something cool you write on a helmet. It's earned the hard way. . .through mistake, misfortune, or something stupid you said in a mission brief.",
      "What happened after the initial humbling was an equally funny process. The Naming Ceremony. The process is half roast, half rite of passage. Once a new pilot finishes MQT (Mission Qualification Training) and completes their first handful of operational sorties, they're considered MR (Mission Ready). A naming ceremony is scheduled. . .usually tied to a big deployment. The bar is stocked. The crowd is ready. And the gloves are off.",
      'The event begins with a series of "nominations," where squadron members share stories, each ending in a proposed call sign. These are almost always humiliating. The best ones have layers. . .referencing an incident, a personality quirk, a famous historical figure, or something deeply inside-joke level. After debate, bribery, and heckling, a vote is taken, and the new call sign is announced with a toast (and often a shot of something terrible).',
      'Perhaps a few examples are in order (which also gives me an opportunity to re-live the inside jokes!)',
      'Craig Wilkerson became "Skip" after strafing the skip pit on a practice target range and sending 20 mm bullets into the airspace. Strafing is a form of low-level attack where aircraft use onboard guns to fire on ground targets. On an air-to-ground gunnery range, two common target areas are strafe pits and skip pits. Strafe pits usually consist of pits filled with sand that absorb or capture the bullets. Skip pits are similar in shape, however instead of sand they are concrete, which allows a pilot\'s bombs to "skip" off the concrete and onto the target. So, if a pilot strafes a skip pit, instead of the bullets getting absorbed by the sand, they skip off the concrete and become lethal to whatever is in their way. Hence, Craig Wilkerson became "Skip" Wilkerson!',
      'John Evans became "Luigi" when he dropped a simulated training nuke and the parachute failed to deploy, sending the "slick" training bomb through the roof of a guy named Luigi who lived near Helchteren Range in Belgium. Nuclear bombs often come with retardation systems…parachutes or ballutes…to slow descent, giving the delivering aircraft time to escape the blast zone. In pilot jargon, when a nuclear weapon is delivered "slick", it means the bomb is dropped without a parachute retardation system…in other words, free-fall. Instead of falling slowly on the target, if the parachute doesn\'t open the bomb keeps flying…in this case until it hits a house. The real Luigi was watching TV in his living room when the bomb landed on the floor in front of him.',
      'Glen Lawson became "Lunar" when, during a night intercept training mission, he decided to see if his AIM-9 Sidewinder training missile would recognize the heat signature coming off the moon. Of course, while the moon does have a heat signature… his flight lead\'s exhaust was much more prominent! (To this day, Lunar swears the IR energy coming from the moon was "full and glorious" and the AIM-9 tracked the moon in "spectacular fashion". However, let\'s not allow the truth to ruin a good story!) His instructor discovered this faux pas during the debriefing when they reviewed Glen\'s HUD video and it was obvious Glen was trying to get a heat lock on the moon…and maneuvering his jet to put the flight lead\'s jet in the HUD video. (Years later Lunar flew with the Thunderbirds and Julio had the opportunity to share Glen\'s call-sign story with the team, much to Lunar\'s distress and the rest of the team\'s delight. Lunar continues to insist his only mistake was showing the HUD video during debrief. No rebuttals!)',
      "Once it's assigned, that's your identity. . .at least in the squadron, on the radio, and often for life. You can't undo it. You just have to own it. And now, 35 years later, Skip, Deathwish, Luigi, and Lunar are still how we all endearingly refer to them!",
    ],
  },
  {
    id: 'excerpt-15',
    chapterNumber: 15,
    chapterLabel: 'Chapter 15',
    title: '"NATO TAC EVALs and Rubber Suits"',
    setting: 'Hahn AB · NATO TAC EVAL',
    pages: 'pp. 133–134',
    readMin: 4,
    callsign: '10 TFS · NATO',
    tag: 'TAC EVAL · NBC',
    photo: '/assets/excerpts/ch15-tac-eval.jpg',
    opener: "THEY TOLD US it wasn't a test.",
    preview:
      "THEY TOLD US it wasn't a test. \"Not a test, it's an evaluation,\" the wing commander would say in the weeks leading up to the NATO TAC EVAL. We all nodded, but we knew better. This was the peacetime Super Bowl of readiness: a no-excuses, all-eyes-on-you, ninety six-hour circus where the performance of the entire wing, and the credibility of our squadron, would be measured down to the last oxygen bottle and mop bucket.",
    body: [
      `THEY TOLD US it wasn't a test. "Not a test, it's an evaluation," the wing commander would say in the weeks leading up to the NATO TAC EVAL. We all nodded, but we knew better. This was the peacetime Super Bowl of readiness: a no-excuses, all-eyes-on-you, ninety six-hour circus where the performance of the entire wing, and the credibility of our squadron, would be measured down to the last oxygen bottle and mop bucket.`,
      `TAC EVALs were how NATO determined if we were ready to go to war. Not just ready to fly, but ready to survive, generate sorties, defend the base, and operate under simulated nuclear, biological, and chemical (NBC) attack, often all at once. It was full-spectrum chaos, wrapped in layers of gas mask sweat and clipboard inspections. The evaluators, hundreds of them, mostly from other NATO nations, were easy to spot. They had different uniforms, wore yellow armbands, carried notebooks, and appeared out of nowhere like ghosts.`,
      `Though technically allies, some of the NATO inspectors seemed to have a grudge against USAF units. You'd see one standing just inside the aircraft shelter, watching your crew chief's every move. Or peeking into your life support room while you inventoried parachutes. They didn't say much, just jotted down your every hesitation, every misstep, every loose bolt, and walked away with a grim nod. It was unsettling. You never knew if you were doing great or about to be the reason the squadron failed.`,
      `In the ops building, the tempo doubled. Schedules became a blur of real-world sorties overlaid with "simulated war" injects. Intel briefings were jammed with fake satellite imagery, enemy order of battle, and chemical threat levels that changed by the hour. The whiteboard in the squadron ready room looked like a war plan scrawled by someone with too much caffeine and a countdown clock.`,
    ],
  },
];

// ===== v1 BLOG_INTRO + BLOG =====

const BLOG_INTRO = {
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

const BLOG_POSTS = [
  {
    id: 'blogPost-pass-the-torch',
    title: 'Pass the Torch',
    date: '2025-12-09',
    kicker: 'Recommended reading',
    lede: 'A digital magazine carrying the flame from one generation to the next.',
    summary:
      'A great place to read about military heroes is at Pass the Torch — a digital magazine honoring veterans of the past and igniting heroes of the future.',
    signOff: 'Mak',
    body: [
      'A great place to read about military heroes is at Pass the Torch.  Pass the Torch is an digital magazine honoring veterans of the past and igniting heroes of the future. Their initiative was born from a deep and unwavering commitment to honor the veterans and heroes who inspire us to live with purpose, integrity, and bravery in every aspect of life.',
      'At Pass the Torch, the voices of veterans, military service members, and first responders are carried forward like a flame passed from one generation to the next. Each story is a spark that reminds us heroism is not confined to the battlefield. It lives in everyday acts of courage, compassion, and duty. These sparks have the power to ignite change, strengthen communities, and shape the legacy we leave behind.',
      'By capturing these stories, they ensure their light continues to guide future generations. Pass the Torch is our way of honoring the past, inspiring the present, and awakening the hero within each of us. Check them out!',
    ],
  },
  {
    id: 'blogPost-a-christmas-to-remember',
    title: 'A Christmas to Remember',
    date: '2025-12-08',
    kicker: 'Holiday dispatch',
    lede: 'December 1990 — when the 10th prepared to leave Hahn for war, on Christmas morning.',
    summary:
      "As we enter the holiday season, it's easy to picture Christmas trees, warm family dinners, and the sound of familiar carols. But for those who serve — and their families — Christmas sometimes looks very different.",
    signOff: 'Mak',
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
    id: 'blogPost-on-lawful-orders',
    title: 'On Lawful Orders',
    date: '2025-12-01',
    kicker: 'On service',
    lede: 'Fear, uncertainty, and doubt have no place on the front lines.',
    summary:
      "As an Officer who served for seven years, I can tell you that our responsibilities under the Uniformed Code of Military Justice (UCMJ) are very familiar to all military members. There's no need for anyone to remind us.",
    signOff: 'Mak',
    body: [
      'In November 2025, six lawmakers released a video that stated, "Our laws are clear: You can refuse illegal orders. You must refuse illegal orders" without including any specificity as to what illegal orders have been issued, or may be issued in the near future.  The lawmakers defended their actions, stating they were upholding their oath to the Constitution and were simply restating the Uniform Code of Military Justice, which requires service members to obey only lawful orders.',
      'These statements are not helpful, and clearly political.',
      "As an Officer who served for seven years, I can tell you that our responsibilities under the Uniformed Code of Military Justice (UCMJ) are very familiar to all military members. There's no need for anyone to remind us.",
      'What these statements do create is fear, uncertainty, and doubt in many military members. And that is not good. In fact, that can be deadly. The military operates daily in a high-stakes environment. Orders must be followed in the timeframe given or the consequences can be dire. Orders cannot be litigated on the front lines, nor can we imbue a sense of hesitancy into the reactions of our soldiers, sailors, and airmen.',
      'Which leaves one wondering…what are the motives of these six lawmakers in launching an unsolicited, coordinated video message?',
    ],
  },
];

// ===== migration =====

async function run() {
  console.log('Building Phase 3 migration transaction…');
  let tx = client.transaction();

  // Excerpts: full replace with new rich fields
  for (const e of EXCERPTS) {
    const doc = {
      _id: e.id,
      _type: 'excerpt',
      chapterNumber: e.chapterNumber,
      chapterLabel: e.chapterLabel,
      title: e.title,
      setting: e.setting,
      pages: e.pages,
      readMin: e.readMin,
      callsign: e.callsign,
      tag: e.tag,
      opener: e.opener,
      preview: e.preview,
      body: e.body,
      photo: e.photo,
    };
    if (e.inlineImage) doc.inlineImage = e.inlineImage;
    tx = tx.createOrReplace(doc);
  }

  // Blog posts: full replace (kicker/lede are new, body shape changes string[])
  for (const p of BLOG_POSTS) {
    tx = tx.createOrReplace({
      _id: p.id,
      _type: 'blogPost',
      title: p.title,
      date: p.date,
      kicker: p.kicker,
      lede: p.lede,
      summary: p.summary,
      body: p.body,
      signOff: p.signOff,
    });
  }

  // Blog intro singleton
  tx = tx.createOrReplace({
    _id: 'blogIntro',
    _type: 'blogIntro',
    kicker: BLOG_INTRO.kicker,
    question: BLOG_INTRO.question,
    lede: BLOG_INTRO.lede,
    body: BLOG_INTRO.body,
  });

  const result = await tx.commit();
  console.log(`Done. ${result.results.length} operations applied.`);
  for (const r of result.results) {
    console.log(`  ${r.operation.padEnd(8)} ${r.id}`);
  }
}

run().catch((err) => {
  console.error('Migration failed:', err.message ?? err);
  process.exit(1);
});
