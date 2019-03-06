import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Input } from "antd";
import { Button } from "antd";
import { Table } from "antd";
import ModalWindow from "./components/ModalWindow";
import AuthWindow from "./components/AuthWindow";
import { requestAddressValid } from "./config";
import { requestAddress } from "./config";
// import { requestAddressValidText } from "./config";
// import { getUserAddress } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      author: undefined,
      avatar: undefined,
      country: undefined,
      id: undefined,
      key: undefined,
      language: undefined,
      link: undefined,
      name: undefined,
      pages: undefined,
      year: undefined,
      modalData: "none",
      defaultBookCover:
        "http://volkhonkamansion.ru/wp-content/uploads/2016/05/ikonka-knig.jpg",
      modalWindowHeader: "",
      disabledFields: false,
      tableRender: 'none',
      role:"",
    };
  }

  updateData = (name, value) => {
    this.setState({[name]: value})
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
      allObjects: true
    });
    // this.paginationAllBooks === false;
    let filteredBooks = [];
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
      filteredBooks.push(foundBooks);
    });
    this.setState({ data: filteredBooks });
    console.log("filter", this.state.data);
  }

  searchBooks = event => {
    this.setState({ modalData: "none" });
    if (this.state.filterInputValue === "") {
      this.getAllBooks(event.target.value);
    } else {
      this.getFilterBooks(event.target.value);
    }
  };

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
        key: element.obj.id
      };
      booksArr.push(booksField);
    });
    this.setState({ data: booksArr });
  }

  componentWillMount() {
    this.getAllBooks();
  }

  changeFields = e => {
    console.log("45");
    this.setState({ disabledFields: false });
  };

  auth(){
    this.setState({tableRender: 'flex'})
  }

  saveObj = async () => {
    console.log(this.state);
    let updateReq = await axios.post(requestAddressValid, {
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
    });
    this.getAllBooks()
  };

  onAddBook = e => {
    this.setState({ modalData: "inline" });
    this.setState({name: "" });
    this.setState({id: "" });
    this.setState({author: "" });
    this.setState({country: "" });
    this.setState({link: "" });
    this.setState({pages: "" });
    this.setState({year: "" });
    this.setState({language: "" });
    this.setState({avatar: "" });
    this.setState({modalWindowHeader: 'none'})
    this.setState({disabledFields: false})
  };

  closeModalWindow = e => {
    this.setState({ disableFields: true });
    this.setState({ modalData: "none" });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: 150,
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"]
      },
      {
        title: "Author",
        dataIndex: "author",
        width: 150,
        key: "author",
        sorter: (a, b) => a.author.length - b.author.length,
        sortDirections: ["descend"]
      }
    ];
    console.log(this.state);
    console.log(this.props);

    return (
      <div className="App" >>
        <div className="tableWrap" 
        // style={{ display: this.state.tableRender }}
        >
          <div className="top-table">
            <Button onClick={this.onAddBook}> Add Book </Button>
            <Input
              placeholder="Basic usage"
              onChange={this.searchBooks}
              className="searchInput"
            />
          </div>
          <div>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    console.log(record);
                    this.setState({name: record.name });
                    this.setState({id: record.id });
                    this.setState({author: record.author });
                    this.setState({country: record.country });
                    this.setState({link: record.link });
                    this.setState({pages: record.pages });
                    this.setState({year: record.year });
                    this.setState({language: record.language });
                    this.setState({avatar: record.avatar });
                    this.setState({ modalData: "block" });
                    this.setState({modalWindowHeader: "inline"})
                    this.setState({disabledFields: true})
                  }
                };
              }}
              columns={columns}
              dataSource={this.state.data}
              size="small"
            />
            <ModalWindow
              data={this.state}
              updateData = {this.updateData}
              modalData={this.state.modalData}
              defaultBookCover={this.state.defaultBookCover}
              closeModalWindow={this.closeModalWindow}
              modalWindowHeader={this.state.modalWindowHeader}
              saveObj={this.saveObj}
              fields={this.state.disabledFields}
              changeFields={this.changeFields}
            />
            
          </div>
        </div>
        {/* <AuthWindow 
        table={this.auth}
        /> */}
      </div>
    );
  }
}

export default App;
