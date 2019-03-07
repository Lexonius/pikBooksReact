import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Input } from "antd";
import { Button } from "antd";
// import { requestAddressValid } from "./config";
// import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";



class AuthWindow extends Component{
  constructor(props) {
  super(props);
  }

  enterAuthFields = () => {
    console.log('45');
    
  }
  
  auth = () => {
    this.props.table()
    this.props.renderAuthwindow()
  }

    render(){
      console.log(this.props);
        return(
            <div className="wrapper" style={{display: this.props.authWindowRender}}>
                <div className="inputBlock">
                    <Input name='login' onChange={this.enterAuthFields}/>
                    <Input name='password' onChange={this.enterAuthFields}/>
                </div>
                <Button onClick={this.auth}>Войти</Button>
            </div>
        )
    }
}

export default AuthWindow