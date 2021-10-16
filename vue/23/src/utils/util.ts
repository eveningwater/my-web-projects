export const getTriangleStyle = (direction:string,w:number,h:number,color:string) => {
     const style = {
         "top":{
             "borderColor":`transparent transparent ${color} transparent`,
             "borderWidth":`0 ${w / 2}px ${h}px ${w / 2}px`
         },
         "bottom":{
            "borderColor":`${color} transparent transparent transparent`,
            "borderWidth":`${h}px ${w / 2}px 0 ${w / 2}px`
         },
         "left":{
            "borderColor":`transparent ${color} transparent transparent`,
            "borderWidth":`${h / 2}px ${w}px ${h / 2}px 0`
         },
         "right":{
            "borderColor":`transparent transparent transparent ${color}`,
            "borderWidth":`${h / 2}px 0 ${h / 2}px  ${w}px`
         }
     }
     return style[direction];
}