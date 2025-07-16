import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCaretakerById, updateCaretaker } from "../services/CaretakerService";
import "./CaretakerEdit.css";

export const CaretakerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null); 
  const [formData, setFormData] = useState({
    zipCode: "",
    streetsServed: "",
    phoneNumber: "",
    specialSkills: "",
    active: null,
    email: "",
    url: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCaretakerById(id).then((caretaker) => {
      setOriginalData(caretaker); 

      setFormData({
        zipCode: caretaker.zipCode || "",
        streetsServed: caretaker.streetsServed || "",
        phoneNumber: caretaker.phoneNumber || "",
        specialSkills: caretaker.specialSkills || "",
        active: caretaker.active,
        email: caretaker.email || "",
        url: caretaker.url || ""
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required!";
    if (formData.active === null) newErrors.active = "Please select Active status!";
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    return newErrors;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // exclude `cats` from originalData
  const { cats, ...safeOriginalData } = originalData;

  const updatedCaretaker = {
    ...safeOriginalData,       // keep the rest of the original fields
    ...formData,               // overwrite with the edited form fields
    zipCode: parseInt(formData.zipCode),  // make sure it's a number
  };

  updateCaretaker(parseInt(id), updatedCaretaker).then(() => {
    navigate(`/caretaker-details/${id}`);
  });
};

  if (!originalData) return <p>Loading...</p>;

  return (
    <div className="caretaker-form-container">
      <form className="caretaker-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">Edit Your Profile</h2>

        <div className="form-group">
          <label>Zip Code:
            <input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
          </label>
        </div>

        <div className="form-group">
          <label>Streets Served:
            <input type="text" name="streetsServed" value={formData.streetsServed} onChange={handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label>Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label>Special Skills:
            <input type="text" name="specialSkills" value={formData.specialSkills} onChange={handleChange} />
          </label>
        </div>

        <div className="form-group">
          <fieldset className="active-fieldset">
            <legend>Currently Active?</legend>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="active"
                  value={true}
                  checked={formData.active === true}
                  onChange={() => setFormData({ ...formData, active: true })}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="active"
                  value={false}
                  checked={formData.active === false}
                  onChange={() => setFormData({ ...formData, active: false })}
                />
                No
              </label>
            </div>
            {errors.active && <span className="error">{errors.active}</span>}
          </fieldset>
        </div>

        <div className="form-group">
          <label>Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
        </div>

        <div className="form-group">
          <label>Photo URL:
            <input type="text" name="url" value={formData.url} onChange={handleChange} />
          </label>
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};
