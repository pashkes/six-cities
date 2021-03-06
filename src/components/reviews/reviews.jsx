import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import compose from 'recompose/compose';

import {Operation} from "./../../reducer/data/data";
import {getComments} from "../../reducer/data/selectors";
import withLoadData from "./../../hocs/with-load-data/with-load-data";
import Review from "./../review/review.jsx";

export class Reviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;

    return (
      <React.Fragment>
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        <ul className="reviews__list" role="status" aria-live="polite">
          {reviews.map((review) => {
            return <Review {...review} key={review.id}/>;
          })}
        </ul>
      </React.Fragment>
    );
  }
}

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
  reviews: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const reviewList = getComments(state, ownProps.id);
  return {
    reviews: reviewList || [],
    isLoading: Boolean(reviewList)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoadData: () => dispatch(Operation.loadReviews(ownProps.id)),
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoadData
);

export default enhance(Reviews);
