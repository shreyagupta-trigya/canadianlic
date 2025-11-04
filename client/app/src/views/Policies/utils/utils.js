import {getallusers} from './Api'


export const findNameByIdUsers=async (id)=>{
  console.log("This is users ID",id)
const users=await getallusers();
// console.log("this is users",users)
console.log("users.filter(users=>users.ROWID==id).firstName",users.filter(users=>users.ROWID==id)[0].firstName);
return users.filter(users=>users.ROWID==id)[0].firstName;

} 



export const handleOptionChange=(event,dataField,dataFieldOptions) =>{
    event.preventDefault();
    const selectedOption = event.target.value;
    console.log("Selected Option:", selectedOption);
    
    // Append the selected option to the formData array
    dataField.push(selectedOption);
    console.log("Selected Options:",dataField);
  
    // Remove the selected option from the options list
    const indexToRemove = dataFieldOptions.indexOf(selectedOption);
    if (indexToRemove !== -1) {
        dataFieldOptions.splice(indexToRemove, 1);
    }
}


export const createParseData=(formDataRefs,keysToIgnore)=>{

    let requestData={};

    for (const key in formDataRefs) {

        if (!keysToIgnore.includes(key)) {

        if (Array.isArray(formDataRefs[key].value)) {
          // If the property is an array, convert it to an array of objects
          requestData[key] = formDataRefs[key].value.map((item) => ({
            ...item,
          }));
        } else {
          // Otherwise, directly assign the value
          requestData[key] = formDataRefs[key].value;
        }
      } 
      else {
        requestData[key] = formDataRefs[key].value.map((item)=>item);
      }


    }

    return requestData;
}