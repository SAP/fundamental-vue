<template>
  <div class="fd-calendar__action">
    <FdButton compact :styling="styling" :state="state" :icon="icon" @click="$emit('click')">
      {{ title }}
    </FdButton>
  </div>
</template>

<script>
import FdButton from './../button/button.vue'
import ButtonStyles from './../button/styles'

export default {
  name: 'FdCalendarAction',
  components: { FdButton },
  props: {
    title: String,
    icon: String,
    disabled: { type: Boolean, default: false },
    styling: {
      type: String,
      default: null,
      validator: value => ButtonStyles.indexOf(value) >= 0
    }
  },
  computed: {
    state() {
      return this.disabled ? 'disabled' : 'normal'
    }
  }
}
</script>
