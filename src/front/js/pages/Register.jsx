import React, {useState, useContext} from "react"
import { Context } from "../store/appContext"

const initialState = {
    lastname:"",
    email:"",
    password:"",
    avatar:""
}
const Register =()=>{
    const {actions} = useContext(Context)
    const [user, setUser] =useState(initialState)

    const handleChange=(event)=>{
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event)=>{
        console.log(typeof event.target.files[0].type)
        if(event.target.files[0].type === "image/png"){
            setUser({ ...user, avatar:event.target.files[0]})
        }else{
            console.log("No compatible")
        }
    }


    const handleSubmit = async (event)=>{
        event.preventDefault()

        const formData = new FormData()
        formData.append("lastname", user.lastname)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)

        const response = await actions.saveUser(formData)
        console.log(response)
    }

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <h1 className="center my-3">Registrarse en Deimianland</h1>
                <div className="col-12 col-md-6 border py-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Nombre completo</label>
                            <input 
                                type="text"
                                placeholder="Ingresa tu nombre"
                                className="form-control"
                                name="lastname"
                                value={user.lastname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input 
                                type="text"
                                placeholder="email@example.com"
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input 
                                type="password"
                                placeholder="email@example.com"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Imagen de perfil</label>
                            <input 
                                type="file"
                                placeholder="Ingresa tu image de perfil"
                                className="form-control"
                                name="avatar"
                                // onChange={(event)=>{
                                //     setUser({ ...user, avatar:event.target.files[0]})
                                // }}
                                onChange={handleImage}
                            />
                        </div>
                        <button className="btn btn-outline-primary mt-3 w-100">Guardar usuario</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register