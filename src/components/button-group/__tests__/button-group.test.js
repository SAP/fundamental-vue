import { createLocalVue, mount } from '@vue/test-utils'
import FdButtonGroupButton from './../button-group-button.vue'
import FdButtonGroup from './../button-group.vue'
import FundamentalVue from '@/index'

describe('ButtonGroup', () => {
  let localVue = createLocalVue()
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(FundamentalVue)
  })

  it('supports v-model', async () => {
    const Wrapper = localVue.extend({
      data: () => ({ value: [] }),
      template: `
    <FdButtonGroup v-model="value">
      <FdButtonGroupButton value="b0">b0</FdButtonGroupButton>
      <FdButtonGroupButton value="b1">b1</FdButtonGroupButton>
      <FdButtonGroupButton value="b2">b2</FdButtonGroupButton>
    </FdButtonGroup>
    `
    })
    const wrapper = mount(Wrapper, { localVue })
    await localVue.nextTick()
    const buttons = wrapper.findAllComponents(FdButtonGroupButton)
    for (const buttonWrapper of buttons.wrappers) {
      const button = buttonWrapper.find('button')
      button.trigger('click')
      await localVue.nextTick()
      const buttonValue = buttonWrapper.vm.value
      const value = wrapper.vm.value
      // const index = value.indexOf(buttonValue);
      expect(buttonValue).toEqual(value)
    }
  })

  it('renders compact buttons if group is compact', () => {
    const buttonGroup = mount(
      {
        template: `
      <FdButtonGroup compact>
        <FdButtonGroupButton value="b0">b1</FdButtonGroupButton>
        <FdButtonGroupButton value="b1">b2</FdButtonGroupButton>
        <FdButtonGroupButton value="b2">b3</FdButtonGroupButton>
      </FdButtonGroup>
      `
      },
      { localVue }
    )
    const buttons = buttonGroup.findAllComponents(FdButtonGroupButton)
    expect(buttons).toHaveLength(3)
    // We have no public api in order to determine whether a button is compact or not.
    // Because of that we have to check if the compact class is present.
    // const buttonIsCompact = (button: Wrapper<any>) => button.classes("fd-button--compact");
    const buttonWrappers = buttons.wrappers
    for (const buttonWrapper of buttonWrappers) {
      const classes = buttonWrapper.classes()
      expect(classes).toContain('fd-button--compact')
    }
  })

  // Yes this was actually a problem.
  it('renders buttons without compact class if group is not compact', () => {
    const buttonGroupWrapper = mount(
      {
        template: `
      <FdButtonGroup>
        <FdButtonGroupButton value="b0">b1</FdButtonGroupButton>
        <FdButtonGroupButton value="b1">b2</FdButtonGroupButton>
        <FdButtonGroupButton value="b2">b3</FdButtonGroupButton>
      </FdButtonGroup>
      `
      },
      { localVue }
    )
    const buttonGroup = buttonGroupWrapper.findComponent(FdButtonGroup)
    const buttons = buttonGroup.findAllComponents(FdButtonGroupButton)
    expect(buttons).toHaveLength(3)
    // We have no public api in order to determine whether a button is compact or not.
    // Because of that we have to check if the compact class is present.
    // const buttonIsCompact = (button: Wrapper<any>) => button.classes("fd-button--compact");
    const buttonWrappers = buttons.wrappers
    for (const buttonWrapper of buttonWrappers) {
      const classes = buttonWrapper.classes()
      expect(classes).not.toContain('fd-button--compact')
    }
  })

  it('emits no array in single mode', async () => {
    expect(true).toBe(true)
    const buttonGroupWrapper = mount(
      {
        template: `
      <FdButtonGroup v-model="value" selectionMode="single">
        <FdButtonGroupButton value="b1">b1</FdButtonGroupButton>
        <FdButtonGroupButton value="b2">b2</FdButtonGroupButton>
        <FdButtonGroupButton value="b3">b3</FdButtonGroupButton>
      </FdButtonGroup>
      `,
        data() {
          return {
            value: null
          }
        }
      },
      { localVue }
    )
    await localVue.nextTick()
    const buttonGroup = buttonGroupWrapper.findComponent(FdButtonGroup)
    const buttons = buttonGroupWrapper.findAllComponents(FdButtonGroupButton)
    for (const wrapper of buttons.wrappers) {
      const button = wrapper.find('button')
      button.trigger('click')
      await localVue.nextTick()
      const value = buttonGroup.vm.value
      expect(typeof value).toBe('string')
    }
  })
})
