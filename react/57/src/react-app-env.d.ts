/// <reference types="react-scripts" />
type ResSuccessType = {
  trans_result: Array<{ dst: string; src: string }>;
  from: string;
  to: string;
};
type ResErrorType = {
  error_code: string;
  error_msg: string;
};
type ResType = ResSuccessType | ResErrorType;
declare interface Window {
  getTransLateCallback?: (v: ResType) => void;
}
interface PropType {
  onChangeWord: Function;
  propWord: string;
}
