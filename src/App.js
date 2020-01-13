import React, { Component } from "react";
import {
  fbauth,
  SignInWithGoogle,
  SignOutWithGoogle,
  fbLoginsDB
} from "./firebase/firebase.config";
import AppHeader from "./AppHeader";
import AppRoutes from "./AppRoutes";
import UserContext from "./contexts/UserContext";
import { PositionTableFilters } from "./contexts/PositionContext";

import { Button, Container, Image, Loader, Dimmer } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import "./index.css";
import * as logo from "./images/RenegadeLogo_transparent.png";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      loadingMSG: ""
    };

    this.showLoader = this.showLoader.bind(this);
  }

  //callback function when form editing is done.
  showLoader(isLoading, msg) {
    msg = msg || "Loading Page...";

    this.setState({
      loading: isLoading,
      loadingMSG: msg
    });
  }

  componentDidMount() {
    fbauth.onAuthStateChanged(currentuser => {
      //called when logging in or out or when page is refreshed.
      if (currentuser) {

        if (currentuser.email.match("@renegadetec.com")) {
          this.setState({
            currentuser: currentuser
          }); //everything is good, so set current user and role

          // save login event to logins table
          const now = new Date();
          fbLoginsDB.push({
            user: currentuser.displayName,
            emailaddress: currentuser.email,
            eventtime: now.toJSON()
          });
        } else {
          alert("User is not authorized.");
          SignOutWithGoogle();
        }
      } else {
        //user logged out. reset app user state. shows login button.
        this.setState({
          currentuser: null,
          loading: false
        });
      }
    }); //end auth state change
  } //componentDidMount

  SignIn() {
    this.showLoader(true, "Logging in...");
    SignInWithGoogle().then(() => {
      this.showLoader(false);
    });
  }

  render() {
    const { currentuser, isLoading, loadingMSG } = this.state;

    if (!currentuser) {
      //user is not logged in. show google logon button.
      return (
        <Container className="App" fluid>
          <Dimmer active={isLoading}>
            <Loader>{loadingMSG}</Loader>
          </Dimmer>
          <div className="login-screen">
            <Image src={logo} />
            <Button
              className="login-button"
              content="Sign in with Google"
              color="google plus"
              icon="google"
              size="large"
              labelPosition="left"
              onClick={this.SignIn.bind(this)}
            />
          </div>
        </Container>
      );
    } else {
      //user is logged in
      return (
        <div className="App">
          <PositionTableFilters>
            <UserContext.Provider value={currentuser}>
              <AppHeader />
              <AppRoutes />
            </UserContext.Provider>
          </PositionTableFilters>
        </div>
      );
    }
  } //end render
} //end class

export default App;
