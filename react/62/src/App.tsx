import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import HighLightCode from './components/HighLightCode';
import CodeTooltip from './components/CodeTooltip';
import { debounce, isEmptyObject } from './utils';
import { testStyle } from './test';

const App = () => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [position, setPosition] = useState<{ left?: number, top?: number }>({});
  const [content, setContent] = useState('');
  const [isPanel, setIsPanel] = useState(true);
  useEffect(() => {
    if (codeRef.current) {
      const selectorElements = codeRef.current.querySelectorAll('span.selector');
      selectorElements.forEach((el) => {
        el.addEventListener('mouseenter', debounce(() => {
          const { left, top, width, height } = el.getBoundingClientRect();
          const leftValue = left + width + 10,
            topValue = top - height;
          if (position.left !== leftValue || position.top !== topValue) {
            setPosition({ left: Math.min(leftValue, window.innerWidth), top: Math.min(topValue, window.innerHeight) });
          }
          if (el.textContent !== content && el.textContent) {
            setContent(el.textContent);
          }
        }, 200))
      });
    }
  }, [])
  const visible = useMemo(() => !isEmptyObject(position), [position])
  return (
    <div className="app">
      <HighLightCode
        code={testStyle}
        ref={codeRef}
        onMouseLeave={debounce((e) => {
          if (!isPanel) {
            setPosition({});
            setContent('');
          }
        }, 200)}
      />
      <CodeTooltip
        code={content}
        visible={visible}
        style={position}
        onMouseEnter={() => setIsPanel(true)}
        onMouseLeave={() => setIsPanel(false)}
      />
    </div>
  );
};

export default App;
