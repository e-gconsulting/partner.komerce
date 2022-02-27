<template>
  <b-button
    v-b-popover.focus.bottom="text"
    :class="classprops"
    tabindex="0"
    variant="transparent"
    class="ml-1"
  >
    <img
      src="@/assets/images/icons/info-circle.svg"
      alt="Info"
      :style="styleimgprops"
    >
  </b-button>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    text: {
      type: String,
    },
    classprops: {
      type: String,
      default: '',
    },
    styleimgprops: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
