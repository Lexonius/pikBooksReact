import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import ModalWindow from './components/ModalWindow'
import AuthWindow from './components/AuthWindow'
// import { requestAddressValid } from "./config";
import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chooseBook: {
        author: undefined,
        avatar: undefined,
        country: undefined,
        id: undefined,
        key: undefined,
        language: undefined,
        link: undefined,
        name: undefined,
        pages: undefined,
        year: undefined
      }
    };
  }
  // state = {
  //   data: [],
  // }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex:'name',
      width: 150,
      key:'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    }, {
      title: 'Author',
      dataIndex:'author',
      width: 150,
      key:'author',
      sorter: (a, b) => a.author.length - b.author.length,
      sortDirections: ['descend'],
    }]
    console.log(this.state);
    console.log(this.props);
    
    return (
      <div className="App" >
       
          <div className='tableWrap'>
            <div className="header">
              <Button> Add Book </Button>
              <Input placeholder="Basic usage" onChange = {this.searchBooks} className="searchInput"/>        
            </div>
            <div>
              <Table 
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      // event.persist()
                      // event.preventDefault()
                      console.log(record);
                      // this.setState({chooseBook: record})
                      // console.log(this.state);
                      // this.props = record
                      console.log(this.props);
                      this.setState({chooseBook: record});
                      console.log(this.state.chooseBook.id);
                    },       
                  };
                }}
              
              columns={columns} dataSource={this.state.data} size="small" />
              <ModalWindow chooseBook={this.state.chooseBook}/> 
            </div>
        </div>
      </div>

    );
  }

  async getFilterBooks(filterValue) {
    let searchRequest = await axios.post(requestAddress, {
      filters: [
        {
          operator: "OR",
          filters: [
            {
              value: `${filterValue}`,
              field: "author",
              exp: "like"
            },
            {
              value: `${filterValue}`,
              field: "name",
              exp: "like"
            }
          ]
        }
      ],
      fields: "id,name,author,year,country,language,pages,link,pic",
      pageSize: 150,
      allObjects: true,
    });
    // this.paginationAllBooks === false;
    let filteredBooks = []
    searchRequest.data.result.list.forEach(element => {
      let foundBooks = {
        id: element.obj.id,
        author: element.obj.author,
        country: element.obj.country,
        language: element.obj.language,
        name: element.obj.name,
        pages: element.obj.pages,
        year: element.obj.year,
        avatar: element.obj.pic,
        link: element.obj.link,
        key: element.obj.id
      };
      filteredBooks.push(foundBooks)
    });
    this.setState({data: filteredBooks})
    console.log('filter',this.state.data);
  }

  searchBooks = (event) => {
    event.persist()
    if(this.state.filterInputValue === ""){
      this.getAllBooks(event.target.value)
    } else {
      this.getFilterBooks(event.target.value)
    }
  }

  async getAllBooks() {
    const request = await axios.post(requestAddress, {
      filters: [
        {
          field: "id",
          value: "",
          exp: "!="
        }
      ],
      fields: "id,name,author,year,country,language,pages,link,pic",
      pageSize: 150,
      allObjects: true
    });

    let booksArr = [];
    request.data.result.list.forEach(element => {
      let booksField = {
        id: element.obj.id,
        author: element.obj.author,
        country: element.obj.country,
        language: element.obj.language,
        name: element.obj.name,
        pages: element.obj.pages,
        year: element.obj.year,
        avatar: element.obj.pic,
        link: element.obj.link,
        key: element.obj.id,
      };
      booksArr.push(booksField)
    });
    this.setState({data: booksArr})
    console.log('all',this.state.data);  
  }
  
  componentWillMount() {
    this.getAllBooks() 
  }
}

export default App;
