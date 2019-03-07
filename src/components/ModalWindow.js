import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Input } from "antd";
import { Button } from "antd";
import { Icon } from "antd";
import { requestAddressValid } from "../config";
// import { requestAddressValid } from "./config";
// import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";

class ModalWindow extends Component {
  constructor(props) {
    super(props);
  }

  getThisBook = e => {
    window.location = this.props.data.link;
  };

  deleteBook = async () => {
    let deletedReq = await axios.post(requestAddressValid, {
      id:this.props.data.id,
      booksId: this.props.data.id,
      isDelete: true
    });
    console.log(deletedReq);
  };

  closeModalWindow = e => {
  this.props.closeModalWindow()
  };

  changeBookFieldNum = e => {
    this.props.updateData(e.target.name, e.target.value)
  };

  changeBookField = e => {
    this.props.updateData(e.target.name, e.target.value)
  };

  changeFields = e => {
    this.props.changeFields()
  };

  saveObj = () => {
    this.props.saveObj()
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div
        className="wrapper"
        style={{ display: this.props.modalData }}
      >
        <div className="top">
          <div className="headerText" style={{ display: this.props.modalWindowHeader }}>
            "{this.props.data.name}" {this.props.data.author} 
          </div>
          <Icon type="close" onClick={this.closeModalWindow} />
        </div>
        <div className="body">
          <div className="left">
            <form className="inputsBlock">
              <div className="input">
              <div className="inputHeader">Id*</div>
                <Input
                  name="id"
                  placeholder={this.props.data.id}
                  onChange={this.changeBookField}
                  value={this.props.data.id}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
              <div className="input">
              <div className="inputHeader">name*</div>
                <Input
                  name="name"
                  placeholder={this.props.data.name}
                  onChange={this.changeBookField}
                  value={this.props.data.name}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
              <div className="input" disabled={true}>
                <div className="inputHeader">author*</div>
                <Input
                  name="author"
                  placeholder={this.props.data.author}
                  onChange={this.changeBookField}
                  value={this.props.data.author}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
              <div className="input">
              <div className="inputHeader">year</div>
                <Input
                  name="year"
                  placeholder={this.props.data.year}
                  onChange={this.changeBookField}
                  value={this.props.data.year}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
              <div className="input">
              <div className="inputHeader">country</div>
                <Input
                  name="country"
                  placeholder={this.props.data.country}
                  onChange={this.changeBookField}
                  value={this.props.data.country}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
              <div className="input">
              <div className="inputHeader">language</div>
                <Input
                  name="language"
                  placeholder={this.props.data.language}
                  onChange={this.changeBookField}
                  value={this.props.data.language}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
              <div className="input">
              <div className="inputHeader">pages</div>
                <Input
                  name="pages"
                  placeholder={this.props.data.pages}
                  onChange={this.changeBookField}
                  value={this.props.data.pages}
                  className="searchInput"
                  disabled={this.props.fields}
                />
              </div>
            </form>
          </div>
          <div className="right">
            <img
              className="avatar"
              src={
                this.props.data.avatar === undefined
                  ? this.props.data.defaultBookCover
                  : this.props.data.avatar
              }
              name="avatar"
            />
            <div className="input">
            <div className="inputHeader">avatar</div>
              <Input
                name="avatar"
                placeholder={this.props.data.avatar}
                onChange={this.changeBookField}
                className="searchInput"
                disabled={this.props.fields}
              />
            </div>
            <div className="input">
            <div className="inputHeader">link</div>
              <Input
                name="link"
                placeholder={this.props.data.link}
                onChange={this.changeBookField}
                value={this.props.data.link}
                className="searchInput"
                disabled={this.props.fields}
              />
            </div>
          </div>
        </div>
        <div className="buttonBlock">
          <Button type="primary" onClick={this.getThisBook}>
            Get this book
          </Button>
          <Button onClick={this.changeFields}>Change</Button>
          <Button onClick={this.saveObj}>Save</Button>
          <Button type="danger" onClick={this.deleteBook}>
            Delete
          </Button>
        </div>
      </div>
    );
  }
}

export default ModalWindow;
