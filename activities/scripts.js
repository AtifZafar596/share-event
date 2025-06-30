
// Activity data
const activities = [
  // Fitness & Sports (10)
  { id: 1, name: 'Gym', icon: '🏋️', category: 'Fitness', color: '#3B82F6' },
  { id: 2, name: 'Running', icon: '🏃', category: 'Fitness', color: '#EF4444' },
  { id: 3, name: 'Jogging', icon: '🏃‍♀️', category: 'Fitness', color: '#10B981' },
  { id: 4, name: 'Football', icon: '⚽', category: 'Sports', color: '#F59E0B' },
  { id: 5, name: 'Basketball', icon: '🏀', category: 'Sports', color: '#F97316' },
  { id: 6, name: 'Swimming', icon: '🏊', category: 'Water Sports', color: '#06B6D4' },
  { id: 7, name: 'Yoga', icon: '🧘', category: 'Fitness', color: '#A855F7' },
  { id: 8, name: 'Cycling', icon: '🚴', category: 'Fitness', color: '#8B5CF6' },
  { id: 9, name: 'Boxing', icon: '🥊', category: 'Martial Arts', color: '#B91C1C' },
  { id: 10, name: 'Tennis', icon: '🎾', category: 'Sports', color: '#16A34A' },

  // Intimacy & Love (10)
  { id: 11, name: 'Cuddling', icon: '🤗', category: 'Intimacy', color: '#EC4899' },
  { id: 12, name: 'Kissing', icon: '💋', category: 'Intimacy', color: '#F43F5E' },
  { id: 13, name: 'Holding Hands', icon: '🤝', category: 'Intimacy', color: '#E11D48' },
  { id: 14, name: 'Massage', icon: '💆', category: 'Intimacy', color: '#BE185D' },
  { id: 15, name: 'Romantic Dinner', icon: '🍽️', category: 'Intimacy', color: '#9F1239' },
  { id: 16, name: 'Slow Dance', icon: '💃', category: 'Intimacy', color: '#DC2626' },
  { id: 17, name: 'Love Letters', icon: '💌', category: 'Intimacy', color: '#DB2777' },
  { id: 18, name: 'Pillow Talk', icon: '🛏️', category: 'Intimacy', color: '#C2185B' },
  { id: 19, name: 'Bubble Bath', icon: '🛁', category: 'Intimacy', color: '#AD1457' },
  { id: 20, name: 'Sunset Together', icon: '🌅', category: 'Intimacy', color: '#880E4F' },

  // Emotional Connection (5)
  { id: 21, name: 'Deep Talk', icon: '💬', category: 'Emotional', color: '#6366F1' },
  { id: 22, name: 'Laughing', icon: '😂', category: 'Emotional', color: '#8B5CF6' },
  { id: 23, name: 'Stargazing', icon: '⭐', category: 'Emotional', color: '#A855F7' },
  { id: 24, name: 'Forehead Kiss', icon: '😘', category: 'Emotional', color: '#C084FC' },
  { id: 25, name: 'Back Hug', icon: '🤗', category: 'Emotional', color: '#DDD6FE' },

  // Active Lifestyle (5)
  { id: 26, name: 'Hiking', icon: '🥾', category: 'Other', color: '#059669' },
  { id: 27, name: 'Dancing', icon: '💃', category: 'Dance', color: '#DC2626' },
  { id: 28, name: 'Surfing', icon: '🏄', category: 'Water Sports', color: '#0891B2' },
  { id: 29, name: 'Skiing', icon: '⛷️', category: 'Extreme Sports', color: '#1E40AF' },
  { id: 30, name: 'Martial Arts', icon: '🥋', category: 'Martial Arts', color: '#374151' },

  // Additional Intimacy Ideas (5)
  { id: 31, name: 'Morning Coffee', icon: '☕', category: 'Intimacy', color: '#92400E' },
  { id: 32, name: 'Cooking Together', icon: '👨‍🍳', category: 'Intimacy', color: '#B45309' },
  { id: 33, name: 'Movie Night', icon: '🎬', category: 'Intimacy', color: '#C2410C' },
  { id: 34, name: 'Travel Together', icon: '✈️', category: 'Intimacy', color: '#DC2626' },
  { id: 35, name: 'Picnic Date', icon: '🧺', category: 'Intimacy', color: '#16A34A' },

  // Continue with remaining activities (65 more)
  { id: 36, name: 'Volleyball', icon: '🏐', category: 'Sports', color: '#2563EB' },
  { id: 37, name: 'Badminton', icon: '🏸', category: 'Sports', color: '#7C3AED' },
  { id: 38, name: 'Golf', icon: '⛳', category: 'Sports', color: '#15803D' },
  { id: 39, name: 'Skateboarding', icon: '🛹', category: 'Extreme Sports', color: '#1F2937' },
  { id: 40, name: 'Snowboarding', icon: '🏂', category: 'Extreme Sports', color: '#1E3A8A' },
  { id: 41, name: 'Weightlifting', icon: '🏋️‍♀️', category: 'Fitness', color: '#4B5563' },
  { id: 42, name: 'CrossFit', icon: '💪', category: 'Fitness', color: '#991B1B' },
  { id: 43, name: 'Pilates', icon: '🤸', category: 'Fitness', color: '#BE185D' },
  { id: 44, name: 'Rock Climbing', icon: '🧗', category: 'Extreme Sports', color: '#7F1D1D' },
  { id: 45, name: 'Kayaking', icon: '🛶', category: 'Water Sports', color: '#0E7490' },
  { id: 46, name: 'Canoeing', icon: '🚣', category: 'Water Sports', color: '#0F766E' },
  { id: 47, name: 'Rowing', icon: '🚣‍♀️', category: 'Water Sports', color: '#065F46' },
  { id: 48, name: 'Sailing', icon: '⛵', category: 'Water Sports', color: '#1E40AF' },
  { id: 49, name: 'Meditation', icon: '🧘‍♂️', category: 'Other', color: '#6366F1' },
  { id: 50, name: 'Zumba', icon: '💃', category: 'Dance', color: '#DB2777' },
  { id: 51, name: 'Aerobics', icon: '🤸‍♀️', category: 'Fitness', color: '#C2410C' },
  { id: 52, name: 'HIIT', icon: '⚡', category: 'Fitness', color: '#DC2626' },
  { id: 53, name: 'Stretching', icon: '🤲', category: 'Fitness', color: '#059669' },
  { id: 54, name: 'Walking', icon: '🚶', category: 'Fitness', color: '#16A34A' },
  { id: 55, name: 'Squash', icon: '🎾', category: 'Sports', color: '#CA8A04' },
  { id: 56, name: 'Rugby', icon: '🏉', category: 'Sports', color: '#166534' },
  { id: 57, name: 'Baseball', icon: '⚾', category: 'Sports', color: '#B91C1C' },
  { id: 58, name: 'Cricket', icon: '🏏', category: 'Sports', color: '#15803D' },
  { id: 59, name: 'Hockey', icon: '🏒', category: 'Sports', color: '#1E40AF' },
  { id: 60, name: 'Table Tennis', icon: '🏓', category: 'Sports', color: '#DC2626' },
  { id: 61, name: 'Archery', icon: '🏹', category: 'Sports', color: '#7C2D12' },
  { id: 62, name: 'Fencing', icon: '🤺', category: 'Sports', color: '#374151' },
  { id: 63, name: 'Horse Riding', icon: '🐎', category: 'Other', color: '#A16207' },
  { id: 64, name: 'Triathlon', icon: '🏊‍♂️', category: 'Sports', color: '#0E7490' },
  { id: 65, name: 'Marathon', icon: '🏃‍♂️', category: 'Sports', color: '#B91C1C' },
  { id: 66, name: 'Sprinting', icon: '💨', category: 'Sports', color: '#F59E0B' },
  { id: 67, name: 'Ballet', icon: '🩰', category: 'Dance', color: '#EC4899' },
  { id: 68, name: 'Breakdancing', icon: '🕺', category: 'Dance', color: '#1F2937' },
  { id: 69, name: 'Parkour', icon: '🏃‍♂️', category: 'Extreme Sports', color: '#1F2937' },
  { id: 70, name: 'Gymnastics', icon: '🤸‍♀️', category: 'Sports', color: '#A855F7' },
  { id: 71, name: 'Bowling', icon: '🎳', category: 'Indoor Games', color: '#DC2626' },
  { id: 72, name: 'Darts', icon: '🎯', category: 'Indoor Games', color: '#059669' },
  { id: 73, name: 'Pool', icon: '🎱', category: 'Indoor Games', color: '#1F2937' },
  { id: 74, name: 'Chess', icon: '♟️', category: 'Indoor Games', color: '#374151' },
  { id: 75, name: 'Fishing', icon: '🎣', category: 'Other', color: '#0891B2' },
  { id: 76, name: 'Gardening', icon: '🌱', category: 'Other', color: '#16A34A' },
  { id: 77, name: 'Mountain Biking', icon: '🚵', category: 'Extreme Sports', color: '#A16207' },
  { id: 78, name: 'Roller Skating', icon: '⛸️', category: 'Other', color: '#EC4899' },
  { id: 79, name: 'Ice Skating', icon: '⛸️', category: 'Other', color: '#06B6D4' },
  { id: 80, name: 'Kickboxing', icon: '🥊', category: 'Martial Arts', color: '#B91C1C' },
  { id: 81, name: 'Taekwondo', icon: '🦵', category: 'Martial Arts', color: '#DC2626' },
  { id: 82, name: 'Judo', icon: '🥋', category: 'Martial Arts', color: '#1F2937' },
  { id: 83, name: 'Karate', icon: '👊', category: 'Martial Arts', color: '#374151' },
  { id: 84, name: 'Wrestling', icon: '🤼', category: 'Martial Arts', color: '#7F1D1D' },
  { id: 85, name: 'Frisbee', icon: '🥏', category: 'Sports', color: '#F59E0B' },
  { id: 86, name: 'Handball', icon: '🤾', category: 'Sports', color: '#2563EB' },
  { id: 87, name: 'Water Polo', icon: '🤽', category: 'Water Sports', color: '#0891B2' },
  { id: 88, name: 'Diving', icon: '🤿', category: 'Water Sports', color: '#0E7490' },
  { id: 89, name: 'Bodybuilding', icon: '💪', category: 'Fitness', color: '#4B5563' },
  { id: 90, name: 'Powerlifting', icon: '🏋️‍♂️', category: 'Fitness', color: '#1F2937' },
  { id: 91, name: 'Scuba Diving', icon: '🤿', category: 'Water Sports', color: '#0F766E' },
  { id: 92, name: 'Bouldering', icon: '🧗‍♀️', category: 'Extreme Sports', color: '#7C2D12' },
  { id: 93, name: 'Trail Running', icon: '🏃‍♀️', category: 'Sports', color: '#16A34A' },
  { id: 94, name: 'Obstacle Course', icon: '🏃‍♂️', category: 'Sports', color: '#B45309' },
  { id: 95, name: 'Disc Golf', icon: '🥏', category: 'Sports', color: '#15803D' },

  // Final Examples (Romantic Focus) (5)
  { id: 96, name: 'Forehead Touch', icon: '🤲', category: 'Intimacy', color: '#F43F5E' },
  { id: 97, name: 'Whispering', icon: '🤫', category: 'Intimacy', color: '#E11D48' },
  { id: 98, name: 'Shared Hobby', icon: '🎨', category: 'Intimacy', color: '#BE185D' },
  { id: 99, name: 'Proposal', icon: '💍', category: 'Intimacy', color: '#9F1239' },
  { id: 100, name: 'Anniversary', icon: '🎉', category: 'Intimacy', color: '#880E4F' }
];

// State
let filteredActivities = [...activities];
let likedActivities = new Set();
let starredActivities = new Set();

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const activityGrid = document.getElementById('activityGrid');
const noResults = document.getElementById('noResults');
const showingResults = document.getElementById('showingResults');

// Initialize the app
function init() {
    renderActivities();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleCategoryFilter);
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    filteredActivities = activities.filter(activity => {
        const matchesSearch = activity.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    renderActivities();
    updateStats();
}

// Handle category filter
function handleCategoryFilter() {
    handleSearch(); // Reuse search logic
}

// Render activities
function renderActivities() {
    if (filteredActivities.length === 0) {
        activityGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    activityGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    activityGrid.innerHTML = filteredActivities.map(activity => createActivityCard(activity)).join('');
    
    // Add event listeners to action buttons
    addActionListeners();
}

// Create activity card HTML
function createActivityCard(activity) {
    const isLiked = likedActivities.has(activity.id);
    const isStarred = starredActivities.has(activity.id);
    
    return `
        <div class="activity-card" data-id="${activity.id}">
            <div class="activity-actions">
                <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" data-id="${activity.id}">
                    ❤️
                </button>
                <button class="action-btn star-btn ${isStarred ? 'starred' : ''}" data-id="${activity.id}">
                    ⭐
                </button>
            </div>
            <div class="card-content">
                <div class="activity-icon" style="background-color: ${activity.color}20;">
                    ${activity.icon}
                </div>
                <h3 class="activity-name">${activity.name}</h3>
                <span class="activity-category">${activity.category}</span>
            </div>
        </div>
    `;
}

// Add event listeners to action buttons
function addActionListeners() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const starButtons = document.querySelectorAll('.star-btn');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleLike(id, btn);
        });
    });
    
    starButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleStar(id, btn);
        });
    });
}

// Toggle like
function toggleLike(id, btn) {
    if (likedActivities.has(id)) {
        likedActivities.delete(id);
        btn.classList.remove('liked');
    } else {
        likedActivities.add(id);
        btn.classList.add('liked');
    }
}

// Toggle star
function toggleStar(id, btn) {
    if (starredActivities.has(id)) {
        starredActivities.delete(id);
        btn.classList.remove('starred');
    } else {
        starredActivities.add(id);
        btn.classList.add('starred');
    }
}

// Update stats
function updateStats() {
    showingResults.textContent = filteredActivities.length;
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
