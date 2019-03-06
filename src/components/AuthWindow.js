import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Input } from "antd";
import { Button } from "antd";
import { Icon } from "antd";
// import { requestAddressValid } from "./config";
// import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";

class AuthWindow extends Component{
  constructor(props) {
  super(props);
  }

  auth = e => {
    this.props.auth();
  }


    render(){
      console.log(this.props);
      
        return(
            <div className="wrapper">
                <div className="inputBlock">
                    <Input />
                    <Input />
                </div>
                <Button onClick={this.auth}>Войти</Button>
            </div>
        )
    }
}

export default AuthWindow