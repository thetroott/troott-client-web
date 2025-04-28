import { IReview } from "../utils/interface.util";

const Review = (props: IReview) => {
  const { children } = props;

  return (
    <div className="review-page-container">
      <div className="review-content">{children}</div>
    </div>
  );
};

export default Review;
