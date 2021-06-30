<template>
  <div class="fd-time__control">
    <FdButton styling="transparent" :state="buttonState" :icon="icon" @click="$emit('click')" />
  </div>
</template>

<script>
import FdButton from './../button/button.vue'

export default {
  name: 'FdTimeControl',
  components: { FdButton },
  computed: {
    buttonState() {
      return this.disabled ? 'disabled' : 'normal'
    }
  },
  props: {
    icon: String,
    disabled: Boolean
  }
}
</script>
