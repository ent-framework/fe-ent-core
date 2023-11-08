const DEFAULT_EDITOR_SIZE_UNIT = 'px';

export default function useEditorStyle({
  width,
  height,
}: {
  width?: string | number;
  height?: string | number;
}) {
  const editorSizeStyle = {
    width: Number.isNaN(Number(width)) ? width : `${width}${DEFAULT_EDITOR_SIZE_UNIT}`,
    height: Number.isNaN(Number(height)) ? height : `${height}${DEFAULT_EDITOR_SIZE_UNIT}`,
  };

  return [editorSizeStyle];
}
