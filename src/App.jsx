import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa";

function App() {
  // State for user input
  const [name, setName] = useState("");
  const [profileSummary, setProfileSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState([
    { school: "", degree: "", year: "", cgpaOrPercentage: "" },
    { school: "", degree: "", year: "", cgpaOrPercentage: "" },
    { school: "", degree: "", year: "", cgpaOrPercentage: "" },
  ]);
  const [experience, setExperience] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [languages, setLanguages] = useState("");
  const [certifications, setCertifications] = useState("");
  const [projects, setProjects] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");

  // State for submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // Handle profile picture upload
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const data = {
      name,
      profileSummary,
      skills,
      contact,
      email,
      dateOfBirth,
      address,
      education,
      experience,
      hobbies,
      languages,
      certifications,
      projects,
      linkedin: linkedin.startsWith("http") ? linkedin : `https://${linkedin}`,
      github: github.startsWith("http") ? github : `https://${github}`,
      profilePic,
    };
    setSubmittedData(data);
    console.log("Submitted Data:", data); // Debugging: Log submitted data
    setError("");
  };

  // Reset form
  const handleReset = () => {
    setName("");
    setProfileSummary("");
    setSkills("");
    setContact("");
    setEmail("");
    setDateOfBirth("");
    setAddress("");
    setEducation([
      { school: "", degree: "", year: "", cgpaOrPercentage: "" },
      { school: "", degree: "", year: "", cgpaOrPercentage: "" },
      { school: "", degree: "", year: "", cgpaOrPercentage: "" },
    ]);
    setExperience("");
    setHobbies("");
    setLanguages("");
    setCertifications("");
    setProjects("");
    setLinkedin("");
    setGithub("");
    setProfilePic(null);
    setSubmittedData(null);
    setError("");
  };

  // Handle education input change
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  // Generate and download PDF
  const handleDownloadPDF = () => {
    try {
      if (!submittedData) {
        setError("No data submitted. Please fill the form and submit first.");
        return;
      }

      const doc = new jsPDF();
      let y = 20; // Vertical position for content

      // Function to add a new page if content overflows
      const addNewPageIfNeeded = () => {
        if (y > 280) {
          doc.addPage();
          y = 20; // Reset y position for the new page
        }
      };

      // Add profile picture to PDF
      if (submittedData.profilePic) {
        doc.addImage(submittedData.profilePic, "JPEG", 20, y, 40, 40);
      }

      // Add name and contact details
      doc.setFontSize(16);
      doc.text(submittedData.name, 70, y + 10);
      doc.setFontSize(12);
      y += 20;

      // Add email, contact, address, LinkedIn, and GitHub without icons or labels
      if (submittedData.email) {
        doc.text(`${submittedData.email}`, 70, y);
        y += 10;
      }
      if (submittedData.contact) {
        doc.text(`${submittedData.contact}`, 70, y);
        y += 10;
      }
      if (submittedData.address) {
        doc.text(`${submittedData.address}`, 70, y);
        y += 10;
      }
      if (submittedData.linkedin) {
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(`${submittedData.linkedin}`, 70, y, { url: submittedData.linkedin });
        doc.setTextColor(0, 0, 0);
        y += 10;
      }
      if (submittedData.github) {
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(`${submittedData.github}`, 70, y, { url: submittedData.github });
        doc.setTextColor(0, 0, 0);
        y += 10;
      }

      // Add a horizontal line
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 10;

      // Add profile summary (only if not empty)
      if (submittedData.profileSummary) {
        doc.setFontSize(14);
        doc.text("Profile Summary:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const profileSummaryLines = doc.splitTextToSize(submittedData.profileSummary, 170);
        doc.text(profileSummaryLines, 20, y);
        y += profileSummaryLines.length * 7 + 10;
        addNewPageIfNeeded();
      }

      // Add skills (only if not empty)
      if (submittedData.skills) {
        doc.setFontSize(14);
        doc.text("Skills:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const skillsLines = doc.splitTextToSize(submittedData.skills, 170);
        doc.text(skillsLines, 20, y);
        y += skillsLines.length * 7 + 10;
        addNewPageIfNeeded();
      }

      // Add education in simple line format (only if not empty)
      if (submittedData.education.some((edu) => edu.school || edu.degree || edu.year || edu.cgpaOrPercentage)) {
        doc.setFontSize(14);
        doc.text("Education:", 20, y);
        y += 10;
        doc.setFontSize(12);
        submittedData.education.forEach((edu, index) => {
          if (edu.school || edu.degree || edu.year || edu.cgpaOrPercentage) {
            const educationLine = `${index + 1}. ${edu.school} - ${edu.degree} (${edu.year}), ${edu.cgpaOrPercentage}`;
            doc.text(educationLine, 20, y);
            y += 10;
            addNewPageIfNeeded();
          }
        });
      }

      // Add experience (only if not empty)
      if (submittedData.experience) {
        doc.setFontSize(14);
        doc.text("Experience:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const experienceLines = doc.splitTextToSize(submittedData.experience, 170);
        doc.text(experienceLines, 20, y);
        y += experienceLines.length * 7 + 10;
        addNewPageIfNeeded();
      }

      // Add hobbies (only if not empty)
      if (submittedData.hobbies) {
        doc.setFontSize(14);
        doc.text("Hobbies:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const hobbiesLines = doc.splitTextToSize(submittedData.hobbies, 170);
        doc.text(hobbiesLines, 20, y);
        y += hobbiesLines.length * 7 + 10;
        addNewPageIfNeeded();
      }

      // Add languages (only if not empty)
      if (submittedData.languages) {
        doc.setFontSize(14);
        doc.text("Languages:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const languagesLines = doc.splitTextToSize(submittedData.languages, 170);
        doc.text(languagesLines, 20, y);
        y += languagesLines.length * 7 + 10;
        addNewPageIfNeeded();
      }

      // Add certifications (only if not empty)
      if (submittedData.certifications) {
        doc.setFontSize(14);
        doc.text("Certifications:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const certificationsLines = doc.splitTextToSize(submittedData.certifications, 170);
        doc.text(certificationsLines, 20, y);
        y += certificationsLines.length * 7 + 10;
        addNewPageIfNeeded();
      }

      // Add projects (only if not empty)
      if (submittedData.projects) {
        doc.setFontSize(14);
        doc.text("Projects:", 20, y);
        y += 10;
        doc.setFontSize(12);
        const projectsLines = doc.splitTextToSize(submittedData.projects, 170);
        doc.text(projectsLines, 20, y);
      }

      // Save the PDF
      doc.save("Introduction.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error); // Debugging: Log any errors
      setError("An error occurred while generating the PDF. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Create Your Introduction</h1>

      {/* Input Form */}
      <div className="form-container">
        <label className="form-label">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleProfileUpload} className="form-input" />
        {error && <p className="error-message">{error}</p>}
        {profilePic && (
          <div className="profile-pic-container">
            <img src={profilePic} alt="Profile Preview" className="profile-pic" />
          </div>
        )}

        <label className="form-label">Name</label>
        <input type="text" className="form-input" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="form-label">Profile Summary</label>
        <textarea className="form-input" placeholder="Enter your profile summary" value={profileSummary} onChange={(e) => setProfileSummary(e.target.value)} />

        <label className="form-label">Skills</label>
        <input type="text" className="form-input" placeholder="Enter your skills" value={skills} onChange={(e) => setSkills(e.target.value)} />

        <label className="form-label">Contact</label>
        <input type="text" className="form-input" placeholder="Enter your contact info" value={contact} onChange={(e) => setContact(e.target.value)} />

        <label className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="form-label">Date of Birth</label>
        <input type="date" className="form-input" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

        <label className="form-label">Address</label>
        <input type="text" className="form-input" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />

        {/* Education Section */}
        <label className="form-label">Education</label>
        {education.map((edu, index) => (
          <div key={index} className="education-input-group">
            <input
              type="text"
              className="form-input"
              placeholder={`School/University ${index + 1}`}
              value={edu.school}
              onChange={(e) => handleEducationChange(index, "school", e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder={`Degree ${index + 1}`}
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder={`Year ${index + 1}`}
              value={edu.year}
              onChange={(e) => handleEducationChange(index, "year", e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder={`CGPA/Percentage ${index + 1}`}
              value={edu.cgpaOrPercentage}
              onChange={(e) => handleEducationChange(index, "cgpaOrPercentage", e.target.value)}
            />
          </div>
        ))}

        <label className="form-label">Experience</label>
        <textarea className="form-input" placeholder="Enter your experience" value={experience} onChange={(e) => setExperience(e.target.value)} />

        <label className="form-label">Hobbies</label>
        <input type="text" className="form-input" placeholder="Enter your hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />

        <label className="form-label">Languages</label>
        <input type="text" className="form-input" placeholder="Enter languages you know" value={languages} onChange={(e) => setLanguages(e.target.value)} />

        <label className="form-label">Certifications</label>
        <input type="text" className="form-input" placeholder="Enter your certifications" value={certifications} onChange={(e) => setCertifications(e.target.value)} />

        <label className="form-label">Projects</label>
        <textarea className="form-input" placeholder="Enter your projects" value={projects} onChange={(e) => setProjects(e.target.value)} />

        <label className="form-label">LinkedIn</label>
        <input type="text" className="form-input" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

        <label className="form-label">GitHub</label>
        <input type="text" className="form-input" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} />

        <div className="form-buttons">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Display Section */}
      {submittedData && (
        <div className="display-container">
          <div className="display-header">
            {/* Left Side: Profile Picture */}
            {submittedData.profilePic && (
              <div className="profile-pic-container">
                <img src={submittedData.profilePic} alt="Profile" className="profile-pic" />
              </div>
            )}

            {/* Right Side: Contact Details */}
            <div className="contact-details">
              <h2 className="display-name">{submittedData.name}</h2>
              <div className="contact-info">
                {submittedData.email && (
                  <p className="contact-item">
                    <FaEnvelope className="contact-icon" /> {submittedData.email}
                  </p>
                )}
                {submittedData.contact && (
                  <p className="contact-item">
                    <FaPhone className="contact-icon" /> {submittedData.contact}
                  </p>
                )}
                {submittedData.address && (
                  <p className="contact-item">
                    <FaMapMarker className="contact-icon" /> {submittedData.address}
                  </p>
                )}
                {submittedData.linkedin && (
                  <a href={submittedData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-item">
                    <FaLinkedin className="contact-icon" /> {submittedData.linkedin}
                  </a>
                )}
                {submittedData.github && (
                  <a href={submittedData.github} target="_blank" rel="noopener noreferrer" className="contact-item">
                    <FaGithub className="contact-icon" /> {submittedData.github}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Rest of the Details */}
          <div className="display-details">
            <p className="detail-item">Date of Birth: {submittedData.dateOfBirth}</p>
            {submittedData.profileSummary && <p className="detail-item">Profile Summary: {submittedData.profileSummary}</p>}
            {submittedData.skills && <p className="detail-item">Skills: {submittedData.skills}</p>}

            {/* Education Section in Simple Line Format */}
            {submittedData.education.some((edu) => edu.school || edu.degree || edu.year || edu.cgpaOrPercentage) && (
              <>
                <p className="detail-item">Education:</p>
                {submittedData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <p>{index + 1}. {edu.school} - {edu.degree} ({edu.year}), {edu.cgpaOrPercentage}</p>
                  </div>
                ))}
              </>
            )}

            {submittedData.experience && <p className="detail-item">Experience: {submittedData.experience}</p>}
            {submittedData.hobbies && <p className="detail-item">Hobbies: {submittedData.hobbies}</p>}
            {submittedData.languages && <p className="detail-item">Languages: {submittedData.languages}</p>}
            {submittedData.certifications && <p className="detail-item">Certifications: {submittedData.certifications}</p>}
            {submittedData.projects && <p className="detail-item">Projects: {submittedData.projects}</p>}
          </div>

          <button className="download-button" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;