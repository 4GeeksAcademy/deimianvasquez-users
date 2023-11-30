import React, {useContext} from "react"
import { Context } from "../store/appContext"

const Users =()=> {
    const {store} = useContext(Context)

    return(
        <>
            <div className="container">
                <div className="row">
                    {store.users.map((item)=>{
                        return(
                            <div key={item.id} className="col">
                                <img src={item.avatar}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Users