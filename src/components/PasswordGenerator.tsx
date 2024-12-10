import React, { useState } from 'react';
import { Copy, RefreshCw, Sun, Moon } from 'lucide-react';
import { generatePassword } from '../utils/passwordUtils';
import { calculateStrength } from '../utils/strengthUtils';
import StrengthIndicator from './StrengthIndicator';
import PasswordOptions from './PasswordOptions';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const strength = calculateStrength(password, options);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 space-y-6`}>
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Password Generator
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="text-white" /> : <Moon className="text-gray-900" />}
            </button>
          </div>

          <div className={`relative flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <input
              type="text"
              value={password}
              readOnly
              className={`w-full pr-20 bg-transparent border-none focus:ring-0 text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              placeholder="Click generate to create password"
            />
            <div className="absolute right-4 flex space-x-2">
              <button
                onClick={handleCopy}
                className={`p-2 rounded-md transition-colors ${
                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                } ${copied ? 'text-green-500' : darkMode ? 'text-white' : 'text-gray-600'}`}
                title="Copy to clipboard"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={handleGenerate}
                className={`p-2 rounded-md transition-colors ${
                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                } ${darkMode ? 'text-white' : 'text-gray-600'}`}
                title="Generate new password"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <PasswordOptions
            length={length}
            setLength={setLength}
            options={options}
            setOptions={setOptions}
            darkMode={darkMode}
          />

          <StrengthIndicator strength={strength} darkMode={darkMode} />

          <button
            onClick={handleGenerate}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}