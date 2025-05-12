
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