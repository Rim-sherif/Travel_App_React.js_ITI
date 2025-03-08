import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({children}) {
  const {userToken} = useContext(UserContext);
  console.log(userToken);
  
   if(userToken){
        return children
    }else{
        return <Navigate to="/login" />
    }
}
