import React from 'react';

export default class TodoListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        const { task, title, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted ? '#5cb85c' : '#d9534f',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
              <form onSubmit={this.onSaveClick.bind(this) }>
                <label className="col-md-4 text-left">
                  <input className="form-control input-sm" defaultValue={title} ref="editTitle" type="text"/>
                </label>
                <label className="col-md-8 text-left">
                  <input className="form-control input-sm" defaultValue={task} ref="editInput" type="text"/>
                </label>
              </form>
            )
        }

        return (
          <React.Fragment>
            <label className="col-md-3 text-left" style={ taskStyle } onClick={this.props.toggleTask.bind(this, task) }>
                {title}
            </label>
            <label className="col-md-4 text-left" style={ taskStyle } onClick={this.props.toggleTask.bind(this, task) }>
                {task}
            </label>
          </React.Fragment>
        )
    }

    renderStateSection() {
        const { isCompleted } = this.props;

        if (isCompleted) {
            return (
                <div className="col-md-2 text-right">
                    <span className="alert alert-success">done</span>
                </div>
            )
        }

        return (
            <div className="col-md-2 text-right">
                <span className="alert alert-danger">undone</span>
            </div>
        )
    }

    renderActionSection() {
        if (this.state.isEditing) {
            return (
                <div className="col-md-3 text-right">
                    <button className="btn btn-primary" onClick={this.onSaveClick.bind(this) }>Save</button>
                    &nbsp; &nbsp; &nbsp;
                    <button className="btn btn-primary" onClick={this.onCancelClick.bind(this) }>Cancel</button>
                </div>
            )
        }

        return (
            <div className="col-md-3 text-right">
                <button className="btn btn-primary" onClick={this.onEditClick.bind(this) }>Edit</button>
                &nbsp; &nbsp; &nbsp;
                <button className="btn btn-primary" onClick={this.props.deleteTask.bind(this, this.props.task) }>Delete</button>
            </div>
        )
    }

    render() {
        return (
            <div className="form-row" style={{ marginTop: '0.5em', border: '1px solid #17a2b8', paddingTop:'1em' }}>
                { this.renderTaskSection() }
                { this.renderStateSection() }
                { this.renderActionSection() }
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.isEditing) {
            this.refs.editTitle.focus();
        }
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        const oldTitle = this.props.title;
        const newTitle = this.refs.editTitle.value;
        this.props.saveTask(oldTask, newTask, oldTitle, newTitle);
        this.setState({ isEditing: false });
    }

}
