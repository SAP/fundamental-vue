<template>
  <div class="fd-action-bar__back">
    <!-- Usually just a custom `fd-button` -->
    <slot />
  </div>
</template>

<script>
// You can add an `fd-button` to this component in order to display a back-button within an `fd-action-bar`.
export default {
  name: 'FdActionBarBack'
}
</script>
