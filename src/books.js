// Books Section
import emoji from "react-easy-emoji";

export const bookSection = {
  title: emoji("Books"),
  subtitle:
    "Books that left a mark — personal favorites I’d recommend to anyone.",
  display: true, // Set false to hide this section, defaults to true
  bookCards: [
    {
      title: "Team Topologies",
      subtitle: "Organizing Business and Technology Teams for Fast Flow",
      image: require("./assets/images/books/teams-topologies.png"),
      imageAlt:
        "Team Topologies: Organizing Business and Technology Teams for Fast Flow",
      footerLink: [
        {
          name: "Leadership",
          url: "https://ishan.learndevops.in/#books"
        }
      ]
    },
    {
      title: "The Phoenix Project",
      subtitle: "A Novel About IT, DevOps, and Helping Your Business Win",
      image: require("./assets/images/books/the-phoenix-project.png"),
      imageAlt:
        "The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win",
      footerLink: [
        {
          name: "DevOps & Leadership",
          url: "https://ishan.learndevops.in/#books"
        }
      ]
    },
    {
      title: "The Alchemist",
      subtitle: "A Fable About Following Your Dream",
      image: require("./assets/images/books/the-alchemist.png"),
      imageAlt: "The Alchemist: A Fable About Following Your Dream",
      footerLink: [
        {
          name: "Philosophy & Fiction",
          url: "https://ishan.learndevops.in/#books"
        }
      ]
    },
    {
      title: "The Fountainhead:",
      subtitle:
        "A Novel About Individualism, Creativity, and the Struggle for Integrity",
      image: require("./assets/images/books/the-fountainhead.png"),
      imageAlt:
        "The Fountainhead: A Novel About Individualism, Creativity, and the Struggle for Integrity",
      footerLink: [
        {
          name: "Philosophy & Fiction",
          url: "https://ishan.learndevops.in/#books"
        }
      ]
    }
  ]
};
