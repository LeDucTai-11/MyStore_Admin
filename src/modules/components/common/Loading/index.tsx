import cn from 'classnames';
import React from 'react';
import './styles.scss';

const Loading: React.FC<LoadingProps> = ({
  visible = true,
  loadingStyle = 5,
  size = 'normal',
  variant = 'white',
  position = 'relative',
  className,
  ...props
}) => {
  if (visible) {
    return (
      <div
        className={cn(
          'cmp-loading',
          `cmp-loading--${variant}`,
          `cmp-loading--${size}`,
          `cmp-loading--${position}`,
          className,
        )}
        {...props}
      >
        {loadingStyle === 1 && <LoadingStyle1 />}
        {loadingStyle === 2 && <LoadingStyle2 />}
        {loadingStyle === 3 && <LoadingStyle3 />}
        {loadingStyle === 4 && <LoadingStyle4 />}
        {loadingStyle === 5 && <LoadingStyle5 />}
      </div>
    );
  }

  return null;
};

const LoadingStyle1 = () => (
  <div className="cmp-loading__style-1">
    <div className="cmp-loading__style-1--child" />
    <div className="cmp-loading__style-1--child" />
  </div>
);

const LoadingStyle2 = () => (
  <div className="cmp-loading__style-2">
    <div className="cmp-loading__style-2--child" />
    <div className="cmp-loading__style-2--child" />
    <div className="cmp-loading__style-2--child" />
    <div className="cmp-loading__style-2--child" />
  </div>
);

const LoadingStyle3 = () => <div className="cmp-loading__style-3" />;

const LoadingStyle4 = () => (
  <div className="cmp-loading__style-4">
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
    <div className="cmp-loading__style-4--child" />
  </div>
);

const LoadingStyle5 = () => <div className="cmp-loading__style-5" />;

export type LoadingVariant = 'white' | 'primary' | 'secondary' | 'outline-danger' | 'outline';

export type LoadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isRow?: boolean;
  justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-evenly';
  align?: 'center' | 'flex-start' | 'flex-end';
  renderIf?: boolean;
  flexGrow?: number;
  isRowWrap?: boolean;
  forwardRef?: React.LegacyRef<HTMLDivElement>;
  fullWidth?: boolean;
  visible?: boolean;
  loadingStyle?: 1 | 2 | 3 | 4 | 5;
  size?: 'normal' | 'small';
  variant?: LoadingVariant;
  position?: 'relative' | 'absolute';
};

export default Loading;
