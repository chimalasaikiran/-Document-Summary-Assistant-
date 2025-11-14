# Document Summary Assistant

Transform your PDFs and documents into smart, actionable summaries in seconds. This web application leverages the power of the Google Gemini API's multimodal capabilities to understand and summarize text from various document formats, including PDFs and images.

Working application URL :- https://document-summary-assistant-dusky.vercel.app/

## ✨ Features

- **Multimodal Document Support**: Upload and process both PDF files and images (e.g., PNG, JPG) containing text.
- **Drag-and-Drop Interface**: Easily upload files by dragging them onto the application window.
- **Adjustable Summary Length**: Choose between `short`, `medium`, or `long` summaries to fit your needs.
- **AI-Powered Summarization**: Utilizes the `gemini-2.5-flash` model for fast and accurate text summarization.
- **Responsive Design**: A clean, modern, and responsive UI built with React and Tailwind CSS that works on any device.
- **Copy to Clipboard**: Quickly copy the generated summary with a single click.
- **User-Friendly Feedback**: Clear loading indicators and error messages provide a smooth user experience.

## 🛠️ Tech Stack

- **Frontend**: [React], [TypeScript]
- **Styling**: [Tailwind CSS]
- **AI Model**: [Google Gemini API]

## 🚀 How It Works

The application follows a simple yet powerful workflow:

1.  **File Upload**: The user uploads a file (PDF or image) using the file browser or the drag-and-drop zone.
2.  **File Processing**: The selected file is read by the browser and converted into a base64 encoded string.
3.  **API Request**: The base64 string, along with its MIME type and a user-defined prompt (requesting a summary of a specific length), is sent to the Gemini API.
4.  **AI Summarization**: The Gemini `gemini-2.5-flash` model processes the document content—whether it's text from a PDF or text extracted via OCR from an image—and generates a coherent, well-structured summary in markdown format.
5.  **Display Results**: The generated summary is then displayed in the user interface, ready to be read or copied.

## 📂 Project Structure

The project is organized into logical directories and components for maintainability and clarity.

```
/
├── public/
│   └── vite.svg            # Favicon
├── src/
│   ├── components/
│   │   ├── icons/          # SVG icon components
│   │   │   ├── CopyIcon.tsx
│   │   │   ├── FileIcon.tsx
│   │   │   ├── StarIcon.tsx
│   │   │   └── UploadIcon.tsx
│   │   ├── FileUpload.tsx      # Handles file selection and drag-and-drop
│   │   ├── LengthSelector.tsx  # Buttons to select summary length
│   │   ├── LoadingIndicator.tsx# UI for loading state
│   │   └── SummaryDisplay.tsx  # Renders the final summary
│   ├── services/
│   │   └── geminiService.ts  # Logic for interacting with the Gemini API
│   ├── App.tsx               # Main application component, manages state
│   ├── index.tsx             # React application entry point
│   └── types.ts              # TypeScript type definitions
├── index.html                # Main HTML file
├── metadata.json             # Project metadata
└── README.md                 
```

## ⚙️ Getting Started

This application is designed to run in an environment where the Google Gemini API key is securely managed.

### Prerequisites

- An active Google Gemini API key.
- The API key must be available as an environment variable `process.env.API_KEY`. The application is pre-configured to use this variable.

### Running the Application

This is a standard web application. Once the environment is configured with the API key, simply open the `index.html` file in a modern web browser. The necessary scripts and dependencies are loaded via an `importmap` from a CDN, so no local installation or build step is required.

## 🎨 Customization

### Changing the AI Model

You can easily switch to a different Gemini model by updating the `model` parameter in `src/services/geminiService.ts`:

```typescript
// in src/services/geminiService.ts
const response = await ai.models.generateContent({
  model: 'gemini-2.5-pro', // Change this to another compatible model
  contents: { parts: [filePart, { text: prompt }] },
});
```

### Adjusting the Prompt

The prompt sent to the Gemini API can be modified to change the style, tone, or focus of the summary. Find the prompt in `src/services/geminiService.ts`:

```typescript
// in src/services/geminiService.ts
const prompt = `Please provide a ${length} summary of the attached document...`; // Modify this template string
```

### Modifying the Theme

The application's color scheme is defined using Tailwind CSS utility classes and a configuration object in `index.html`. You can change the primary and secondary colors there:

```html
<!-- in index.html -->
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#your_primary_color',
          secondary: '#your_secondary_color',
        }
      }
    }
  }
</script>
```

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
