import { ref } from 'vue'

const getRoutes = () => {
  const flightRoutes = ref([])
  const error = ref(null)
  const flightData = ref([])

  const load = async ({ origin, destination, departureDate, returnDate }) => {
    const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/GB/AED/en-GB/${origin}/${destination}/${departureDate}${
      returnDate ? '?inboundpartialdate=' + returnDate : ''
    }`

    const config = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '037d8f3013msh742fd2ee52ca7b7p13be21jsn14711b1a1d0e',
        'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    }

    try {
      let data = await fetch(url, config)

      flightRoutes.value = await data.json()

      for (let i = 0; i < flightRoutes.value.Quotes.length; i++) {
        flightData.value[i] = {
          carrier: flightRoutes.value.Carriers[i].Name,
          direct: flightRoutes.value.Quotes[i].Direct
            ? 'Direct'
            : 'Multi-flight',
          departure: flightRoutes.value.Quotes[i].OutboundLeg.DepartureDate,
          price: flightRoutes.value.Quotes[i].MinPrice,
          quoteId: flightRoutes.value.Quotes[i].QuoteId,

          originCode: flightRoutes.value.Places.find(
            x => x.PlaceId === flightRoutes.value.Quotes[i].OutboundLeg.OriginId
          ).SkyscannerCode,

          destinationCode: flightRoutes.value.Places.find(
            x =>
              x.PlaceId ===
              flightRoutes.value.Quotes[i].OutboundLeg.DestinationId
          ).SkyscannerCode,

          originCity: flightRoutes.value.Places.find(
            x => x.PlaceId === flightRoutes.value.Quotes[i].OutboundLeg.OriginId
          ).CityName,

          destinationCity: flightRoutes.value.Places.find(
            x =>
              x.PlaceId ===
              flightRoutes.value.Quotes[i].OutboundLeg.DestinationId
          ).CityName
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return { flightData, error, load }
}

export default getRoutes
