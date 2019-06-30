import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {FavoriteButton} from "./favorite-button.jsx";

configure({adapter: new Adapter()});

describe(`the button should correctly  is rendered `, () => {

  it(`if the button isn't favorite`, () => {
    const favoriteButton = shallow(<FavoriteButton
      isFavorite={false}
      id={0}
      prefixClass={``}
      isAuthorizationRequired={true}
      history={{}}
      addToFavorites={jest.fn()}
      removeFromFavorites={jest.fn()}
    />);
    expect(favoriteButton).toMatchSnapshot();
  });

  it(`if the button is favorite`, () => {
    const favoriteButton = shallow(<FavoriteButton
      isFavorite={true}
      id={0}
      prefixClass={``}
      isAuthorizationRequired={true}
      removeFromFavorites={jest.fn()}
      addToFavorites={jest.fn()}
      history={{}}
    />);
    expect(favoriteButton).toMatchSnapshot();
  });
});
