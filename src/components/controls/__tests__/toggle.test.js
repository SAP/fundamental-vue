import { createLocalVue, mount } from '@vue/test-utils'
import Toggle from '../toggle.vue'
import FundamentalVue from '@/index'

describe('Toggle', () => {
  it('update event is emitted once', async () => {
    const localVue = createLocalVue()
    localVue.use(FundamentalVue)
    const Wrapper = localVue.extend({
      data: () => ({
        active: false
      }),
      template: `<FdToggle v-model="active" />`
    })
    const wrapper = mount(Wrapper, { localVue })
    await localVue.nextTick()
    expect(wrapper.vm.active).toBe(false)
    const toggle = wrapper.findComponent(Toggle)
    toggle.find('input').trigger('click')
    await localVue.nextTick()
    const events = toggle.emitted('update')
    expect(events).toEqual([[true]])
    expect(wrapper.vm.active).toBe(true)
  })

  it('does not react on click outside the input element when disabled', async () => {
    const localVue = createLocalVue()
    const Parent = localVue.extend({
      components: { Toggle },
      template: `<Toggle v-model="on" disabled />`,
      data() {
        return {
          on: false
        }
      }
    })
    const wrapper = mount(Parent, { localVue })
    expect(wrapper.vm.on).toBe(false)
    const toggle = wrapper.findComponent(Toggle)
    toggle.trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.on).toBe(false)
  })

  // Toggles which are not embedded in a form item have no default id.
  // If they have no id they should not render the id attribute.
  // The generated html was kinda funky:
  // <input type="checkbox" id>
  it('does not render empty id attribute', () => {
    const localVue = createLocalVue()
    const toggle = mount(Toggle, { localVue })
    const id = toggle.attributes('id')
    expect(id).toBeUndefined()
  })

  // We test this because there was a bug in the past which caused toggles to always be rendered
  // with the same size, no matter what value the size prop had.
  describe('renders correctly with size', () => {
    it('xs', () => {
      const toggle = mount(Toggle, { propsData: { size: 'xs' } })
      expect(toggle.find('.fd-toggle').classes('fd-toggle--xs')).toBe(true)
    })
    it('s', () => {
      const toggle = mount(Toggle, { propsData: { size: 's' } })
      expect(toggle.find('.fd-toggle').classes('fd-toggle--s')).toBe(true)
    })
    it('l', () => {
      const toggle = mount(Toggle, { propsData: { size: 'l' } })
      expect(toggle.find('.fd-toggle').classes('fd-toggle--l')).toBe(true)
    })
  })

  it('supports v-model', async () => {
    const localVue = createLocalVue()
    const Wrapper = localVue.extend({
      components: { Toggle },
      template: `<Toggle v-model="on" />`,
      data() {
        return {
          on: false
        }
      }
    })
    const toggle = mount(Wrapper, { localVue })
    expect(toggle.vm.on).toBe(false)
    await toggle.setData({ on: true })
    expect(toggle.vm.on).toBe(true)
    await toggle.find('input').trigger('click')
    expect(toggle.vm.on).toBe(false)
  })
})
