import createPopBox from "./ewPopBox";
export interface PopBoxOptions {
  title?: string;
  content: string;
  sure?: (i?: InstanceType<typeof createPopBox>, e?: Event) => void;
  cancel?: (i?: InstanceType<typeof createPopBox>, e?: Event) => void;
  afterClose?: (i?: InstanceType<typeof createPopBox>, e?: Event) => void;
  showCancel?: boolean;
  isClickModal?: boolean;
  closeTime?: number;
  cancelText?: string;
  sureText?: string;
  container?: HTMLElement;
  showClose?: boolean;
  rootClassName?: string;
  footer?: string;
  center?: boolean;
}