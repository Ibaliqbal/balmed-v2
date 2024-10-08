import { formatDistanceToNowStrict, format } from "date-fns";
import type { Metadata } from "next";

export const queryPosting = `*, comment:postings (count), like:likes!id(count), who_likes:likes!id(user:users!user_id (username)), repost:reposts!id(count), creator:users (name, username, photo, bio, header_photo, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`;

export const seo = (
  title: string,
  description: string,
  site: string,
  keywords?: string[]
): Metadata => {
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      title,
      description,
      siteName: `${process.env.NEXT_PUBLIC_APP_URL}/${site}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${site}`,
    },
    applicationName: "BALMED",
    robots: {}
  };
};

export function dateConverterNow(date: Date | string): string {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  });
}

export function dateFormat(date: Date | string): string {
  return format(new Date(date), "MMMM, dd yyyy");
}

export function textCapitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const offensiveWords: string[] = [
  // Bahasa Indonesia
  "anjing",
  "bajingan",
  "brengsek",
  "bangsat",
  "goblok",
  "tolol",
  "bego",
  "kafir",
  "kontol",
  "memek",
  "setan",
  "tai",
  "pecundang",
  "monyet",
  "babi",
  "ngentot",
  "jancuk",
  "keparat",
  "pelacur",
  "lonte",
  "sundal",
  "bencong",
  "waria",
  "siluman",
  "iblis",
  "hancip",
  "cangcut",
  "gembel",
  "tai anjing",
  "tai sapi",
  "tai ayam",
  "ngaceng",
  "kocok",
  "ngacir",
  "embat",
  "kroco",
  "kenthu",
  "kudhuk",
  "mbedhezi",
  "mbambung",
  "ajg",
  "njing",
  "bgst",
  "jnck",
  "pantek",
  "panteq",
  // Bahasa Inggris
  "shit",
  "fuck",
  "asshole",
  "bitch",
  "bastard",
  "damn",
  "crap",
  "dick",
  "pussy",
  "cunt",
  "motherfucker",
  "son of a bitch",
  "whore",
  "slut",
  "freak",
  "jerk",
  "prick",
  "wanker",
  "twat",
  "douchebag",
  "numbnuts",
  "cock",
  "dickhead",
  "scumbag",
  "tosser",
  "dipshit",
  "retard",
  "jackass",
  "bimbo",
  "piss off",
  "screw you",
  "shithead",
  "butthead",
  "dumbass",
  "skank",
  "tramp",
  "moron",
  "idiot",
  "imbecile",
  "knobhead",
  "bollocks",
  "arsehole",
  "bugger",
  "git",
  "minger",
  "wazzock",
  "berk",
  "pillock",
  "numpty",
  "bellend",
  "knob",
  "muppet",
  "plonker",
  "sod off",
  "pisshead",
  "git",
  "knacker",
  "div",
  "nutter",
  "scally",
  "scrubber",
  "slag",
  "tart",
  "twonk",
  "wally",
  "prat",
];
