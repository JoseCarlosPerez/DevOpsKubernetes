const TodoList = ({todos}) => {
  return (
    <ul style={{width: '100%'}}>
      {
        todos && todos.map(s => <li key={s.id}>{s.text}</li> )
      }
    </ul>
  );
};

export default TodoList;
