import { PropType } from "vue";
import { GlobalDataKey } from "../utils/const";

export const commonPropKey = {
    type: String as PropType<GlobalDataKey>,
    default: "en"
}