const API = "https://bowies-friends.onrender.com";

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API}/caretakers?email=${email}`);
  return await response.json();
};

export const createUser = (customer) => {
  return fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};
