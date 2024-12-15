import { createLocalVue, mount } from '@vue/test-utils'
import FdMenuItem from './../menu-item.vue'
import FdMenuLink from './../menu-link.vue'
import FundamentalVue from './../../../index'

const mountMenuItem = template => {
  const localVue = createLocalVue()
  localVue.use(FundamentalVue)

  return mount(
    {
      template,
      components: { FdMenuItem, FdMenuLink }
    },
    {
      localVue,
      provide: {
        menuList: {
          canHaveAddon: false,
          menuItemDidClick() {}
        },
        menuHighlight: { highlightedId: null },
        menu: {
          registerMenuItem() {},
          unregisterMenuItem() {}
        }
      }
    }
  )
}

describe('MenuItem', () => {
  it('emits click-event', async () => {
    const wrapper = mountMenuItem(`<FdMenuItem>hello</FdMenuItem>`)
    wrapper.find('a').trigger('click')
    await wrapper.vm.$nextTick()
    const clicks = wrapper.findComponent(FdMenuItem).emitted('click')
    expect(clicks).toHaveLength(1)
  })

  it('does render embeddded link with href', () => {
    const wrapper = mountMenuItem(`
    <FdMenuItem uid="aaa">
      <FdMenuLink href='#'>Item 1</FdMenuLink>
    </FdMenuItem>`)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('does render embedded link', () => {
    const wrapper = mountMenuItem(
      `
      <FdMenuItem uid="aaa">
        <FdMenuLink>Item 1</FdMenuLink>
      </FdMenuItem>`
    )
    expect(wrapper.element).toMatchSnapshot()
  })

  it('does render selected state', () => {
    const wrapper = mountMenuItem(
      `
      <FdMenuItem uid="aaa" :selected="true">
        <FdMenuLink>Item 1</FdMenuLink>
      </FdMenuItem>`
    )
    expect(wrapper.element).toMatchSnapshot()
  })
})
