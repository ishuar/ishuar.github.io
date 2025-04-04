import React, {useContext} from "react";
import "./book.scss";
import BookCard from "../../components/bookCard/BookCard";
import {bookSection} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import StyleContext from "../../contexts/StyleContext";
export default function Book() {
  const {isDark} = useContext(StyleContext);
  if (!bookSection.display) {
    return null;
  }
  return (
    <Fade direction="up" triggerOnce distance="20px">
      <div className="main" id="books">
        <div className="book-main-div">
          <div className="book-header">
            <h1
              className={
                isDark
                  ? "dark-mode heading book-heading"
                  : "heading book-heading"
              }
            >
              {bookSection.title}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle book-subtitle"
                  : "subTitle book-subtitle"
              }
            >
              {bookSection.subtitle}
            </p>
          </div>
          <div className="book-cards-div">
            {bookSection.bookCards.map((card, i) => {
              return (
                <BookCard
                  key={i}
                  isDark={isDark}
                  cardInfo={{
                    title: card.title,
                    description: card.subtitle,
                    image: card.image,
                    imageAlt: card.imageAlt,
                    footer: card.footerLink
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
