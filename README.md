# LearnHub - Interactive Book Summaries

**Learn. Apply. Transform.**

A modern, interactive web application for exploring book summaries with audio narration, visual elements, and actionable tips. Built with React and Tailwind CSS.

## 🚀 Features

- **Interactive Learning**: Navigate through chapters with audio playback controls
- **Text-to-Speech**: Built-in speech synthesis for hands-free learning
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress indicators for each book
- **Actionable Tips**: AI-generated tips based on current content
- **Auto-Play Mode**: Continuous playback with automatic progression

## 📚 Available Books

1. **The 7 Habits of Highly Effective People** by Stephen R. Covey
2. **The 5 AM Club** by Robin Sharma
3. **Learning How to Learn** - Science-based learning techniques

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── common/           # Reusable UI components
├── pages/                # Main page components
│   ├── HomePage.jsx
│   ├── SevenHabits.jsx
│   ├── FiveAMClub.jsx
│   └── LearningHowToLearn.jsx
├── data/                 # Data files for book content
│   ├── habitsData.js
│   ├── fiveAMClubData.js
│   └── learningHowToLearnData.js
├── context/              # React context providers
│   └── ThemeContext.jsx
├── hooks/                # Custom React hooks
│   ├── useSpeechSynthesis.js
│   └── useProgress.js
├── utils/                # Utility functions
│   ├── speechSynthesis.js
│   └── constants.js
├── styles/               # CSS and styling files
│   └── index.css
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Routing**: React Router DOM
- **Speech**: Web Speech API
- **State Management**: React Context + Hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 7habits
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Navigation
- Use the navbar to switch between different book summaries
- Click on chapter/scene numbers in the sidebar to jump to specific sections

### Audio Controls
- **Play/Pause**: Start or stop audio narration
- **Auto Play**: Enable continuous playback through all chapters
- **Previous/Next**: Navigate between chapters
- **Restart**: Return to the beginning

### Interactive Features
- **Get Tips**: Generate contextual tips based on current content
- **Progress Tracking**: Monitor your progress through each book
- **Dark Mode**: Toggle theme using the moon/sun icon in the navbar

## 🎨 Customization

### Adding New Books

1. Create a new data file in `src/data/`:
```javascript
export const newBookData = [
  {
    id: 1,
    title: "Chapter Title",
    description: "Brief description",
    text: "Main content...",
    image: "image-url",
    // ... other properties
  }
];
```

2. Create a new page component in `src/pages/`
3. Add the route to `App.jsx`
4. Update navigation in `Navbar.jsx`

### Styling
- Modify `src/styles/index.css` for global styles
- Use Tailwind classes for component-specific styling
- Customize the color scheme by updating Tailwind configuration

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization

- **Components**: Follow the single responsibility principle
- **Hooks**: Extract reusable logic into custom hooks
- **Utils**: Keep utility functions pure and testable
- **Data**: Separate content from components for easy maintenance

## 🌟 Key Features Explained

### Speech Synthesis
The application uses the Web Speech API for text-to-speech functionality:
- Configurable speech rate and pitch
- Cross-browser compatibility
- Automatic cleanup and error handling

### Progress Tracking
Visual progress indicators show:
- Current position in the book
- Percentage completion
- Real-time progress during audio playback

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly controls
- Optimized typography for all screen sizes

### Dark Mode
- System preference detection
- Persistent theme selection
- Smooth transitions
- Accessible color contrasts

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Book authors: Stephen R. Covey, Robin Sharma
- Unsplash for high-quality images
- Font Awesome for icons
- Tailwind CSS for styling framework

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Happy Learning! 📚✨**