# Arrow Clock

A creative digital clock application that displays time using dynamic arrow patterns in a grid layout.

## 🚀 Demo

![Arrow Clock Preview](screenshot.gif)

## 📋 Description

Arrow Clock is an innovative time display application that transforms the traditional concept of digital clocks. Instead of standard digits, it uses animated arrow patterns arranged in a grid to show the current time. The arrows dynamically rotate and animate to form numbers, creating a unique and visually appealing way to read time.

## ✨ Features

- **Dynamic Arrow Grid**: Time is displayed using arrow patterns that form digital numbers
- **Smooth Animations**: Fluid transitions and rotations for a polished user experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **PWA Ready**: Progressive Web App capabilities for mobile installation
- **Corner Cell Optimization**: Special handling for corner cells in digit patterns
- **Real-time Updates**: Automatically updates to show current time with second precision
- **Background Animation**: Continuously rotating arrows in the background grid
- **Mobile Optimized**: Touch-friendly interface with proper viewport handling

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with PWA meta tags
- **CSS3**: Advanced styling with animations and responsive design
- **JavaScript (ES6+)**: Modern JavaScript for dynamic functionality
- **jQuery**: For DOM manipulation and event handling

## 🎯 How It Works

1. **Grid System**: The application creates a dynamic grid of arrow cells
2. **Pattern Recognition**: Each digit (0-9) has a predefined arrow pattern
3. **Real-time Rendering**: The current time is continuously fetched and displayed
4. **Animation Engine**: Smooth transitions between different digit states
5. **Responsive Layout**: Grid adapts to different screen sizes automatically

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arrow-clock.git
```

2. Navigate to the project directory:
```bash
cd arrow-clock
```

3. Open `index.html` in your web browser or serve it using a local server:
```bash
# Using live-server (recommended)
live-server
```

4. The application will automatically open in your browser

## 📱 Usage

- **Desktop**: Open the application in your browser for full-screen experience
- **Mobile**: The app is fully responsive and works on all mobile devices
- **PWA**: Can be installed as a Progressive Web App on compatible devices

## 🔧 Configuration

The application includes several customizable parameters:

- **Grid Size**: Automatically adjusts based on screen size
- **Animation Speed**: Configurable through CSS variables
- **Cell Patterns**: Digit patterns can be modified in the `digitPatterns` object
- **Color Scheme**: Easy to customize through CSS variables

## 🎨 Customization

### Changing Colors
Modify the CSS variables in `style.css`:
```css
:root {
  --active-color: #ffffff;
  --inactive-color: rgba(255, 255, 255, 0.15);
  --background-color: #000000;
  --cell-background: #1f2937;
}
```

### Modifying Animation Speed
Adjust the transition duration in CSS:
```css
.arrow-line {
  transition: transform 0.3s ease-in-out;
}
```

## 📂 Project Structure

```
arrow-clock/
├── index.html          # Main HTML file
├── main.js             # JavaScript functionality
├── style.css           # Styles and animations
├── README.md           # Project documentation
└── LICENSE.txt         # MIT license
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.
