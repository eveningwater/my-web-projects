import './MultiCheck.css';

import React, { useState } from 'react';
import {FC} from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { chunk } from '../util';
export type Option = {
  label: string,
  value: string,
  id?:string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options. Assume no duplicated labels or values
 * @param {string[]} values - If `undefined`, makes the component in uncontrolled mode with no options checked;
 *                            if not undefined, makes the component to controlled mode with corresponding options checked.
 *                            Assume no duplicated values.
 * @param {number} columns - default value is 1, and assume it can only be [1, 2, ... 9]
 * @param {Function} onChange - if not undefined, when checked options are changed, they should be passed to outside;
 *                              if undefined, the options can still be selected, but won't notify the outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[]
  onChange?: (options: Option[]) => void,
}

export const MultiCheck: FC<Props> = (props): JSX.Element => {
  const { label,options,columns,values } = props;
  const [selectValues,setSelectValues] = useState(Array.isArray(values) ? values : []);
  const [renderColumns,setRenderColumns] = useState<unknown []>([]);
  if(typeof columns === "number"){
    if(options.findIndex(item => item.id === "all") === -1){
        options.unshift({ label:"selectAll",value:"",id:"all" });
    }
    let arr = chunk(options,Math.floor(options.length / columns));
    // The two values are different and then update it
    if(JSON.stringify(renderColumns) !== JSON.stringify(arr)){
      setRenderColumns(arr);
    }
  }
  // Determine if it is selected
  const isChecked = (v:Option) => {
    if(v.id === "all"){
        return Array.isArray(selectValues) && selectValues.length === options.length - 1;
    }
     if(Array.isArray(selectValues) && selectValues.length){
        return selectValues.includes(v.value);
     }
     return false;
  }
  // When checked it and update the checked values
  const onChangeHandler = (option:Option,v:string) => {
      let newOptions = [...selectValues];
      if(option.id === "all"){
        newOptions = v ? options.filter(item => !item.id).map(item => item.value) : [];
      }else{
        if(v && !newOptions.includes(option.value)){
          newOptions.push(option.value)
        }
        if(!v && newOptions.includes(option.value)){
          newOptions.splice(newOptions.indexOf(option.value),1);
        }
      }
      setSelectValues(newOptions);
      const passOptions = options.filter(item => !item.id).reduce((res:Option [],item:Option) => {
          if(newOptions.indexOf(item.value) > -1){
            res.push(item);
          }
          return res;
      },[]);
      props.onChange && props.onChange(passOptions);
  } 
  return <div className='MultiCheck'>
     <header className="mul-header">
        { label }
     </header>
     <div className="mul-container">
        <div className="mul-content">
            {
              renderColumns.map((item,index) => (
                  <div className="mul-column" key={String(item) + index } style={{ width:Math.ceil(100 / (columns || 1))+ "%"}}>
                      {
                         Array.isArray(item) ? item.map((option:Option,optionIndex:number) => 
                            <CheckBox 
                              value={isChecked(option)}
                              key={String(option) + optionIndex } 
                              onChange={onChangeHandler.bind(null,option)}
                            >{ option.label }</CheckBox>
                         ) : null
                      }
                  </div>
              ))
            }
        </div>
     </div>
  </div>
}
