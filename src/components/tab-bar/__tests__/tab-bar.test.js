import { createLocalVue, mount } from '@vue/test-utils'
import TabBarPlugin from '../'
import TabBar from './../tab-bar.vue'
import TabBarItem from './../item.vue'
import TabBarLink from './../link.vue'

const mountTabBar = async component => {
  const localVue = createLocalVue()
  localVue.use(TabBarPlugin)
  const wrapper = mount(component, { localVue })
  await localVue.nextTick()

  const tabBar = wrapper.findComponent(TabBar)
  const tabBarItems = wrapper.findAllComponents(TabBarItem)
  const tabBarItem = wrapper.findComponent(TabBarItem)
  const tabBarLinks = wrapper.findAllComponents(TabBarLink)
  const tabBarLink = wrapper.findComponent(TabBarLink)

  return {
    localVue,
    wrapper,
    tabBar,
    tabBarItems,
    tabBarItem,
    tabBarLinks,
    tabBarLink
  }
}

describe('Tab Bar Component', () => {
  it('ignores clicks on disabled item', async () => {
    const { tabBarLink, wrapper, tabBar, localVue } = await mountTabBar({
      template: `
      <FdTabBar v-model="activeItem" :items="['home']">
        <template #home>
          <FdTabBarItem>
            <FdTabBarLink disabled>Home</FdTabBarLink>
          </FdTabBarItem>
        </template>
      </FdTabBar>
      `,
      data() {
        return {
          activeItem: null
        }
      }
    })
    expect(tabBar.exists()).toBe(true)
    expect(tabBar.vm.activeItem_).toBe(null)
    expect(tabBarLink.exists()).toBe(true)
    tabBarLink.trigger('click')
    await localVue.nextTick()
    expect(tabBar.vm.activeItem_).toBe(null)
  })

  it('activates item on click', async () => {
    const { tabBarLink, wrapper, tabBar, localVue } = await mountTabBar({
      template: `
      <FdTabBar v-model="activeItem" :items="['home']">
        <template #home>
          <FdTabBarItem>
            <FdTabBarLink>Home</FdTabBarLink>
          </FdTabBarItem>
        </template>
      </FdTabBar>
      `,
      data() {
        return {
          activeItem: null
        }
      }
    })
    expect(tabBar.exists()).toBe(true)
    expect(tabBar.vm.activeItem_).toBe(null)
    expect(tabBarLink.exists()).toBe(true)
    tabBarLink.trigger('click')
    await localVue.nextTick()
    expect(tabBar.vm.activeItem_).toEqual('home')
  })
})
