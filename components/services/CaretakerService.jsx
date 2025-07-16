const API = "https://bowies-friends.onrender.com";

export const getAllCaretakers = () => {
  return fetch(`${API}/caretakers`)
    .then((res) => res.json());
};

export const getCaretakerById = (id) => {
  return fetch(`${API}/caretakers/${id}?_embed=cats`)
    .then((res) => res.json());
};

export const getCatsForCaretaker = (caretakerId) => {
  return fetch(`${API}/caretakerCats?caretakerId=${caretakerId}&_expand=cat`)
    .then((res) => res.json());
};

export const getCaretakerByEmail = async (email) => {
  const res = await fetch(`${API}/caretakers?email=${email}`);
  const data = await res.json();
  return data[0]; // assuming it returns an array
};

export const createCaretaker = (newCaretaker) => {
  return fetch(`${API}/caretakers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCaretaker)
  }).then(res => res.json());
};

export const deleteCaretaker = (id) => {
  return fetch(`${API}/caretakers/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("bowie_token")}`
    }
  });
};

export const updateCaretaker = async (id, updatedCaretaker) => {
  const response = await fetch(`${API}/caretakers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("bowie_token")}`,
    },
    body: JSON.stringify(updatedCaretaker),
  });

  if (!response.ok) {
    throw new Error("Failed to update caretaker");
  }

  return await response.json();
};
