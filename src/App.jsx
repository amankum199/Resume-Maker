import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa"; // Import icons

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
    { school: "", year: "", cgpaOrPercentage: "" },
    { school: "", year: "", cgpaOrPercentage: "" },
    { school: "", year: "", cgpaOrPercentage: "" },
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
    setSubmittedData({
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
    });
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
      { school: "", year: "", cgpaOrPercentage: "" },
      { school: "", year: "", cgpaOrPercentage: "" },
      { school: "", year: "", cgpaOrPercentage: "" },
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
    if (!submittedData) return;

    const doc = new jsPDF();
    let y = 20; // Vertical position for content

    // Add profile picture to PDF
    if (submittedData.profilePic) {
      doc.addImage(submittedData.profilePic, "JPEG", 20, y, 40, 40);
    }

    // Add name and contact details
    doc.setFontSize(16);
    doc.text(submittedData.name, 70, y + 10);
    doc.setFontSize(12);
    y += 20;

    // Add email, contact, address, LinkedIn, and GitHub with icons
    if (submittedData.email) {
      doc.text(`📧 ${submittedData.email}`, 70, y);
      y += 10;
    }
    if (submittedData.contact) {
      doc.text(`📞 ${submittedData.contact}`, 70, y);
      y += 10;
    }
    if (submittedData.address) {
      doc.text(`📍 ${submittedData.address}`, 70, y);
      y += 10;
    }
    if (submittedData.linkedin) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(`🔗 ${submittedData.linkedin}`, 70, y, { url: submittedData.linkedin });
      doc.setTextColor(0, 0, 0);
      y += 10;
    }
    if (submittedData.github) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(`🐙 ${submittedData.github}`, 70, y, { url: submittedData.github });
      doc.setTextColor(0, 0, 0);
      y += 10;
    }

    // Add a horizontal line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 10;

    // Add profile summary
    if (submittedData.profileSummary) {
      doc.setFontSize(14);
      doc.text("Profile Summary:", 20, y);
      y += 10;
      doc.setFontSize(12);
      const profileSummaryLines = doc.splitTextToSize(submittedData.profileSummary, 170);
      doc.text(profileSummaryLines, 20, y);
      y += profileSummaryLines.length * 7 + 10;
    }

    // Add skills
    if (submittedData.skills) {
      doc.setFontSize(14);
      doc.text("Skills:", 20, y);
      y += 10;
      doc.setFontSize(12);
      const skillsLines = doc.splitTextToSize(submittedData.skills, 170);
      doc.text(skillsLines, 20, y);
      y += skillsLines.length * 7 + 10;
    }

    // Add education
    if (submittedData.education.some((edu) => edu.school || edu.year || edu.cgpaOrPercentage)) {
      doc.setFontSize(14);
      doc.text("Education:", 20, y);
      y += 10;
      doc.setFontSize(12);
      submittedData.education.forEach((edu, index) => {
        if (edu.school || edu.year || edu.cgpaOrPercentage) {
          doc.text(`  ${index + 1}. School/University: ${edu.school}`, 20, y);
          y += 10;
          doc.text(`     Year: ${edu.year}`, 20, y);
          y += 10;
          doc.text(`     CGPA/Percentage: ${edu.cgpaOrPercentage}`, 20, y);
          y += 10;
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

    // Add new page if content overflows
    if (y > 280) {
      doc.addPage();
      y = 20; // Reset y position for the new page
    }

    // Save the PDF
    doc.save("Introduction.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Introduction</h1>

      {/* Input Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleProfileUpload} className="mb-3" />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {profilePic && (
          <div className="mt-3 flex justify-center">
            <img src={profilePic} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Profile Summary</label>
        <textarea className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your profile summary" value={profileSummary} onChange={(e) => setProfileSummary(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your skills" value={skills} onChange={(e) => setSkills(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Contact</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your contact info" value={contact} onChange={(e) => setContact(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" className="w-full p-2 border border-gray-300 rounded-md mb-3" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />

        {/* Education Section */}
        <label className="block text-sm font-medium text-gray-700">Education</label>
        {education.map((edu, index) => (
          <div key={index} className="mb-3">
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder={`School/University ${index + 1}`} value={edu.school} onChange={(e) => handleEducationChange(index, "school", e.target.value)} />
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder={`Year ${index + 1}`} value={edu.year} onChange={(e) => handleEducationChange(index, "year", e.target.value)} />
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-2" placeholder={`CGPA/Percentage ${index + 1}`} value={edu.cgpaOrPercentage} onChange={(e) => handleEducationChange(index, "cgpaOrPercentage", e.target.value)} />
          </div>
        ))}

        <label className="block text-sm font-medium text-gray-700">Experience</label>
        <textarea className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your experience" value={experience} onChange={(e) => setExperience(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Hobbies</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Languages</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter languages you know" value={languages} onChange={(e) => setLanguages(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Certifications</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your certifications" value={certifications} onChange={(e) => setCertifications(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Projects</label>
        <textarea className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your projects" value={projects} onChange={(e) => setProjects(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">GitHub</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} />

        <div className="flex space-x-4">
          <button className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600" onClick={handleSubmit}>
            Submit
          </button>
          <button className="w-full bg-red-500 text-white p-2 rounded-md mt-4 hover:bg-red-600" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Display Section */}
      {submittedData && (
        <div className="mt-10 bg-gray-800 text-white p-6 rounded-lg w-full max-w-lg">
          <div className="flex">
            {/* Left Side: Profile Picture */}
            {submittedData.profilePic && (
              <div className="w-1/3 flex justify-center">
                <img src={submittedData.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              </div>
            )}

            {/* Right Side: Contact Details */}
            <div className="w-2/3">
              <h2 className="text-2xl font-bold">{submittedData.name}</h2>
              <div className="mt-2 space-y-2">
                {submittedData.email && (
                  <p className="flex items-center">
                    <FaEnvelope className="mr-2" /> {submittedData.email}
                  </p>
                )}
                {submittedData.contact && (
                  <p className="flex items-center">
                    <FaPhone className="mr-2" /> {submittedData.contact}
                  </p>
                )}
                {submittedData.address && (
                  <p className="flex items-center">
                    <FaMapMarker className="mr-2" /> {submittedData.address}
                  </p>
                )}
                {submittedData.linkedin && (
                  <a href={submittedData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300">
                    <FaLinkedin className="mr-2" /> {submittedData.linkedin}
                  </a>
                )}
                {submittedData.github && (
                  <a href={submittedData.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300">
                    <FaGithub className="mr-2" /> {submittedData.github}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Rest of the Details */}
          <div className="mt-6">
            <p className="mt-2">Date of Birth: {submittedData.dateOfBirth}</p>
            {submittedData.profileSummary && <p className="mt-2">Profile Summary: {submittedData.profileSummary}</p>}
            {submittedData.skills && <p className="mt-2">Skills: {submittedData.skills}</p>}

            {/* Education Section */}
            {submittedData.education.some((edu) => edu.school || edu.year || edu.cgpaOrPercentage) && (
              <>
                <p className="mt-2">Education:</p>
                {submittedData.education.map((edu, index) => (
                  <div key={index} className="ml-4">
                    <p>  {index + 1}. School/University: {edu.school}</p>
                    <p>     Year: {edu.year}</p>
                    <p>     CGPA/Percentage: {edu.cgpaOrPercentage}</p>
                  </div>
                ))}
              </>
            )}

            {submittedData.experience && <p className="mt-2">Experience: {submittedData.experience}</p>}
            {submittedData.hobbies && <p className="mt-2">Hobbies: {submittedData.hobbies}</p>}
            {submittedData.languages && <p className="mt-2">Languages: {submittedData.languages}</p>}
            {submittedData.certifications && <p className="mt-2">Certifications: {submittedData.certifications}</p>}
            {submittedData.projects && <p className="mt-2">Projects: {submittedData.projects}</p>}
          </div>

          <button className="mt-4 bg-green-500 p-2 rounded-md hover:bg-green-600" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;