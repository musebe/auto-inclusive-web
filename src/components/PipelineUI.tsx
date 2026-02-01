import { useState } from 'react';
import { uploadImageAction } from '../utils/accessibility-engine';

/**
 * @component PipelineUI
 * @description Provides a responsive interface for solving "Accessibility Debt".
 */
export function PipelineUI() {
  const [file, setFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{
    secureUrl: string;
    altText: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setFile(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      // Direct call to the server function
      const data = await uploadImageAction({ data: { fileUri: file } });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('AI Processing Failed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='relative group border-2 border-dashed border-slate-300 rounded-2xl p-10 bg-slate-50 hover:bg-white hover:border-indigo-400 transition-all text-center'>
        <input
          type='file'
          onChange={handleFileChange}
          className='absolute inset-0 opacity-0 cursor-pointer'
        />
        <p className='text-slate-600 font-medium'>
          {file
            ? 'Ready to Analyze'
            : 'Drop an asset here to start the pipeline'}
        </p>
      </div>

      <button
        onClick={handleProcess}
        disabled={!file || isUploading}
        className='h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-40 transition-all flex items-center justify-center'
      >
        {isUploading ? 'AI Engine Running...' : 'Generate Inclusive Metadata'}
      </button>

      {result && (
        <div className='bg-white border border-slate-200 p-4 rounded-2xl shadow-sm animate-in fade-in zoom-in-95 duration-300'>
          <img
            src={result.secureUrl}
            alt={result.altText}
            className='w-full h-auto rounded-lg mb-4'
          />
          <div className='bg-slate-900 text-white p-4 rounded-lg font-mono text-sm'>
            <span className='text-indigo-400'>alt=</span>
            <span>"{result.altText}"</span>
          </div>
        </div>
      )}
    </div>
  );
}
