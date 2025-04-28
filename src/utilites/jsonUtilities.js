
const SECRET = import.meta.env.VITE_KEY


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

  export async function getGenreTitleArray() {
    const genreObjectArray = await getGenreDetailJSON()
    const arr = []

    for (const genre of genreObjectArray.genres)
    {
        arr.push(genre.name)
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
        if (regexObj.exec(arr[i]) !== null)
        {
            outputArr.push(arr[i])
        }
    }
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