import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa"; // Import icons

function App() {
  // State for user input
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [tenth, setTenth] = useState("");
  const [twelfth, setTwelfth] = useState("");
  const [graduation, setGraduation] = useState("");
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

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    if (dob > today) {
      setError("Date of birth cannot be in the future.");
      return null;
    }
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // Handle form submission
  const handleSubmit = () => {
    const age = calculateAge(dateOfBirth);
    if (age === null) return;

    setSubmittedData({
      name,
      bio,
      skills,
      contact,
      email,
      dateOfBirth,
      age,
      address,
      tenth,
      twelfth,
      graduation,
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
    setBio("");
    setSkills("");
    setContact("");
    setEmail("");
    setDateOfBirth("");
    setAddress("");
    setTenth("");
    setTwelfth("");
    setGraduation("");
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

  // Generate and download PDF
  const handleDownloadPDF = () => {
    if (!submittedData) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("My Introduction", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    let y = 40;
    doc.text(`Name: ${submittedData.name}`, 20, y);
    y += 10;
    doc.text(`Date of Birth: ${submittedData.dateOfBirth}`, 20, y);
    y += 10;
    doc.text(`Age: ${submittedData.age}`, 20, y);
    y += 10;
    doc.text(`Address: ${submittedData.address}`, 20, y);
    y += 10;
    doc.text(`Contact: ${submittedData.contact}`, 20, y);
    y += 10;
    doc.text(`Email: ${submittedData.email}`, 20, y);
    y += 15;
    doc.text(`Bio: ${submittedData.bio}`, 20, y);
    y += 15;
    doc.text(`Skills: ${submittedData.skills}`, 20, y);
    y += 15;
    doc.text(`10th Grade: ${submittedData.tenth}`, 20, y);
    y += 10;
    doc.text(`12th Grade: ${submittedData.twelfth}`, 20, y);
    y += 10;
    doc.text(`Graduation: ${submittedData.graduation}`, 20, y);
    y += 15;
    doc.text(`Experience: ${submittedData.experience}`, 20, y);
    y += 15;
    doc.text(`Hobbies: ${submittedData.hobbies}`, 20, y);
    y += 10;
    doc.text(`Languages: ${submittedData.languages}`, 20, y);
    y += 10;
    doc.text(`Certifications: ${submittedData.certifications}`, 20, y);
    y += 10;
    doc.text(`Projects: ${submittedData.projects}`, 20, y);
    y += 10;
    doc.text(`LinkedIn: ${submittedData.linkedin}`, 20, y);
    y += 10;
    doc.text(`GitHub: ${submittedData.github}`, 20, y);

    if (submittedData.profilePic) {
      doc.addImage(submittedData.profilePic, "JPEG", 150, 20, 40, 40);
    }

    doc.save("My_Introduction.pdf");
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

        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Enter your bio" value={bio} onChange={(e) => setBio(e.target.value)} />

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

        <label className="block text-sm font-medium text-gray-700">10th Grade</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="School & Year" value={tenth} onChange={(e) => setTenth(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">12th Grade</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="School & Year" value={twelfth} onChange={(e) => setTwelfth(e.target.value)} />

        <label className="block text-sm font-medium text-gray-700">Graduation</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" placeholder="Degree & University" value={graduation} onChange={(e) => setGraduation(e.target.value)} />

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
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </a>
                )}
                {submittedData.github && (
                  <a href={submittedData.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300">
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Rest of the Details */}
          <div className="mt-6">
            <p className="mt-2">Date of Birth: {submittedData.dateOfBirth}</p>
            <p className="mt-2">Age: {submittedData.age}</p>
            <p className="mt-2">Bio: {submittedData.bio}</p>
            <p className="mt-2">Skills: {submittedData.skills}</p>
            <p className="mt-2">10th Grade: {submittedData.tenth}</p>
            <p className="mt-2">12th Grade: {submittedData.twelfth}</p>
            <p className="mt-2">Graduation: {submittedData.graduation}</p>
            <p className="mt-2">Experience: {submittedData.experience}</p>
            <p className="mt-2">Hobbies: {submittedData.hobbies}</p>
            <p className="mt-2">Languages: {submittedData.languages}</p>
            <p className="mt-2">Certifications: {submittedData.certifications}</p>
            <p className="mt-2">Projects: {submittedData.projects}</p>
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