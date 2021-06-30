import $Support from './$Support'
import ActionBar from './action-bar'
import Badge from './badge'
import Breadcrumb from './breadcrumb'
import Button from './button'
import ButtonGroup from './button-group'
import Calendar from './calendar'
import Combobox from './combobox'
import ContextMenu from './context-menu'
import ContextButton from './context-button'
import ComboboxMenu from './combobox-menu'
import Container from './container'
import Col from './col'
import Controls from './controls'
import CheckboxLabel from './checkbox-label'
import Counter from './counter'
import DatePicker from './date-picker'
import DatePickerInput from './date-picker-input'
import DatePickerCalendar from './date-picker-calendar'
import DateInput from './date-input'
import Dropdown from './dropdown'
import DropdownControl from './dropdown-control'
import FormItem from './form-item'
import FormLabel from './form-label'
import FormItemCheckbox from './form-item-checkbox'
import FormItemRadio from './form-item-radio'
import FormItemToggle from './form-item-toggle'
import FormItemText from './form-item-text'
import Fieldset from './fieldset'
import FieldsetLegend from './fieldset-legend'
import FormMessage from './form-message'
import Icon from './icon'
import Identifier from './identifier'
import Image from './image'
import InlineHelp from './inline-help'
import InputGroup from './input-group'
import Label from './label'
import Layout from './layout'
import Link from './link'
import List from './list'
import SplitView from './split-view'
import Menu from './menu'
import MessageStrip from './message-strip'
import MenuPopover from './menu-popover'
import Dialog from './dialog'
import ModalOverlay from './modal-overlay'
import NestedList from './nested-list'
import Pagination from './pagination'
import Panel from './panel'
import Popover from './popover'
import RadioLabel from './radio-label'
import Section from './section'
import SearchInput from './search-input'
import SideNav from './side-nav'
import Spinner from './spinner'
import Status from './status'
import ShellBar from './shell-bar'
import SplitButton from './split-button'
import SplitButtonAuxiliary from './split-button-auxiliary'
import SplitButtonAction from './split-button-action'
import ProductSwitcher from './product-switcher'
import Table from './table'
import Tabs from './tabs'
import TabBar from './tab-bar'
import TabPanel from './tab-panel'
import Tile from './tile'
import TileActions from './tile-actions'
import TileMedia from './tile-media'
import TileContent from './tile-content'
import TileTitle from './tile-title'
import LayoutGrid from './layout-grid'
import LayoutGridItem from './layout-grid-item'
import Time from './time'
import TimePicker from './time-picker'
import Token from './token'
import Tree from './tree'
import VirtualizedList from './virtualized-list'
import Notification from './notification'
import NotificationContainer from './notification-container'
import Notify from './notify'
import FdTextInput from './controls/text-input.vue'
import normalizedPluginOptions from './../util/plugin-options'

const plugin = {
  install(vue, options) {
    // For compatibility only
    vue.component('FdInput', FdTextInput)
    // The real deal
    const plugins = [
      $Support,
      ActionBar,
      Badge,
      Breadcrumb,
      Button,
      ButtonGroup,
      Calendar,
      Combobox,
      Container,
      Col,
      Controls,
      CheckboxLabel,
      ComboboxMenu,
      Counter,
      ContextMenu,
      ContextButton,
      DatePicker,
      ProductSwitcher,
      DatePickerCalendar,
      DatePickerInput,
      DateInput,
      Dropdown,
      NestedList,
      DropdownControl,
      FormMessage,
      FormItem,
      FormLabel,
      FormItemCheckbox,
      FormItemRadio,
      FormItemToggle,
      FormItemText,
      Fieldset,
      FieldsetLegend,
      Icon,
      Identifier,
      Image,
      InputGroup,
      InlineHelp,
      Label,
      Layout,
      Link,
      List,
      SplitView,
      RadioLabel,
      Menu,
      MessageStrip,
      MenuPopover,
      Dialog,
      ModalOverlay,
      Notification,
      Notify,
      NotificationContainer,
      Pagination,
      Panel,
      Popover,
      SearchInput,
      Section,
      SideNav,
      Spinner,
      ShellBar,
      Status,
      SplitButton,
      SplitButtonAuxiliary,
      SplitButtonAction,
      Table,
      Tabs,
      TabBar,
      TabPanel,
      Tile,
      TileActions,
      TileMedia,
      TileTitle,
      TileContent,
      LayoutGrid,
      LayoutGridItem,
      Time,
      TimePicker,
      Token,
      Tree,
      VirtualizedList
    ]
    const _options = normalizedPluginOptions(options)
    plugins.forEach(plugin => vue.use(plugin, _options))
  }
}
export default plugin
export { default as observeMediaQueries } from './match-media/create-mixin'
