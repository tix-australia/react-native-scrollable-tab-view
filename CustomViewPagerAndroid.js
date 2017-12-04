/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('react');
import { UIManager, Keyboard, requireNativeComponent, ViewPagerAndroid } from 'react-native';
import PropTypes, { ViewPropTypes } from 'prop-types'

var dismissKeyboard = Keyboard.dismiss;

var VIEWPAGER_REF = 'viewPager';

type Event = Object;

export type ViewPagerScrollState = $Enum<{
  idle: string,
  dragging: string,
  settling: string,
}>;

export default class CustomViewPagerAndroid extends ViewPagerAndroid {
  _childrenWithOverridenStyle = (): Array => {
    // Override styles so that each page will fill the parent. Native component
    // will handle positioning of elements, so it's not important to offset
    // them correctly.
    return React.Children.map(this.props.children, function(child) {
      if (!child) {
        return null;
      }
      var newProps = {
        ...child.props,
        style: [child.props.style, {
          // position: 'absolute',
          // left: 0,
          // top: 0,
          // right: 0,
          // bottom: 0,
          // width: undefined,
          // height: undefined,
        }],
        collapsable: false,
      };
      if (child.type &&
        child.type.displayName &&
        (child.type.displayName !== 'RCTView') &&
        (child.type.displayName !== 'View')) {
        console.warn('Each ViewPager child must be a <View>. Was ' + child.type.displayName);
      }
      return React.createElement(child.type, newProps);
    });
  };
}


