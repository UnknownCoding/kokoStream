import { createViewerToken } from "@/actions/action";
import { useState,useEffect } from "react";
import { toast } from "sonner";
import { jwtDecode, type JwtPayload } from "jwt-decode";

export const useViewerToken = (HostIdentity:string) => {
    const [viewerToken,setViewerToken] = useState("")
    const [viewerName,setViewerName] = useState("")
    const [identity,setIdentity] = useState("")
    useEffect(()=>{
        const createToken = async () => {
            try {
                const token = await createViewerToken(HostIdentity);
                setViewerToken(token);
                const decodedToken = jwtDecode(token) as JwtPayload & {name?:string}  
                const name = decodedToken.name
                const identity = decodedToken.jti
                if(name){
                    setViewerName(name)
                }
                if(identity){
                    setIdentity(identity)
                }
            } catch (error) {
                toast.error("something went wrong")
            }
        }
        createToken()
    },[])
    return {viewerToken,viewerName,identity}
}