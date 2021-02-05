import React, { Component } from 'react';
import axios from 'axios';

class UpdateCourse extends Component {

  state = {
    data: {},
    user: {}
  }

  componentDidMount() {
    // Gets course data for a specifc course and adds it to state
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(data => this.setState({data: data.data, user: data.data.User}));
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      data: {
        [name]: value
      }
    });
  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                  value={this.state.data.title} onChange={this.handleChange} /></div>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <div><textarea id="description" name="description" className="" placeholder="Course description..." 
                value={this.state.data.description} onChange={this.handleChange}></textarea></div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                      placeholder="Hours" value={this.state.data.estimatedTime} onChange={this.handleChange} /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." 
                    value={this.state.data.materialsNeeded} onChange={this.handleChange}></textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    );
  };
}

export default UpdateCourse;