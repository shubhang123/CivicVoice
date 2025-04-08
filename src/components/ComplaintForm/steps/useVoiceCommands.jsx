import { useState, useEffect, useRef } from 'react';

const useVoiceCommands = (options = {}) => {
  const {
    language = 'en-US',
    fieldMappings = {},
    onCommand = null,
    onStatusChange = null,
    autoStart = false
  } = options;
  
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Voice commands ready');
  const [lastCommand, setLastCommand] = useState('');
  const recognitionRef = useRef(null);
  
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      updateStatus('Speech recognition not supported');
      return;
    }
    
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = language;
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    
    // Event handlers
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      updateStatus('Listening for commands...');
    };
    
    recognitionRef.current.onresult = (event) => {
      const command = event.results[0][0].transcript.trim().toLowerCase();
      processCommand(command);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      updateStatus(`Error: ${event.error}`);
      setIsListening(false);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
      updateStatus('Command listening stopped');
    };
    
    // Auto-start if enabled
    if (autoStart) {
      startListening();
    }
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, autoStart]);
  
  // Process voice commands
  const processCommand = (command) => {
    setLastCommand(command);
    updateStatus(`Command recognized: "${command}"`);
    
    // Handle "go to" commands
    if (command.includes('go to') || command.includes('navigate to')) {
      const target = command.replace(/go to|navigate to/i, '').trim();
      
      if (fieldMappings[target]) {
        focusField(fieldMappings[target]);
      } else {
        updateStatus(`Unknown field: "${target}"`);
      }
    }
    
    // Custom command handler
    if (onCommand) {
      onCommand(command);
    }
  };
  
  // Focus on a field by ID
  const focusField = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.focus();
      updateStatus(`Focused on ${fieldId}`);
    } else {
      updateStatus(`Could not find field: ${fieldId}`);
    }
  };
  
  // Update status with callback
  const updateStatus = (message) => {
    setStatus(message);
    if (onStatusChange) {
      onStatusChange(message);
    }
  };
  
  // Control functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start voice recognition:', error);
        updateStatus('Failed to start listening');
      }
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  return {
    isListening,
    status,
    lastCommand,
    startListening,
    stopListening,
    toggleListening
  };
};

export default useVoiceCommands;