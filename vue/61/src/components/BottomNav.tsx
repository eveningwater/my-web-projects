import { defineComponent, PropType, toRefs } from "vue";
import "./bottomNav.scss";

export default defineComponent({
  props: {
    tabOptions: {
      type: Array as PropType<Record<string, string>[]>,
    },
    currentActive: {
      type: String as PropType<string>,
      default: "1",
    },
  },
  emits: ["on-tab-click"],
  setup(props, { emit }) {
    const { tabOptions, currentActive } = toRefs(props);
    const onTabClickHandler = (tab: Record<string, string>) => {
      emit("on-tab-click", tab);
    };
    return () => (
      <nav class="mtn-bottom-tab">
        <ul class="mtn-bottom-tab-ul">
          {tabOptions.value?.map((tab) => (
            <li
              key={tab.key}
              class={`mtn-bottom-tab-ul-li${
                currentActive.value === tab.key ? " active" : ""
              }`}
              onClick={() => onTabClickHandler(tab)}
            >
              <i class={`fas fa-${tab.icon}`}></i>
              <p class="mtn-bottom-tab-ul-li-text">{tab.text}</p>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
});
