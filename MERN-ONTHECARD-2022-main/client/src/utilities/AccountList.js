import { loadIcons, loadBank } from "./load_icons";

const fullList_me = (renderlanguage) => {
  return [
    {
      content: "Instagram",
      key: "instagram",
      icon: loadIcons("instagram"),
    },
    { content: "Facebook", key: "facebook", icon: loadIcons("facebook") },
    {
      content: renderlanguage.editPage.dropDown.otherLink,
      key: "url2",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.otherLinkAdvanced,
      key: "url3",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.banking,
      key: "banking",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.uploadFile,
      key: "file",
      icon: loadIcons("pdf"),
    },
    {
      content: renderlanguage.editPage.dropDown.instaEmbed,
      key: "instagramembed",
      icon: loadIcons("instagram"),
    },
    {
      content: renderlanguage.editPage.dropDown.tikTokEmbed,
      key: "tiktokembed",
      icon: loadIcons("tiktok"),
    },
    {
      content: renderlanguage.editPage.dropDown.embedYoutube,
      key: "embedyoutube",
      icon: loadIcons("youtube"),
    },
    {
      content: renderlanguage.editPage.dropDown.phone,
      key: "phoneNumber",
      icon: loadIcons("phoneNumber"),
    },
    {
      content: renderlanguage.editPage.dropDown.momo,
      key: "momo",
      icon: loadIcons("momo"),
    },
    { content: "Zalo", key: "zalo", icon: loadIcons("zalo") },
    { content: "Email", key: "mail", icon: loadIcons("mail") },
    { content: "TikTok", key: "tiktok", icon: loadIcons("tiktok") },
    { content: "Twitter", key: "twitter", icon: loadIcons("twitter") },
    { content: "Website", key: "url", icon: loadIcons("website") },
    { content: "Linkedin", key: "linkedin", icon: loadIcons("linkedin") },
    { content: "Snapchat", key: "snapchat", icon: loadIcons("snapchat") },
    {
      content: "Pinterest",
      key: "pinterest",
      icon: loadIcons("pinterest"),
    },
    { content: "Behance", key: "behance", icon: loadIcons("behance") },
    { content: "Github", key: "github", icon: loadIcons("github") },
    {
      content: "Soundcloud",
      key: "soundcloud",
      icon: loadIcons("soundcloud"),
    },
    { content: "Spotify", key: "spotify", icon: loadIcons("spotify") },
    { content: "Youtube", key: "youtube", icon: loadIcons("youtube") },
    { content: "Skype", key: "skype", icon: loadIcons("skype") },
    { content: "Telegram", key: "telegram", icon: loadIcons("telegram") },
    { content: "Shopee", key: "shopee", icon: loadIcons("shopee") },
    { content: "Twitch", key: "twitch", icon: loadIcons("twitch") },
    { content: "WeChat", key: "wechat", icon: loadIcons("wechat") },
    { content: "KakaoTalk", key: "kakaotalk", icon: loadIcons("kakaotalk") },
    { content: "Discord", key: "discord", icon: loadIcons("discord") },
    {
      content: "Hotline",
      key: "hotline",
      icon: loadIcons("hotline"),
    },
  ];
};

const normalList_me = (renderlanguage) => {
  return [
    {
      content: "Instagram",
      key: "instagram",
      icon: loadIcons("instagram"),
    },
    { content: "Facebook", key: "facebook", icon: loadIcons("facebook") },
    {
      content: renderlanguage.editPage.dropDown.otherLink,
      key: "url2",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.otherLinkAdvanced,
      key: "url3",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.instaEmbed,
      key: "instagramembed",
      icon: loadIcons("instagram"),
    },
    {
      content: renderlanguage.editPage.dropDown.banking,
      key: "banking",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.embedYoutube,
      key: "embedyoutube",
      icon: loadIcons("youtube"),
    },
    {
      content: renderlanguage.editPage.dropDown.phone,
      key: "phoneNumber",
      icon: loadIcons("phoneNumber"),
    },
    {
      content: renderlanguage.editPage.dropDown.momo,
      key: "momo",
      icon: loadIcons("momo"),
    },
    { content: "Zalo", key: "zalo", icon: loadIcons("zalo") },
    { content: "Email", key: "mail", icon: loadIcons("mail") },
    { content: "TikTok", key: "tiktok", icon: loadIcons("tiktok") },
    { content: "Twitter", key: "twitter", icon: loadIcons("twitter") },
    { content: "Website", key: "url", icon: loadIcons("website") },
    { content: "Linkedin", key: "linkedin", icon: loadIcons("linkedin") },
    { content: "Snapchat", key: "snapchat", icon: loadIcons("snapchat") },
    {
      content: "Pinterest",
      key: "pinterest",
      icon: loadIcons("pinterest"),
    },
    { content: "Behance", key: "behance", icon: loadIcons("behance") },
    { content: "Github", key: "github", icon: loadIcons("github") },
    {
      content: "Soundcloud",
      key: "soundcloud",
      icon: loadIcons("soundcloud"),
    },
    { content: "Spotify", key: "spotify", icon: loadIcons("spotify") },
    { content: "Youtube", key: "youtube", icon: loadIcons("youtube") },
    { content: "Skype", key: "skype", icon: loadIcons("skype") },
    { content: "Telegram", key: "telegram", icon: loadIcons("telegram") },
    { content: "Shopee", key: "shopee", icon: loadIcons("shopee") },
    { content: "Twitch", key: "twitch", icon: loadIcons("twitch") },
    {
      content: "Hotline",
      key: "hotline",
      icon: loadIcons("hotline"),
    },
  ];
};

const bankList_me = () => {
  return [
    {
      content: "VietinBank",
      key: "vietinbank",
      icon: loadBank("vietinbank"),
    },
    {
      content: "VPBank",
      key: "vpbank",
      icon: loadBank("vpbank"),
    },
    {
      content: "SacomBank",
      key: "sacombank",
      icon: loadBank("sacombank"),
    },
    {
      content: "ABBank",
      key: "abbank",
      icon: loadBank("abbank"),
    },
    {
      content: "ACB",
      key: "acb",
      icon: loadBank("acb"),
    },
    {
      content: "BIDV",
      key: "bidv",
      icon: loadBank("bidv"),
    },
    {
      content: "EximBank",
      key: "eximbank",
      icon: loadBank("eximbank"),
    },
    {
      content: "HDBank",
      key: "hdbank",
      icon: loadBank("hdbank"),
    },
    {
      content: "MBBank",
      key: "mbbank",
      icon: loadBank("mbbank"),
    },
    {
      content: "MSB",
      key: "msb",
      icon: loadBank("msb"),
    },
    {
      content: "OCB",
      key: "ocb",
      icon: loadBank("ocb"),
    },
    {
      content: "SCB",
      key: "saigon",
      icon: loadBank("saigon"),
    },
    {
      content: "SHB",
      key: "shb",
      icon: loadBank("shb"),
    },
    {
      content: "TechcomBank",
      key: "techcombank",
      icon: loadBank("techcombank"),
    },
    {
      content: "TPBank",
      key: "tpbank",
      icon: loadBank("tpbank"),
    },
    {
      content: "VIB",
      key: "vib",
      icon: loadBank("vib"),
    },
    {
      content: "VietcomBank",
      key: "vietcombank",
      icon: loadBank("vietcombank"),
    },
  ];
};

const b2bList_me = (renderlanguage) => {
  return [
    {
      content: renderlanguage.editPage.dropDown.company,
      key: "company",
      icon: loadIcons("company"),
    },
    {
      content: renderlanguage.editPage.dropDown.bio,
      key: "bio",
      icon: loadIcons("bio"),
    },
    {
      content: renderlanguage.editPage.dropDown.calendar,
      key: "calendar",
      icon: loadIcons("calendar"),
    },
    {
      content: renderlanguage.editPage.dropDown.position,
      key: "position",
      icon: loadIcons("position"),
    },
    {
      content: renderlanguage.editPage.dropDown.tax,
      key: "tax",
      icon: loadIcons("tax"),
    },
    {
      content: renderlanguage.editPage.dropDown.map,
      key: "map",
      icon: loadIcons("map"),
    },
    { content: "Email", key: "mail", icon: loadIcons("mail") },
    {
      content: renderlanguage.editPage.dropDown.phone,
      key: "phoneNumber",
      icon: loadIcons("phoneNumber"),
    },
    { content: "Zalo", key: "zalo", icon: loadIcons("zalo") },
    { content: "Website", key: "url", icon: loadIcons("website") },
    {
      content: renderlanguage.editPage.dropDown.otherLink,
      key: "url2",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.otherLinkAdvanced,
      key: "url3",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.banking,
      key: "banking",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.momo,
      key: "momo",
      icon: loadIcons("momo"),
    },
    {
      content: renderlanguage.editPage.dropDown.uploadFile,
      key: "file",
      icon: loadIcons("pdf"),
    },
    { content: "Linkedin", key: "linkedin", icon: loadIcons("linkedin") },
    { content: "Facebook", key: "facebook", icon: loadIcons("facebook") },

    {
      content: "Instagram",
      key: "instagram",
      icon: loadIcons("instagram"),
    },
    {
      content: renderlanguage.editPage.dropDown.embedYoutube,
      key: "embedyoutube",
      icon: loadIcons("youtube"),
    },
    {
      content: renderlanguage.editPage.dropDown.instaEmbed,
      key: "instagramembed",
      icon: loadIcons("instagram"),
    },
    { content: "TikTok", key: "tiktok", icon: loadIcons("tiktok") },
    { content: "Twitter", key: "twitter", icon: loadIcons("twitter") },
    { content: "Snapchat", key: "snapchat", icon: loadIcons("snapchat") },
    {
      content: "Pinterest",
      key: "pinterest",
      icon: loadIcons("pinterest"),
    },
    { content: "Behance", key: "behance", icon: loadIcons("behance") },
    { content: "Github", key: "github", icon: loadIcons("github") },
    {
      content: "Soundcloud",
      key: "soundcloud",
      icon: loadIcons("soundcloud"),
    },
    { content: "Spotify", key: "spotify", icon: loadIcons("spotify") },
    { content: "Youtube", key: "youtube", icon: loadIcons("youtube") },
    { content: "Skype", key: "skype", icon: loadIcons("skype") },
    { content: "Telegram", key: "telegram", icon: loadIcons("telegram") },
    { content: "Shopee", key: "shopee", icon: loadIcons("shopee") },
    { content: "Twitch", key: "twitch", icon: loadIcons("twitch") },
    {
      content: "Hotline",
      key: "hotline",
      icon: loadIcons("hotline"),
    },
  ];
};

const fullList_co = (renderlanguage) => {
  return [
    {
      content: renderlanguage.editPage.dropDown.phone,
      key: "phoneNumber",
      icon: loadIcons("phoneNumber"),
    },
    { content: "Email", key: "mail", icon: loadIcons("mail") },
    { content: "Facebook", key: "facebook", icon: loadIcons("facebook") },
    {
      content: "Instagram",
      key: "instagram",
      icon: loadIcons("instagram"),
    },
    { content: "TikTok", key: "tiktok", icon: loadIcons("tiktok") },
    { content: "Twitter", key: "twitter", icon: loadIcons("twitter") },
    {
      content: renderlanguage.editPage.dropDown.otherLink,
      key: "url2",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.otherLinkAdvanced,
      key: "url3",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.banking,
      key: "banking",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.instaEmbed,
      key: "instagramembed",
      icon: loadIcons("instagram"),
    },
    {
      content: renderlanguage.editPage.dropDown.tikTokEmbed,
      key: "tiktokembed",
      icon: loadIcons("tiktok"),
    },
    {
      content: renderlanguage.editPage.dropDown.embedYoutube,
      key: "embedyoutube",
      icon: loadIcons("youtube"),
    },
    {
      content: renderlanguage.editPage.dropDown.uploadFile,
      key: "file",
      icon: loadIcons("pdf"),
    },
    { content: "Snapchat", key: "snapchat", icon: loadIcons("snapchat") },
    { content: "WhatsApp", key: "whatsapp", icon: loadIcons("whatsapp") },
    {
      content: "Pinterest",
      key: "pinterest",
      icon: loadIcons("pinterest"),
    },
    { content: "Reddit", key: "reddit", icon: loadIcons("reddit") },
    { content: "Youtube", key: "youtube", icon: loadIcons("youtube") },
    { content: "Linkedin", key: "linkedin", icon: loadIcons("linkedin") },
    { content: "Website", key: "url", icon: loadIcons("website") },
    {
      content: "Soundcloud",
      key: "soundcloud",
      icon: loadIcons("soundcloud"),
    },
    { content: "Spotify", key: "spotify", icon: loadIcons("spotify") },
    { content: "Behance", key: "behance", icon: loadIcons("behance") },
    { content: "Github", key: "github", icon: loadIcons("github") },
    { content: "Skype", key: "skype", icon: loadIcons("skype") },
    { content: "Telegram", key: "telegram", icon: loadIcons("telegram") },
    { content: "Twitch", key: "twitch", icon: loadIcons("twitch") },
    { content: "Discord", key: "discord", icon: loadIcons("discord") },
    { content: "WeChat", key: "wechat", icon: loadIcons("wechat") },
    { content: "KakaoTalk", key: "kakaotalk", icon: loadIcons("kakaotalk") },
    {
      content: "Hotline",
      key: "hotline",
      icon: loadIcons("hotline"),
    },
  ];
};

const bankList_co = () => {
  return [
    {
      content: "BMO",
      key: "bmo",
      icon: loadBank("bmo"),
    },
    {
      content: "TD",
      key: "td",
      icon: loadBank("td"),
    },
    {
      content: "ScotiaBank",
      key: "scotiabank",
      icon: loadBank("scotiabank"),
    },
    {
      content: "RBC",
      key: "rbc",
      icon: loadBank("rbc"),
    },
    {
      content: "CIBC",
      key: "cibc",
      icon: loadBank("cibc"),
    },
    {
      content: "NationalBank",
      key: "nationalbank",
      icon: loadBank("nationalbank"),
    },
    {
      content: "HSBC",
      key: "hsbc",
      icon: loadBank("hsbc"),
    },
    {
      content: "Laurentian Bank",
      key: "laurentian",
      icon: loadBank("laurentian"),
    },
    {
      content: "Desjardins Bank",
      key: "desjardins",
      icon: loadBank("desjardins"),
    },
  ];
};

const b2bList_co = (renderlanguage) => {
  return [
    {
      content: renderlanguage.editPage.dropDown.company,
      key: "company",
      icon: loadIcons("company"),
    },
    {
      content: renderlanguage.editPage.dropDown.bio,
      key: "bio",
      icon: loadIcons("bio"),
    },
    {
      content: renderlanguage.editPage.dropDown.calendar,
      key: "calendar",
      icon: loadIcons("calendar"),
    },
    {
      content: renderlanguage.editPage.dropDown.position,
      key: "position",
      icon: loadIcons("position"),
    },
    {
      content: renderlanguage.editPage.dropDown.tax,
      key: "tax",
      icon: loadIcons("tax"),
    },
    {
      content: renderlanguage.editPage.dropDown.map,
      key: "map",
      icon: loadIcons("map"),
    },
    { content: "Email", key: "mail", icon: loadIcons("mail") },
    {
      content: renderlanguage.editPage.dropDown.phone,
      key: "phoneNumber",
      icon: loadIcons("phoneNumber"),
    },
    { content: "Zalo", key: "zalo", icon: loadIcons("zalo") },
    { content: "Website", key: "url", icon: loadIcons("website") },
    {
      content: renderlanguage.editPage.dropDown.otherLink,
      key: "url2",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.otherLinkAdvanced,
      key: "url3",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.banking,
      key: "banking",
      icon: loadIcons("url2"),
    },
    {
      content: renderlanguage.editPage.dropDown.momo,
      key: "momo",
      icon: loadIcons("momo"),
    },
    {
      content: renderlanguage.editPage.dropDown.uploadFile,
      key: "file",
      icon: loadIcons("pdf"),
    },
    { content: "Linkedin", key: "linkedin", icon: loadIcons("linkedin") },
    { content: "Facebook", key: "facebook", icon: loadIcons("facebook") },

    {
      content: "Instagram",
      key: "instagram",
      icon: loadIcons("instagram"),
    },
    {
      content: renderlanguage.editPage.dropDown.embedYoutube,
      key: "embedyoutube",
      icon: loadIcons("youtube"),
    },
    {
      content: renderlanguage.editPage.dropDown.instaEmbed,
      key: "instagramembed",
      icon: loadIcons("instagram"),
    },
    { content: "TikTok", key: "tiktok", icon: loadIcons("tiktok") },
    { content: "Twitter", key: "twitter", icon: loadIcons("twitter") },
    { content: "Snapchat", key: "snapchat", icon: loadIcons("snapchat") },
    {
      content: "Pinterest",
      key: "pinterest",
      icon: loadIcons("pinterest"),
    },
    { content: "Behance", key: "behance", icon: loadIcons("behance") },
    { content: "Github", key: "github", icon: loadIcons("github") },
    {
      content: "Soundcloud",
      key: "soundcloud",
      icon: loadIcons("soundcloud"),
    },
    { content: "Spotify", key: "spotify", icon: loadIcons("spotify") },
    { content: "Youtube", key: "youtube", icon: loadIcons("youtube") },
    { content: "Skype", key: "skype", icon: loadIcons("skype") },
    { content: "Telegram", key: "telegram", icon: loadIcons("telegram") },
    { content: "Shopee", key: "shopee", icon: loadIcons("shopee") },
    { content: "Twitch", key: "twitch", icon: loadIcons("twitch") },
    {
      content: "Hotline",
      key: "hotline",
      icon: loadIcons("hotline"),
    },
  ];
};

export { fullList_me, normalList_me, bankList_me, b2bList_me };
export { fullList_co, bankList_co, b2bList_co };
