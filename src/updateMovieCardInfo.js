// fetch.js
import { ref } from 'vue'

async function updateMovieCardInfo(url, object) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( object )  
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
    .then(resData => {return resData})
    .catch((err) => (console.log(err)))
}

export async function postUpdate(url, object) {
  const data = ref(null)
  const error = ref(null)

  data.value = await updateMovieCardInfo(url, object);

  return { data}
}





