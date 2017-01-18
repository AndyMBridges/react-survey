import React, {Component} from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgiLuOujmkng8NvAIBwe8AL_Mn49HC4ns",
    authDomain: "simplesurvey-7b98f.firebaseapp.com",
    databaseURL: "https://simplesurvey-7b98f.firebaseio.com",
    storageBucket: "simplesurvey-7b98f.appspot.com",
    messagingSenderId: "621153287943"
  };
  firebase.initializeApp(config);

class App extends Component {
    // Set default states
    constructor(props) {
        super(props);
        this.state = {
            // Generate new ID each render
            id: uuid.v1(),
            name: '',
            answers: {
                q1: '',
                q2: '',
                q3: '',
                q4: ''
            },
            submitted: false
        }

        // Bind 'this' to all instances of handleQuestionChange
        // Prevents us from having to add bind to each onChange event
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    // Get input value on submit
    handleNameSubmit(event) {
        var name = this.refs.name.value;
        // setState for name and add callback function
        this.setState({name: name},function() {
            console.log(this.state);
        });
        event.preventDefault();
    }

    handleQuestionSubmit(event) {
        // Configure firebase
        // Set values
        // Get generated state ID and concat with surveys
        firebase.database().ref('surveys/' + this.state.id).set({
            name: this.state.name,
            answers: this.state.answers
        });
        this.setState({submitted: true},function() {
            console.log('Questions submitted!');
        });
        event.preventDefault();
    }

    handleQuestionChange(event) {
        // console.log(event.target.value);
        var answers = this.state.answers;
        // Check for correct question number
        // Add question values
        if(event.target.name == 'q1'){
            answers.q1 = event.target.value;
        } else if (event.target.name == 'q2') {
        answers.q2 = event.target.value;
        } else if (event.target.name == 'q3') {
        answers.q3 = event.target.value;
        } else if (event.target.name == 'q4') {
        answers.q4 = event.target.value;
        }

        // Set the state
        this.setState({answers:answers},function() {
            console.log(this.state);
        });
    }

    render() {
        var user;
        var questions;
        // If there is a name and the form has not been submitted
        if(this.state.name && this.state.submitted === false) {
            user = <h2>Welcome, {this.state.name}</h2>
            questions = <span>
                <h3>Survey Questions</h3>
                <form onSubmit={this.handleQuestionSubmit.bind(this)}>
                    <div>
                        <label>What is your favourite operating system?</label><br />
                        <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Windows<br />
                        <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />Linux<br />
                        <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />OSX<br />
                        <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange} />Solaris<br />
                        <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />Other<br />
                    </div>
                    <div>
                        <label>What is your favorite brand of TV?</label><br />
                        <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange} />Sony<br />
                        <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
                        <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange} />Green<br />
                        <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange} />Vizio<br />
                        <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} />Other<br />
                  </div>
                  <div>
                        <label>What is your favorite Smartphone Brand?</label><br />
                        <input type="radio" name="q3" value="Morning" onChange={this.handleQuestionChange} />Apple<br />
                        <input type="radio" name="q3" value="Afternoon" onChange={this.handleQuestionChange} />Samsung<br />
                        <input type="radio" name="q3" value="Evening" onChange={this.handleQuestionChange} />Nexus<br />
                        <input type="radio" name="q3" value="Night" onChange={this.handleQuestionChange} />Blackberry<br />
                        <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
                  </div>
                  <div>
                        <label>What is your favorite CPU Brand?</label><br />
                        <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange} />Intel<br />
                        <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange} />AMD<br />
                        <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange} />Nvidia<br />
                        <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange} />ARM<br />
                        <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
                  </div>
                  <input type="submit" value="Submit" />
                </form>
            </span>
        } else if(!this.state.name && this.state.submitted === false) {
            user = <span>
                <h2>Please enter your name to begin the survey</h2>
                {/* bind this to submit event object */}
                <form onSubmit={this.handleNameSubmit.bind(this)}>
                    <input type='text' placeholder='Enter Name...' ref='name' />
                </form>
            </span>;
            questions = '';
        } else if(this.state.submitted === true) {
            user = <h2>Thank You {this.state.name}</h2>;
        }
        return (
            <div className="App">
                <div className="App-header text-center">
                    <h2>Simple Survey</h2>
                </div>
                <div className="text-center">
                    {user}
                </div>
                <div className="container">
                    {questions}
                </div>
            </div>
        );
    }
}

export default App;
