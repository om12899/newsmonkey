import React, { Component } from 'react'
import NewsItemComponent from './NewsItemComponent'

export class NewsComponent extends Component {
   
    constructor(){
        super();
        console.log("Hello I am constructor");
        this.state={
            articles : [],
            loading : false,
            page:1,

        }
    }

    async componentDidMount(){
        let urlApi = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=51b3d019323e41809be8c15ad5757a69'
        let data = await fetch(urlApi);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles : parsedData.articles, totalArticles: parsedData.totalResults})

    }

    handleNext = async () => {
        if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / 20)) {
          let urlApi = `https://newsapi.org/v2/top-headlines?country=in&apiKey=51b3d019323e41809be8c15ad5757a69&page=${this.state.page + 1}&pageSize=20`;
          let data = await fetch(urlApi);
          let parsedData = await data.json();
          console.log(parsedData);
          this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
          });
        } 
        // You can choose to add an else condition for handling cases where there are no more pages to load, if needed.
      }
      
      
    handlePrevious=async()=>{
        let urlApi = `https://newsapi.org/v2/top-headlines?country=in&apiKey=51b3d019323e41809be8c15ad5757a69&page=${this.state.page-1}&pageSize=20`
        let data = await fetch(urlApi);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles
        })
    }
  render() {
    return (
      <div className='container my-3'>
        <h1>News Monkey : Top Headlines</h1>
        
        <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItemComponent  title = {element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,88):" "} newsUrl = {element.url} imgUrl = {element.urlToImage}/>
            </div>

        })}
            
       </div>
       <div className='container d-flex justify-content-between'>
<button disabled={this.state.page<=1} type="button" className="btn btn-warning" onClick={this.handlePrevious}> &larr; Previous</button>
<button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/20)} type="button" className="btn btn-warning" onClick={this.handleNext}>Next &rarr;</button>
</div>
      </div>
    )
  }
}

export default NewsComponent