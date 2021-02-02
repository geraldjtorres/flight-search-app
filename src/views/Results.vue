<template>
  <div class="Results">
    <header>
      <div class="header-text">
        <div class="header-text__back">
          <router-link :to="{ name: 'Search' }">
            <i class="pi pi-arrow-left"></i>
          </router-link>
          <h1>Search Results</h1>
        </div>

        <div class="airport-codes">
          <p v-if="flightData">
            {{ route.params.origin.replace('-sky', '') }}
          </p>
          <p>
            {{ route.params.destination.replace('-sky', '') }}
          </p>
        </div>
      </div>
    </header>
    <div v-if="flightData" class="results-list">
      <div v-for="flight in flightData" :key="flight.quoteId">
        <FlightCard :flight="flight" />
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import getRoutes from '../composables/getRoutes'
import Spinner from '../components/Spinner'
import FlightCard from '../components/FlightCard'

export default {
  components: { Spinner, FlightCard },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { flightData, error, load } = getRoutes()
    const cheapFlight = ref(null)
    const searchQuery = { ...route.params }

    console.log(cheapFlight)

    load(searchQuery)

    // Check if we have data from search page, or else redirect back to search
    if (
      route.params.origin &&
      route.params.destination &&
      route.params.departureDate
    ) {
      console.log(route.params)
      load(searchQuery)
    } else {
      router.push({ name: 'Search' })
    }

    console.log('Results component', flightData.value)
    return { flightData, route }
  }
}
</script>

<style>
.Results > header > .header-text {
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
}
.airport-codes {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.airport-codes > p {
  color: white;
  font-weight: bold;
  font-size: 24px;
}

.results-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header-text__back {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-text__back .pi {
  margin-right: 20px;
}
.header-text__back h1,
.header-text__back .pi {
  color: white;
}
</style>
