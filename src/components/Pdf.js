import axios from "axios";
import { useState } from "react";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";
import React, { Component } from "react";
import "../css/styles-pdf.css";
import { useParams } from "react-router-dom";

//import pdf from "http://example.com/sample.pdf"

const MyApp = (props) => {
  var lib = "";
  var base = "http://localhost:8080/file/";
  var params = useParams();

  if (lib === "") {
    axios
      .get("http://localhost:4008/download", {
        headers: {
          token: localStorage.getItem("Session"),
        },
      })
      .then((e) => {
        lib = e.data;
      });
  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState("");
  const [escala, setscala] = useState(1.3);
  const selectT = document.querySelectorAll(".selectect-text");

  selectT.forEach((elem) => {
    elem.addEventListener("mouseup", sText);
  });

  function sText(event) {
    const selectT = window.getSelection().toString().trim();
    setText(selectT);
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div className="grid">
        <div className="pdfnav">
          <div id="buttonav">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Anterior
            </button>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
          <div id="buttonzoom">
            <button
              onClick={() => {
                setscala(escala + 0.1);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                escala > 1.3 ? setscala(escala - 0.1) : setscala(1.3);
              }}
            >
              -
            </button>
          </div>
          <div>
            <div>{text}</div>
          </div>
        </div>
        <div className="selectect-text">
          <Document
            file={base.concat(params.nombrepdf)}
            onLoadSuccess={onDocumentLoadSuccess}
            onItemClick={onItemClick}
            className="document selectect-text"
          >
            <Page
              pageNumber={pageNumber}
              className="hoja  selectect-text"
              scale={escala.toString()}
            />
          </Document>
        </div>
      </div>
    </>
  );
};

export default class Pdf extends Component {
  render() {
    return (
      <div>
        <div className="hojas">
          <MyApp />
        </div>
      </div>
    );
  }
}
