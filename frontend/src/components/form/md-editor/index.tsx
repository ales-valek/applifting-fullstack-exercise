import { lazy, Suspense } from 'react';
import clsx from 'clsx';

import Markdown from 'markdown-to-jsx';

import styles from './index.module.scss';
import Spinner from 'components/spinner';

const MDEditor = lazy(() => import('@uiw/react-md-editor'));

type MdEditorProps = Parameters<typeof MDEditor>[0] & {
  previewClassName?: string;
  editorClassName?: string;
};

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
      <Suspense fallback={<Spinner size="lg" />}>
        <MDEditor
          data-color-mode="light"
          preview="edit"
          className={clsx(styles['editor'], editorClassName)}
          value={value}
          onChange={onChange}
          {...props}
        />
        <div className={clsx(styles['preview'], previewClassName)}>
          <Markdown>{value ?? ''}</Markdown>
        </div>
      </Suspense>
    </div>
  );
};

export default MdEditor;
