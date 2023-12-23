import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=29c23fa1e76f478a932445f529ff2146&page=${page}&pageSize=${props.pageSize}`;


    try {
      setLoading(true);
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error(`Failed to fetch data. Status: ${data.status}`);
      }

      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setError(null);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
  }, [page, props.country, props.category, props.pageSize, props.setProgress]);

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    // const url = `https://newsdata.io/api/1/news?apikey=pub_338134476090acbc883e4a00aea8fd2949d6d&q=news&country=${props.country}&language=en&category=${props.category}&page=${page + 1}&pageSize=${props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=29c23fa1e76f478a932445f529ff2146&page=${page}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error(`Failed to fetch more data. Status: ${data.status}`);
      }

      let parsedData = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setError(null);
    } catch (error) {
      setError('Error fetching more data. Please try again later.');
    }
  };

  return (
    <>
      <h2 className='text-center' style={{ margin: '48px 0px' }}>
        Momentum - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      {error && <div className="error-message">{error}</div>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;