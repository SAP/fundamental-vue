<template>
  <fd-action-bar>
    <template #description>
      <fd-action-bar-description>Description</fd-action-bar-description>
    </template>
    <template #header>
      <fd-action-bar-header>
        <template #back>
          <fd-action-bar-back>
            <fd-button icon="navigation-left-arrow" styling="transparent" />
          </fd-action-bar-back>
        </template>
        <template #title>
          <fd-action-bar-title>
            <h2 class="fd-title fd-title--h3">Page Title</h2>
          </fd-action-bar-title>
        </template>
        <template #actions>
          <fd-action-bar-actions>
            <fd-button compact>Button</fd-button>
            <fd-button styling="emphasized" compact>Button</fd-button>
          </fd-action-bar-actions>
        </template>
      </fd-action-bar-header>
    </template>
  </fd-action-bar>
</template>
