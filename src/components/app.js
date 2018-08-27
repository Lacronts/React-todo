import React from 'react';
import _ from 'lodash';
import TodoCreate from './todo-create';
import TodoList from './todo-list';

const todos = [
    {
        title: 'Важно',
        task: 'Выполнить тестовое задание',
        isCompleted: false,
    }
];

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: todos,
            sorted: false
        }
    }

    componentDidMount(){
      const cashed = localStorage.getItem('data');
      if (cashed){
        this.setState({
          todos:JSON.parse(cashed)
        })
      }
      console.log(`кэш: ${cashed}`);
    }


    render() {
        return (
            <div className="container">
                <h1>React Todo</h1>
                <div className="td-list-con">

                    <TodoCreate
                        todos={ this.state.todos }
                        createTask={ this.createTask.bind(this) }
                        />

                    <TodoList
                        todos={ this.state.todos }
                        saveTask={ this.saveTask.bind(this) }
                        deleteTask={ this.deleteTask.bind(this) }
                        toggleTask={ this.toggleTask.bind(this) }
                        handleSort={ this.handleSort.bind(this) }
                        />
                </div>
            </div>
        )
    }


    createTask(task, title) {
        this.state.todos.push({
            title,
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
        localStorage.setItem('data',JSON.stringify(this.state.todos));
    }


    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
        localStorage.setItem('data',JSON.stringify(this.state.todos));
    }

    saveTask(oldTask, newTask, oldTitle, newTitle) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        const foundTitle = _.find(this.state.todos, todo => todo.title === oldTitle);
        foundTodo.task = newTask;
        foundTitle.title = newTitle;
        this.setState({ todos: this.state.todos });
        localStorage.setItem('data',JSON.stringify(this.state.todos));
    }


    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
        localStorage.setItem('data',JSON.stringify(this.state.todos));        
    }
    handleSort(){
      const todos = this.state.todos;
      let sortedTodos='';
      (this.state.sorted) ? sortedTodos = _.sortBy(todos, todo => todo.title) :
       sortedTodos = _.sortBy(todos, todo => todo.title).reverse()
      this.setState({
        todos: sortedTodos, sorted: !this.state.sorted});
    }
}
