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

interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}
```

## How It Works

The parser follows a 4-step process:

1. **PDF Reading** - Extracts text items from PDF using pdfjs-dist
2. **Line Grouping** - Groups text items into logical lines
3. **Section Detection** - Organizes lines into resume sections
4. **Data Extraction** - Extracts structured data from each section

## Requirements

- Node.js 16+
- Works in both Node.js and browser environments
- For React projects, requires React 18+

## Browser Compatibility

This library uses `pdfjs-dist` which works in modern browsers. Make sure your bundler (Webpack, Vite, etc.) can handle the PDF.js worker.

## License

MIT

## Author

Ebenezer Agbekeye

## Keywords

resume, parser, pdf, typescript, cv, document-parsing, text-extraction
