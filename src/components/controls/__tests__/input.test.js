import { createLocalVue, mount } from '@vue/test-utils'
import TextInput from '../text-input.vue'

describe('TextInput', () => {
  it('respects compact mode', () => {
    const wrapper = mount(TextInput, { propsData: { compact: true } })
    const classes = wrapper.classes()
    expect(classes).toContain('fd-input')
    expect(classes).toContain('fd-input--compact')
  })

  it('renders initial value set via v-model', async () => {
    const localVue = createLocalVue()
    const wrapper = mount(
      {
        components: { TextInput },
        template: `<TextInput v-model="value" />`,
        data: () => ({ value: 'sap' })
      },
      { localVue }
    )
    await localVue.nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe('sap')
  })

  it('updates value of input when changed externally', async () => {
    const localVue = createLocalVue()
    const wrapper = mount(
      {
        components: { TextInput },
        template: `<TextInput v-model="value" />`,
        data: () => ({ value: 'sap' })
      },
      { localVue }
    )
    await localVue.nextTick()
    const input = wrapper.find('input')
    await wrapper.setData({ value: 'is cool' })
    expect(input.element.value).toBe('is cool')
  })

  it('change event is emitted only once per actual change when wrapped with another component', async () => {
    const localVue = createLocalVue()
    const wrapper = mount(
      {
        components: { TextInput },
        template: `<TextInput @change="$emit('change')" v-model="value" />`,
        data: () => ({ value: 'sap' })
      },
      { localVue }
    )
    await localVue.nextTick()
    const input = wrapper.find('input')

    input.element.value = 'walldorf'
    input.trigger('change')

    const changeEvents = wrapper.emitted('change')
    expect(changeEvents).toHaveLength(1)
  })

  it('supports v-model', async () => {
    const localVue = createLocalVue()
    const wrapper = mount(
      {
        components: { TextInput },
        template: `<TextInput v-model="value" />`,
        data: () => ({ value: 'sap' })
      },
      { localVue }
    )
    await localVue.nextTick()
    const input = wrapper.find('input')

    input.element.value = 'walldorf'
    input.trigger('input')

    const events = wrapper.findComponent(TextInput).emitted('update')
    expect(events).toHaveLength(1)
    expect(events[0]).toEqual(['walldorf'])
  })
})
