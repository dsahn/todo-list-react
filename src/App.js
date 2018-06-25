import React, { Component } from 'react';
import TodoListTemplete from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      {id:0, text: ' introduce react', checked: false},
      {id:1, text: ' introduce react', checked: true},
      {id:2, text: ' introduce react', checked: false}
    ]
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }
  handleCreate = () => {
    const {input, todos} = this.state;
    this.setState({
      input: '',  //clear input
      // adding array using 'concat'
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    })
  }
  handleKeyPress = (e) => {
    // call handleCreate if pressed key is enter
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }
  handleToggle = (id) => {
    const { todos } = this.state;

    // find nth item using id
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // selected object

    const nextTodos = [...todos]; // copy array

    // copy exist values and overwrite checked
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplete form={(
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            />
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplete>
    );
  }
}

export default App;
