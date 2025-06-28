# Event Planner - React Native App

A modern, cross-platform mobile application for creating and sharing beautiful event cards. Built with React Native, Expo, and TypeScript.

## 🚀 Features

- **Event Creation**: Create custom event cards with names, categories, and ratings
- **Custom Date Selection**: Choose specific dates for your events with an intuitive date picker
- **Multiple Categories**: Choose from Fitness, Running, Party, Workout, Yoga, and Swimming
- **Interactive Rating System**: 5-star rating with visual feedback
- **Social Media Sharing**: Share event cards as high-quality images on any platform
- **Responsive Design**: Optimized for all screen sizes using react-native-size-matters
- **Cross Platform**: Works seamlessly on iOS, Android, and Web
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and beautiful gradients
- **Enhanced Card Design**: Professional event cards with category-specific colors and decorative elements

## 📱 Screenshots

The app features two main screens:

- **Create Tab**: Event creation form with category selection, date picker, and rating
- **Features Tab**: App information, usage tips, and feature showcase

## 🛠️ Technology Stack

- **React Native** 0.79.4
- **Expo SDK** 53
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **React Native Size Matters** for responsive design
- **React Native View Shot** for card capture
- **Expo Sharing** for social media sharing
- **Expo Media Library** for saving images
- **React Native DateTime Picker** for date selection

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd share-event
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

   After this just install the expo app on your phone and scan the QR code. Make sure your phone and laptop connected to same wifi.

4. **Run on your preferred platform**

   ```bash
   # iOS
   i for ios

   # Android
   a for android

   # Web
   w for web
   ```

APK: **For APK**

```bash
# if you have already not insatlled eas-cli then
npm install -g eas-cli
# if you have already insalled eas-cli then
eas login
npx eas build --platform android --profile preview
## 🔧 Configuration

### Permissions

The app requires the following permissions:

- **Media Library Access**: To save event cards to the device's photo library
- **Storage Permissions** (Android): To read/write images

These permissions are automatically requested when needed.

### Environment Setup

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 📖 Usage

### Creating an Event Card

1. **Enter Event Name**: Type a descriptive name for your event
2. **Select Category**: Choose from available categories (Fitness, Running, Party, etc.)
3. **Choose Date**: Tap the date field to open the date picker and select your event date
4. **Set Rating**: Tap the stars to rate your event (1-5 stars)
5. **Create Card**: Tap "Create Event Card" to generate the card

### Sharing Event Cards

1. **View Created Cards**: All created cards appear in the "Your Events" section
2. **Share Card**: Tap "Share Card" on any event card
3. **Automatic Processing**: The app will:
- Capture the card as a high-quality image
- Save it to your device's photo library
- Open the native sharing dialog
4. **Post to Social Media**: Choose your preferred platform (Instagram, Facebook, Twitter, etc.)

## 🎨 Design System

The app uses a consistent design system with:

- **Primary Color**: #4361EE (Blue)
- **Success Color**: #10B981 (Green)
- **Warning Color**: #F59E0B (Yellow)
- **Error Color**: #EF4444 (Red)
- **Category Gradients**: Each category has its own unique color gradient
- **Neutral Colors**: Various grays for text and backgrounds

### Enhanced Card Design

- **Category-Specific Colors**: Each event category has its own gradient color scheme
- **Decorative Elements**: Subtle decorative circles and lines for visual appeal
- **Professional Typography**: Clean, readable fonts with proper hierarchy
- **Enhanced Layout**: Better spacing and visual organization

### Responsive Design

All dimensions are scaled using `react-native-size-matters`:

- `scale()` for horizontal dimensions
- `verticalScale()` for vertical dimensions
- `moderateScale()` for font sizes

## 🔄 State Management

The app uses React's built-in state management:

- Local state for form inputs and UI state
- Custom hooks for complex functionality (card sharing)
- No external state management libraries required

## 📁 Project Structure

```

card-share/
├── app/
│ ├── (tabs)/
│ │ ├── index.tsx # Main event creation screen
│ │ ├── explore.tsx # Features and tips screen
│ │ └── \_layout.tsx # Tab navigation layout
│ └── \_layout.tsx # Root layout
├── components/ # Reusable UI components
├── hooks/
│ └── useCardSharing.ts # Custom hook for card sharing
├── constants/ # App constants
├── assets/ # Images and static resources
└── package.json

````

## 🚀 Deployment

### Building for Production

1. **Configure app.json**: Update app name, bundle identifier, and other settings
2. **Build the app**:

   ```bash
   # For iOS
   eas build --platform ios

   # For Android
   eas build --platform android
````

**Built with ❤️ using React Native and Expo**
