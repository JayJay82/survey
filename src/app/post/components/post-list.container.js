import React, { Component } from 'react';
import {PostItem} from './post-item.component';

export class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        const item1 = {
            id : 1,
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
            image: 'https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png'
        };
        const item2 = {
            id : 2,
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
            image: 'https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png'
        };
        const item3 = {
            id: 3,
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
            image: 'https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png'
        };
        let posts = [item1, item2, item3];
        this.setState({ posts });

    }
    renderPostItems = () => {
        return this.state.posts.map((item) => {
            return(
                <PostItem key={item.id} item = {item} />
            )
        });
    }
    render() {
        if (this.state.posts) {
            return (
                <div className="container mt-2">

                    <div className="row">
                        { this.renderPostItems()}
                    </div>
                </div>
            )
        } else {
            return <a>No posts</a>
        }
    }
}