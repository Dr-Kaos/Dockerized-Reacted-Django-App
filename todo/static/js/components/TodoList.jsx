import React from 'react';
import Cookies from 'js-cookie';

import styles from '../../css/TodoList.css';

export class TodoList extends React.Component {

    componentWillMount(){
        this.props.getTodoList();
    }

        async deleteTask(value) {
        const csrftoken = Cookies.get('csrftoken');
        const data = {
            'id': value
        }
        const response = await fetch('http://127.0.0.1:8000/todo/api/delete/', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": csrftoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const dataR = await response.json();
        dataR.result == 'ok' ? this.props.getTodoList(): null
    } 

/*     async deleteTask(value) {
        const csrftoken = Cookies.get('csrftoken');
/*         const data = {
            id: value,
        } 
        const response = await fetch(`http://127.0.0.1:8000/todo/api/delete/?id=${value}`);
        const data = await response.json();
        data.result == 'ok' ? this.getTodoList(): null
    } */

    render() {
        const listTasks = this.props.todoList == null ? 
        <h1>Loading</h1> : this.props.todoList.map(
            task => <div className={styles.task} key={task.pk}>
            {task.todo_text}
            <input type="button" className={styles.delete} onClick={() => this.deleteTask(task.pk)} value="X"/>
            </div>
        );
        return (
            <div className={styles.list}>
                  {listTasks}
            </div>
        )
    }
}