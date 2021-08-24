const initialState = []

const departmentsReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'SET_DEPARTMENTS':{
            return [...action.payload]
        }
        case 'REMOVE_DEPARTMENT':{
            return state.filter(dept => dept._id !== action.payload)
        }
        case 'ADD_DEPARTMENT':{
            return [...state, action.payload]
        }
        case 'UPDATE_DEPARTMENT':{
            return state.map(dept =>{
                if(dept._id === action.payload._id){
                    return {...dept, ...action.payload}
                }
                else{
                    return {...dept}
                }
            })
        }
        default :{
            return [...state]
        }
    }
}

export default departmentsReducer