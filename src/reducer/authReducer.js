const authRdeucer=(state,action)=>{
  switch(action.type){
     case "AUTH":
        return{
            ...state,
            auth:action.payload,
            msg:"Successfully"
        }
     case "WRONG_CRRIDENTIAL" :
      return {
        ...state,
        msg:action.payload

      } 
      case "LOGOUT" :
      return {
        ...state,
        auth:action.payload,
        msg:"Logout Successfully"

      }
        default:
            return state
  }
}
export default authRdeucer;