# Default `ion-color` Values

This table shows the default color use in app

| Color Name          | Hex Value   | color | 
|---------------------|-------------|---------------------|
| **Primary**          | `#3c449c`   | ![#3c449c](https://placehold.co/40x15/3c449c/3c449c.png) | 
| **Secondary**        | `#484aa1`   | ![#484aa1](https://placehold.co/40x15/484aa1/484aa1.png) |
| **Tertiary**         | `#2a406d`   | ![#2a406d](https://placehold.co/40x15/2a406d/2a406d.png) |
| **Success**          | `#008000`   | ![#008000](https://placehold.co/40x15/008000/008000.png) |
| **Warning**          | `#ffcc00`   | ![#ffcc00](https://placehold.co/40x15/ffcc00/ffcc00.png) |
| **Danger**           | `#cc3300`   | ![#cc3300](https://placehold.co/40x15/cc3300/cc3300.png) |
| **Light**            | `#f4f5f8`   | ![#f4f5f8](https://placehold.co/40x15/f4f5f8/f4f5f8.png) |
| **Medium**           | `#989aa2`   | ![#989aa2](https://placehold.co/40x15/989aa2/989aa2.png) |
| **Dark**             | `#222428`   | ![#222428](https://placehold.co/40x15/222428/222428.png) |



### Custom Ionic Color Example
link for get generate https://ionicframework.com/docs/theming/color-generator
### Define Custom Colors
```css
:root {
  --ion-color-mybrand: #c5000f;
  --ion-color-mybrand-rgb: 197, 0, 15;
  --ion-color-mybrand-contrast: #ffffff;
  --ion-color-mybrand-contrast-rgb: 255, 255, 255;
  --ion-color-mybrand-shade: #ad000d;
  --ion-color-mybrand-tint: #cb1a27;
}
```
###  Apply the Custom Color to Ionic Components Globally 
```css
.ion-color-mybrand {
  --ion-color-base: var(--ion-color-mybrand);
  --ion-color-base-rgb: var(--ion-color-mybrand-rgb);
  --ion-color-contrast: var(--ion-color-mybrand-contrast);
  --ion-color-contrast-rgb: var(--ion-color-mybrand-contrast-rgb);
  --ion-color-shade: var(--ion-color-mybrand-shade);
  --ion-color-tint: var(--ion-color-mybrand-tint);
}
```
### Use Color 
```css
<ion-button color="mybrand">Background</ion-button>
<ion-text color="mybrand">Text Color</ion-text>
<ion-button color="mybrand">
  Background
  <ion-text color="mybrand">Text Color</ion-text>
</ion-button>
```
### Use in Class


