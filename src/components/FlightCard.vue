<template>
  <div class="flight-card">
    <div class="places">
      <p>
        {{ flight.originCode }} <span>{{ flight.originCity }}</span>
      </p>
      <p>
        {{ flight.destinationCode }}
        <span>{{ flight.destinationCity }}</span>
      </p>

      <img src="../assets/takeoff-the-plane.svg" />
    </div>
    <div class="date-time">
      <p>
        {{ departDate }}
      </p>
      <p class="flight-type">{{ flight.direct }}</p>
    </div>

    <div class="price">
      <p>{{ flight.carrier }}</p>
      <p>AED {{ flight.price }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import moment from 'moment'

export default {
  props: ['flight'],
  setup(props) {
    const flight = ref(props.flight)
    const departDate = moment(flight.departure).format('DD-MM-YYYY')

    console.log('FLIGHTS:', flight)
    console.log('DepartDate:', departDate)

    return { flight, departDate }
  }
}
</script>

<style>
.flight-card {
  padding: 20px;
  max-width: 340px;
  height: 200px;
  width: 100%;
  box-shadow: 0px 4px 13px -4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  margin-top: 30px;
}

.price,
.date-time,
.places {
  display: flex;
  justify-content: space-between;
}

.price p {
  font-weight: bold;
  color: #707070;
}

.price,
.date-time {
  margin-top: 20px;
}

.places img {
  width: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.date-time p,
.places p {
  font-weight: bold;
  font-size: 24px;
  display: flex;
  flex-direction: column;
}
.date-time p span,
.places p span {
  font-size: 14px;
  color: #707070;
}
.places p:first-of-type {
  color: #5f67ec;
}

.places p:last-of-type {
  color: rgb(250, 144, 86);
}

.date-time .flight-type {
  font-size: 20px;
}
</style>
