/* Local ads for the Khmer pages (mybirthsign.com/km/...).
   The Khmer pages show no ad network (no Adsterra). They show ads from local businesses that you place yourself, in the
   same spots between sections. js/ads.js reads this list on every Khmer page.

   HOW TO ADD AN AD
   1. Put the advertiser's picture in the folder images/local-ads/ (JPG, PNG or WebP).
      A wide picture works best on phones and computers: about 1200 x 400 px (3 : 1), under 200 KB.
      Use a NEW file name for every new picture (pictures are kept by browsers for a day).
   2. Copy the example block below (between the { and the },), remove the // at the start of its lines, and fill it in.
   3. Save the change. The site updates by itself in about a minute.

   FIELDS (only "id" and "link" are needed; use a picture, a text, or both)
     id          short name, English letters / numbers / dashes, different for every ad, e.g. "vannak-shop-nov"
     advertiser  the business name, shown small next to "ពាណិជ្ជកម្ម" (Ad)
     image       the picture, e.g. "/images/local-ads/vannak-shop-nov.webp"
     alt         a few words describing the picture (for blind readers and if the picture cannot load)
     title       a short headline in Khmer
     text        one or two short lines in Khmer
     button      the button text, e.g. "ទាក់ទងឥឡូវនេះ"
     link        where a tap goes: a website, Facebook page, Telegram (https://t.me/...) or a phone number ("tel:012345678")
     start, end  first and last day the ad shows, written dd/mm/yyyy (Cambodia dates). Leave out for no limit.
     pages       optional: only on some pages, e.g. ["index", "checker", "compatibility", "blog"]
                 ("blog" = every blog page). Leave out for every Khmer page.

   Each Khmer page shows each running ad once, in a new random order on every visit, one ad per spot; spots without an ad
   stay hidden. With no ad running, the first spot of each Khmer page shows an "Advertise your business here" box that links
   to the contact page (set showAdvertiseHere to false to show nothing instead). */
window.MBS_LOCAL_ADS = {
  showAdvertiseHere: true,
  ads: [
    // {
    //   id: "example-shop-nov",
    //   advertiser: "ឈ្មោះហាង",
    //   image: "/images/local-ads/example-shop-nov.webp",
    //   alt: "រូបភាពហាង",
    //   title: "ចំណងជើងខ្លី",
    //   text: "ពិពណ៌នាខ្លីអំពីហាង ឬការបញ្ចុះតម្លៃ",
    //   button: "ទាក់ទងឥឡូវនេះ",
    //   link: "https://t.me/example",
    //   start: "01/11/2026",
    //   end: "30/11/2026",
    // },
  ],
};
