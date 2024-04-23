import './App.css';
import { renderList } from './utils/data';
import { simpleJSXParser } from './utils/jsx-parser';
import CustomInput from './components/custom-input';
import CustomTag from './components/custom-tag';
import { Fragment, createElement, useEffect } from 'react';
import { createUUID } from './utils/uuid';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.min.css';

const components: Record<
  string,
  (props: Record<string, unknown>) => JSX.Element
> = {
  CustomInput,
  CustomTag
};
function App() {
  const renderItem = () => {
    const list = renderList?.map(item => simpleJSXParser(item.value));
    return list?.map(item => (
      <Fragment key={createUUID()}>
        {item?.map(com =>
          createElement('div', { key: createUUID(), className: 'row' }, [
            typeof com === 'string'
              ? com
              : createElement(components[com.type], {
                  ...com.props,
                  key: createUUID()
                })
          ])
        )}
      </Fragment>
    ));
  };
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <div className="container">
      <h2>代码如下:</h2>
      {renderList?.map(item =>
        createElement(
          'pre',
          {
            key: item.key,
            className: 'base-pre'
          },
          [
            createElement(
              'code',
              {
                key: createUUID(),
                className: 'base-code language-html language-html'
              },
              item.value
            )
          ]
        )
      )}
      <h2>渲染结果如下:</h2>
      {renderItem()}
    </div>
  );
}

export default App;
