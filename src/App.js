import React, { useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Page, Text, View, Document, Image } from '@react-pdf/renderer';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [generatedPdf, setGeneratedPdf] = useState(null);

  const handleGenerate = async () => {
    try {
      // Call GPT-4 to process the text
      const gptResponse = await axios.post('http://localhost:8000/api/gpt', { text: inputText });

      // Call DALL-E to generate images
      const dallEResponse = await axios.post('http://localhost:8000/api/dalle', { text: inputText });

      // Combine the text and images to create PDF content
      setGeneratedPdf({
        text: gptResponse.data.text,
        images: dallEResponse.data.images
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h1>Multi-Modal PDF Generator</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="10"
        cols="50"
      />
      <button onClick={handleGenerate}>Generate PDF</button>

      {generatedPdf && (
        <PDFDownloadLink
          document={<MyDocument content={generatedPdf} />}
          fileName="generated.pdf"
        >
          {({ loading }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

const MyDocument = ({ content }) => (
  <Document>
    <Page>
      <View>
        <Text>{content.text}</Text>
        {content.images.map((url, index) => (
          <Image key={index} src={url} />
        ))}
      </View>
    </Page>
  </Document>
);

export default App;
