# Work Bee Theme Configuration

The Work Bee app features a comprehensive theming system that supports light and dark modes with yellow accent colors.

## 🎨 Theme Colors

### Light Theme (Yellow & White)
- **Primary**: Yellow (#fbbf24)
- **Surface**: White (#ffffff)
- **Text**: Dark gray (#1c1917)

### Dark Theme (Yellow & Black)
- **Primary**: Yellow (#facc15)
- **Surface**: Black (#000000)
- **Text**: Light gray (#fafafa)

## 🔧 Global Theme Configuration

All theme colors are centrally configured in `/src/config/themes.js`. To modify themes:

1. Open `/src/config/themes.js`
2. Edit the color values in the `THEMES` object
3. Changes will apply automatically

### Adding New Themes

```javascript
export const THEMES = {
  // ... existing themes
  
  custom: {
    name: 'Custom',
    colors: {
      primary: '#your-color',
      surface: '#your-surface',
      // ... other colors
    }
  }
};
```

## 🌙 Theme Toggle

The theme toggle button is located in the header (sun/moon icon). Click to cycle between available themes.

## 💾 Theme Persistence

- Theme preference is saved to localStorage
- Automatically detects system preference on first visit
- Smooth transitions between themes (0.3s ease)

## 🎯 CSS Custom Properties

The theme system uses CSS custom properties for dynamic styling:

```css
.my-component {
  background: var(--surface);
  color: var(--on-surface);
  border: 1px solid var(--outline);
}
```

## 🔄 Available Theme Variables

- `--primary` / `--on-primary`
- `--secondary` / `--on-secondary`
- `--tertiary` / `--on-tertiary`
- `--surface` / `--on-surface`
- `--error` / `--on-error`
- `--outline` / `--outline-variant`
- And many more...

## 🚀 Usage in Components

```jsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="bg-surface text-on-surface">
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```
