import { mount } from '@vue/test-utils'
import FdCombobox from './../combobox.vue'
import FdMenuItem from './../../menu/menu-item.vue'
import FdMenuLink from './../../menu/menu-link.vue'

describe('Combobox', () => {
  // There was an issue where the input component emitted objects/event objects instead of just strings.
  it('does not emit an object', () => {
    const combobox = mount(FdCombobox)
    const input = combobox.find('input')

    input.element.value = 'hi'
    input.trigger('input')
    const events = combobox.emitted('update')
    expect(events).toHaveLength(1)
    const [event] = events
    expect(event).toEqual(['hi'])
  })

  it('supports vmodel', async () => {
    const wrapper = mount({
      components: { FdCombobox, FdMenuItem, FdMenuLink },
      template: `
      <FdCombobox v-model="value">
        <FdMenuItem ref="menuItem1" value="1">
          <FdMenuLink>1</FdMenuLink>
        </FdMenuItem>
        <FdMenuItem value="2">
          <FdMenuLink>2</FdMenuLink>
        </FdMenuItem>
        <FdMenuItem value="3">
          <FdMenuLink>3</FdMenuLink>
        </FdMenuItem>
        <FdMenuItem value="4">
          <FdMenuLink>4</FdMenuLink>
        </FdMenuItem>
      </FdCombobox>
      `,
      data() {
        return {
          value: 'abc'
        }
      }
    })
    await wrapper.vm.$nextTick()
    const item = wrapper.findComponent({ ref: 'menuItem1' })
    item.find('a').trigger('click')
    expect(item.text()).toBe('1') // ensure that we have selected the correct item
    expect(wrapper.vm.value).toBe('1')
  })

  it('Combobox items with labels', async () => {
    const wrapper = mount({
      components: { FdCombobox, FdMenuItem, FdMenuLink },
      template: `
      <FdCombobox ref="combobox" v-model="value">
        <FdMenuItem ref="menuItem1" value="1" label="A">
          <FdMenuLink>1</FdMenuLink>
        </FdMenuItem>
        <FdMenuItem value="2" label="B">
          <FdMenuLink>2</FdMenuLink>
        </FdMenuItem>
        <FdMenuItem value="3" label="C">
          <FdMenuLink>3</FdMenuLink>
        </FdMenuItem>
        <FdMenuItem value="4" label="D">
          <FdMenuLink>4</FdMenuLink>
        </FdMenuItem>
      </FdCombobox>
      `,
      data() {
        return {
          value: 'abc'
        }
      }
    })
    await wrapper.vm.$nextTick()
    const item = wrapper.find({ ref: 'menuItem1' })
    item.find('a').trigger('click')
    expect(item.text()).toBe('1') // ensure that we have selected the correct item
    expect(wrapper.vm.value).toBe('1')

    const combobox = wrapper.find({ ref: 'combobox' })
    expect(combobox.vm.displayValue).toBe('A') // ensure that the value being displayed is the label
  })
})
