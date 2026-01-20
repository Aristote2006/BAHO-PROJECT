# Adding Images to BAHO AFRICA Website

## Where to Store Images

### 1. Public Folder Method (Recommended for static images)
- **Location**: `/client/public/images/`
- **Access**: Direct URL path (e.g., `<img src="/images/my-photo.jpg" />`)
- **Best for**: Background images, logos, icons, and images that don't change

### 2. Assets Folder Method (Recommended for imported images)
- **Location**: `/client/src/assets/images/`
- **Access**: Import into components (e.g., `import myImage from '../assets/images/my-photo.jpg'`)
- **Best for**: Dynamic images, images that are part of components

## How to Add Images

### Method 1: Using Public Folder
1. Place your image file in `client/public/images/`
2. Use the image in your component:
```jsx
<img src="/images/your-image-name.jpg" alt="Description" />
```

### Method 2: Using Assets Folder
1. Place your image file in `client/src/assets/images/`
2. Import the image in your component:
```jsx
import myImage from '../assets/images/your-image-name.jpg';

function MyComponent() {
  return (
    <img src={myImage} alt="Description" />
  );
}
```

## Example Usage in Components

### For Homepage or Layout Components (using public folder):
```jsx
<Box 
  sx={{ 
    backgroundImage: 'url(/images/background.jpg)', 
    backgroundSize: 'cover',
    height: '400px'
  }} 
/>
```

### For Specific Components (using assets folder):
```jsx
import logo from '../assets/images/logo.png';

function Header() {
  return (
    <img src={logo} alt="BAHO AFRICA Logo" />
  );
}
```

## Supported Image Formats
- JPG/JPEG
- PNG
- GIF
- SVG
- WebP

## Image Optimization Tips
- Compress images before adding to reduce load time
- Use appropriate dimensions for the display size
- Use descriptive filenames for better organization
- Maintain consistent naming conventions