import React, { Component } from "react";
import Form from './components/Form'
import './css/App.css';

class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "" };
// }

//   callAPI() {
//       fetch("http://localhost:9000/testAPI")
//           .then(res => res.text())
//           .then(res => this.setState({ apiResponse: res }));
//   }

//   componentDidMount() {
//       this.callAPI();
//   }
  
  render() {
    return (
      <div className="App">
        <Form/>
      </div>
    );
    }
}

export default App;
