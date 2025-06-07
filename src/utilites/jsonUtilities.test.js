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
    createGenreObjectsFromIDList,
    createReleaseDateQuery,
    createScoreQuery,
    createGenreQuery,
    createCastQuery,
    createSortQuery,
    primaryLanguageQuery,
    createTMDBReleaseDateQuery,
    createTMDBScoreQuery,
    createTMDBGenreQuery,
    createTMDBSortQuery,
    createTMDBLanguageQuery,
    createTMDBCastQuery,
    createTMDBPrimaryLanguageQuery,
    createTMDBQuery,
    createPageQuery,
    createInternalQuery,
    originalLanguageQuery,
    createTMDBSearchQuery,
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

    // test("Iterates over people in JSON object and returns list of names", async () => {
    //     expect(
    //         getFirstTenCastNamesAndIdsFromQuery("Leonardo")
    //     ).resolves.toEqual([
    //         { id: 1424332, name: "Leonardo" },
    //         { id: 1769109, name: "Leonardo" },
    //         { id: 3756414, name: "Leonardo" },
    //         { id: 3061590, name: "Leonardo" },
    //         { id: 2408046, name: "Leonardo" },
    //         { id: 5086742, name: "Leonardo" },
    //         { id: 4718850, name: "Leonardo" },
    //         { id: 5084355, name: "Leonardo" },
    //         { id: 6193, name: "Leonardo DiCaprio" },
    //         { id: 1281386, name: "Leonardo Lima Carvalho" },
    //     ]);

    //     const arr = await getFirstTenCastNamesAndIdsFromQuery("L");

    //     expect(arr.length).toEqual(10);
    // });

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

    // test("Get array from genre query string", () => {
    //     const str1 = "Action%2CAdventure%2CComedy";
    //     const str2 = "Action%7CAdventure%7CComedy";
    //     const str3 = "Action";

    //     expect(getArrayFromQueryString(str1)).toEqual([
    //         "Action",
    //         "Adventure",
    //         "Comedy",
    //     ]);
    //     expect(getArrayFromQueryString(str2)).toEqual([
    //         "Action",
    //         "Adventure",
    //         "Comedy",
    //     ]);
    //     expect(getArrayFromQueryString(str3)).toEqual(["Action"]);
    // });

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
        const expectedArr = [
            { id: "10297", name: "Matthew McConaughey" },
            { id: "1813", name: "Anne Hathaway" },
            { id: "3895", name: "Michael Caine" },
            { id: "83002", name: "Jessica Chastain" },
        ];
        const inputStr = "10297,1813,3895,83002";
        expect(getCastObjFromQueryString(inputStr)).resolves.toEqual(
            expectedArr
        );
    });

    test("Create genreDict from genreJSON", async () => {
        const genreJSON = await getGenreDetailJSON();
        const expectedObj = {
            12: "Adventure",
            14: "Fantasy",
            16: "Animation",
            18: "Drama",
            27: "Horror",
            28: "Action",
            35: "Comedy",
            36: "History",
            37: "Western",
            53: "Thriller",
            80: "Crime",
            99: "Documentary",
            878: "Science Fiction",
            9648: "Mystery",
            10402: "Music",
            10749: "Romance",
            10751: "Family",
            10752: "War",
            10770: "TV Movie",
        };
        expect(createGenreDict(genreJSON)).toEqual(expectedObj);
    });

    test("Create array of genreObjects from idList", async () => {
        const genreJSON = await getGenreDetailJSON();
        const genreDict = createGenreDict(genreJSON);
        const idList = [28, 12, 35, 10751];
        const expected = [
            { id: 28, name: "Action" },
            { id: 12, name: "Adventure" },
            { id: 35, name: "Comedy" },
            { id: 10751, name: "Family" },
        ];
        expect(createGenreObjectsFromIDList(idList, genreDict)).toEqual(
            expected
        );
    });

    test("Check correct release query", () => {
        const queryObject = {};
        queryObject.releaseDateTab = "0";

        //Release date 1995-12-17 first tab
        queryObject.releaseDate = new Date("1995-12-17T03:24:00")
            .toISOString()
            .slice(0, 10);
        expect(createReleaseDateQuery(queryObject)).toEqual(
            "release_date_tab=0&release_date=1995-12-17&"
        );

        //Release date null and first tab
        queryObject.releaseDate = null;
        expect(createReleaseDateQuery(queryObject)).toEqual(
            "release_date_tab=0&"
        );

        //Release date min null and second tab and release date max 1995-12-17
        queryObject.releaseDateTab = "1";
        queryObject.releaseDateMax = new Date(
            "1995-12-17T03:24:00"
        ).toISOString.slice(0, 10);
        expect(createReleaseDateQuery(queryObject)).toEqual(
            "release_date_tab=1&release_date_max=1995-12-17&"
        );
    });

    test("Check correct release query", () => {
        const queryObject = {};
        queryObject.score = { min: null, max: null };
        queryObject.vote = { min: null, max: null };

        //Empty values
        expect(createScoreQuery(queryObject)).toEqual("");

        //Vote max and score min contains values
        queryObject.score.min = 7;
        queryObject.vote.max = 3000;
        expect(createScoreQuery(queryObject)).toEqual(
            "score_min=7&vote_max=3000&"
        );
    });

    test("Check correct genre query", () => {
        const queryObject = {};
        queryObject.with_genres = [];

        //Empty values
        expect(createGenreQuery(queryObject)).toEqual("");

        //Multiple Genres
        queryObject.with_genres = [
            {
                id: 99,
                name: "Documentary",
            },
            {
                id: 18,
                name: "Drama",
            },
        ];
        expect(createGenreQuery(queryObject)).toEqual("with_genres=99,18&");
    });

    test("Check correct cast query", () => {
        const queryObject = {};
        queryObject.with_cast = [];

        //Empty values
        expect(createCastQuery(queryObject)).toEqual("");

        //Multiple Genres
        queryObject.with_cast = [
            {
                id: 21,
                name: "Debbie",
            },
            {
                id: 18,
                name: "Leo",
            },
        ];
        expect(createCastQuery(queryObject)).toEqual(
            "with_cast=21:Debbie,18:Leo&"
        );
    });

    test("Check correct sort_by query", () => {
        const queryObject = {};
        queryObject.sort_by = "popularity.desc";

        expect(createSortQuery(queryObject)).toEqual(
            "sort_by=popularity.desc&"
        );
    });

    test("Check correct language query", () => {
        const queryObject = {};
        queryObject.language = "ja";

        expect(originalLanguageQuery(queryObject)).toEqual(
            "with_original_language=ja&"
        );
    });

    test("Check TMDB releaseDateQuery", () => {
        let releaseDateTab = "0";
        const releaseDate = "2025-03-28";
        let releaseDateMin = undefined;
        let releaseDateMax = undefined;

        expect(
            createTMDBReleaseDateQuery(
                releaseDateTab,
                releaseDate,
                releaseDateMin,
                releaseDateMax
            )
        ).toEqual(
            `primary_release_date.gte=${releaseDate}&primary_release_date.lte=${releaseDate}&`
        );

        releaseDateMin = "2025-03-21";
        releaseDateMax = "2025-01-21";

        expect(
            createTMDBReleaseDateQuery(
                releaseDateTab,
                releaseDate,
                releaseDateMin,
                releaseDateMax
            )
        ).toEqual(
            `primary_release_date.gte=${releaseDate}&primary_release_date.lte=${releaseDate}&`
        );

        releaseDateTab = "1";
        expect(
            createTMDBReleaseDateQuery(
                releaseDateTab,
                releaseDate,
                releaseDateMin,
                releaseDateMax
            )
        ).toEqual(
            `primary_release_date.gte=${releaseDateMin}&primary_release_date.lte=${releaseDateMax}&`
        );
    });

    test("Check TMDB scoreQuery", () => {
        let scoreMin = 3;
        let scoreMax = 7;
        let voteMin = 3;
        let voteMax = 12;

        expect(
            createTMDBScoreQuery(scoreMin, scoreMax, undefined, undefined)
        ).toEqual(`vote_average.gte=3&vote_average.lte=7&`);

        expect(
            createTMDBScoreQuery(scoreMin, scoreMax, voteMin, undefined)
        ).toEqual(`vote_average.gte=3&vote_average.lte=7&vote_count.gte=3&`);
    });

    test("Check TMDB genreQuery", () => {
        let idList = [
            { id: 1, name: "Action" },
            { id: 2, name: "Adventure" },
        ];

        expect(createTMDBGenreQuery(idList)).toEqual(`with_genres=1,2&`);
    });

    test("Check TMDB castQuery", () => {
        let idList = [
            { id: 1, name: "Adam" },
            { id: 2, name: "Eve" },
        ];

        expect(createTMDBCastQuery(idList)).toEqual(`with_cast=1,2&`);
    });

    test("Check TMDB sortQuery", () => {
        let sortOption = "popularity.asc";

        expect(createTMDBSortQuery(sortOption)).toEqual(
            `sort_by=${sortOption}&`
        );
    });

    test("Check TMDB primary language query", () => {
        let languageOption = "ja";

        expect(createTMDBPrimaryLanguageQuery(languageOption)).toEqual(
            `with_original_language=${languageOption}&`
        );
    });

    test("Check TMDB Page query", () => {
        expect(createPageQuery(3)).toEqual(`page=3&`);
    });

    test("TMDB query generator", () => {
        const queryObject = {
            include_adult: false,
            include_video: false,
            page: 1,
            language: "ja",
            sort_by: "vote_count.asc",
            with_genres: [
                {
                    id: 16,
                    name: "Animation",
                },
                {
                    id: 12,
                    name: "Adventure",
                },
            ],
            with_cast: [
                {
                    id: 10297,
                    name: "Matthew McConaughey",
                },
            ],
            releaseDateTab: "0",
            releaseDate: "2015-12-01",
            releaseDateMin: null,
            releaseDateMax: null,
            score: {
                min: 2,
                max: 5,
            },
            vote: {
                min: null,
                max: null,
            },
        };

        expect(createTMDBQuery(queryObject)).toEqual(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=${queryObject.releaseDate}&primary_release_date.lte=${queryObject.releaseDate}&vote_average.gte=${queryObject.score.min}&vote_average.lte=${queryObject.score.max}&with_genres=${queryObject.with_genres[0].id},${queryObject.with_genres[1].id}&with_cast=${queryObject.with_cast[0].id}&sort_by=${queryObject.sort_by}&with_original_language=${queryObject.language}&page=${queryObject.page}`
        );
    });

    test("Internal query generator", () => {
        const queryObject = {
            include_adult: false,
            include_video: false,
            searchCount: 1,
            page: 1,
            language: "ja",
            sort_by: "vote_count.asc",
            with_genres: [
                {
                    id: 16,
                    name: "Animation",
                },
                {
                    id: 12,
                    name: "Adventure",
                },
            ],
            with_cast: [
                {
                    id: 10297,
                    name: "Matthew McConaughey",
                },
            ],
            releaseDateTab: "0",
            releaseDate: "2015-12-01",
            releaseDateMin: null,
            releaseDateMax: null,
            score: {
                min: 2,
                max: 5,
            },
            vote: {
                min: null,
                max: null,
            },
        };

        expect(createInternalQuery(queryObject)).toEqual(
            `/list/?release_date_tab=0&release_date=${queryObject.releaseDate}&score_min=${queryObject.score.min}&score_max=${queryObject.score.max}&with_genres=${queryObject.with_genres[0].id},${queryObject.with_genres[1].id}&with_cast=${queryObject.with_cast[0].id}:${queryObject.with_cast[0].name}&sort_by=${queryObject.sort_by}&with_original_language=${queryObject.language}&page=${queryObject.page}&search_count=${queryObject.searchCount}`
        );

        queryObject.searchMode = "basic";
        queryObject.searchToken = "Titanic";

        expect(createInternalQuery(queryObject)).toEqual(
            `/list/?search=${queryObject.searchToken}&mode=${queryObject.searchMode}&page=${queryObject.page}`
        );
    });

    test("Create search query string", () => {
        const queryObject = {
            include_adult: false,
            include_video: false,
            searchCount: 1,
            page: 1,
            language: "ja",
            sort_by: "vote_count.asc",
            with_genres: [
                {
                    id: 16,
                    name: "Animation",
                },
                {
                    id: 12,
                    name: "Adventure",
                },
            ],
            with_cast: [
                {
                    id: 10297,
                    name: "Matthew McConaughey",
                },
            ],
            releaseDateTab: "0",
            releaseDate: "2015-12-01",
            releaseDateMin: null,
            releaseDateMax: null,
            score: {
                min: 2,
                max: 5,
            },
            vote: {
                min: null,
                max: null,
            },
        };
        queryObject.searchMode = "basic";
        queryObject.searchToken = "Titanic";

        expect(createTMDBSearchQuery(queryObject.searchToken, 1)).toEqual(
            `https://api.themoviedb.org/3/search/movie?query=${queryObject.searchToken}&include_adult=false&language=en-US&page=${queryObject.page}`
        );
    });
});
