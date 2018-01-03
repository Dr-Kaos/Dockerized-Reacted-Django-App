import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../css/index.css';
import {TodoForm} from './components/TodoForm.jsx';
import {TodoList} from './components/TodoList.jsx';

class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todoList: null,
        };
    }

    async getTodoList() {
        const todoList = await fetch("http://127.0.0.1:8000/todo/api/todo_list/");
        const listJson = await todoList.json();
        const data = listJson.map(field => {
            const {pk, fields: {todo_text}} = field;
            return {pk, todo_text};
        });
        this.setState({
            todoList: data,
        })
    }

    render() {
        return (
            <div className={styles.todo}>
                <TodoForm getTodoList={() => this.getTodoList()}/>
                <TodoList todoList={this.state.todoList} getTodoList={() => this.getTodoList()}/>
            </div>
            
        )
    }
}

ReactDOM.render(<Todo/>, document.getElementById('app'))