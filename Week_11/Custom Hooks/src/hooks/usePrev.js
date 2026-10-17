import { useEffect } from "react";
import { useRef } from "react";

export function usePrev(value){
    const ref = useRef();

    useEffect(()=>{
        ref.current = value;
    }, [value]);

    return ref.current; 

}
//it returns first, the effect gets called later