import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createCaretaker, getCaretakerByEmail } from "../services/CaretakerService"

export const Register = () => {
  const [caretaker, setCaretaker] = useState({
    name: "",
    zipCode: "",
    streetsServed: "",
    phoneNumber: "",
    specialSkills: "",
    email: "",
    url: "",
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!caretaker.name.trim()) newErrors.name = "Name is required!"
    if (!caretaker.zipCode) newErrors.zipCode = "Zip Code is required!"
    if (!caretaker.streetsServed.trim()) newErrors.streetsServed = "Please enter the streets you serve!"
    if (!caretaker.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required!"
    if (!caretaker.email.trim()) newErrors.email = "Email is required!"
    return newErrors
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setCaretaker((prev) => ({ ...prev, [id]: value }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    getCaretakerByEmail(caretaker.email)
      .then((existingUser) => {
        if (existingUser) {
          window.alert("An account with that email already exists.")
        } else {
          const newCaretaker = {
            ...caretaker,
            zipCode: parseInt(caretaker.zipCode),
            active: true,
            isLeadCaretaker: false,
            isAdmin: false,
          }

          createCaretaker(newCaretaker).then((createdUser) => {
            if (createdUser.id) {
              localStorage.setItem(
                "bowie_user",
                JSON.stringify({
                  id: createdUser.id,
                  isAdmin: createdUser.isAdmin
                })
              )
              navigate("/")
            }
          })
        }
      })
      .catch((error) => {
        console.error("Failed to check email:", error)
        window.alert("Something went wrong checking the email. Please try again.")
      })
  }

  return (
    <main style={{ textAlign: "center" }}>
      
        <div className="register-intro">
        <h1>Yay, New Friends!</h1>
        <h4>Please register to become a caretaker & gain access to Bowie's Friends!</h4>
        </div>
        <form className="form-login" onSubmit={handleRegister}>
        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={caretaker.name}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="number"
              id="zipCode"
              className="form-control"
              placeholder="Enter your Zip Code"
              value={caretaker.zipCode}
            />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="text"
              id="streetsServed"
              className="form-control"
              placeholder="Which streets do you serve?"
              value={caretaker.streetsServed}
            />
            {errors.streetsServed && <span className="error">{errors.streetsServed}</span>}
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="text"
              id="phoneNumber"
              className="form-control"
              placeholder="Phone number"
              value={caretaker.phoneNumber}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="text"
              id="specialSkills"
              className="form-control"
              placeholder="Special skills (optional)"
              value={caretaker.specialSkills}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              value={caretaker.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={handleInputChange}
              type="text"
              id="url"
              className="form-control"
              placeholder="Photo URL (optional, but highly recommended!)"
              value={caretaker.url}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <button className="register-btn" type="submit">
              Register as Caretaker
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
