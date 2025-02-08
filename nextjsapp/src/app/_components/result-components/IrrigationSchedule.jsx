'use client';

import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useTypewriter } from 'react-simple-typewriter';
import { FaPlay, FaPause, FaRedo, FaRegCopy } from 'react-icons/fa';
import { markdownToTxt } from 'markdown-to-txt';
import toast from 'react-hot-toast';


const IrrigationSchedule = ({ data }) => {
  
  
  const [text, { isDone }] = useTypewriter({
    words: [data],
    loop: 1,
    typeSpeed: 10,
  });


  const dataFromMarkdownToTxt = markdownToTxt(data);

  
  const [isPlaying, setIsPlaying] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [isTypingDone, setIsTypingDone] = useState(false);


  const synth = window.speechSynthesis;


  let utterance;


  useEffect(() => {
    
    if (isDone) {
      
      setIsTypingDone(true);
    
    }

  }, [isDone]);


  useEffect(() => {
    
    return () => {
      
      synth.cancel();
    
    };
  
  }, []);


  const playSpeech = () => {
    
    if (!synth.speaking) {
      
      utterance = new SpeechSynthesisUtterance(dataFromMarkdownToTxt);

      utterance.rate = 1;

      utterance.pitch = 1;

      synth.speak(utterance);

      
      setIsPlaying(true);

      setIsPaused(false);

      utterance.onend = () => {
        
        setIsPlaying(false);
      
      };

    }

  };


  const pauseSpeech = () => {
    
    if (synth.speaking && !synth.paused) {
      
      synth.pause();

      setIsPlaying(false);

      setIsPaused(true);
    
    }

  };


  const resumeSpeech = () => {
    
    if (synth.paused) {
      
      synth.resume();

      setIsPlaying(true);

      setIsPaused(false);
    
    }

  };


  const restartSpeech = () => {
    
    synth.cancel();

    setTimeout(() => playSpeech(), 100);
  
  };


  const copyToClipboard = () => {
    
    navigator.clipboard.writeText(data);

    toast.success('analysis successfully copied to clipboard');
  
  };


  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
      
      <div className="relative">
        
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h2: ({ node, ...props }) => (
              <h2
                className="text-lg lg:text-2xl font-bold text-blue-600 mb-6"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-base lg:text-lg text-gray-600 font-semibold mb-4"
                {...props}
              />
            ),
          }}
        >
          {text}
        </Markdown>

        {isTypingDone && <button
          onClick={copyToClipboard}
          className="absolute top-0 right-0 p-2 text-gray-600 hover:text-blue-600 transition-all"
          title="Copy to clipboard"
        >
          <FaRegCopy className="text-lg" />
        </button>}
      
      </div>


      {isTypingDone && (
        <div className="mt-6 border-t pt-4 border-blue-200">
          
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            Tired of reading? Listen below!
          </h3>

          <div className="flex items-center gap-3">
            
            {!isPlaying && !isPaused && (
              <button
                onClick={playSpeech}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                title="Play"
              >
                <FaPlay className="text-sm" />
              </button>
            )}

            {isPlaying && (
              <button
                onClick={pauseSpeech}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                title="Pause"
              >
                <FaPause className="text-sm" />
              </button>
            )}

            {isPaused && (
              <button
                onClick={resumeSpeech}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                title="Resume"
              >
                <FaPlay className="text-sm" />
              </button>
            )}

            {(isPlaying || isPaused) && (
              <button
                onClick={restartSpeech}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                title="Restart"
              >
                <FaRedo className="text-sm" />
              </button>
            )}

          </div>

          <span className="block text-xs text-gray-600 mt-2">
            {isPlaying ? 'Playing...' : isPaused ? 'Paused' : 'Click to play'}
          </span>

        </div>

      )}

    </div>
  );
};


export default IrrigationSchedule;
