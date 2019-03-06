import { mount } from "@vue/test-utils";
import Breadcrumb from "../Breadcrumb.vue";
import BreadcrumbItem from "../../BreadcrumbItem/BreadcrumbItem.vue";
import { VNode, CreateElement } from "vue";

describe("Breadcrumb", () => {
  const createItemElement = (h: CreateElement, index: number) => {
    return h(
      BreadcrumbItem,
      {
        attrs: {
          href: `#item${index}`
        }
      },
      `Item ${index}`
    );
  };

  const wrapper = mount(Breadcrumb, {
    slots: {
      default: {
        render(h: CreateElement): VNode {
          const itemElement1 = createItemElement(h, 1);
          const itemElement2 = createItemElement(h, 2);
          return h("div", {}, [itemElement1, itemElement2]);
        }
      }
    }
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("has correct number of breadcrumb items", () => {
    expect(wrapper.findAll("li")).toHaveLength(2);
  });
});
