import React, { Component } from "react";
import { withFirebase } from "components/firebase/context";

class App extends Component {
  state = {
    blogs: []
  };

  componentDidMount() {
    this.props.firebase
      .blogs()
      .orderByChild("deleted")
      .equalTo(false)
      .on("value", snapshot => {
        this.setState({
          blogs: snapshot.val()
        });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {Object.keys(this.state.blogs).map((blog, index) => {
            return <li key={index}>{this.state.blogs[blog].title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default withFirebase(App);
