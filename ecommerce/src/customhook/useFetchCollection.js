import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'
//custom hoo to fetch data from collection

const useFetchCollection = (collectioname) => {
    let [data,setData]=useState([])
    let [isLoading,setIsLoading]=useState(false)
    let getcollectiondata=()=>{
        setIsLoading(true)
        try{
            const docRef=collection(db,collectioname)
            const q=query(docRef,orderBy('createdAt','desc'))
            onSnapshot(q,(docSnap)=>{
                const allData=docSnap.docs.map(doc=>({...doc.data(),id:doc.id}))
                setData(allData)
                setIsLoading(false)
            }) }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }  }
    useEffect(()=>{getcollectiondata()},[])
  return ({data,isLoading})
}

export default useFetchCollection
