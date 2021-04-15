import React, { Component } from 'react'
import axios from 'axios'
import style from './HomeStyle.module.css'
export default class Home extends Component {
    state = { allNews: [] }
    componentDidMount() {
        this.getNews('technology');
    }
    async getNews(category) {

        let { data } = await axios.get(`https://newsapi.org/v2/top-headlines?country=de&category=${category}&apiKey=ab8a194d5a4948cd942a038212694e53`)
        this.setState({ allNews: data.articles })
    }
    getCategory = (e) => {
        this.getNews(e.target.value);
        // console.log(e.target.value)
    }


    render() {
        return (
            <React.Fragment>
                <div className={`${style.mainColor}`}>
                    <div className="container py-5">
                        <div className="row pt-5">
                            <div className="col-md-4">
                                <select onChange={this.getCategory} className="form-control">
                                    <option value="technology">technology</option>
                                    <option value="science">science</option>
                                    <option value="sports">sports</option>
                                    <option value="business">business</option>
                                    <option value="health">health</option>
                                    <option value="general">general</option>
                                    <option value="entertainment">entertainment</option>
                                </select>
                            </div>
                        </div>
                        <div className="row py-5">
                            {this.state.allNews.map((value, index) => {
                                return (
                                    <div key={index} className="col-md-3 my-3">
                                        <img className='w-100' src={value.urlToImage} alt="news" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>


            </React.Fragment>
        )
    }
}
