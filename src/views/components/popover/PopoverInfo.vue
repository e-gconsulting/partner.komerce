<template>
  <b-button
    tabindex="0"
    v-b-popover.focus.bottom="text"
    variant="transparent"
    class="ml-1"
  >
    <img
      src="@/assets/images/icons/info-circle.svg"
      alt="Info"
    >
  </b-button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
  },
}
</script>
