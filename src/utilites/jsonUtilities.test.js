// helpers.spec.js
import { getFirstTenCastNamesAndIdsFromQuery, getGenreDetailJSON, getIndexFromArray, getMatchedGenreTitlesArray, removeNumberFromArray, removeObjectFromArray, objectExistsInArray, getGenreObjArray, buildQuery } from './jsonUtilities'
import { describe, test, expect } from 'vitest'

describe('GenreDetailsSuite', async () => {


  test('Get genreJSON object from TMDB', async () => {
    expect(getGenreDetailJSON()).resolves.toEqual({
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' }
      ]
    })
  })
  

  test('Gets Genre detail object from TMDB', async () => {
    const expectedReturnValue = {
      "genres": [
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
    }
    await expect(getGenreDetailJSON()).resolves.toEqual(expectedReturnValue)
  })


  const genreObjArray = await getGenreObjArray()

  test('Returns array of matched genres from Regex Ac', async () => {
    await expect(getMatchedGenreTitlesArray('Ac', genreObjArray)).resolves.toEqual([ { id: 28, name: 'Action' } ])
  })

  test('Returns array of matched genres from Regex C', async () => {
    await expect(getMatchedGenreTitlesArray('C', genreObjArray)).resolves.toEqual([
      { id: 28, name: 'Action' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 10402, name: 'Music' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' }
    ])
  })

  test('Returns array of matched genres from Regex A', async () => {
    await expect(getMatchedGenreTitlesArray('A', genreObjArray)).resolves.toEqual([
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 10749, name: 'Romance' },
      { id: 10752, name: 'War' }
    ])
  })

  test('Create a new array from input array with one number removed', () => {
    const arr = [1,2,3]
    expect(removeNumberFromArray(1, arr)).toEqual([2,3])
    expect(arr).toEqual([1,2,3])
  })

  test('Return index of string from array with unique values', () => {
    const arr = ["Bucket", "Pickaxe", "Water"]
    expect(getIndexFromArray("Water", arr)).toEqual(2)
  })





  test('Iterates over people in JSON object and returns list of names', async () => {
    expect(getFirstTenCastNamesAndIdsFromQuery('Leonardo')).resolves.toEqual([
      { id: 1424332, name: 'Leonardo' },
      { id: 1769109, name: 'Leonardo' },
      { id: 3756414, name: 'Leonardo' },
      { id: 3061590, name: 'Leonardo' },
      { id: 2408046, name: 'Leonardo' },
      { id: 5086742, name: 'Leonardo' },
      { id: 4718850, name: 'Leonardo' },
      { id: 5084355, name: 'Leonardo' },
      { id: 6193, name: 'Leonardo DiCaprio' },
      { id: 1281386, name: 'Leonardo Lima Carvalho' }
    ])

    const arr = await getFirstTenCastNamesAndIdsFromQuery('L') 

    expect(arr.length).toEqual(10)
  })






  test('Remove object from array', () => {
    const arr = [{id: 1, name: 'Masha'}, {id: 2, name: 'Lewis'}]
    expect(removeObjectFromArray(2, arr)).toEqual([{id: 1, name: 'Masha'}])
    expect(() => removeObjectFromArray(3, arr)).toThrowError(/^Item does not exist in array$/,)
  })


  test('Object exists in array', () => {
    const arr = [{id: 1, name: 'Masha'}, {id: 2, name: 'Lewis'}]
    expect(objectExistsInArray(2, arr)).toEqual(true)
    expect(objectExistsInArray(3, arr)).toEqual(false)
  })

  test('Create query from  query object', () => {
    const queryObject = {
      include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc'
    }

    expect(buildQuery(queryObject)).toEqual("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
  })

})