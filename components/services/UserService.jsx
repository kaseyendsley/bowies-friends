export const getUserByEmail = async (email) => {
  const response = await fetch(`http://localhost:8088/caretakers?email=${email}`);
  return await response.json();
};

export const createUser = (customer) => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }).then((res) => res.json())
  }
  