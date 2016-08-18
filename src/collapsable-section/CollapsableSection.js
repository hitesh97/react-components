import React from 'react';
import cx from 'classnames';
import { skinnable, props, t } from '../utils';
import FlexView from '../flex/FlexView';
import Icon from '../Icon/Icon';

@skinnable()
@props({
  children: t.ReactChildren,
  isOpen: t.Boolean,
  isSelected: t.maybe(t.Boolean),
  onChange: t.Function,
  onOpen: t.maybe(t.Function),
  onClose: t.maybe(t.Function),
  header: t.maybe(t.ReactChild),
  icons: t.maybe(t.struct({
    open: t.maybe(t.String),
    closed: t.maybe(t.String)
  })),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class CollapsableSection extends React.Component {

  static defaultProps = {
    onOpen: () => {},
    onClose: () => {}
  };

  _onChange = () => {
    const { onChange, onOpen, onClose, isOpen } = this.props;
    onChange(!isOpen);
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  getLocals() {
    const {
      props: {
        isOpen, isSelected,
        children, header, icons,
        className, id, style
      },
      _onChange: onChange
    } = this;

    return {
      isOpen,
      children,
      header,
      icons,
      onChange,
      wrapperProps: {
        id,
        style,
        className: cx(className, 'collapsable-section', { 'is-open': isOpen, 'is-selected': isSelected })
      }
    };
  }

  templateIcons = ({ isOpen, icons }) => (
    icons && <Icon icon={isOpen ? icons.open : icons.closed} />
  );

  template({ isOpen, children, onChange, header, icons, wrapperProps }) {
    return (
      <FlexView {...wrapperProps} column>
        <FlexView className='content' vAlignContent='center' onClick={onChange}>
          {header}
          <FlexView marginLeft='auto' shrink={false}>
            {this.templateIcons({ isOpen, icons })}
          </FlexView>
        </FlexView>
        {isOpen && children}
      </FlexView>
    );
  }

}
