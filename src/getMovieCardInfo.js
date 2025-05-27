// fetch.js
import { ref } from 'vue'


async function fetchData(url) {
    const options = {
        method: 'GET',  
    };
    
      return fetch(url, options)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                return null;
            }
        })
        .then(resData =>{ return resData})
        .catch((err) => (console.log(err)))
}


export async function getMovieCardInfo(url) {
  const data = ref(null)

  data.value = await fetchData(url)
  
    return { data }
}





