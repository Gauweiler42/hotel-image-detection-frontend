'use client';
import { Key, useState } from 'react';
import HotelImageDetectionAPI from '../lib/api/HotelImageDetection.api';

export default function TestDetection() {
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('file') as File;

    if (!file) {
      setError('Bitte eine Datei auswählen.');
      return;
    }

    try {
      const data = await new HotelImageDetectionAPI().detectImage(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Verarbeiten der Anfrage');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Test the detection</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input type="file" name="file" accept="image/*" required 
               className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
        />
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Detect Category
        </button>
      </form>
      {result && (
        <>
          <b className='text-white'>Prediction took {result.predition_time} ms</b>
          <table className="mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Probability</th>
              </tr>
            </thead>
            <tbody>
              {result.predictions.map(([className, probability]: any, index: Key | null | undefined) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{className}</td>
                  <td className="border px-4 py-2">{(probability * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {error && <div className="text-red-500 mt-2">Error: {error}</div>}
    </div>
  );
}
