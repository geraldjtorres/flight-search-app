<template>
  <div class="search">
    <header>
      <h1>Book your flight</h1>
    </header>
    <section>
      <form @submit.prevent="handleSubmit">
        <div class="input-countries">
          <div class="form-group">
            <h5>From</h5>
            <SearchCountry
              inputCountry="origin"
              placeholder="Dubai, UAE"
              @countryUpdated="countrySelected"
            />
          </div>

          <div class="form-group">
            <h5>To</h5>
            <SearchCountry
              inputCountry="destination"
              placeholder="London, UK"
              @countryUpdated="countrySelected"
            />
          </div>
        </div>

        <div class="input-dates">
          <div class="form-group">
            <h5>Departure</h5>
            <Calendar
              v-model="departureDate"
              @date-select="dateSelected($event, 'departureDate')"
              :minDate="nowDate"
            />
          </div>

          <div class="form-group">
            <h5>Return Date (optional)</h5>
            <Calendar
              v-model="returnDate"
              @date-select="dateSelected($event, 'returnDate')"
              :minDate="nowDate"
            />
          </div>
        </div>

        <p v-if="formError" class="error-msg">Please fill in required fields</p>

        <!-- <FlightCard /> -->

        <div class="submit">
          <div v-if="isLoading">
            <Spinner />
          </div>
          <div v-else>
            <Button
              label="Search Flights"
              class="search-flight"
              type="submit"
            />
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import SearchCountry from '../components/SearchCountry'
import FlightCard from '../components/FlightCard'
import Spinner from '../components/Spinner'
import moment from 'moment'
import { useRouter } from 'vue-router'

export default {
  components: {
    AutoComplete,
    SearchCountry,
    Calendar,
    Button,
    Spinner,
    FlightCard
  },
  setup() {
    const formData = ref({})
    const departureDate = ref(null)
    const returnDate = ref(null)
    const nowDate = ref(new Date())
    const isLoading = ref(false)
    const formError = ref(false)
    const router = useRouter()
    const countrySelected = params => {
      formData.value = {
        ...formData.value,
        [params.inputCountry]: params.countryObject.PlaceId
      }
    }

    const dateSelected = (e, dateType) => {
      formData.value = {
        ...formData.value,
        [dateType]: moment(e).format('YYYY-MM-DD')
      }
      console.log('formdata', formData.value)
    }

    const handleSubmit = async () => {
      // Validate dataform

      isLoading.value = true

      if (
        formData.value.origin &&
        formData.value.destination &&
        formData.value.departureDate
      ) {
        setTimeout(() => {
          console.log('blah')
          formError.value = false
          isLoading.value = false

          router.push({ name: 'Results', params: { ...formData.value } })
        }, 2000)
      } else {
        formError.value = false
      }
    }

    return {
      countrySelected,
      departureDate,
      returnDate,
      dateSelected,
      nowDate,
      handleSubmit,
      isLoading,
      formError
    }
  }
}
</script>

<style>
header {
  height: 200px;
  background-color: #5f67ec;
  position: relative;
  padding: 20px;
  /* border-bottom-left-radius: 60px; */
}

header > h1 {
  color: white;
  font-size: 45px;
}
form {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

form > .p-button {
  width: 100%;
}

.submit {
  margin-top: 68px;
}

.p-button.search-flight {
  background-color: rgb(250, 144, 86);
  border: 1px solid rgb(250, 144, 86);
  padding: 20px;
  font-weight: bold;
  border-radius: 20px;
  width: 100%;
}

.input-countries {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-top: 20px;
}

.form-group > h5 {
  margin-bottom: 4px;
}

.p-calendar,
.p-calendar > .p-inputtext {
  width: 100%;
}
.p-calendar .p-inputtext {
  padding: 16px;
  font-weight: bold;
}

.error-msg {
  color: crimson;
}
</style>
