import React, { Component } from 'react';
import axios from 'axios'
import '../App.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { Icon } from 'antd';
import { requestAddressValid } from '../config';
// import { requestAddressValid } from "./config";
// import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";

class ModalWindow extends Component{
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        author:"",
        country: "",
        language: "",
        name: "",
        pages: "",
        year: "",
        avatar: "",
        link: "",
        key:"",        
        displayModalWindow:"none",
        defaultBookCover: 'http://volkhonkamansion.ru/wp-content/uploads/2016/05/ikonka-knig.jpg'
    };
    this.changeBookField = this.changeBookField.bind(this);
  }

  render(){
    console.log(this.state);
    console.log(this.props);  
    let display = this.props
    
    return (
      <div className='wrapper' style={{display: this.state.displayModalWindow}}>
        <div className="top">
        <div className='headerText'>"{this.props.chooseBook.name}"" {this.props.chooseBook.author}</div>
        <Icon type="close" onClick={this.closeModalWindow}/>
        </div>
        <div className='body'>
          <div className='left'>
            <form className="inputsBlock">
              <div className="input">
                <Input name="id" placeholder={this.props.chooseBook.id}  onChange = {this.changeBookFieldNum} value={this.state.id}className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "name" placeholder={this.props.chooseBook.name} type='text' onChange = {this.changeBookField.bind(this, 'chooseBook')} value={this.state.name} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "author" placeholder={this.props.chooseBook.author} onChange = {this.changeBookField} value={this.state.author} className="searchInput" />      
              </div>
              <div className="input">
                <Input name="year" placeholder={this.props.chooseBook.year} onChange = {this.changeBookFieldNum} value={this.state.year} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "country" placeholder={this.props.chooseBook.country} onChange = {this.changeBookField} value={this.state.country} className="searchInput" />      
              </div>
              <div className="input">
                <Input name = "language" placeholder={this.props.chooseBook.language} onChange = {this.changeBookField} value={this.state.language} className="searchInput" />      
              </div>
              <div className="input">
                <Input name="pages" placeholder={this.props.chooseBook.pages} onChange = {this.changeBookFieldNum} value={this.state.pages} className="searchInput" />      
              </div>         
            </form>     
          </div>
          <div className='right'>
            <img className='avatar' src={this.state.avatar === false ? this.state.defaultBookCover : this.state.avatar} name="avatar"></img>
            <div className="input">
             <Input name="avatar" placeholder={this.props.chooseBook.avatar} onChange = {this.changeBookField} className="searchInput" />     
            </div>
            <div className="input">
              <Input name="link" placeholder={this.props.chooseBook.link} onChange = {this.changeBookField} value={this.state.link} className="searchInput" />       
            </div>
          </div> 
        </div>
        <div className="buttonBlock">
          <Button type="primary"  onClick={this.getThisBook}>Get this book</Button>
          <Button >Change</Button>
          <Button  onClick={this.saveObj}>Save</Button>

          <Button type="danger">Delete</Button>
        </div> 
      </div>
    );
  }

  // changeBookFieldNum = (e) => {
  //   e.persist()
  //   console.log(e.target.name,e.target.value);
    
  //   if(isNaN(e.target.value) || e.target.value === ""){
  //     console.log('Error'); 
  //     return
  //   } 
  //   this.setState({[e.target.name]: e.target.value})
  //   console.log(this.state);
  // } 

  // changeAvatar = (e) => {
  //   this.setState({avatar:e.target.value})
  //   console.log(this.state);
    
  // }

  getThisBook = (e) => {
    window.location = this.state.link;
  }

  closeModalWindow = (e) => {
    console.log(this.display);
    this.setState({displayModalWindow: 'none'})
  }

  changeBookFieldNum = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  changeBookField = (e) => {
    this.setState({[e.target.name]: e.target.value})
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

  componentWillUpdate(prevProps, prevState){
    console.log(prevProps);
    console.log(prevState);
    console.log(this.state);
    this.state.avatar = prevProps.chooseBook.avatar
    this.state.id = prevProps.chooseBook.id
    this.state.name = prevProps.chooseBook.name
    this.state.author = prevProps.chooseBook.author
    this.state.country = prevProps.chooseBook.country
    this.state.language = prevProps.chooseBook.language
    this.state.pages = prevProps.chooseBook.pages
    this.state.year = prevProps.chooseBook.year
    this.state.link = prevProps.chooseBook.link
    this.state.key = prevProps.chooseBook.key
    this.state.displayModalWindow = prevProps.style
    if(prevProps.chooseBook.avatar === ""){
      this.state.avatar = false
    }
  } 

  componentDidUpdate(prevProps, prevState){

  }
}


export default ModalWindow