<template>
  <AutoComplete
    v-model="selectedCountry"
    :suggestions="countries.Places"
    :placeholder="placeholder"
    @complete="searchCountry($event)"
    @item-select="countryClicked($event)"
    field="name"
    class="input-country"
  >
    <template #item="slotProps">
      <div>
        <p>{{ slotProps.item.PlaceName }} , {{ slotProps.item.CountryName }}</p>
        <p></p>
      </div>
    </template>
  </AutoComplete>
</template>

<script>
import AutoComplete from 'primevue/autocomplete'
import getCountries from '../composables/getCountries'
import { ref } from 'vue'

export default {
  components: { AutoComplete },
  props: ['inputCountry'],
  setup(props, { emit }) {
    const selectedCountry = ref('')
    const placeholder = ref(props.placeholder)
    const countryObject = ref(null)
    const { countries, error, load } = getCountries()

    const searchCountry = e => {
      load(e.query)
    }

    const countryClicked = e => {
      selectedCountry.value = `(${e.value.PlaceId.replace('-sky', '')}), ${
        e.value.PlaceName
      }`
      countryObject.value = e.value
      emit('countryUpdated', {
        inputCountry: props.inputCountry,
        countryObject: countryObject.value
      })
    }

    return {
      countries,
      searchCountry,
      selectedCountry,
      countryClicked,
      error,
      placeholder
    }
  }
}
</script>

<style>
.input-country.p-autocomplete,
.input-country > .p-autocomplete-input {
  width: 100%;
}
.input-country > .p-autocomplete-input {
  padding: 16px;
  font-weight: bold;
}

.input-country > .p-autocomplete-input::placeholder {
  color: #dbdbdb;
}

.p-autocomplete .p-autocomplete-panel {
  min-width: 100%;
  width: 100%;
}
</style>
