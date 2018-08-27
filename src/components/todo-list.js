import React from 'react';
import _ from 'lodash';
import TodoCount from './todo-count';
import TodoListItem from './todo-list-item';

export default class TodoList extends React.Component {


    renderTodoItems() {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => <TodoListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <div className="list form-horizontal">
                <TodoCount todos={ this.props.todos }
                            handleSort={this.props.handleSort}/>
                { this.renderTodoItems() }
            </div>
        )
    }
}
