/* ============ EDIT HERE ============ */
const THEME = "light";              // "light" or "dark"
const SHOWREEL_SRC = "https://youtu.be/cRClWU29IrU?si=kH4UgWplacGn9la_";            // paste ANY link: YouTube, Google Drive, Vimeo, Instagram reel, or "videos/showreel.mp4"
const SHOWREEL_POSTER = "";         // e.g. "images/showreel.jpg"
const PREVIEW_START = 0;            // preview loop starts at this second of the video
const PREVIEW_LENGTH = 3;           // preview loop length in seconds (click = full video with sound)
const SHOW_EMPTY_PLACEHOLDERS = true; // false = hide items that have no link yet
const EMAIL = "krishnanbe007@gmail.com";

/* ================= YOUR WORK =================
   One line = one item. Copy a line, paste it below, change the text. Order here = order on the page.

     reel("Title", "link or file", "short description", "cover image")   -> Instagram Reels (vertical)
     short("Title", "link or file", "description", "cover image")        -> Short-form videos (vertical)
     youtube("Title", "link or file", "description", "cover image")      -> YouTube videos (wide)
     thumb("Title", "image file")                                        -> Thumbnail designs (image)

   "link or file" can be:
     - a YouTube link        https://youtu.be/abc123XYZ00  (cover image comes automatically)
     - a Google Drive link   https://drive.google.com/file/d/..../view  (share: "Anyone with the link")
     - an Instagram reel     https://www.instagram.com/reel/..../
     - a Vimeo link          https://vimeo.com/123456
     - your own file         videos/reel-01.mp4   (put the file inside the Frontend/videos folder)

   Images go inside the Frontend/images folder -> write them as "images/name.jpg".
   Description and cover image are optional - you can leave them out.
   Don't forget the comma at the end of every line.
============================================== */
const WORK = [
  reel("Reel 01", "https://www.instagram.com/reel/DeUEh6bjh8e/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",  "Smarter Attendance. Better Workforce Management! 💼✨ Say goodbye to manual tracking and hello to smarter business management with Cloud Hawk! 💻📊"),
  reel("Reel 02", "https://www.instagram.com/reel/DbLPtUWjCWF/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="),
  reel("Reel 03", ""),
  // reel("Cafe promo", "videos/cafe-promo.mp4", "Promo reel for a local cafe", "images/cafe-cover.jpg"),
  // reel("Gym edit", "https://www.instagram.com/reel/XXXXXXXXXXX/"),

  short("Short 01", ""),
  // short("Product teaser", "https://drive.google.com/file/d/XXXXXXXX/view"),

  youtube("YouTube Video 01", ""),
  youtube("YouTube Video 02", ""),
  // youtube("Travel vlog", "https://youtu.be/XXXXXXXXXXX", "Full vlog edit with colour grade"),

  thumb("Thumbnail 01", ""),
  thumb("Thumbnail 02", ""),
  // thumb("Tech review thumbnail", "images/thumb-tech.jpg"),
];

/* ---- helpers (no need to edit) ---- */
function item(type, cat, title, link, desc, cover) { return {type, cat, title, desc: desc || "", src: link || "", embed: "", poster: cover || "", hidden: false}; }
function reel(t, l, d, c)    { return item("reel", "Instagram Reels", t, l, d, c); }
function short(t, l, d, c)   { return item("short", "Short-Form Videos", t, l, d, c); }
function youtube(t, l, d, c) { return item("youtube", "YouTube Videos", t, l, d, c); }
function thumb(t, img, d)    { return item("thumb", "Thumbnails", t, "", d, img); }
const P = WORK;

const FILTERS = [["all","All"],["reel","Instagram Reels"],["short","Short-Form Videos"],["youtube","YouTube Videos"],["thumb","Thumbnails"]];
const FACTS = [["3","Companies worked with"],["Current","Cloud Hawk"],["4","Tools in my workflow"],["3","Reels · YouTube · Thumbnails"]];
const TOOLS = [["Cc","CapCut",100],["Ps","Photoshop",70],["Pr","Adobe Premiere Pro",70],["Ae","After Effects",60]];
const SERVICES = [
 ["Instagram Reels Editing","Vertical edits with clean cuts, pacing and captions made for Reels.","M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM10 9l5 3-5 3z"],
 ["Short-Form Content Editing","Quick, engaging edits for short videos across social platforms.","M13 2L3 14h8l-1 8 10-12h-8z"],
 ["YouTube Video Editing","Structured long-form edits that keep the story clear and watchable.","M2 6h20v12H2zM10 9l5 3-5 3z"],
 ["YouTube Thumbnail Design","Bold, readable thumbnail designs that support the video’s message.","M3 3h18v18H3zM3 16l5-5 5 5 3-3 5 5"]
];
const MARQUEE = ["Short-form editing","Instagram Reels","YouTube editing","Thumbnail design","Storytelling"];
/* =================================== */
