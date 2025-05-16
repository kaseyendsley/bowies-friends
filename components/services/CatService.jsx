
export const getAllCats = () => {   
  return fetch("http://localhost:8088/cats?_expand=color&_expand=sex")
    .then((res) => res.json());
};


export const getCatById = (catId) => {
  return fetch(`http://localhost:8088/cats/${catId}?_expand=color&_expand=sex`)
    .then((res) => res.json());
};

export const createCat = (cat) => {
    return fetch("http://localhost:8088/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cat),
    }).then((res) => res.json())
  }

  export const getAllColors = async () => {
    const res = await fetch("http://localhost:8088/colors");
    return await res.json();
  };
  
  export const getAllSexes = async () => {
    const res = await fetch("http://localhost:8088/sexes");
    return await res.json();
  };


  export const deleteCat = async (id) => {
  const res = await fetch(`http://localhost:8088/cats/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete cat.");
  }
};

export const updateCat = (cat) => {
  return fetch(`http://localhost:8088/cats/${cat.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  });
};
