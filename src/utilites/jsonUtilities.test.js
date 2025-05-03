// helpers.spec.js
import {
    getFirstTenCastNamesAndIdsFromQuery,
    getGenreDetailJSON,
    getIndexFromArray,
    getMatchedGenreTitlesArray,
    removeNumberFromArray,
    removeObjectFromArray,
    objectExistsInArray,
    getGenreObjArray,
    buildQuery,
    getArrayFromQueryString,
    getInclusionModeFromQueryString,
    createGenreObjectArrayFromTitleArray,
    getCastObjFromQueryString,
    createGenreDict,
    createGenreObjectsFromIDList
} from "./jsonUtilities";
import { describe, test, expect } from "vitest";

describe("GenreDetailsSuite", async () => {
    test("Get genreJSON object from TMDB", async () => {
        expect(getGenreDetailJSON()).resolves.toEqual({
            genres: [
                { id: 28, name: "Action" },
                { id: 12, name: "Adventure" },
                { id: 16, name: "Animation" },
                { id: 35, name: "Comedy" },
                { id: 80, name: "Crime" },
                { id: 99, name: "Documentary" },
                { id: 18, name: "Drama" },
                { id: 10751, name: "Family" },
                { id: 14, name: "Fantasy" },
                { id: 36, name: "History" },
                { id: 27, name: "Horror" },
                { id: 10402, name: "Music" },
                { id: 9648, name: "Mystery" },
                { id: 10749, name: "Romance" },
                { id: 878, name: "Science Fiction" },
                { id: 10770, name: "TV Movie" },
                { id: 53, name: "Thriller" },
                { id: 10752, name: "War" },
                { id: 37, name: "Western" },
            ],
        });
    });

    test("Gets Genre detail object from TMDB", async () => {
        const expectedReturnValue = {
            genres: [
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
            ],
        };
        await expect(getGenreDetailJSON()).resolves.toEqual(
            expectedReturnValue
        );
    });

    const genreObjArray = await getGenreObjArray();

    test("Returns array of matched genres from Regex Ac", async () => {
        await expect(
            getMatchedGenreTitlesArray("Ac", genreObjArray)
        ).resolves.toEqual([{ id: 28, name: "Action" }]);
    });

    test("Returns array of matched genres from Regex C", async () => {
        await expect(
            getMatchedGenreTitlesArray("C", genreObjArray)
        ).resolves.toEqual([
            { id: 28, name: "Action" },
            { id: 35, name: "Comedy" },
            { id: 80, name: "Crime" },
            { id: 99, name: "Documentary" },
            { id: 10402, name: "Music" },
            { id: 10749, name: "Romance" },
            { id: 878, name: "Science Fiction" },
        ]);
    });

    test("Returns array of matched genres from Regex A", async () => {
        await expect(
            getMatchedGenreTitlesArray("A", genreObjArray)
        ).resolves.toEqual([
            { id: 28, name: "Action" },
            { id: 12, name: "Adventure" },
            { id: 16, name: "Animation" },
            { id: 99, name: "Documentary" },
            { id: 18, name: "Drama" },
            { id: 10751, name: "Family" },
            { id: 14, name: "Fantasy" },
            { id: 10749, name: "Romance" },
            { id: 10752, name: "War" },
        ]);
    });

    test("Create a new array from input array with one number removed", () => {
        const arr = [1, 2, 3];
        expect(removeNumberFromArray(1, arr)).toEqual([2, 3]);
        expect(arr).toEqual([1, 2, 3]);
    });

    test("Return index of string from array with unique values", () => {
        const arr = ["Bucket", "Pickaxe", "Water"];
        expect(getIndexFromArray("Water", arr)).toEqual(2);
    });

    test("Iterates over people in JSON object and returns list of names", async () => {
        expect(
            getFirstTenCastNamesAndIdsFromQuery("Leonardo")
        ).resolves.toEqual([
            { id: 1424332, name: "Leonardo" },
            { id: 1769109, name: "Leonardo" },
            { id: 3756414, name: "Leonardo" },
            { id: 3061590, name: "Leonardo" },
            { id: 2408046, name: "Leonardo" },
            { id: 5086742, name: "Leonardo" },
            { id: 4718850, name: "Leonardo" },
            { id: 5084355, name: "Leonardo" },
            { id: 6193, name: "Leonardo DiCaprio" },
            { id: 1281386, name: "Leonardo Lima Carvalho" },
        ]);

        const arr = await getFirstTenCastNamesAndIdsFromQuery("L");

        expect(arr.length).toEqual(10);
    });

    test("Remove object from array", () => {
        const arr = [
            { id: 1, name: "Masha" },
            { id: 2, name: "Lewis" },
        ];
        expect(removeObjectFromArray(2, arr)).toEqual([
            { id: 1, name: "Masha" },
        ]);
        expect(() => removeObjectFromArray(3, arr)).toThrowError(
            /^Item does not exist in array$/
        );
    });

    test("Object exists in array", () => {
        const arr = [
            { id: 1, name: "Masha" },
            { id: 2, name: "Lewis" },
        ];
        expect(objectExistsInArray(2, arr)).toEqual(true);
        expect(objectExistsInArray(3, arr)).toEqual(false);
    });

    test("Create query from  query object", () => {
        const queryObject = {
            include_adult: false,
            include_video: false,
            language: "en-US",
            page: 1,
            sort_by: "popularity.desc",
        };

        expect(buildQuery(queryObject)).toEqual(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
        );
    });

    test("Get array from genre query string", () => {
        const str1 = "Action%2CAdventure%2CComedy";
        const str2 = "Action%7CAdventure%7CComedy";
        const str3 = "Action";

        expect(getArrayFromQueryString(str1)).toEqual([
            "Action",
            "Adventure",
            "Comedy",
        ]);
        expect(getArrayFromQueryString(str2)).toEqual([
            "Action",
            "Adventure",
            "Comedy",
        ]);
        expect(getArrayFromQueryString(str3)).toEqual(["Action"]);
    });

    test("Get inclusion mode from genre query string", () => {
        const str1 = "Action%2CAdventure%2CComedy";
        const str2 = "Action%7CAdventure%7CComedy";
        const str3 = "Action";

        expect(getInclusionModeFromQueryString(str1)).toEqual("AND");
        expect(getInclusionModeFromQueryString(str2)).toEqual("OR");
        expect(getInclusionModeFromQueryString(str3)).toEqual("AND");
    });

    test("Get genreObjArr from genreTitleArr", () => {
        const genreTitleArr = ["Action", "Adventure", "Comedy"];
        const genreObjArr = [
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

        expect(
            createGenreObjectArrayFromTitleArray(genreTitleArr, genreObjArr)
        ).toEqual([
            {
                id: 28,
                name: "Action",
            },
            {
                id: 12,
                name: "Adventure",
            },
            {
                id: 35,
                name: "Comedy",
            },
        ]);
    });

    test("Get cast data from cast id", async () => {
      const expectedArr = [{id: '10297', name: 'Matthew McConaughey'}, {id: '1813', name: 'Anne Hathaway'}, {id: '3895', name: 'Michael Caine'}, {id: '83002', name: 'Jessica Chastain'}]
      const inputStr = '10297,1813,3895,83002'
      expect(getCastObjFromQueryString(inputStr)).resolves.toEqual(expectedArr)
    });


    test('Create genreDict from genreJSON', async () => {
      const genreJSON = await getGenreDetailJSON()
      const expectedObj = {
        '12': 'Adventure',
        '14': 'Fantasy',
        '16': 'Animation',
        '18': 'Drama',
        '27': 'Horror',
        '28': 'Action',
        '35': 'Comedy',
        '36': 'History',
        '37': 'Western',
        '53': 'Thriller',
        '80': 'Crime',
        '99': 'Documentary',
        '878': 'Science Fiction',
        '9648': 'Mystery',
        '10402': 'Music',
        '10749': 'Romance',
        '10751': 'Family',
        '10752': 'War',
        '10770': 'TV Movie'
      }
      expect(createGenreDict(genreJSON)).toEqual(expectedObj)
    })


    test('Create array of genreObjects from idList', async () => {
      const genreJSON = await getGenreDetailJSON()
      const genreDict = createGenreDict(genreJSON)
      const idList = [28, 12, 35, 10751]
      const expected = [{id: 28, name: 'Action'}, {id: 12, name: 'Adventure'}, {id: 35, name: 'Comedy'}, {id: 10751, name: 'Family'}]
      expect(createGenreObjectsFromIDList(idList, genreDict)).toEqual(expected)
    })
});
