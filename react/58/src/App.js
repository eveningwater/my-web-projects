import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './app.css';
import { Tree, Button, Modal, Input, message } from 'antd';
const _treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'sss',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
const ModalInput = (props) => {
  const [text, setText] = useState("");
  const onChangeHandler = (e) => {
    setText(e.target.value);
    props.onChange && props.onChange(e.target.value);
  }
  return (
    <Input placeholder="请输入节点的内容" value={text} onChange={onChangeHandler} />
  )
}
const Demo = () => {
  const [treeData, setTreeData] = useState(_treeData);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectValue, setSelectValue] = useState([]);
  const onSelect = (selectedKeys, info) => {
    setSelectValue(selectedKeys);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  const onAddTreeNodeHandler = () => {
    let value = "";
    Modal.confirm({
      title: "新增节点",
      content: (
        <ModalInput onChange={(text) => value = text} />
      ),
      onOk: () => {
        const treeDataList = [...treeData];
        if (selectValue.length) {
          const findTree = (data) => {
            data.forEach(item => {
              if (item.key === selectValue[0]) {
                if (!Array.isArray(item.children)) {
                  item.children = [];
                }
                //0-0-0
                //1-0-0
                item.children.push({
                  title: value,
                  key: parseInt(item.key.slice(0, 1)) + 1 + item.key.slice(1),
                  children: []
                });
              } else {
                if (Array.isArray(item.children) && item.children.length) {
                  findTree(item.children);
                }
              }
            })
          }
          findTree(treeDataList);
        } else {
          const lastKey = treeData[treeData.length - 1].key;
          treeDataList.push({
            title: value,
            key: parseInt(lastKey.slice(0, 1)) + 1 + '-' + lastKey.slice(1),
            children: []
          });
        }
        setTreeData(treeDataList);
      }
    })
  }
  const onDeleteTreeNodeHandler = () => {
    if (!selectValue.length) {
      return message.warning("请先选择节点!");
    }
    Modal.confirm({
      title: "删除节点",
      content: "确定要删除该节点吗?",
      onOk: () => {
        setDeleteLoading(true);
        const treeDataList = [...treeData];
        const findTree = (data) => {
          data.forEach((item,index) => {
            if (item.key === selectValue[0]) {
               data.splice(index,1);
            } else {
              if (Array.isArray(item.children) && item.children.length) {
                findTree(item.children);
              }
            }
          })
        }
        setTimeout(() => {
          findTree(treeDataList);
          setTreeData(treeDataList);
          setDeleteLoading(false);
          setSelectValue([]);
        },2000)
      }
    })
  }
  return (
    <div>
      <ul>
        <li>实现单节点的新增，通过弹窗实现节点title的输入；<br />未选择节点时新增为根节点，选择节点时新增为其子节点；</li>
        <li>实现节点的删除，删除前弹窗确认<br />未选择节点时提示 先选择节点；</li>
        <li>附加:</li>
        <li>
          &nbsp;&nbsp;&nbsp;&nbsp;新增时判断是否已存在该title，如果存在则提示错误并要求重新输入
        </li>
        <li>
          &nbsp;&nbsp;&nbsp;&nbsp;删除弹窗点击确定后延迟2秒删除，等待期间确定按钮为Loading状态
        </li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;支持同时删除多个节点</li>
      </ul>
      <Tree
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']} 
        onSelect={onSelect}
        treeData={treeData}
      />
      <Button onClick={onAddTreeNodeHandler}>新增</Button>
      <Button loading={deleteLoading} onClick={onDeleteTreeNodeHandler}>删除</Button>
    </div>
  );
};

export default Demo;