
export const SECRET = import.meta.env.VITE_KEY

const sortOptionsArr = ["original_title.asc", "original_title.desc", "popularity.asc", "popularity.desc", "revenue.asc", "revenue.desc", "primary_release_date.asc", "title.asc", "title.desc", "primary_release_date.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"]


export async function getGenreDetailJSON() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + SECRET
        }
      };
      
      return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(res => res.json())
        .catch(err => console.error(err));
  }

  export async function getGenreObjArray() {
    const genreObjectArray = await getGenreDetailJSON()
    const arr = []

    for (const genre of genreObjectArray.genres)
    {
        arr.push(genre)
    }
    //console.log(arr)
    return arr
  }

  //Input (String to match, Array of strings to find matches)
  //Returns: Array of Strings that have been matched
  export async function getMatchedGenreTitlesArray(inputString, arr) {
    const regexObj = RegExp(inputString, "i")
    const outputArr = []
    for (let i = 0; i < arr.length; i++)
    {
        if (regexObj.exec(arr[i].name) !== null)
        {
            outputArr.push(arr[i])
        }
    }
    //console.log(outputArr)
    return outputArr
  }

  //Array must have unique values of type number Only using for genre
  export function removeNumberFromArray(number, arr)
  {
    
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] === number)
        {
            const outputArr = arr.toSpliced(i, 1)
            return outputArr
        }
    }
    throw new Error("Number not found")
  }
  
  //List must have unique values. Returns index of string
  export function getIndexFromArray(str, arr)
  {
    
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] === str)
        {
            return i
        }
    }
    throw new Error("String not found")
  }

  //Returns arrary of objects like this {id: xxx, name: xxxx}
  export async function getFirstTenCastNamesAndIdsFromQuery(query)
  {
    const outputArr = []
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + SECRET
        }
      };
      
      
          const resObj = await fetch(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .catch(err => console.error(err));


        let i = 0
        for (const result of resObj.results)
        {
            if (i >= 10)
            {
                break
            }
            outputArr.push({id: result.id, name: result.name})
            i++;
        }
        //console.log(outputArr)
        return outputArr
  }

  export function removeObjectFromArray(id, arr)
  {
    for (let i = 0; i < arr.length; i++)
    {
        if(arr[i].id === id)
        {
            const outputArr = arr.toSpliced(i, 1)
            return outputArr
        }
    }
    throw new Error("Item does not exist in array")
  }

  export function objectExistsInArray(id, arr)
  {
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i].id === id)
        {
            return true
        }
    }
    return false
  }