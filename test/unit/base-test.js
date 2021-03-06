import proxyquire from 'proxyquire';
import Chance from 'chance';
import sinon from 'sinon';
import {assert} from 'chai';
import {chance, randomListOfStrings} from '../helpers/data-generator';

suite('base generators', () => {
  let sandbox, any, chanceStub;
  const options = {foo: 'bar'};

  setup(() => {
    sandbox = sinon.sandbox.create();
    chanceStub = sandbox.stub(new Chance());
    any = proxyquire('../../src/base', {
      chance: sinon.stub().returns(chanceStub)
    });
  });

  teardown(() => sandbox.restore());

  test('that only positive integers are generated', () => {
    const int = chance.natural();
    chanceStub.natural.withArgs(options).returns(int);

    assert.equal(any.integer(options), int);
  });

  test('that a floating point number is generated', () => {
    const float = chance.floating();
    chanceStub.floating.withArgs(options).returns(float);

    assert.equal(any.float(options), float);
  });

  test('that a string is generated', () => {
    const string = chance.string();
    chanceStub.string.withArgs(options).returns(string);

    assert.equal(any.string(options), string);
  });

  test('that a url is generated', () => {
    const url = chance.url();
    chanceStub.url.withArgs(options).returns(url);

    assert.equal(any.url(options), url);
  });

  test('that a word is generated', () => {
    const word = chance.word();
    chanceStub.word.withArgs({syllables: 3, ...options}).returns(word);

    assert.equal(any.word(options), word);
  });

  test('that syllables can be overridden', () => {
    const word = chance.word();
    const expectedSyllables = any.integer();
    chanceStub.word.withArgs({syllables: expectedSyllables, ...options}).returns(word);

    assert.equal(any.word({syllables: expectedSyllables, ...options}), word);
  });

  test('that length can be used', () => {
    const word = chance.word();
    const length = chance.integer();
    chanceStub.word.withArgs({length, ...options}).returns(word);

    assert.equal(any.word({length, ...options}), word);
  });

  test('that a sentence is generated', () => {
    const sentence = chance.sentence();
    chanceStub.sentence.withArgs(options).returns(sentence);

    assert.equal(any.sentence(options), sentence);
  });

  test('that a paragraph is generated', () => {
    const paragraph = chance.paragraph();
    chanceStub.paragraph.withArgs(options).returns(paragraph);

    assert.equal(any.paragraph(options), paragraph);
  });

  test('that a boolean is generated', () => {
    const boolean = chance.bool();
    chanceStub.bool.withArgs(options).returns(boolean);

    assert.equal(any.boolean(options), boolean);
  });

  test('that an email is generated', () => {
    const email = chance.email();
    chanceStub.email.withArgs(options).returns(email);

    assert.equal(any.email(options), email);
  });

  test('that a date string is generated', () => {
    const date = chance.date();
    chanceStub.date.withArgs({string: true}).returns(date);

    assert.equal(any.date(options), date);
  });

  test('that a subset of two is generated by default', () => {
    const originalList = randomListOfStrings();
    const list = randomListOfStrings();

    chanceStub.pickset.withArgs(originalList, 2).returns(list);

    assert.equal(any.subset(originalList), list);
  });

  test('that a custom subset size is passed to chance', () => {
    const originalList = randomListOfStrings();
    const list = randomListOfStrings();
    const quantity = chance.integer();

    chanceStub.pickset.withArgs(originalList, quantity).returns(list);

    assert.equal(any.subset(originalList, {size: quantity}), list);
  });
});
