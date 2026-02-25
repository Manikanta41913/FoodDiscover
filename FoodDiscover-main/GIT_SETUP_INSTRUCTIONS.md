# Git Setup Instructions

## ✅ Current Status
- Initial commit created successfully (def3cb2)
- 58 files committed
- `.env` file is properly excluded (in .gitignore)

## 🚀 Next Steps to Push to GitHub

### Option 1: Create New GitHub Repository

1. **Go to GitHub** and create a new repository:
   - Visit: https://github.com/new
   - Repository name: `foodhub` (or your preferred name)
   - Description: "Modern food delivery platform built with React"
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
   - Click "Create repository"

2. **Add the remote and push:**
   ```bash
   cd FoodDiscover-main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Option 2: Push to Existing Repository

If you already have a repository:

```bash
cd FoodDiscover-main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Option 3: Use GitHub CLI (if installed)

```bash
cd FoodDiscover-main
gh repo create foodhub --public --source=. --remote=origin
git push -u origin main
```

## 🔐 Authentication

When pushing, GitHub will ask for authentication:

### Using Personal Access Token (Recommended):
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when prompted

### Using SSH:
1. Set up SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
2. Use SSH URL: `git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git`

## 📝 Common Commands

```bash
# Check current status
git status

# View commit history
git log --oneline

# Check remote
git remote -v

# Change remote URL
git remote set-url origin NEW_URL

# Push to remote
git push origin main
```

## ⚠️ Important Notes

1. **`.env` file is NOT pushed** - It's in .gitignore for security
2. **Supabase credentials** - Anyone cloning your repo will need to create their own `.env` file
3. **Branch name** - Changed from `master` to `main` (GitHub's default)

## 🐛 Troubleshooting

### "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin YOUR_URL
```

### "Permission denied"
- Check your GitHub authentication
- Use personal access token instead of password
- Or set up SSH keys

## 📦 After Pushing

Your repository will be available at:
`https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

You can then:
- Share the repository link
- Deploy to Render, Vercel, or Netlify
- Collaborate with others
- Set up CI/CD pipelines
