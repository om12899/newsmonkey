import React, { Component } from "react";
import NewsItemComponent from "./NewsItemComponent";
import SpinnerComponent from "./SpinnerComponent";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("Hello I am constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  fetchMoreData = async () => {
    // Increment the page
    const nextPage = this.state.page + 1;
  
    // Construct the URL with the updated page
    const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=51b3d019323e41809be8c15ad5757a69&pageSize=${this.props.pageSize}&page=${nextPage}`;
    
    this.setState({ loading: true });
  
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
  
      // Check if there are new articles to add
      if (parsedData.articles.length > 0) {
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
          page: nextPage, // Update the page
        });
      } else {
        // If no new articles, you can handle this case as per your requirement.
        // For example, you can display a message or stop loading more data.
        console.log("No more articles available.");
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ loading: false });
    }
  };
  

  async componentDidMount() {
    let urlApi = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=51b3d019323e41809be8c15ad5757a69&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(urlApi);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Monkey: Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles ? this.state.articles.length !== this.state.totalResults : false}
          loader={<h4><SpinnerComponent/></h4>}
        >
          <div className='row'>
            {this.state.articles && this.state.articles.length > 0 ? (
              this.state.articles.map((element) => (
                <div className='col-md-4' key={element.url}>
                  <NewsItemComponent
                    time={element.publishedAt}
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={element.description ? element.description.slice(0, 88) : " "}
                    newsUrl={element.url}
                    imgUrl={element.urlToImage}
                  />
                </div>
              ))
            ) : (
              // Optionally, you can render a message when there are no articles
              <SpinnerComponent/>
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
  
}

export default NewsComponent;
