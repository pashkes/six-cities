import React, {PureComponent} from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Layout from "../layout/layout.jsx";
import {Operation} from "../../reducer/data/data";
import {groupingFavoritesForCities} from "../../reducer/data/selectors";
import Favorites from "./../favorites/favorites.jsx";

export class FavoritesPage extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {onLoadFavorites} = this.props;

    onLoadFavorites();
  }

  render() {
    const {favorites, cities} = this.props;

    return (
      <Layout title={`Page of favorite offers`}>
        {
          cities.length !== 0 ? <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  <Favorites favorites={favorites} cities={cities} />
                </ul>
              </section>
            </div>
          </main>
            : <main className="page__main page__main--favorites page__main--favorites-empty">
              <div className="page__favorites-container container">
                <section className="favorites favorites--empty">
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan yor future
                      trips.</p>
                  </div>
                </section>
              </div>
            </main>
        }
        <footer className="footer container">
          <Link to="/" className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </Layout>
    );
  }
}

FavoritesPage.propTypes = {
  favorites: PropTypes.object.isRequired,
  onLoadFavorites: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const favorites = groupingFavoritesForCities(state);

  return {
    cities: Object.keys(favorites),
    favorites: favorites || {},
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadFavorites: () => dispatch(Operation.loadFavorites()),
});


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
