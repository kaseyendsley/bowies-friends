
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail } from "../services/UserService"
import "./Login.css"


export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()
  
    const handleLogin = (e) => {
      e.preventDefault()
  
      getUserByEmail(email).then((foundUsers) => {
        if (foundUsers.length === 1) {
          const employee = foundUsers[0]
          localStorage.setItem(
            "bowie_user",
            JSON.stringify({
              id: employee.id,
              isAdmin: employee.isAdmin,
            })
          )
  
          navigate("/")
        } else {
          window.alert("Invalid login")
        }
      })
    }
  
    return (
      <main className="container-login">
        <section>
          <form className="form-login" onSubmit={handleLogin}>
            <h1>Bowie's Friends</h1>
            <h3>Please sign in:</h3>
            <fieldset>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => set(evt.target.value)}
                  className="form-control"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <button className="login-btn btn-info" type="submit">
                  Sign in
                </button>
              </div>
            </fieldset>
          </form>
        </section>
        <section>
          <Link to="/register">Not a member yet?</Link>
        </section>
      </main>
    )
  }
  