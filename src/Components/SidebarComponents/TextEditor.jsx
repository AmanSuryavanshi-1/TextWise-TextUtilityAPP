import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaQuestionCircle, FaUpload, FaDownload, FaTrash, FaCopy, FaUndo, FaRedo, FaSearch, FaFileDownload, FaAlignLeft } from 'react-icons/fa';

const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['sans-serif', 'serif', 'monospace'];
ReactQuill.Quill.register(Font, true);

const Size = ReactQuill.Quill.import('formats/size');
Size.whitelist = ['small', 'normal', 'large', 'huge'];
ReactQuill.Quill.register(Size, true);

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const quillRef = useRef(null);

  const updateCounts = useCallback(() => {
    if (quillRef.current) {
      const text = quillRef.current.getEditor().getText();
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
      setCharCount(text.length > 1 ? text.length - 1 : 0);
    }
  }, []);

  useEffect(() => {
    updateCounts();
  }, [content, updateCounts]);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': Font.whitelist }],
      [{ 'size': Size.whitelist }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color', 'background', 'align',
    'script', 'direction', 'code-block'
  ];

  const handleChange = (value) => {
    setContent(value);
    updateCounts();
  };

  const showAlert = (message, type) => {
    console.log(`${type}: ${message}`);
  };

  const handleUppercase = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const text = editor.getText();
      editor.setText(text.toUpperCase());
      showAlert("Converted to uppercase!", "success");
    }
  };

  const handleLowercase = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const text = editor.getText();
      editor.setText(text.toLowerCase());
      showAlert("Converted to lowercase", "success");
    }
  };

  const handleClearContent = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setText('');
      showAlert("Text Cleared!", "success");
    }
  };

  const handleCopy = () => {
    if (quillRef.current) {
      const text = quillRef.current.getEditor().getText();
      navigator.clipboard.writeText(text);
      showAlert("Copied to Clipboard!", "success");
    }
  };

  const handleUndo = () => {
    if (quillRef.current) {
      quillRef.current.getEditor().history.undo();
    }
  };

  const handleRedo = () => {
    if (quillRef.current) {
      quillRef.current.getEditor().history.redo();
    }
  };

  const handleFindReplace = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const text = editor.getText();
      const findText = prompt('Enter text to find:');
      if (findText) {
        const replaceText = prompt('Enter text to replace with:');
        if (replaceText !== null) {
          let index = text.indexOf(findText);
          while (index !== -1) {
            editor.deleteText(index, findText.length);
            editor.insertText(index, replaceText);
            index = text.indexOf(findText, index + replaceText.length);
          }
          showAlert("Text replaced successfully!", "success");
        }
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'editor-content.html';
    a.click();
    URL.revokeObjectURL(url);
    showAlert("Content downloaded!", "success");
  };

  const handleSentenceCase = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const text = editor.getText();
      const newText = text.replace(/.+?[\.\?\!](\s|$)/g, (sentence) => {
        return sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase();
      });
      editor.setText(newText);
      showAlert("Converted to Sentence Case!", "success");
    }
  };

  const toggleReadOnly = () => {
    setReadOnly((prevReadOnly) => !prevReadOnly);
  };

  const readingTime = (0.008 * wordCount).toFixed(2);

  return (
    <div className="p-4 overflow-hidden font-sans bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-1 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">Comprehensive Text Editor</h1>
          <div 
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p><strong>Comprehensive Text Editor</strong> is a feature-rich text editing tool.</p>
                <ul className="list-disc list-inside">
                  <li>Rich text formatting options</li>
                  <li>Convert text to uppercase/lowercase/sentence case</li>
                  <li>Clear text content</li>
                  <li>Find and replace functionality</li>
                  <li>Undo/Redo changes</li>
                  <li>Download edited content</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-3">
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { icon: FaUpload, text: "Uppercase", onClick: handleUppercase },
              { icon: FaDownload, text: "Lowercase", onClick: handleLowercase },
              { icon: FaAlignLeft, text: "Sentence Case", onClick: handleSentenceCase },
              { icon: FaTrash, text: "Clear", onClick: handleClearContent },
              { icon: FaCopy, text: "Copy", onClick: handleCopy },
              { icon: FaUndo, text: "Undo", onClick: handleUndo },
              { icon: FaRedo, text: "Redo", onClick: handleRedo },
              { icon: FaSearch, text: "Find & Replace", onClick: handleFindReplace },
            ].map((btn, index) => (
              <button 
                key={index}
                disabled={content.length === 0} 
                className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-white transition shadow-md rounded-2xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={btn.onClick}
              >
                <btn.icon className="text-lg" />{btn.text}
              </button>
            ))}
          </div>
          <div className="quill-container" style={{ height: '65vh', display: 'flex', flexDirection: 'column' }}>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              readOnly={readOnly}
              style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex gap-3">
              <span className="px-4 py-1 rounded-md bg-bg text-primary">Reading Time: {readingTime} min</span>
              <span className="px-4 py-1 rounded-md bg-bg text-primary">Words: {wordCount}</span>
              <span className="px-4 py-1 rounded-md bg-bg text-primary">Characters: {charCount}</span>
            </div>
            <div className="flex gap-3">
              <button 
                  onClick={toggleReadOnly} 
                  className={`px-3 py-1 text-md font-bold rounded border-2 border-bg ${readOnly ? 'bg-primary text-bg' : 'bg-bg text-white'}`}
                >
                {readOnly ? 'Read Only' : 'Editable'}
              </button>
              <button 
                onClick={handleDownload}
                disabled={content.length === 0} 
                className="flex items-center gap-1 px-4 py-1 font-bold text-white transition rounded-md shadow-md text-md bg-bg duration-400 hover:bg-bgVariant disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFileDownload className="text-lg" />Download
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;