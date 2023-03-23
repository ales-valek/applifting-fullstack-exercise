import clsx from 'clsx';
import MDEditor from '@uiw/react-md-editor';
import Markdown from 'markdown-to-jsx';

import { MdEditorProps } from './index.types';

import styles from './index.module.scss';

const MdEditor = ({
  className,
  editorClassName,
  previewClassName,
  value,
  onChange,
  ...props
}: MdEditorProps) => {
  return (
    <div className={clsx(styles['wrapper'], className)}>
      <MDEditor
        data-color-mode="light"
        preview="edit"
        className={clsx(styles['editor'], editorClassName)}
        value={value}
        onChange={onChange}
        {...props}
      />
      <div
        className={clsx(
          styles['preview'],
          'markdown-content',
          previewClassName
        )}
      >
        <Markdown>{value ?? ''}</Markdown>
      </div>
    </div>
  );
};

export default MdEditor;
