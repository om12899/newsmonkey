import React, { Component } from 'react'
import NewsItemComponent from './NewsItemComponent'
import SpinnerComponent from './SpinnerComponent';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
   
    constructor(props){
        super(props);
        console.log("Hello I am constructor");
        this.state={
            articles : [],
            loading : false,
            page:1,
            totalResults:0
        }
        document.title = `${this.props.category} - NewsMonkey`
    }


    fetchMoreData = async()=> {
      this.setState({page : this.state.page +1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51b3d019323e41809be8c15ad5757a69&pageSize=${this.props.pageSize}`
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: this.state.totalResults + parsedData.totalResults,
          loading: false
        })
    };

    async componentDidMount(){
        let urlApi = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51b3d019323e41809be8c15ad5757a69&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
    
        let data = await fetch(urlApi);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles : parsedData.articles, 
          totalArticles: parsedData.totalResults,
          loading:false
        })

    }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Monkey : Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<h4><SpinnerComponent/></h4>}>
        
        <div className='row'>
        
        {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItemComponent time={element.publishedAt} title = {element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,88):" "} newsUrl = {element.url} imgUrl = {element.urlToImage}/>
            </div>

        })}
            
       </div>
       </InfiniteScroll>
      </div>
    )
  }
}

export default NewsComponent