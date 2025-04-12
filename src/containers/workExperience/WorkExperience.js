import React, {useContext} from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import {workExperiences} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);

  // Validation helper functions
  const isValidString = str => typeof str === "string" && str.trim().length > 0;

  // Validate a single experience entry
  const validateExperience = (exp, index) => {
    const requiredFields = ["company", "role", "date", "desc"];
    const missingFields = requiredFields.filter(
      field => !isValidString(exp[field])
    );

    if (missingFields.length > 0) {
      console.error(
        `Experience number #${index + 1} with ${exp.company || exp.role} validation failed:
        Company: ${exp.company || "Unknown"}
        Missing/empty required fields: ${missingFields.join(", ")}
        Current values:
        - company: "${exp.company || ""}"
        - role: "${exp.role || ""}"
        - date: "${exp.date || ""}"
        - desc: "${exp.desc || ""}"`
      );
      return false;
    }
    return true;
  };

  if (!workExperiences.display) {
    return null;
  }

  // Filter out invalid experiences
  const validExperiences = workExperiences.experience.filter((exp, index) =>
    validateExperience(exp, index)
  );

  if (validExperiences.length === 0) {
    console.error("WorkExperience: No valid experiences to display");
    return null;
  }

  return (
    <div id="experience">
      <Fade direction="up" triggerOnce distance="20px">
        <div className="experience-container" id="workExperience">
          <div>
            <h1 className="experience-heading">Experiences</h1>
            <div className="experience-cards-div">
              {validExperiences.map((card, i) => (
                <ExperienceCard
                  key={i}
                  isDark={isDark}
                  cardInfo={{
                    company: card.company,
                    desc: card.desc,
                    date: card.date,
                    companyLogo: card.companyLogo,
                    role: card.role,
                    descBullets: card.descBullets
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
