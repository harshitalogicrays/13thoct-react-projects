import './App.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useCallback, useEffect, useRef, useState } from 'react';
function App() {
  let [password,setPassword]=useState('')
  let [length,setLength]=useState(8)
  let [numberAllowed,setNumberAllowed]=useState(false)
  let [charAllowed,setCharAllowed]=useState(false)
  let passwordRef=useRef()

  // let passwordGenerator=()=>{
  //   let pass=''
  //   let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  //   if(numberAllowed) str+="1234567890"
  //   if(charAllowed) str+="!@#$%^&*()-+=."
  //   for(let i=1;i<=length;i++){
  //       pass+= str.charAt(Math.floor(Math.random()*str.length))
  //   }
  //   setPassword(pass)
  // }

  let passwordGenerator=useCallback(()=>{
    let pass=''
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str+="1234567890"
  if(charAllowed) str+="!@#$%^&*()-+=."
  for(let i=1;i<=length;i++){
      pass+= str.charAt(Math.floor(Math.random()*str.length))
  }
  setPassword(pass)
},[length,numberAllowed,charAllowed])

let copyPassword=()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,5)
}

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed])
  return (
   <>
    <InputGroup className="mb-3">
        <Form.Control type="text" value={password} ref={passwordRef}/>
        <Button variant="primary" id="button-addon2" onClick={copyPassword}>
          copy
        </Button>
      </InputGroup>
      <Row>
        <Col> <input type="range" min={6} max={100} value={length} onChange={(e)=>setLength(e.target.value)}/> length({length})  
       <input type="checkbox" defaultChecked={numberAllowed} 
        onChange={()=>setNumberAllowed(!numberAllowed)}></input> Numbers
        <input type="checkbox" defaultChecked={charAllowed}
        onChange={()=>setCharAllowed(prev=>!prev)}></input> Character</Col>
      </Row>
      
   </>
  )
}

export default App
