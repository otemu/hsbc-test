import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditMode from './pages/flowchart/EditMode/EditMode';
import PreviewMode from './pages/flowchart/PreviewMode/PreviewMode';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<EditMode />} />
        <Route path="/preview-mode" element={<PreviewMode />} />
      </Routes>
    );
  }
}

export default App;
