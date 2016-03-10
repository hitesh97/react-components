import React from 'react';
import cx from 'classnames';
import { props, t, skinnable } from '../utils';

@skinnable()
@props({
  /**
   * FocusableView content
   */
  children: t.union([t.ReactNode, t.Function]),
  /**
   *  Callback function called on "focus" event
   */
  onFocus: t.maybe(t.Function),
  /**
   *  Callback function called on "blur" event
   */
  onBlur: t.maybe(t.Function),
  /**
   *  "tabindex" attribute
   */
  tabIndex: t.maybe(t.Number),
  /**
   *  Wrapper component for `children`
   */
  component: t.maybe(t.union([t.Function, t.String])),
  /**
   *  When `true` the class "focused" is NOT added
   */
  ignoreFocus: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}, { strict: false })
export default class FocusableView extends React.Component {

  static defaultProps = {
    component: 'div',
    tabIndex: 0,
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  _onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  _onBlur = () => {
    this.setState({ focused: false });
    this.props.onBlur();
  };

  getLocals() {
    const { focused } = this.state;
    return {
      ...this.props,
      focused,
      className: !this.props.ignoreFocus ? cx(this.props.className, { focused }) : this.props.className,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    };
  }

  template({ children, component, focused, ...locals }) {
    return React.createElement(
      component,
      locals,
      t.Function.is(children) ? children(focused) : children
    );
  }

}
