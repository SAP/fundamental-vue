// @ts-check
import { mount } from '@vue/test-utils'
// @ts-ignore
import FdCalendar from './../calendar.vue'
// @ts-ignore
import FdCalendarHeader from './../calendar-header.vue'

describe('fd-calendar', () => {
  it('handles 31rd of May 2019 correctly', async () => {
    const wrapper = mount(FdCalendar, {
      propsData: {
        today: new Date('2019-05-31'),
        mode: 'single',
        defaultValue: new Date('2019-05-31')
      }
    })
    const header = wrapper.findComponent(FdCalendarHeader)
    expect(header.exists()).toBe(true)
    expect(header.props('year')).toEqual(2019)
    expect(header.props('month')).toEqual('May')
  })
})
