import pluginify from './../../util/pluginify'

import ActionBar from './action-bar.vue'
import ActionBarTitle from './header/title.vue'
import ActionBarHeader from './header/index.vue'
import ActionBarActions from './header/actions.vue'
import ActionBarBack from './header/back.vue'
import ActionBarDescription from './description.vue'

export default pluginify(
  ActionBar,
  ActionBarTitle,
  ActionBarHeader,
  ActionBarActions,
  ActionBarBack,
  ActionBarDescription
)

export {
  ActionBar,
  ActionBarTitle,
  ActionBarHeader,
  ActionBarActions,
  ActionBarBack,
  ActionBarDescription
}
// export { default as ActionBar } from './action-bar.vue'
// export { default as ActionBarTitle } from './action-bar-title.vue'
// export { default as ActionBarHeader } from './action-bar-header.vue'
// export { default as ActionBarActions } from './action-bar-actions.vue'
// export { default as ActionBarBack } from './action-bar-back.vue'
// export { default as ActionBarDescription } from './action-bar-description.vue'
