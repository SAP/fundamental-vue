import 'fundamental-styles/dist/fundamental-styles.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import '../src/styles.scss'
// import './SAP-icons.woff'
import './styles.css'
import Vue from 'vue'
import FundamentalVue from '../src/index'
import VueVirtualScroller from 'vue-virtual-scroller'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueVirtualScroller)
Vue.use(VueObserveVisibility)
Vue.use(FundamentalVue)
Vue.mixin({
  methods: {
    $withBase: relativePath => `${process.env.BASE_URL || '/'}${relativePath}`
  }
})

export const parameters = {}