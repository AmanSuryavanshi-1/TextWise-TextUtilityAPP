import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaQuestionCircle, FaTrash, FaCopy, FaUndo, FaRedo, FaSearch, FaFileDownload, FaAlignLeft, FaClock, FaFont, FaTextHeight, FaLock, FaEdit } from 'react-icons/fa';
import { RxLetterCaseLowercase, RxLetterCaseUppercase } from 'react-icons/rx';
import { LuClipboardEdit } from 'react-icons/lu';
import { MdOutlineEditNote } from 'react-icons/md';

const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['sans-serif', 'serif', 'monospace'];
ReactQuill.Quill.register(Font, true);

const Size = ReactQuill.Quill.import('formats/size');
Size.whitelist = ['small', 'normal', 'large', 'huge'];
ReactQuill.Quill.register(Size, true);

export default function Component() {
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
    <div className="flex flex-col h-[94vh] p-4 overflow-hidden font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h1 className="flex items-center font-serif text-3xl font-bold text-bg dark:text-primary">
            <LuClipboardEdit className="mr-2 text-3xl" />
            Text Editor
          </h1>
          <div 
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-2xl cursor-pointer text-bgVariant" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 font-serif text-sm text-left border-2 rounded-lg shadow-2xl w-72 bg-primary border-bg text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p><strong>Comprehensive Text Editor</strong> features:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Rich Text Formatting:</strong> Headings, fonts, sizes, styles, colors, lists, alignment</li>
                  <li><strong>Advanced Editing:</strong> Case conversion, find/replace, undo/redo, clear, copy</li>
                  <li><strong>Content Analysis:</strong> Word count, character count, reading time estimate</li>
                  <li><strong>Media Integration:</strong> Images, videos, hyperlinks</li>
                  <li><strong>Accessibility:</strong> Editable/read-only modes, tooltips, responsive design</li>
                  <li><strong>Data Management:</strong> Download as HTML, auto-save*</li>
                  <li><strong>Additional Features:</strong> Syntax highlighting*, multiple languages*, collaborative editing*, version history*</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap gap-2">
          {[ 
            { icon: RxLetterCaseUppercase, text: "Uppercase", onClick: handleUppercase },
            { icon: RxLetterCaseLowercase, text: "Lowercase", onClick: handleLowercase },
            { icon: FaAlignLeft, text: "Sentence Case", onClick: handleSentenceCase },
            { icon: FaSearch, text: "Find & Replace", onClick: handleFindReplace },
            { icon: FaTrash, text: "Clear", onClick: handleClearContent },
            { icon: FaCopy, text: "Copy", onClick: handleCopy },
            { icon: FaUndo, text: "Undo", onClick: handleUndo },
            { icon: FaRedo, text: "Redo", onClick: handleRedo },
          ].map((btn, index) => (
            <button 
              key={index}
              disabled={content.length === 0} 
              className="relative p-[0.3rem] text-white transition border-2 rounded-full shadow-md group border-bg bg-bg hover:bg-primaryVariant hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={btn.onClick}
            >
              <btn.icon className="text-lg" />
              <span className="absolute px-2 py-1 mb-2 text-xs font-bold text-white transition-opacity duration-300 -translate-x-1/2 bg-gray-800 rounded-lg opacity-0 left-1/2 whitespace-nowrap bottom-full group-hover:opacity-100">
                {btn.text}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: FaClock, value: `${readingTime} min`, label: "Reading Time" },
            { icon: FaFont, value: wordCount, label: "Word Count" },
            { icon: FaTextHeight, value: charCount, label: "Character Count" },
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="flex items-center gap-1 px-2 py-2 text-xs font-semibold transition-colors duration-300 border-2 rounded-full cursor-pointer border-bg bg-primaryVariant text-bg hover:bg-bg hover:text-primary">
                <item.icon className="text-sm" />
                {item.value}
              </div>
              <span className="absolute px-2 py-1 mb-2 text-xs font-bold text-white transition-opacity duration-300 -translate-x-1/2 bg-gray-800 rounded-lg opacity-0 left-1/2 whitespace-nowrap bottom-full group-hover:opacity-100">
                {item.label}
              </span>
            </div>
          ))}
          <button 
            onClick={toggleReadOnly} 
            className={`relative flex items-center p-2 font-semibold transition border-2 shadow-md border-bg rounded-full duration-300 ${readOnly ? 'bg-primaryVariant text-bg hover:bg-bg hover:text-white' : 'bg-bg text-white hover:bg-primaryVariant hover:text-bg'}`}
          >
            {readOnly ? <FaLock className="text-lg" /> : <MdOutlineEditNote className="text-lg" />}
            <span className="absolute px-2 py-1 mb-2 text-xs font-bold text-white transition-opacity duration-300 -translate-x-1/2 bg-gray-800 rounded-lg opacity-0 left-1/2 whitespace-nowrap bottom-full group-hover:opacity-100">
              {readOnly ? 'Read Only' : 'Editable'}
            </span>
          </button>
          <button 
            onClick={handleDownload}
            disabled={content.length === 0} 
            className="relative p-2 text-white transition border-2 rounded-full shadow-md group border-bg bg-bg hover:bg-primaryVariant hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaFileDownload className="text-lg" />
            <span className="absolute px-2 py-1 mb-2 text-xs font-bold text-white transition-opacity duration-300 -translate-x-1/2 bg-gray-800 rounded-lg opacity-0 left-1/2 whitespace-nowrap bottom-full group-hover:opacity-100">
              Download
            </span>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-hidden rounded-md">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          readOnly={readOnly}
          className="h-full bg-white border-b-2 "
        />
      </div>
    </div>
  );
}