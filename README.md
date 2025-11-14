# Carpooling
A smart carpooling platform enabling drivers to post long-distance rides and passengers to book seats with dynamic fare calculation. Built using React, Tailwind CSS, Spring Boot, MySQL, JWT, Google Maps API, Razorpay, and WebSockets for real-time updates, ensuring secure, fast, and sustainable shared travel.


project-root/
│
├── frontend/                 # React Project
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/        # API calls
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.js
│   ├── package.json
│   └── README.md
│
├── backend/                  # Spring Boot Project
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/app/
│   │   │   │       ├── controllers/
│   │   │   │       ├── services/
│   │   │   │       ├── repositories/
│   │   │   │       ├── models/
│   │   │   │       └── App.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── static/
│   │   └── test/
│   ├── pom.xml              # Dependencies
│   └── README.md
│
├── .gitignore               # Ignore node_modules, target, env files
├── README.md                # Project overview
└── docs/                    # API Docs, diagrams, architecture
    ├── ERD.png
    ├── architecture.png
    └── API.md
