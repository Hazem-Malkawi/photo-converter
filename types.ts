
export interface CartoonStyle {
  id: string;
  name: string;
  prompt: string;
  icon: string;
}

export const CARTOON_STYLES: CartoonStyle[] = [
  {
    id: 'pixar',
    name: 'بيكسار',
    prompt: 'Convert this image into a 3D rendered character in the style of a modern Pixar movie. Focus on soft lighting, detailed textures, and expressive, friendly features.',
    icon: '🎨',
  },
  {
    id: 'lego',
    name: 'ليغو',
    prompt: 'Transform this image into a 3D Lego minifigure and scene. Everything should look like it is made of Lego bricks, with characteristic stud details and glossy plastic textures.',
    icon: '🧱',
  },
  {
    id: 'claymation',
    name: 'صلصال',
    prompt: 'Reimagine this image in the style of stop-motion claymation. The result should have a handcrafted feel, with visible thumbprints and slightly imperfect, charming shapes.',
    icon: '🏺',
  },
  {
    id: 'anime3d',
    name: 'أنمي 3D',
    prompt: 'Turn this image into a high-quality 3D anime character. The style should blend cel-shading with smooth 3D modeling, featuring large expressive eyes and dynamic hair.',
    icon: '🌸',
  },
];
