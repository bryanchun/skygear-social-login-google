# skygear-social-login-google
A **React** app that demonstrates how to do login with the new social login api on Oursky Skygear, particularly on google, and then host the app onto Skygear so that everyone can access it through a website link, with static hosting.

## Tutorial
Disclaimer: this is a React absolute beginner-proof guide
  - If you are a React.js beginner, you will find the last section helpful: `Part Supplementary: React.js basics`
  - If you are rather experienced React.js user already, feel free to skip till places you need ;)

# Part 0: Development environment setup
0. [Install `npm`](https://www.npmjs.com/get-npm) (a very useful package manager) if you haven't.

1. So that we can install skygear (the library) by running `npm install skygear` in your terminal.

2. And so that we can install a React **boilerplate** called `create-react-app` by running `npm i create-react-app` in your terminal.

    - A boilerplate is like an all-in-one tool that makes it simple to create react apps, saving the configuration and dependency hassle.

We will still need to install one more console application later but for now we are ready to start the project!
 
3. Pick a name for your application, say `skygear-social-login-google`, which is the project name I will be using. Feel free to change all occurences of this into your own `${PROJECT_NAME}`.

4. Run `create-react-app ${PROJECT_NAME}`, which in my case is `create-react-app skygear-social-login-google`.

    - You can see a bunch of files generated for you in a new folder with the same project name. Pay special attention to the files that we will only be using:
      - `./src/index.js` the app entry point
      - `./src/App.js` the UI main screen, and 
      - `./src/index.css` the stylesheet

    - If you happen to be using **GitHub** to store your code, this is a good time to create the repository before we start. Follow the instructions on GitHub, or use the following console command sequence:
      ```
      cd ${PROJECT_NAME}                                       # cd skygear-social-login-google; changing into this directory
      git init
      git add .
      git commit -u "initial commit"                           # or other messages
      git remote add origin git@github.com:USERNAME/REPO.git   # insert your username and your created repository name
      git push -u origin master
      ```

5. To run the web app on your local browser for coding and testing as we go, run `cd ${PROJECT_NAME}` (navigate to the newly created project folder) and then run `npm start`.
6. Your default browser should show a welcome page by React through local hosting at `http://localhost:3000/`, and what you should see is a generic React page with its logo.
    - As we go on updating the project, this localhost page will respond automatically to make changes upon saving those modified files. Perfect place for checking progress/debugging/sandboxing.

# Part 1: Configure Skygear

1. At [Skygear](skygear.io), press `Get started` on top right corner to sign up for an account. The most important fields to fill in are

    - `Endpoint URL` (name of website or subdomain, we also call it `${APP_NAME}`)
    - `Your Email`
    - `Your Password`

In my example I called my endpoint `demo934`, so I will have a website that starts with `https://demo934.skygeario.com` later.

  - To make the names less confusing, you are very welcomed to consistently set one name for all of them: your `${PROJECT_NAME}` for React, `Repo name` for GitHub, and `${APP_NAME}` for Skygear.

2. Enter Skygear and choose the App/Endpoint you just created, right on the page (`Get Started`) you should see under `Your App Configuration`, these two important tokens. They help you log into Skygear when you are coding in React.

    - `Server Endpoint`: my example gives simply `https://demo934.skygeario.com/`, use yours
    - `API Key`: skygear generated this for my example `c3f090ac5a954c2b82b63a1623acfee9`, use yours

3. Let's configure skygear from the app with these two important tokens:

    Let's work with the first file: `./src/index.js`, i.e. the app entry point

    1. Import skygear by inserting this line:
        ``` js
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './index.css';
        import skygear from 'skygear';        // << insert
        import App from './App';
        import registerServiceWorker from './registerServiceWorker';
        ```
    2. Right after the imports, punch in your Skygear `endPoint` and `apiKey` tokens:
        ``` js
        // Set your own endPoint and apiKey here, overwrite these values
        let endPoint = 'https://demo934.skygeario.com/';
        let apiKey = 'c3f090ac5a954c2b82b63a1623acfee9';
        ```
    3. Finally, below this but before the rendering, configure the `skygear` object for later API calls by the provided `endPoint` and `apiKey`:
    
        ``` js
        skygear.config({                              // config takes both endPoint and apiKey together as an object
            endPoint,
            apiKey                                    // returns a promise for chaining
          }).then(value => console.info(value))       // the on-success callback function
            .catch(error => console.error(error));    // and the on-error callback function

        ReactDOM.render(<App />, document.getElementById('root'));
        registerServiceWorker();
        ```

# Part 2: Configure Google login

The procedures are given in [this guide](https://docs.skygear.io/guides/auth/social-login/google/).

Follow all the steps to authorise Skygear in accessing your Google account information.

  - A reminder to help with possible troubleshooting is, in `step 5`, make sure you ticked a `Default permission` like `Email`, otherwise Google login won't work.

# Part 3: Implement UI and functionalities

This is where the real programming finally takes place!

This is the layout we are trying to make here. Notice for the purpose of demo, I am keeping this app as simple and straight forward as possible.

![](https://github.com/bryanchun/skygear-social-login-google/blob/master/tutorial_res/preview.png)

As you can guess, it basically does two things:
  - Press `Login with Google` to perform social login. Then the login status becomes `signed in` (if error happened then `error message`), with skygear account info and google account info got displayed correctly.

  - Press `Logout` to perform logout from google social login. Then the login status returns to `not yet signed in` and the two account info textboxes got flushed again.

Recall the project structure generated by `create-react-app`, of the 3 important files we are working with, we have done with `index.js`. On with the remaining two:

1. Let's start with `index.css`. Since UI design is not the focus of this tutorial but more of aesthetic purposes, I suggest you to copy my [stylesheet](https://github.com/bryanchun/skygear-social-login-google/blob/master/src/index.css) and overwrite your file.

    - Of course, feel free to create your own styles, but for the sake of demonstration, I will be using these defined styles and css classes as the tutorial goes, to give a reasonably good-looking UI with minimal effort.

Perfect. Now comes the part with most work: `App.js`.

2. Initially you find yourself having this auto-generated layout:
    ``` js

    import React, { Component } from 'react';   // Component is in fact a member of React so the braces mean to unpack React and retrieve only React.Component
    import logo from './logo.svg';              // redundant, to be removed
    import './App.css';                         // redundant, to be removed

    class App extends Component {
      render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        );
      }
    }
    ```

    - An explanation of what these mean: your `App` builds on top of `React.Component`, and it renders a `<div>` with such and such html inner layouts, all detailed in the (overridden) method `render() { }`.

    - In other words, by changing what `render` function does according to our needs, i.e. adding buttons and textfields that updates automatically, we can make the App.

3. Let's build the skeleton of the app by changing `render` to:
    ``` js
    render() {
      return (
        <div className="Login">
          <h1>Skygear Google Login with Pop up Demo</h1>
          <button className="block-button secondary-bg" onClick={() => this.onLogin()}>Login with Google</button>

          <p>Google login status:</p>
          <div className="block-div">{this.state.status}</div>

          <p>Skygear currentUser:</p>
          <div className="block-div">{this.state.user}</div>

          <p>currentUser Google profile:</p>
          <div className="block-div ">{this.state.profile}</div>
          <br/>
          <button className="inline-button" onClick={() => this.onLogout()}>Logout</button>
        </div>
      );

      // If you are not familiar with React.js, just check out the last section `Part Supplementary: React.js basics` of this tutorial :) then continue
    } 
    ```

    - First, the `<button>`s now perform Google login or logout when they are pressed, except we need to provide the functions for login and logout. More on this later.

    - - `this.state.status`
      - `this.state.user`
      - `this.state.profile`
      
      are new `states` for this `App`. They behave like variables for this Component.

    These 3 newly defined states go to here, in the constructor as early as `App` is created. Don't forget to perform the right imports too.
    ``` js
    import React, { Component } from 'react';
    import skygear from 'skygear';      // << insert

    class App extends Component {
      constructor(props) {
        super(props);
        this.statuses = ['not yet signed in', 'signed in', 'error message'];
        this.default_states = {
          status: this.statuses[0],
          user: "",
          profile: ""
        };
        this.state = this.default_states;
      }
      // other methods like render
    }
    ```

    
    - We import `skygear` again, now it is configured after going through `index.js`, ready for API calls.
  
    
    - `constructor(props) {}` contains code that got executed at the beginning of making the `App`, so we do all initialisations inside. `super(props)` is a necessary setup step (to inherit parent's `props`), we may take them for granted.

      1. `this.statuses` unsurprisingly stores the **3 and only 3** possible status for a user login according to our design, as described in the beginning of this part. It is assigned an array of strings that can easily be accessed by indexes.

          - Again this is just for simplicity's sake, we definitely have better practice.

      2. `this.default_states` stores the default values for the 3 `states`. Since we will allow users to switch between logged in and logged out statuses easily, restoring to default states can be quite routine. Here we modularise it as an object property to `App`, so that it gets copied to the actual `this.state`, keeping those 3 member states and their values. When we change `this.state` later, `this.default_states` remains unaffected.

          - So `this.state.status` directly uses `this.statuses[0]` defined just now, while both `this.state.user` and `this.state.profile` are initialised to an empty string to represent that no information is present.

      3. `this.state` wraps all user-defined `states` into one object, hence we access them by `this.state.status` for example. Initialised with these 3 `states` each with a default value from `this.default_states`, we can dynamically modify these 3 `states`, so that their changes will be automatically reflected as the webpage renders again (which is quite a frequent task).
      
    Now that you know `states` are useful for storing data. We have one common and very useful method that lets us update `this.state.whatever`

    - `this.setState` takes an object and uses its key-value to update the old `this.state`, so with the existing `states` (keys) we can pass an anonymous object to assign a new value to that state.

4. Bravo! We are only left with the `<button>`s for login and logout to actually work as expected. These are achieved by user-defined functions `this.onLogin` and `this.onLogout` taken as `onClick` listeners.
    1. `this.onLogin`
        ``` js
        // can be put after the constructor
        onLogin() {
          skygear.auth.loginOAuthProviderWithPopup('google').then(
            // sign in was successful
            this.doLogin,
            // sign in was unsuccessful
            error => {
              this.setState({ status: this.statuses[2] });
              console.error('Login failure', error);
            }
          );
        }
        ```
        - `skygear.auth.loginOAuthProviderWithPopup('google')` returns a [promise](http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/) typed object, which runs `async` (running in the background) code for you in a `synchronous` (sequential execution; normal line-by-line) situation. This is useful when this background process is asking for resource from a third-party API but still the code is not expected to wait till this to finish, but continue executing the next line.

        - What to do when that background async process is done though? That's why we have `promise.then(successCallback, failureCallback)`. Notice in `onLogin`, if login was successful, we call `this.doLogin` (to be defined right below); else the login was unsucessful thus we instead call the error handler `error => { ... }`.

          - `successCallback` takes the format `value => doSomethingWith(value)`, and what that `value` is depends on what the `promise` promised to return. This is usually detailed in API documentation (see below). Simiarly, `failureCallback` takes the format `error => doSomethingElseWith(error)` if an error occured and is supplied.

        - We used a few Skygear [AuthContainer APIs](https://docs.skygear.io/js/reference/latest/class/packages/skygear-core/lib/auth.js~AuthContainer.html) here, definitely check them out to understand how those methods work together. You can also find [another reference guide](https://docs.skygear.io/guides/auth/social-login/js/) on this. `skygear.auth` is the module under `skygear` that deals with authentication, you will see more of its methods being used up next.

        ``` js
        // onLogin is defined above
        doLogin(user) {
          // status becomes signed in
          this.setState({ status: this.statuses[1] });
          skygear.auth.whoami().then(
            // whoami returns a Record type
            record => this.setState({ user: JSON.stringify(record.toJSON(), null, 2) }),
            error => {
              console.error(error);
              this.setState({ status: this.statuses[2] });
            }
          );
          skygear.auth.getOAuthProviderProfiles().then(
            // getOAuthProviderProfiles return a JSON type
            profileJson => this.setState({ profile: JSON.stringify(profileJson, null, 2) }),
            error => {
              console.error(error);
              this.setState({ status: this.statuses[2] });
            }
          );
        }
        ```
        - We have `promise`s again, this time returned from `skygear.auth.whoami()` and `skygear.auth.getOAuthProviderProfiles()`. Since whenever `doLogin` is called, login with popup on Google should be successful *already*, we can query what are the skygear account info and google account info.

        - `skygear.auth.whoami()` on sucess (resolved) returns a `Record`, a Skygear-defined type. According to [the API]((https://docs.skygear.io/js/reference/latest/class/packages/skygear-core/lib/record.js~Record.html)) it is converted to json by `.toJSON()`. As `this.state.user` is a string, we use [`JSON.stringify(json, null, indent)`](https://alligator.io/js/json-parse-stringify/) to further convert the json to formatted json string.

        - `skygear.auth.getOAuthProviderProfiles()` on resolved returns an ordinary json, so we can directly use `JSON.stringify(json, null, 2)` to produce the suitable string for `this.state.profile`.

        - By the end, if no error occured, `this.state.status` is set to `signed in` as in the first line, otherwise the error is signaled by the error handlers in each promise and `this.state.status` is changed. We also print the error in the console.

        Finally, noticed that we have lots of repeated code? Let's reorganise them a bit:

        ``` js
        onError(message) {
          return error => {
            console.error(message, error);
            this.setState({ status: this.statuses[2] });
          }
        };

        onLogin() {
          skygear.auth.loginOAuthProviderWithPopup('google').then(
            // sign in was successful
            user => {
              // status becomes signed in
              this.setState({ status: this.statuses[1] });
              skygear.auth.whoami().then(
                // whoami returns a Record type
                record => this.setState({ user: JSON.stringify(record.toJSON(), null, 2) }),
                this.onError('')
              );
              skygear.auth.getOAuthProviderProfiles().then(
                // getOAuthProviderProfiles return a JSON type
                profileJson => this.setState({ profile: JSON.stringify(profileJson, null, 2) }),
                this.onError('')
              );  
            },
            // sign in was unsuccessful
            this.onError('Login failure')
          );
        }

        // remove doLogin
        ```
        - The error handler appeared too often that we better define a proper function (no longer anonymous) for supporting it. `this.onError` **generates** our error handler as it is actually a function that **returns** a function. The `message` parameter allows flexible error message to be printed, and it is supposed to be a string. We can call `this.onError('')` for example to get an anonymous error handler that has empty string message.

        - Expanding our previous `doLogin` into an anonymous function inside `onLogin` is pretty straight forward. This saves us from having to manage too many functions, and group relevant functions together at an acceptable code length.

    2. `this.onLogout`
        ``` js
        // onLogin above, reusing onError
        onLogout() {
          skygear.auth.logout().then(
            this.isCurrentUserNull() ?
              this.onError('Logout failure') :
              user => {
                console.info('Logout success');
                this.setState(this.default_states);
              },
            this.onError('Logout failure')
          );
        }

        isCurrentUserNull() {
          // as a check after skygear.auth.logout()
          skygear.auth.whoami().then(
            value => false,
            error => true
          );
        }
        // render goes below
        ```
        - Here comes logging out. `skygear.auth.logout()` provides the logout procedure and returns a `promise`. If the call was unresolved/failed, we handle the error once again; else the call is resolved and we perform the user-defined `this.doLogout`, which is expanded into an anonymous function just like what we did with removing `this.doLogin`.

        - Before that, as a cautious check, we query `skygear.auth.whoami()` once again to see if the current account is correctly dismissed, or not `this.isCurrentUserNull()`. Notice that if current user is null, `whoami().then()` should throw an error, in which we capture as a `return true` (shorthanded here) from `this.isCurrentUserNull()`, otherwise account information is retained and it returns `false`.

        - The logout-resolved block (`doLogout`) first checks whether `this.isCurrentUserNull()`. The ternary operator `... ? ... : ...` selects the right success callback to be fed into `then()`.
          - It throws an error with `this.onError` if the check returns a yes
          
          - It shows `Logout success` if the check returns a no, and restores the states to `this.default_states`, just like we have never signed in.

5. The final bit of code is for binding some methods to the `App` in the constructor, those user-defined methods that used `this.setState`. We need to do so because otherwise those methods will use their own context `this`, not the `Component`'s `this`, to find the method `setState`, which obviously cannot be found and has logical error.

    ``` js
    class App extends Component {
      constructor(props) {
        super(props);
        this.statuses = ['not yet signed in', 'signed in', 'error message'];
        this.default_states = {
          status: this.statuses[0],
          user: "",
          profile: ""
        };
        this.state = this.default_states;

        this.onLogin = this.onLogin.bind(this);       // << insert these
        this.onLogout = this.onLogout.bind(this);
        this.onError = this.onError.bind(this);
      }
      // other methods like onLogin, onLogout, onError, isCurrentUserNull, render
    }
    ```

    - By adding `this.onLogin = this.onLogin.bind(this)` and the other two, we changed the meaning of `this` inside these methods. They starts to bind with the `App`, because inside the `constructor`, `this` is defined as `App`'s context. Now we can safely use `this.setState`!

Check out the [full code](https://github.com/bryanchun/skygear-social-login-google/tree/master/src) anytime when you feel needed!

# Part 4: Deploy app by Skygear

Now that the app is done, but you can only use it on your local machine at `http://localhost:3000/`?

Why not we make it shareable on the web, in the form of a sleek website?

We can absolutely do it with Skygear, with a technique called `static hosting`.

  - Yes we have `dynamic hosting` too. That is a totally different story. Instead of putting the `html, css, js` onto the server, dynamic hosting will render the html by some scripts on the go. In our case, given that we will make those files (**assets**) by **building** from our React scripts, we opt for the simpler static hosting.

  - [Static vs Dyanmic hosting article](https://about.gitlab.com/2016/06/03/ssg-overview-gitlab-pages-part-1-dynamic-x-static/) by GitLab for reference

By the end of this part, you can just access your React app by a URL in a skygear domain, ready for you and others to read, use and share.

  - **Custom domain** is entirely supported by Skygear, i.e. if you have your own domain name, we can help you load this React app onto a different domain from Skygear's. More on this later.

Let's roll out:

1. Configure the file `./package.json`:
    - Add `'homepage': ${endPoint}/static"` field, like `'homepage': https://demo934.skygeario.com/static/"`
    - Under the `"scripts"` field, change the subfield `"build"` to

      - `"build": "react-scripts build && rm -rf public_html && mv build public_html",`
    - For reference, you should have something like this:
      ``` json
      {
        "name": "skygear-social-login-google",
        "version": "0.1.0",
        "private": true,
        "homepage": "https://demo934.skygeario.com/static/",
        "dependencies": {
          "react": "^16.4.0",
          "react-dom": "^16.4.0",
          "react-scripts": "1.1.4"
        },
        "scripts": {
          "start": "react-scripts start",
          "build": "react-scripts build && rm -rf public_html && mv build public_html",
          "test": "react-scripts test --env=jsdom",
          "eject": "react-scripts eject"
        }
      }
      ```
2. So that we can finally **build** the project, i.e. export this project from React code to readily usable and simpler html/css/js that is more optimised to run. On your console and under your project folder, run `npm run build`.

3. Next, we [deploy the built project as a static website on Skygear](https://discuss.skygear.io/t/hosting-a-static-website-with-skygear/102). Install Skygear command line interface `skycli` by running in the console `npm install -g skycli`.

4. `skycli login` to login from the command line interface with Skygear.io email and password.

5. `skycli init` to associate this project folder with one of your Skygear apps. Choose the app/endpoint you created by up/down arrow keys.

6. `skycli deploy` to host the site
    - `/public_html` is the only directory that `skycli` will upload whose content.

    - Originally, `react` will make a new directory `/build` to contain the exported code, but as we modified the build script, this directory will be renamed to `/public_html`, so this modification saves the trouble to rename the folder each time.

    - The file `./.skyignore` lets user denote which folders/files will not be useful so that `skycli` will directly skip them. To avoid unnecessary uploads, set it to the following:
      ```
      .git                    # if you have
      /node_modules
      /public
      /src
      /tutorial_res
      
      # so that only /public_html is visible to skycli
      ```

7. When deployment is done, visit `${endPoint}/static/`
    - my example: https://demo934.skygeario.com/static/

    - If your site doesn't update up to your latest deployment, clearing browser cookies then revisiting will help

8. Deploy instead, on a custom domain if you wish and you have one
    - If you have configurable domain names, you can host a Skygear site right on your own domain using [this guide](https://discuss.skygear.io/t/skygear-updates-custom-domain-for-static-assets-is-now-supported-on-skygear-io/130).


Enjoy!


# Part Supplementary: React.js basics

In `App.js`:

  - The `className` attribute appearing all over the html tags are for applying the defined css styles from `index.css` (ignore `App.css`).
        
  - The braces around them are React code block, everything inside them are not html markup but will be evaluated by React (javascript). Here, the string expressions will substitute the content of the tag as those constantly updating info.

  - Similarly, in each `<button>`, we have the attribute `onClick`. We assign a function as the value for this attribute so that whenever the button is clicked (pressed), this function is called to handle the click action. Putting it inside braces means it is defined by javascript too.
