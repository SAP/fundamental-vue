<script>
// Description of an `fd-action-bar`.
export default {
  name: 'FdActionBarDescription',
  props: {
    // Name of a tag that will be used to wrap the title/default slot.
    tag: {
      type: String,
      // `p` – by default the description will be wrapped inside a `p`-element.
      default: 'p'
    }
  },
  render(h) {
    const data = { class: 'fd-action-bar__description fd-action-bar__description--back' }
    return h(this.tag, data, this.$slots.default)
  }
}
</script>
