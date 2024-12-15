import { createLocalVue, mount } from '@vue/test-utils'
import FdCheckbox from '../checkbox.vue'
import FdRadio from '../radio.vue'

describe('Checkbox', () => {
  it('can be disabled', async () => {
    const localVue = createLocalVue()
    const TestComponent = localVue.extend({
      template: `<FdCheckbox disabled value="i_like_cookies" v-model="checked" />`,
      data: () => ({ checked: '' }),
      components: { FdCheckbox }
    })
    const wrapper = mount(TestComponent, { localVue })
    expect(wrapper.vm.checked).toBe('')
    const checkbox = wrapper.findComponent(FdCheckbox)
    expect(checkbox.isVisible()).toBe(true)
    checkbox.trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.checked).toBe('')
    expect(checkbox.attributes('disabled')).toBe('disabled')
  })
})

// describe("FormItem", () => {
//   describe("with single Radio Button", () => {
//     it("supports v-model", async () => {
//       const localVue = createLocalVue();
//       const Parent = localVue.extend({
//         template: `
//         <FdFormItem>
//           <FdRadio value="helloWorld" v-model="checked" />
//         </FdFormItem>
//         `,
//         data: () => ({ checked: "" }),
//         components: { FdFormItem, FdRadio }
//       });
//       const form = mount(Parent, { localVue });
//       expect(form.vm.checked).toBe("");
//       const radio = form.find("input");
//       expect(radio.isVisible()).toBe(true);

//       radio.element.value = "helloWorld";
//       radio.trigger("change");
//       await localVue.nextTick();
//       expect(form.vm.checked).toBe("helloWorld");
//     });
//   });

//   describe("with single Checkbox", () => {
//     it("supports v-model", async () => {
//       const localVue = createLocalVue();
//       const Parent = localVue.extend({
//         template: `
//         <FdFormItem>
//           <FdCheckbox value="helloWorld" v-model="checked" />
//         </FdFormItem>
//         `,
//         data: () => ({ checked: false }),
//         components: { FdFormItem, FdCheckbox }
//       });
//       const form = mount(Parent, { localVue });
//       expect(form.vm.checked).toBe(false);
//       const checkbox = form.find(FdCheckbox);
//       expect(checkbox.isVisible()).toBe(true);
//       checkbox.trigger("click");
//       await localVue.nextTick();
//       expect(form.vm.checked).toBe(true);
//     });
//   });

//   describe("with multiple Checkboxes", () => {
//     it("supports v-model", async () => {
//       const localVue = createLocalVue();
//       const Parent = localVue.extend({
//         template: `
//         <FdFormItem>
//           <FdCheckbox value="check1" v-model="checked" />
//           <FdCheckbox value="check2" v-model="checked" />
//           <FdCheckbox value="check3" v-model="checked" />
//           <FdCheckbox value="check4" v-model="checked" />
//         </FdFormItem>
//         `,
//         data() {
//           return {
//             checked: []
//           };
//         },
//         components: { FdFormItem, FdCheckbox }
//       });
//       const form = mount(Parent, { localVue });
//       expect(form.vm.checked).toHaveLength(0);
//       const checkboxes = form.findAllComponents(FdCheckbox);
//       expect(checkboxes).toHaveLength(4);
//       const expectedValues = [];
//       expect(form.vm.checked).toEqual([]);
//       for (const checkbox of checkboxes.wrappers) {
//         const value = checkbox.vm.value;
//         checkbox.trigger("click");
//         expectedValues.push(value);
//         expect(form.vm.checked).toEqual(expectedValues);
//       }
//     });
//   });
// });
