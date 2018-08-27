import React from 'react';
import _ from 'lodash';

export default class TodoCount extends React.Component {



    renderTasksCount() {
        const tasksCount =  _.size(this.props.todos);
        return tasksCount == 1 ? '1 task:' : (tasksCount + ' tasks:');
    }

    render(){
        return (
        <React.Fragment>
        <p className="bg-info" style={{ padding: '5px 10px' }}>{ this.renderTasksCount() }</p>
        <p><button className="btn btn-primary" onClick={this.props.handleSort}>Sort by title</button></p>
        </React.Fragment>
      )
    }

}
