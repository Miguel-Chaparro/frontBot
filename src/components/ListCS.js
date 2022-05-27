import React, { Component } from "react";
import axios from "axios";
import "../css/styles-carts.css";
export default class ListCS extends Component {
  constructor(props) {
    super(props);
    this.state = { cheatsheets: [] };
    this.cargar();
  }
  cargar() {
    if (this.state.cheatsheets.length === 0) {
      axios
        .get("http://localhost:8080/cheatsheets", {
          headers: {
            token: localStorage.getItem("Session"),
          },
        })
        .then((e) => {
          this.setState({ cheatsheets: e.data.CheatSheets });
          console.log("rarr");
          console.log(this.state.cheatsheets);
          if (this.state.cheatsheets == null) {
            this.setState({ cheatsheets: [] });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="listcs">
        <div className="titulocs" key="trtrt" id="miscs">
          CheatSheets
        </div>
        {this.state.cheatsheets !== null &&
          this.state.cheatsheets.map((sheet) => (
            <div className="titulocs" key={sheet.ID}>
              {sheet.Titulo}
            </div>
          ))}
      </div>
    );
  }
}
