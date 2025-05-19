
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

export const getCaretakerCats = async () => {
  const res = await fetch("http://localhost:8088/caretakerCats?_expand=caretaker");

  if (!res.ok) {
    throw new Error("Failed to fetch caretakerCats.");
  }

  return await res.json();
};


export const addCaretakerCat = async (caretakerId, catId) => {
  const res = await fetch("http://localhost:8088/caretakerCats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ caretakerId, catId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add caretaker-cat relationship.");
  }

  return await res.json();
};

export const removeCaretakerCat = async (caretakerId, catId) => {
  // First, fetch the specific relationship
  const res = await fetch(
    `http://localhost:8088/caretakerCats?caretakerId=${caretakerId}&catId=${catId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch caretaker-cat relationship.");
  }

  const relationships = await res.json();

  // Then delete the first (and likely only) matching record
  if (relationships.length > 0) {
    const relationshipId = relationships[0].id;

    const deleteRes = await fetch(
      `http://localhost:8088/caretakerCats/${relationshipId}`,
      { method: "DELETE" }
    );

    if (!deleteRes.ok) {
      throw new Error("Failed to delete caretaker-cat relationship.");
    }
  }
};
