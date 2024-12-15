<template>
  <div class="fd-action-bar__header">
    <!-- A custom back-component – use `fd-action-bar-back` with a custom `fd-button` inside or use the `fd-back-button`-slot -->
    <slot name="back" />
    <!-- Custom title – use `fd-action-bar-title` -->
    <slot name="title" />
    <!-- Action bar actions – use `fd-action-bar-actions` with `fd-button`-instances inside. -->
    <slot name="actions" />
  </div>
</template>

<script>
// The header of an `fd-action-bar`. Use `fd-action-bar-title` to add an title to the header.
export default {
  name: 'FdActionBarHeader'
}
</script>
