# Simple Social Media Clone (Fake Instagram)

This is a static HTML/CSS/JavaScript social media simulation application developed for the CMSC122 Computer Programming course. The application simulates Instagram-like functionality with image upload, profile management, and dark mode toggle.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Quick Start
Bootstrap and run the application:
- `npm install` -- completes in ~3 seconds on fresh install, < 1 second on subsequent runs. No build step required for this static application.
- **Serve the application using one of these methods:**
  - **Method 1 (Recommended):** `npx http-server -p 8000 -c-1` -- starts immediately, includes hot reload
  - **Method 2:** `python3 -m http.server 8000` -- starts immediately, basic static serving
- **Access:** Open `http://localhost:8000` in your browser

### Dependencies and Installation  
- **Node.js:** Required for package management and http-server
- **Python 3:** Alternative for serving static files
- **Dependencies:** `npm install` installs @vercel/postgres and @vercel/speed-insights (deployment-related)
- **Installation time:** ~3 seconds on fresh install, < 1 second on subsequent runs
- **NO BUILD PROCESS required** - this is a static web application

### Running the Application
- **NEVER CANCEL**: Server startup is instant (< 3 seconds)
- **Testing access:** `curl -s http://localhost:8000 | grep -o '<title>.*</title>'` should return `<title>Fake Instagram</title>`
- **Stop server:** Use Ctrl+C in the terminal running the server

## Validation Requirements

### CRITICAL: Manual Validation Scenarios
After making ANY changes to the code, ALWAYS run through these complete user scenarios:

1. **Initial Load Scenario:**
   - Open `http://localhost:8000`
   - Verify username prompt appears on first visit
   - Enter a test username (e.g., "TestUser")
   - Verify the page loads with navigation buttons: Home, Upload, Profile, Toggle Dark Mode

2. **Navigation Scenario:**
   - Click "Home" button - should display "InstaFamous" welcome message
   - Click "Upload" button - should show file input and Upload button
   - Click "Profile" button - should display username, followers (100), likes (500)
   - Verify all navigation transitions work without errors

3. **Upload Functionality Scenario:**
   - Navigate to Upload section
   - Click "Choose File" and select any image file (SVG, PNG, JPG supported)
   - Click "Upload" button
   - Verify alert appears with updated followers/likes count (e.g., "You now have 108 followers and 518 likes!")
   - Navigate to "Home" to verify uploaded image displays in the feed
   - Navigate to "Profile" to verify follower and like counts increased

4. **Dark Mode Scenario:**
   - Click "Toggle Dark Mode" button
   - Verify background changes to black and text to white
   - Click again to verify it toggles back to light mode
   - Test dark mode functionality in all sections (Home, Upload, Profile)

### Technical Validation
- **Code syntax:** JavaScript console should show no errors when loading the page
- **File serving:** All static assets (CSS, JS, images) should load without 404 errors  
- **Browser compatibility:** Test in at least Chrome/Firefox (application uses standard HTML5/ES6)
- **Manual testing:** Always use browser automation tools (playwright) to test complete user flows
- **Quick validation:** Use this Node.js command to verify all components:
```bash
node -e "
const fs = require('fs');
console.log('Validating app structure...');
['index.html', 'script.js', 'style.css'].forEach(f => {
  console.log(fs.existsSync(f) ? '✓ ' + f + ' exists' : '✗ ' + f + ' missing');
});
const script = fs.readFileSync('script.js', 'utf8');
['loadContent', 'uploadPhoto', 'changeMode', 'updateProfile'].forEach(func => {
  console.log(script.includes('function ' + func) ? '✓ ' + func + '() found' : '✗ ' + func + '() missing');
});
console.log('Validation complete.');
"
```

## Automated Testing and Validation

### Browser Automation Testing
Always use playwright browser automation to validate functionality:
```bash
# Example complete test flow (using playwright tools):
# 1. Navigate to http://localhost:8000
# 2. Handle username prompt with test username
# 3. Test all navigation buttons 
# 4. Test file upload with test image
# 5. Verify image appears in feed
# 6. Verify follower/like counts increase
# 7. Test dark mode toggle
# 8. Take screenshots to document functionality
```

### Screenshot Documentation
- **ALWAYS** take screenshots after making UI changes
- Screenshots serve as visual regression testing
- Store screenshots in `/tmp/playwright-logs/` during testing
- Key screenshots to capture:
  - Initial page load state
  - Each navigation section (Home, Upload, Profile)
  - Dark mode vs light mode
  - Before/after upload functionality

## Common Tasks

### File Structure
```
/home/runner/work/Simple-Social-Media-Clone/Simple-Social-Media-Clone/
├── index.html          # Main application page
├── script.js           # Core JavaScript functionality  
├── style.css          # Application styling
├── profile.html       # Legacy/unused file
├── package.json       # NPM dependencies
└── README.md          # Basic project description
```

### Key Code Locations
- **Navigation logic:** `loadContent()` function in `script.js` lines 31-65
- **Image upload:** `uploadPhoto()` function in `script.js` lines 67-81  
- **Profile management:** `updateProfile()` function in `script.js` lines 11-25
- **Dark mode toggle:** `changeMode()` function in `script.js` lines 6-9
- **Styling:** All CSS in `style.css`, dark mode styles at lines 59-62

### Making Changes
- **NO BUILD STEP required** - changes to HTML/CSS/JS are reflected immediately
- **Server restart:** Only required if you change server configuration, not for code changes
- **Testing changes:** Refresh browser after editing files
- **Always test:** Run through all 4 validation scenarios after ANY code change
- **Test file creation:** Create test images for upload testing:
  ```bash
  # Create simple SVG test image
  cat > /tmp/test_image.svg << 'EOF'
  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="red"/>
    <text x="50" y="50" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">TEST</text>
  </svg>
  EOF
  ```

### Debugging
- **Browser DevTools:** F12 to open, check Console tab for JavaScript errors
- **Network issues:** Verify server is running with `curl -I http://localhost:8000`
- **File not found:** Check file paths relative to the served directory
- **JavaScript errors:** Most common issues are in `script.js` - check browser console

## Timing and Performance Expectations

- **npm install:** ~3 seconds fresh install, < 1 second subsequent - NEVER CANCEL
- **Server startup:** < 3 seconds - NEVER CANCEL  
- **Page load:** Instant (static files only)
- **Image upload:** Instant (client-side only, using URL.createObjectURL)
- **Navigation:** Instant (DOM manipulation only)
- **File validation script:** < 1 second - reliable for CI/CD checks

## Known Limitations and Notes

- **Image storage:** Images are stored in browser memory only (lost on page refresh)
- **Data persistence:** No backend - all data is temporary and client-side
- **Browser support:** Requires modern browser with ES6 support and FileReader API
- **File size:** Large images may impact performance due to client-side storage
- **No authentication:** Username prompt is cosmetic only
- **No server-side logic:** All functionality is client-side JavaScript

## Common Outputs (Reference to Save Time)

### Repository Root Files
```
$ ls -la
total 48
drwxr-xr-x  4 runner docker 4096 Aug 27 03:29 .
drwxr-xr-x  3 runner docker 4096 Aug 27 03:29 ..
drwxr-xr-x  7 runner docker 4096 Aug 27 03:29 .git
-rw-r--r--  1 runner docker  136 Aug 27 03:29 README.md
-rw-r--r--  1 runner docker 1168 Aug 27 03:29 index.html
drwxr-xr-x 19 runner docker 4096 Aug 27 03:29 node_modules
-rw-r--r--  1 runner docker 7622 Aug 27 03:29 package-lock.json
-rw-r--r--  1 runner docker  102 Aug 27 03:29 package.json
-rw-r--r--  1 runner docker  230 Aug 27 03:29 profile.html
-rw-r--r--  1 runner docker 3096 Aug 27 03:29 script.js
-rw-r--r--  1 runner docker 1171 Aug 27 03:29 style.css
```

### Package.json Contents
```json
{
  "dependencies": {
    "@vercel/postgres": "^0.7.2",
    "@vercel/speed-insights": "^1.0.10"
  }
}
```

### Successful Server Start (npx http-server)
```
Starting up http-server, serving ./
http-server version: 14.1.1
Available on:
  http://127.0.0.1:8000
  http://10.1.0.200:8000
Hit CTRL-C to stop the server
```

### Successful Page Load Test
```
$ curl -s http://localhost:8000 | grep -o '<title>.*</title>'
<title>Fake Instagram</title>
```