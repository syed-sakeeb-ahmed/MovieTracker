export const SECRET = import.meta.env.VITE_KEY;

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
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  export const genresDict = {
    28: {
      "id": 28,
      "name": "Action"
    },
    12: {
      "id": 12,
      "name": "Adventure"
    },
    16: {
      "id": 16,
      "name": "Animation"
    },
    35: {
      "id": 35,
      "name": "Comedy"
    },
    80: {
      "id": 80,
      "name": "Crime"
    },
    99: {
      "id": 99,
      "name": "Documentary"
    },
    18: {
      "id": 18,
      "name": "Drama"
    },
    10751: {
      "id": 10751,
      "name": "Family"
    },
    14: {
      "id": 14,
      "name": "Fantasy"
    },
    36: {
      "id": 36,
      "name": "History"
    },
    27: {
      "id": 27,
      "name": "Horror"
    },
    10402: {
      "id": 10402,
      "name": "Music"
    },
    9648: {
      "id": 9648,
      "name": "Mystery"
    },
    10749: {
      "id": 10749,
      "name": "Romance"
    },
    878: {
      "id": 878,
      "name": "Science Fiction"
    },
    10770: {
      "id": 10770,
      "name": "TV Movie"
    },
    53: {
      "id": 53,
      "name": "Thriller"
    },
    10752: {
      "id": 10752,
      "name": "War"
    },
    37: {
      "id": 37,
      "name": "Western"
    }
}


  

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
