import './News.css';

const News = ({ loading }) => {
    return (<>

        {loading ?
            (
                <div className='News loading'>
                    <h2 className="skeleton"></h2>
                    <ul>
                        <li>
                            <h4 className="newsHeadline skeleton"></h4>
                            <div className="time skeleton"></div>
                        </li>
                        <li>
                            <h4 className="newsHeadline skeleton"></h4>
                            <div className="time skeleton"></div>
                        </li>
                        <li>
                            <h4 className="newsHeadline skeleton"></h4>
                            <div className="time skeleton"></div>
                        </li>
                        <li>
                            <h4 className="newsHeadline skeleton"></h4>
                            <div className="time skeleton"></div>
                        </li>
                        <li>
                            <h4 className="newsHeadline skeleton"></h4>
                            <div className="time skeleton"></div>
                        </li>
                        <li>
                            <h4 className="newsHeadline skeleton"></h4>
                            <div className="time skeleton"></div>
                        </li>
                    </ul>
                </div>)
            :
            (<div className='News'>
                <h2 className="heading">Linkedin News</h2>
                <ul>
                    <li>
                        <h4 className="newsHeadline">What Gen Z workers want</h4>
                        <span className="time">2d ago</span>
                    </li>
                    <li>
                        <h4 className="newsHeadline">MNCs on tech hiring spree</h4>
                        <span className="time">2d ago</span>
                    </li>
                    <li>
                        <h4 className="newsHeadline">Spacetech firems eye former ISRO talent</h4>
                        <span className="time">22h ago</span>
                    </li>
                    <li>
                        <h4 className="newsHeadline">India Inc bats for climate literacy</h4>
                        <span className="time">1d ago</span>
                    </li>
                    <li>
                        <h4 className="newsHeadline">Family offices rejig investment plans</h4>
                        <span className="time">2d ago</span>
                    </li>
                    <li>
                        <h4 className="newsHeadline">Online B2B startups set to soar</h4>
                        <span className="time">22h ago</span>
                    </li>
                </ul>
            </div>)
        }
    </>
    );
}

export default News;