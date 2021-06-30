<template>
  <div class="fd-button-split" role="group">
    <!-- Provide a custom action button. The action button is bigger button with the text that should trigger some kind of action. You can use fd-split-button-action to render the default auxiliary-button and customize it. -->
    <slot v-bind="slotProps" name="action">
      <fd-split-button-action @click="$emit('click')">
        <!-- Provide a title. This is rendered inside the 'action' part of the split button (big area on the left). -->
        <slot />
      </fd-split-button-action>
    </slot>
    <!-- Provide a custom auxiliary button. The auxiliary button should bring up some kind of menu/popover. You can use fd-split-button-auxiliary to render the default auxiliary-button and customize it.  -->
    <slot v-bind="slotProps" name="auxiliary">
      <fd-split-button-auxiliary @click="$emit('click:auxiliary')" />
    </slot>
  </div>
</template>

<script>
import FdSplitButtonAuxiliary from './../split-button-auxiliary/split-button-auxiliary.vue'
import FdSplitButtonAction from './../split-button-action/split-button-action.vue'
import Vue from 'vue'
import ButtonStyles from './../button/styles'
import IconMixin from './../../mixins/icon'

export default {
  name: 'FdSplitButton',
  mixins: [IconMixin],
  components: {
    FdSplitButtonAction,
    FdSplitButtonAuxiliary
  },
  provide() {
    return {
      splitButton: this.splitButton
    }
  },
  computed: {
    slotProps() {
      return this.splitButton
    }
  },
  props: {
    compact: Boolean,
    styling: {
      type: String,
      default: null,
      validator: value => ButtonStyles.indexOf(value) >= 0
    },
    state: {
      type: String,
      default: 'normal',
      validator: value => ['normal', 'selected', 'disabled'].indexOf(value) >= 0
    }
  },
  watch: {
    state(state) {
      this.splitButton.state = state
    },
    styling(styling) {
      this.splitButton.styling = styling
    },
    compact(compact) {
      this.splitButton.compact = compact
    },
    icon(icon) {
      this.splitButton.icon = icon
    }
  },
  data() {
    return {
      splitButton: Vue.observable({
        state: this.state,
        styling: this.styling,
        compact: this.compact,
        icon: this.icon
      })
    }
  }
}
</script>
