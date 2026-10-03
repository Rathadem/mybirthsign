// Zodiac data: 12 animals + 5 elements, using the real Chinese lunar calendar.
// CNY_DATES gives the actual Lunar New Year date (month-day) for each
// Gregorian year, so the zodiac year boundary is exact rather than
// approximated as January 1st.

const ZODIAC_ANIMALS = [
  "Rat","Ox","Tiger","Rabbit","Dragon","Snake",
  "Horse","Goat","Monkey","Rooster","Dog","Pig"
];

const ZODIAC_EMOJI = {
  Rat:"🐀", Ox:"🐂", Tiger:"🐅", Rabbit:"🐇", Dragon:"🐉", Snake:"🐍",
  Horse:"🐎", Goat:"🐐", Monkey:"🐒", Rooster:"🐓", Dog:"🐕", Pig:"🐖"
};

// Hex swatch for each lucky color name (keyed by the English color word,
// since luckyColors/KM_ANIMAL_INFO.luckyColors are always in the same
// order per animal regardless of displayed language).
const LUCKY_COLOR_HEX = {
  blue: "#3b82f6",
  gold: "#d4af37",
  green: "#22c55e",
  white: "#f5f5f5",
  yellow: "#eab308",
  gray: "#9ca3af",
  orange: "#f97316",
  pink: "#ec4899",
  red: "#ef4444",
  purple: "#a855f7",
  silver: "#c7ccd1",
  black: "#1a1a1a",
  brown: "#92400e"
};

// Builds "<dot> Label, <dot> Label, ..." markup for a list of lucky colors.
// englishColors gives the color key for each swatch (order-matched);
// displayColors gives the label text to show (may be a different language).
function renderLuckyColorChips(displayColors, englishColors) {
  return displayColors.map(function (label, i) {
    const hex = LUCKY_COLOR_HEX[(englishColors[i] || "").toLowerCase()] || "#888";
    return (
      '<span class="color-chip">' +
        '<span class="color-dot" style="background:' + hex + '"></span>' +
        label +
      "</span>"
    );
  }).join("");
}

const ELEMENTS = ["Wood","Fire","Earth","Metal","Water"];

const ELEMENT_INFO = {
  Wood: {
    blurb: "Wood years bring growth, creativity, and a drive to build new things. People of this element tend to be cooperative, generous, and idealistic.",
    overview: "Wood is the element of spring — expansion, new branches, new plans. People born in a Wood year are usually the ones pushing a group forward, pitching the next idea before the last one has even finished. They tend to be warm collaborators who genuinely want everyone around them to grow too, not just themselves. The flip side of that generosity is a tendency to overcommit: saying yes to one too many projects, or struggling to set boundaries with people who take advantage of their good nature.",
    color: "#4caf7d"
  },
  Fire: {
    blurb: "Fire years bring passion, energy, and boldness. People of this element tend to be dynamic, adventurous, and quick to lead.",
    overview: "Fire brings heat, motion, and visibility. People born in a Fire year rarely blend into the background — they tend to speak with conviction, move quickly, and inspire people around them to act. This makes them natural leaders in a crisis or a bold new venture. The challenge is sustaining that intensity: Fire personalities can burn through relationships or opportunities fast if they don't pair their passion with patience.",
    color: "#e05b4e"
  },
  Earth: {
    blurb: "Earth years bring stability, practicality, and patience. People of this element tend to be dependable, grounded, and good at long-term planning.",
    overview: "Earth is the element of the harvest — steady, patient, built to last. People born in an Earth year are usually the most dependable person in the room: the one who shows up on time, keeps their word, and thinks several years ahead instead of several days. That same groundedness can tip into over-caution, though, making it hard for Earth personalities to take the leap when a moment actually calls for risk.",
    color: "#c9962f"
  },
  Metal: {
    blurb: "Metal years bring discipline, ambition, and strong will. People of this element tend to be determined, independent, and value-driven.",
    overview: "Metal is the element of the blade and the bell — sharp, resonant, and unwilling to bend. People born in a Metal year tend to know exactly what they stand for, and they rarely compromise on it once a decision is made. This gives them a quiet, formidable strength in negotiation and leadership. It can also read as rigidity to people who move more fluidly, so Metal personalities often do best when they consciously practice flexibility.",
    color: "#9a9ca3"
  },
  Water: {
    blurb: "Water years bring intuition, adaptability, and calm wisdom. People of this element tend to be thoughtful, diplomatic, and perceptive.",
    overview: "Water is the element of the river — always moving, always finding the path of least resistance. People born in a Water year tend to read a room before they speak in it, adapting their approach to whoever they're with. That makes them excellent diplomats and quietly persuasive communicators. The risk is passivity: Water personalities can drift along with a situation they should have pushed back on sooner.",
    color: "#3f7fbf"
  }
};

const ANIMAL_INFO = {
  Rat: {
    traits: "Quick-witted, resourceful, and sociable. Rats are natural problem-solvers who notice opportunities others miss.",
    weaknesses: "Can be restless or overly cautious with money and trust.",
    overview: "The Rat opens the zodiac cycle, and tradition holds that it earned its place through cleverness rather than brute strength — famously riding on the Ox's back to cross the finish line first. That founding story captures the Rat well: resourceful, observant, and always a step ahead. Rats tend to be the first to spot a shift in a market, a conversation, or a relationship, and they're rarely caught flat-footed. Socially, they're charming and adaptable, equally comfortable working a room or quietly gathering information from the sidelines.",
    luckyNumbers: [2, 3],
    luckyColors: ["blue", "gold", "green"],
    luckyDays: ["Monday", "Tuesday"],
    compatible: ["Dragon", "Monkey", "Ox"],
    clash: ["Horse"],
    careers: "Business, writing, research, trading"
  },
  Ox: {
    traits: "Reliable, honest, and hard-working. Oxen build success slowly and steadily through persistence.",
    weaknesses: "Can be stubborn and slow to adapt to sudden change.",
    overview: "The Ox is the quiet powerhouse of the zodiac — not flashy, but nearly impossible to outlast. Where other signs chase quick wins, the Ox plays a longer game, putting in steady, unglamorous effort year after year until the results are undeniable. This makes Oxen excellent at anything that rewards patience: building a business, mastering a craft, raising a family. Their directness is refreshing to people who value honesty, though it can come across as blunt to those expecting more diplomacy.",
    luckyNumbers: [1, 4],
    luckyColors: ["white", "yellow", "green"],
    luckyDays: ["Wednesday", "Friday"],
    compatible: ["Rat", "Snake", "Rooster"],
    clash: ["Goat"],
    careers: "Agriculture, engineering, finance, medicine"
  },
  Tiger: {
    traits: "Brave, confident, and competitive. Tigers are natural leaders who act decisively.",
    weaknesses: "Can be impulsive or impatient with slower-moving people.",
    overview: "The Tiger is the zodiac's natural risk-taker — bold, magnetic, and unafraid to go first. In rooms full of hesitation, the Tiger is usually the one who speaks up or makes the move everyone else was quietly considering. That courage makes them compelling leaders and exciting to be around, but it can also tip into impatience with process, rules, or people who need more time to catch up. Tigers do best when they pair their instinct for action with just enough restraint to bring others along.",
    luckyNumbers: [1, 3, 4],
    luckyColors: ["blue", "gray", "orange"],
    luckyDays: ["Tuesday", "Wednesday"],
    compatible: ["Horse", "Dog", "Pig"],
    clash: ["Monkey"],
    careers: "Entrepreneurship, sports, law, management"
  },
  Rabbit: {
    traits: "Gentle, thoughtful, and diplomatic. Rabbits value harmony and are skilled at avoiding conflict.",
    weaknesses: "Can be overly cautious and avoid necessary confrontation.",
    overview: "The Rabbit moves through the world with a careful, graceful touch, usually sensing tension in a room before anyone has said a word. This makes Rabbits gifted mediators and genuinely pleasant to be around — they rarely pick fights and often smooth over ones that have already started. The tradeoff is a tendency to avoid necessary confrontation altogether, letting small issues grow because speaking up felt too uncomfortable in the moment.",
    luckyNumbers: [3, 4, 6],
    luckyColors: ["pink", "red", "purple"],
    luckyDays: ["Monday", "Thursday"],
    compatible: ["Goat", "Pig", "Dog"],
    clash: ["Rooster"],
    careers: "Diplomacy, counseling, design, hospitality"
  },
  Dragon: {
    traits: "Confident, charismatic, and ambitious. Dragons draw attention and often rise to leadership naturally.",
    weaknesses: "Can come across as proud or impatient with limitations.",
    overview: "The Dragon is the only mythical creature in the zodiac, and it carries that larger-than-life energy. Dragons tend to walk into a room and shift its center of gravity without even trying — people notice them, trust them, and often hand them the lead role before they've asked for it. That natural authority comes paired with high standards, both for themselves and everyone around them, which can read as impatience when reality moves slower than their vision does.",
    luckyNumbers: [1, 6, 7],
    luckyColors: ["gold", "silver", "gray"],
    luckyDays: ["Tuesday", "Saturday"],
    compatible: ["Rat", "Monkey", "Rooster"],
    clash: ["Dog"],
    careers: "Leadership, entrepreneurship, entertainment, real estate"
  },
  Snake: {
    traits: "Wise, intuitive, and elegant. Snakes are deep thinkers who plan carefully before acting.",
    weaknesses: "Can be secretive or prone to overthinking.",
    overview: "The Snake is the zodiac's strategist — quiet, watchful, and rarely in a hurry to show its hand. Where other signs react in the moment, the Snake tends to sit with a problem, turning it over privately until a clear plan emerges. This gives Snakes a reputation for wisdom and good judgment, especially in situations that reward patience over speed. The same instinct for privacy can tip into secrecy, leaving people close to a Snake unsure what's really going on beneath the calm surface.",
    luckyNumbers: [2, 8, 9],
    luckyColors: ["black", "red", "yellow"],
    luckyDays: ["Wednesday", "Saturday"],
    compatible: ["Ox", "Rooster", "Monkey"],
    clash: ["Pig"],
    careers: "Finance, research, psychology, strategy"
  },
  Horse: {
    traits: "Energetic, independent, and adventurous. Horses love freedom and new experiences.",
    weaknesses: "Can be impatient or struggle to commit long-term.",
    overview: "The Horse runs on momentum — restless, independent, and happiest when there's open ground ahead. Routine rarely suits a Horse for long; they're drawn to travel, new projects, and new people, and they bring a contagious energy wherever they land. That same love of freedom can make long-term commitment feel confining, so Horses often do best in situations that give them room to move rather than ones that try to pin them down too tightly.",
    luckyNumbers: [2, 3, 7],
    luckyColors: ["yellow", "green", "purple"],
    luckyDays: ["Monday", "Wednesday"],
    compatible: ["Tiger", "Goat", "Dog"],
    clash: ["Rat"],
    careers: "Travel, sales, sports, media"
  },
  Goat: {
    traits: "Gentle, creative, and compassionate. Goats have a strong artistic sensibility and care deeply for others.",
    weaknesses: "Can be indecisive or overly dependent on others.",
    overview: "The Goat (sometimes translated as Sheep) is the zodiac's gentle artist, drawn to beauty, harmony, and emotional depth. Goats tend to notice feelings that others miss, making them warm friends and genuinely talented in creative fields. They do their best work in a secure, supportive environment, and tend to struggle more in cutthroat or highly competitive settings. Left without that support, a Goat can become indecisive or lean too heavily on others to make the hard calls for them.",
    luckyNumbers: [2, 7],
    luckyColors: ["green", "red", "purple"],
    luckyDays: ["Friday", "Sunday"],
    compatible: ["Rabbit", "Horse", "Pig"],
    clash: ["Ox"],
    careers: "Art, design, counseling, nonprofit work"
  },
  Monkey: {
    traits: "Clever, curious, and witty. Monkeys are quick learners who enjoy solving problems creatively.",
    weaknesses: "Can be mischievous or struggle to focus on one thing.",
    overview: "The Monkey is the zodiac's quickest mind — curious, playful, and genuinely delighted by a tricky problem. Monkeys pick up new skills fast and love finding a clever shortcut that no one else thought of, which makes them excellent improvisers and natural entertainers. The downside of that quick mind is a short attention span: Monkeys can hop between ideas so fast that the most promising ones never get finished.",
    luckyNumbers: [4, 9],
    luckyColors: ["white", "gold", "blue"],
    luckyDays: ["Wednesday", "Friday"],
    compatible: ["Rat", "Dragon", "Snake"],
    clash: ["Tiger"],
    careers: "Technology, marketing, comedy, consulting"
  },
  Rooster: {
    traits: "Observant, hard-working, and confident. Roosters are detail-oriented and take pride in doing things well.",
    weaknesses: "Can be overly critical or blunt with others.",
    overview: "The Rooster takes real pride in doing things properly, down to the smallest detail most people would never think to check. This makes Roosters excellent at any work that rewards precision and high standards — the kind of person a team relies on to catch the mistake everyone else missed. That same eye for flaws can turn inward or outward as criticism, so Roosters do well to remember that not every imperfection needs to be pointed out.",
    luckyNumbers: [5, 7, 8],
    luckyColors: ["gold", "brown", "yellow"],
    luckyDays: ["Thursday", "Saturday"],
    compatible: ["Ox", "Snake", "Dragon"],
    clash: ["Rabbit"],
    careers: "Accounting, journalism, quality control, public speaking"
  },
  Dog: {
    traits: "Loyal, honest, and protective. Dogs are deeply trustworthy and stand up for what they believe in.",
    weaknesses: "Can be anxious or overly suspicious of new situations.",
    overview: "The Dog is the zodiac's most loyal defender — the friend who shows up without being asked, and the one who'll speak up for someone else even when it costs them something. Dogs have a strong, instinctive sense of right and wrong, and they rarely compromise on it just to keep the peace. That same vigilance can tip into worry or suspicion, especially toward new people or situations that haven't yet earned their trust.",
    luckyNumbers: [3, 4, 9],
    luckyColors: ["red", "green", "purple"],
    luckyDays: ["Monday", "Thursday"],
    compatible: ["Tiger", "Horse", "Rabbit"],
    clash: ["Dragon"],
    careers: "Law, security, social work, education"
  },
  Pig: {
    traits: "Warm-hearted, generous, and easygoing. Pigs value comfort, kindness, and honest relationships.",
    weaknesses: "Can be overly trusting or indulgent.",
    overview: "The Pig closes the zodiac cycle with warmth and good humor — generous, easygoing, and genuinely happy to share what they have. Pigs tend to take people at their word and assume the best, which makes them wonderful, low-drama company. That same trusting nature is also their biggest vulnerability: Pigs can be slow to notice when someone is taking advantage of their generosity, and they sometimes indulge themselves (or others) past the point that's good for them.",
    luckyNumbers: [2, 5, 8],
    luckyColors: ["yellow", "gray", "brown"],
    luckyDays: ["Thursday", "Sunday"],
    compatible: ["Tiger", "Rabbit", "Goat"],
    clash: ["Snake"],
    careers: "Hospitality, food industry, teaching, healthcare"
  }
};

// Lunar New Year (Gregorian month-day) for each year, 1900-2060.
// Used to find the exact zodiac-year boundary instead of guessing from Jan 1st.
const CNY_DATES = {1900:"01-31",1901:"02-19",1902:"02-08",1903:"01-29",1904:"02-16",1905:"02-04",1906:"01-25",1907:"02-13",1908:"02-02",1909:"01-22",1910:"02-10",1911:"01-30",1912:"02-18",1913:"02-06",1914:"01-26",1915:"02-14",1916:"02-03",1917:"01-23",1918:"02-11",1919:"02-01",1920:"02-20",1921:"02-08",1922:"01-28",1923:"02-16",1924:"02-05",1925:"01-24",1926:"02-13",1927:"02-02",1928:"01-23",1929:"02-10",1930:"01-30",1931:"02-17",1932:"02-06",1933:"01-26",1934:"02-14",1935:"02-04",1936:"01-24",1937:"02-11",1938:"01-31",1939:"02-19",1940:"02-08",1941:"01-27",1942:"02-15",1943:"02-05",1944:"01-25",1945:"02-13",1946:"02-02",1947:"01-22",1948:"02-10",1949:"01-29",1950:"02-17",1951:"02-06",1952:"01-27",1953:"02-14",1954:"02-03",1955:"01-24",1956:"02-12",1957:"01-31",1958:"02-18",1959:"02-08",1960:"01-28",1961:"02-15",1962:"02-05",1963:"01-25",1964:"02-13",1965:"02-02",1966:"01-21",1967:"02-09",1968:"01-30",1969:"02-17",1970:"02-06",1971:"01-27",1972:"02-15",1973:"02-03",1974:"01-23",1975:"02-11",1976:"01-31",1977:"02-18",1978:"02-07",1979:"01-28",1980:"02-16",1981:"02-05",1982:"01-25",1983:"02-13",1984:"02-02",1985:"02-20",1986:"02-09",1987:"01-29",1988:"02-17",1989:"02-06",1990:"01-27",1991:"02-15",1992:"02-04",1993:"01-23",1994:"02-10",1995:"01-31",1996:"02-19",1997:"02-07",1998:"01-28",1999:"02-16",2000:"02-05",2001:"01-24",2002:"02-12",2003:"02-01",2004:"01-22",2005:"02-09",2006:"01-29",2007:"02-18",2008:"02-07",2009:"01-26",2010:"02-14",2011:"02-03",2012:"01-23",2013:"02-10",2014:"01-31",2015:"02-19",2016:"02-08",2017:"01-28",2018:"02-16",2019:"02-05",2020:"01-25",2021:"02-12",2022:"02-01",2023:"01-22",2024:"02-10",2025:"01-29",2026:"02-17",2027:"02-06",2028:"01-26",2029:"02-13",2030:"02-03",2031:"01-23",2032:"02-11",2033:"01-31",2034:"02-19",2035:"02-08",2036:"01-28",2037:"02-15",2038:"02-04",2039:"01-24",2040:"02-12",2041:"02-01",2042:"01-22",2043:"02-10",2044:"01-30",2045:"02-17",2046:"02-06",2047:"01-26",2048:"02-14",2049:"02-02",2050:"01-23",2051:"02-11",2052:"02-01",2053:"02-19",2054:"02-08",2055:"01-28",2056:"02-15",2057:"02-04",2058:"01-24",2059:"02-12",2060:"02-02"};

/**
 * Given a JS Date, returns the true zodiac animal and element, using the
 * real Lunar New Year date for that birth year as the cutoff — not just
 * the Gregorian calendar year.
 */
function getZodiac(date) {
  const year = date.getFullYear();
  const cny = CNY_DATES[year];
  let zodiacYear = year;

  if (cny) {
    const [cnyMonth, cnyDay] = cny.split("-").map(Number);
    const birthdayBeforeCNY =
      (date.getMonth() + 1) < cnyMonth ||
      ((date.getMonth() + 1) === cnyMonth && date.getDate() < cnyDay);
    if (birthdayBeforeCNY) zodiacYear = year - 1;
  }

  const animalIndex = ((zodiacYear - 4) % 12 + 12) % 12;
  const stemIndex = ((zodiacYear - 4) % 10 + 10) % 10;
  const elementIndex = Math.floor(stemIndex / 2);
  return {
    animal: ZODIAC_ANIMALS[animalIndex],
    element: ELEMENTS[elementIndex],
    zodiacYear
  };
}

// --- Two-person compatibility ---
// The four traditional "triangle" affinity groups (each animal's natural match group).
const ZODIAC_TRIANGLES = [
  ["Rat", "Dragon", "Monkey"],
  ["Ox", "Snake", "Rooster"],
  ["Tiger", "Horse", "Dog"],
  ["Rabbit", "Goat", "Pig"]
];

function sameTriangle(a, b) {
  return ZODIAC_TRIANGLES.some((t) => t.includes(a) && t.includes(b));
}

/**
 * Classifies the relationship between two zodiac animals as
 * "same", "triangle" (natural affinity group), "clash" (direct zodiac
 * opposite), or "neutral" (neither).
 */
function getCompatibilityType(animalA, animalB) {
  if (animalA === animalB) return "same";
  if (ANIMAL_INFO[animalA].clash.includes(animalB)) return "clash";
  if (sameTriangle(animalA, animalB)) return "triangle";
  return "neutral";
}

const COMPAT_INFO = {
  same: {
    label: "Same Sign",
    stars: { romantic: 3, business: 4 },
    text: {
      romantic: "You share the same zodiac animal, which means deep, instant understanding — you read each other's instincts without needing to explain. The risk is two strong, similar personalities competing for the same role rather than balancing each other. Consciously dividing \"who leads on what\" goes a long way.",
      business: "Sharing a sign means shared values and pace, which can make early collaboration feel effortless. For a lasting partnership, divide roles clearly early on — two people with the same instincts can otherwise pull toward the same tasks and neglect others."
    }
  },
  triangle: {
    label: "Natural Triangle Match",
    stars: { romantic: 5, business: 5 },
    text: {
      romantic: "Your signs sit in the same compatibility \"triangle\" — one of the four natural affinity groups in the zodiac. This is traditionally considered one of the easiest, most harmonious pairings, with an intuitive sense of each other's pace and values.",
      business: "This is traditionally one of the strongest partnership pairings — shared instincts about pace and priorities make day-to-day collaboration smooth, and your complementary strengths within the triangle tend to cover each other's blind spots."
    }
  },
  clash: {
    label: "Direct Clash",
    stars: { romantic: 3, business: 3 },
    text: {
      romantic: "Your signs sit directly opposite each other on the zodiac wheel — a classic \"clash\" pairing. This doesn't mean incompatible; it means you likely approach life from genuinely different angles, which can either create friction or become a relationship's biggest strength once you learn to communicate across that gap.",
      business: "Clash pairings can actually make strong business partners, because you tend to see problems from opposite angles and cover ground the other would miss. It works best with clearly divided roles and deliberate, frequent communication rather than assuming you're on the same page."
    }
  },
  neutral: {
    label: "Neutral Pairing",
    stars: { romantic: 4, business: 4 },
    text: {
      romantic: "Your signs aren't in the same compatibility triangle, but they're not a direct clash either. Traditional zodiac compatibility doesn't strongly favor or challenge this pairing — in practice, how well you get along comes down more to individual personality than the animals alone.",
      business: "No strong pull or friction from the zodiac here — a genuinely workable pairing where success depends more on clear communication and well-defined roles than on your signs lining up."
    }
  }
};

// --- Nearby birth years for a given animal (used for "best match years") ---
function animalForYear(year) {
  return ZODIAC_ANIMALS[((year - 4) % 12 + 12) % 12];
}

function getTrianglePartners(animal) {
  const group = ZODIAC_TRIANGLES.find((t) => t.includes(animal));
  return group.filter((a) => a !== animal);
}

/**
 * Returns the `count` birth years closest to centerYear (searched +/- 60
 * years) whose zodiac animal matches the one given.
 */
function nearbyYearsForAnimal(animal, centerYear, count) {
  count = count || 4;
  const years = [];
  for (let y = centerYear - 60; y <= centerYear + 60; y++) {
    if (animalForYear(y) === animal) years.push(y);
  }
  years.sort((a, b) => Math.abs(a - centerYear) - Math.abs(b - centerYear));
  return years.slice(0, count).sort((a, b) => a - b);
}

// --- Month animals (for the wedding date picker) ---
// The traditional 12 Earthly Branches assigned to the lunar calendar's 12
// months, starting from Tiger (the first month). Calendar months here are
// used as a simple stand-in for lunar months — a fun, traditional-pattern
// guide rather than an exact lunar-calendar day pick.
const MONTH_ANIMALS = [
  "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat",
  "Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox"
];

/**
 * Rates how good a given month is for a wedding between two people, based
 * on how that month's traditional animal relates to each partner's sign.
 * Returns one of "excellent", "good", "workable", "avoid".
 */
function rateWeddingMonth(monthAnimal, animalA, animalB) {
  const typeA = getCompatibilityType(monthAnimal, animalA);
  const typeB = getCompatibilityType(monthAnimal, animalB);
  if (typeA === "clash" || typeB === "clash") return "avoid";
  const triangleCount = [typeA, typeB].filter((t) => t === "triangle").length;
  if (triangleCount === 2) return "excellent";
  if (triangleCount === 1) return "good";
  return "workable";
}
