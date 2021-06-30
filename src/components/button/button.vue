<template>
  <button :class="classes" :disabled="disabled" v-on="listeners" @click="click">
    <!-- button content -->
    <i v-if="icon != null" :class="iconClasses" />
    <slot />
  </button>
</template>

<script>
import ButtonStyles from './styles'
import Icon from './../../mixins/icon'
import Uid from './../../mixins/uid'

// Buttons allow users to perform actions.
export default {
  name: 'FdButton',
  mixins: [Icon, Uid],
  props: {
    // Whether or not the button is compactable. A compactable button can become less tall on desktop if the view port is getting smaller.
    compact: Boolean,
    styling: {
      // `emphasized` / `light`
      type: String,
      default: null,
      validator: value => ButtonStyles.indexOf(value) >= 0
    },
    // State of the button – usually not of really useful but used in combination with `fd-button-group`.
    state: {
      // `normal` / `selected` / `disabled`
      type: String,
      // `normal` – no special state.
      default: 'normal',
      validator: value => ['normal', 'selected', 'disabled'].indexOf(value) >= 0
    }
  },
  methods: {
    click(event) {
      if (this.state === 'disabled') {
        event.preventDefault()
        event.stopImmediatePropagation()
        return
      }
      // Fired when the button has been clicked.
      // @arg the `Event` that triggered the click.
      this.$emit('click', event)
    }
  },
  computed: {
    listeners() {
      const { click, ...otherListeners } = this.$listeners
      return otherListeners
    },
    disabled() {
      return this.state === 'disabled'
    },
    classes() {
      return [
        'fd-button',
        this.compact ? 'fd-button--compact' : '',
        this.styling ? `fd-button--${this.styling}` : '',
        this.state !== 'normal' ? `is-${this.state}` : ''
      ]
    }
  }
}
</script>
