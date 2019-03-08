import { withFirebase } from "components/firebase/context";
import BlogList from "components/UI/BlogList";
import Header from "components/UI/Header";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Blog from "./components/UI/Blog";
import SideMenu from "./components/UI/SideMenu";

class App extends Component {
  state = {
    blogs: [],
    showMenu: false
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

  handleToggleSideMenu = () => {
    this.setState({showMenu: !this.state.showMenu});
  }


  render() {
    return (
      <BrowserRouter>
        <div style={{marginTop: 100}}>
          <Header toggleMenu={this.handleToggleSideMenu} />
          <SideMenu open={this.state.showMenu} toggleMenu={this.handleToggleSideMenu} />
          <Route path="/:blogId" component={Blog} />
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
