import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  // State for user input
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [contact, setContact] = useState("");
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

  // State for submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // Handle profile picture upload
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
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
    setSubmittedData({
      name,
      bio,
      skills,
      contact,
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
      linkedin,
      github,
      profilePic,
    });
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
    doc.text(`Name: ${submittedData.name}`, 20, 40);
    doc.text(`Date of Birth: ${submittedData.dateOfBirth}`, 20, 50);
    doc.text(`Age: ${submittedData.age}`, 20, 60);
    doc.text(`Address: ${submittedData.address}`, 20, 70);
    doc.text(`Contact: ${submittedData.contact}`, 20, 80);
    doc.text(`Bio: ${submittedData.bio}`, 20, 95);
    doc.text(`Skills: ${submittedData.skills}`, 20, 110);
    doc.text(`10th Grade: ${submittedData.tenth}`, 20, 125);
    doc.text(`12th Grade: ${submittedData.twelfth}`, 20, 135);
    doc.text(`Graduation: ${submittedData.graduation}`, 20, 145);
    doc.text(`Experience: ${submittedData.experience}`, 20, 160);
    doc.text(`Hobbies: ${submittedData.hobbies}`, 20, 175);
    doc.text(`Languages: ${submittedData.languages}`, 20, 185);
    doc.text(`Certifications: ${submittedData.certifications}`, 20, 195);
    doc.text(`Projects: ${submittedData.projects}`, 20, 205);
    doc.text(`LinkedIn: ${submittedData.linkedin}`, 20, 215);
    doc.text(`GitHub: ${submittedData.github}`, 20, 225);

    if (submittedData.profilePic) {
      doc.addImage(submittedData.profilePic, "JPEG", 150, 20, 40, 40);
    }

    doc.save("My_Introduction.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Resume</h1>

      {/* Input Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleProfileUpload} className="mb-3" />
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

        <button className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Display Section */}
      {submittedData && (
        <div className="mt-10 bg-gray-800 text-white p-6 rounded-lg w-full max-w-lg text-center">
          {submittedData.profilePic && <img src={submittedData.profilePic} alt="Profile" className="w-24 h-24 mx-auto rounded-full mb-4" />}
          <h2 className="text-2xl font-bold">{submittedData.name}</h2>
          <p className="mt-2">Date of Birth: {submittedData.dateOfBirth}</p>
          <p className="mt-2">Age: {submittedData.age}</p>
          <p className="mt-2">Address: {submittedData.address}</p>
          <p className="mt-2">Contact: {submittedData.contact}</p>
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
          <p className="mt-2">LinkedIn: {submittedData.linkedin}</p>
          <p className="mt-2">GitHub: {submittedData.github}</p>

          <button className="mt-4 bg-green-500 p-2 rounded-md hover:bg-green-600" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;