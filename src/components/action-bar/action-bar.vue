<template>
  <div class="fd-action-bar">
    <!-- A custom header – use `fd-action-bar-header` -->
    <slot name="header"></slot>
    <!-- Custom description – use `fd-action-bar-description` -->
    <slot name="description" />
  </div>
</template>

<script>
// The Action Bar is located at the top of the page and is used for the following displaying a page title and actions.
export default {
  name: 'FdActionBar'
}
</script>
