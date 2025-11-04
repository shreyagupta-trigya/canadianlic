import{d as o,ah as n,bp as p,ax as b,ay as h,az as x,aA as m,aB as v}from"./index-Ben2u2GE.js";function S({value:r,onChange:i,name:l,className:u="",component:c=p,readOnly:s=!1}){const[g,t]=o.useState(!1),[d,a]=o.useState(!1);return n.jsx(c,{name:l,value:r||"N/A",readOnly:s,onClick:e=>e.stopPropagation(),onChange:e=>i(e),onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),onFocus:()=>a(!0),onBlur:()=>a(!1),className:`
                mb-2 h-9 text-base bg-transparent transition-all
                border 
                ${g&&!s||d?"border-input ring-1 ring-ring":"border-transparent"}
                ${!s&&"border-slate-100 ring-1 ring-ring"}
                focus:border-input focus:ring-1 focus:ring-ring focus:outline-none
                ${u}
            `})}function j({value:r,onChange:i,options:l=[],className:u="",name:c,readOnly:s=!1}){const[g,t]=o.useState(!1),[d,a]=o.useState(!1);return n.jsx("div",{onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),className:`mb-2 transition-all w-full ${u}`,children:n.jsxs(b,{value:r,onValueChange:e=>i({target:{name:c,value:e},preventDefault:()=>{}}),onOpenChange:e=>a(e),children:[n.jsx(h,{className:`
            h-9 text-sm bg-transparent w-full
            border ${g&&!s||d?"border-input ring-1 ring-ring":"border-transparent"}
             ${!s&&"border-slate-100 ring-1 ring-ring"}
            focus:border-input focus:ring-1 focus:ring-ring focus:outline-none
          `,children:n.jsx(x,{placeholder:"Select an option"})}),n.jsx(m,{children:l.map((e,f)=>n.jsx(v,{value:e.value,children:e.label},f))})]})})}export{S as E,j as a};
