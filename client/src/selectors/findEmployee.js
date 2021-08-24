export const findEmployee = (employees, id) => {
  return employees.find((emp) => emp._id === id);
};
