/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {wrap} from 'jest-snapshot-serializer-raw';
import runJest, {json as runWithJson} from '../runJest';
import {extractSummary} from '../Utils';

test('moduleNameMapper wrong configuration', () => {
  const {stderr, exitCode} = runJest('module-name-mapper-wrong-config');
  const {rest} = extractSummary(stderr);

  expect(exitCode).toBe(1);
  expect(wrap(rest)).toMatchSnapshot();
});

test('moduleNameMapper wrong array configuration', () => {
  const {stderr, exitCode} = runJest('module-name-mapper-wrong-array-config');
  const {rest} = extractSummary(stderr);

  expect(exitCode).toBe(1);
  expect(wrap(rest)).toMatchSnapshot();
});

test('moduleNameMapper correct configuration', () => {
  const {stderr, exitCode} = runJest('module-name-mapper-correct-config', [], {
    stripAnsi: true,
  });
  const {rest} = extractSummary(stderr);

  expect(exitCode).toBe(0);
  expect(wrap(rest)).toMatchSnapshot();
});

test('moduleNameMapper with mocking', () => {
  const {json} = runWithJson('module-name-mapper-mock');
  expect(json.numTotalTests).toBe(2);
  expect(json.success).toBe(true);
});
