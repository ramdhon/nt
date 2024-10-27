<template>
  <div>
    <GMap
      ref="gMap"
      :center="{ lat: 52.50026483203335, lng: 13.32467700913042 }"
      :options="{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        gestureHandling: 'cooperative',
        styles: mapStyle,
      }"
      :zoom="15"
      class="wrapper"
      :class="{ mobile }"
    >
      <GMapMarker
        v-for="location in locations"
        :key="location.id"
        :position="{ lat: location.lat, lng: location.lng }"
      >
        <GMapInfoWindow :options="{ maxWidth: 300 }">
          <div class="map-info__container">
            <div class="map-info__title">{{ location.name }}</div>
            <div>Uhlandstrasse 33 10719 Berlin</div>
            <div>(+49) 030 21 300 8000</div>
            <div>info@nidal-toman.de</div>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
export default {
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      locations: [
        {
          lat: 52.50026483203335,
          lng: 13.32467700913042,
          name: 'Nidal Toman Office',
        },
      ],
      mapStyle: [],
    }
  },
}
</script>

<style>
.map-info__container {
  padding: 5px 10px 10px 0px;
}

.map-info__title {
  font-size: 16px;
  line-height: 32px;
  font-weight: 700;
}

.map-info__subtitle {
}

.GMap__Wrapper {
  width: 100%;
  height: 100%;
}
.wrapper {
  height: 400px;
}
.mobile {
  height: calc(100vh - 56px);
}
</style>
