# 📱 iPhone/iPad Testing Guide

## ⚠️ Very Important: iOS Requires HTTPS!

iOS Safari **does not allow** camera access over HTTP. You **must** use **HTTPS only**.

This project is already set up with HTTPS ✅

---

## 🚀 Testing on iPhone

### Step 1: Check Your Mac’s IP Address

From the terminal output you’ll see something like:
```
➜  Local:   https://localhost:5173/
➜  Network: https://192.168.1.122:5173/
```

Use the **Network URL** (not localhost).

### Step 2: Same WiFi

- iPhone and Mac must be on the **same WiFi**
- Make sure iPhone is not using a VPN

### Step 3: Open Safari on iPhone

1. Open **Safari** (recommended) or Chrome
2. Enter URL: `https://192.168.1.122:5173/`
   - ⚠️ Use **HTTPS**, not HTTP
   - Replace with your own IP address

### Step 4: Accept Certificate (first time only)

Because the dev server uses a self-signed certificate:

1. You’ll see a **warning**: "This Connection Is Not Private"
2. Tap **"Show Details"**
3. Tap **"visit this website"**
4. Tap **"Visit Website"** again

In Chrome:
1. Tap **"Advanced"**
2. Tap **"Proceed to 192.168.1.122 (unsafe)"**

### Step 5: Allow Camera Access

1. Tap **"Launch AR Experience"**
2. Tap **"Start AR"**
3. Safari will ask for camera access
4. Tap **"Allow"**

### Step 6: Test AR

1. On another device, download the target image:
   - [Download Target Image](https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png)
   - Open it on a computer or print it

2. Point the iPhone camera at the image
3. The 3D model should appear on the image! 🎉

---

## 🔧 Troubleshooting

### ❌ Camera Not Working

**Possible causes:**

#### 1. Using HTTP instead of HTTPS
```
❌ http://192.168.1.122:5173/   ← Wrong
✅ https://192.168.1.122:5173/  ← Correct
```

#### 2. Camera access not allowed
- Go to **Settings → Safari → Camera**
- Choose **"Ask"** or **"Allow"**

#### 3. Certificate not accepted
- You must get past the security warning first
- Try refreshing the page

#### 4. Not on same WiFi
- Confirm iPhone and Mac are on the same network
- Turn off VPN if it’s on

#### 5. Mac firewall
If you can’t connect at all, try temporarily disabling the firewall:
```bash
# Check firewall status
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Turn off firewall (testing only)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off

# Turn firewall back on (after testing)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
```

---

## 📱 Testing Tips

### 1. Safari DevTools

Debug from your Mac:

1. Open Safari on Mac
2. **Safari → Settings → Advanced**
3. Enable **"Show features for web developers"**
4. Connect iPhone via USB
5. **Develop → [iPhone Name] → [Your Page]**
6. You get Console and debugging like on desktop!

### 2. Test on Multiple Devices

Same IP works on multiple devices:
```
iPhone:  https://192.168.1.122:5173/
iPad:    https://192.168.1.122:5173/
Android: https://192.168.1.122:5173/
```

### 3. QR Code for Easy Access

Generate a QR code for the URL:
- Go to [QR Code Generator](https://www.qr-code-generator.com/)
- Enter URL: `https://192.168.1.122:5173/`
- Scan with the Camera app on iPhone

---

## 🌐 Alternative: Tunneling Service

If you can’t connect over WiFi, use a tunneling service:

### Option 1: Ngrok (recommended)

```bash
# Install ngrok
brew install ngrok

# Start tunnel
ngrok http https://localhost:5173

# You’ll get a URL like:
# https://abc123.ngrok.io
```

Then open that URL on your iPhone.

### Option 2: LocalTunnel

```bash
# Install
npm install -g localtunnel

# Start tunnel
lt --port 5173 --subdomain my-ar-app

# You’ll get:
# https://my-ar-app.loca.lt
```

### Option 3: Cloudflare Tunnel

```bash
# Install
brew install cloudflare/cloudflare/cloudflared

# Start tunnel
cloudflared tunnel --url https://localhost:5173
```

---

## 📊 Performance Tips for Mobile

### 1. Reduce 3D Model Size
```bash
# Use gltf-pipeline to compress models
npm install -g gltf-pipeline
gltf-pipeline -i model.gltf -o model-compressed.glb -d
```

### 2. Optimize Target Images
- Use images with high contrast
- 1024×1024 px is a good size
- Format: PNG or JPG

### 3. Test Network
```bash
# Check latency
ping 192.168.1.122
```

---

## 🎯 Known Issues on iOS

### 1. Safari Auto-Lock
- Screen turns off when not touched
- Fix: Enable Guided Access or increase Auto-Lock time

### 2. Memory Limits
- iOS limits memory for web apps
- Large 3D models can cause crashes

### 3. WebGL Context Lost
- Sometimes the WebGL context is lost
- Fix: Reload the page

### 4. Camera Orientation
- Camera may appear in wrong orientation
- Fix: Lock orientation in code

---

## ✅ Pre-Test Checklist

- [ ] Mac and iPhone on same WiFi
- [ ] Using HTTPS URL (not HTTP)
- [ ] Target image downloaded
- [ ] Camera access allowed in Safari
- [ ] Certificate warning accepted
- [ ] Enough light in the room
- [ ] No VPN or firewall blocking

---

## 📞 Support

If you still have issues:

1. Check the browser console (use Safari DevTools)
2. See [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
3. Check [Known Issues](https://github.com/hiukim/mind-ar-js/blob/master/KnownIssues.md)

---

**Happy AR testing! 🚀📱**
