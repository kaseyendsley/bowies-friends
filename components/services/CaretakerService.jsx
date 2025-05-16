
export const getAllCaretakers = () => {
    return fetch("http://localhost:8088/caretakers")
      .then((res) => res.json());
  };
  
  export const getCaretakerById = (id) => {
    return fetch(`http://localhost:8088/caretakers/${id}?_embed=cats`)
      .then((res) => res.json());
  };
  
  export const getCatsForCaretaker = (caretakerId) => {
    return fetch(`http://localhost:8088/caretakerCats?caretakerId=${caretakerId}&_expand=cat`)
      .then((res) => res.json());
  };

  export const getCaretakerByEmail = async (email) => {
    const res = await fetch(`http://localhost:8088/caretakers?email=${email}`);
    const data = await res.json();
    return data[0]; // assuming it returns an array??
  };
  

  export const createCaretaker = (newCaretaker) => {
  return fetch("http://localhost:8088/caretakers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCaretaker)
  }).then(res => res.json())
}

