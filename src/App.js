import React, { Component } from 'react';
import skygear from 'skygear';

class App extends Component {
  constructor(props) {
    super(props);
    this.statuses = ['not yet signed in', 'signed in', 'error message'];      // bad practice?
    this.default_states = {
      status: this.statuses[0],
      user: "",
      profile: ""
    };
    this.state = this.default_states;
  }

  onLogin() {
    skygear.auth.loginOAuthProviderWithPopup('google').then(
      // sign in was successful
      this.doLogin,
      // sign in was unsuccessful
      error => this.setState({ status: this.statuses[2] })
    );
  }

  doLogin(user) {
    // display login info from console
    console.info('Login success', user);
    console.info('Access token:', skygear.auth.accessToken);
    console.info('Username:', skygear.auth.currentUser.username);

    skygear.auth.whoami().then(
      // whoami returns a Record type
      record => this.setState({ user: JSON.stringify(record.toJSON(), null, 2) }),
      error => console.error(error)
    )
    skygear.auth.getOAuthProviderProfiles().then(
      // getOAuthProviderProfiles return a JSON type
      profileJson => this.setState({ profile: JSON.stringify(profileJson, null, 2) }),
      error => console.error(error)
    )
    // status becomes signed in
    this.setState({ status: this.statuses[1] });
  }

  onLogout() {
    skygear.auth.logout().then(
      this.doLogout,
      error => console.error('Logout failure', error)
    );
  }

  isCurrentUserNull() {
    // as a check after skygear.auth.logout()
    skygear.auth.whoami().then(
      (values) => {return false},
      (error) => {return true}
    );
  }

  doLogout(user) {
    if (this.isCurrentUserNull()) {
      console.error('Logout failure');
    } else {
      console.info('Logout success');
      this.setState(this.default_states);
    }
  }

  render() {
    return (
      <div className="Login">
        <h1>Skygear Google Login with Pop up Demo</h1>
        <button className="block-button secondary-bg" onClick={() => this.onLogin()}>Login with Google</button>

        <p>Google login status:</p>
        <div className="block-div">{this.state.status}</div>

        <p>Skygear currentUser:</p>
        <div className="block-div">{this.state.user}</div>

        <p>currentUser's Google profile:</p>
        <div className="block-div ">{this.state.profile}</div>
        <br/>
        <button className="inline-button" onClick={() => this.onLogout()}>Logout</button>
      </div>
    );
  }
}

export default App;
