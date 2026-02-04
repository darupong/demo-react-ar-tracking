# MindAR Image Tracking - React + Vite

A Web AR project for image tracking using MindAR.js with React + Vite + TypeScript.

## 🚀 Features

- ✅ **Image Tracking**: Track and display 3D content on real-world images
- ✅ **React + TypeScript**: Built with React and TypeScript for type safety
- ✅ **Vite**: Fast and modern build tool
- ✅ **Responsive UI**: Clean, easy-to-use interface
- ✅ **MindAR.js**: Powerful and easy-to-use Web AR library

## 📦 Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **MindAR.js** - Web AR Library
- **A-Frame** - 3D Framework
- **Three.js** - 3D Graphics (via A-Frame)

## 🛠️ Installation

**Requirements:** Node.js (tested with **Node 24.13.0**)

```bash
# Install dependencies
npm install

# Start development server (with HTTPS for mobile testing)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 📱 Testing on Mobile (iPhone/iPad)

Development server runs with **HTTPS enabled** for camera access on mobile devices.

1. **Connect to same WiFi** - iPhone and computer must be on same network
2. **Open in Safari**: `https://192.168.1.122:5173/` (use your IP address)
3. **Accept certificate warning** - Click "Show Details" → "visit this website"
4. **Allow camera access** when prompted

> **Important**: iOS requires HTTPS to access camera. HTTP won't work!

📖 [Read detailed mobile testing guide](./MOBILE-TESTING.md)

## 📱 Usage

1. Open the application in your browser
2. Click "Launch AR Experience"
3. Allow camera access when prompted
4. Click "Start AR" to begin tracking
5. Point your camera at the target image

## 🎯 Target Image

Download a sample target image for testing:
- [Card Example](https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png)

Or create your own target image at:
- [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)

## 📁 Project Structure

```
ar-tracking-react/
├── public/
│   └── targets/          # Store .mind files (compiled target images)
├── src/
│   ├── components/       # React components
│   │   ├── ARScene.tsx   # Main AR component
│   │   └── ARScene.css   # AR styles
│   ├── types/           # TypeScript type definitions
│   │   └── mindar.d.ts  # MindAR type definitions
│   ├── App.tsx          # Main App component
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## 🎨 Customization

### Change Target Image

1. Compile your image at [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
2. Download the resulting `.mind` file
3. Place the file in `public/targets/`
4. Update the `imageTargetSrc` prop in the `ARScene` component:

```tsx
<ARScene imageTargetSrc="/targets/your-target.mind" />
```

### Change 3D Model

Edit in `ARScene.tsx`:

```tsx
<a-assets>
  <a-asset-item
    id="yourModel"
    src="/path/to/your/model.gltf"
  ></a-asset-item>
</a-assets>

<a-entity mindar-image-target="targetIndex: 0">
  <a-gltf-model
    src="#yourModel"
    position="0 0 0"
    scale="1 1 1"
  ></a-gltf-model>
</a-entity>
```

### Add Multiple Targets

```tsx
<a-entity mindar-image-target="targetIndex: 0">
  {/* Content for target 1 */}
</a-entity>

<a-entity mindar-image-target="targetIndex: 1">
  {/* Content for target 2 */}
</a-entity>
```

## 🌐 Browser Support

- ✅ Chrome (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (Android & Desktop)
- ✅ Edge (Desktop)

**Note**: HTTPS or localhost is required for camera access.

## 📚 Resources

- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [MindAR GitHub](https://github.com/hiukim/mind-ar-js)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Three.js Documentation](https://threejs.org/docs/)

## 🐛 Troubleshooting

### Camera not working
- Ensure the browser has permission to access the camera
- Use HTTPS or localhost
- Check that the camera is not in use by another app

### AR not tracking
- Ensure there is enough light in the room
- Make sure the target image is clear and in focus
- Try adjusting the distance between the camera and the target image

### Performance issues
- Reduce 3D model file sizes
- Use models with fewer polygons
- Use compressed textures

## 📝 License

MIT License - See [MindAR License](https://github.com/hiukim/mind-ar-js/blob/master/LICENSE)

## 🙏 Credits

- [MindAR.js](https://github.com/hiukim/mind-ar-js) by [@hiukim](https://github.com/hiukim)
- [A-Frame](https://aframe.io/)
- [Three.js](https://threejs.org/)
