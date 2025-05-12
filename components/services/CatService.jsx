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


export const getCatByUserId = (userId) => {
    return fetch(`http://localhost:8088/cats?userId=${userId}`).then((res) =>
      res.json()
    )
  }


  export const addNewCat = async (catData) => {
    const response = await fetch("http://localhost:8088/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(catData),
    });
    return await response.json();
  };

  export const getAllColors = async () => {
    const res = await fetch("http://localhost:8088/colors");
    return await res.json();
  };
  
  export const getAllSexes = async () => {
    const res = await fetch("http://localhost:8088/sexes");
    return await res.json();
  };
  
  