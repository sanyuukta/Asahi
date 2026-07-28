// import { useState } from "react"
// import API from "../services/api"
// import { useNavigate } from "react-router-dom"

// function AdminLogin(){

// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")
// const navigate = useNavigate()

// const login = async (e)=>{
// e.preventDefault()

// if(!email || !password){
// alert("Enter email & password")
// return
// }

// try{

// const res = await API.post("/admin/login",{ email, password })

// localStorage.setItem("token", res.data.token)
// localStorage.setItem("user", JSON.stringify(res.data.user))

// alert("Login Success ✅")
// navigate("/admin")

// }catch{
// alert("Invalid credentials ❌")
// }
// }

// return(

// <form onSubmit={login} style={{padding:"40px"}}>

// <h2>Admin Login</h2>

// <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
// <br/><br/>

// <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
// <br/><br/>

// <button type="submit">Login</button>

// </form>
// )
// }

// export default AdminLogin

import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock } from "react-icons/fa"
import bgImage from "../assets/japanlogin.jpg"
import "./AdminLogin.css"

function AdminLogin(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")
const navigate = useNavigate()

const login = async (e)=>{
e.preventDefault()

if(!email || !password){
setError("Enter email & password ❌")
return
}

try{

const res = await API.post("/admin/login",{ email, password })

localStorage.setItem("token", res.data.token)
localStorage.setItem("user", JSON.stringify(res.data.user))

navigate("/admin")

}catch{
setError("Invalid credentials ❌")
}
}

return(

<div className="admin-login-page" style={{ backgroundImage: `linear-gradient(rgba(7, 11, 22, 0.65), rgba(7, 11, 22, 0.8)), url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
  <div className="admin-bg-glowing-orbs">
    <div className="orb orb-1"></div>
    <div className="orb orb-2"></div>
  </div>

  <form onSubmit={login} className="admin-login-box">

    <h2>Admin <span>Panel</span></h2>
    <p className="sub">Secure Access Portal</p>

    {error && <p className="error">{error}</p>}

    <div className="admin-input-wrapper">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <FaEnvelope className="admin-input-icon" />
    </div>

    <div className="admin-input-wrapper">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <FaLock className="admin-input-icon" />
    </div>

    <button type="submit">Access System</button>

  </form>

</div>

)
}

export default AdminLogin