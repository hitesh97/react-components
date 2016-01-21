import React from 'react';
import cx from 'classnames';
import omit from 'lodash/object/omit';

/**
 * ### To be used with `ReactTransitionGroup` to show transitions for a component
 */
const propTypes = {
  /**
   * the component you want to animate (it must have a unique "key")
   */
  children: React.PropTypes.node.isRequired,
  /**
   * custom component to be used as wrapper for `children`
   */
  component: React.PropTypes.any,
  /**
   * object with inline-style for each transition event. It's also possible to use `css` classes (formatted in kebab-case)
   */
  transitionStyles: React.PropTypes.shape({
    enter: React.PropTypes.object,
    enterActive: React.PropTypes.object,
    default: React.PropTypes.object,
    leave: React.PropTypes.object,
    leaveActive: React.PropTypes.object
  }),
  /**
   * duration of enter transition in milliseconds
   */
  transitionEnterTimeout: React.PropTypes.number.isRequired,
  /**
   * duration of leave transition in milliseconds
   */
  transitionLeaveTimeout: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

export default class TransitionWrapper extends React.Component {

  static propTypes = propTypes

  static defaultProps = {
    transitionStyles: {},
    style: {},
    component: 'div'
  }

  _replaceState = (state) => {
    this.state = state;
    this.forceUpdate();
  }

  startAnimation(anim, timeout, callback) {
    const { transitionStyles } = this.props;
    const animationStart = transitionStyles[anim];
    const animationEnd = transitionStyles[`${anim}Active`];

    const initState = { animationStart, transitionClassName: anim };
    const activeState = { animationEnd, transitionClassName: cx(anim, `${anim}-active`) };

    this._replaceState(initState);
    setTimeout(() => {
      this.setState(activeState);
      setTimeout(callback, timeout);
    }, 30); // if the render is too fast the animation fails... 30ms is an empiric value.
  }

  componentWillAppear = (callback) => this.componentWillEnter(callback)

  componentDidAppear = (callback) => this.componentDidEnter(callback)

  componentWillEnter = (callback) => (
    this.startAnimation('enter', this.props.transitionEnterTimeout, callback)
  )

  componentDidEnter = () => (
    this._replaceState({ defaultStyle: this.props.transitionStyles.default })
  )

  componentWillLeave = (callback) => (
    this.startAnimation('leave', this.props.transitionLeaveTimeout, callback)
  )

  getStyle = () => {
    const { style } = this.props;
    const { animationStart, animationEnd, defaultStyle } = this.state;
    const userTransform = (animationEnd || animationStart || defaultStyle || {}).transform;

    return {
      ...style,
      ...defaultStyle,
      ...animationStart,
      ...animationEnd,
      transform: cx(userTransform, style.transform)
    };
  }

  render() {
    if (!this.state) {
      return null;
    }
    const { children, className, component } = this.props;
    const { transitionClassName } = this.state;

    const props = {
      className: cx(className, transitionClassName),
      style: this.getStyle(),
      ...omit(this.props, Object.keys(propTypes))
    };

    return React.createElement(
      component,
      props,
      children
    );
  }

}
