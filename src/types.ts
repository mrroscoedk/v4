export interface Position {
  x: number;
  y: number;
}

export interface TextStyle {
  fontSize: number;
  color: string;
  fontFamily: string;
  italic: boolean;
  underline: boolean;
  lineThrough: boolean;
  strokeWidth: number;
  strokeColor: string;
}

export interface MemeText {
  id: string;
  content: string;
  position: Position;
  rotation: number;
  scale: number;
  style: TextStyle;
  isDragging: boolean;
  isRotating: boolean;
  isResizing: boolean;
  dragStart: Position;
  dragOffset: Position;
  initialRotation: number;
}

export interface MemeState {
  id: string;
  position: Position;
  scale: number;
  rotation: number;
  isDragging: boolean;
  isResizing: boolean;
  isRotating: boolean;
  dragStart: Position;
  dragOffset: Position;
  initialRotation: number;
  flipX: boolean;
  flipY: boolean;
  texts: MemeText[];
}