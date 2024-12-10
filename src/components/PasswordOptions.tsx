import React from 'react';

interface PasswordOptionsProps {
  length: number;
  setLength: (length: number) => void;
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
  setOptions: (options: any) => void;
  darkMode: boolean;
}

export default function PasswordOptions({
  length,
  setLength,
  options,
  setOptions,
  darkMode,
}: PasswordOptionsProps) {
  const handleOptionChange = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            Password Length: {length}
          </label>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{length}</span>
        </div>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className={`block font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          Password Options
        </label>
        <div className="space-y-2">
          {[
            { key: 'uppercase', label: 'Include Uppercase' },
            { key: 'lowercase', label: 'Include Lowercase' },
            { key: 'numbers', label: 'Include Numbers' },
            { key: 'symbols', label: 'Include Symbols' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={options[key as keyof typeof options]}
                onChange={() => handleOptionChange(key as keyof typeof options)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={key}
                className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}