import MDEditor from '@uiw/react-md-editor';

export type MdEditorProps = Parameters<typeof MDEditor>[0] & {
  previewClassName?: string;
  editorClassName?: string;
};
