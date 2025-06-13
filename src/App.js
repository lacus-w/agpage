import React, { useState } from 'react';
import './style.css';

const assignmentsData = [
  {
    id: 1,
    title: 'Week 1 Homework',
    description: 'Complete exercises on basic JavaScript.',
  },
  {
    id: 2,
    title: 'Week 2 Project',
    description: 'Build a simple web application using React.',
  },
];

function App() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAssignment = (newAssignment) => {
    setAssignments([...assignments, newAssignment]);
    setShowAddForm(false);
  };

  return (
    <div className="app">
      <header>
        <h1>Wellcome to Assignment Page</h1>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Assignment'}
        </button>
      </header>
      <main>
        {showAddForm && <AddAssignmentForm onAdd={handleAddAssignment} />}
        {!showAddForm && (
          <>
            <aside>
              <ul className="assignment-list">
                {assignments.map((assignment) => (
                  <li
                    key={assignment.id}
                    onClick={() => setSelectedAssignment(assignment)}
                  >
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
