import axios from "axios";
import { useState } from "react";

const TodoCreator = ({setTodos}) => {
  const [todo, setTodo] = useState('');

  const createTodoHandler = () => {
    axios.post('/api/todos', {
      todo
    }).then(s => {
      setTodos(s.data);
    })
    .catch(console.log);
  };

  const changeTodoHandler = event => {
    setTodo(event.target.value);
  };

  return (
    <div style={{display: 'flex'}}>
      <input type="text" style={{flex: 1}} value={todo} onChange={changeTodoHandler}/>
      <input type="button" style={{'margin-left': '5px'}} value="Create TODO" onClick={createTodoHandler} />
    </div>
  );
}

export default TodoCreator;