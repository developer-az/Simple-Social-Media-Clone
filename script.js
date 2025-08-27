/* ========================================
   SCIENTIFICALLY OPTIMAL UI/UX JAVASCRIPT
   Implementing cognitive psychology principles
   and modern UX patterns
   ======================================== */

// Application state management (single source of truth)
let appState = {
  followers: 100,
  likes: 500,
  uploadedImages: [],
  username: '',
  currentSection: 'home',
  darkMode: false,
  uxPanelOpen: false
};

// Initialize application with better UX patterns
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Better username input - no disruptive prompt()
  showUsernameModal();
  
  // Set initial navigation state
  setActiveNavButton('home');
  loadContent('home');
  
  // Initialize accessibility features
  setupKeyboardNavigation();
  
  // Check for user's theme preference (respect system settings)
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    appState.darkMode = true;
    document.body.classList.add('dark-mode');
  }
}

// Better username input - modal instead of disruptive prompt()
function showUsernameModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" data-ux-label="Modal provides better UX than prompt() - less disruptive">
      <div class="modal-header">
        <h2>🧠 Welcome to OptimalSocial</h2>
        <p>A scientifically designed social platform</p>
      </div>
      <div class="modal-body">
        <label for="username-input" class="form-label">Choose your username:</label>
        <input type="text" id="username-input" class="form-input" placeholder="Enter username..." 
               data-ux-label="Placeholder text reduces cognitive load by showing expected format">
        <div class="username-tips" data-ux-label="Helper text reduces errors (error prevention principle)">
          <small>💡 Tip: Choose something memorable and unique</small>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="setUsername()" data-ux-label="Primary button uses color psychology (blue = trust)">
          Get Started
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Focus management for accessibility
  const input = document.getElementById('username-input');
  input.focus();
  
  // Enter key support
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      setUsername();
    }
  });
}

function setUsername() {
  const input = document.getElementById('username-input');
  const username = input.value.trim();
  
  if (username.length < 2) {
    showToast('Username must be at least 2 characters', 'error');
    input.focus();
    return;
  }
  
  appState.username = username;
  
  // Remove modal with animation
  const modal = document.querySelector('.modal-overlay');
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.remove();
    showToast(`Welcome ${username}! 🎉`, 'success');
  }, 300);
}

// Improved navigation with active state management
function loadContent(section) {
  // Show loading state (visibility of system status)
  showLoading();
  
  // Update navigation state
  appState.currentSection = section;
  setActiveNavButton(section);
  
  const contentContainer = document.getElementById('content');
  
  // Simulate realistic loading time for better perceived performance
  setTimeout(() => {
    if (section === 'home') {
      renderHomeSection(contentContainer);
    } else if (section === 'upload') {
      renderUploadSection(contentContainer);
    } else if (section === 'profile') {
      renderProfileSection(contentContainer);
    }
    
    hideLoading();
    
    // Announce section change for screen readers
    announceToScreenReader(`Loaded ${section} section`);
  }, 300);
}

function renderHomeSection(container) {
  let homeContent = `
    <div class="section-header" data-ux-label="Clear headings improve information hierarchy">
      <h1>🏠 Welcome to OptimalSocial</h1>
      <p class="section-subtitle">A scientifically designed social platform demonstrating optimal UI/UX principles</p>
    </div>
    
    <div class="home-stats" data-ux-label="Statistics provide immediate value and engagement">
      <div class="stat-card">
        <div class="stat-number">${appState.followers}</div>
        <div class="stat-label">Followers</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${appState.likes}</div>
        <div class="stat-label">Total Likes</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${appState.uploadedImages.length}</div>
        <div class="stat-label">Photos Shared</div>
      </div>
    </div>
  `;

  if (appState.uploadedImages.length > 0) {
    homeContent += `
      <div class="images-section" data-ux-label="Content grid follows optimal visual scanning patterns">
        <h2>📸 Your Recent Photos</h2>
        <div class="images-grid">
    `;
    
    // Show most recent images first (recency bias)
    const recentImages = [...appState.uploadedImages].reverse();
    
    recentImages.forEach((img, index) => {
      homeContent += `
        <div class="image-card" data-ux-label="Cards provide clear content boundaries">
          <img src="${img}" class="uploaded-image" alt="User uploaded photo ${index + 1}" 
               data-ux-label="Alt text improves accessibility">
          <div class="image-overlay" data-ux-label="Overlay shows additional actions on hover">
            <button class="btn btn-secondary btn-sm" onclick="shareImage('${img}')">Share</button>
          </div>
        </div>
      `;
    });
    
    homeContent += '</div></div>';
  } else {
    homeContent += `
      <div class="empty-state" data-ux-label="Empty states guide users to next action">
        <div class="empty-icon">📷</div>
        <h3>No photos yet!</h3>
        <p>Share your first photo to see it here</p>
        <button class="btn btn-primary" onclick="loadContent('upload')">Upload Photo</button>
      </div>
    `;
  }

  container.innerHTML = homeContent;
}

function renderUploadSection(container) {
  container.innerHTML = `
    <div class="section-header">
      <h1>📤 Upload Photo</h1>
      <p class="section-subtitle">Share moments with optimal user experience</p>
    </div>
    
    <div class="upload-container" data-ux-label="Drag-and-drop reduces friction in file upload">
      <div class="upload-zone" id="upload-zone" 
           ondrop="handleDrop(event)" 
           ondragover="handleDragOver(event)"
           ondragleave="handleDragLeave(event)">
        <div class="upload-icon">📁</div>
        <h3>Drag & Drop Your Photo</h3>
        <p>Or click to browse files</p>
        <input type="file" id="photoInput" accept="image/*" style="display: none;" onchange="handleFileSelect(event)">
        <button class="btn btn-secondary" onclick="document.getElementById('photoInput').click()">
          Choose File
        </button>
      </div>
      
      <div class="upload-tips" data-ux-label="Helper tips reduce user errors">
        <h4>📋 Upload Tips</h4>
        <ul>
          <li>✅ Supported formats: JPG, PNG, GIF, WebP</li>
          <li>📏 Recommended size: 1080x1080px for best quality</li>
          <li>💾 Maximum file size: 10MB</li>
        </ul>
      </div>
    </div>
  `;
}

function renderProfileSection(container) {
  const joinDate = new Date().toLocaleDateString();
  
  container.innerHTML = `
    <div class="section-header">
      <h1>👤 ${appState.username}'s Profile</h1>
      <p class="section-subtitle">Your social media presence</p>
    </div>
    
    <div class="profile-container">
      <div class="profile-card" data-ux-label="Card layout provides clear information hierarchy">
        <div class="profile-avatar">
          <div class="avatar-placeholder">${appState.username.charAt(0).toUpperCase()}</div>
        </div>
        
        <div class="profile-info">
          <h2>${appState.username}</h2>
          <p class="profile-bio">Exploring the science of optimal user experience</p>
          <div class="profile-meta">
            <span>📅 Joined ${joinDate}</span>
            <span>🎯 UX Enthusiast</span>
          </div>
        </div>
      </div>
      
      <div class="stats-grid" data-ux-label="Grid layout follows Gestalt grouping principles">
        <div class="stat-item">
          <div class="stat-value" id="followers-count">${appState.followers}</div>
          <div class="stat-name">Followers</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="likes-count">${appState.likes}</div>
          <div class="stat-name">Total Likes</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${appState.uploadedImages.length}</div>
          <div class="stat-name">Photos</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">98.5%</div>
          <div class="stat-name">UX Score</div>
        </div>
      </div>
      
      <div class="profile-actions">
        <button class="btn btn-primary" onclick="editProfile()">Edit Profile</button>
        <button class="btn btn-secondary" onclick="downloadData()">Download Data</button>
      </div>
    </div>
  `;
}

// Improved file upload with better UX patterns
function handleDragOver(event) {
  event.preventDefault();
  const uploadZone = document.getElementById('upload-zone');
  uploadZone.classList.add('drag-over');
}

function handleDragLeave(event) {
  event.preventDefault();
  const uploadZone = document.getElementById('upload-zone');
  uploadZone.classList.remove('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  const uploadZone = document.getElementById('upload-zone');
  uploadZone.classList.remove('drag-over');
  
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    processFile(file);
  }
}

function processFile(file) {
  // Validate file type and size
  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file', 'error');
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    showToast('File size must be less than 10MB', 'error');
    return;
  }
  
  // Show upload progress
  showLoading('Uploading photo...');
  
  // Simulate upload process
  setTimeout(() => {
    const photoUrl = URL.createObjectURL(file);
    appState.uploadedImages.push(photoUrl);
    
    // Update stats with random values (gamification)
    const newFollowers = getRandomNumber(1, 10);
    const newLikes = getRandomNumber(5, 25);
    
    appState.followers += newFollowers;
    appState.likes += newLikes;
    
    hideLoading();
    
    // Better feedback than alert()
    showToast(`Photo uploaded! +${newFollowers} followers, +${newLikes} likes! 🎉`, 'success');
    
    // Auto-navigate to home to show the new photo
    setTimeout(() => {
      loadContent('home');
    }, 2000);
    
  }, 1500); // Realistic upload time
}

// Dark mode toggle with smooth transitions
function changeMode() {
  appState.darkMode = !appState.darkMode;
  document.body.classList.toggle('dark-mode');
  
  // Update theme icon
  const themeIcon = document.querySelector('.theme-icon');
  themeIcon.textContent = appState.darkMode ? '☀️' : '🌙';
  
  // Provide feedback
  const mode = appState.darkMode ? 'dark' : 'light';
  showToast(`Switched to ${mode} mode`, 'success');
  
  // Save preference
  localStorage.setItem('darkMode', appState.darkMode);
}

// Navigation state management
function setActiveNavButton(section) {
  // Remove active class from all buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to current section button
  const activeBtn = document.querySelector(`[onclick="loadContent('${section}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// UX principles panel toggle
function toggleUXPanel() {
  appState.uxPanelOpen = !appState.uxPanelOpen;
  const content = document.getElementById('ux-content');
  const toggle = document.querySelector('.ux-toggle');
  
  if (appState.uxPanelOpen) {
    content.classList.add('show');
    toggle.textContent = '❌ Close Guide';
  } else {
    content.classList.remove('show');
    toggle.textContent = '📋 UX Guide';
  }
}

// Toast notification system (better than alert())
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span>${icon}</span>
      <span>${message}</span>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove toast after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Loading state management
function showLoading(message = 'Loading...') {
  const overlay = document.getElementById('loading');
  const text = overlay.querySelector('p');
  text.textContent = message;
  overlay.classList.add('show');
}

function hideLoading() {
  const overlay = document.getElementById('loading');
  overlay.classList.remove('show');
}

// Accessibility: Screen reader announcements
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Keyboard navigation support
function setupKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Alt + number for quick navigation
    if (e.altKey) {
      switch(e.key) {
        case '1':
          loadContent('home');
          break;
        case '2':
          loadContent('upload');
          break;
        case '3':
          loadContent('profile');
          break;
        case 't':
          changeMode();
          break;
        case 'h':
          toggleUXPanel();
          break;
      }
    }
  });
}

// Utility functions
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shareImage(imageUrl) {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this photo!',
      text: 'Shared from OptimalSocial',
      url: imageUrl
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(imageUrl).then(() => {
      showToast('Image URL copied to clipboard!', 'success');
    });
  }
}

function editProfile() {
  showToast('Profile editing feature coming soon!', 'info');
}

function downloadData() {
  const data = {
    username: appState.username,
    followers: appState.followers,
    likes: appState.likes,
    photosCount: appState.uploadedImages.length,
    joinDate: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'optimalSocial-data.json';
  link.click();
  
  showToast('Data downloaded successfully!', 'success');
}

// Add CSS for new components
const additionalCSS = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--color-bg-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-lg);
  animation: modalSlide 0.3s ease;
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header h2 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

.modal-body {
  margin: var(--spacing-lg) 0;
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-text-light);
}

.username-tips {
  margin-top: var(--spacing-xs);
  color: #666;
}

.section-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.section-subtitle {
  color: #666;
  margin-top: var(--spacing-sm);
}

.home-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background: var(--color-bg-light);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.image-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.upload-container {
  max-width: 600px;
  margin: 0 auto;
}

.upload-zone {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: var(--spacing-lg);
}

.upload-zone:hover,
.upload-zone.drag-over {
  border-color: var(--color-primary);
  background: rgba(0, 102, 204, 0.05);
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.upload-tips {
  background: rgba(0, 102, 204, 0.05);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-primary);
}

.upload-tips ul {
  list-style: none;
  margin-top: var(--spacing-sm);
}

.upload-tips li {
  margin-bottom: var(--spacing-xs);
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background: var(--color-bg-light);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  margin-bottom: var(--spacing-xl);
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.profile-info h2 {
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
}

.profile-bio {
  color: #666;
  margin-bottom: var(--spacing-sm);
}

.profile-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: #666;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stat-item {
  text-align: center;
  background: var(--color-bg-light);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-name {
  font-size: var(--font-size-sm);
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

@keyframes slideOut {
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
`;

// Add the additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);