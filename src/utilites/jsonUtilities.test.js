// helpers.spec.js
import { getGenreDetailJSON, getGenreTitleArray, getIndexFromArray, getMatchedGenreTitlesArray, removeNumberFromArray } from './jsonUtilities'
import { describe, test, expect } from 'vitest'

describe('GenreDetailsSuite', async () => {

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

  test('Gets Genre detail object from TMDB', async () => {
    await expect(getGenreDetailJSON()).resolves.toEqual(expectedReturnValue)
  })

  const expectedArray = [
    'Action',          'Adventure',
    'Animation',       'Comedy',
    'Crime',           'Documentary',
    'Drama',           'Family',
    'Fantasy',         'History',
    'Horror',          'Music',
    'Mystery',         'Romance',
    'Science Fiction', 'TV Movie',
    'Thriller',        'War',
    'Western'
  ]

  test('Returns an array with all available genre titles', async () => {
    await expect(getGenreTitleArray()).resolves.toEqual(expectedArray)
  })

  const genreTitleArray = await getGenreTitleArray()

  test('Returns array of matched genres from Regex Ac', async () => {
    await expect(getMatchedGenreTitlesArray('Ac', genreTitleArray)).resolves.toEqual(['Action'])
  })

  test('Returns array of matched genres from Regex C', async () => {
    await expect(getMatchedGenreTitlesArray('C', genreTitleArray)).resolves.toEqual(["Action", "Comedy", "Crime", "Documentary", "Music", "Romance", "Science Fiction"])
  })

  test('Returns array of matched genres from Regex A', async () => {
    await expect(getMatchedGenreTitlesArray('A', genreTitleArray)).resolves.toEqual(["Action", "Adventure", "Animation", "Documentary", "Drama", "Family", "Fantasy", "Romance", "War"])
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

})