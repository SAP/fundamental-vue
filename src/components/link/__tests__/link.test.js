import Link from './../link.vue'
import { RouterLinkStub, createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'

describe('Link', () => {
  it('renders as anchor in case href is used', () => {
    const href = '/hello-world'
    const wrapper = mount(Link, {
      propsData: {
        href
      }
    })
    expect(wrapper.element.tagName.toLowerCase()).toStrictEqual('a')
    expect(wrapper.attributes('href')).toStrictEqual(href)
  })

  it('renders as anchor in case href is used and ensures external urls receive special handling', () => {
    const href = 'https://example.org/hello/worl?test=1'
    const wrapper = mount({
      template: `<Link href="${href}">hello</Link>`,
      components: { Link }
    })
    const attributes = wrapper.attributes()
    expect(attributes['href']).toEqual(href)
    expect(wrapper.element.tagName.toLowerCase()).toStrictEqual('a')
    expect(attributes['href']).toStrictEqual(href)
    expect(attributes['target']).toStrictEqual('_blank')
    expect(attributes['rel']).toStrictEqual('noopener noreferrer')
  })

  it('renders as router link in case to-prop is used', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const router = new VueRouter({
      mode: 'hash',
      routes: [
        {
          name: 'home',
          path: '/home',
          component: {
            render(h) {
              return h('div', { class: 'home' }, ['home'])
            }
          }
        }
      ]
    })

    const wrapper = mount(
      {
        template: `<Link :to="{ name: 'home' }">Home sweet Home</Link>`,
        components: { Link }
      },
      {
        stubs: { RouterLink: RouterLinkStub },
        router
      }
    )

    const routerLink = wrapper.findComponent(RouterLinkStub)
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.props().to).toEqual({ name: 'home' })
  })

  it('can be disabled', () => {
    const wrapper = mount({
      template: `<Link href="#" disabled>Home sweet Home</Link>`,
      components: { Link }
    })
    expect(wrapper.classes('is-disabled')).toBe(true)
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // this came up during the execution of end to end tests
  // in e2e tests we want to attach cypress-specific attributes
  // to almost any component.
  // FdLink did not render those attributes and thus the tests failed.
  // Additional attributes should just work – not just for e2e-testing.
  it('renders additional attributes', () => {
    const wrapper = mount({
      template: `<Link href="#" data-cy-test="val">Home sweet Home</Link>`,
      components: { Link }
    })
    expect(wrapper.attributes('data-cy-test')).toBe('val')
  })
})
