import React from 'react';
import _ from 'lodash';

export default class TodoCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }


    renderError() {
        if (!this.state.error) { return null; }
        return <p style={{ padding: '5px 10px', background: '#d9534f', color: '#fff' }}>{ this.state.error }</p>;
    }

    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this) }>
              <div className="form-row">
                  <div className="form-group col-md-4">
                      <input className="form-control" type="text" ref="createTitle" placeholder="Title?" />
                  </div>
                  <div className="form-group col-md-7">
                      <input className="form-control" type="text" ref="createInput" placeholder="What needs to be done?" />
                  </div>
                  <div className="form-group col-md-1">
                      <button type="submit" className="btn btn-primary">Create</button>
                  </div>
                  </div>
                  { this.renderError() }
            </form>
        )
    }

    componentDidMount() {
        this.refs.createTitle.focus();
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const createTitle = this.refs.createTitle;
        const title = createTitle.value;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return false;
        }

        this.setState({ error: null });
        this.props.createTask(task, title);
        this.refs.createInput.value = '';
        this.refs.createTitle.value = '';
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task!';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exist!';
        } else {
            return null;
        }
    }
}
