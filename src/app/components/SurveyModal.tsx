import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";

interface SurveyModalProps {
  onClose: () => void;
}

type QuestionType = 'single' | 'multi';

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What genres do you enjoy the most?",
    type: 'multi',
    options: [
      "Mystery & Thriller",
      "Romance",
      "Science Fiction",
      "Fantasy",
      "Biography",
      "Self Help",
      "History",
      "Young Adult"
    ]
  },
  {
    id: 2,
    text: "Do you prefer Fiction or Non-Fiction?",
    type: 'single',
    options: ["Fiction", "Non-Fiction", "Both equally"]
  },
  {
    id: 3,
    text: "How do you prefer to consume books?",
    type: 'multi',
    options: ["E-books", "Audiobooks", "Magazines"]
  },
  {
    id: 4,
    text: "What describes your usual reading mood?",
    type: 'single',
    options: [
      "Light & Fun",
      "Dark & Intense",
      "Educational",
      "Inspiring",
      "Escapist"
    ]
  }
];

export function SurveyModal({ onClose }: SurveyModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];

  const handleOptionClick = (option: string) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    
    if (currentQuestion.type === 'single') {
      setAnswers({ ...answers, [currentQuestion.id]: [option] });
    } else {
      // Multi-select toggle
      if (currentAnswers.includes(option)) {
        setAnswers({
          ...answers,
          [currentQuestion.id]: currentAnswers.filter(a => a !== option)
        });
      } else {
        setAnswers({
          ...answers,
          [currentQuestion.id]: [...currentAnswers, option]
        });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextDisabled = !answers[currentQuestion.id] || answers[currentQuestion.id].length === 0;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#111] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-[#00838F] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,131,143,0.4)]">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">All Set!</h2>
        <p className="text-gray-400 text-center mb-8 leading-relaxed">
          We've updated your preferences. Your recommendations will now be even better.
        </p>
        <button 
          onClick={onClose}
          className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#111] flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#222]">
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Step {currentStep + 1} of {QUESTIONS.length}
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-[#222] w-full">
        <div 
          className="h-full bg-[#00838F] transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col max-w-lg mx-auto w-full">
        <h2 className="text-2xl font-serif text-white mb-8 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = (answers[currentQuestion.id] || []).includes(option);
            return (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected 
                    ? "bg-[#00838F]/10 border-[#00838F] text-white" 
                    : "bg-[#1a1a1a] border-[#333] text-gray-300 hover:border-gray-500"
                }`}
              >
                <span className="font-medium text-lg">{option}</span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    isSelected ? "bg-[#00838F] border-[#00838F]" : "border-gray-500 group-hover:border-gray-300"
                }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#222] bg-[#111]">
        <div className="flex gap-4 max-w-lg mx-auto">
            {currentStep > 0 && (
                <button 
                    onClick={handleBack}
                    className="flex-1 py-3 px-6 rounded-full border border-[#333] text-gray-300 font-bold hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
                >
                    <ChevronLeft className="w-5 h-5" /> Back
                </button>
            )}
            
            <button 
                onClick={handleNext}
                disabled={isNextDisabled || isSubmitting}
                className={`flex-1 py-3 px-6 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                    isNextDisabled 
                        ? "bg-[#222] text-gray-500 cursor-not-allowed" 
                        : "bg-[#00838F] text-white hover:bg-[#0097A7] shadow-[0_0_15px_rgba(0,131,143,0.3)]"
                }`}
            >
                {isSubmitting ? (
                    <span className="animate-pulse">Saving...</span>
                ) : (
                    <>
                        {currentStep === QUESTIONS.length - 1 ? "Finish" : "Next"}
                        {currentStep < QUESTIONS.length - 1 && <ChevronRight className="w-5 h-5" />}
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
