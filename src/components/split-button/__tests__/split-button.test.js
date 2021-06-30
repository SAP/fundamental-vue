import { createLocalVue, mount } from '@vue/test-utils'
import FundamentalVue from './../../../index'
import FdSplitButton from './../split-button.vue'
import FdSplitButtonAction from './../../split-button-action/split-button-action.vue'
import FdSplitButtonAuxiliary from './../../split-button-auxiliary/split-button-auxiliary.vue'

const createSplitButton = ({ propsData } = { propsData: {} }) => {
  const localVue = createLocalVue()
  localVue.use(FundamentalVue)
  return mount(FdSplitButton, {
    localVue,
    propsData,
    slots: {
      default: 'Hello World'
    }
  })
}

describe('Split Button', () => {
  test('renders correctly', () => {
    expect(createSplitButton().element).toMatchSnapshot()
  })

  test('emits click-event when action-button is clicked', () => {
    const wrapper = createSplitButton()
    const actionButtonWrapper = wrapper.findComponent(FdSplitButtonAction)
    expect(actionButtonWrapper.exists()).toBe(true)
    actionButtonWrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  test('emits click:auxiliary-event when auxiliary-button is clicked', () => {
    const wrapper = createSplitButton()
    const auxiliaryButtonWrapper = wrapper.findComponent(FdSplitButtonAuxiliary)
    expect(auxiliaryButtonWrapper.exists()).toBe(true)
    auxiliaryButtonWrapper.trigger('click')
    expect(wrapper.emitted('click:auxiliary')).toHaveLength(1)
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  describe('when disabled', () => {
    /** @type {import("@vue/test-utils").Wrapper<Vue>} */
    let disabledWrapper
    beforeEach(() => {
      disabledWrapper = createSplitButton({
        propsData: {
          state: 'disabled'
        }
      })
    })

    test('renders correctly', () => {
      expect(disabledWrapper.element).toMatchSnapshot()
    })

    test('click:auxiliary-event is not emitted when auxiliary-button is clicked', () => {
      const auxiliaryButtonWrapper = disabledWrapper.findComponent(FdSplitButtonAuxiliary)
      expect(auxiliaryButtonWrapper.exists()).toBe(true)
      auxiliaryButtonWrapper.trigger('click')
      expect(disabledWrapper.emitted('click:auxiliary')).toBeUndefined()
      expect(disabledWrapper.emitted('click')).toBeUndefined()
    })

    test('click-event is not emitted when action-button is clicked', () => {
      const actionButtonWrapper = disabledWrapper.findComponent(FdSplitButtonAction)
      expect(actionButtonWrapper.exists()).toBe(true)
      actionButtonWrapper.trigger('click')
      expect(disabledWrapper.emitted('click:auxiliary')).toBeUndefined()
      expect(disabledWrapper.emitted('click')).toBeUndefined()
    })
  })
})
