import { createLocalVue, mount } from '@vue/test-utils'
import FdTableRow from './../components/table-row.vue'
import FdTableCell from './../components/table-cell.vue'
import FdTableHeader from './../components/table-header.vue'
import FdTableHeaderCell from './../components/table-header-cell.vue'
import FdTable from './../table.vue'

describe('Table', () => {
  describe('TableCell', () => {
    // In the past table cell added empty class attributes to the rendered td-el.
    it('does not render class attribute', async () => {
      const localVue = createLocalVue()
      const ClassAttrWrapper = localVue.extend({
        name: 'ClassAttrWrapper',
        components: { FdTable, FdTableRow, FdTableCell },
        template: `
        <fd-table :headers="['id']" :items="items">
          <template #row="{ item }">
            <fd-table-row>
              <template #id>
                <fd-table-cell>{{item.id}}</fd-table-cell>
              </template>
            </fd-table-row>
          </template>
        </fd-table>
        `,
        data: () => ({
          items: [
            { id: '1', firstName: 'Chris', lastName: 'Kienle' },
            { id: '2', firstName: 'Andi', lastName: 'Kienle' },
            { id: '3', firstName: 'Sven', lastName: 'Bacia' },
            { id: '4', firstName: 'Artur', lastName: 'Raess' }
          ]
        })
      })
      const wrapper = mount(ClassAttrWrapper, { localVue })
      await localVue.nextTick()

      const cells = wrapper.findAll('td').wrappers
      expect(cells.length).toBe(4)
      for (const cell of cells) {
        const classAttr = cell.attributes('class')
        expect(classAttr == null || classAttr !== '').toBe(true)
      }
    })
  })

  it('reacts to column changes', async () => {
    const localVue = createLocalVue()
    const ChangeColumnWrapper = localVue.extend({
      name: 'ChangeColumnWrapper',
      components: {
        FdTable,
        FdTableRow,
        FdTableCell,
        FdTableHeader,
        FdTableHeaderCell
      },
      template: `
      <fd-table :headers="headers" :items="items">
        <template #row="{ item }">
          <fd-table-row>
            <template v-for="header in headers" v-slot:[header]>
              <fd-table-cell :key="item.id + header">
                {{ header }}
              </fd-table-cell>
            </template>
          </fd-table-row>
        </template>
      </fd-table>
      `,
      data: () => ({
        headers: ['c1', 'c2'],
        items: [
          { firstName: 'Chris', lastName: 'Kienle' },
          { firstName: 'Andi', lastName: 'Kienle' },
          { firstName: 'Sven', lastName: 'Bacia' },
          { firstName: 'Artur', lastName: 'Raess' }
        ]
      })
    })
    const wrapper = mount(ChangeColumnWrapper, { localVue })
    await localVue.nextTick()

    const headerCells = wrapper.findAllComponents(FdTableHeaderCell)
    expect(headerCells).toHaveLength(2)
    // Now we change the columns
    wrapper.vm.headers = ['c1', 'c2', 'c3', 'c4']
    await localVue.nextTick()
    expect(wrapper.findAllComponents(FdTableHeaderCell)).toHaveLength(4)
  })

  it('ensures single selection', async () => {
    const localVue = createLocalVue()
    const wrapper = mount(
      {
        components: { FdTable, FdTableRow, FdTableCell },
        template: `
      <fd-table :headers="headers" selection-mode="single" :items="tableData">
        <template #row="{item, toggle}">
          <fd-table-row @click="toggle">
            <template #firstName><fd-table-cell>{{item.firstName}}</fd-table-cell></template>
            <template #lastName>fd-table-cell>{{item.lastName}}</fd-table-cell></template>
            <template #building>fd-table-cell>{{item.building}}</fd-table-cell></template>
          </fd-table-row>
        </template>
      </fd-table>
      `,
        data: () => ({
          headers: ['firstName', 'lastName', 'building'],
          tableData: [
            {
              id: '1',
              firstName: 'Chris',
              lastName: 'Kienle',
              building: 'WFD02'
            },
            {
              id: '2',
              firstName: 'Andi',
              lastName: 'Kienle',
              building: 'WFD03'
            },
            {
              id: '3',
              firstName: 'Sven',
              lastName: 'Bacia',
              building: 'WFD02'
            },
            {
              id: '4',
              firstName: 'Artur',
              lastName: 'Raess',
              building: 'WFD02'
            }
          ]
        })
      },
      { localVue }
    )
    await localVue.nextTick()

    const rows = wrapper.findAll('tbody tr')
    await rows.at(0).trigger('click')

    const selectedRows = () => {
      return wrapper.findAll('tr[aria-selected="true"]')
    }
    expect(selectedRows()).toHaveLength(1)
    rows.at(1).trigger('click')
    expect(selectedRows()).toHaveLength(1)
  })

  it('can select multiple rows', async () => {
    const data = [
      { id: '1', firstName: 'Chris', lastName: 'Kienle', building: 'WFD02' },
      { id: '2', firstName: 'Andi', lastName: 'Kienle', building: 'WFD03' },
      { id: '3', firstName: 'Sven', lastName: 'Bacia', building: 'WFD02' },
      { id: '4', firstName: 'Artur', lastName: 'Raess', building: 'WFD02' }
    ]
    const localVue = createLocalVue()
    const wrapper = await mount(
      {
        components: { FdTable, FdTableRow, FdTableCell },
        template: `
      <fd-table selection-mode="multiple" :items="tableData">
        <template #row="{item, toggle}">
          <fd-table-row @click="toggle">
            <template #firstName><fd-table-cell>{{item.firstName}}</fd-table-cell></template>
            <template #lastName>fd-table-cell>{{item.lastName}}</fd-table-cell></template>
            <template #building>fd-table-cell>{{item.building}}</fd-table-cell></template>
        </fd-table-row>
        </template>
      </fd-table>
      `,
        data: () => ({ tableData: [...data] })
      },
      { localVue }
    )

    const rows = wrapper.findAll('tbody tr')
    await rows.at(0).trigger('click')
    await rows.at(1).trigger('click')

    await localVue.nextTick()
    const selectedRows = () => {
      return wrapper.findAll('tr[aria-selected="true"]')
    }
    expect(selectedRows()).toHaveLength(2)
  })

  it('renders no rows when data is empty', async () => {
    const localVue = createLocalVue()
    const wrapper = await mount(
      {
        components: { FdTable, FdTableRow, FdTableCell },
        data: () => ({ tableData: [] }),
        template: `
      <fd-table :items="tableData">
        <template slot="row" slot-scope="{item}">
          <fd-table-row>
          <template #firstName><fd-table-cell>{{item.firstName}}</fd-table-cell></template>
          <template #lastName>fd-table-cell>{{item.lastName}}</fd-table-cell></template>
          <template #building>fd-table-cell>{{item.building}}</fd-table-cell></template>
        </fd-table-row>
        </template>
      </fd-table>
      `
      },
      { localVue }
    )
    await localVue.nextTick()
    const rows = wrapper.findAll('tbody tr')
    const cols = wrapper.findAll('tbody td')
    expect(cols).toHaveLength(0)
    expect(rows).toHaveLength(0)
  })
})
