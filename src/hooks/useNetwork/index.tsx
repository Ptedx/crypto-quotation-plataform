import React,{ createContext, ReactNode, useContext, useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo'

interface contextProps{
    isConnected:boolean
}

interface networkProps{
    children:ReactNode
}

const Network = createContext<contextProps>({isConnected: true})

export const NetworkContext:React.FC<networkProps> = ({children})=>{
    const [isConnected, setIsConnected] = useState(true)

    useEffect(()=>{
        const unsubcribe = NetInfo.addEventListener(state =>{
            setIsConnected(state.isConnected ?? false)
        })

        return ()=>unsubcribe()
    },[])

    return(
       <Network.Provider value={{isConnected:isConnected}}>
        {children}
       </Network.Provider>
    )
}

export const useNetwork = ()=> useContext(Network)