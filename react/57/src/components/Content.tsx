import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import $message from "ew-message";

const Content: FC<PropType> = (props: PropType) => {
  const [word, setWord] = useState(props.propWord);
  const [result, setResult] = useState("");
  const onChangeHandler = (e: ChangeEvent) => {
    const v = (e.target as HTMLTextAreaElement).value.trim();
    setWord(v);
    props.onChangeWord && props.onChangeWord(v);
  };
  const getTransLateCallback = useCallback((res: ResType) => {
    // Extract取出对应的类型
    const resError = res as Extract<ResType, ResErrorType>;
    // Exclude排除对应的类型
    const resSuccess = res as Exclude<ResType, ResErrorType>;
    if (resError.error_code) {
      return $message.error(resError.error_msg);
    }
    setResult(resSuccess.trans_result[0].dst);
  }, []);
  useEffect(() => {
    window.getTransLateCallback = getTransLateCallback;
    if (word !== props.propWord) {
      setWord(props.propWord);
    }
  }, [getTransLateCallback, word, props.propWord]);
  return (
    <section className="rt-content">
      <textarea
        className="rt-textarea"
        value={word}
        onChange={onChangeHandler}
      ></textarea>
      <textarea className="rt-textarea" value={result} disabled></textarea>
    </section>
  );
};
export default Content;
