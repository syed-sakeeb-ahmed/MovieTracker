import {getMovieCardInfo} from '@/getMovieCardInfo'
import {idList} from '/src/idList.js'

export const SECRET = import.meta.env.VITE_KEY;
export const BASE_URL = import.meta.env.VITE_BACKEND_URL

//Joined table dict
export const jt = {
	uid: 0,
	mid: 1,
	user_rating: 2,
	movie_status: 3,
	poster_path: 4,
	title: 5,
	rating: 6,
	votes: 7,
	release_date: 8,
}

//Check if user in list
//[{"uid":"vttM5T2RNWbcNpabqSGzAztck712","mid":18501,"user_rating":2,"movie_status":"Completed"},{"uid":"vttM5T2RNWbcNpabqSGzAztck712","mid":82495,"user_rating":3,"movie_status":"Completed"},{"uid":"vttM5T2RNWbcNpabqSGzAztck712","mid":124905,"user_rating":3,"movie_status":"Plan to Watch"},{"uid":"vttM5T2RNWbcNpabqSGzAztck712","mid":1296022,"user_rating":4,"movie_status":"Plan to Watch"}]
export const checkIfInUserList = (listArr, mid) => {
    //console.log("This is listArr props: " + props.listArr[0].uid)
    const outputObj = {
        status: null,
        rating: null,
    }
    for (const item of listArr) {
        console.log("This is item mid: " + item.mid)
        if (mid === item.mid) {
            outputObj.status = item.movie_status
            outputObj.rating = item.user_rating
            console.log("Found one")
            break;
        }
    }
    return outputObj
 }


 //Im feeling lucky funcs
 function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

 export const getRandomMovieID = () => {
    const max = 1064643
    const myIndex = getRandomInt(max)
    return idList[myIndex]
 }


 export const getMovieData = async (uid) => {
    let outputArr = []
    const {data} = await getMovieCardInfo(BASE_URL + `getHasMovie/${uid}`)
    if (data.value !== null) {
        outputArr = data.value //Will get HTTP.OK and empty array if uid does not exist
    }
    console.log("This is output arr in getMovieData() " + outputArr[0])
    // console.log(dataObjArr.value.length, dataObjArr.value[1])
    return outputArr
}

export const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer " + SECRET,
    },
};

export const sortOptionsArr = [
    "original_title.asc",
    "original_title.desc",
    "popularity.asc",
    "popularity.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "title.asc",
    "title.desc",
    "primary_release_date.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc",
];

export const sortOptions = [
    { name: "Score Ascending", value: "vote_average.asc" },
    { name: "Score Descending", value: "vote_average.desc" },
    { name: "Votes Ascending", value: "vote_count.asc" },
    { name: "Votes Descending", value: "vote_count.desc" },
    { name: "Popularity Ascending", value: "popularity.asc" },
    { name: "Popularity Descending", value: "popularity.desc" },
    { name: "Release Date Ascending", value: "primary_release_date.asc" },
    { name: "Release Date Descending", value: "primary_release_date.desc" },
    { name: "Revenue Ascending", value: "revenue.asc" },
    { name: "Revenue Descending", value: "revenue.desc" },
    { name: "Title Ascending", value: "title.asc" },
    { name: "Title Descending", value: "title.desc" },
    { name: "Original Title Ascending", value: "original_title.asc" },
    { name: "Original Title Descending", value: "original_title.desc" },
];

export const genres = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];

export const genresDict = {
    28: {
        id: 28,
        name: "Action",
    },
    12: {
        id: 12,
        name: "Adventure",
    },
    16: {
        id: 16,
        name: "Animation",
    },
    35: {
        id: 35,
        name: "Comedy",
    },
    80: {
        id: 80,
        name: "Crime",
    },
    99: {
        id: 99,
        name: "Documentary",
    },
    18: {
        id: 18,
        name: "Drama",
    },
    10751: {
        id: 10751,
        name: "Family",
    },
    14: {
        id: 14,
        name: "Fantasy",
    },
    36: {
        id: 36,
        name: "History",
    },
    27: {
        id: 27,
        name: "Horror",
    },
    10402: {
        id: 10402,
        name: "Music",
    },
    9648: {
        id: 9648,
        name: "Mystery",
    },
    10749: {
        id: 10749,
        name: "Romance",
    },
    878: {
        id: 878,
        name: "Science Fiction",
    },
    10770: {
        id: 10770,
        name: "TV Movie",
    },
    53: {
        id: 53,
        name: "Thriller",
    },
    10752: {
        id: 10752,
        name: "War",
    },
    37: {
        id: 37,
        name: "Western",
    },
};

export const languages = [
    {
        iso_639_1: "ay",
        english_name: "Aymara",
        name: "",
    },
    {
        iso_639_1: "ch",
        english_name: "Chamorro",
        name: "Finu' Chamorro",
    },
    {
        iso_639_1: "fj",
        english_name: "Fijian",
        name: "",
    },
    {
        iso_639_1: "it",
        english_name: "Italian",
        name: "Italiano",
    },
    {
        iso_639_1: "nv",
        english_name: "Navajo",
        name: "",
    },
    {
        iso_639_1: "qu",
        english_name: "Quechua",
        name: "",
    },
    {
        iso_639_1: "ru",
        english_name: "Russian",
        name: "Pусский",
    },
    {
        iso_639_1: "sc",
        english_name: "Sardinian",
        name: "",
    },
    {
        iso_639_1: "sw",
        english_name: "Swahili",
        name: "Kiswahili",
    },
    {
        iso_639_1: "tn",
        english_name: "Tswana",
        name: "",
    },
    {
        iso_639_1: "ur",
        english_name: "Urdu",
        name: "اردو",
    },
    {
        iso_639_1: "ho",
        english_name: "Hiri Motu",
        name: "",
    },
    {
        iso_639_1: "km",
        english_name: "Khmer",
        name: "",
    },
    {
        iso_639_1: "kj",
        english_name: "Kuanyama",
        name: "",
    },
    {
        iso_639_1: "tt",
        english_name: "Tatar",
        name: "",
    },
    {
        iso_639_1: "ps",
        english_name: "Pushto",
        name: "پښتو",
    },
    {
        iso_639_1: "cn",
        english_name: "Cantonese",
        name: "广州话 / 廣州話",
    },
    {
        iso_639_1: "mk",
        english_name: "Macedonian",
        name: "",
    },
    {
        iso_639_1: "yo",
        english_name: "Yoruba",
        name: "Èdè Yorùbá",
    },
    {
        iso_639_1: "fo",
        english_name: "Faroese",
        name: "",
    },
    {
        iso_639_1: "ff",
        english_name: "Fulah",
        name: "Fulfulde",
    },
    {
        iso_639_1: "ig",
        english_name: "Igbo",
        name: "",
    },
    {
        iso_639_1: "io",
        english_name: "Ido",
        name: "",
    },
    {
        iso_639_1: "id",
        english_name: "Indonesian",
        name: "Bahasa indonesia",
    },
    {
        iso_639_1: "ko",
        english_name: "Korean",
        name: "한국어/조선말",
    },
    {
        iso_639_1: "mo",
        english_name: "Moldavian",
        name: "",
    },
    {
        iso_639_1: "nr",
        english_name: "Ndebele",
        name: "",
    },
    {
        iso_639_1: "pi",
        english_name: "Pali",
        name: "",
    },
    {
        iso_639_1: "so",
        english_name: "Somali",
        name: "Somali",
    },
    {
        iso_639_1: "sq",
        english_name: "Albanian",
        name: "shqip",
    },
    {
        iso_639_1: "ta",
        english_name: "Tamil",
        name: "தமிழ்",
    },
    {
        iso_639_1: "tl",
        english_name: "Tagalog",
        name: "",
    },
    {
        iso_639_1: "th",
        english_name: "Thai",
        name: "ภาษาไทย",
    },
    {
        iso_639_1: "ve",
        english_name: "Venda",
        name: "",
    },
    {
        iso_639_1: "vo",
        english_name: "Volapük",
        name: "",
    },
    {
        iso_639_1: "cu",
        english_name: "Slavic",
        name: "",
    },
    {
        iso_639_1: "kw",
        english_name: "Cornish",
        name: "",
    },
    {
        iso_639_1: "fr",
        english_name: "French",
        name: "Français",
    },
    {
        iso_639_1: "fy",
        english_name: "Frisian",
        name: "",
    },
    {
        iso_639_1: "ht",
        english_name: "Haitian; Haitian Creole",
        name: "",
    },
    {
        iso_639_1: "ie",
        english_name: "Interlingue",
        name: "",
    },
    {
        iso_639_1: "ia",
        english_name: "Interlingua",
        name: "",
    },
    {
        iso_639_1: "mh",
        english_name: "Marshall",
        name: "",
    },
    {
        iso_639_1: "rn",
        english_name: "Rundi",
        name: "Kirundi",
    },
    {
        iso_639_1: "se",
        english_name: "Northern Sami",
        name: "",
    },
    {
        iso_639_1: "gd",
        english_name: "Gaelic",
        name: "",
    },
    {
        iso_639_1: "ii",
        english_name: "Yi",
        name: "",
    },
    {
        iso_639_1: "lo",
        english_name: "Lao",
        name: "",
    },
    {
        iso_639_1: "la",
        english_name: "Latin",
        name: "Latin",
    },
    {
        iso_639_1: "ny",
        english_name: "Chichewa; Nyanja",
        name: "",
    },
    {
        iso_639_1: "oj",
        english_name: "Ojibwa",
        name: "",
    },
    {
        iso_639_1: "ab",
        english_name: "Abkhazian",
        name: "",
    },
    {
        iso_639_1: "ar",
        english_name: "Arabic",
        name: "العربية",
    },
    {
        iso_639_1: "ee",
        english_name: "Ewe",
        name: "Èʋegbe",
    },
    {
        iso_639_1: "hi",
        english_name: "Hindi",
        name: "हिन्दी",
    },
    {
        iso_639_1: "an",
        english_name: "Aragonese",
        name: "",
    },
    {
        iso_639_1: "ba",
        english_name: "Bashkir",
        name: "",
    },
    {
        iso_639_1: "bn",
        english_name: "Bengali",
        name: "বাংলা",
    },
    {
        iso_639_1: "bi",
        english_name: "Bislama",
        name: "",
    },
    {
        iso_639_1: "et",
        english_name: "Estonian",
        name: "Eesti",
    },
    {
        iso_639_1: "eu",
        english_name: "Basque",
        name: "euskera",
    },
    {
        iso_639_1: "gl",
        english_name: "Galician",
        name: "Galego",
    },
    {
        iso_639_1: "ha",
        english_name: "Hausa",
        name: "Hausa",
    },
    {
        iso_639_1: "hz",
        english_name: "Herero",
        name: "",
    },
    {
        iso_639_1: "iu",
        english_name: "Inuktitut",
        name: "",
    },
    {
        iso_639_1: "jv",
        english_name: "Javanese",
        name: "",
    },
    {
        iso_639_1: "kr",
        english_name: "Kanuri",
        name: "",
    },
    {
        iso_639_1: "mn",
        english_name: "Mongolian",
        name: "",
    },
    {
        iso_639_1: "my",
        english_name: "Burmese",
        name: "",
    },
    {
        iso_639_1: "na",
        english_name: "Nauru",
        name: "",
    },
    {
        iso_639_1: "pt",
        english_name: "Portuguese",
        name: "Português",
    },
    {
        iso_639_1: "sd",
        english_name: "Sindhi",
        name: "",
    },
    {
        iso_639_1: "zu",
        english_name: "Zulu",
        name: "isiZulu",
    },
    {
        iso_639_1: "ak",
        english_name: "Akan",
        name: "",
    },
    {
        iso_639_1: "hu",
        english_name: "Hungarian",
        name: "Magyar",
    },
    {
        iso_639_1: "ik",
        english_name: "Inupiaq",
        name: "",
    },
    {
        iso_639_1: "ks",
        english_name: "Kashmiri",
        name: "",
    },
    {
        iso_639_1: "ka",
        english_name: "Georgian",
        name: "ქართული",
    },
    {
        iso_639_1: "lg",
        english_name: "Ganda",
        name: "",
    },
    {
        iso_639_1: "oc",
        english_name: "Occitan",
        name: "",
    },
    {
        iso_639_1: "uz",
        english_name: "Uzbek",
        name: "ozbek",
    },
    {
        iso_639_1: "xh",
        english_name: "Xhosa",
        name: "",
    },
    {
        iso_639_1: "za",
        english_name: "Zhuang",
        name: "",
    },
    {
        iso_639_1: "zh",
        english_name: "Mandarin",
        name: "普通话",
    },
    {
        iso_639_1: "el",
        english_name: "Greek",
        name: "ελληνικά",
    },
    {
        iso_639_1: "ga",
        english_name: "Irish",
        name: "Gaeilge",
    },
    {
        iso_639_1: "gn",
        english_name: "Guarani",
        name: "",
    },
    {
        iso_639_1: "gu",
        english_name: "Gujarati",
        name: "",
    },
    {
        iso_639_1: "kl",
        english_name: "Kalaallisut",
        name: "",
    },
    {
        iso_639_1: "kn",
        english_name: "Kannada",
        name: "?????",
    },
    {
        iso_639_1: "ky",
        english_name: "Kirghiz",
        name: "??????",
    },
    {
        iso_639_1: "nl",
        english_name: "Dutch",
        name: "Nederlands",
    },
    {
        iso_639_1: "sl",
        english_name: "Slovenian",
        name: "Slovenščina",
    },
    {
        iso_639_1: "sr",
        english_name: "Serbian",
        name: "Srpski",
    },
    {
        iso_639_1: "ss",
        english_name: "Swati",
        name: "",
    },
    {
        iso_639_1: "ug",
        english_name: "Uighur",
        name: "",
    },
    {
        iso_639_1: "bg",
        english_name: "Bulgarian",
        name: "български език",
    },
    {
        iso_639_1: "co",
        english_name: "Corsican",
        name: "",
    },
    {
        iso_639_1: "cy",
        english_name: "Welsh",
        name: "Cymraeg",
    },
    {
        iso_639_1: "dv",
        english_name: "Divehi",
        name: "",
    },
    {
        iso_639_1: "ki",
        english_name: "Kikuyu",
        name: "",
    },
    {
        iso_639_1: "mt",
        english_name: "Maltese",
        name: "Malti",
    },
    {
        iso_639_1: "ne",
        english_name: "Nepali",
        name: "",
    },
    {
        iso_639_1: "si",
        english_name: "Sinhalese",
        name: "සිංහල",
    },
    {
        iso_639_1: "sn",
        english_name: "Shona",
        name: "",
    },
    {
        iso_639_1: "su",
        english_name: "Sundanese",
        name: "",
    },
    {
        iso_639_1: "to",
        english_name: "Tonga",
        name: "",
    },
    {
        iso_639_1: "wa",
        english_name: "Walloon",
        name: "",
    },
    {
        iso_639_1: "cr",
        english_name: "Cree",
        name: "",
    },
    {
        iso_639_1: "fi",
        english_name: "Finnish",
        name: "suomi",
    },
    {
        iso_639_1: "hr",
        english_name: "Croatian",
        name: "Hrvatski",
    },
    {
        iso_639_1: "mg",
        english_name: "Malagasy",
        name: "",
    },
    {
        iso_639_1: "nb",
        english_name: "Norwegian Bokmål",
        name: "Bokmål",
    },
    {
        iso_639_1: "ts",
        english_name: "Tsonga",
        name: "",
    },
    {
        iso_639_1: "vi",
        english_name: "Vietnamese",
        name: "Tiếng Việt",
    },
    {
        iso_639_1: "hy",
        english_name: "Armenian",
        name: "",
    },
    {
        iso_639_1: "av",
        english_name: "Avaric",
        name: "",
    },
    {
        iso_639_1: "az",
        english_name: "Azerbaijani",
        name: "Azərbaycan",
    },
    {
        iso_639_1: "gv",
        english_name: "Manx",
        name: "",
    },
    {
        iso_639_1: "sh",
        english_name: "Serbo-Croatian",
        name: "",
    },
    {
        iso_639_1: "lv",
        english_name: "Latvian",
        name: "Latviešu",
    },
    {
        iso_639_1: "mr",
        english_name: "Marathi",
        name: "",
    },
    {
        iso_639_1: "pl",
        english_name: "Polish",
        name: "Polski",
    },
    {
        iso_639_1: "rm",
        english_name: "Raeto-Romance",
        name: "",
    },
    {
        iso_639_1: "tr",
        english_name: "Turkish",
        name: "Türkçe",
    },
    {
        iso_639_1: "xx",
        english_name: "No Language",
        name: "No Language",
    },
    {
        iso_639_1: "ca",
        english_name: "Catalan",
        name: "Català",
    },
    {
        iso_639_1: "de",
        english_name: "German",
        name: "Deutsch",
    },
    {
        iso_639_1: "rw",
        english_name: "Kinyarwanda",
        name: "Kinyarwanda",
    },
    {
        iso_639_1: "ln",
        english_name: "Lingala",
        name: "",
    },
    {
        iso_639_1: "ro",
        english_name: "Romanian",
        name: "Română",
    },
    {
        iso_639_1: "ty",
        english_name: "Tahitian",
        name: "",
    },
    {
        iso_639_1: "ti",
        english_name: "Tigrinya",
        name: "",
    },
    {
        iso_639_1: "he",
        english_name: "Hebrew",
        name: "עִבְרִית",
    },
    {
        iso_639_1: "as",
        english_name: "Assamese",
        name: "",
    },
    {
        iso_639_1: "bo",
        english_name: "Tibetan",
        name: "",
    },
    {
        iso_639_1: "dz",
        english_name: "Dzongkha",
        name: "",
    },
    {
        iso_639_1: "eo",
        english_name: "Esperanto",
        name: "Esperanto",
    },
    {
        iso_639_1: "ja",
        english_name: "Japanese",
        name: "日本語",
    },
    {
        iso_639_1: "ng",
        english_name: "Ndonga",
        name: "",
    },
    {
        iso_639_1: "no",
        english_name: "Norwegian",
        name: "Norsk",
    },
    {
        iso_639_1: "pa",
        english_name: "Punjabi",
        name: "ਪੰਜਾਬੀ",
    },
    {
        iso_639_1: "sa",
        english_name: "Sanskrit",
        name: "",
    },
    {
        iso_639_1: "am",
        english_name: "Amharic",
        name: "",
    },
    {
        iso_639_1: "fa",
        english_name: "Persian",
        name: "فارسی",
    },
    {
        iso_639_1: "aa",
        english_name: "Afar",
        name: "",
    },
    {
        iso_639_1: "ae",
        english_name: "Avestan",
        name: "",
    },
    {
        iso_639_1: "br",
        english_name: "Breton",
        name: "",
    },
    {
        iso_639_1: "is",
        english_name: "Icelandic",
        name: "Íslenska",
    },
    {
        iso_639_1: "kk",
        english_name: "Kazakh",
        name: "қазақ",
    },
    {
        iso_639_1: "lt",
        english_name: "Lithuanian",
        name: "Lietuvių",
    },
    {
        iso_639_1: "mi",
        english_name: "Maori",
        name: "",
    },
    {
        iso_639_1: "ms",
        english_name: "Malay",
        name: "Bahasa melayu",
    },
    {
        iso_639_1: "or",
        english_name: "Oriya",
        name: "",
    },
    {
        iso_639_1: "st",
        english_name: "Sotho",
        name: "",
    },
    {
        iso_639_1: "tk",
        english_name: "Turkmen",
        name: "",
    },
    {
        iso_639_1: "af",
        english_name: "Afrikaans",
        name: "Afrikaans",
    },
    {
        iso_639_1: "bm",
        english_name: "Bambara",
        name: "Bamanankan",
    },
    {
        iso_639_1: "bs",
        english_name: "Bosnian",
        name: "Bosanski",
    },
    {
        iso_639_1: "cs",
        english_name: "Czech",
        name: "Český",
    },
    {
        iso_639_1: "ce",
        english_name: "Chechen",
        name: "",
    },
    {
        iso_639_1: "kv",
        english_name: "Komi",
        name: "",
    },
    {
        iso_639_1: "lb",
        english_name: "Letzeburgesch",
        name: "",
    },
    {
        iso_639_1: "nd",
        english_name: "Ndebele",
        name: "",
    },
    {
        iso_639_1: "sk",
        english_name: "Slovak",
        name: "Slovenčina",
    },
    {
        iso_639_1: "sm",
        english_name: "Samoan",
        name: "",
    },
    {
        iso_639_1: "tg",
        english_name: "Tajik",
        name: "",
    },
    {
        iso_639_1: "wo",
        english_name: "Wolof",
        name: "Wolof",
    },
    {
        iso_639_1: "yi",
        english_name: "Yiddish",
        name: "",
    },
    {
        iso_639_1: "be",
        english_name: "Belarusian",
        name: "беларуская мова",
    },
    {
        iso_639_1: "cv",
        english_name: "Chuvash",
        name: "",
    },
    {
        iso_639_1: "da",
        english_name: "Danish",
        name: "Dansk",
    },
    {
        iso_639_1: "en",
        english_name: "English",
        name: "English",
    },
    {
        iso_639_1: "kg",
        english_name: "Kongo",
        name: "",
    },
    {
        iso_639_1: "ku",
        english_name: "Kurdish",
        name: "",
    },
    {
        iso_639_1: "li",
        english_name: "Limburgish",
        name: "",
    },
    {
        iso_639_1: "lu",
        english_name: "Luba-Katanga",
        name: "",
    },
    {
        iso_639_1: "ml",
        english_name: "Malayalam",
        name: "",
    },
    {
        iso_639_1: "nn",
        english_name: "Norwegian Nynorsk",
        name: "",
    },
    {
        iso_639_1: "om",
        english_name: "Oromo",
        name: "",
    },
    {
        iso_639_1: "os",
        english_name: "Ossetian; Ossetic",
        name: "",
    },
    {
        iso_639_1: "sg",
        english_name: "Sango",
        name: "",
    },
    {
        iso_639_1: "es",
        english_name: "Spanish",
        name: "Español",
    },
    {
        iso_639_1: "sv",
        english_name: "Swedish",
        name: "svenska",
    },
    {
        iso_639_1: "te",
        english_name: "Telugu",
        name: "తెలుగు",
    },
    {
        iso_639_1: "tw",
        english_name: "Twi",
        name: "",
    },
    {
        iso_639_1: "uk",
        english_name: "Ukrainian",
        name: "Український",
    },
];

export async function getGenreDetailJSON() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + SECRET,
        },
    };

    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
    )
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export async function getGenreObjArray() {
    const genreObjectArray = await getGenreDetailJSON();
    const arr = [];

    for (const genre of genreObjectArray.genres) {
        arr.push(genre);
    }
    //console.log(arr)
    return arr;
}

//Input (String to match, Array of strings to find matches)
//Returns: Array of Strings that have been matched
export async function getMatchedGenreTitlesArray(inputString, arr) {
    const regexObj = RegExp(inputString, "i");
    const outputArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (regexObj.exec(arr[i].name) !== null) {
            outputArr.push(arr[i]);
        }
    }
    //console.log(outputArr)
    return outputArr;
}

//Array must have unique values of type number Only using for genre
export function removeNumberFromArray(number, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === number) {
            const outputArr = arr.toSpliced(i, 1);
            return outputArr;
        }
    }
    throw new Error("Number not found");
}

//List must have unique values. Returns index of string
export function getIndexFromArray(str, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === str) {
            return i;
        }
    }
    throw new Error("String not found");
}

//Returns arrary of objects like this {id: xxx, name: xxxx}
export async function getFirstTenCastNamesAndIdsFromQuery(query) {
    const outputArr = [];
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + SECRET,
        },
    };

    const resObj = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
        options
    )
        .then((res) => res.json())
        .catch((err) => console.error(err));

    let i = 0;
    for (const result of resObj.results) {
        if (i >= 10) {
            break;
        }
        outputArr.push({ id: result.id, name: result.name });
        i++;
    }
    //console.log(outputArr)
    return outputArr;
}

export function removeObjectFromArray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            const outputArr = arr.toSpliced(i, 1);
            return outputArr;
        }
    }
    throw new Error("Item does not exist in array");
}

export function objectExistsInArray(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return true;
        }
    }
    return false;
}

export function buildQuery(queryObject) {
    let query = "https://api.themoviedb.org/3/discover/movie?";
    for (const [key, value] of Object.entries(queryObject)) {
        query += `${key}=${value}&`;
    }
    query = query.slice(0, -1);
    return query;
}

//route.query.item will convert %2C to ,
export function getArrayFromQueryString(str) {
    if (str.includes(",")) {
        return str.split(",");
    } else if (str.includes("|")) {
        return str.split("|");
    } else {
        return str.split();
    }
}

export function getInclusionModeFromQueryString(str) {
    if (str.includes("%2C")) {
        return "AND";
    } else if (str.includes("%7C")) {
        return "OR";
    }
    return "AND";
}

export function createGenreObjectArrayFromTitleArray(inputArr, genreObjArr) {
    const outputArr = [];
    for (let i = 0; i < inputArr.length; i++) {
        for (let j = 0; j < genreObjArr.length; j++) {
            if (inputArr[i] === genreObjArr[j].name) {
                outputArr.push(genreObjArr[j]);
                break;
            }
        }
    }
    return outputArr;
}

export function createGenreDict(genreJSON) {
    const outputObj = {};
    for (const genre of genreJSON.genres) {
        const jsonID = genre.id;
        const name = genre.name;
        outputObj[jsonID] = name;
    }

    return outputObj;
}

export function createGenreObjectsFromIDList(idList, genreDict) {
    const outputArr = [];
    for (const id of idList) {
        const newObj = { id: id, name: genreDict[id] };
        outputArr.push(newObj);
    }
    return outputArr;
}

export async function getCastObjFromQueryString(str) {
    /*
        get an id array from the string
        then just query each id one by one 
    */
    const idArr = getArrayFromQueryString(str);
    const outputArr = [];
    for (const id of idArr) {
        const castObj = await fetch(
            `https://api.themoviedb.org/3/person/${id}?language=en-US`,
            options
        )
            .then((res) => res.json())
            .catch((err) => console.error(err));
        outputArr.push({ id: id, name: castObj.name });
    }
    console.log(outputArr);
    return outputArr;
}

export const createReleaseDateQuery = (queryObject) => {
    let queryString = "";

    //Handle release dates
    if (queryObject.releaseDateTab === "0" && queryObject.releaseDate) {
        queryString += "release_date_tab=0&";
        if (queryObject.releaseDate) {
            queryString += `release_date=${queryObject.releaseDate}&`;
        }
    } else if (
        queryObject.releaseDateTab === "1" &&
        (queryObject.releaseDateMin || queryObject.releaseDateMax)
    ) {
        queryString += "release_date_tab=1&";
        if (queryObject.releaseDateMin) {
            queryString += `release_date_min=${queryObject.releaseDateMin}&`;
        }
        if (queryObject.releaseDateMax) {
            queryString += `release_date_max=${queryObject.releaseDateMax}&`;
        }
    }

    return queryString;
};

export const createScoreQuery = (queryObject) => {
    let queryString = "";
    if (queryObject.score.min) {
        queryString += `score_min=${queryObject.score.min}&`;
    }
    if (queryObject.score.max) {
        queryString += `score_max=${queryObject.score.max}&`;
    }
    if (queryObject.vote.min) {
        queryString += `vote_min=${queryObject.vote.min}&`;
    }
    if (queryObject.vote.max) {
        queryString += `vote_max=${queryObject.vote.max}&`;
    }
    return queryString;
};

export const createGenreQuery = (queryObject) => {
    let queryString = "";
    //[{id: 21, name: 'Action'}, {id: 21, name: 'Adventure'}, ...] this is the format in queryobject
    if (queryObject.with_genres.length > 0) {
        queryString += "with_genres=";
        for (const item of queryObject.with_genres) {
            queryString += `${item.id},`;
        }
        queryString = queryString.substring(0, queryString.length - 1);
        queryString += "&";
    }
    return queryString;
};

export const createCastQuery = (queryObject) => {
    let queryString = "";
    //Format is [{id: 21, name: Matthew McConaughey}] in query object
    if (queryObject.with_cast.length > 0) {
        queryString += "with_cast=";
        for (const item of queryObject.with_cast) {
            queryString += `${item.id}:${item.name},`;
        }
        queryString = queryString.substring(0, queryString.length - 1);
        queryString += "&";
    }
    return queryString;
};

export const createSortQuery = (queryObject) => {
    let stringQuery = "";
    if (queryObject.sort_by) {
        stringQuery += "sort_by=";
        stringQuery += queryObject.sort_by;
        stringQuery += "&";
    }
    return stringQuery;
};

export const originalLanguageQuery = (queryObject) => {
    let stringQuery = "";
    if (queryObject.language !== null) {
        stringQuery += "with_original_language=";
        stringQuery += queryObject.language;
        stringQuery += "&";
    }
    return stringQuery;
};

export const createSearchCountQuery = (queryObject) => {
    return `search_count=${queryObject.searchCount}&`
}

export const createTMDBReleaseDateQuery = (
    releaseDateTab,
    releaseDate,
    releaseDateMin,
    releaseDateMax
) => {
    //All params are strings

    let queryString = "";

    if (releaseDateTab === "0") {
        if (releaseDate) {
            queryString += `primary_release_date.gte=${releaseDate}&primary_release_date.lte=${releaseDate}&`;
        }
    } else if (releaseDateTab === "1") {
        if (releaseDateMin) {
            queryString += `primary_release_date.gte=${releaseDateMin}&`;
        }
        if (releaseDateMax) {
            queryString += `primary_release_date.lte=${releaseDateMax}&`;
        }
    }
    return queryString;
};

export const createTMDBScoreQuery = (scoreMin, scoreMax, voteMin, voteMax) => {
    //Input is in either string or num format
    let queryString = "";
    if (scoreMin) {
        queryString += `vote_average.gte=${scoreMin}&`;
    }
    if (scoreMax) {
        queryString += `vote_average.lte=${scoreMax}&`;
    }
    if (voteMin) {
        queryString += `vote_count.gte=${voteMin}&`;
    }
    if (voteMax) {
        queryString += `vote_count.lte=${voteMax}&`;
    }

    return queryString;
};

export const createTMDBGenreQuery = (idList) => {
    //idList format: [{id: 21, name: Action}, {id: 32, name: Adventure}, ...]
    let queryString = "";

    if (idList.length > 0) {
        queryString += "with_genres=";
        for (const item of idList) {
            queryString += `${item.id},`;
        }
        queryString = queryString.substring(0, queryString.length - 1);
        queryString += "&";
    }

    //Id list is in this format 12,32,13,22
    return queryString;
};

export const createTMDBCastQuery = (castIDList) => {
    //castIDList format: [{id: 21, name: Adam}, {id: 32, name: Eve}, ...]
    let queryString = "";

    if (castIDList.length > 0) {
        queryString += "with_cast="
        for (const item of castIDList) {
            queryString += `${item.id},`;
        }
        queryString = queryString.substring(0, queryString.length - 1);
        queryString += "&";
    }

    return queryString;
};

export const createTMDBSortQuery = (sortOption) => {
    let queryString = `sort_by=popularity.desc&`;

    if (sortOption) {
        queryString = `sort_by=${sortOption}&`;
    }

    return queryString;
};

export const createTMDBPrimaryLanguageQuery = (languageOption) => {
    return `with_original_language=${languageOption}&`;
};

export const createPageQuery = (pageNum) => {
    return `page=${pageNum}&`
}

export const createTMDBQuery = (queryObject) => {
    let queryString = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&`;

    //Release Date Query
    queryString += createTMDBReleaseDateQuery(
        queryObject.releaseDateTab,
        queryObject.releaseDate,
        queryObject.releaseDateMin,
        queryObject.releaseDateMax
    );

    //Score Query
    queryString += createTMDBScoreQuery(
        queryObject.score.min,
        queryObject.score.max,
        queryObject.vote.min,
        queryObject.vote.max
    );

    //Genre Query
    queryString += createTMDBGenreQuery(queryObject.with_genres);

    //Cast Query
    queryString += createTMDBCastQuery(queryObject.with_cast);

    //Sort Query
    queryString += createTMDBSortQuery(queryObject.sort_by)

    //Primary Language Query
    queryString += createTMDBPrimaryLanguageQuery(queryObject.language)

    //Page Query
    queryString += createPageQuery(queryObject.page)

    queryString = queryString.substring(0, queryString.length - 1)


    return queryString
};


//Create query for internal use
export const createInternalQuery = (queryObject) => {
    let queryString = "/list/?"

    if (queryObject.searchMode === 'basic') {
        queryString += `search=${queryObject.searchToken}&`
        queryString += `mode=${queryObject.searchMode}&`
        queryString += `page=${queryObject.page}`
        return queryString
    }
    
    queryString += createReleaseDateQuery(queryObject)
    queryString += createScoreQuery(queryObject)
    queryString += createGenreQuery(queryObject)
    queryString += createCastQuery(queryObject)
    queryString += createSortQuery(queryObject)
    queryString += originalLanguageQuery(queryObject)
    queryString += createPageQuery(queryObject.page)
    queryString += createSearchCountQuery(queryObject)
    queryString += `mode=${queryObject.searchMode}&`
    queryString += `search=${queryObject.searchToken}&`
    
    queryString = queryString.substring(0, queryString.length - 1);
    return queryString
}

export const createInternalQueryAndPush = (router, queryObject) => {
    const internalQueryString = createInternalQuery(queryObject)
    router.push(internalQueryString)
}

export const 
createTMDBSearchQuery = (searchToken, page) => {
    const queryString = `https://api.themoviedb.org/3/search/movie?query=${searchToken}&include_adult=false&language=en-US&page=${page}`
    return queryString
}
