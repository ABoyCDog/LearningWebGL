import SvgIcon from "@/components/svg-icon/index.vue";
import SvgHover from "@/components/svg-hover/index.vue";

declare module "vue" {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon;
    SvgHover: typeof SvgHover;
  }
}

export {};
