<script>
import FdButton from './../button/button.vue'
export default {
  name: 'FdInputGroupButton',
  functional: true,
  components: { FdButton },
  render(h, context) {
    const data = {
      ...context.data,
      props: {
        styling: 'transparent'
      },
      staticClass: 'fd-input-group__button'
    }
    return h(FdButton, data, context.children)
  }
}
</script>
