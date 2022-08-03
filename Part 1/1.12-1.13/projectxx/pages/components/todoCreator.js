const TodoCreator = () => {
  return (
    <div style={{display: 'flex'}}>
      <input type="text" style={{flex: 1}} />
      <input type="button" style={{'margin-left': '5px'}} value="Create TODO" />
    </div>
  );
}

export default TodoCreator;