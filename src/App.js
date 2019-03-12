import { withFirebase } from "components/firebase/context";
import BlogList from "components/UI/BlogList";
import Header from "components/UI/Header";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Blog from "./components/UI/Blog";
import SideMenu from "./components/UI/SideMenu";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { LightTheme, DarkTheme, getTheme, setTheme } from "themes";

class App extends Component {
  state = {
    blogs: [],
    showMenu: false,
    themes: { light: LightTheme, dark: DarkTheme },
    darkTheme: getTheme() === "dark",
    order: "asc"
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
    this.setState({ showMenu: !this.state.showMenu });
  };

  handleToggleTheme = () => {
    const darkTheme = this.state.darkTheme;
    setTheme(darkTheme ? "light" : "dark");
    this.setState({ darkTheme: !darkTheme });
  };

  handleToggleOrder = () => {
    this.setState(prevState => ({
      order: prevState.order === "asc" ? "desc" : "asc"
    }));
  };

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider
          theme={
            this.state.darkTheme
              ? this.state.themes.dark
              : this.state.themes.light
          }
        >
          <div style={{ marginTop: 100 }}>
            <Header toggleMenu={this.handleToggleSideMenu} />
            <SideMenu
              open={this.state.showMenu}
              toggleMenu={this.handleToggleSideMenu}
              darkTheme={this.state.darkTheme}
              toggleTheme={this.handleToggleTheme}
              order={this.state.order}
              toggleOrder={this.handleToggleOrder}
            />
            <Route path="/:blogId" component={Blog} />
            <Route
              exact
              path="/"
              render={() => (
                <BlogList blogs={this.state.blogs} order={this.state.order} />
              )}
            />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);
