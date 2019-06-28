import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import FavoriteButton from "./../favorite-button/favorite-button.jsx";

class CardPlace extends PureComponent {
  constructor(props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick(evt) {
    evt.preventDefault();
    this.props.onSelected(this.props.id);
  }

  render() {
    const {
      isPremium,
      previewPhoto,
      price,
      isFavorite,
      rating,
      title,
      type,
      id,
      classMod = ``,
    } = this.props;
    return <article className={`${classMod} place-card`}>
      {isPremium ? (<div className="place-card__mark"><span>Premium</span></div>) : null}
      <div className="place-card__image-wrapper">
        <a href="#" onClick={this.handleImageClick}>
          <img className="place-card__image" src={previewPhoto} width="260" height="200" loading="lazy" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            id={id}
            isFavorite={isFavorite}
            prefixClass={`place-card`}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>;
  }
}

CardPlace.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  previewPhoto: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  classMod: PropTypes.string,
};

export default CardPlace;
