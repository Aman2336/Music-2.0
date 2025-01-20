import { useState } from "react";
export default function About() {
  const screenshots = [
    "public/images/ss3.png",
    "public/images/ss4.png",
    "public/images/ss5.png",
    "public/images/ss6.png",
    "public/images/ss7.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #1E1E2C, #0D0D15)",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#EAEAEA",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        About Moodify
      </h1>

      {/* Overview */}
      <p
        style={{
          maxWidth: "800px",
          textAlign: "center",
          fontSize: "1.2rem",
          lineHeight: "1.8",
          marginBottom: "2rem",
        }}
      >
        Moodify is your personalized music companion that adapts to your
        emotions. Whether you're feeling upbeat, reflective, or anything in
        between, Moodify detects your mood and curates the perfect playlist to
        match. With seamless features like searching for your favorite songs,
        discovering artists, and managing your liked tracks, we bring music
        closer to you.
      </p>

      {/* Key Features Section */}
      <div style={{ maxWidth: "800px", marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Key Features
        </h2>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            textAlign: "left",
          }}
        >
          {[
            {
              title: "Mood Detection",
              description:
                "AI-driven mood detection that recommends music tailored to your feelings.",
            },
            {
              title: "Search Music",
              description:
                "Find tracks, artists, or songs effortlessly and build your collection of favorites.",
            },
            {
              title: "Profile Page",
              description:
                "Access a personalized profile showcasing your liked songs, all in one place.",
            },
            {
              title: "Secure Authentication",
              description:
                "Enjoy a seamless and secure login and signup experience to protect your data.",
            },
          ].map((feature, index) => (
            <li
              key={index}
              style={{
                marginBottom: "1rem",
                fontSize: "1rem",
                paddingLeft: "1.5rem",
                position: "relative",
              }}
            >
              <strong style={{ color: "#8A2BE2" }}>{feature.title}:</strong>{" "}
              {feature.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Screenshot Section */}
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "400px",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Images */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
          className="mt-4"
        >
          {screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Screenshot ${index + 1}`}
              style={{
                minWidth: "100%",
                height: "500px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0, 0, 0, 0.5)",
            border: "none",
            color: "#fff",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0, 0, 0, 0.5)",
            border: "none",
            color: "#fff",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          &#8250;
        </button>
      </div>

      {/* Call-to-Action */}
      <p
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
        }}
        className="mt-10"
      >
        Ready to elevate your music experience? Start exploring Moodify today
        and discover the perfect tunes for your mood.
      </p>
    </div>
  );
}
