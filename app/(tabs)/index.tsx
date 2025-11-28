import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Platform } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

export default function VoiceTestScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [hint, setHint] = useState('');

  // Listen to speech recognition events
  useSpeechRecognitionEvent('result', (event) => {
    const results = event.results[0];
    const transcript = results?.transcript;
    if (transcript) {
      setTranscription(transcript);
      setHint('');
      console.log('Transcription:', transcript);
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.log('Speech recognition error:', event.error);
    
    // Only show error for actual problems, not normal "no-speech" timeout
    if (event.error !== 'no-speech') {
      setError(`Error: ${event.error}`);
    } else {
      setError('No speech detected. Please speak clearly and try again.');
    }
    setIsRecording(false);
  });

  useSpeechRecognitionEvent('end', () => {
    console.log('Speech recognition ended');
    setIsRecording(false);
    setHint('');
  });

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    try {
      // Request permissions
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      
      if (!granted) {
        setError('Microphone permission denied');
        return;
      }

      // Check if speech recognition is available
      const result = await ExpoSpeechRecognitionModule.getStateAsync();
      console.log('Speech recognition state:', result);
      
      setIsReady(true);
    } catch (err) {
      console.error('Error checking availability:', err);
      setError('Speech recognition not available: ' + String(err));
    }
  };

  const startRecording = async () => {
    if (!isReady) {
      setError('Speech recognition not ready');
      return;
    }
    
    try {
      setIsRecording(true);
      setTranscription('');
      setError('');
      setHint('🎤 Speak now...');
      
      await ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        requiresOnDeviceRecognition: false,
        addsPunctuation: false,
        contextualStrings: [],
      });
    } catch (e) {
      console.error('Error starting recording:', e);
      setError('Failed to start recording: ' + String(e));
      setIsRecording(false);
      setHint('');
    }
  };

  const stopRecording = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
      setIsRecording(false);
      setHint('');
    } catch (e) {
      console.error('Error stopping recording:', e);
      setError('Failed to stop recording: ' + String(e));
      setIsRecording(false);
      setHint('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Voice to Text Demo</Text>
      <Text style={styles.status}>
        Status: {!isReady ? 'Initializing...' : isRecording ? 'Recording...' : 'Ready'}
      </Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={!isReady}
      />
      {transcription ? (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Transcription:</Text>
          <Text style={styles.transcription}>{transcription}</Text>
        </View>
      ) : null}
      {error ? (
        <>
          <Text style={styles.label}>Error:</Text>
          <Text style={styles.error}>{error}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  hint: {
    fontSize: 18,
    marginBottom: 15,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transcription: {
    fontSize: 18,
    color: '#000',
  },
  error: {
    marginTop: 20,
    padding: 15,
    color: 'red',
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
    width: '100%',
  },
});