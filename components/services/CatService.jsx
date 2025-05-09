// export const getAllCats = () => {   
//     return fetch("http://localhost:8088/cats").then((res) => res.json())
//   }
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

export const updateCat = (cat) => {
    return fetch(`http://localhost:8088/cats/${cat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cat),
    }).then((res) => res.json())
  }
  
export const deleteCat = (catId) => {
    return fetch(`http://localhost:8088/cats/${catId}`, {
      method: "DELETE",
    }).then((res) => res.json())
  }

export const getCatByUserId = (userId) => {
    return fetch(`http://localhost:8088/cats?userId=${userId}`).then((res) =>
      res.json()
    )
  }