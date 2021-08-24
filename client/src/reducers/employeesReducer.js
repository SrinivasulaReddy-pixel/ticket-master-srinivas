const initialState = []

const employeesReducer = (state = initialState, action)=>{
    switch (action.type) {
      case 'SET_EMPLOYEES': {
        return [...action.payload];
        //return [].concat(state,action.payload)
      }
      case 'REMOVE_EMPLOYEE': {
        return state.filter((emp) => emp._id !== action.payload);
      }
      case 'ADD_EMPLOYEE': {
        return [...state, action.payload];
      }
      case 'UPDATE_EMPLOYEE': {
        return state.map((emp) => {
          if (emp._id === action.payload._id) {
            return { ...emp, ...action.payload };
          } else {
            return { ...emp };
          }
        });
      }
      // case 'UPDATE_EMPLOYEE_DEPARTMENT': {
      //   return state.map((employee) => {
      //     if (employee.department._id === action.payload._id) {
      //       employee.department = action.payload._id;
      //       return { ...employee };
      //     } else {
      //       return { ...employee };
      //     }
      //   });
      // }

      default: {
        return [...state];
      }
    }
}

export default employeesReducer
