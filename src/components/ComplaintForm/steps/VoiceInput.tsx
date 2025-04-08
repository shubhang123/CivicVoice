import React, { useState, useEffect, useRef } from 'react';

const VoiceInput = ({ 
  targetInputId = null, 
  onTranscriptChange = null,
  language = 'en-IN',
  continuous = false,
  interimResults = true,
  buttonStyle = {},
  buttonClassName = '',
  showStatus = true,
  statusClassName = ''
}) => {
  
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Ready');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Fix: Cast window to allow SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      setStatus('Speech recognition not supported in this browser');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('Listening...');
    };

    recognition.onresult = (event: any) => {
      const currentTranscript = event.results[event.results.length - 1][0].transcript.trim();
      if (event.results[event.results.length - 1].isFinal) {
        processInput(currentTranscript);
        setStatus(`Processed: "${currentTranscript}"`);
      } else {
        setStatus(`Heard: ${currentTranscript}`);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setStatus(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatus('Voice input stopped');
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
      }
    };
  }, [language, continuous, interimResults]);

  const processInput = (finalTranscript: string) => {
    if (onTranscriptChange) {
      onTranscriptChange(finalTranscript);
    }

    if (targetInputId) {
      const targetElement = document.getElementById(targetInputId) as HTMLInputElement | HTMLTextAreaElement | null;
      if (targetElement) {
        targetElement.value = finalTranscript;
        targetElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start voice recognition:', error);
      }
    }
  };

  const defaultButtonStyle = {
    backgroundColor: isListening ? '#FF4136' : '#0074D9',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ...buttonStyle
  };

  return (
    <>
      <button 
        onClick={toggleListening}
        style={defaultButtonStyle}
        className={buttonClassName}
        type="button"
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
      </button>

      {showStatus && (
        <div className={statusClassName}>
          {status}
        </div>
      )}
    </>
  );
};

export default VoiceInput;