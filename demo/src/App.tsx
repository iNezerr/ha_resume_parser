import { useState } from 'react'
import { parseResumeFromPdf } from 'resume-parser-ts'
import type { Resume } from 'resume-parser-ts'
import './App.css'

function App() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file')
      return
    }

    setLoading(true)
    setError(null)
    setResume(null)

    try {
      const fileUrl = URL.createObjectURL(file)
      const parsedResume = await parseResumeFromPdf(fileUrl)
      setResume(parsedResume)
      URL.revokeObjectURL(fileUrl)
    } catch (err) {
      setError(`Failed to parse resume: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Resume Parser Demo</h1>
        <p>Upload a PDF resume to test the resume-parser-ts package</p>
      </header>

      <div className="upload-section">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={loading}
        />
        {loading && <p>Parsing resume...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {resume && (
        <div className="resume-display">
          <h2>Parsed Resume Data</h2>
          
          <section>
            <h3>Profile</h3>
            <div className="profile">
              <p><strong>Name:</strong> {resume.profile.name || 'Not found'}</p>
              <p><strong>Email:</strong> {resume.profile.email || 'Not found'}</p>
              <p><strong>Phone:</strong> {resume.profile.phone || 'Not found'}</p>
              <p><strong>Location:</strong> {resume.profile.location || 'Not found'}</p>
              <p><strong>URL:</strong> {resume.profile.url || 'Not found'}</p>
              {resume.profile.summary && (
                <p><strong>Summary:</strong> {resume.profile.summary}</p>
              )}
            </div>
          </section>

          <section>
            <h3>Work Experience ({resume.workExperiences.length})</h3>
            {resume.workExperiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <h4>{exp.jobTitle} at {exp.company}</h4>
                <p><strong>Date:</strong> {exp.date}</p>
                {exp.descriptions.length > 0 && (
                  <ul>
                    {exp.descriptions.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section>
            <h3>Education ({resume.educations.length})</h3>
            {resume.educations.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.degree} from {edu.school}</h4>
                <p><strong>Date:</strong> {edu.date}</p>
                {edu.gpa && <p><strong>GPA:</strong> {edu.gpa}</p>}
                {edu.descriptions.length > 0 && (
                  <ul>
                    {edu.descriptions.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section>
            <h3>Projects ({resume.projects.length})</h3>
            {resume.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h4>{project.project}</h4>
                <p><strong>Date:</strong> {project.date}</p>
                {project.descriptions.length > 0 && (
                  <ul>
                    {project.descriptions.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section>
            <h3>Skills</h3>
            {resume.skills.featuredSkills.length > 0 && (
              <div className="featured-skills">
                <h4>Featured Skills:</h4>
                <ul>
                  {resume.skills.featuredSkills.map((skill, index) => (
                    <li key={index}>
                      {skill.skill} (Rating: {skill.rating})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {resume.skills.descriptions.length > 0 && (
              <div className="skill-descriptions">
                <h4>Additional Skills:</h4>
                <ul>
                  {resume.skills.descriptions.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <details>
            <summary>Raw JSON Data</summary>
            <pre>{JSON.stringify(resume, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  )
}

export default App
