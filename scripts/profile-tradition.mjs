// Traditional, animal-specific facts for the 12 "Year of the …" guides (used by scripts/animal-profile.mjs).
// Only long-established, widely documented parts of the system are used:
//   - the twelve Earthly Branches (地支) and their order, Yin/Yang (odd = Yang) and fixed elements,
//   - the twelve double hours (时辰), the compass direction of each branch (30° each, Rat = north),
//   - the month of the traditional calendar each branch rules (Tiger = 1st month … Ox = 12th),
//   - the four "three harmony" frames (三合局: 申子辰 Water, 巳酉丑 Metal, 寅午戌 Fire, 亥卯未 Wood).
// The double-hour explanations and the Great Race are folk tradition and are written as such ("a traditional
// explanation", "in the best-known version of the folk tale"); versions differ from place to place.
export const TRAD = {
  Rat: {
    branch: "子", py: "zǐ", pos: 1, el: "Water", yy: "Yang", hour: "23:00–01:00", month: 11, dir: "N", frame: "Water", khmer: "Choot",
    en: {
      hour: "The Rat rules the hour around midnight. A traditional explanation is that rats are at their busiest in the dead of night, and because a new day begins in the middle of this hour, the Rat is tied to fresh starts.",
      race: "In the best-known version of the Great Race folk tale, the small Rat could not swim, so it rode across the river on the Ox's back and jumped off at the last moment to finish first. The story is why the Rat is linked with quick wits rather than strength.",
    },
    km: {
      hour: "ជូតគ្រប់គ្រងម៉ោងជុំវិញពាក់កណ្តាលអធ្រាត្រ។ ការពន្យល់តាមប្រពៃណីថា កណ្តុររវល់ខ្លាំងបំផុតពេលយប់ជ្រៅ ហើយដោយសារថ្ងៃថ្មីចាប់ផ្តើមនៅពាក់កណ្តាលម៉ោងនេះ ជូតត្រូវបានភ្ជាប់នឹងការចាប់ផ្តើមថ្មី។",
      race: "តាមរឿងនិទានប្រណាំងដ៏ល្បីបំផុត កណ្តុរតូចហែលទឹកមិនកើត ដូច្នេះវាជិះលើខ្នងគោឆ្លងទន្លេ ហើយលោតចុះនៅវិនាទីចុងក្រោយ ដើម្បីទៅដល់មុនគេ។ រឿងនេះធ្វើឱ្យជូតត្រូវបានភ្ជាប់នឹងប្រាជ្ញាឆ្លាតវៃ ជាជាងកម្លាំង។",
    },
    zh: {
      hour: "鼠主子时，也就是午夜前后。传统的解释是，老鼠在深夜最活跃；而新的一天正是从子时中间开始的，所以鼠与新的开始联系在一起。",
      race: "在最流行的“动物过河比赛”民间故事里，小老鼠不会游泳，就骑在牛背上过河，到最后一刻跳下来，抢先到达终点。这个故事让鼠和机灵而不是力气联系在一起。",
    },
  },
  Ox: {
    branch: "丑", py: "chǒu", pos: 2, el: "Earth", yy: "Yin", hour: "01:00–03:00", month: 12, dir: "NNE", frame: "Metal", khmer: "Chlov",
    en: {
      hour: "The Ox rules the small hours between 1 and 3 a.m. A traditional explanation is that this is when oxen quietly chew the cud, resting before a day of work in the fields, which fits the Ox's link with patience and steady effort.",
      race: "In the Great Race folk tale the Ox was the strongest swimmer and would have won, but it carried the Rat on its back and was overtaken at the finish. The Ox came second, and the story is often told as a lesson about honest hard work.",
    },
    km: {
      hour: "ឆ្លូវគ្រប់គ្រងម៉ោងព្រឹកព្រលឹមពីម៉ោង 1 ដល់ 3។ ការពន្យល់តាមប្រពៃណីថា នេះជាពេលដែលគោទំពារស្មៅយ៉ាងស្ងប់ស្ងាត់ សម្រាកមុនថ្ងៃធ្វើការនៅស្រែ ដែលត្រូវនឹងការភ្ជាប់ឆ្លូវជាមួយការអត់ធ្មត់ និងការខិតខំជាប់លាប់។",
      race: "ក្នុងរឿងនិទានប្រណាំង គោហែលទឹកខ្លាំងជាងគេ ហើយអាចឈ្នះបាន ប៉ុន្តែវាដឹកកណ្តុរលើខ្នង ហើយត្រូវបានវ៉ាដល់ទីបញ្ចប់។ គោបានលេខពីរ ហើយរឿងនេះតែងត្រូវបាននិទានជាមេរៀនអំពីការខិតខំដោយស្មោះត្រង់។",
    },
    zh: {
      hour: "牛主丑时，即凌晨1点到3点。传统的解释是，这时牛在静静地反刍，为白天下田干活养精蓄锐，这与牛代表耐心和踏实的形象相符。",
      race: "在过河比赛的民间故事里，牛游得最好，本来可以拿第一，却因为背着老鼠，在终点被超过，只得了第二。这个故事常被用来讲诚实勤劳的道理。",
    },
  },
  Tiger: {
    branch: "寅", py: "yín", pos: 3, el: "Wood", yy: "Yang", hour: "03:00–05:00", month: 1, dir: "ENE", frame: "Fire", khmer: "Khal",
    en: {
      hour: "The Tiger rules the last dark hours before dawn, from 3 to 5 a.m. A traditional explanation is that tigers are at their fiercest and most active then. The Tiger also rules the first month of the traditional year, so it is tied to the start of spring.",
      race: "In the Great Race folk tale the Tiger fought its way across the strong current on sheer power and came third. It is the only one of the big hunters near the front, which is why the Tiger stands for courage and drive.",
    },
    km: {
      hour: "ខាលគ្រប់គ្រងម៉ោងងងឹតចុងក្រោយមុនព្រឹក ពីម៉ោង 3 ដល់ 5។ ការពន្យល់តាមប្រពៃណីថា ខ្លាសាហាវ និងសកម្មបំផុតនៅពេលនោះ។ ខាលក៏គ្រប់គ្រងខែទីមួយនៃឆ្នាំប្រពៃណី ដូច្នេះវាត្រូវបានភ្ជាប់នឹងការចាប់ផ្តើមរដូវផ្ការីក។",
      race: "ក្នុងរឿងនិទានប្រណាំង ខ្លាតស៊ូឆ្លងចរន្តទឹកខ្លាំងដោយកម្លាំងសុទ្ធ ហើយបានលេខបី។ នេះជាមូលហេតុដែលខាលតំណាងឱ្យភាពក្លាហាន និងកម្លាំងចិត្ត។",
    },
    zh: {
      hour: "虎主寅时，即黎明前最后的凌晨3点到5点。传统的解释是，这时老虎最凶猛、最活跃。虎还主管传统历法的正月，所以与春天的开始联系在一起。",
      race: "在过河比赛的民间故事里，老虎凭着力气硬闯过湍急的河水，得了第三名。这就是虎代表勇敢和冲劲的原因。",
    },
  },
  Rabbit: {
    branch: "卯", py: "mǎo", pos: 4, el: "Wood", yy: "Yin", hour: "05:00–07:00", month: 2, dir: "E", frame: "Wood", khmer: "Thos",
    en: {
      hour: "The Rabbit rules sunrise, from 5 to 7 a.m., and the direction of the rising sun, due east. A traditional explanation is that rabbits come out at dawn to nibble grass still wet with dew. The Moon is also linked to the Rabbit through the old story of the Jade Rabbit.",
      race: "The Rabbit could not out-swim the others, so in the Great Race folk tale it hopped across on stones and a floating log, arriving fourth. The story suits the Rabbit's reputation for cleverness and finding the gentle way around a problem.",
    },
    km: {
      hour: "ថោះគ្រប់គ្រងពេលថ្ងៃរះ ពីម៉ោង 5 ដល់ 7 និងទិសថ្ងៃរះ គឺខាងកើត។ ការពន្យល់តាមប្រពៃណីថា ទន្សាយចេញមកស៊ីស្មៅដែលនៅសើមដោយទឹកសន្សើមពេលព្រលឹម។ ព្រះចន្ទក៏ត្រូវបានភ្ជាប់នឹងថោះ តាមរឿងព្រេងទន្សាយត្បូងពេជ្រ។",
      race: "ទន្សាយហែលមិនលឿនជាងអ្នកដទៃ ដូច្នេះក្នុងរឿងនិទានប្រណាំង វាលោតឆ្លងលើថ្ម និងគល់ឈើអណ្តែត ហើយមកដល់លេខបួន។ រឿងនេះត្រូវនឹងកិត្តិនាមរបស់ថោះ ដែលឆ្លាត និងរកផ្លូវទន់ភ្លន់ដើម្បីដោះស្រាយបញ្ហា។",
    },
    zh: {
      hour: "兔主卯时，即日出时分的早上5点到7点，也主太阳升起的正东方。传统的解释是，兔子会在黎明时出来吃沾着露水的青草。古老的玉兔传说也把月亮和兔联系在一起。",
      race: "兔子游不过别人，所以在过河比赛的民间故事里，它踩着石头和漂浮的木头跳过河，得了第四名。这个故事符合兔聪明、善于用温和方式解决问题的形象。",
    },
  },
  Dragon: {
    branch: "辰", py: "chén", pos: 5, el: "Earth", yy: "Yang", hour: "07:00–09:00", month: 3, dir: "ESE", frame: "Water", khmer: "Rong",
    en: {
      hour: "The Dragon rules the morning hours from 7 to 9 a.m. A traditional explanation is that this is when morning mist rises, the weather Chinese dragons were believed to fly in. Dragons were thought to bring rain, which made them important to farming communities.",
      race: "The Dragon could fly and should have won, but in the Great Race folk tale it arrived only fifth. Many tellings say it stopped to help on the way, bringing rain to a dry village or blowing the Rabbit's log to the shore, so the Dragon's place is a mark of generosity, not weakness.",
    },
    km: {
      hour: "រោងគ្រប់គ្រងម៉ោងព្រឹកពីម៉ោង 7 ដល់ 9។ ការពន្យល់តាមប្រពៃណីថា នេះជាពេលអ័ព្ទពេលព្រឹកឡើង ដែលជាអាកាសធាតុដែលគេជឿថានាគហោះហើរ។ គេជឿថានាគនាំភ្លៀងមក ដែលធ្វើឱ្យវាសំខាន់សម្រាប់សហគមន៍កសិកម្ម។",
      race: "នាគអាចហោះបាន ហើយគួរតែឈ្នះ ប៉ុន្តែក្នុងរឿងនិទានប្រណាំង វាមកដល់ត្រឹមលេខប្រាំ។ ការនិទានជាច្រើននិយាយថា វាឈប់ជួយតាមផ្លូវ ដោយនាំភ្លៀងទៅភូមិមួយដែលរាំងស្ងួត ឬផ្លុំគល់ឈើរបស់ទន្សាយទៅដល់ច្រាំង ដូច្នេះលំដាប់របស់រោងជាសញ្ញានៃចិត្តសប្បុរស មិនមែនភាពទន់ខ្សោយទេ។",
    },
    zh: {
      hour: "龙主辰时，即早上7点到9点。传统的解释是，这时晨雾升起，正是人们相信龙腾云驾雾的天气。古人认为龙能降雨，所以龙对农耕社会非常重要。",
      race: "龙会飞，本该拿第一，但在过河比赛的民间故事里只得了第五。很多版本说它在路上停下来帮忙，为干旱的村庄降雨，或者把兔子的木头吹到岸边，所以龙的名次代表的是慷慨，而不是软弱。",
    },
  },
  Snake: {
    branch: "巳", py: "sì", pos: 6, el: "Fire", yy: "Yin", hour: "09:00–11:00", month: 4, dir: "SSE", frame: "Metal", khmer: "Msanh",
    en: {
      hour: "The Snake rules the late morning, from 9 to 11 a.m. A traditional explanation is that by then the sun has warmed the ground and snakes leave their holes to bask. The Snake's own element is Fire, matching the warmth of the hour.",
      race: "In the Great Race folk tale the Snake did not swim on its own but hid coiled around the Horse's hoof, then slid out near the finish, startling the Horse and taking sixth place. The story is the origin of the Snake's reputation for patience and quiet strategy.",
    },
    km: {
      hour: "ម្សាញ់គ្រប់គ្រងពេលព្រឹកយឺត ពីម៉ោង 9 ដល់ 11។ ការពន្យល់តាមប្រពៃណីថា នៅពេលនោះព្រះអាទិត្យបានធ្វើឱ្យដីក្តៅ ហើយពស់ចេញពីរន្ធមកហាលថ្ងៃ។ ធាតុផ្ទាល់របស់ម្សាញ់គឺភ្លើង ដែលត្រូវនឹងភាពកក់ក្តៅនៃម៉ោងនេះ។",
      race: "ក្នុងរឿងនិទានប្រណាំង ពស់មិនបានហែលដោយខ្លួនឯងទេ៖ វាលាក់ខ្លួនរុំជុំវិញក្រចកជើងសេះ ហើយរអិលចេញនៅជិតទីបញ្ចប់ ធ្វើឱ្យសេះភ្ញាក់ផ្អើល ហើយយកលេខប្រាំមួយ។ រឿងនេះជាប្រភពនៃកិត្តិនាមរបស់ម្សាញ់ ដែលអត់ធ្មត់ និងមានយុទ្ធសាស្ត្រស្ងៀមស្ងាត់។",
    },
    zh: {
      hour: "蛇主巳时，即上午9点到11点。传统的解释是，这时太阳已经把地面晒暖，蛇会出洞晒太阳。蛇本身的五行是火，正好与这个时辰的温暖相合。",
      race: "在过河比赛的民间故事里，蛇并没有自己游过去：它悄悄缠在马蹄上，快到终点时滑下来，把马吓了一跳，拿到第六名。蛇耐心、善用策略的形象就来自这个故事。",
    },
  },
  Horse: {
    branch: "午", py: "wǔ", pos: 7, el: "Fire", yy: "Yang", hour: "11:00–13:00", month: 5, dir: "S", frame: "Fire", khmer: "Momee",
    en: {
      hour: "The Horse rules noon, from 11 a.m. to 1 p.m., and due south, the direction of the midday sun. In traditional thought this is when Yang energy is at its peak, which is one reason the Horse is linked with energy, warmth and movement.",
      race: "In the Great Race folk tale the Horse was galloping toward a good finish when the Snake, hidden around its hoof, darted out and startled it. The Horse recovered and came seventh, a story that fits its reputation for speed that sometimes outruns caution.",
    },
    km: {
      hour: "មមីគ្រប់គ្រងពេលថ្ងៃត្រង់ ពីម៉ោង 11 ព្រឹក ដល់ 1 រសៀល និងទិសខាងត្បូង ដែលជាទិសព្រះអាទិត្យពេលថ្ងៃត្រង់។ តាមគំនិតប្រពៃណី នេះជាពេលដែលថាមពលយ៉ាងខ្លាំងបំផុត ដែលជាហេតុផលមួយដែលមមីត្រូវបានភ្ជាប់នឹងថាមពល ភាពកក់ក្តៅ និងចលនា។",
      race: "ក្នុងរឿងនិទានប្រណាំង សេះកំពុងរត់សំដៅទៅទីបញ្ចប់យ៉ាងល្អ ពេលពស់ដែលលាក់នៅក្រចកជើងរបស់វា ផុសចេញមកធ្វើឱ្យវាភ្ញាក់ផ្អើល។ សេះងើបឡើងវិញ ហើយបានលេខប្រាំពីរ ដែលជារឿងត្រូវនឹងកិត្តិនាមរបស់វា ដែលលឿនពេលខ្លះលឿនជាងការប្រុងប្រយ័ត្ន។",
    },
    zh: {
      hour: "马主午时，即上午11点到下午1点，也主正午太阳所在的正南方。在传统观念中，这时阳气最盛，这也是马与活力、热情和奔放联系在一起的原因之一。",
      race: "在过河比赛的民间故事里，马正飞奔向终点，藏在马蹄上的蛇突然窜出，把它吓了一跳。马重新站稳，得了第七名。这个故事符合马速度快、有时快过谨慎的形象。",
    },
  },
  Goat: {
    branch: "未", py: "wèi", pos: 8, el: "Earth", yy: "Yin", hour: "13:00–15:00", month: 6, dir: "SSW", frame: "Wood", khmer: "Momae",
    en: {
      hour: "The Goat rules the early afternoon, from 1 to 3 p.m. A traditional explanation is that this is a good time for goats to graze, after the heat of noon has passed. Its animal is translated as both Goat and Sheep, which is why English sources use both names.",
      race: "In the Great Race folk tale the Goat did not cross alone but shared a raft with the Monkey and the Rooster, and the three helped each other reach the far bank, arriving eighth, ninth and tenth. The story suits the Goat's gentle, cooperative reputation.",
    },
    km: {
      hour: "មមែគ្រប់គ្រងពេលរសៀលដំបូង ពីម៉ោង 1 ដល់ 3។ ការពន្យល់តាមប្រពៃណីថា នេះជាពេលល្អសម្រាប់ពពែស៊ីស្មៅ បន្ទាប់ពីកំដៅថ្ងៃត្រង់បានកន្លងផុត។ អក្សរ 未 ក៏ត្រូវបានអានថាជាចៀមផងដែរ ដែលជាហេតុឯកសារខ្លះប្រើឈ្មោះទាំងពីរ។",
      race: "ក្នុងរឿងនិទានប្រណាំង ពពែមិនបានឆ្លងតែម្នាក់ឯងទេ៖ វាជិះក្បូនជាមួយស្វា និងមាន់ ហើយទាំងបីជួយគ្នាទៅដល់ច្រាំងម្ខាង ដោយបានលេខប្រាំបី ប្រាំបួន និងដប់។ រឿងនេះត្រូវនឹងកិត្តិនាមរបស់មមែ ដែលទន់ភ្លន់ និងចេះសហការ។",
    },
    zh: {
      hour: "羊主未时，即下午1点到3点。传统的解释是，正午的炎热过去后，这正是羊吃草的好时候。“未”对应的动物在英文里有 Goat 和 Sheep 两种译法，所以英文资料两个名字都会用。",
      race: "在过河比赛的民间故事里，羊不是独自过河的：它和猴、鸡同坐一只木筏，三个互相帮忙到了对岸，分别得了第八、第九和第十名。这个故事符合羊温和、善于合作的形象。",
    },
  },
  Monkey: {
    branch: "申", py: "shēn", pos: 9, el: "Metal", yy: "Yang", hour: "15:00–17:00", month: 7, dir: "WSW", frame: "Water", khmer: "Vok",
    en: {
      hour: "The Monkey rules the late afternoon, from 3 to 5 p.m. A traditional explanation is that monkeys are lively and noisy at this time of day. The Monkey's own element is Metal, the element linked with autumn and the west.",
      race: "In the Great Race folk tale the Monkey crossed on a raft with the Goat and the Rooster, clearing weeds and branches out of the way so the raft could pass, and arrived ninth. The story fits the Monkey's reputation for clever, practical problem-solving.",
    },
    km: {
      hour: "វកគ្រប់គ្រងពេលរសៀលយឺត ពីម៉ោង 3 ដល់ 5។ ការពន្យល់តាមប្រពៃណីថា ស្វារស់រវើក និងស្រែកឮខ្លាំងនៅពេលនេះ។ ធាតុផ្ទាល់របស់វកគឺលោហធាតុ ដែលជាធាតុភ្ជាប់នឹងរដូវស្លឹកឈើជ្រុះ និងទិសខាងលិច។",
      race: "ក្នុងរឿងនិទានប្រណាំង ស្វាឆ្លងទន្លេលើក្បូនជាមួយពពែ និងមាន់ ដោយបោសសម្អាតស្មៅ និងមែកឈើចេញពីផ្លូវ ដើម្បីឱ្យក្បូនអាចឆ្លងបាន ហើយបានលេខប្រាំបួន។ រឿងនេះត្រូវនឹងកិត្តិនាមរបស់វក ដែលឆ្លាត និងដោះស្រាយបញ្ហាជាក់ស្តែងបាន។",
    },
    zh: {
      hour: "猴主申时，即下午3点到5点。传统的解释是，猴子在这个时候最活泼、最爱叫。猴本身的五行是金，金与秋天和西方相联系。",
      race: "在过河比赛的民间故事里，猴和羊、鸡同坐木筏过河，一路清除水草和树枝，让木筏能通过，得了第九名。这个故事符合猴聪明、善于解决实际问题的形象。",
    },
  },
  Rooster: {
    branch: "酉", py: "yǒu", pos: 10, el: "Metal", yy: "Yin", hour: "17:00–19:00", month: 8, dir: "W", frame: "Metal", khmer: "Roka",
    en: {
      hour: "The Rooster rules sunset, from 5 to 7 p.m., and due west, the direction of the setting sun. A traditional explanation is that this is when chickens go back to roost. The Rooster is also the bird that announces dawn, which is why it stands for punctuality.",
      race: "In the Great Race folk tale the Rooster found the raft that carried it, the Goat and the Monkey across the river, and it arrived tenth. The story suits the Rooster's reputation for being resourceful and noticing what others miss.",
    },
    km: {
      hour: "រកាគ្រប់គ្រងពេលថ្ងៃលិច ពីម៉ោង 5 ដល់ 7 ល្ងាច និងទិសខាងលិច ដែលជាទិសព្រះអាទិត្យលិច។ ការពន្យល់តាមប្រពៃណីថា នេះជាពេលដែលមាន់ត្រឡប់ទៅទ្រុង។ មាន់ក៏ជាសត្វដែលរងាវប្រកាសពេលព្រឹក ដែលជាហេតុដែលវាតំណាងឱ្យភាពទៀងពេល។",
      race: "ក្នុងរឿងនិទានប្រណាំង មាន់រកឃើញក្បូនដែលដឹកវា ពពែ និងស្វាឆ្លងទន្លេ ហើយវាមកដល់លេខដប់។ រឿងនេះត្រូវនឹងកិត្តិនាមរបស់រកា ដែលប៉ិនប្រសប់ និងសង្កេតឃើញអ្វីដែលអ្នកដទៃមើលរំលង។",
    },
    zh: {
      hour: "鸡主酉时，即傍晚5点到7点，也主太阳落下的正西方。传统的解释是，这时鸡回窝栖息。鸡也是报晓的动物，所以代表守时。",
      race: "在过河比赛的民间故事里，是鸡找到了那只木筏，载着它和羊、猴过河，它得了第十名。这个故事符合鸡机灵、能注意到别人忽略之处的形象。",
    },
  },
  Dog: {
    branch: "戌", py: "xū", pos: 11, el: "Earth", yy: "Yang", hour: "19:00–21:00", month: 9, dir: "WNW", frame: "Fire", khmer: "Cho",
    en: {
      hour: "The Dog rules the early evening, from 7 to 9 p.m. A traditional explanation is that this is when dogs take up their watch over the house for the night, which is why the Dog stands for loyalty and protection.",
      race: "The Dog was one of the best swimmers, yet in the Great Race folk tale it came eleventh because it stopped to play and bathe in the river. The story gives the Dog its friendly, honest image: loyal and capable, but not obsessed with winning.",
    },
    km: {
      hour: "ចគ្រប់គ្រងពេលល្ងាចដំបូង ពីម៉ោង 7 ដល់ 9 យប់។ ការពន្យល់តាមប្រពៃណីថា នេះជាពេលដែលឆ្កែចាប់ផ្តើមយាមផ្ទះពេញមួយយប់ ដែលជាហេតុដែលចតំណាងឱ្យភាពស្មោះត្រង់ និងការការពារ។",
      race: "ឆ្កែជាអ្នកហែលទឹកពូកែម្នាក់ ប៉ុន្តែក្នុងរឿងនិទានប្រណាំង វាបានលេខដប់មួយ ព្រោះវាឈប់លេង និងងូតទឹកក្នុងទន្លេ។ រឿងនេះផ្តល់ឱ្យចនូវរូបភាពរួសរាយ និងស្មោះត្រង់៖ ស្មោះស្ម័គ្រ និងមានសមត្ថភាព ប៉ុន្តែមិនឈ្លក់នឹងការឈ្នះទេ។",
    },
    zh: {
      hour: "狗主戌时，即晚上7点到9点。传统的解释是，这时狗开始为家里守夜，所以狗代表忠诚和守护。",
      race: "狗是游泳好手，但在过河比赛的民间故事里只得了第十一名，因为它在河里玩水洗澡。这个故事给了狗友善、诚实的形象：忠诚能干，但并不执着于输赢。",
    },
  },
  Pig: {
    branch: "亥", py: "hài", pos: 12, el: "Water", yy: "Yin", hour: "21:00–23:00", month: 10, dir: "NNW", frame: "Wood", khmer: "Kor",
    en: {
      hour: "The Pig rules the last hours of the day, from 9 to 11 p.m. A traditional explanation is that pigs are sound asleep by then, which matches the Pig's easygoing, comfort-loving image. As the twelfth animal it closes the cycle before the Rat begins it again.",
      race: "In the Great Race folk tale the Pig came last because it stopped for a meal on the way and then fell asleep. Far from being an insult, the story is usually told with affection: the Pig enjoys life and still makes it to the finish.",
    },
    km: {
      hour: "កុរគ្រប់គ្រងម៉ោងចុងក្រោយនៃថ្ងៃ ពីម៉ោង 9 ដល់ 11 យប់។ ការពន្យល់តាមប្រពៃណីថា ជ្រូកដេកលង់លក់នៅពេលនោះ ដែលត្រូវនឹងរូបភាពរបស់កុរ ដែលងាយស្រួល និងស្រឡាញ់ភាពសុខស្រួល។ ជាសត្វទីដប់ពីរ វាបិទវដ្ត មុនពេលជូតចាប់ផ្តើមម្តងទៀត។",
      race: "ក្នុងរឿងនិទានប្រណាំង ជ្រូកមកដល់ចុងក្រោយ ព្រោះវាឈប់ញ៉ាំអាហារតាមផ្លូវ ហើយដេកលង់លក់។ រឿងនេះមិនមែនជាការប្រមាថទេ ជាធម្មតាត្រូវបាននិទានដោយក្តីស្រឡាញ់៖ ជ្រូករីករាយនឹងជីវិត ហើយនៅតែទៅដល់ទីបញ្ចប់។",
    },
    zh: {
      hour: "猪主亥时，即晚上9点到11点。传统的解释是，这时猪已经睡得很熟，这与猪随和、爱享受的形象相符。作为第十二个生肖，猪为一轮循环收尾，之后又由鼠重新开始。",
      race: "在过河比赛的民间故事里，猪排在最后，因为它在路上停下来吃饭，然后睡着了。这个故事并不是贬低，通常带着亲切的语气讲述：猪懂得享受生活，最终也到达了终点。",
    },
  },
};

export const DIR = {
  en: { N: "North", NNE: "North-northeast", ENE: "East-northeast", E: "East", ESE: "East-southeast", SSE: "South-southeast", S: "South", SSW: "South-southwest", WSW: "West-southwest", W: "West", WNW: "West-northwest", NNW: "North-northwest" },
  km: { N: "ខាងជើង", NNE: "ខាងជើងឆៀងខាងកើត", ENE: "ខាងកើតឆៀងខាងជើង", E: "ខាងកើត", ESE: "ខាងកើតឆៀងខាងត្បូង", SSE: "ខាងត្បូងឆៀងខាងកើត", S: "ខាងត្បូង", SSW: "ខាងត្បូងឆៀងខាងលិច", WSW: "ខាងលិចឆៀងខាងត្បូង", W: "ខាងលិច", WNW: "ខាងលិចឆៀងខាងជើង", NNW: "ខាងជើងឆៀងខាងលិច" },
  zh: { N: "正北", NNE: "北偏东", ENE: "东偏北", E: "正东", ESE: "东偏南", SSE: "南偏东", S: "正南", SSW: "南偏西", WSW: "西偏南", W: "正西", WNW: "西偏北", NNW: "北偏西" },
};
// the branches that make up each three-harmony frame, in the traditional order
export const FRAME = { Water: "申子辰", Metal: "巳酉丑", Fire: "寅午戌", Wood: "亥卯未" };
