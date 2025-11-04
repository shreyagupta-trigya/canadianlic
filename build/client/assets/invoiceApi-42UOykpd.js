import{bz as a}from"./index-Ben2u2GE.js";const c=async e=>(await a.post("/finance/create-invoice",e)).data,s=async e=>(await a.delete(`/finance/delete-invoice/${e}`)).data;export{c,s as d};
