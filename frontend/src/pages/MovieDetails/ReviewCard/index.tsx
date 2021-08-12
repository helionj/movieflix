import ImgStar from '../../../assets/images/star-image.png';
import './styles.css'
type Props = {
    user: string;
    review: string;
}
const ReviewCard = ({user, review}: Props) => {
    return(
        <div className = "review-card-container">
            <div className= "user-container">
                <img src={ImgStar} alt="star" />
                <h5>{user}</h5>
            </div>
            <div className="text-review-container">
                <p>{review}</p>
            </div>
        </div>
    );
}
export default ReviewCard;