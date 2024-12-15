import { mount } from '@vue/test-utils'
import FdMenuLink from './../menu-link.vue'

describe('MenuLink', () => {
  it('renders correctly', () => {
    expect(
      mount({
        provide() {
          return {
            menuItem: { uid: 'aaa' },
            menuHighlight: { highlightedId: null }
          }
        },
        template: `<FdMenuLink>Item 1</FdMenuLink>`,
        components: { FdMenuLink }
      }).element
    ).toMatchSnapshot()
  })

  it('can be disabled', async () => {
    const wrapper = mount({
      provide() {
        return {
          menuItem: { uid: 'aaa' },
          menuHighlight: { highlightedId: null }
        }
      },
      template: `<fd-menu-link :disabled="disabled">title</fd-menu-link>`,
      components: { FdMenuLink },
      data() {
        return {
          disabled: false
        }
      }
    })

    const link = wrapper.findComponent(FdMenuLink)
    expect(link.emitted('click')).toBeUndefined()
    wrapper.find('a').trigger('click')
    const clicks = link.emitted('click')
    expect(clicks.length).toBe(1)
    wrapper.vm.disabled = true
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('a').trigger('click')
    expect(clicks.length).toBe(1)
  })
})
