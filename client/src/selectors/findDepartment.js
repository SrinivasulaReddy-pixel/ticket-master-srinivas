export const findDepartment =(departments, id)=>{
    return departments.find(dept => dept._id === id )
}