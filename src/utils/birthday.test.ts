import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBirthdayPassword,
  getBirthdayCountdown,
  validateWish,
  TRUNG_BIRTHDAY_INFO
} from './birthday';

test('validateBirthdayPassword accepts valid formats of 06/11/2012', () => {
  assert.equal(validateBirthdayPassword('06112012'), true);
  assert.equal(validateBirthdayPassword('6112012'), true);
  assert.equal(validateBirthdayPassword('06/11/2012'), true);
  assert.equal(validateBirthdayPassword('6/11/2012'), true);
  assert.equal(validateBirthdayPassword('06-11-2012'), true);
  assert.equal(validateBirthdayPassword('6-11-2012'), true);
  assert.equal(validateBirthdayPassword('  06/11/2012  '), true);
  assert.equal(validateBirthdayPassword('0611'), true);
});

test('validateBirthdayPassword rejects incorrect passwords', () => {
  assert.equal(validateBirthdayPassword('123456'), false);
  assert.equal(validateBirthdayPassword('07112012'), false);
  assert.equal(validateBirthdayPassword('20121106'), false);
  assert.equal(validateBirthdayPassword(''), false);
});

test('getBirthdayCountdown calculates countdown correctly', () => {
  // Test before birthday in 2026 (e.g. 2026-10-31)
  const fakeNow = new Date(2026, 9, 31, 10, 0, 0); // Oct 31, 2026
  const countdown = getBirthdayCountdown(fakeNow);

  assert.equal(countdown.isBirthdayToday, false);
  assert.equal(countdown.targetYear, 2026);
  assert.equal(countdown.ageTurning, 14); // 2026 - 2012
  assert.ok(countdown.days >= 5 && countdown.days <= 6);
});

test('getBirthdayCountdown recognizes birthday date', () => {
  const birthdayDay = new Date(2026, 10, 6, 12, 0, 0); // Nov 6, 2026
  const countdown = getBirthdayCountdown(birthdayDay);
  assert.equal(countdown.isBirthdayToday, true);
});

test('validateWish validates author and content boundaries', () => {
  assert.equal(validateWish('', 'Happy birthday').valid, false);
  assert.equal(validateWish('A', 'Happy birthday').valid, false);
  assert.equal(validateWish('Mai Anh', '').valid, false);
  assert.equal(validateWish('Mai Anh', 'Hi').valid, false);
  assert.equal(validateWish('Mai Anh', 'Chúc Trung sinh nhật vui vẻ nha!').valid, true);
});

test('TRUNG_BIRTHDAY_INFO contains required profile fields', () => {
  assert.equal(TRUNG_BIRTHDAY_INFO.fullName, 'Nguyễn Thành Trung');
  assert.equal(TRUNG_BIRTHDAY_INFO.schoolClass, '9C2');
  assert.equal(TRUNG_BIRTHDAY_INFO.birthDateStr, '06/11/2012');
  assert.match(TRUNG_BIRTHDAY_INFO.wish, /THPT Nam Tiền Hải/);
  assert.equal(TRUNG_BIRTHDAY_INFO.coordinates.latStr, `20°17'58.6"N`);
  assert.equal(TRUNG_BIRTHDAY_INFO.coordinates.lngStr, `106°33'56.6"E`);
});
