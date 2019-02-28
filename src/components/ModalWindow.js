import React, { Component } from 'react';
import axios from 'axios'
import '../App.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { isNumber } from 'util';
import { requestAddressValid } from '../config';
// import { requestAddressValid } from "./config";
// import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";

class ModalWindow extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    console.log(this.state);
    let book = this.props
    this.state = book
    // console.log(this.state);
    
    return (
      <div className='wrapper'>
      <div className='headerText'>{this.props.chooseBook.name}</div>
        <div className="top">

        </div>
        <div className='body'>
          <div className='left'>
            <div className="inputsBlock">
              <div className="input">
                <Input name="id" placeholder={this.state.chooseBook.id} onChange = {this.changeBookFieldNum} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "name" placeholder={this.state.chooseBook.name} onChange = {this.changeBookField} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "author" placeholder={this.state.chooseBook.author} onChange = {this.changeBookField} className="searchInput" />      
              </div>
              <div className="input">
                <Input name="year" placeholder={this.state.chooseBook.year} onChange = {this.changeBookFieldNum} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "country" placeholder={this.state.chooseBook.country} onChange = {this.changeBookField} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "language" placeholder={this.state.chooseBook.language} onChange = {this.changeBookField} className="searchInput" />      
              </div>
              <div className="input">
                <Input name="pages" placeholder={this.state.chooseBook.pages} onChange = {this.changeBookFieldNum} className="searchInput" />      
              </div>         
            </div>     
          </div>
          <div className='right'>
            <img className='avatar' src={this.state.chooseBook.avatar}></img>
            <div className="input">
              <Input name="link" placeholder={this.state.chooseBook.link} onChange = {this.changeBookField} className="searchInput" />      
            </div>
            <div className="input">
              <Input name="avatar" placeholder={this.state.chooseBook.avatar} onChange = {this.changeBookField} className="searchInput" />      
            </div>
          </div> 
        </div>
        <div className="buttonBlock">
          <Button type="primary" size="small">Get this book</Button>
          <Button size="small">Change</Button>
          <Button size="small" onClick={this.saveObj}>Save</Button>

          <Button type="danger" size="small">Delete</Button>
        </div> 
      </div>
    );
  }

  changeBookFieldNum = (e) => {
    e.persist()
    console.log(e.target.name,e.target.value);
    
    if(isNaN(e.target.value) || e.target.value === ""){
      console.log('Error'); 
      return
    } 
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state);
    
  } 

  changeBookField = (e) => {
    if(isNaN(e.target.value)){
      this.setState({[e.target.name]: e.target.value})
      console.log(this.state);
      
    } else {
      console.log('Error');
      return
    }
  }

  saveObj = async () => {
    console.log(this.state);
      let updateReq = await axios.post(requestAddressValid,{
        author: this.state.author,
        country: this.state.country,
        id: this.state.id,
        language: this.state.language,
        name: this.state.name,
        pages: this.state.pages,
        year: this.state.year,
        bookAvatar: this.state.avatar,
        link: this.state.link,
        isDelete: false,
        isComplete: ""
      })
      console.log(updateReq);
      
  }

  componentWillUpdate(nextProps, nextState){

  }

}


export default ModalWindow