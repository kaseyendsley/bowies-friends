import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllColors, getAllSexes, getCatById, updateCat } from "../services/CatService.jsx";
import "./CatForm.css"; // reuse the same styles

export const CatEdit = () => {
  const { id } = useParams(); // cat id comes from url
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    colorId: "",
    sexId: "",
    specialMarkings: "",
    zipCode: "",
    friendly: null,
    knownStreets: "",
    notes: "",
    url: "",
  });

  const [colors, setColors] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAllColors().then(setColors);
    getAllSexes().then(setSexes);
    getCatById(id).then((cat) => {
      setFormData({
        name: cat.name || "",
        age: cat.age || "",
        colorId: cat.colorId || "",
        sexId: cat.sexId || "",
        specialMarkings: cat.specialMarkings || "",
        zipCode: cat.zipCode || "",
        friendly: cat.friendly,
        knownStreets: cat.knownStreets || "",
        notes: cat.notes || "",
        url: cat.url || "",
        createdByUserId: cat.createdByUserId || null, 
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "A name is required!";
    if (!formData.age) newErrors.age = "Age is required - it's okay to guess!";
    if (!formData.colorId) newErrors.colorId = "Color is required!";
    if (!formData.sexId) newErrors.sexId = "Sex is required - it's okay to guess!";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required!";
    if (formData.friendly === null) newErrors.friendly = "This field is required!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...formData,
      id: parseInt(id),
      age: parseFloat(formData.age),
      zipCode: parseInt(formData.zipCode),
      colorId: parseInt(formData.colorId),
      sexId: parseInt(formData.sexId),
    };

    updateCat(payload).then(() => {
      navigate(`/cat-details/${id}`);
    });
  };

  return (
    <div className="cat-form-container">
      <form className="cat-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">Edit Cat</h2>

        <div className="form-group">
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
        </div>

        <div className="form-group">
          <label>Age (in years):
            <input type="number" name="age" value={formData.age} onChange={handleChange} step="0.1" />
            {errors.age && <span className="error">{errors.age}</span>}
          </label>
        </div>

        <div className="form-group">
          <label>Color:
            <select name="colorId" value={formData.colorId} onChange={handleChange}>
              <option value="">Select color</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>{color.color}</option>
              ))}
            </select>
            {errors.colorId && <span className="error">{errors.colorId}</span>}
          </label>
        </div>

        <div className="form-group">
          <label>Sex:
            <select name="sexId" value={formData.sexId} onChange={handleChange}>
              <option value="">Select sex</option>
              {sexes.map((sex) => (
                <option key={sex.id} value={sex.id}>{sex.sex}</option>
              ))}
            </select>
            {errors.sexId && <span className="error">{errors.sexId}</span>}
          </label>
        </div>

        <div className="form-group">
          <label>Special Markings:
            <input type="text" name="specialMarkings" value={formData.specialMarkings} onChange={handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label>Zip Code:
            <input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
          </label>
        </div>

        <div className="form-group">
          <fieldset className="friendly-fieldset">
            <legend>Friendly?</legend>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="friendly"
                  value={true}
                  checked={formData.friendly === true}
                  onChange={() => setFormData({ ...formData, friendly: true })}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="friendly"
                  value={false}
                  checked={formData.friendly === false}
                  onChange={() => setFormData({ ...formData, friendly: false })}
                />
                No
              </label>
            </div>
            {errors.friendly && <span className="error">{errors.friendly}</span>}
          </fieldset>
        </div>

        <div className="form-group">
          <label>Known Streets:
            <input type="text" name="knownStreets" value={formData.knownStreets} onChange={handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label>Notes:
            <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </label>
        </div>

        <div className="form-group">
          <label>Image URL:
            <input type="text" name="url" value={formData.url} onChange={handleChange} />
          </label>
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};
