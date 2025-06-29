# Resume Parser TypeScript

A TypeScript library for parsing resumes from PDF files and extracting structured data.

## Installation

```bash
npm install resume-parser-ts
```

## Usage

```typescript
import { parseResumeFromPdf } from 'resume-parser-ts';

// Parse a PDF resume from a file URL
const fileUrl = 'path/to/resume.pdf';
const resume = await parseResumeFromPdf(fileUrl);

console.log(resume.profile.name);
console.log(resume.profile.email);
console.log(resume.workExperiences);
console.log(resume.educations);
console.log(resume.projects);
console.log(resume.skills);
```

### Browser Usage with File Input

```typescript
import { parseResumeFromPdf } from 'resume-parser-ts';

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    const resume = await parseResumeFromPdf(fileUrl);
    console.log(resume);
  
    // Don't forget to revoke the URL when done
    URL.revokeObjectURL(fileUrl);
  }
};
```

## API

### `parseResumeFromPdf(fileUrl: string): Promise<Resume>`

Parses a resume from a PDF file URL and returns structured resume data.

**Parameters:**

- `fileUrl` - URL or path to the PDF file

**Returns:** Promise that resolves to a `Resume` object containing:

- `profile` - Personal information (name, email, phone, location, summary)
- `workExperiences` - Array of work experience entries
- `educations` - Array of education entries
- `projects` - Array of project entries
- `skills` - Featured skills with ratings and descriptions
- `custom` - Additional custom sections

**Note:** The parser algorithm works best with single-column resumes in English.

## Types

The library exports comprehensive TypeScript types:

```typescript
import type { 
  Resume,
  ResumeProfile,
  ResumeWorkExperience,
  ResumeEducation,
  ResumeProject,
  ResumeSkills,
  ResumeCustom,
  FeaturedSkill,
  TextItem,
  TextItems,
  Line,
  Lines
} from 'resume-parser-ts';
```

### Resume Structure

```typescript
interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}

interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

interface FeaturedSkill {
  skill: string;
  rating: number;
}

interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

interface ResumeCustom {
  descriptions: string[];
}
```

## How It Works

The parser follows a 4-step process:

1. **PDF Reading** - Extracts text items from PDF using pdfjs-dist
2. **Line Grouping** - Groups text items into logical lines
3. **Section Detection** - Organizes lines into resume sections
4. **Data Extraction** - Extracts structured data from each section using a feature scoring system

The extraction engine uses a feature scoring system where each resume attribute has custom feature sets. Each feature set consists of a feature matching function and a score. The text item with the highest computed feature score is identified as the extracted resume attribute.

## Requirements

- Node.js 16+
- Works in both Node.js and browser environments
- PDF files must be accessible via URL or file path

## Browser Compatibility

This library uses `pdfjs-dist` which works in modern browsers. Make sure your bundler (Webpack, Vite, etc.) can handle the PDF.js worker.

## Dependencies

- `pdfjs-dist` - For PDF text extraction
- `@reduxjs/toolkit` - For state management types
- `react-redux` - For Redux integration types

## Contributing

🤝 **I need your help!** This project is actively looking for contributors to improve and enhance the resume parsing capabilities.

### How to Contribute

1. **Fork the repository** - Click the "Fork" button at the top right of this page
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/iNezerr/ha_resume_parser.git
   cd ha_resume_parser
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Make your changes** and test them:
   ```bash
   npm run build
   npm run lint
   ```
6. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: your descriptive commit message"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request** - Go to the original repository and click "New Pull Request"
9. **Tag me** (@nezeroriginal) in your PR description so I get notified

### Areas Where Help is Needed

- 🐛 **Bug fixes** - Improve parsing accuracy for edge cases
- 🚀 **Feature enhancements** - Add support for more resume formats
- 📝 **Documentation** - Improve examples and API documentation  
- 🧪 **Testing** - Add more test cases and improve coverage
- 🎨 **UI/UX** - Build the demo application
- 🌍 **Internationalization** - Support for non-English resumes
- ⚡ **Performance** - Optimize parsing speed and accuracy

### Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/iNezerr/ha_resume_parser/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Sample PDF (if applicable - remove personal info first!)

## License

MIT

## Author

[Ebenezer Agbekeye](https://www.linkedin.com/in/nezeroriginal/)

## Keywords

resume, parser, pdf, typescript, cv, document-parsing, text-extraction
