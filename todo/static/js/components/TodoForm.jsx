import React from 'react';
import Cookies from 'js-cookie'

import styles from '../../css/TodoForm.css';

export class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
        }
    }

    addShowOverlay() {
        const body = document.body;
        body.classList.add('show_overlay')
    }

    removeShowOverlay() {
        const body = document.body;
        body.classList.remove('show_overlay')
    }

    async submit() {
        const csrftoken = Cookies.get('csrftoken');
        const data = {
            todo_input: this.state.task,
        }
        this.speak(`You just added task ${this.state.task}`);
        const response = await fetch("http://127.0.0.1:8000/todo/api/create/", {
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
        if(dataR.result == 'ok') {
            this.setState({
                task: ''
            })
            this.props.getTodoList();
        }
    }

    update(evt) {
        const task = evt.target.value;
        this.setState({
            task,
        })
    }

    keyPress(e){
        if(e.charCode === 13) {
            this.submit()
        }
    }

    speak(toSay='Hello World!') {
        const synth = window.speechSynthesis
        const utterThis = new SpeechSynthesisUtterance(toSay)
        const voices = synth.getVoices();
        const voice = voices.find(voice => voice.name === 'Fiona');
        
        utterThis.voice = voice;
        utterThis.pitch = 1.5;
        utterThis.rate = 0.8;
        
        synth.speak(utterThis)
    }

    render() {
        const csrfmiddlewaretoken = Cookies.get('csrftoken');
        return (
        <div className={styles.form}>
            <input type="text" name="todo_input" placeholder="What's on your mind?" 
            onInput={(e) => this.update(e)} className={styles.todo_input} value={this.state.task}
            onKeyPress={(e) => this.keyPress(e)} onFocus={() => this.addShowOverlay()} onBlur={() => this.removeShowOverlay()}/>
            <button className={styles.speak_button} onClick={() => this.speak()}>Speak</button>
            <button className={styles.todo_button} onClick={() => this.submit()}>Add</button>
            {/* <input className={styles.todo_button} type="button" value="Add" onClick={() => this.submit()}/> */}
        </div>
/*             <form action="api/create/" method="post" className={styles.form}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrfmiddlewaretoken}/>
                <input type="text" name="todo_input" placeholder="What's on your mind?" className={styles.todo_input}
                onFocus={() => this.addShowOverlay()} onBlur={() => this.removeShowOverlay()} />
                <button className={styles.todo_button} type="submit">Add</button>
            </form> */
        )
    }
}