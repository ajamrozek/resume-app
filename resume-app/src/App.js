import './App.css';
import React, { Component } from 'react';
import { format } from 'date-fns'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resumeData: null
    };
  }

  SkillsSection = ({ skills }) => {
    if (!skills) return null;
    
    const skillCategories = Object.keys(skills);
    return (
      <div className="skills-section">
        {skillCategories.map(category => (
          <div className="skill-category" key={category}>
            <h5 className="skill-category-title">{category}</h5>
            <ul className="skill-list">
              {skills[category].map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  EducationSection = ({ education }) => {
    if (!education) return null;

    return (
      <div className="education-section">
        {education.map((edu, idx) => (
          <div key={idx} className="education-item">
            <div className="edu-header">
              <strong className="edu-name">{edu.name}</strong>
              <span className="edu-dates">
                {edu.location && <span className="edu-location">({edu.location})</span>}
                {edu.start && <span>{edu.start} - </span>}
                {edu.end}
              </span>
            </div>
            <div className="edu-field">{edu.field}</div>
          </div>
        ))}
      </div>
    );
  };
  ExperienceSection = ({ jobs }) => {
    if (!jobs) return null;

    const parseEndClients = (endClients) => {
      if (endClients) {
        return <div className="end-clients">End Clients: {endClients.join(', ')}</div>;
      }
      return null;
    };

    const sortedJobs = [...jobs].sort((a, b) => 
      Date.parse(a.start) < Date.parse(b.start) ? 1 : -1
    );

    return (
      <div className="experience-section">
        {sortedJobs.map((job, idx) => (
          <div key={idx} className="job-item">
            <div className="job-header">
              <div className="job-main">
                <strong className="company-name">{job.clientName}</strong>
                <span className="job-title">{job.title} - {job.terms}</span>
              </div>
              <div className="job-meta">
                <span className="job-dates">
                  {format(Date.parse(job.start), "M/yyyy")} - {job.end ? format(Date.parse(job.end), "M/yyyy") : "present"}
                </span>
                <span className="job-location">{job.location}</span>
              </div>
            </div>
            {parseEndClients(job.endClients)}
            <div 
              className="job-details"
              dangerouslySetInnerHTML={{ __html: job.details.join("") }} 
            />
          </div>
        ))}
      </div>
    );
  };

  GetResumeData = () => {
    this.setState({ resumeData: require('./resume.json') });
  };

  render() {
    const { resumeData } = this.state;

    return (
      <div className="App">
        <header className="resume-header">
          <h1 className="name">{resumeData?.name || 'Alex Jamrozek'}</h1>
          <h2 className="title">{resumeData?.title}</h2>
          {resumeData?.summary && <p className="summary">{resumeData?.summary}</p>}
        </header>

        <main className="resume-body">
          <section className="section skills-section-wrapper">
            <h3 className="section-title">Core Skills</h3>
            <this.SkillsSection skills={resumeData?.skills} />
          </section>

          <section className="section">
            <h3 className="section-title">Professional Experience</h3>
            <this.ExperienceSection jobs={resumeData?.jobs} />
          </section>

          {resumeData?.certifications && (
            <section className="section">
              <h3 className="section-title">Certifications</h3>
              <div className="certification-list">
                {resumeData.certifications.map((cert, idx) => (
                  <div key={idx} className="cert-item">
                    <strong>{cert.name}</strong> • {cert.date}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="section">
            <h3 className="section-title">Education</h3>
            <this.EducationSection education={resumeData?.education} />
          </section>
        </main>
      </div>
    );
  }

  componentDidMount() {
    this.GetResumeData();

  }
}

export default App;
