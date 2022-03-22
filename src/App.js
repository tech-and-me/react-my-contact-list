import {useState,useReducer} from 'react';

const initialState = [{id:Date.now(),name:"Phary",email:"phary@gmail.com"}];

const App = () => {

  const reducer = (state,action) => {
    switch (action.type){
      case "add" :
        return [...state,action.payload];
      case "delete" :
        return state.filter(contact=>{
          return contact.id !== action.payload.id;
        })
      default:
        throw new Error();
    }
  }

  const [state,dispatch] = useReducer(reducer,initialState);
  const [name,setName] =  useState("");
  const [email,setEmail] =  useState("");


  const addContact = (e) => {
      e.preventDefault();
      setName("");
      setEmail("");
      const contact = {
        id : Date.now(),
        name,
        email
      }
      dispatch({type:"add",payload:contact})
  }


  // const [counter,setCounter] = useState(0);
  
  // const increment = () => {
  //   setCounter(counter+1);
  // }
  

  // const decrement = () => {
  //   setCounter(counter-1);
  // }
  
  return (
    <div className="container">
      <h1>MY CONTACT APP</h1>
      <hr />
      <form onSubmit={addContact}>
          <input type='text' placeholder='name' value={name} onChange = {(e)  => setName(e.target.value)} />
          <input type='text' placeholder='email' value={email} onChange = {(e)  => setEmail(e.target.value)} />
          <button>Add Contact</button>
          <br/>
          <br/>
          <hr />
      </form>
      <div className="container contactList">
        <h2>My Contact List</h2>
        <ul>
          {state.map((contact) => {
            return (
                <li key={contact.id}>
                  <h4><span>{contact.name}</span><hr/><span>{contact.email}</span></h4> 
                  <button className="btnDelete" onClick={()=>dispatch({type:"delete",payload:{id:contact.id}})}>X</button>
                </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
