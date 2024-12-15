<template>
  <div class="fd-action-bar__actions">
    <!-- Actions are usually one or several `fd-button`-instances. -->
    <slot />
  </div>
</template>

<script>
// The actions area of an `fd-action-bar`. Add `fd-buttons` as children of the actions area in order to add actions to the enclosing action bar.
export default {
  name: 'FdActionBarActions'
}
</script>
