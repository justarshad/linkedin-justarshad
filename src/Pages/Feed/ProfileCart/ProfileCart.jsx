import './ProfileCart.css';
import defaultBackground from '../../../Assets/card-bg.svg'
import defaultProfileIcon from '../../../Assets/user.svg';
import itemIcon from '../../../Assets/item-icon.svg'

import { useNavigate } from 'react-router-dom'

const ProfileCart = ({ user, loading }) => {

    const Navigate = useNavigate();

    return (<>

        {loading ?
            (<div className='ProfileCart loading'>
                <div className="profile">
                    <div className="img background skeleton"></div>
                    <div className="profileImgContainer skeleton"></div>
                </div >
                <div className="second">
                    <div className="skeleton" ></div>
                    <div className='skeleton'></div>
                </div>
                <div className="third">
                    <div className='skeleton'></div>
                    <div className='skeleton'></div>
                </div>
                <div className="savedItems skeleton" ></div>
            </div >
            )
            :
            (<div className='ProfileCart'>
                <div className="profile">
                    <img className="background" src={user?.background ? user.background : defaultBackground
                    } alt="" />
                    <div className="profileImgContainer"><img src={user?.profile ? user.profile : defaultProfileIcon} alt="" /></div>
                </div >
                <div className="profileData">
                    <h4 className="name" onClick={(e) => {
                        Navigate('/profile');
                    }}>{user?.fullName ? user.fullName : (<>Your Name</>)}</h4>
                    <h6 className='discription'>{user?.discription ? (user.discription.length <= 60 ? user.discription : user.discription.slice(0, 60) + '...') : (<>Your Discription </>)}</h6>
                </div>
                <div className='divider'></div>
                <div className="networkData">
                    <div><span>Connections</span><span>{user?.connections ? user.connections : (<>0</>)}</span></div>
                    <h6>Grow Your Network</h6>
                </div>
                <div className='divider'></div>
                <div className="savedItems">
                    <img src={itemIcon} alt="" />
                    <h6>My Items</h6>
                </div>
            </div >)
        }
    </>
    );
}

export default ProfileCart;