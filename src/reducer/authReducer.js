const authRdeucer=(state,action)=>{
  switch(action.type){
     case "AUTH":
        return{
            ...state,
            auth:action.payload,
            msg:" Time out ! Login again"
        }
     case "SERVER_ERROR" :
      return {
        ...state,
        msg:action.payload

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