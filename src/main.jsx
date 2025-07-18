
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import { BrowserRouter } from "react-router-dom"


const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(
    <BrowserRouter basename="/bowies-friends/">
        <App />
    </BrowserRouter>
)