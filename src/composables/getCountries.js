import { ref } from 'vue'

const getCountries = () => {
  const countries = ref([])
  const error = ref(null)
  const load = async queryString => {
    try {
      let data = await fetch(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/AE/AED/en-GB/?query=${queryString}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '037d8f3013msh742fd2ee52ca7b7p13be21jsn14711b1a1d0e',
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
          }
        }
      )

      countries.value = await data.json()
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { countries, error, load }
}

export default getCountries
