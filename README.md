# OpenSOX 🔍

**Find your GitHub organizations super fast!**

OpenSOX is a modern web application built with Next.js that helps developers discover and explore GitHub organizations efficiently. Browse through thousands of organizations with an intuitive interface, powerful filtering options, and detailed organization information.
                    
  


https://github.com/user-attachments/assets/216a1f23-c17e-42c6-bc65-42b325d120dd



## ✨ Features

- **🔍 Smart Search**: Real-time search through organization names and descriptions
- **🎯 Advanced Filtering**: Filter by verified organizations, descriptions, and categories
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **⚡ Fast Performance**: Built with Next.js 15 and optimized for speed
- **🎨 Modern UI**: Clean interface with Tailwind CSS and shadcn/ui components
- **📊 Organization Details**: View comprehensive information including:
  - Organization avatar and basic info
  - Location and contact details
  - Social media links (Twitter, blog, email)
  - Verification status
  - Repository statistics

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **GitHub API**: [Octokit](https://github.com/octokit/core.js)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- GitHub Personal Access Token

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd opensox
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GITHUB_API_TOKEN=your_github_personal_access_token_here
   ```
   
   To get a GitHub token:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Generate a new token with `read:org` permissions
   - Copy the token to your `.env.local` file

4. **Update the Octokit configuration**
   
   Open `app/utils/Octokit.ts` and replace the placeholder:
   ```typescript
   const octokit = new Octokit({
     auth: process.env.GITHUB_API_TOKEN // or your token directly
   })
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
opensox/
├── app/                          # Next.js App Router
│   ├── components/              # React components
│   │   ├── OrgCard.tsx         # Organization card component
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── SocialCard.tsx      # Social media links component
│   ├── utils/                   # Utility functions
│   │   ├── Octokit.ts          # GitHub API client
│   │   ├── httpsclient.tsx     # HTTP client wrapper
│   │   ├── types.tsx           # TypeScript type definitions
│   │   └── hooks/              # Custom React hooks
│   │       └── Filter_data.ts  # Data filtering logic
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # shadcn/ui components
│   └── ui/                     # Reusable UI components
├── hooks/                       # Custom hooks
├── lib/                         # Utility libraries
├── public/                      # Static assets
└── ...config files
```

## 🎯 Usage

### Searching Organizations

1. **Basic Search**: Use the search bar to find organizations by name or description
2. **Sidebar Filters**: Use the sidebar to filter by:
   - All Organizations
   - Verified Only
   - Organizations with Descriptions
3. **Categories**: Browse by technology categories (Technology, Open Source, Education, Non-Profit)

### Organization Cards

Each organization card displays:
- Organization avatar
- Name and location
- Description
- Social media links (when available)
- Verification badge
- Click to visit the organization's GitHub page

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling

The project uses Tailwind CSS with a custom design system. Key configuration files:
- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables
- `components.json` - shadcn/ui configuration

### Adding New Filters

To add new filter options:
1. Update the sidebar in `app/components/Sidebar.tsx`
2. Add filter logic in `app/utils/hooks/Filter_data.ts`
3. Update TypeScript types in `app/utils/types.tsx`

## 📊 API Usage

The application uses the GitHub REST API to fetch organization data:

- `GET /organizations` - Fetch all public organizations
- `GET /orgs/{org}` - Get detailed organization information

API rate limits apply. With authentication, you get 5,000 requests per hour.

## 🚧 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- GitHub API rate limiting may affect performance with heavy usage
- Some organizations may have incomplete profile information

## 🔮 Future Enhancements

- [ ] Advanced filtering by programming languages
- [ ] Organization comparison features
- [ ] Bookmark favorite organizations
- [ ] Export organization lists
- [ ] Dark mode support
- [ ] Pagination for better performance
- [ ] Organization statistics and analytics

## 📞 Support

If you have any questions or run into issues:

1. Check the [GitHub Issues](../../issues) page
2. Create a new issue with a detailed description
3. Provide steps to reproduce any bugs

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) team for the amazing framework
- All the open source contributors who made this project possible

---

**Made with ❤️ by the OpenSOX team**
