import React, { useState, useEffect } from 'react';
import http from '../http-common'

function MainPage() {
    const [latestItems, setLatestItems] = useState([]);
    const [topCollections, setTopCollections] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        // Загрузка последних добавленных айтемов
        http.get('/main-page/')
            .then(response => {
                console.log('response: ', response.data)
                setLatestItems(response.data['latest_items']);
                setTopCollections(response.data['top_collections']);
                setTags(response.data['tags']);
            })
            .catch(error => {
                console.error("Error fetching latest items:", error);
            });

    }, []);

    return (
        <div className="main-page">
            <div className="latest-items">
                <h2>Latest Items</h2>
                <ul>
                    {latestItems.map(item => (
                        <li key={item.id}>
                            <span>Title: {item.collection.name}</span>
                            <span>Collection: {item.collection.title}</span>
                            <span>Author: {item.user.username}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="top-collections">
                <h2>Top 5 Collections</h2>
                <ul>
                    {topCollections.map(collection => (
                        <li key={collection.id}>
                            <span>Title: {collection.title}</span>
                            <span>Items count: {collection.items_count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="tags-cloud">
                <h2>Tags Cloud</h2>
                <ul>
                    {tags.map(tag => (
                        <li key={tag.id}>
                            <a href={`/search/?tag=${tag.name}`}>{tag.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MainPage;
