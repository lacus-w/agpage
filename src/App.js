import React, { useState } from 'react';
import './style.css';

const assignmentsData = [
  { id: 1, title: 'Week 1 Homework', description: 'Complete exercises on basic JavaScript.' },
  { id: 2, title: 'Week 2 Project', description: 'Build a simple web application using React.' },
];

function App() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [testResults, setTestResults] = useState('');
  const [gradingResults, setGradingResults] = useState('');

  const handleAddAssignment = (newAssignment) => {
    setAssignments([...assignments, newAssignment]);
    setShowAddForm(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Here you can add logic to upload the file to a server or process it further
    }
  };

  const runTests = () => {
    // Simulate running tests with random results
    const testCount = Math.floor(Math.random() * 5) + 3; // Random number of tests between 3 and 7
    let results = 'Running tests...\n\n';
    for (let i = 1; i <= testCount; i++) {
      const passed = Math.random() > 0.5; // Randomly pass or fail each test
      results += `Test ${i}: ${passed ? 'Passed' : 'Failed'}\n`;
    }
    setTestResults(results);
  };

  const automateGrading = () => {
    // Simulate automated grading with random score and comments
    const score = Math.floor(Math.random() * 101); // Random score between 0 and 100
    const comments = ['Good job!', 'Needs improvement.', 'Excellent work!', 'Try harder next time.', 'Keep it up!'];
    const comment = comments[Math.floor(Math.random() * comments.length)]; // Random comment
    setGradingResults(`Automating grading...\n\nScore: ${score}/100\nComments: ${comment}`);
  };

  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setTestResults(''); // Clear test results when switching assignments
    setGradingResults(''); // Clear grading results when switching assignments
  };

  return (
    <div className="app">
      <header>
        <h1>GitHub Classroom</h1>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Assignment'}
        </button>
      </header>
      <main>
        {showAddForm && (
          <AddAssignmentForm onAdd={handleAddAssignment} />
        )}
        {!showAddForm && (
          <>
            <aside>
              <ul className="assignment-list">
                {assignments.map((assignment) => (
                  <li key={assignment.id} onClick={() => handleSelectAssignment(assignment)}>
                    <span className="assignment-icon">📝</span>
                    <span className="assignment-title">{assignment.title}</span>
                  </li>
                ))}
              </ul>
            </aside>
            <section className="assignment-detail">
              {selectedAssignment ? (
                <div>
                  <h2>{selectedAssignment.title}</h2>
                  <p>{selectedAssignment.description}</p>
                  <button onClick={() => setShowUploadForm(!showUploadForm)}>
                    {showUploadForm ? 'Cancel Upload' : 'Upload My Code'}
                  </button>
                  {showUploadForm && (
                    <form className="upload-form" onSubmit={(e) => e.preventDefault()}>
                      <label htmlFor="code-file">Select your code file:</label>
                      <input type="file" id="code-file" onChange={handleFileUpload} accept=".zip,.rar,.txt,.js" />
                    </form>
                  )}
                  <div className="actions">
                    <button onClick={runTests}>Run Tests</button>
                    <button onClick={automateGrading}>Automate Grading</button>
                  </div>
                  {testResults && (
                    <div className="results">
                      <h3>Test Results:</h3>
                      <pre>{testResults}</pre>
                    </div>
                  )}
                  {gradingResults && (
                    <div className="results">
                      <h3>Grading Results:</h3>
                      <pre>{gradingResults}</pre>
                    </div>
                  )}
                </div>
              ) : (
                <p>Select an assignment to view details.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function AddAssignmentForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const newAssignment = {
        id: Date.now(),
        title,
        description,
      };
      onAdd(newAssignment);
    }
  };

  return (
    <form className="add-assignment-form" onSubmit={handleSubmit}>
      <h2>Add New Assignment</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        required
      />
      <button type="submit">Create Assignment</button>
    </form>
  );
}

export default App;



