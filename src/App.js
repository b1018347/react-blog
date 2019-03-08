import { withFirebase } from "components/firebase/context";
import BlogList from "components/UI/BlogList";
import Header from "components/UI/Header";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Blog from "./components/UI/Blog";

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
      <BrowserRouter>
        <div style={{marginTop: 100}}>
          <Header />
          <Route path="/:blogId" component={Blog} blogs={this.state.blogs} />
          <Route
            exact
            path="/"
            render={() => <BlogList blogs={this.state.blogs} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);
