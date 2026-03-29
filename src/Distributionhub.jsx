import React from "react";
import { FaLinkedin, FaTwitter, FaEnvelope, FaGlobe, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const DistributionHub = () => {

  const container = {
    background: "#0b1220",
    color: "white",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "sans-serif"
  };

  const title = {
    fontSize: "32px",
    marginBottom: "10px"
  };

  const subtitle = {
    color: "#9aa4b2",
    marginBottom: "40px"
  };

  const grid = {
    display: "flex",
    gap: "40px",
    marginTop: "30px",
    fontSize: "55px"
  };

  const iconStyle = {
    color: "#00f5c4",
    cursor: "pointer",
    transition: "0.3s"
  };

  const cardText = {
    marginTop: "30px",
    background: "#121b2f",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "700px",
    lineHeight: "1.6"
  };

  const homeButton = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "30px",
    textDecoration: "none",
    color: "#00f5c4",
    fontSize: "16px"
  };

  return (
    <div style={container}>

      {/* Back Home Button */}
      <Link to="/" style={homeButton}>
        <FaArrowLeft /> Home
      </Link>

      {/* Heading */}
      <h1 style={title}>Distribution Hub</h1>
      <p style={subtitle}>
        Publish your AI-generated enterprise content across multiple channels.
      </p>

      {/* Platform Icons */}
      <div style={grid}>

        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin style={iconStyle} />
        </a>

        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter style={iconStyle} />
        </a>

        <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope style={iconStyle} />
        </a>

        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
          <FaGlobe style={iconStyle} />
        </a>

      </div>

      {/* Problem statement description */}
      <div style={cardText}>
        <h3>Post Your Generated Content Here</h3>

        <p>
          This hub allows teams to distribute AI-generated enterprise content across
          multiple channels including LinkedIn, Twitter/X, Email, and websites.
        </p>

        <p>
          Our AI agent system automates the full lifecycle of enterprise content —
          from creation and compliance review to localization and multi-channel
          distribution. The goal is to improve turnaround time and maintain
          consistent brand messaging across platforms.
        </p>

        <p>
          The platform can use multi-agent pipelines to draft content, review it for
          brand or legal compliance, localize it for different regions, and publish
          it with human approval gates when necessary.
        </p>

        <p>
          Content intelligence agents analyze engagement data across channels,
          identify patterns, and optimize scheduling, targeting, and format to
          improve performance.
        </p>

      </div>

    </div>
  );
};

export default DistributionHub;