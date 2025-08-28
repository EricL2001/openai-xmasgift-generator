# OpenAI API - Christmas Gift Generator App (TypeScript)

A Next.js application that uses OpenAI's GPT-3.5-turbo model to generate personalized Christmas gift ideas based on user preferences.

## 🚀 Features

- **TypeScript**: Fully migrated to TypeScript for better type safety and developer experience
- **Modern OpenAI API**: Updated to use OpenAI v4 with the latest chat completions API
- **Responsive Design**: Clean, mobile-friendly interface using CSS modules
- **Form Validation**: Client-side validation for required fields
- **Error Handling**: Comprehensive error handling for API requests

## 🛠 Technology Stack

- **Next.js 14**: React framework with TypeScript support
- **TypeScript**: Type safety and better developer experience
- **OpenAI v4**: Latest OpenAI API for gift suggestions
- **CSS Modules**: Scoped styling without external CSS frameworks
- **React Hooks**: Modern React patterns with proper TypeScript types

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- OpenAI API key

## 🔧 Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xmas-gifts-openai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

## 🏗 Project Structure

```
├── pages/
│   ├── api/
│   │   └── generate-gifts.ts    # API route for OpenAI integration
│   ├── _app.tsx                 # Next.js app component
│   ├── footer.tsx               # Footer component
│   ├── gifts.tsx                # Main gift generator component
│   ├── index.tsx                # Home page
│   ├── index.module.css         # CSS modules for styling
│   └── styles.css               # Global styles
├── public/                      # Static assets
├── tsconfig.json               # TypeScript configuration
├── next-env.d.ts              # Next.js TypeScript declarations
└── package.json               # Dependencies and scripts
```

## 🔄 Migration Notes

This project has been fully migrated from JavaScript to TypeScript:

- **API Routes**: Updated to use OpenAI v4 with proper TypeScript interfaces
- **Components**: All React components converted with proper type definitions
- **State Management**: useState hooks with proper type annotations
- **Event Handlers**: Form events properly typed
- **Error Handling**: Improved error handling with type safety

## 🎁 Usage

1. Select the gender of the gift recipient
2. Enter the age of the recipient
3. Set minimum and maximum price range
4. Enter interests or hobbies (comma-separated)
5. Click "Generate Gift Ideas" to get AI-powered suggestions

## 🔑 API Key Setup

To get your OpenAI API key:
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env.local` file

## 🚨 Important Notes

- Keep your OpenAI API key secure and never commit it to version control
- The application uses GPT-3.5-turbo model for cost-effectiveness
- Rate limits apply based on your OpenAI plan

## 📄 License

This project is for educational and personal use.
