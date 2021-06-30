import { createLocalVue, mount } from '@vue/test-utils'
import FundamentalVue from '../../../index'

const mountActionBar = template => {
  const localVue = createLocalVue()
  localVue.use(FundamentalVue)
  return mount({ template }, { localVue })
}

describe('ActionBar', () => {
  it('renders back-button-slot', () => {
    const wrapper = mountActionBar(`
        <fd-action-bar-header>
          <template #back>
            <fd-button icon="nav-back" />
          </template>
        </fd-action-bar-header>
  `)
    expect(wrapper.element).toMatchSnapshot()
  })
  it('renders header-title-slot', () => {
    const wrapper = mountActionBar(`
    <fd-action-bar-header>
      <template #title>
        <fd-action-bar-title>Action Bar Title</fd-action-bar-title>
      </template>
    </fd-action-bar-header>
  `)
    expect(wrapper.element).toMatchSnapshot()
  })
  it("renders correctly in it's full glory", () => {
    const wrapper = mountActionBar(`
      <fd-action-bar>
        <template #header>
          <fd-action-bar-header>
            <template #back>
              <fd-action-bar-back>
                <fd-button styling="transparent" icon="nav-back" />
              </fd-action-bar-back>
            </template>
            <template #title>
              <fd-action-bar-title>Action Bar Title</fd-action-bar-title>
            </template>
            <template #actions>
            <fd-action-bar-actions>
            <fd-button styling="positive" icon="accept">Approve</fd-button>
            <fd-button styling="negative" icon="decline">Reject</fd-button>
            </fd-action-bar-actions>
            </template>
            </fd-action-bar-header>
            </template>
            <template #description>
              <fd-action-bar-description>Action Bar Description</fd-action-bar-description>
            </template>
      </fd-action-bar>
    `)
    expect(wrapper.element).toMatchSnapshot()
  })
})
