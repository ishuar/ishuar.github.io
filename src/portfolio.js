/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Ishan Sharma",
  title: "Hello everyone, I'm Ishan",
  subTitle: emoji(
    "Skilled DevOps Engineer 🚀  with expertise in Terraform, Kubernetes, Public Cloud (AWS and Azure), and GitOps. Experienced in architecting and optimizing scalable infrastructure solutions for web applications. Committed to automation, efficiency, and continuous improvement."
  ),
  resumeLink:
    // DevOps 7+ years of experience ::git blame::
    "https://drive.google.com/file/d/1uDeEl-3DQMW8Y0KDLZQwToUbY0WWIBSG/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/ishuar",
  linkedin: "https://www.linkedin.com/in/ishuar/",
  gmail: "ishansharma8870@gmail.com",
  // Instagram, Twitter and Kaggle are also supported in the links!
  instagram: "https://www.instagram.com/hamburgerindian/",
  stackoverflow: "https://stackoverflow.com/users/15808105/ishuar",
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I have learned so far.",
  subTitle:
    "Eager to expand knowledge and acquire new skills to stay at the forefront of industry trends and advancements.",
  skills: [
    emoji("⚡ Migrations from CLICKOPS to Infrastructure as Code."),
    emoji("⚡ Maintaining production grade Kubernetes clusters."),
    emoji("⚡ Educate and support enterprises in their cloud journey.")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Terraform",
      fontAwesomeClassname: "fa-solid fa-cloud-arrow-up"
    },
    {
      skillName: "Kubernetes",
      fontAwesomeClassname: "fa-solid fa-dharmachakra"
    },
    {
      skillName: "GitOps",
      fontAwesomeClassname: "fab fa-gitkraken"
    },
    {
      skillName: "Helm",
      fontAwesomeClassname: "fa-solid fa-dharmachakra"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Shell Scripting",
      fontAwesomeClassname: "fa-solid fa-terminal"
    },
    {
      skillName: "Amazon Web Services",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "Microsoft Azure",
      fontAwesomeClassname: "fab fa-microsoft"
    },
    {
      skillName: "GitHub",
      fontAwesomeClassname: "fab fa-github"
    },
    {
      skillName: "Azure DevOps",
      fontAwesomeClassname: "fa-solid fa-infinity"
    },
    {
      skillName: "Ansible",
      fontAwesomeClassname: "fa-solid fa-gears"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Delhi University",
      logo: require("./assets/images/delhiUniversity.png"),
      subHeader: "Bachelor of Science in Electronics",
      duration: "September 2016",
      desc: "",
      descBullets: []
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Terraform", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Kubernetes",
      progressPercentage: "75%"
    },
    {
      Stack: "Public Cloud",
      progressPercentage: "75%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Senior DevOps Engineer",
      company: "About You",
      companylogo: require("./assets/images/AboutYou.png"),
      date: "March 2024 – Present",
      desc: "Empowering the Payment Team and contributing to Lifecycle of system from infrastructure and Security Stand point.",
      descBullets: []
    },
    {
      role: "Site Reliability Engineer",
      company: "Commercetools",
      companylogo: require("./assets/images/commercetools.png"),
      date: "December 2023 – March 2024",
      desc: "Empowering the Special Delivery Team and contributing to faster and reliable service deliveries.",
      descBullets: [
        "Continuously optimizing processes to elevate overall team performance and customer satisfaction.",
        "Support architecture in Multi-Cloud Kubernetes Deployments ArgoCD"
      ]
    },
    {
      role: "Site Reliability Engineer",
      company: "Cloudeteer",
      companylogo: require("./assets/images/cloudeteer.png"),
      date: "September 2021 – November 2023",
      desc: "Supporting Mid and Large Scale Enterprises for a successful migration to cloud and Devops Journey.",
      descBullets: [
        "Supporting Enterprise Customers in their Multi-Cloud Journey.",
        "Educating and helping Enterprises on IaaC and GitOps principles.",
        "Reduced production Downtime by 50% by Setting up Proactive observability and alerting on the cloud workload."
      ]
    },
    {
      role: "Senior Engineer",
      company: "HELLA",
      companylogo: require("./assets/images/hella.png"),
      date: "October 2019 – August 2021",
      desc: "Web Application and Citrix networking administrator.",
      descBullets: [
        "Citrix Netscaler Administration",
        "Migrating Monolithic to Microservices architecture on Kubernetes platform closely working with Developers",
        "Web Application Administration"
      ]
    },
    {
      role: "Technical Support Consultant",
      company: "Adobe",
      companylogo: require("./assets/images/adobe.png"),
      date: "December 2018 – October 2019",
      desc: "Creative Cloud suite and Single sign on consultant.",
      descBullets: [
        "Providing global Support for Adobe's Creative Cloud suite as a single sign on & product expert."
      ]
    },
    {
      role: "Analyst",
      company: "HCL Technologies",
      companylogo: require("./assets/images/hcl.png"),
      date: "September 2016 – Sep December 2018",
      desc: "IT Infrastructure Support Analyst.",
      descBullets: [
        "Supporting IT infrastructure of ExxonMobil Corporation with a major role in analyzing & troubleshooting multiple end-user programs."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://nextu.se/"
        }
      ]
    }
  ],
  // display: FontFaceSetLoadEvent // Set false to hide this section, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle: "Achievements, Certifications, and Award Letters.",

  achievementsCards: [
    {
      title: "Certified Kubernetes Administrator",
      subtitle: "Cloud Native Computing Foundation Certification",
      image: require("./assets/images/certified-kubernetes-admin.png"),
      imageAlt: "CKA",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.credly.com/badges/d92e6780-c1e8-4222-be8d-a93775b78d71"
        }
      ]
    },
    {
      title: "GitOps Certified For Argo",
      subtitle: "CodeFresh Certification for ArgoCD GitOps Fundamentals.",
      image: require("./assets/images/argo-fundamentals.png"),
      imageAlt: "ArgoCD GitOops Fundamentals",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1c8Z4j31QUEqpNjrPr6egiCNCiOyJvK_8/view?usp=sharing"
        }
      ]
    },

    {
      title: "Terraform Award of Completion",
      subtitle: "Certification Of Completion from KodeKloud",
      image: require("./assets/images/terraform-award-of-completion.png"),
      imageAlt: "Terraform Award of Completion",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/1zEOQkmP0YxH_KuWvho_NwuX8-gkj1fLJ/view?usp=sharing"
        }
      ]
    },
    {
      title: "Citrix Certified Associate Networking",
      subtitle:
        "Citrix Certified Associate in Networking, App Delivery and Security.",
      image: require("./assets/images/citrix-certified-networking.png"),
      imageAlt: "Citrix Certifications",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.credly.com/badges/d52d436f-71af-4fbd-9ea1-a6cd4c3c3a5d"
        }
      ]
    },
    {
      title: "AWS Certified Solutions Architect",
      subtitle: "AWS Certified Solutions Architect - Associate.",
      image: require("./assets/images/aws-certified-solutions-architect.png"),
      imageAlt: "AWS Certifications",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/12tZo6di_CW7RefI9NmRmTZGsvivbU3DE/view?usp=sharing"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "I am Passionate about knowledge sharing and helping individuals excel in their learning journeys.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me  ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for both.",
  email_address: "ishansharma887@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "ishuar_", //Replace "Twitter" with your Twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be displayed as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};
