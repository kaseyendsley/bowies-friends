const API = "https://bowies-friends-api.onrender.com";

export const getAllCats = () => {
  return fetch(`${API}/cats?_expand=color&_expand=sex`).then(
    (res) => res.json()
  );
};

export const getCatById = (catId) => {
  return fetch(`${API}/cats/${catId}?_expand=color&_expand=sex`).then((res) =>
    res.json()
  );
};

export const createCat = (cat) => {
  return fetch(`${API}/cats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  }).then((res) => res.json());
};

export const getAllColors = async () => {
  const res = await fetch(`${API}/colors`);
  return await res.json();
};

export const getAllSexes = async () => {
  const res = await fetch(`${API}/sexes`);
  return await res.json();
};

export const deleteCat = async (id) => {
  const res = await fetch(`${API}/cats/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete cat.");
  }
};

export const updateCat = (cat) => {
  return fetch(`${API}/cats/${cat.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  });
};

export const getCaretakerCats = async () => {
  const res = await fetch(`${API}/caretakerCats?_expand=caretaker`);

  if (!res.ok) {
    throw new Error("Failed to fetch caretakerCats.");
  }

  return await res.json();
};

export const addCaretakerCat = async (caretakerId, catId) => {
  const res = await fetch(`${API}/caretakerCats`, {
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
  // fetch the relationship
  const res = await fetch(
    `${API}/caretakerCats?caretakerId=${caretakerId}&catId=${catId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch caretaker-cat relationship.");
  }

  const relationships = await res.json();

  // delete the first (and only) matching record
  if (relationships.length > 0) {
    const relationshipId = relationships[0].id;

    const deleteRes = await fetch(
      `${API}/caretakerCats/${relationshipId}`,
      { method: "DELETE" }
    );

    if (!deleteRes.ok) {
      throw new Error("Failed to delete caretaker-cat relationship.");
    }
  }
};

export const deleteCaretakerCatByCatId = async (catId) => {
  const res = await fetch(`${API}/caretakerCats?catId=${catId}`);
  const caretakerCats = await res.json();

  // Delete each one
  for (const relationship of caretakerCats) {
    await fetch(`${API}/caretakerCats/${relationship.id}`, {
      method: "DELETE",
    });
  }
};
