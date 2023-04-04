
import './App.css';
import {useEffect, useState} from 'react'; 
import axios from 'axios';



function App() {
  const [itemText, setItemtext] = useState('');
  const [listeItems, setListItems] = useState([]);

// Add new todo item to database 
const addItem = async (e)=>{
  e.preventDefault();
    try{
     
    const res = await axios.post('http://localhost:5500/api/item', {item:itemText})
    console.log(res);
    setItemtext('') 
    
    } catch(err){
      console.log(err);
    } 
}

// Create functions to fetch all todo items from database -- we will use useEffect hook
useEffect(()=>{
  const getItemList = async ()=> {
    try {
    const res = await axios.get('http://localhost:5500/api/items')
    // console.log(res.data);
    setListItems(res.data);
    } catch(err){
      console.log(err)
    }
  }
  getItemList();  
},[listeItems])

// Delete Items when click on delte 

const deleteItem = async (id)=>{
  try{
    const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
    const newListItems = listeItems.filter(item=> item._id !== id);
    setListItems(newListItems);
    console.log(res.data)
    
  }
  catch(err){
    console.log(err)
  }
}

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e=>addItem(e)}  >
        <input type="text" placeholder="Add Todo Item" onChange={e=>{setItemtext(e.target.value)}} value={itemText} />
        <button type="submit">Add</button>
      </form>

      <div className="todo-listItems">

     {
      listeItems.map(item=>(
      <div className="todo-item">
        <p className="item-content">{item.item}</p>
        <button className="update-item">Update</button>
        <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
       </div>
       ))
     }


 

      </div>
    </div>
  );
}

export default App;