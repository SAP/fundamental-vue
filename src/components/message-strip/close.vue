<script>
import FdButton from './../button/button.vue'

export default {
  name: 'FdMessageStripCloseButton',
  functional: true,
  render(h, context) {
    const data = {
      ...context.data,
      class: 'fd-message-strip__close',
      props: {
        compact: true,
        styling: 'transparent',
        icon: 'decline'
      }
    }
    return h(FdButton, data, context.children)
  }
}
</script>
